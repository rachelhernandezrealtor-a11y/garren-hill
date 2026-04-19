import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Room name mapping from old names to correct architect taxonomy
const ROOM_MAP: Record<string, string> = {
  // Exterior
  'Exterior / Facade': 'Portico',
  'Front Exterior': 'Portico',
  'Rear Exterior': 'Rear Porch',
  'Backyard / Outdoor': 'Rear Porch',
  'patio': 'Rear Porch',
  'Other': 'Rear Porch',
  'other': 'Rear Porch',
  'Unknown Floor - other': 'Rear Porch',

  // Entrance / Hall
  'Entry / Foyer': 'Entrance Hall',
  'entrance': 'Entrance Hall',
  'Hallway / Staircase': 'Entrance Hall',

  // Living
  'living_room': 'Living Room',

  // Master Suite
  'primary_bedroom': 'Master Bedroom',
  'primary_bath': 'Master Bath',
  'Bathroom': 'Master Bath',

  // Bedrooms / Baths
  'bedroom_2': 'Bedroom #2',
  'bedroom_3': 'Bedroom #3',
  'bedroom_4': 'Bedroom #4',
  'bathroom_2': 'Bath #2',
  'bathroom_3': 'Bath #3',
  'bathroom_4': 'Bath #4',

  // Keep these as-is (already correct)
  // 'Living Room', 'Kitchen', 'Dining Room', 'Library', 'Sitting Room',
  // 'Powder Room', 'Master Bedroom', 'Master Bath', 'Entrance Hall',
  // 'Pool', 'Wee Cottage', 'Garage', 'Portico', 'Rear Porch',
  // 'Bedroom #1', 'Bedroom #2', 'Bedroom #3', 'Bedroom #4',
  // 'Bath #2', 'Bath #3', 'Bath #4', 'Dressing Room',
  // 'Office / Game Study', 'Butler\'s Pantry', 'Breakfast Room'
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Use service role to access all photos
    const photos = await base44.asServiceRole.entities.PropertyPhoto.list();

    let updated = 0;
    let skipped = 0;
    const changes: string[] = [];

    for (const photo of photos) {
      const oldRoom = photo.room;
      const newRoom = ROOM_MAP[oldRoom];

      if (newRoom && newRoom !== oldRoom) {
        await base44.asServiceRole.entities.PropertyPhoto.update(photo.id, { room: newRoom });
        changes.push(`${photo.fileName}: "${oldRoom}" → "${newRoom}"`);
        updated++;
      } else {
        skipped++;
      }
    }

    return Response.json({
      ok: true,
      total: photos.length,
      updated,
      skipped,
      changes
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
