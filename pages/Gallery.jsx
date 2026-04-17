import { useState, useEffect } from "react";
import { Property, PropertyPhoto } from "@/api/entities";
import { X, ZoomIn, Home } from "lucide-react";

export default function Gallery() {
  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("property");

  const [property, setProperty] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeRoom, setActiveRoom] = useState("All");
  const [activeOrientation, setActiveOrientation] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!propertyId) { setLoading(false); return; }
    Promise.all([
      Property.get(propertyId),
      PropertyPhoto.filter({ property_id: propertyId }),
    ]).then(([prop, ph]) => {
      setProperty(prop);
      const kept = ph.filter(p => p.status === "Keep" || p.status === "Enhance");
      setPhotos(kept.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [propertyId]);

  const categories = ["All", ...new Set(photos.map(p => p.category).filter(Boolean))];
  const rooms = ["All", ...new Set(
    photos
      .filter(p => activeCategory === "All" || p.category === activeCategory)
      .map(p => p.room).filter(Boolean)
  )];
  const orientations = ["All", ...new Set(photos.map(p => p.orientation).filter(Boolean))];

  const filtered = photos.filter(p => {
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    if (activeRoom !== "All" && p.room !== activeRoom) return false;
    if (activeOrientation !== "All" && p.orientation !== activeOrientation) return false;
    return true;
  });

  const lightboxIdx = lightbox !== null ? filtered.findIndex(p => p.id === lightbox) : -1;

  // Smart grid: landscape photos get wider cells
  const getGridClass = (p) => {
    if (p.orientation === "Landscape") return "col-span-2";
    return "col-span-1";
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!property) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <Home className="w-12 h-12 text-gray-200 mx-auto mb-3" />
        <p className="text-gray-400">Property not found</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 text-white px-6 py-12 text-center">
        <p className="text-blue-300 text-sm font-medium uppercase tracking-widest mb-2">Property Gallery</p>
        <h1 className="text-3xl font-bold mb-1">{property.address}</h1>
        {(property.city || property.state) && (
          <p className="text-blue-200 text-lg">{[property.city, property.state].filter(Boolean).join(", ")}</p>
        )}
        <p className="text-white/50 text-sm mt-3">{photos.length} photos</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setActiveRoom("All"); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Room Filter */}
        {rooms.length > 2 && (
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {rooms.map(room => (
              <button key={room} onClick={() => setActiveRoom(room)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${activeRoom === room ? "border-blue-400 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-blue-300"}`}>
                {room}
              </button>
            ))}
          </div>
        )}

        {/* Orientation Filter */}
        {orientations.length > 2 && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {orientations.map(o => (
              <button key={o} onClick={() => setActiveOrientation(o)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${activeOrientation === o ? "border-slate-500 bg-slate-100 text-slate-700" : "border-gray-200 text-gray-500 hover:border-slate-300"}`}>
                {o === "Landscape" ? "⬛ Horizontal" : o === "Portrait" ? "▮ Vertical" : o}
              </button>
            ))}
          </div>
        )}

        {/* Smart Photo Grid — landscape photos take 2 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setLightbox(p.id)}
              className={`group relative rounded-xl overflow-hidden bg-gray-100 hover:shadow-lg transition-all hover:scale-[1.02] ${getGridClass(p)}`}
              style={{ aspectRatio: p.orientation === "Portrait" ? "3/4" : "16/9" }}
            >
              <img
                src={p.enhanced_url || p.file_url}
                alt={p.custom_name || p.file_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-2 opacity-0 group-hover:opacity-100 transition-all">
                <p className="text-white text-xs truncate">{p.custom_name || p.file_name}</p>
                {p.room && <p className="text-white/70 text-xs">{p.room}</p>}
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">No photos in this category</div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && lightboxIdx >= 0 && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/70 hover:text-white">
            <X className="w-7 h-7" />
          </button>
          <button
            onClick={() => lightboxIdx > 0 && setLightbox(filtered[lightboxIdx - 1].id)}
            disabled={lightboxIdx === 0}
            className="absolute left-4 text-white/70 hover:text-white disabled:opacity-20 text-4xl font-light px-2"
          >‹</button>
          <div className="max-w-4xl w-full">
            <img
              src={filtered[lightboxIdx].enhanced_url || filtered[lightboxIdx].file_url}
              alt={filtered[lightboxIdx].custom_name}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-3">
              <p className="text-white font-medium">{filtered[lightboxIdx].custom_name || filtered[lightboxIdx].file_name}</p>
              <div className="flex items-center justify-center gap-3 mt-1">
                {filtered[lightboxIdx].room && <p className="text-white/50 text-sm">{filtered[lightboxIdx].category} · {filtered[lightboxIdx].room}</p>}
                <span className={`text-xs px-2 py-0.5 rounded-full ${filtered[lightboxIdx].orientation === "Landscape" ? "bg-sky-900 text-sky-300" : "bg-rose-900 text-rose-300"}`}>
                  {filtered[lightboxIdx].orientation === "Landscape" ? "⬛ Horizontal" : "▮ Vertical"}
                </span>
              </div>
              <p className="text-white/30 text-xs mt-1">{lightboxIdx + 1} / {filtered.length}</p>
            </div>
          </div>
          <button
            onClick={() => lightboxIdx < filtered.length - 1 && setLightbox(filtered[lightboxIdx + 1].id)}
            disabled={lightboxIdx === filtered.length - 1}
            className="absolute right-4 text-white/70 hover:text-white disabled:opacity-20 text-4xl font-light px-2"
          >›</button>
        </div>
      )}
    </div>
  );
}
