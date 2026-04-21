import { createClient } from "npm:@base44/sdk";

const client = createClient({ appId: Deno.env.get("APP_ID") || "" });

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST" }
    });
  }

  try {
    const { updates } = await req.json();

    if (!Array.isArray(updates)) {
      return new Response(JSON.stringify({ error: "updates must be an array of {id, enhanced_url}" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const results = [];
    for (const { id, enhanced_url } of updates) {
      try {
        await client.asServiceRole.entities.PropertyPhoto.update(id, { enhanced_url });
        results.push({ id, success: true });
      } catch (err) {
        results.push({ id, success: false, error: String(err) });
      }
    }

    return new Response(JSON.stringify({ results, count: results.length }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}