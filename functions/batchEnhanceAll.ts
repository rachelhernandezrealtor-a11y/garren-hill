import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const CLOUD_NAME = Deno.env.get("CLOUDINARY_CLOUD_NAME") || "dghn2xpif";
const PARAMS_INTERIOR = "e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1400,c_limit";
const PARAMS_EXTERIOR = "e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1400,c_limit";

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

    // Fetch ALL photos, filter in code for ones missing enhanced_url
    const allPhotos = await base44.asServiceRole.entities.PropertyPhoto.list({ limit: 500 });
    const photos = allPhotos.filter((p: any) => !p.enhanced_url && p.file_url);

    let updated = 0;
    let skipped = 0;

    for (const photo of photos) {
      const cat = (photo.category || "").toLowerCase();
      const rm = (photo.room || "").toLowerCase();
      const isExterior = cat === "exterior" || ["aerial","grounds","garden","outdoor","pool","tennis","exterior"].some((x: string) => rm.includes(x));
      const params = isExterior ? PARAMS_EXTERIOR : PARAMS_INTERIOR;

      const encoded = encodeURIComponent(photo.file_url);
      const enhanced_url = `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${params}/${encoded}`;

      await base44.asServiceRole.entities.PropertyPhoto.update(photo.id, { enhanced_url });
      updated++;
    }

    const noUrl = allPhotos.filter((p: any) => !p.file_url).length;
    skipped = noUrl;

    return Response.json({
      success: true,
      updated,
      skipped,
      total_in_db: allPhotos.length,
      already_enhanced: allPhotos.length - photos.length - noUrl,
      message: `Enhanced ${updated} photos. ${skipped} had no file_url. ${allPhotos.length - photos.length - noUrl} were already done.`
    });

  } catch (err) {
    console.error("Batch enhance error:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
});
