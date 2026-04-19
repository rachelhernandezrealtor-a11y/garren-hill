import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, CheckSquare, Square } from "lucide-react";

const ROOM_LABELS = {
  exterior_front: "Exterior Front", exterior_back: "Exterior Back", exterior_side: "Exterior Side",
  living_room: "Living Room", kitchen: "Kitchen", dining_room: "Dining Room",
  primary_bedroom: "Primary Bedroom", bedroom: "Bedroom", bathroom: "Bathroom",
  primary_bathroom: "Primary Bathroom", office: "Office", basement: "Basement",
  garage: "Garage", backyard: "Backyard", pool: "Pool", other: "Other",
};

const ROOMS = Object.keys(ROOM_LABELS);
const CATEGORIES = ["interior", "exterior", "aerial", "detail", "twilight", "other"];

export default function PhotoGrid({ photos, onUpdated }) {
  const [filter, setFilter] = useState("all");
  const [deleting, setDeleting] = useState(null);

  const grouped = {};
  const display = filter === "all" ? photos : photos.filter((p) => p.room === filter);
  display.forEach((p) => {
    const key = p.room || "other";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  });

  const toggleMLS = async (photo) => {
    await base44.entities.Photo.update(photo.id, { selected_for_mls: !photo.selected_for_mls });
    onUpdated();
  };

  const updateField = async (photo, field, value) => {
    await base44.entities.Photo.update(photo.id, { [field]: value });
    onUpdated();
  };

  const deletePhoto = async (photo) => {
    setDeleting(photo.id);
    await base44.entities.Photo.delete(photo.id);
    onUpdated();
    setDeleting(null);
  };

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <span className="text-sm text-gray-500 font-medium">Filter by room:</span>
        <button
          onClick={() => setFilter("all")}
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${filter === "all" ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-600 hover:border-blue-300"}`}
        >
          All ({photos.length})
        </button>
        {ROOMS.filter((r) => photos.some((p) => p.room === r)).map((r) => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${filter === r ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-600 hover:border-blue-300"}`}
          >
            {ROOM_LABELS[r]} ({photos.filter((p) => p.room === r).length})
          </button>
        ))}
      </div>

      {Object.keys(grouped).length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">No photos yet. Upload some above!</div>
      )}

      {Object.entries(grouped).map(([room, roomPhotos]) => (
        <div key={room} className="mb-8">
          <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">{ROOM_LABELS[room]}</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {roomPhotos.map((photo) => (
              <div key={photo.id} className="group relative bg-white border rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-100 relative">
                  <img
                    src={photo.file_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {/* MLS toggle overlay */}
                  <button
                    onClick={() => toggleMLS(photo)}
                    className="absolute top-2 left-2 text-white drop-shadow"
                    title="Toggle MLS selection"
                  >
                    {photo.selected_for_mls
                      ? <CheckSquare className="w-5 h-5 text-blue-400" />
                      : <Square className="w-5 h-5 text-white/80" />}
                  </button>
                  {photo.selected_for_mls && (
                    <Badge className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] px-1.5 py-0.5">MLS</Badge>
                  )}
                  {/* Delete */}
                  <button
                    onClick={() => deletePhoto(photo)}
                    disabled={deleting === photo.id}
                    className="absolute bottom-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Controls */}
                <div className="p-2 space-y-1.5">
                  <Select value={photo.orientation || "horizontal"} onValueChange={(v) => updateField(photo, "orientation", v)}>
                    <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="horizontal">Horizontal</SelectItem>
                      <SelectItem value="vertical">Vertical</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={photo.category || "interior"} onValueChange={(v) => updateField(photo, "category", v)}>
                    <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}