import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
    try {
        const process = new Deno.Command("git", {
            args: ["log", "-p", "-n", "2", "--", "components/property/cinematic/PossibilitySection.jsx", "components/property/cinematic/FarmStructuresOnly.jsx"]
        });
        const { stdout } = await process.output();
        const diff = new TextDecoder().decode(stdout);
        
        return Response.json({ diff });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});