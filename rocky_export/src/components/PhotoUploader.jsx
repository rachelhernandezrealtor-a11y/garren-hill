import { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, Loader2 } from "lucide-react";

const ROOMS = [
  { value: "exterior_front", label: "Exterior Front" },
  { value: "exterior_back", label: "Exterior Back" },
  { value: "exterior_side", label: "Exterior Side" },
  { value: "living_room", label: "Living Room" },
  { value: "kitchen", label: "Kitchen" },
  { value: "dining_room", label: "Dining Room" },
  { value: "primary_bedroom", label: "Primary Bedroom" },
  { value: "bedroom", label: "Bedroom" },
  { value: "bathroom", label: "Bathroom" },
  { value: "primary_bathroom", label: "Primary Bathroom" },
  { value: "office", label: "Office" },
  { value: "basement", label: "Basement" },
  { value: "garage", label: "Garage" },
  { value: "backyard", label: "Backyard" },
  { value: "pool", label: "Pool" },
  { value: "other", label: "Other" },
];

const CATEGORIES = [
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
  { value: "aerial", label: "Aerial" },
  { value: "detail", label: "Detail" },
  { value: "twilight", label: "Twilight" },
  { value: "other", label: "Other" },
];

export default function PhotoUploader({ propertyId, onUploaded }) {
  const inputRef = useRef();
  const [room, setRoom] = useState("exterior_front");
  const [category, setCategory] = useState("exterior");
  const [orientation, setOrientation] = useState("horizontal");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFiles = async (files) => {
    if (!files.length) return;
    setUploading(true);
    setProgress(0);
    const arr = Array.from(files);
    for (let i = 0; i < arr.length; i++) {
      const file = arr[i];
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await base44.entities.Photo.create({
        property_id: propertyId,
        file_url,
        room,
        category,
        orientation,
        sort_order: Date.now() + i,
        selected_for_mls: false,
      });
      setProgress(Math.round(((i + 1) / arr.length) * 100));
    }
    setUploading(false);
    onUploaded();
  };

  return (
    <div className="bg-white border rounded-xl p-5 mb-6">
      <h3 className="font-semibold text-gray-800 mb-4">Upload Photos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div>
          <Label className="text-xs mb-1 block">Room</Label>
          <Select value={room} onValueChange={setRoom}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {ROOMS.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs mb-1 block">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs mb-1 block">Orientation</Label>
          <Select value={orientation} onValueChange={setOrientation}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="horizontal">Horizontal</SelectItem>
              <SelectItem value="vertical">Vertical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div
        className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
      >
        <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-blue-600">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-sm font-medium">Uploading… {progress}%</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <Upload className="w-8 h-8" />
            <p className="text-sm font-medium">Drop photos here or click to browse</p>
            <p className="text-xs">Supports JPG, PNG, WEBP — multiple files allowed</p>
          </div>
        )}
      </div>
    </div>
  );
}