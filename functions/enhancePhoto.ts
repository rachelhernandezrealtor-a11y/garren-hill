import { base44 } from "npm:@base44/sdk";

const client = base44.createClient({ appId: Deno.env.get("APP_ID") || "" });

const CLOUD_NAME = Deno.env.get("CLOUDINARY_CLOUD_NAME");

function buildEager(category: string, room: string): string {
  const cat = (category || "").toLowerCase();
  const rm = (room || "").toLowerCase();
  const isExterior = cat === "exterior" || ["aerial", "grounds", "garden", "outdoor", "pool", "tennis"].some(x => rm.includes(x));

  if (isExterior) {
    return "e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1400,c_limit";
  } else {
    return "e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1400,c_limit";
  }
}

function buildFetchUrl(imageUrl: string, transformations: string): string {
  // Use Cloudinary's fetch API to transform images on-the-fly
  // This bypasses upload size limits by serving directly from source
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${transformations}/${imageUrl}`;
}

export default async function handler(req: Request): Promise<Response> {
  const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type" };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }

  try {
    const { photo_id, photo_url, mode, bulk_ids, skip_existing } = await req.json();

    // Bulk mode — process array of IDs
    if (bulk_ids && Array.isArray(bulk_ids)) {
      const results = [];
      for (const id of bulk_ids) {
        try {
          const photo = await client.asServiceRole.entities.PropertyPhoto.get(id);

          // Skip if already enhanced and skip_existing is true
          if (skip_existing && photo.enhanced_url) {
            results.push({ id, skipped: true });
            continue;
          }

          const eager = buildEager(photo.category || "", photo.room || "");
          const enhanced_url = buildFetchUrl(photo.file_url, eager);

          await client.asServiceRole.entities.PropertyPhoto.update(id, { enhanced_url });
          results.push({ id, enhanced_url, success: true });
        } catch (err) {
          results.push({ id, success: false, error: String(err) });
        }
      }
      return new Response(JSON.stringify({ results, count: results.length }), {
        headers: { "Content-Type": "application/json", ...cors }
      });
    }

    // Single photo mode
    if (!photo_id || !photo_url) {
      return new Response(JSON.stringify({ error: "photo_id and photo_url required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...cors }
      });
    }

    const photo = await client.asServiceRole.entities.PropertyPhoto.get(photo_id);
    const eager = mode === "exterior_enhance"
      ? "e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1400,c_limit"
      : "e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1400,c_limit";

    const enhanced_url = buildFetchUrl(photo_url, eager);
    await client.asServiceRole.entities.PropertyPhoto.update(photo_id, { enhanced_url });

    return new Response(JSON.stringify({ enhanced_url, success: true }), {
      headers: { "Content-Type": "application/json", ...cors }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...cors }
    });
  }
}