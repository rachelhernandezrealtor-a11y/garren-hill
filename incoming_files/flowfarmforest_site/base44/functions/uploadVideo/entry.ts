import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { fileData } = await req.json();

    if (!fileData) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert base64 back to file for upload
    const binaryData = Uint8Array.from(atob(fileData.split(',')[1]), c => c.charCodeAt(0));
    const file = new File([binaryData], 'video.mp4', { type: 'video/mp4' });

    const { file_url } = await base44.integrations.Core.UploadFile({ file });

    return Response.json({ file_url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});