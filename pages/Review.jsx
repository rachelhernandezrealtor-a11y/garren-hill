import { useState, useEffect } from "react";
import { Property, PropertyPhoto } from "@/api/entities";
import { InvokeAgent } from "@/api/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Wand2, Trash2, Sparkles, CheckCircle, ChevronLeft, ChevronRight, Loader2, LayoutGrid, LayoutList, Flag, SplitSquareHorizontal, FileImage } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CATEGORIES = ["Exterior", "Interior", "Uncategorized"];
const EXTERIOR_ROOMS = ["Front", "Back", "Side", "Garage", "Yard", "Pool", "Driveway", "Other Exterior"];
const INTERIOR_ROOMS = ["Living Room", "Kitchen", "Master Bedroom", "Bedroom", "Master Bathroom", "Bathroom", "Dining Room", "Office", "Basement", "Laundry Room", "Hallway", "Other Interior"];

const statusStyles = {
  Keep: "border-green-400 bg-green-50",
  Delete: "border-red-400 bg-red-50",
  Enhance: "border-purple-400 bg-purple-50",
  Pending: "border-gray-200 bg-white",
  Flag: "border-orange-400 bg-orange-50",
};

const orientationBadge = {
  Landscape: "bg-sky-100 text-sky-700",
  Portrait: "bg-rose-100 text-rose-700",
  Unknown: "bg-gray-100 text-gray-500",
};

export default function Review() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("property");

  const [property, setProperty] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [current, setCurrent] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDone, setAiDone] = useState(false);
  const [viewMode, setViewMode] = useState("single");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterOrientation, setFilterOrientation] = useState("All");
  const [selected, setSelected] = useState(new Set());
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [mlsAddedId, setMlsAddedId] = useState(null);

  useEffect(() => {
    if (!propertyId) return;
    Property.get(propertyId).then(setProperty);
    PropertyPhoto.filter({ property_id: propertyId }).then((p) => {
      setPhotos(p.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)));
    });
  }, [propertyId]);

  const runAiCategorize = async () => {
    setAiLoading(true);
    const toProcess = photos.filter((p) => !p.ai_category);
    for (const photo of toProcess) {
      try {
        const result = await InvokeAgent({
          prompt: `Look at this real estate photo and categorize it. URL: ${photo.file_url}
Return ONLY a JSON object:
- category: "Exterior" or "Interior"
- room: specific room/area (e.g. "Kitchen", "Living Room", "Front", "Backyard", "Master Bedroom", "Bathroom", "Garage")
- quality: "good", "needs_enhancement", or "poor"
JSON only, no other text.`,
          image_urls: [photo.file_url],
        });
        let parsed = {};
        try {
          const text = typeof result === "string" ? result : result?.content || result?.text || JSON.stringify(result);
          const match = text.match(/\{[\s\S]*\}/);
          parsed = match ? JSON.parse(match[0]) : {};
        } catch {}
        const updates = {
          ai_category: parsed.category || "Uncategorized",
          ai_room: parsed.room || "",
          category: parsed.category || "Uncategorized",
          room: parsed.room || "",
          status: parsed.quality === "poor" ? "Delete" : parsed.quality === "needs_enhancement" ? "Enhance" : "Keep",
        };
        await PropertyPhoto.update(photo.id, updates);
        setPhotos((prev) => prev.map((p) => p.id === photo.id ? { ...p, ...updates } : p));
      } catch (err) { console.error("AI failed for", photo.id, err); }
    }
    setAiLoading(false);
    setAiDone(true);
  };

  const updatePhoto = async (id, changes) => {
    await PropertyPhoto.update(id, changes);
    setPhotos((prev) => prev.map((p) => p.id === id ? { ...p, ...changes } : p));
  };

  const sendToMLS = async (photo) => {
    if (photo.mls_status === "Queued" || photo.mls_status === "Ready") return;
    // Get current MLS count to assign next order
    const mlsCount = photos.filter(p => p.mls_status === "Queued" || p.mls_status === "Ready").length;
    await updatePhoto(photo.id, { mls_status: "Queued", mls_sort_order: mlsCount });
    setMlsAddedId(photo.id);
    setTimeout(() => setMlsAddedId(null), 2000);
  };

  // Bulk actions
  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(filteredPhotos.map(p => p.id)));
  const clearSelected = () => setSelected(new Set());

  const bulkUpdate = async (changes) => {
    for (const id of selected) {
      await PropertyPhoto.update(id, changes);
    }
    setPhotos((prev) => prev.map((p) => selected.has(p.id) ? { ...p, ...changes } : p));
    clearSelected();
  };

  const bulkSendToMLS = async () => {
    let mlsCount = photos.filter(p => p.mls_status === "Queued" || p.mls_status === "Ready").length;
    for (const id of selected) {
      const photo = photos.find(p => p.id === id);
      if (!photo || photo.mls_status === "Queued" || photo.mls_status === "Ready") continue;
      await PropertyPhoto.update(id, { mls_status: "Queued", mls_sort_order: mlsCount });
      mlsCount++;
    }
    setPhotos((prev) => prev.map((p) => {
      if (!selected.has(p.id) || p.mls_status === "Queued" || p.mls_status === "Ready") return p;
      return { ...p, mls_status: "Queued" };
    }));
    clearSelected();
  };

  const filteredPhotos = photos.filter((p) => {
    if (filterStatus !== "All" && p.status !== filterStatus) return false;
    if (filterCategory !== "All" && p.category !== filterCategory) return false;
    if (filterOrientation !== "All" && p.orientation !== filterOrientation) return false;
    return true;
  });

  const photo = filteredPhotos[current];

  const stats = {
    keep: photos.filter((p) => p.status === "Keep").length,
    delete: photos.filter((p) => p.status === "Delete").length,
    enhance: photos.filter((p) => p.status === "Enhance").length,
    pending: photos.filter((p) => p.status === "Pending").length,
    flag: photos.filter((p) => p.flag_for_photographer).length,
    mls: photos.filter((p) => p.mls_status === "Queued" || p.mls_status === "Ready").length,
    landscape: photos.filter((p) => p.orientation === "Landscape").length,
    portrait: photos.filter((p) => p.orientation === "Portrait").length,
  };

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{property.address}</h1>
              <p className="text-sm text-gray-500">
                {photos.length} photos
                {property.mls_number && <span className="ml-2 text-gray-400">· MLS# {property.mls_number}</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {!aiDone && photos.some((p) => !p.ai_category) && (
              <Button onClick={runAiCategorize} disabled={aiLoading} className="bg-purple-600 hover:bg-purple-700 gap-2">
                {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {aiLoading ? "AI Sorting..." : "Auto-Sort with AI"}
              </Button>
            )}
            <Link to={`/MLS?property=${propertyId}`}>
              <Button variant="outline" className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                <FileImage className="w-4 h-4" />
                MLS Queue {stats.mls > 0 && <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{stats.mls}</span>}
              </Button>
            </Link>
            <Button onClick={() => navigate(`/Export?property=${propertyId}`)} className="bg-blue-600 hover:bg-blue-700 gap-2">
              Export <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-4 mb-4 bg-white rounded-xl border border-gray-200 px-5 py-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-green-400" /><span className="text-gray-600">Keep: <strong>{stats.keep}</strong></span></div>
          <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-red-400" /><span className="text-gray-600">Delete: <strong>{stats.delete}</strong></span></div>
          <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-purple-400" /><span className="text-gray-600">Enhance: <strong>{stats.enhance}</strong></span></div>
          <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-gray-300" /><span className="text-gray-600">Pending: <strong>{stats.pending}</strong></span></div>
          {stats.flag > 0 && <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-orange-400" /><span className="text-gray-600">Flagged: <strong>{stats.flag}</strong></span></div>}
          {stats.mls > 0 && <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-blue-400" /><span className="text-gray-600">MLS: <strong>{stats.mls}</strong></span></div>}
          <div className="w-px h-4 bg-gray-200 mx-1 hidden sm:block" />
          <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-sky-400" /><span className="text-gray-600">H: <strong>{stats.landscape}</strong></span></div>
          <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-rose-400" /><span className="text-gray-600">V: <strong>{stats.portrait}</strong></span></div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setViewMode("single")} className={`p-1.5 rounded ${viewMode === "single" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}><LayoutList className="w-4 h-4" /></button>
            <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}><LayoutGrid className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <Select value={filterStatus} onValueChange={(v) => { setFilterStatus(v); setCurrent(0); clearSelected(); }}>
            <SelectTrigger className="w-36 bg-white"><SelectValue /></SelectTrigger>
            <SelectContent>{["All", "Keep", "Delete", "Enhance", "Pending", "Flag"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={(v) => { setFilterCategory(v); setCurrent(0); clearSelected(); }}>
            <SelectTrigger className="w-40 bg-white"><SelectValue /></SelectTrigger>
            <SelectContent>{["All", "Exterior", "Interior", "Uncategorized"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={filterOrientation} onValueChange={(v) => { setFilterOrientation(v); setCurrent(0); clearSelected(); }}>
            <SelectTrigger className="w-40 bg-white"><SelectValue /></SelectTrigger>
            <SelectContent>{["All", "Landscape", "Portrait", "Unknown"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
          </Select>
          <span className="text-sm text-gray-500">{filteredPhotos.length} shown</span>
        </div>

        {/* Bulk Action Bar */}
        {selected.size > 0 && (
          <div className="flex items-center gap-3 mb-4 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex-wrap">
            <span className="text-sm font-medium text-blue-700">{selected.size} selected</span>
            <div className="flex items-center gap-2 flex-wrap">
              <Button size="sm" onClick={() => bulkUpdate({ status: "Keep" })} className="bg-green-600 hover:bg-green-700 h-8 text-xs gap-1"><CheckCircle className="w-3 h-3" /> Keep</Button>
              <Button size="sm" onClick={() => bulkUpdate({ status: "Enhance" })} className="bg-purple-600 hover:bg-purple-700 h-8 text-xs gap-1"><Wand2 className="w-3 h-3" /> Enhance</Button>
              <Button size="sm" onClick={() => bulkUpdate({ status: "Delete" })} className="bg-red-600 hover:bg-red-700 h-8 text-xs gap-1"><Trash2 className="w-3 h-3" /> Delete</Button>
              <Button size="sm" onClick={() => bulkUpdate({ flag_for_photographer: true })} className="bg-orange-500 hover:bg-orange-600 h-8 text-xs gap-1"><Flag className="w-3 h-3" /> Flag</Button>
              <Button size="sm" onClick={bulkSendToMLS} className="bg-blue-600 hover:bg-blue-700 h-8 text-xs gap-1"><FileImage className="w-3 h-3" /> Send to MLS</Button>
            </div>
            <button onClick={clearSelected} className="ml-auto text-sm text-blue-500 hover:text-blue-700">Clear</button>
            <button onClick={selectAll} className="text-sm text-blue-500 hover:text-blue-700">Select All</button>
          </div>
        )}

        {/* Grid View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredPhotos.map((p, i) => (
              <div
                key={p.id}
                className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all hover:scale-[1.02] ${
                  selected.has(p.id) ? "border-blue-500 ring-2 ring-blue-300" :
                  p.mls_status === "Queued" || p.mls_status === "Ready" ? "border-blue-300" :
                  p.status === "Keep" ? "border-green-300" :
                  p.status === "Delete" ? "border-red-300" :
                  p.status === "Enhance" ? "border-purple-300" :
                  p.status === "Flag" ? "border-orange-300" : "border-gray-200"
                }`}
                onClick={() => { setCurrent(i); setViewMode("single"); }}
              >
                <img src={p.file_url} alt={p.custom_name || p.file_name} className="w-full h-32 object-cover" />
                <div className="absolute top-2 left-2 z-10" onClick={(e) => { e.stopPropagation(); toggleSelect(p.id); }}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selected.has(p.id) ? "bg-blue-500 border-blue-500" : "bg-white/80 border-gray-300"}`}>
                    {selected.has(p.id) && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  {p.flag_for_photographer && <Flag className="w-4 h-4 text-orange-500 fill-orange-400" />}
                  {(p.mls_status === "Queued" || p.mls_status === "Ready") && (
                    <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">MLS</span>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-2">
                  <p className="text-white text-xs font-medium truncate">{p.custom_name || p.file_name}</p>
                  {p.room && <p className="text-white/70 text-xs">{p.room}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No photos match the current filter</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Photo Viewer */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="relative bg-black aspect-[4/3]">
                {showBeforeAfter && photo.enhanced_url ? (
                  <div className="flex w-full h-full">
                    <div className="flex-1 relative">
                      <img src={photo.file_url} className="w-full h-full object-contain" alt="Original" />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">Original</span>
                    </div>
                    <div className="w-px bg-white/40" />
                    <div className="flex-1 relative">
                      <img src={photo.enhanced_url} className="w-full h-full object-contain" alt="Enhanced" />
                      <span className="absolute bottom-2 right-2 bg-purple-600/80 text-white text-xs px-2 py-1 rounded">Enhanced</span>
                    </div>
                  </div>
                ) : (
                  <img src={photo.enhanced_url || photo.file_url} alt={photo.custom_name} className="w-full h-full object-contain" />
                )}

                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${
                  photo.status === "Keep" ? "bg-green-100 text-green-700 border-green-200" :
                  photo.status === "Delete" ? "bg-red-100 text-red-700 border-red-200" :
                  photo.status === "Enhance" ? "bg-purple-100 text-purple-700 border-purple-200" :
                  photo.status === "Flag" ? "bg-orange-100 text-orange-700 border-orange-200" :
                  "bg-gray-100 text-gray-600 border-gray-200"
                }`}>{photo.status}</div>

                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${orientationBadge[photo.orientation] || orientationBadge.Unknown}`}>
                    {photo.orientation === "Landscape" ? "⬛ H" : photo.orientation === "Portrait" ? "▮ V" : "?"}
                  </span>
                  {photo.flag_for_photographer && <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"><Flag className="w-3 h-3" />Flagged</span>}
                  {(photo.mls_status === "Queued" || photo.mls_status === "Ready") && (
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">✓ In MLS Queue</span>
                  )}
                </div>

                {photo.ai_category && (
                  <div className="absolute bottom-10 left-3 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                    <Sparkles className="w-3 h-3 text-purple-300" />
                    AI: {photo.ai_room || photo.ai_category}
                  </div>
                )}

                {photo.enhanced_url && (
                  <button
                    onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                    className={`absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all ${showBeforeAfter ? "bg-purple-600 text-white" : "bg-black/50 text-white hover:bg-purple-600"}`}
                  >
                    <SplitSquareHorizontal className="w-3 h-3" />
                    {showBeforeAfter ? "Before/After On" : "Before/After"}
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                <Button variant="ghost" size="sm" disabled={current === 0} onClick={() => setCurrent(c => c - 1)}>
                  <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                </Button>
                <span className="text-sm text-gray-500">{current + 1} / {filteredPhotos.length}</span>
                <Button variant="ghost" size="sm" disabled={current === filteredPhotos.length - 1} onClick={() => setCurrent(c => c + 1)}>
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Edit Panel */}
            <div className="space-y-4">
              {/* Name */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Photo Name</label>
                <Input
                  value={photo.custom_name || ""}
                  onChange={(e) => updatePhoto(photo.id, { custom_name: e.target.value })}
                  placeholder="Enter photo name..."
                  className="text-sm"
                />
              </div>

              {/* Category & Room */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">Category</label>
                <Select value={photo.category} onValueChange={(v) => updatePhoto(photo.id, { category: v, room: "" })}>
                  <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
                {photo.category !== "Uncategorized" && (
                  <>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">Room / Area</label>
                    <Select value={photo.room || ""} onValueChange={(v) => updatePhoto(photo.id, { room: v })}>
                      <SelectTrigger className="text-sm"><SelectValue placeholder="Select room..." /></SelectTrigger>
                      <SelectContent>
                        {(photo.category === "Exterior" ? EXTERIOR_ROOMS : INTERIOR_ROOMS).map(r => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">Orientation</label>
                <Select value={photo.orientation || "Unknown"} onValueChange={(v) => updatePhoto(photo.id, { orientation: v })}>
                  <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Landscape">⬛ Horizontal (Landscape)</SelectItem>
                    <SelectItem value="Portrait">▮ Vertical (Portrait)</SelectItem>
                    <SelectItem value="Unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Notes</label>
                <Textarea
                  value={photo.notes || ""}
                  onChange={(e) => updatePhoto(photo.id, { notes: e.target.value })}
                  placeholder="e.g. retake this shot, use for hero image..."
                  className="text-sm resize-none h-20"
                />
              </div>

              {/* Actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">Action</label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[
                    { key: "Keep", icon: <CheckCircle className="w-4 h-4" />, color: "green" },
                    { key: "Enhance", icon: <Wand2 className="w-4 h-4" />, color: "purple" },
                    { key: "Delete", icon: <Trash2 className="w-4 h-4" />, color: "red" },
                    { key: "Flag", icon: <Flag className="w-4 h-4" />, color: "orange" },
                  ].map(({ key, icon, color }) => (
                    <button
                      key={key}
                      onClick={() => updatePhoto(photo.id, { status: key })}
                      className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 transition-all ${
                        photo.status === key ? statusStyles[key] : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className={photo.status === key ? `text-${color}-500` : "text-gray-400"}>{icon}</span>
                      <span className="text-xs font-medium">{key}</span>
                    </button>
                  ))}
                </div>

                {/* Flag for photographer */}
                <button
                  onClick={() => updatePhoto(photo.id, { flag_for_photographer: !photo.flag_for_photographer })}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm mb-2 ${
                    photo.flag_for_photographer ? "border-orange-300 bg-orange-50 text-orange-700" : "border-gray-200 text-gray-500 hover:border-orange-200"
                  }`}
                >
                  <Flag className={`w-4 h-4 ${photo.flag_for_photographer ? "fill-orange-400 text-orange-500" : ""}`} />
                  {photo.flag_for_photographer ? "Flagged for photographer" : "Flag for photographer to reshoot"}
                </button>

                {/* Send to MLS */}
                <button
                  onClick={() => sendToMLS(photo)}
                  disabled={photo.mls_status === "Queued" || photo.mls_status === "Ready"}
                  className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm ${
                    photo.mls_status === "Queued" || photo.mls_status === "Ready"
                      ? "border-blue-300 bg-blue-50 text-blue-700 cursor-default"
                      : "border-gray-200 text-gray-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  <FileImage className="w-4 h-4" />
                  {mlsAddedId === photo.id ? "✓ Added to MLS Queue!" :
                   photo.mls_status === "Queued" || photo.mls_status === "Ready" ? "✓ In MLS Queue" :
                   "Send to MLS Queue"}
                </button>
              </div>

              {/* Thumbnail strip */}
              <div className="bg-white rounded-xl border border-gray-200 p-3">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {filteredPhotos.map((p, i) => (
                    <button key={p.id} onClick={() => setCurrent(i)} className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all relative ${i === current ? "border-blue-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}>
                      <img src={p.file_url} alt="" className="w-14 h-10 object-cover" />
                      {p.flag_for_photographer && <Flag className="w-2.5 h-2.5 text-orange-500 absolute top-0.5 right-0.5" />}
                      {(p.mls_status === "Queued" || p.mls_status === "Ready") && (
                        <div className="absolute bottom-0 left-0 right-0 bg-blue-600/70 text-white text-center" style={{fontSize: "8px"}}>MLS</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
