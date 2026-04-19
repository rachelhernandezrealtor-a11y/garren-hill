import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

const PHOTO_HUB_URL = "https://base44.app/api/apps/69e2578ca7113dbe93cb208d/functions/getPhotosByRoom";

const ROOM_ORDER = [
  "Portico","Entrance Hall","Living Room","Dining Room","Kitchen",
  "Breakfast Room","Butler's Pantry","Library","Sitting Room","Powder Room",
  "Master Bedroom","Master Bath","TV Room","Bedroom #1","Bedroom #2",
  "Bedroom #3","Bedroom #4","Bath #2","Bath #3","Bath #4",
  "Dressing Room","Office / Game Study","Upper Stair Hall",
  "Rear Porch","Balcony","Pool","Wee Cottage","Garage",
];

function LazyImg({ src, alt, className, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "300px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} overflow-hidden bg-stone-900`} onClick={onClick}>
      {!loaded && <div className="w-full h-full bg-gradient-to-br from-stone-800 to-stone-900 animate-pulse" />}
      {inView && (
        <img
          src={src} alt={alt}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 cursor-pointer hover:scale-[1.03] ${loaded ? "opacity-100" : "opacity-0 absolute inset-0"}`}
        />
      )}
    </div>
  );
}

export default function GarrenHillGallery() {
  const [grouped, setGrouped] = useState({});
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null); // { photos, idx }
  const [totalCount, setTotalCount] = useState(0);
  const roomRefs = useRef({});

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
          setTotalCount(Object.values(data.grouped).reduce((a, arr) => a + arr.length, 0));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scrollToRoom = (room) => {
    setActiveRoom(room);
    roomRefs.current[room]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const prevPhoto = () => {
    if (!lightbox) return;
    if (lightbox.idx > 0) setLightbox({ ...lightbox, idx: lightbox.idx - 1 });
  };
  const nextPhoto = () => {
    if (!lightbox) return;
    if (lightbox.idx < lightbox.photos.length - 1) setLightbox({ ...lightbox, idx: lightbox.idx + 1 });
  };

  useEffect(() => {
    const handler = (e) => {
      if (!lightbox) return;
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#111009" }}>
      <div className="text-center space-y-4">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-400 to-transparent mx-auto animate-pulse" />
        <p className="text-amber-400/60 text-xs tracking-[0.4em] uppercase">Garren Hill</p>
      </div>
    </div>
  );

  const currentPhoto = lightbox ? lightbox.photos[lightbox.idx] : null;

  return (
    <div className="min-h-screen" style={{ background: "#111009", fontFamily: "'Georgia', serif" }}>

      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 py-24 border-b border-white/8">
        <div className="w-px h-10 bg-amber-400/40 mx-auto mb-8" />
        <p className="text-amber-400/70 text-[10px] tracking-[0.5em] uppercase mb-4">Pinehurst, North Carolina · Est. 1916</p>
        <h1 className="text-5xl md:text-7xl font-light text-white/90 tracking-wide mb-4">Garren Hill</h1>
        <p className="text-white/30 text-sm tracking-widest uppercase mb-2">200 Hollycrest Drive</p>
        <div className="w-px h-6 bg-amber-400/20 mx-auto mt-6" />
        <p className="text-white/20 text-xs tracking-[0.3em] uppercase mt-4">{totalCount} Photographs</p>
      </div>

      {/* Sticky Room Nav */}
      <div className="sticky top-0 z-30 border-b border-white/8 backdrop-blur-md" style={{ background: "rgba(17,16,9,0.92)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-0 overflow-x-auto">
            {rooms.map((room, i) => (
              <button
                key={room}
                onClick={() => scrollToRoom(room)}
                className={`flex-shrink-0 px-4 py-4 text-[11px] tracking-[0.15em] uppercase transition-all border-b-2 ${
                  activeRoom === room
                    ? "border-amber-400 text-amber-400"
                    : "border-transparent text-white/35 hover:text-white/70"
                }`}
              >
                {room}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Room Sections */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-20">
        {rooms.map(room => {
          const photos = grouped[room] || [];
          if (!photos.length) return null;

          // Editorial masonry-style layout
          // First photo is hero (full width), rest in grid
          const hero = photos[0];
          const rest = photos.slice(1);

          return (
            <div
              key={room}
              ref={el => roomRefs.current[room] = el}
              className="scroll-mt-16"
            >
              {/* Room Header */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-6 h-px bg-amber-400/40" />
                <h2 className="text-white/50 text-[11px] tracking-[0.4em] uppercase">{room}</h2>
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-white/20 text-[11px] tracking-widest">{photos.length}</span>
              </div>

              {/* Hero + grid layout */}
              <div className="space-y-2">
                {/* Hero image — full width, tall */}
                <LazyImg
                  src={hero.photoUrl}
                  alt={hero.fileName}
                  className="w-full aspect-[16/7] rounded-sm"
                  onClick={() => setLightbox({ photos, idx: 0 })}
                />

                {/* Rest in responsive grid */}
                {rest.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {rest.slice(0, 7).map((photo, i) => (
                      <LazyImg
                        key={photo.id}
                        src={photo.photoUrl}
                        alt={photo.fileName}
                        className="aspect-[4/3] rounded-sm"
                        onClick={() => setLightbox({ photos, idx: i + 1 })}
                      />
                    ))}
                    {rest.length > 7 && (
                      <div
                        className="aspect-[4/3] rounded-sm flex items-center justify-center border border-white/10 cursor-pointer hover:border-amber-400/30 transition-all"
                        style={{ background: "#1a1810" }}
                        onClick={() => setLightbox({ photos, idx: 8 })}
                      >
                        <div className="text-center">
                          <p className="text-white/50 text-2xl font-light">+{rest.length - 7}</p>
                          <p className="text-white/20 text-[10px] tracking-widest uppercase mt-1">more</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-white/8 text-center py-12 px-6">
        <div className="w-px h-8 bg-amber-400/20 mx-auto mb-6" />
        <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase">Garren Hill · Pinehurst, North Carolina</p>
        <p className="text-white/10 text-[10px] tracking-widest mt-2">Rachel Hernandez · Realtor</p>
      </div>

      {/* Lightbox */}
      {lightbox && currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(8,8,5,0.97)" }}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 text-white/30 hover:text-white/80 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={prevPhoto}
            disabled={lightbox.idx === 0}
            className="absolute left-4 md:left-8 text-white/20 hover:text-white/60 disabled:opacity-0 transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Image */}
          <div className="w-full max-w-5xl px-16 md:px-20">
            <img
              src={currentPhoto.photoUrl}
              alt={currentPhoto.fileName}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="mt-5 flex items-center justify-between">
              <p className="text-amber-400/40 text-[10px] tracking-[0.3em] uppercase">{currentPhoto.room}</p>
              <p className="text-white/15 text-[10px] tracking-widest">{lightbox.idx + 1} / {lightbox.photos.length}</p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={nextPhoto}
            disabled={lightbox.idx === lightbox.photos.length - 1}
            className="absolute right-4 md:right-8 text-white/20 hover:text-white/60 disabled:opacity-0 transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </div>
  );
}
