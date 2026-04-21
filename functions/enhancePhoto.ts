import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const CLOUD_NAME = Deno.env.get("CLOUDINARY_CLOUD_NAME");
const API_KEY = Deno.env.get("CLOUDINARY_API_KEY");
const API_SECRET = Deno.env.get("CLOUDINARY_API_SECRET");

async function sha1(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }

  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const { photoId, fileUrl } = body;

    if (!photoId || !fileUrl) {
      return Response.json({ error: "photoId and fileUrl required" }, { status: 400 });
    }

    // Get photo details from database using service role
    const photo = await base44.asServiceRole.entities.PropertyPhoto.get(photoId);
    
    if (!photo) {
      return Response.json({ error: "Photo not found" }, { status: 404 });
    }

    const cat = (photo.category || "").toLowerCase();
    const rm = (photo.room || "").toLowerCase();
    const isExterior = cat === "exterior" || ["aerial", "grounds", "garden", "outdoor", "pool", "tennis"].some(x => rm.includes(x));

    const eager = isExterior
      ? "e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1400,c_limit"
      : "e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1400,c_limit";

    const timestamp = Math.round(Date.now() / 1000).toString();
    
    // Build the string to sign: all params in alphabetical order, ending with API_SECRET
    const stringToSign = `eager=${eager}&eager_async=false&timestamp=${timestamp}${API_SECRET}`;
    const signature = await sha1(stringToSign);

    const uploadBody = new URLSearchParams();
    uploadBody.append("file", fileUrl);
    uploadBody.append("timestamp", timestamp);
    uploadBody.append("api_key", API_KEY!);
    uploadBody.append("eager", eager);
    uploadBody.append("eager_async", "false");
    uploadBody.append("signature", signature);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: uploadBody,
    });

    const result = await res.json();

    if (result.error) {
      throw new Error(`Cloudinary error: ${result.error.message}`);
    }

    const enhanced_url = (result.eager && result.eager[0]) ? result.eager[0].secure_url : result.secure_url;
    
    // Update photo with enhanced URL
    await base44.asServiceRole.entities.PropertyPhoto.update(photoId, { enhanced_url });

    return Response.json({ enhanced_url, success: true });

  } catch (err) {
    console.error("Enhancement error:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
});