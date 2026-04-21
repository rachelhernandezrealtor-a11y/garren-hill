import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const CLOUD_NAME = Deno.env.get("CLOUDINARY_CLOUD_NAME") || "dghn2xpif";
const P_INT = "e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1400,c_limit";
const P_EXT = "e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1400,c_limit";
const EXT_KWORDS = ["aerial","grounds","garden","outdoor","pool","tennis","exterior","farm","barn","workshop","cabana","patio"];
const GH_APP = "69e2578ca7113dbe93cb208d";

function getParams(fileUrl: string, category: string, room: string): string {
  let isExt = category.toLowerCase() === "exterior" || EXT_KWORDS.some(k => room.toLowerCase().includes(k));
  if (!isExt && fileUrl.includes(GH_APP)) {
    const fname = fileUrl.split("/").pop()?.toLowerCase() || "";
    if (["-1.jpg","-2.jpg","-3.jpg","-4.jpg","-5.jpg"].some(s => fname.endsWith(s))) isExt = true;
  }
  return isExt ? P_EXT : P_INT;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type, Authorization" }});
  }

  try {
    const base44 = createClientFromRequest(req);

    // Pull all records using list with high limit
    let allPhotos: any[] = [];
    let skip = 0;
    const limit = 100;
    
    while (true) {
      const batch = await base44.asServiceRole.entities.PropertyPhoto.list({ limit, skip });
      if (!batch || batch.length === 0) break;
      allPhotos = allPhotos.concat(batch);
      if (batch.length < limit) break;
      skip += limit;
    }

    const toProcess = allPhotos.filter((p: any) => !p.enhanced_url && p.file_url);
    let updated = 0;
    let skipped = 0;

    for (const photo of toProcess) {
      try {
        const params = getParams(photo.file_url, photo.category || "", photo.room || "");
        const encoded = encodeURIComponent(photo.file_url);
        const enhanced_url = `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${params}/${encoded}`;
        await base44.asServiceRole.entities.PropertyPhoto.update(photo.id, { enhanced_url });
        updated++;
      } catch (e) {
        skipped++;
      }
    }

    return Response.json({
      success: true,
      total_in_db: allPhotos.length,
      already_done: allPhotos.length - toProcess.length,
      updated,
      failed: skipped,
      message: `Done! Enhanced ${updated} photos. ${allPhotos.length - toProcess.length} were already set.`
    });

  } catch (err) {
    console.error("Error:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
});
