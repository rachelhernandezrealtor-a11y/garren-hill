import base44 from "../src/api/base44Client";

const CLOUD = "dghn2xpif";
const INT = "e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1400,c_limit";
const EXT = "e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1400,c_limit";

function isExt(url: string) {
  return ['-1.jpg','-2.jpg','-3.jpg','-4.jpg','-5.jpg'].some(n => url.endsWith(n));
}

function makeEnhancedUrl(fileUrl: string) {
  const params = isExt(fileUrl) ? EXT : INT;
  return `https://res.cloudinary.com/${CLOUD}/image/fetch/${params}/${encodeURIComponent(fileUrl)}`;
}

export default async function handler(req: Request) {
  try {
    // Get all photos with no enhanced_url
    const photos = await base44.asServiceRole.entities.PropertyPhoto.list({
      limit: 500,
    });

    const pending = photos.filter((p: any) => !p.enhanced_url && p.file_url);
    let updated = 0;

    for (const photo of pending) {
      try {
        await base44.asServiceRole.entities.PropertyPhoto.update(photo.id, {
          enhanced_url: makeEnhancedUrl(photo.file_url)
        });
        updated++;
      } catch (e) {
        // skip errors, continue
      }
    }

    return Response.json({ 
      success: true, 
      total_pending: pending.length,
      updated 
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
