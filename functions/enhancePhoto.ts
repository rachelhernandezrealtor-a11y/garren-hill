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

async function uploadToCloudinary(imageUrl: string, eager: string): Promise<string> {
  const timestamp = Math.round(Date.now() / 1000).toString();
  // Signature must include all params except file and signature, alphabetically
  const sigString = `eager=${eager}&eager_async=false&timestamp=${timestamp}${API_SECRET}`;
  const signature = await sha1(sigString);

  const body = new URLSearchParams();
  body.append("file", imageUrl);
  body.append("timestamp", timestamp);
  body.append("api_key", API_KEY!);
  body.append("eager", eager);
  body.append("eager_async", "false");
  body.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body,
  });

  const result = await res.json();
  if (result.error) throw new Error(`Cloudinary error: ${result.error.message}`);
  if (result.eager && result.eager[0]) return result.eager[0].secure_url;
  return result.secure_url;
}

function buildEager(category: string, room: string): string {
  const cat = (category || "").toLowerCase();
  const rm = (room || "").toLowerCase();
  const isExterior = cat === "exterior" || ["aerial", "grounds", "garden", "outdoor", "pool", "tennis"].some(x => rm.includes(x));
  if (isExterior) {
    return "e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1400,c_limit";
  }
  return "e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1400,c_limit";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, x-base44-token",
      }
    });
  }

  try {
    const base44 = createClientFromRequest(req);
    const { photo_id, photo_url, bulk_ids, skip_existing } = await req.json();

    // Bulk mode
    if (bulk_ids && Array.isArray(bulk_ids)) {
      const results = [];
      for (const id of bulk_ids) {
        try {
          const photo = await base44.asServiceRole.entities.PropertyPhoto.get(id);
          if (skip_existing && photo.enhanced_url) {
            results.push({ id, skipped: true });
            continue;
          }
          const eager = buildEager(photo.category || "", photo.room || "");
          const enhanced_url = await uploadToCloudinary(photo.file_url, eager);
          await base44.asServiceRole.entities.PropertyPhoto.update(id, { enhanced_url });
          results.push({ id, enhanced_url, success: true });
        } catch (err) {
          results.push({ id, success: false, error: String(err) });
        }
      }
      return Response.json({ results, count: results.length });
    }

    // Single mode
    if (!photo_id || !photo_url) {
      return Response.json({ error: "photo_id and photo_url required" }, { status: 400 });
    }

    const photo = await base44.asServiceRole.entities.PropertyPhoto.get(photo_id);
    const eager = buildEager(photo.category || "", photo.room || "");
    const enhanced_url = await uploadToCloudinary(photo_url, eager);
    await base44.asServiceRole.entities.PropertyPhoto.update(photo_id, { enhanced_url });

    return Response.json({ enhanced_url, success: true });

  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
});
