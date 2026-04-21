import { base44 } from "npm:@base44/sdk";

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

async function enhanceSinglePhoto(photo_id: string, photo_url: string, category: string, room: string) {
  try {
    const cat = (category || "").toLowerCase();
    const rm = (room || "").toLowerCase();
    const isExterior = cat === "exterior" || ["aerial", "grounds", "garden", "outdoor", "pool", "tennis"].some(x => rm.includes(x));

    const eager = isExterior
      ? "e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1400,c_limit"
      : "e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1400,c_limit";

    const timestamp = Math.round(Date.now() / 1000).toString();
    const sigString = `eager=${eager}&timestamp=${timestamp}${API_SECRET}`;
    const signature = await sha1(sigString);

    const body = new URLSearchParams();
    body.append("file", photo_url);
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

    if (result.error) {
      console.error(`Photo ${photo_id}: Cloudinary error - ${result.error.message}`);
      return null;
    }

    const enhanced_url = (result.eager && result.eager[0]) ? result.eager[0].secure_url : result.secure_url;

    // Update DB using service role
    await base44.asServiceRole.entities.PropertyPhoto.update(photo_id, { enhanced_url });
    console.log(`Photo ${photo_id}: Enhanced successfully`);
    return enhanced_url;
  } catch (err) {
    console.error(`Photo ${photo_id}: ${String(err)}`);
    return null;
  }
}

export default async function handler(req: Request): Promise<Response> {
  const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type" };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }

  try {
    const { photoId, fileUrl } = await req.json();

    if (!photoId || !fileUrl) {
      return new Response(JSON.stringify({ error: "photoId and fileUrl required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...cors }
      });
    }

    // Get photo details from database
    const photo = await base44.asServiceRole.entities.PropertyPhoto.get(photoId);
    
    if (!photo) {
      return new Response(JSON.stringify({ error: "Photo not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...cors }
      });
    }

    const cat = (photo.category || "").toLowerCase();
    const rm = (photo.room || "").toLowerCase();
    const isExterior = cat === "exterior" || ["aerial", "grounds", "garden", "outdoor", "pool", "tennis"].some(x => rm.includes(x));

    const eager = isExterior
      ? "e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1400,c_limit"
      : "e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1400,c_limit";

    const timestamp = Math.round(Date.now() / 1000).toString();
    const sigString = `eager=${eager}&timestamp=${timestamp}${API_SECRET}`;
    const signature = await sha1(sigString);

    const body = new URLSearchParams();
    body.append("file", fileUrl);
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

    if (result.error) {
      throw new Error(`Cloudinary error: ${result.error.message}`);
    }

    const enhanced_url = (result.eager && result.eager[0]) ? result.eager[0].secure_url : result.secure_url;
    await base44.asServiceRole.entities.PropertyPhoto.update(photoId, { enhanced_url });

    return new Response(JSON.stringify({ enhanced_url, success: true }), {
      headers: { "Content-Type": "application/json", ...cors }
    });

  } catch (err) {
    console.error("Enhancement error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...cors }
    });
  }
}