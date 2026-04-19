import { useState, useEffect, useRef } from "react";
import { PropertyPhoto, Property } from "@/api/entities";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const PROPERTY_ID = "69e4406f90bbe19ad72108ab";

const ROOM_ORDER = [
  "Aerial","Exterior","Main House","Living Room","Kitchen","Dining Room",
  "Master Bedroom","Master Bath","Bedroom #2","Bedroom #3","Bath #2","Bath #3",
  "Office","Barn","Guest House","Pool","Gardens","Pasture","Outbuildings",
];

function LazyImg({ src, alt, className, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "400px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} overflow-hidden`} style={{ background: "#0f1a0f" }} onClick={onClick}>
      {!loaded && <div className="w-full h-full animate-pulse" style={{ background: "#1a2e1a" }} />}
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

export default function FlowFarmGallery() {
  const [grouped, setGrouped] = useState({});
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [matterportUrl, setMatterportUrl] = useState(null);
  const [showTour, setShowTour] = useState(false);
  const roomRefs = useRef({});

  useEffect(() => {
    const load = async () => {
      try {
        const props = await Property.filter({ id: PROPERTY_ID });
        if (props.length > 0 && props[0].matterport_urls?.length) {
          setMatterportUrl(props[0].matterport_urls[0]);
        }

        let all = [];
        let skip = 0;
        let hasMore = true;
        while (hasMore) {
          const batch = await PropertyPhoto.filter(
            { property_id: PROPERTY_ID },
            { limit: 200, skip, sort: "sort_order" }
          );
          all = [...all, ...batch];
          hasMore = batch.length === 200;
          skip += 200;
        }

        const groups = {};
        all.forEach(p => {
          const room = p.room || "Uncategorized";
          if (!groups[room]) groups[room] = [];
          groups[room].push(p);
        });

        setGrouped(groups);
        setTotalCount(all.length);

        const sorted = [
          ...ROOM_ORDER.filter(r => groups[r]?.length),
          ...Object.keys(groups).filter(r => !ROOM_ORDER.includes(r) && r !== "Uncategorized").sort(),
          ...(groups["Uncategorized"] ? ["Uncategorized"] : [])
        ];
        setRooms(sorted);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    load();
  }, []);

  const scrollToRoom = (room) => {
    setActiveRoom(room);
    roomRefs.current[room]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const prevPhoto = () => lightbox?.idx > 0 && setLightbox({ ...lightbox, idx: lightbox.idx - 1 });
  const nextPhoto = () => lightbox && lightbox.idx < lightbox.photos.length - 1 && setLightbox({ ...lightbox, idx: lightbox.idx + 1 });

  useEffect(() => {
    const handler = (e) => {
      if (!lightbox) return;
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "Escape") { setLightbox(null); setShowTour(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  const green = "#7a9e5f";

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0b120b" }}>
      <div className="text-center space-y-4">
        <div className="w-px h-16 mx-auto animate-pulse" style={{ background: `linear-gradient(to bottom, transparent, ${green}, transparent)` }} />
        <p className="text-xs tracking-[0.4em] uppercase" style={{ color: `${green}99` }}>Loading Flow Farm</p>
      </div>
    </div>
  );

  const currentPhoto = lightbox ? lightbox.photos[lightbox.idx] : null;

  return (
    <div className="min-h-screen" style={{ background: "#0b120b", fontFamily: "'Georgia', serif" }}>

      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 py-24 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="w-px h-10 mx-auto mb-8" style={{ background: `${green}40` }} />
        <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: `${green}80` }}>Pinehurst, North Carolina · 15 Acres</p>
        <h1 className="text-5xl md:text-7xl font-light tracking-wide mb-4" style={{ color: "rgba(255,255,255,0.9)" }}>Flow Farm</h1>
        <p className="text-sm tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Regenerative Estate · Six Structures</p>
        <div className="w-px h-6 mx-auto mt-6" style={{ background: `${green}20` }} />
        <p className="text-xs tracking-[0.3em] uppercase mt-4" style={{ color: "rgba(255,255,255,0.2)" }}>{totalCount > 0 ? `${totalCount} Photographs` : "Photography Coming Soon"}</p>

        {matterportUrl && (
          <button onClick={() => setShowTour(true)}
            className="mt-8 px-8 py-3 text-[11px] tracking-[0.3em] uppercase transition-all"
            style={{ border: `1px solid ${green}40`, color: `${green}80` }}>
            ◈ Virtual Tour
          </button>
        )}
      </div>

      {/* Sticky Room Nav */}
      {rooms.length > 0 && (
        <div className="sticky top-0 z-30 border-b backdrop-blur-md" style={{ background: "rgba(11,18,11,0.92)", borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-0 overflow-x-auto">
              {rooms.map((room) => (
                <button key={room} onClick={() => scrollToRoom(room)}
                  className={`flex-shrink-0 px-4 py-4 text-[11px] tracking-[0.15em] uppercase transition-all border-b-2`}
                  style={{
                    borderBottomColor: activeRoom === room ? green : "transparent",
                    color: activeRoom === room ? green : "rgba(255,255,255,0.35)"
                  }}>
                  {room}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {rooms.length === 0 && (
        <div className="max-w-2xl mx-auto px-8 py-32 text-center">
          <div className="w-px h-16 mx-auto mb-8" style={{ background: `${green}30` }} />
          <p className="text-[11px] tracking-[0.4em] uppercase mb-6" style={{ color: `${green}60` }}>Gallery</p>
          <h2 className="text-3xl font-light mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>Photography Coming Soon</h2>
          <p className="text-sm leading-loose" style={{ color: "rgba(255,255,255,0.25)" }}>
            We're preparing a full editorial gallery of Flow Farm. Check back soon or reach out directly.
          </p>
          <div className="mt-12">
            <a href="mailto:rachelhernandezrealtor@gmail.com"
              className="text-[11px] tracking-[0.3em] uppercase px-8 py-4 inline-block"
              style={{ border: `1px solid ${green}50`, color: `${green}70`, textDecoration: "none" }}>
              Contact Rachel Hernandez
            </a>
          </div>
        </div>
      )}

      {/* Room Sections */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-20">
        {rooms.map(room => {
          const photos = grouped[room] || [];
          if (!photos.length) return null;
          const hero = photos[0];
          const rest = photos.slice(1);

          return (
            <div key={room} ref={el => roomRefs.current[room] = el} className="scroll-mt-16">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-6 h-px" style={{ background: `${green}40` }} />
                <h2 className="text-[11px] tracking-[0.4em] uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>{room}</h2>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                <span className="text-[11px] tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>{photos.length}</span>
              </div>

              <div className="space-y-2">
                <LazyImg
                  src={hero.file_url} alt={hero.file_name}
                  className="w-full aspect-[16/7] rounded-sm"
                  onClick={() => setLightbox({ photos, idx: 0 })}
                />
                {rest.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {rest.slice(0, 7).map((photo, i) => (
                      <LazyImg key={photo.id} src={photo.file_url} alt={photo.file_name}
                        className="aspect-[4/3] rounded-sm"
                        onClick={() => setLightbox({ photos, idx: i + 1 })}
                      />
                    ))}
                    {rest.length > 7 && (
                      <div className="aspect-[4/3] rounded-sm flex items-center justify-center cursor-pointer transition-all"
                        style={{ background: "#162316", border: "1px solid rgba(255,255,255,0.08)" }}
                        onClick={() => setLightbox({ photos, idx: 8 })}>
                        <div className="text-center">
                          <p className="text-2xl font-light" style={{ color: "rgba(255,255,255,0.5)" }}>+{rest.length - 7}</p>
                          <p className="text-[10px] tracking-widest uppercase mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>more</p>
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
      <div className="border-t text-center py-12 px-6" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="w-px h-8 mx-auto mb-6" style={{ background: `${green}20` }} />
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>Flow Farm · Pinehurst, North Carolina</p>
        <p className="text-[10px] tracking-widest mt-2" style={{ color: "rgba(255,255,255,0.1)" }}>Rachel Hernandez · Realtor</p>
      </div>

      {/* Matterport Modal */}
      {showTour && matterportUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(5,10,5,0.97)" }}>
          <button onClick={() => setShowTour(false)}
            className="absolute top-5 right-5 z-10" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-6xl mx-4 aspect-video">
            <iframe src={matterportUrl} className="w-full h-full rounded" style={{ border: "none" }}
              allow="xr-spatial-tracking" allowFullScreen />
          </div>
        </div>
      )}

      {/* Photo Lightbox */}
      {lightbox && currentPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(5,10,5,0.97)" }}>
          <button onClick={() => setLightbox(null)} className="absolute top-5 right-5 z-10 transition-colors"
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>
            <X className="w-5 h-5" />
          </button>
          <button onClick={prevPhoto} disabled={lightbox.idx === 0}
            className="absolute left-4 md:left-8 transition-colors disabled:opacity-0"
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>
            <ChevronLeft className="w-10 h-10" />
          </button>
          <div className="w-full max-w-5xl px-16 md:px-20">
            <img src={currentPhoto.file_url} alt={currentPhoto.file_name} className="w-full max-h-[80vh] object-contain" />
            <div className="mt-5 flex items-center justify-between">
              <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>{currentPhoto.room}</p>
              <p className="text-[10px] tracking-widest" style={{ color: "rgba(255,255,255,0.15)" }}>{lightbox.idx + 1} / {lightbox.photos.length}</p>
            </div>
          </div>
          <button onClick={nextPhoto} disabled={lightbox.idx === lightbox.photos.length - 1}
            className="absolute right-4 md:right-8 transition-colors disabled:opacity-0"
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </div>
  );
}
