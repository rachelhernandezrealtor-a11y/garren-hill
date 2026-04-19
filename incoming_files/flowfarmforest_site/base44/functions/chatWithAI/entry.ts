import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import OpenAI from 'npm:openai@4.52.7';

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

// Helper: convert remote image URLs to base64 data URLs
const guessMimeFromPath = (path) => {
  const ext = (path.split('.').pop() || '').toLowerCase();
  if (ext === 'png') return 'image/png';
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'gif') return 'image/gif';
  return 'image/jpeg';
};

const bytesToBase64 = (bytes) => {
  let binary = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
};

const urlToDataUrl = async (url) => {
  if (!url || url.startsWith('data:')) return url;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
  const bytes = new Uint8Array(await res.arrayBuffer());
  let mime = res.headers.get('content-type');
  if (!mime) {
    try { mime = guessMimeFromPath(new URL(url).pathname); } catch { mime = 'image/jpeg'; }
  }
  const b64 = bytesToBase64(bytes);
  return `data:${mime};base64,${b64}`;
};

const normalizeImageParts = async (messages) => {
  const out = [];
  for (const m of messages) {
    if (Array.isArray(m.content)) {
      const newParts = [];
      for (const part of m.content) {
        if (part?.type === 'image_url' && part.image_url) {
          const raw = typeof part.image_url === 'string' ? part.image_url : part.image_url.url;
          const dataUrl = await urlToDataUrl(raw);
          newParts.push({ ...part, image_url: { url: dataUrl } });
        } else {
          newParts.push(part);
        }
      }
      out.push({ ...m, content: newParts });
    } else {
      out.push(m);
    }
  }
  return out;
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messages, sessionId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    // Pass messages directly to ChatGPT without modification
    // Only add system message if not present
    let finalMessages = messages;
    const hasSystemMessage = messages.some(m => m.role === 'system');
    
    if (!hasSystemMessage) {
      finalMessages = [
        {
          role: 'system',
          content: 'You are the Flow Farm luxury estate site editing assistant. You maintain conversation context across the entire session and remember prior layout instructions, project context, and site structure references.'
        },
        ...messages
      ];
    }

    console.log(`[ChatGPT ${sessionId}] Processing ${finalMessages.length} messages`);

    // Normalize any image_url parts to base64 data URLs to satisfy proxy/model requirements
    finalMessages = await normalizeImageParts(finalMessages);

     // Send full conversation history directly to OpenAI - no preprocessing
     const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: finalMessages,
      temperature: 0.7,
      max_tokens: 1500,
    });

    const assistantMessage = response.choices[0].message.content;

    return Response.json({ 
      message: assistantMessage,
      sessionId: sessionId,
      messageCount: finalMessages.length,
      usage: response.usage
    });
  } catch (error) {
    console.error('Chat error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});