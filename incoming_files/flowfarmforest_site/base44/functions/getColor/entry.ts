import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        const res = await base44.asServiceRole.integrations.Core.InvokeLLM({
            prompt: "Analyze the bottom edge of this aerial forest image. I need a seamless CSS gradient seam that connects the bottom of this forest image to the background color of the next HTML section. The color must match the darkest, most dominant shadowy tone running along the bottom edge of the image so that the transition looks completely invisible and natural. Do NOT just give me a random forest green. Sample the actual pixels near the bottom edge. Provide the exact hex code.",
            file_urls: ["https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/9ed50a4a4_generated_image.png"],
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