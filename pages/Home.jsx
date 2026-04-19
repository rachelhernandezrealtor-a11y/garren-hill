import { useState, useEffect, useRef } from "react";

const PHOTO_HUB_URL = "https://base44.app/api/apps/69e2578ca7113dbe93cb208d/functions/getPhotosByRoom";

const FEATURED_ROOMS = ["Portico", "Living Room", "Entrance Hall", "Kitchen", "Master Bedroom", "Library", "Pool"];

function LazyImg({ src, alt, className }) {
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
    <div ref={ref} className={className} style={{ overflow: "hidden", background: "#1a1810" }}>
      {!loaded && <div style={{ width: "100%", height: "100%", background: "#1a1810" }} />}
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            opacity: loaded ? 1 : 0, transition: "opacity 0.7s"
          }}
        />
      )}
    </div>
  );
}

export default function Home() {
  const [heroPhoto, setHeroPhoto] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(PHOTO_HUB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    })
      .then(r => r.json())
      .then(data => {
        try {
          if (data && data.grouped) {
            const keys = Object.keys(data.grouped);
            const portico = data.grouped["Portico"] || (keys.length ? data.grouped[keys[0]] : []);
            if (portico && portico.length) setHeroPhoto(portico[0]);

            const picks = [];
            FEATURED_ROOMS.forEach(room => {
              const photos = data.grouped[room];
              if (photos && photos.length) picks.push({ room, photo: photos[0], count: photos.length });
            });
            setFeatured(picks);
          }
        } catch (e) { console.error(e); }
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setError(true);
        setLoading(false);
      });
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
          <p style={{ color: `${gold}60`, fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", margin: "2px 0 0" }}>Est. 1916 · Pinehurst, NC</p>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["The Story", "Rooms", "Gallery"].map(item => (
            <a key={item}
              href={item === "Gallery" ? "/GarrenHillGallery" : `#${item.toLowerCase().replace(" ", "")}`}
              style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
              {item}
            </a>
          ))}
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
          <img src={heroPhoto.photoUrl} alt="Garren Hill"
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
            Pinehurst, North Carolina · Est. 1916
          </p>
          <h1 style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 300, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em", margin: "0 0 16px", lineHeight: 1.05 }}>
            Garren Hill
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, letterSpacing: "0.1em", maxWidth: 480, marginBottom: 36, lineHeight: 1.7 }}>
            A singular historic estate. Four acres of curated legacy, meticulously restored for the discerning steward.
          </p>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <a href="/GarrenHillGallery" style={{
              border: `1px solid ${gold}70`, color: `${gold}`, fontSize: 11,
              letterSpacing: "0.3em", textTransform: "uppercase", padding: "14px 32px", textDecoration: "none"
            }}>
              View Gallery
            </a>
            <a href="#contact" style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", textDecoration: "none" }}>
              Private Inquiry →
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "40px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, textAlign: "center" }}>
          {[["1916","Year Built"],["4.15","Acres"],["5","Bedrooms"],["5","Bathrooms"]].map(([val, label]) => (
            <div key={label}>
              <p style={{ fontSize: 32, fontWeight: 300, color: "rgba(255,255,255,0.8)", margin: "0 0 6px" }}>{val}</p>
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
          Built in 1916 for Walter Hines Page — co-founder of Doubleday, Page & Co. and U.S. Ambassador to the Court of St. James's — Garren Hill has defined quiet prestige in the Carolina Sandhills for over a century.
        </p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 15, lineHeight: 1.9, marginBottom: 24 }}>
          Meticulously restored by its current stewards: three months sourcing period-accurate bricks for the columned portico, a five-zone climate system installed to preserve original heart pine floors and seven working fireplaces, and the Wee Cottage — a separate guest retreat delivered by sky crane.
        </p>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 15, lineHeight: 1.9 }}>
          The date "1916" remains inlaid in herringbone brick beneath the portico columns — a quiet acknowledgment of a lineage that very few properties can claim.
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
            {featured.slice(0, 1).map(({ room, photo, count }) => (
              <a key={room} href="/GarrenHillGallery"
                style={{ gridColumn: "span 2", position: "relative", display: "block", textDecoration: "none", aspectRatio: "16/9" }}>
                <LazyImg src={photo.photoUrl} alt={room} className="" style={{ width: "100%", height: "100%" }} />
                <img src={photo.photoUrl} alt={room} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)", borderRadius: 2 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, padding: 24 }}>
                  <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 18, fontWeight: 300, margin: "0 0 4px" }}>{room}</p>
                  <p style={{ color: `${gold}60`, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", margin: 0 }}>{count} photographs</p>
                </div>
              </a>
            ))}
            {featured.slice(1, 3).map(({ room, photo, count }) => (
              <a key={room} href="/GarrenHillGallery"
                style={{ position: "relative", display: "block", textDecoration: "none", aspectRatio: "4/3" }}>
                <img src={photo.photoUrl} alt={room} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)", borderRadius: 2 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, padding: 16 }}>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 300, margin: "0 0 2px" }}>{room}</p>
                  <p style={{ color: `${gold}50`, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>{count}</p>
                </div>
              </a>
            ))}
          </div>
          {featured.length > 3 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 8 }}>
              {featured.slice(3, 7).map(({ room, photo, count }) => (
                <a key={room} href="/GarrenHillGallery"
                  style={{ position: "relative", display: "block", textDecoration: "none", aspectRatio: "4/3" }}>
                  <img src={photo.photoUrl} alt={room} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)", borderRadius: 2 }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, padding: 12 }}>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 300, margin: 0 }}>{room}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="/GarrenHillGallery" style={{
              display: "inline-block", border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.3em",
              textTransform: "uppercase", padding: "16px 48px", textDecoration: "none"
            }}>
              View Full Gallery
            </a>
          </div>
        </div>
      )}

      {/* Property Details */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ color: `${gold}60`, fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", textAlign: "center", marginBottom: 48 }}>Property Details</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 64px" }}>
            {[
              ["Address","200 Hollycrest Drive, Pinehurst, NC"],
              ["Year Built","1916"],
              ["Acreage","4.15 acres"],
              ["County","Moore County, NC"],
              ["Bedrooms","5"],
              ["Bathrooms","5"],
              ["Living Room","Nearly 40 feet in length"],
              ["Fireplaces","7 working fireplaces"],
              ["Pool","20 × 40 ft"],
              ["Tennis Courts","2"],
              ["Outbuildings","Wee Cottage, Garage"],
              ["Recognition","Village Historic Foundation"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: 16 }}>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", margin: 0, flexShrink: 0 }}>{label}</p>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, margin: 0, textAlign: "right" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div id="contact" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "80px 32px", textAlign: "center" }}>
        <div style={{ width: 1, height: 40, background: `${gold}30`, margin: "0 auto 40px" }} />
        <p style={{ color: `${gold}60`, fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 20 }}>Private Inquiries</p>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>Arrange a Viewing</h2>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, maxWidth: 400, margin: "0 auto 40px", lineHeight: 1.8 }}>
          Garren Hill is offered to qualified buyers by private appointment. Please reach out directly to discuss.
        </p>
        <a href="mailto:rachelhernandezrealtor@gmail.com" style={{
          display: "inline-block", border: `1px solid ${gold}60`,
          color: `${gold}90`, fontSize: 11, letterSpacing: "0.4em",
          textTransform: "uppercase", padding: "16px 48px", textDecoration: "none"
        }}>
          Contact Rachel Hernandez
        </a>
        <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, letterSpacing: "0.2em", marginTop: 20 }}>rachelhernandezrealtor@gmail.com</p>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 32px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.12)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", margin: "0 0 8px" }}>
          Garren Hill · Pinehurst, North Carolina · Est. 1916
        </p>
        <p style={{ color: "rgba(255,255,255,0.06)", fontSize: 10, margin: 0 }}>© Rachel Hernandez Real Estate</p>
        <a href="/Import" style={{ display: "inline-block", marginTop: 24, color: "rgba(255,255,255,0.06)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", textDecoration: "none" }}>
          hub
        </a>
      </div>

    </div>
  );
}
