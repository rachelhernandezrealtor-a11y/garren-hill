import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";

interface PhotoAnalysis {
  room: string;
  quality_score: number;
  best_use: string;
  caption: string;
}

async function analyzePhotoWithGPT4o(enhancedUrl: string): Promise<PhotoAnalysis | null> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: enhancedUrl
                }
              },
              {
                type: "text",
                text: `Analyze this real estate photo. Return ONLY valid JSON:
{
  "room": "Room name (Living Room, Kitchen, Foyer, Master Bedroom, etc.)",
  "quality_score": 8.5,
  "best_use": "Hero shot" or "Secondary",
  "caption": "One sentence description"
}
No adjectives. Only specifics.`
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      console.error(`OpenAI error: ${response.status}`);
      return null;
    }

    const data = await response.json() as any;
    const text = data.choices?.[0]?.message?.content || "";
    
    let jsonStr = text;
    if (text.includes("```")) {
      jsonStr = text.split("```")[1].split("```")[0];
      if (jsonStr.startsWith("json")) jsonStr = jsonStr.slice(4);
    }
    
    const analysis = JSON.parse(jsonStr.trim());
    return analysis;
  } catch (e) {
    console.error("Analysis error:", e);
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      headers: { 
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    });
  }

  try {
    const base44 = createClientFromRequest(req);

    // Fetch all photos with pagination
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

    // Filter: missing ai_room AND has enhanced_url
    const pending = allPhotos.filter((p: any) => !p.ai_room && p.enhanced_url);
    
    let analyzed = 0;
    const errors: string[] = [];

    for (const photo of pending.slice(0, 20)) {
      try {
        console.log(`Analyzing: ${photo.file_name}`);
        const analysis = await analyzePhotoWithGPT4o(photo.enhanced_url);
        
        if (analysis) {
          console.log(`  → ${analysis.room}, score: ${analysis.quality_score}`);
          await base44.asServiceRole.entities.PropertyPhoto.update(photo.id, {
            ai_room: analysis.room,
            ai_category: "Interior",
            quality_score: analysis.quality_score,
            caption: analysis.caption,
            best_use: analysis.best_use
          });
          analyzed++;
        } else {
          errors.push(`${photo.file_name}: Analysis returned null`);
        }
      } catch (e) {
        errors.push(`${photo.file_name}: ${String(e)}`);
      }
    }

    return Response.json({
      success: true,
      total_in_db: allPhotos.length,
      pending: pending.length,
      analyzed,
      errors: errors.length,
      error_messages: errors.slice(0, 5),
      message: `Found ${pending.length} pending. Analyzed ${analyzed}.`
    });
  } catch (err) {
    console.error("Error:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
});
