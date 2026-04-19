import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const PHOTO_HUB_URL = "https://base44.app/api/apps/69e2578ca7113dbe93cb208d/functions/getPhotosByRoom";

const FEATURED_ROOMS = ["Portico", "Living Room", "Entrance Hall", "Kitchen", "Master Bedroom", "Library", "Pool"];

function LazyImg({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { rootMargin: "400px" });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${className} overflow-hidden bg-stone-900`}>
      {!loaded && <div className="w-full h-full bg-stone-800 animate-pulse" />}
      {inView && <img src={src} alt={alt} onLoad={() => setLoaded(true)} className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`} />}
    </div>
  );
}

export default function Home() {
  const [heroPhoto, setHeroPhoto] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(PHOTO_HUB_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then(r => r.json())
      .then(data => {
        if (data.grouped) {
          // Pick hero from Portico or first available
          const portico = data.grouped["Portico"] || data.grouped[Object.keys(data.grouped)[0]] || [];
          if (portico.length) setHeroPhoto(portico[0]);

          // Build featured grid: first photo from each featured room
          const picks = [];
          FEATURED_ROOMS.forEach(room => {
            const photos = data.grouped[room];
            if (photos && photos.length) picks.push({ room, photo: photos[0], count: photos.length });
          });
          setFeatured(picks);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0e0d08" }}>
      <div className="text-center">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-400/60 to-transparent mx-auto animate-pulse mb-6" />
        <p className="text-amber-400/50 text-xs tracking-[0.5em] uppercase">Garren Hill</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "#0e0d08", fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5" style={{ background: "linear-gradient(to bottom, rgba(14,13,8,0.95), transparent)" }}>
        <div>
          <p className="text-white/80 text-sm tracking-[0.3em] uppercase" style={{ fontFamily: "Georgia, serif" }}>Garren Hill</p>
          <p className="text-amber-400/50 text-[10px] tracking-widest uppercase">Est. 1916 · Pinehurst, NC</p>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#story" className="text-white/40 hover:text-white/80 text-xs tracking-[0.2em] uppercase transition-colors">The Story</a>
          <a href="#rooms" className="text-white/40 hover:text-white/80 text-xs tracking-[0.2em] uppercase transition-colors">Rooms</a>
          <Link to="/GarrenHillGallery" className="text-white/40 hover:text-white/80 text-xs tracking-[0.2em] uppercase transition-colors">Gallery</Link>
          <a href="#contact" className="border border-amber-400/40 text-amber-400/80 hover:border-amber-400 hover:text-amber-400 text-xs tracking-[0.2em] uppercase px-4 py-2 transition-all">Inquire</a>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white/50 hover:text-white">
          <div className="space-y-1.5">
            <div className="w-6 h-px bg-current" />
            <div className="w-4 h-px bg-current" />
            <div className="w-6 h-px bg-current" />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8" style={{ background: "rgba(14,13,8,0.98)" }}>
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-8 text-white/30 text-2xl">×</button>
          {["The Story", "Rooms", "Gallery", "Inquire"].map(item => (
            <a key={item} href={item === "Gallery" ? "/GarrenHillGallery" : `#${item.toLowerCase().replace(" ", "")}`}
              onClick={() => setMenuOpen(false)}
              className="text-white/60 hover:text-white text-xl tracking-[0.3em] uppercase transition-colors">
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Hero */}
      <div className="relative h-screen min-h-[600px]">
        {heroPhoto ? (
          <img src={heroPhoto.photoUrl} alt="Garren Hill" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-stone-900" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(14,13,8,0.3) 0%, rgba(14,13,8,0.1) 40%, rgba(14,13,8,0.7) 80%, rgba(14,13,8,1) 100%)" }} />

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-20">
          <p className="text-amber-400/70 text-[10px] tracking-[0.6em] uppercase mb-4">Pinehurst, North Carolina · Est. 1916</p>
          <h1 className="text-6xl md:text-8xl font-light text-white/90 tracking-wide mb-4" style={{ lineHeight: 1.05 }}>
            Garren Hill
          </h1>
          <p className="text-white/40 text-sm md:text-base tracking-widest max-w-lg mb-8">
            A singular historic estate. Four acres of curated legacy, meticulously restored for the discerning steward.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/GarrenHillGallery"
              className="border border-amber-400/60 text-amber-400/90 hover:border-amber-400 hover:text-amber-400 text-xs tracking-[0.3em] uppercase px-8 py-3.5 transition-all">
              View Gallery
            </Link>
            <a href="#contact" className="text-white/30 hover:text-white/60 text-xs tracking-[0.3em] uppercase transition-colors">
              Private Inquiry →
            </a>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-y border-white/8 py-8 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Year Built", value: "1916" },
            { label: "Acreage", value: "4.15" },
            { label: "Bedrooms", value: "5" },
            { label: "Bathrooms", value: "5" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-white/80 text-2xl md:text-3xl font-light mb-1">{value}</p>
              <p className="text-white/25 text-[10px] tracking-[0.3em] uppercase">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div id="story" className="max-w-3xl mx-auto px-8 py-24 text-center">
        <div className="w-px h-10 bg-amber-400/30 mx-auto mb-10" />
        <p className="text-amber-400/60 text-[10px] tracking-[0.5em] uppercase mb-8">The History</p>
        <h2 className="text-3xl md:text-4xl font-light text-white/80 mb-8 leading-relaxed">
          A Century of Distinction
        </h2>
        <p className="text-white/40 text-base leading-8 mb-6">
          Built in 1916 for Walter Hines Page — co-founder of Doubleday, Page & Co. and U.S. Ambassador to the Court of St. James's — Garren Hill has defined quiet prestige in the Carolina Sandhills for over a century.
        </p>
        <p className="text-white/30 text-base leading-8 mb-6">
          The estate was meticulously restored by its current stewards: three months spent sourcing period-accurate bricks for the columned portico, a five-zone climate system installed to preserve original heart pine floors and seven working fireplaces, and the arrival of the Wee Cottage — a separate guest retreat delivered by sky crane.
        </p>
        <p className="text-white/30 text-base leading-8">
          Today, the date "1916" remains inlaid in herringbone brick beneath the portico columns — a quiet acknowledgment of a lineage that very few properties can claim.
        </p>
        <div className="w-px h-10 bg-amber-400/20 mx-auto mt-10" />
      </div>

      {/* Featured Rooms Grid */}
      <div id="rooms" className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="text-center mb-12">
          <p className="text-amber-400/60 text-[10px] tracking-[0.5em] uppercase mb-4">Interiors</p>
          <h2 className="text-3xl font-light text-white/70">Room by Room</h2>
        </div>

        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* First photo is large */}
            {featured.slice(0, 1).map(({ room, photo, count }) => (
              <Link key={room} to="/GarrenHillGallery" className="md:col-span-2 lg:col-span-2 group relative block">
                <LazyImg src={photo.photoUrl} alt={room} className="w-full aspect-[16/9] rounded-sm" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-sm" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-white/90 text-lg font-light tracking-wide">{room}</p>
                  <p className="text-amber-400/50 text-xs tracking-widest uppercase mt-1">{count} photographs</p>
                </div>
              </Link>
            ))}

            {/* Rest in equal grid */}
            {featured.slice(1, 7).map(({ room, photo, count }) => (
              <Link key={room} to="/GarrenHillGallery" className="group relative block">
                <LazyImg src={photo.photoUrl} alt={room} className="w-full aspect-[4/3] rounded-sm" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-sm" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-white/80 text-sm font-light">{room}</p>
                  <p className="text-amber-400/40 text-[10px] tracking-widest uppercase mt-0.5">{count} photographs</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/GarrenHillGallery"
            className="inline-block border border-white/15 text-white/40 hover:border-amber-400/40 hover:text-amber-400/70 text-xs tracking-[0.3em] uppercase px-10 py-4 transition-all">
            View Full Gallery
          </Link>
        </div>
      </div>

      {/* Property Details */}
      <div className="border-t border-white/8 py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-amber-400/60 text-[10px] tracking-[0.5em] uppercase mb-12 text-center">Property Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            {[
              ["Address", "200 Hollycrest Drive, Pinehurst, NC"],
              ["Year Built", "1916"],
              ["Acreage", "4.15 acres"],
              ["County", "Moore County, NC"],
              ["Bedrooms", "5"],
              ["Bathrooms", "5"],
              ["Living Room", "Nearly 40 feet in length"],
              ["Fireplaces", "7 working fireplaces"],
              ["Pool", "20 × 40 ft"],
              ["Tennis Courts", "2"],
              ["Outbuildings", "Wee Cottage, Garage"],
              ["Recognition", "Village Historic Foundation"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-start justify-between gap-4 py-3 border-b border-white/6">
                <p className="text-white/25 text-xs tracking-widest uppercase flex-shrink-0">{label}</p>
                <p className="text-white/55 text-sm text-right">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="border-t border-white/8 py-20 px-8 text-center">
        <div className="w-px h-10 bg-amber-400/30 mx-auto mb-10" />
        <p className="text-amber-400/60 text-[10px] tracking-[0.5em] uppercase mb-6">Private Inquiries</p>
        <h2 className="text-3xl font-light text-white/70 mb-4">Arrange a Viewing</h2>
        <p className="text-white/30 text-sm mb-10 max-w-md mx-auto leading-7">
          Garren Hill is offered to qualified buyers by private appointment. Please reach out directly to discuss.
        </p>
        <a href="mailto:rachelhernandezrealtor@gmail.com"
          className="inline-block border border-amber-400/50 text-amber-400/80 hover:border-amber-400 hover:text-amber-400 text-xs tracking-[0.4em] uppercase px-12 py-4 transition-all">
          Contact Rachel Hernandez
        </a>
        <p className="text-white/15 text-xs tracking-widest mt-6">rachelhernandezrealtor@gmail.com</p>
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 py-10 px-8 text-center">
        <p className="text-white/15 text-[10px] tracking-[0.4em] uppercase">Garren Hill · Pinehurst, North Carolina · Est. 1916</p>
        <p className="text-white/8 text-[10px] tracking-widest mt-2">© Rachel Hernandez Real Estate</p>
        {/* Hidden admin access */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <Link to="/Import" className="text-white/8 hover:text-white/20 text-[9px] tracking-widest uppercase transition-colors">Hub</Link>
        </div>
      </div>

    </div>
  );
}
