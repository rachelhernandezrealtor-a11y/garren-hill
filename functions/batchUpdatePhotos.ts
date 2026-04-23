import { base44 } from '@base44/sdk';

export default async function batchUpdatePhotos(req: any) {
  const updates = [
    { id: "69e704ab9b7680e3bcb3bbca", ai_room: "Foyer", quality_score: 7, best_use: "detail", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbcb", ai_room: "Foyer", quality_score: 6, best_use: "supporting", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbcc", ai_room: "Living Room", quality_score: 8, best_use: "gallery", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbcd", ai_room: "Living Room", quality_score: 8, best_use: "gallery", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbce", ai_room: "Living Room", quality_score: 9, best_use: "listing hero", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbcf", ai_room: "Kitchen", quality_score: 9, best_use: "hero", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbd0", ai_room: "Kitchen", quality_score: 9, best_use: "listing hero", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbd1", ai_room: "Kitchen", quality_score: 9, best_use: "listing hero", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbd2", ai_room: "Kitchen", quality_score: 9, best_use: "hero", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbd3", ai_room: "Kitchen", quality_score: 9, best_use: "gallery", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbd4", ai_room: "Kitchen", quality_score: 9, best_use: "gallery", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbd5", ai_room: "Kitchen", quality_score: 9, best_use: "listing hero", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbd6", ai_room: "Kitchen", quality_score: 9, best_use: "listing hero", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbd7", ai_room: "Kitchen", quality_score: 9, best_use: "hero", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbd8", ai_room: "Conservatory", quality_score: 9, best_use: "gallery", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbd9", ai_room: "Conservatory", quality_score: 9, best_use: "gallery", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbda", ai_room: "Conservatory", quality_score: 8, best_use: "gallery", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbdb", ai_room: "Conservatory", quality_score: 9, best_use: "listing hero", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbdc", ai_room: "Primary Bedroom", quality_score: 7, best_use: "detail", ai_category: "Interior" },
    { id: "69e704ab9b7680e3bcb3bbdc", ai_room: "Primary Closet", quality_score: 7, best_use: "detail", ai_category: "Interior" }
  ];

  let updated = 0;
  for (const update of updates) {
    try {
      await base44.asServiceRole.entities.PropertyPhoto.update(update.id, {
        ai_room: update.ai_room,
        quality_score: update.quality_score,
        best_use: update.best_use,
        ai_category: update.ai_category
      });
      updated++;
    } catch (e) {
      console.error(`Failed to update ${update.id}:`, e);
    }
  }

  return { success: true, updated, total: updates.length };
}
