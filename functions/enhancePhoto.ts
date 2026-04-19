import { base44 } from "npm:@base44/sdk";

const client = base44.createClient({ appId: Deno.env.get("APP_ID") || "" });

const CLOUD_NAME = Deno.env.get("CLOUDINARY_CLOUD_NAME");
const API_KEY = Deno.env.get("CLOUDINARY_API_KEY");
const API_SECRET = Deno.env.get("CLOUDINARY_API_SECRET");

// Build Cloudinary signed upload URL for a remote image
async function uploadToCloudinary(imageUrl: string, transformations: string): Promise<string> {
  const timestamp = Math.round(Date.now() / 1000);
  
  // Upload via URL with transformations
  const formData = new FormData();
  formData.append("file", imageUrl);
  formData.append("upload_preset", "ml_default");
  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", API_KEY!);
  formData.append("transformation", transformations);
  
  // Generate signature
  const sigString = `file=${imageUrl}&timestamp=${timestamp}&transformation=${transformations}${API_SECRET}`;
  
  // Use unsigned upload with transformation string in the URL instead
  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  
  const body = new URLSearchParams();
  body.append("file", imageUrl);
  body.append("timestamp", timestamp.toString());
  body.append("api_key", API_KEY!);
  body.append("eager", transformations);
  body.append("eager_async", "false");
  
  // Sign the request
  const encoder = new TextEncoder();
  const data = encoder.encode(`eager=${transformations}&file=${imageUrl}&timestamp=${timestamp}${API_SECRET}`);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  
  body.append("signature", signature);
  
  const res = await fetch(uploadUrl, {
    method: "POST",
    body,
  });
  
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Cloudinary upload failed: ${err}`);
  }
  
  const result = await res.json();
  
  // Return the eager transformed URL if available, else secure_url
  if (result.eager && result.eager[0]) {
    return result.eager[0].secure_url;
  }
  return result.secure_url;
}

// Build transformation string based on enhancement mode
function buildTransformation(mode: string, custom?: Record<string, number>): string {
  switch (mode) {
    case "global_polish":
      // Safe global polish: auto improve + brightness + clarity
      return "e_improve:outdoor:50,e_auto_brightness,e_sharpen:30,e_vibrance:20";
    
    case "interior_enhance":
      // For indoor shots: lift shadows, warm up, sharpen details
      return "e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15";
    
    case "exterior_enhance":
      // For outdoor shots: sky enhancement, boost greens, sharpen
      return "e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20";
    
    case "brighten":
      return `e_brightness:${custom?.brightness || 30},e_auto_contrast`;
    
    case "color_balance":
      return "e_improve:50,e_auto_color,e_vibrance:15";
    
    case "shadow_lift":
      return "e_shadow:-40,e_brightness:15,e_auto_contrast";
    
    case "window_pull":
      // Balance bright windows with dark interiors
      return "e_improve:indoor:80,e_shadow:-50,e_brightness:20,e_auto_contrast";
    
    case "custom":
      const parts = [];
      if (custom?.brightness) parts.push(`e_brightness:${custom.brightness}`);
      if (custom?.contrast) parts.push(`e_contrast:${custom.contrast}`);
      if (custom?.saturation) parts.push(`e_saturation:${custom.saturation}`);
      if (custom?.sharpen) parts.push(`e_sharpen:${custom.sharpen}`);
      if (custom?.vibrance) parts.push(`e_vibrance:${custom.vibrance}`);
      return parts.join(",") || "e_improve:50";
    
    default:
      return "e_improve:50";
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type" } });
  }

  try {
    const { photo_id, photo_url, mode, custom, bulk_ids } = await req.json();

    // Bulk mode - enhance multiple photos
    if (bulk_ids && Array.isArray(bulk_ids)) {
      const results = [];
      for (const id of bulk_ids) {
        try {
          const photo = await client.asServiceRole.entities.PropertyPhoto.get(id);
          const transformation = buildTransformation(mode || "global_polish", custom);
          const enhanced_url = await uploadToCloudinary(photo.file_url, transformation);
          await client.asServiceRole.entities.PropertyPhoto.update(id, { 
            enhanced_url,
            status: "Keep"
          });
          results.push({ id, enhanced_url, success: true });
        } catch (err) {
          results.push({ id, success: false, error: String(err) });
        }
      }
      return new Response(JSON.stringify({ results }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    // Single photo mode
    if (!photo_id || !photo_url) {
      return new Response(JSON.stringify({ error: "photo_id and photo_url required" }), { status: 400 });
    }

    const transformation = buildTransformation(mode || "global_polish", custom);
    const enhanced_url = await uploadToCloudinary(photo_url, transformation);

    // Update the photo record
    await client.asServiceRole.entities.PropertyPhoto.update(photo_id, { 
      enhanced_url,
      status: "Keep"
    });

    return new Response(JSON.stringify({ enhanced_url, transformation }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}
