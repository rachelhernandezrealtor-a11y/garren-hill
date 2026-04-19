import { useState, useEffect } from "react";
import { Property, PropertyPhoto } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Sparkles, Wand2, Sun, Droplets, Contrast,
  ZoomIn, Wind, Eye, EyeOff, Loader2, CheckCircle,
  LayoutGrid, SlidersHorizontal, ChevronLeft, ChevronRight,
  Download, RotateCcw
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ENHANCE_PRESETS = [
  {
    id: "global_polish",
    label: "Global Polish",
    icon: "",
    desc: "Safe all-around enhancement for every photo",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    activeColor: "bg-purple-600 text-white border-purple-600",
  },
  {
    id: "interior_enhance",
    label: "Interior Boost",
    icon: "",
    desc: "Lifts shadows, warms tone - perfect for indoor shots",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    activeColor: "bg-amber-500 text-white border-amber-500",
  },
  {
    id: "exterior_enhance",
    label: "Exterior Pop",
    icon: "",
    desc: "Boosts sky, greens, and architectural detail",
    color: "bg-green-100 text-green-700 border-green-200",
    activeColor: "bg-green-600 text-white border-green-600",
  },
  {
    id: "shadow_lift",
    label: "Shadow Lift",
    icon: "",
    desc: "Opens up dark corners without blowing highlights",
    color: "bg-sky-100 text-sky-700 border-sky-200",
    activeColor: "bg-sky-600 text-white border-sky-600",
  },
  {
    id: "window_pull",
    label: "Window Pull",
    icon: "",
    desc: "Balances bright windows with dark interiors",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    activeColor: "bg-blue-600 text-white border-blue-600",
  },
  {
    id: "color_balance",
    label: "Color Balance",
    icon: "",
    desc: "Auto white balance + vibrance correction",
    color: "bg-rose-100 text-rose-700 border-rose-200",
    activeColor: "bg-rose-600 text-white border-rose-600",
  },
];

export default function Editor() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("property");
  const startPhotoId = params.get("photo");

  const [property, setProperty] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState("global_polish");
  const [viewMode, setViewMode] = useState("single"); // "single" | "grid"
  const [showEnhanced, setShowEnhanced] = useState(true);
  const [enhancing, setEnhancing] = useState(false);
  const [bulkEnhancing, setBulkEnhancing] = useState(false);
  const [bulkProgress, setBulkProgress] = useState(0);
  const [bulkDone, setBulkDone] = useState(0);
  const [selected, setSelected] = useState(new Set());
  const [filterRoom, setFilterRoom] = useState("All");
  const [customSliders, setCustomSliders] = useState({
    brightness: 0, contrast: 0, saturation: 0, sharpen: 0, vibrance: 0,
  });
  const [useCustom, setUseCustom] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!propertyId) return;
    Property.get(propertyId).then(setProperty);
    PropertyPhoto.filter({ property_id: propertyId }).then((p) => {
      const sorted = p.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
      setPhotos(sorted);
      if (startPhotoId) {
        const idx = sorted.findIndex(ph => ph.id === startPhotoId);
        if (idx >= 0) setCurrent(idx);
      }
    });
  }, [propertyId]);

  const filteredPhotos = filterRoom === "All" ? photos : photos.filter(p => p.room === filterRoom);
  const photo = filteredPhotos[current];
  const rooms = ["All", ...Array.from(new Set(photos.map(p => p.room).filter(Boolean)))];

  const showMsg = (msg) => { setMessage(msg); setTimeout(() => setMessage(""), 3000); };

  const enhanceSingle = async (ph) => {
    if (!ph) return;
    setEnhancing(true);
    try {
      const mode = useCustom ? "custom" : selectedPreset;
      const res = await fetch(`https://app.base44.com/api/apps/69e24a457ec33cf6b6e5df8e/functions/enhancePhoto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photo_id: ph.id,
          photo_url: ph.file_url,
          mode,
          custom: useCustom ? customSliders : undefined,
        }),
      });
      const data = await res.json();
      if (data.enhanced_url) {
        setPhotos(prev => prev.map(p => p.id === ph.id ? { ...p, enhanced_url: data.enhanced_url } : p));
        setShowEnhanced(true);
        showMsg(" Enhanced!");
      } else {
        showMsg(" Enhancement failed - try again");
      }
    } catch (err) {
      showMsg(" Error: " + err.message);
    }
    setEnhancing(false);
  };

  const enhanceBulk = async (photoList) => {
    setBulkEnhancing(true);
    setBulkProgress(0);
    setBulkDone(0);
    const mode = useCustom ? "custom" : selectedPreset;
    let done = 0;
    for (const ph of photoList) {
      try {
        const res = await fetch(`https://app.base44.com/api/apps/69e24a457ec33cf6b6e5df8e/functions/enhancePhoto`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            photo_id: ph.id,
            photo_url: ph.file_url,
            mode,
            custom: useCustom ? customSliders : undefined,
          }),
        });
        const data = await res.json();
        if (data.enhanced_url) {
          setPhotos(prev => prev.map(p => p.id === ph.id ? { ...p, enhanced_url: data.enhanced_url } : p));
        }
      } catch {}
      done++;
      setBulkDone(done);
      setBulkProgress(Math.round((done / photoList.length) * 100));
    }
    setBulkEnhancing(false);
    showMsg(` ${done} photos enhanced!`);
  };

  const enhanceAll = () => enhanceBulk(filteredPhotos);
  const enhanceSelected = () => enhanceBulk(filteredPhotos.filter(p => selected.has(p.id)));

  const resetPhoto = async (ph) => {
    if (!ph) return;
    await PropertyPhoto.update(ph.id, { enhanced_url: "" });
    setPhotos(prev => prev.map(p => p.id === ph.id ? { ...p, enhanced_url: "" } : p));
    showMsg("Reset to original");
  };

  const toggleSelect = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const displayUrl = (ph) => {
    if (showEnhanced && ph?.enhanced_url) return ph.enhanced_url;
    return ph?.file_url || "";
  };

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Link to={`/Review?property=${propertyId}`}>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-white">{property.address}</h1>
              <p className="text-xs text-gray-400">{filteredPhotos.length} photos | Photo Editor</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {message && (
              <span className="text-sm text-green-400 font-medium">{message}</span>
            )}
            <button
              onClick={() => setViewMode(v => v === "single" ? "grid" : "single")}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300"
            >
              {viewMode === "single" ? <LayoutGrid className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex gap-4">

        {/* Left Panel - Controls */}
        <div className="w-72 flex-shrink-0 space-y-4">

          {/* Room Filter */}
          <div className="bg-gray-900 rounded-xl p-3">
            <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">Filter by Room</p>
            <select
              value={filterRoom}
              onChange={e => { setFilterRoom(e.target.value); setCurrent(0); }}
              className="w-full bg-gray-800 text-white text-sm rounded-lg px-3 py-2 border border-gray-700"
            >
              {rooms.map(r => <option key={r} value={r}>{r} {r === "All" ? `(${photos.length})` : `(${photos.filter(p => p.room === r).length})`}</option>)}
            </select>
          </div>

          {/* Presets */}
          <div className="bg-gray-900 rounded-xl p-3">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Enhancement Preset</p>
              <button
                onClick={() => setUseCustom(!useCustom)}
                className={`text-xs px-2 py-1 rounded ${useCustom ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400"}`}
              >
                Custom
              </button>
            </div>
            {!useCustom ? (
              <div className="space-y-2">
                {ENHANCE_PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all ${selectedPreset === preset.id ? "bg-gray-700 border-blue-500" : "bg-gray-800 border-gray-700 hover:border-gray-600"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{preset.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-white">{preset.label}</p>
                        <p className="text-xs text-gray-400">{preset.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { key: "brightness", label: "Brightness", min: -100, max: 100 },
                  { key: "contrast", label: "Contrast", min: -100, max: 100 },
                  { key: "saturation", label: "Saturation", min: -100, max: 100 },
                  { key: "sharpen", label: "Sharpen", min: 0, max: 100 },
                  { key: "vibrance", label: "Vibrance", min: -100, max: 100 },
                ].map(({ key, label, min, max }) => (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-400">{label}</span>
                      <span className="text-xs text-white font-mono">{customSliders[key]}</span>
                    </div>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      value={customSliders[key]}
                      onChange={e => setCustomSliders(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                      className="w-full accent-blue-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          <div className="bg-gray-900 rounded-xl p-3 space-y-2">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Bulk Actions</p>

            {bulkEnhancing ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                  <span className="text-sm text-gray-300">Enhancing... {bulkDone}/{filteredPhotos.length}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${bulkProgress}%` }} />
                </div>
              </div>
            ) : (
              <>
                <Button
                  onClick={enhanceAll}
                  className="w-full bg-purple-600 hover:bg-purple-700 gap-2 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Enhance All {filterRoom !== "All" ? `(${filterRoom})` : "Photos"}
                </Button>
                {selected.size > 0 && (
                  <Button
                    onClick={enhanceSelected}
                    variant="outline"
                    className="w-full border-purple-500 text-purple-300 hover:bg-purple-900 gap-2 text-sm"
                  >
                    <Wand2 className="w-4 h-4" />
                    Enhance {selected.size} Selected
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {viewMode === "single" && photo ? (
            <div>
              {/* Before/After Toggle */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowEnhanced(false)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${!showEnhanced ? "bg-white text-gray-900" : "bg-gray-800 text-gray-400 hover:text-white"}`}
                  >
                    Original
                  </button>
                  <button
                    onClick={() => setShowEnhanced(true)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${showEnhanced ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}
                  >
                     Enhanced
                  </button>
                  {photo.enhanced_url && (
                    <Badge className="bg-green-900 text-green-300 border-green-700">Enhanced</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>{photo.room || "Unsorted"}</span>
                  <span>|</span>
                  <span>{photo.orientation}</span>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-3" style={{ minHeight: 400 }}>
                <img
                  src={displayUrl(photo)}
                  alt={photo.file_name}
                  className="w-full object-contain max-h-[60vh]"
                  style={{ background: "#111" }}
                />
                {!showEnhanced && photo.enhanced_url && (
                  <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Original
                  </div>
                )}
                {showEnhanced && photo.enhanced_url && (
                  <div className="absolute top-3 left-3 bg-purple-600/90 text-white text-xs px-2 py-1 rounded">
                     Enhanced
                  </div>
                )}
              </div>

              {/* Photo Actions */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Button
                  onClick={() => enhanceSingle(photo)}
                  disabled={enhancing}
                  className="bg-purple-600 hover:bg-purple-700 gap-2"
                >
                  {enhancing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                  {enhancing ? "Enhancing..." : "Enhance This Photo"}
                </Button>
                {photo.enhanced_url && (
                  <Button
                    onClick={() => resetPhoto(photo)}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset
                  </Button>
                )}
                {photo.enhanced_url && (
                  <a
                    href={photo.enhanced_url}
                    download
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 text-sm"
                  >
                    <Download className="w-4 h-4" /> Download Enhanced
                  </a>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrent(c => Math.max(0, c - 1))}
                  disabled={current === 0}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-30 text-sm"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-sm text-gray-400">{current + 1} / {filteredPhotos.length}</span>
                <button
                  onClick={() => setCurrent(c => Math.min(filteredPhotos.length - 1, c + 1))}
                  disabled={current === filteredPhotos.length - 1}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-30 text-sm"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredPhotos.map((ph, i) => (
                <div
                  key={ph.id}
                  className={`relative rounded-xl overflow-hidden cursor-pointer group aspect-square bg-gray-800 ${selected.has(ph.id) ? "ring-2 ring-purple-500" : ""}`}
                  onClick={() => {
                    if (viewMode === "grid") {
                      toggleSelect(ph.id);
                    }
                  }}
                  onDoubleClick={() => { setCurrent(i); setViewMode("single"); }}
                >
                  <img
                    src={showEnhanced && ph.enhanced_url ? ph.enhanced_url : ph.file_url}
                    alt={ph.file_name}
                    className="w-full h-full object-cover"
                  />
                  {ph.enhanced_url && (
                    <div className="absolute top-1.5 left-1.5 bg-purple-600/90 text-white text-xs px-1.5 py-0.5 rounded"></div>
                  )}
                  {selected.has(ph.id) && (
                    <div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-purple-400" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white truncate">{ph.room || "Unsorted"}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setCurrent(i); setViewMode("single"); }}
                    className="absolute top-1.5 right-1.5 bg-black/60 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
