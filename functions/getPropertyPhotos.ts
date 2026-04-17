import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Public API — any Base44 app can call this to fetch organized photos for a property
// Usage: POST https://rocky-40781cce.base44.app/functions/getPropertyPhotos
// Body: { "property_id": "..." } OR { "address": "123 Main St" }
// Returns: { property, photos } grouped by category and room

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json().catch(() => ({}));
    const { property_id, address } = body;

    if (!property_id && !address) {
      return Response.json({ error: 'Provide either property_id or address' }, { status: 400 });
    }

    // Find property
    let property = null;
    if (property_id) {
      property = await base44.asServiceRole.entities.Property.get(property_id);
    } else {
      const results = await base44.asServiceRole.entities.Property.filter({ address });
      property = results?.[0] || null;
    }

    if (!property) {
      return Response.json({ error: 'Property not found' }, { status: 404 });
    }

    // Get all kept/enhanced photos
    const allPhotos = await base44.asServiceRole.entities.PropertyPhoto.filter({
      property_id: property.id
    });

    const photos = allPhotos.filter(p => p.status === 'Keep' || p.status === 'Enhance');

    // Group by category and room
    const grouped = {};
    photos.forEach(p => {
      const cat = p.category || 'Uncategorized';
      const room = p.room || 'General';
      if (!grouped[cat]) grouped[cat] = {};
      if (!grouped[cat][room]) grouped[cat][room] = [];
      grouped[cat][room].push({
        id: p.id,
        name: p.custom_name || p.file_name,
        url: p.enhanced_url || p.file_url,
        category: p.category,
        room: p.room,
        sort_order: p.sort_order,
      });
    });

    return Response.json({
      property: {
        id: property.id,
        address: property.address,
        city: property.city,
        state: property.state,
        status: property.status,
        photo_count: photos.length,
        thumbnail_url: property.thumbnail_url,
      },
      photos_flat: photos.map(p => ({
        id: p.id,
        name: p.custom_name || p.file_name,
        url: p.enhanced_url || p.file_url,
        category: p.category,
        room: p.room,
        sort_order: p.sort_order,
      })),
      photos_grouped: grouped,
      total: photos.length,
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
