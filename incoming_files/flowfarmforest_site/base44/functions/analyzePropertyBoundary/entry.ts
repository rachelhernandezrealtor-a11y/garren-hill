import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const gisImage = "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/1366a852a_Screenshot2026-03-05at12825AM.png";
  const aerialImage = "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/deedfa112_forestacreage2.jpg";

  const result = await base44.integrations.Core.InvokeLLM({
    prompt: `You are a GIS mapping expert. I'm showing you two images of the same 15-acre property at 107 Aberdeen Trail, Pinehurst NC.

IMAGE 1 (GIS Map): Moore County GIS showing pink/magenta highlighted parcels owned by Latham. The pink boundary encompasses:
- North/top boundary: along Cranston Ln and McKenzie Ln 
- East/right boundary: along Forest Ln, extending south
- South/bottom boundary: runs along/near Linden Trl
- West/left boundary: runs along Linden Rd back up north
- The houses/structures sit along Skene Ln in the CENTER of the property
- The property is roughly rectangular but with irregular edges, wider at north

IMAGE 2 (Aerial Photo): The aerial shows the same property from above. Key features visible:
- A cluster of houses with driveways in the CENTER-LEFT
- A road visible running across the UPPER portion of the image (this is Cranston Ln)
- Dense pine forest covering the RIGHT HALF and UPPER RIGHT
- Cleared agricultural/yard areas around the houses
- The property boundary should cover roughly 70-80% of the visible aerial photo area
- The boundary should extend from near the top of the image to near the bottom

CRITICAL: The property is LARGE (15 acres) and covers MOST of what's visible in the aerial photo. The boundary should NOT be a small shape in the center — it should extend close to the edges of the image on all sides, leaving only small margins.

SVG viewBox is "0 0 1600 900". The boundary should roughly span from about x=100-1500 and y=50-850.

Provide SVG polygon points tracing the property boundary. Use 20-30 points for accuracy. Return only the points string.`,
    file_urls: [gisImage, aerialImage],
    response_json_schema: {
      type: "object",
      properties: {
        points: { type: "string", description: "SVG polygon points string" },
        notes: { type: "string", description: "Brief description of how you mapped the boundary" }
      },
      required: ["points"]
    },
    model: "claude_sonnet_4_6"
  });

  return Response.json(result);
});