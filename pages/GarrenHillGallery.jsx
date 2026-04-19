import { useState, useEffect, useRef, useCallback } from "react";
import { X, ZoomIn, Home, ChevronLeft, ChevronRight } from "lucide-react";

const PHOTO_HUB_URL = "https://base44.app/api/apps/69e2578ca7113dbe93cb208d/functions/getPhotosByRoom";

const ROOM_ORDER = [
  "Portico","Entrance Hall","Living Room","Dining Room","Kitchen",
  "Breakfast Room","Butler's Pantry","Library","Sitting Room","Powder Room",
  "Master Bedroom","Master Bath","TV Room","Bedroom #1","Bedroom #2",
  "Bedroom #3","Bedroom #4","Bath #2","Bath #3","Bath #4",
  "Dressing Room","Office / Game Study","Upper Stair Hall",
  "Rear Porch","Balcony","Pool","Wee Cottage","Garage",
];

// Lazy image component — loads only when in viewport
function LazyPhoto({ src, alt, onClick, className }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-white/5 ${className}`}>
      {/* Blur placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 animate-pulse" />
      )}
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onClick={onClick}
          className={`w-full h-full object-cover cursor-pointer transition-all duration-500 hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
      {inView && loaded && (
        <div
          onClick={onClick}
          className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all flex items-center justify-center cursor-pointer group"
        >
          <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-all" />
        </div>
      )}
    </div>
  );
}

export default function GarrenHillGallery() {
  const [grouped, setGrouped] = useState({});
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState("All");
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [lightboxPhotos, setLightboxPhotos] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // Load only room names + first photo per room on mount (fast)
  useEffect(() => {
    fetch(PHOTO_HUB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    })
      .then(r => r.json())
      .then(data => {
        if (data.grouped) {
          setGrouped(data.grouped);
          const sorted = [
            ...ROOM_ORDER.filter(r => data.grouped[r]),
            ...Object.keys(data.grouped).filter(r => !ROOM_ORDER.includes(r)).sort()
          ];
          setRooms(sorted);
          setTotalCount(Object.values(data.grouped).reduce((acc, arr) => acc + arr.length, 0));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayPhotos = activeRoom === "All"
    ? rooms.flatMap(r => grouped[r] || [])
    : (grouped[activeRoom] || []);

  const lightboxIdx = lightbox !== null
    ? lightboxPhotos.findIndex(p => p.id === lightbox)
    : -1;

  const openLightbox = (photo, photos) => {
    setLightboxPhotos(photos);
    setLightbox(photo.id);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#1a1610] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-amber-200/50 text-sm tracking-widest uppercase">Loading Gallery</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1610]">
      {/* Header */}
      <div className="px-6 pt-16 pb-10 text-center border-b border-white/10">
        <p className="text-amber-400 text-xs font-medium uppercase tracking-[0.3em] mb-3">Photo Gallery</p>
        <h1 className="text-4xl font-light text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>Garren Hill</h1>
        <p className="text-white/40 text-sm">200 Hollycrest Drive · Pinehurst, North Carolina</p>
        <p className="text-white/25 text-xs mt-2">{totalCount} photographs</p>
      </div>

      {/* Room Filter */}
      <div className="sticky top-0 z-20 bg-[#1a1610]/95 backdrop-blur-sm border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-6xl mx-auto">
          <button
            onClick={() => setActiveRoom("All")}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
              activeRoom === "All" ? "bg-amber-400 text-black" : "border border-white/20 text-white/60 hover:border-amber-400/50 hover:text-amber-200"
            }`}
          >
            All Rooms
          </button>
          {rooms.map(room => (
            <button
              key={room}
              onClick={() => setActiveRoom(room)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeRoom === room ? "bg-amber-400 text-black" : "border border-white/20 text-white/60 hover:border-amber-400/50 hover:text-amber-200"
              }`}
            >
              {room}
              <span className="ml-1.5 text-[10px] opacity-50">{(grouped[room] || []).length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeRoom === "All" ? (
          // Grouped view — show first 6 per room, lazy loaded
          rooms.map(room => {
            const photos = grouped[room] || [];
            const preview = photos.slice(0, 6);
            return (
              <div key={room} className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-white/80 text-sm font-medium tracking-widest uppercase">{room}</h2>
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-white/25 text-xs">{photos.length}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {preview.map(photo => (
                    <LazyPhoto
                      key={photo.id}
                      src={photo.photoUrl}
                      alt={photo.fileName}
                      onClick={() => openLightbox(photo, photos)}
                      className="aspect-[4/3] rounded-lg"
                    />
                  ))}
                </div>
                {photos.length > 6 && (
                  <button
                    onClick={() => setActiveRoom(room)}
                    className="mt-3 text-amber-400/50 hover:text-amber-400 text-xs tracking-widest uppercase transition-colors"
                  >
                    View all {photos.length} photos →
                  </button>
                )}
              </div>
            );
          })
        ) : (
          // Single room — full grid, lazy loaded
          <div>
            <button
              onClick={() => setActiveRoom("All")}
              className="flex items-center gap-2 text-amber-400/70 hover:text-amber-400 text-sm mb-6 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              All Rooms
            </button>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {displayPhotos.map(photo => (
                <LazyPhoto
                  key={photo.id}
                  src={photo.photoUrl}
                  alt={photo.fileName}
                  onClick={() => openLightbox(photo, displayPhotos)}
                  className="aspect-[4/3] rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {displayPhotos.length === 0 && (
          <div className="text-center py-20 text-white/20">
            <Home className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No photos in this room yet</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && lightboxIdx >= 0 && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={() => lightboxIdx > 0 && setLightbox(lightboxPhotos[lightboxIdx - 1].id)}
            disabled={lightboxIdx === 0}
            className="absolute left-4 text-white/30 hover:text-white disabled:opacity-10 transition-colors p-2"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="max-w-5xl w-full">
            <img
              src={lightboxPhotos[lightboxIdx].photoUrl}
              alt={lightboxPhotos[lightboxIdx].fileName}
              className="w-full max-h-[82vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <p className="text-amber-400/60 text-xs tracking-widest uppercase">{lightboxPhotos[lightboxIdx].room}</p>
              <p className="text-white/20 text-xs mt-1">{lightboxIdx + 1} / {lightboxPhotos.length}</p>
            </div>
          </div>
          <button
            onClick={() => lightboxIdx < lightboxPhotos.length - 1 && setLightbox(lightboxPhotos[lightboxIdx + 1].id)}
            disabled={lightboxIdx === lightboxPhotos.length - 1}
            className="absolute right-4 text-white/30 hover:text-white disabled:opacity-10 transition-colors p-2"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
}
