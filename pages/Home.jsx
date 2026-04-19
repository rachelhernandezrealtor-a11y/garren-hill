import { useState, useEffect, useRef } from "react";
import { PropertyPhoto, Property } from "@/api/entities";
import { X } from "lucide-react";

const PROPERTY_ID = "69e437375f1b701c20f9d509";
const FEATURED_ROOMS = ["Portico", "Living Room", "Entrance Hall", "Kitchen", "Master Bedroom", "Library", "Pool"];

function LazyImg({ src, alt, style }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { rootMargin: "400px" });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ ...style, overflow: "hidden", background: "#1a1810" }}>
      {inView && (
        <img
          src={src} alt={alt}
          onLoad={() => setLoaded(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: loaded ? 1 : 0, transition: "opacity 0.8s" }}
        />
      )}
    </div>
  );
}

export default function Home() {
  const [heroPhoto, setHeroPhoto] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matterportUrl, setMatterportUrl] = useState(null);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        // Load property
        const props = await Property.filter({ id: PROPERTY_ID });
        if (props.length > 0 && props[0].matterport_urls?.length) {
          setMatterportUrl(props[0].matterport_urls[0]);
        }

        // Load all photos
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

        // Build grouped map
        const groups = {};
        all.forEach(p => {
          const room = p.room || "Uncategorized";
          if (!groups[room]) groups[room] = [];
          groups[room].push(p);
        });

        // Hero = first Portico photo or fallback to first photo
        const portico = groups["Portico"] || groups["Entrance Hall"] || (all.length ? [all[0]] : []);
        if (portico.length) setHeroPhoto(portico[0]);

        // Featured rooms
        const picks = [];
        FEATURED_ROOMS.forEach(room => {
          const photos = groups[room];
          if (photos?.length) picks.push({ room, photo: photos[0], count: photos.length });
        });
        setFeatured(picks);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    load();
  }, []);

  const bg = "#0e0d08";
  const gold = "#c9a84c";

  if (loading) return (
    <div style={{ minHeight: "100vh", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 1, height: 60, background: `linear-gradient(to bottom, transparent, ${gold}, transparent)`, margin: "0 auto 24px" }} />
        <p style={{ color: `${gold}80`, fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", fontFamily: "Georgia, serif" }}>Garren Hill</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "Georgia, 'Times New Roman', serif", color: "#fff" }}>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 32px",
        background: "linear-gradient(to bottom, rgba(14,13,8,0.95), transparent)"
      }}>
        <div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", margin: 0 }}>Garren Hill</p>
          <p style={{ color: `${gold}60`, fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", margin: "2px 0 0" }}>Est. 1916 | Pinehurst, NC</p>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["The Story", "#story"], ["Rooms", "#rooms"], ["Gallery", "/GarrenHillGallery"]].map(([label, href]) => (
            <a key={label} href={href}
              style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
              {label}
            </a>
          ))}
          {matterportUrl && (
            <button onClick={() => setShowTour(true)} style={{
              background: "none", border: `1px solid ${gold}50`, color: `${gold}80`,
              fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "7px 14px", cursor: "pointer"
            }}>
              * Tour
            </button>
          )}
          <a href="#contact" style={{
            border: `1px solid ${gold}60`, color: `${gold}90`,
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "8px 16px", textDecoration: "none"
          }}>
            Inquire
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", height: "100vh", minHeight: 600 }}>
        {heroPhoto ? (
          <img src={heroPhoto.file_url} alt="Garren Hill"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "#1a1810" }} />
        )}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(14,13,8,0.3) 0%, rgba(14,13,8,0.1) 40%, rgba(14,13,8,0.75) 80%, rgba(14,13,8,1) 100%)"
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 48px 80px" }}>
          <p style={{ color: `${gold}80`, fontSize: 10, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 16 }}>
            Pinehurst, North Carolina | Est. 1916
          </p>
          <h1 style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 300, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em", margin: "0 0 16px", lineHeight: 1.05 }}>
            Garren Hill
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, letterSpacing: "0.05em", maxWidth: 480, marginBottom: 40, lineHeight: 1.8 }}>
            A singular historic estate. Four acres of curated legacy, meticulously restored for the discerning steward.
          </p>
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <a href="/GarrenHillGallery" style={{
              border: `1px solid ${gold}70`, color: gold, fontSize: 11,
              letterSpacing: "0.3em", textTransform: "uppercase", padding: "14px 32px", textDecoration: "none"
            }}>
              View Gallery
            </a>
            {matterportUrl && (
              <button onClick={() => setShowTour(true)} style={{
                background: "none", border: `1px solid rgba(255,255,255,0.2)`, color: "rgba(255,255,255,0.5)",
                fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase",
                padding: "14px 32px", cursor: "pointer"
              }}>
                * Virtual Tour
              </button>
            )}
            <a href="#contact" style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", textDecoration: "none" }}>
              Private Inquiry ->
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "40px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, textAlign: "center" }}>
          {[["1916","Year Built"],["4.15","Acres"],["5","Bedrooms"],["5","Bathrooms"]].map(([val, label]) => (
            <div key={label}>
              <p style={{ fontSize: 32, fontWeight: 300, color: "rgba(255,255,255,0.8)", margin: "0 0 6px", fontFamily: "Georgia, serif" }}>{val}</p>
              <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div id="story" style={{ maxWidth: 680, margin: "0 auto", padding: "96px 32px", textAlign: "center" }}>
        <div style={{ width: 1, height: 40, background: `${gold}40`, margin: "0 auto 48px" }} />
        <p style={{ color: `${gold}70`, fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 32 }}>The History</p>
        <h2 style={{ fontSize: 36, fontWeight: 300, color: "rgba(255,255,255,0.75)", marginBottom: 32, lineHeight: 1.4 }}>A Century of Distinction</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, lineHeight: 1.9, marginBottom: 24 }}>
          Built in 1916 for Walter Hines Page - co-founder of Doubleday, Page & Co. and U.S. Ambassador to the Court of St. James's - Garren Hill has defined quiet prestige in the Carolina Sandhills for over a century.
        </p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 15, lineHeight: 1.9, marginBottom: 24 }}>
          Meticulously restored by its current stewards: three months sourcing period-accurate bricks for the columned portico, a five-zone climate system installed to preserve original heart pine floors and seven working fireplaces, and the Wee Cottage - a separate guest retreat delivered by sky crane.
        </p>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 15, lineHeight: 1.9 }}>
          The date "1916" remains inlaid in herringbone brick beneath the portico columns - a quiet acknowledgment of a lineage that very few properties can claim.
        </p>
        <div style={{ width: 1, height: 40, background: `${gold}20`, margin: "48px auto 0" }} />
      </div>

      {/* Rooms Grid */}
      {featured.length > 0 && (
        <div id="rooms" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px 96px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ color: `${gold}60`, fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 12 }}>Interiors</p>
            <h2 style={{ fontSize: 32, fontWeight: 300, color: "rgba(255,255,255,0.65)", margin: 0 }}>Room by Room</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {featured.slice(0, 1).map(({ room, photo }) => (
              <a key={room} href="/GarrenHillGallery"
                style={{ gridColumn: "span 2", position: "relative", display: "block", textDecoration: "none", aspectRatio: "16/9" }}>
                <LazyImg src={photo.file_url} alt={room} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,13,8,0.7), transparent)" }} />
                <div style={{ position: "absolute", bottom: 20, left: 24 }}>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", margin: 0 }}>{room}</p>
                </div>
              </a>
            ))}
            {featured.slice(1, 3).map(({ room, photo }) => (
              <a key={room} href="/GarrenHillGallery"
                style={{ position: "relative", display: "block", textDecoration: "none", aspectRatio: "4/3" }}>
                <LazyImg src={photo.file_url} alt={room} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,13,8,0.7), transparent)" }} />
                <div style={{ position: "absolute", bottom: 16, left: 20 }}>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", margin: 0 }}>{room}</p>
                </div>
              </a>
            ))}
            {featured.slice(3, 7).map(({ room, photo }) => (
              <a key={room} href="/GarrenHillGallery"
                style={{ position: "relative", display: "block", textDecoration: "none", aspectRatio: "4/3" }}>
                <LazyImg src={photo.file_url} alt={room} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,13,8,0.7), transparent)" }} />
                <div style={{ position: "absolute", bottom: 16, left: 20 }}>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", margin: 0 }}>{room}</p>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <a href="/GarrenHillGallery" style={{
              border: `1px solid rgba(255,255,255,0.15)`, color: "rgba(255,255,255,0.3)",
              fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase",
              padding: "12px 28px", textDecoration: "none", display: "inline-block"
            }}>
              View All Rooms ->
            </a>
          </div>
        </div>
      )}

      {/* Virtual Tour Section */}
      {matterportUrl && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 32px", textAlign: "center" }}>
          <div style={{ width: 1, height: 32, background: `${gold}30`, margin: "0 auto 40px" }} />
          <p style={{ color: `${gold}60`, fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 16 }}>Immersive Experience</p>
          <h2 style={{ fontSize: 32, fontWeight: 300, color: "rgba(255,255,255,0.65)", marginBottom: 24 }}>Walk the Rooms</h2>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 14, lineHeight: 1.8, maxWidth: 480, margin: "0 auto 36px" }}>
            Tour Garren Hill from anywhere in the world. A fully immersive 3D experience of every room, every detail.
          </p>
          <button onClick={() => setShowTour(true)} style={{
            background: "none", border: `1px solid ${gold}60`, color: `${gold}80`,
            fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase",
            padding: "16px 40px", cursor: "pointer"
          }}>
            * Launch Virtual Tour
          </button>
        </div>
      )}

      {/* Contact */}
      <div id="contact" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 32px", textAlign: "center" }}>
        <div style={{ width: 1, height: 32, background: `${gold}30`, margin: "0 auto 40px" }} />
        <p style={{ color: `${gold}60`, fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 16 }}>Private Showing</p>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: "rgba(255,255,255,0.65)", marginBottom: 24 }}>Begin a Conversation</h2>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 14, lineHeight: 1.8, maxWidth: 400, margin: "0 auto 36px" }}>
          Garren Hill is offered exclusively. Inquiries by appointment.
        </p>
        <a href="mailto:rachelhernandezrealtor@gmail.com" style={{
          border: `1px solid ${gold}60`, color: `${gold}80`,
          fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase",
          padding: "16px 40px", textDecoration: "none", display: "inline-block"
        }}>
          Contact Rachel Hernandez
        </a>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 32px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.12)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", margin: 0 }}>
          Garren Hill | Pinehurst, North Carolina | rachelhernandezrealtor@gmail.com
        </p>
      </div>

      {/* Matterport Modal */}
      {showTour && matterportUrl && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(8,8,5,0.97)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button
            onClick={() => setShowTour(false)}
            style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", zIndex: 10 }}
          >
            <X size={24} />
          </button>
          <div style={{ width: "100%", maxWidth: 1100, margin: "0 32px", aspectRatio: "16/9" }}>
            <iframe
              src={matterportUrl}
              style={{ width: "100%", height: "100%", border: "none", borderRadius: 4 }}
              allow="xr-spatial-tracking"
              allowFullScreen
            />
          </div>
        </div>
      )}

    </div>
  );
}
