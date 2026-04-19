import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        const res = await base44.asServiceRole.integrations.Core.InvokeLLM({
            prompt: "Look at this screenshot where a user applied #1A3A1F as a bottom gradient over a forest video. The user said it looks terrible and 'painted on'. Analyze the actual colors of the dark areas in the forest video just above the green block. What is the EXACT hex color of the natural dark shadows in the video that would make a completely seamless, invisible transition? It needs to be much less saturated and darker. Return the exact hex code and your reasoning.",
            file_urls: ["https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/e707a788e_Screenshot2026-04-13at90745PM.png"],
            response_json_schema: {
                type: "object",
                properties: {
                    color: { type: "string" },
                    reasoning: { type: "string" }
                }
            },
            model: "gpt_5_4"
        });

        return Response.json(res);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});