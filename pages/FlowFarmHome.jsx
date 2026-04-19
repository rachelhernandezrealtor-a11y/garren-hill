import { useState, useEffect } from "react";
import { PropertyPhoto, Property } from "@/api/entities";

const PROPERTY_ID = "69e4406f90bbe19ad72108ab";

export default function FlowFarmHome() {
  const [matterportUrl, setMatterportUrl] = useState(null);
  const [showTour, setShowTour] = useState(false);
  const [heroPhoto, setHeroPhoto] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const props = await Property.filter({ id: PROPERTY_ID });
        if (props.length > 0 && props[0].matterport_urls && props[0].matterport_urls.length) {
          setMatterportUrl(props[0].matterport_urls[0]);
        }
        const ps = await PropertyPhoto.filter({ property_id: PROPERTY_ID }, { limit: 10, sort: "sort_order" });
        if (ps.length > 0) setHeroPhoto(ps[0]);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  // True glass: dark neutral base, white overlay, subtle border
  const glassCard = {
    background: "rgba(10,10,10,0.55)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 3,
  };

  const glassLight = {
    background: "rgba(10,10,10,0.35)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 3,
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Georgia, serif", color: "#fff", overflowX: "hidden" }}>

      {/* PAGE BACKGROUND — solid dark, no color bleeding */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "#0a0d0a" }} />

      {/* Subtle vignette glow — very low opacity, neutral */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1,
        background: "radial-gradient(ellipse at 30% 40%, rgba(30,50,20,0.22) 0%, transparent 65%)"
      }} />

      {/* Hero photo blurred bg — only when photo exists */}
      {heroPhoto && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2 }}>
          <img
            src={heroPhoto.file_url}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.12, filter: "blur(40px) saturate(0.4)" }}
          />
        </div>
      )}

      {/* Dark overlay to kill any color cast */}
      <div style={{ position: "fixed", inset: 0, zIndex: 3, background: "rgba(8,11,8,0.72)" }} />

      {/* ── CONTENT ── all sits above background stack */}
      <div style={{ position: "relative", zIndex: 10 }}>

        {/* NAV */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          ...glassCard,
          borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 40px",
        }}>
          <div>
            <p style={{ color: "rgba(255,252,245,0.88)", fontSize: 12, letterSpacing: "0.4em", textTransform: "uppercase", margin: 0 }}>Flow Farm</p>
            <p style={{ color: "rgba(160,190,140,0.55)", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", margin: "3px 0 0" }}>107 Linden Trail · Aberdeen, NC</p>
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {[["Estate","#opportunity"],["The Farm","#farm"],["Residence","#residence"],["Gallery","/FlowFarmGallery"]].map(([label, href]) => (
              <a key={label} href={href} style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none" }}>{label}</a>
            ))}
            <a href="#contact" style={{
              ...glassLight,
              color: "rgba(180,210,160,0.85)", fontSize: 10, letterSpacing: "0.25em",
              textTransform: "uppercase", padding: "9px 20px", textDecoration: "none"
            }}>Schedule Viewing</a>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "120px 48px 80px" }}>
          {/* Address pill */}
          <div style={{ ...glassLight, display: "inline-flex", alignItems: "center", gap: 20, padding: "10px 24px", marginBottom: 40, alignSelf: "flex-start" }}>
            <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase" }}>107 Linden Trail · Aberdeen, NC</span>
            <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.12)", display: "inline-block" }} />
            <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase" }}>3 Miles from Pinehurst</span>
            <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.12)", display: "inline-block" }} />
            <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase" }}>Pinehurst ETJ</span>
          </div>

          <p style={{ color: "rgba(160,195,130,0.65)", fontSize: 10, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 18 }}>A Working Estate · Fifteen Acres</p>

          <h1 style={{ fontSize: "clamp(60px, 10vw, 118px)", fontWeight: 300, color: "rgba(255,252,245,0.92)", letterSpacing: "0.03em", margin: "0 0 28px", lineHeight: 0.95 }}>
            Flow<br />Farm
          </h1>

          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 15, maxWidth: 500, marginBottom: 48, lineHeight: 1.9 }}>
            Fifteen acres anchored by a commercial-grade residence and a USDA-registered farm, offering absolute privacy and rare zoning flexibility just three miles from Pinehurst.
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <a href="/FlowFarmGallery" style={{
              ...glassCard,
              color: "rgba(180,210,155,0.85)", fontSize: 10, letterSpacing: "0.35em",
              textTransform: "uppercase", padding: "15px 36px", textDecoration: "none"
            }}>All Photos</a>
            {matterportUrl && (
              <button onClick={() => setShowTour(true)} style={{
                ...glassLight,
                color: "rgba(255,255,255,0.38)", fontSize: 10, letterSpacing: "0.35em",
                textTransform: "uppercase", padding: "15px 36px", cursor: "pointer"
              }}>◈ Virtual Tour</button>
            )}
            <a href="#contact" style={{ color: "rgba(255,255,255,0.18)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", textDecoration: "none", marginLeft: 12 }}>
              Private Inquiry →
            </a>
          </div>
        </div>

        {/* STATS BAR */}
        <div style={{ padding: "0 32px 80px" }}>
          <div style={{ ...glassCard, maxWidth: 880, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
              {[["15","USDA Acres"],["7","Buildable Acres"],["3","Acre Veganic Farm"],["$5.26M","Offered At"]].map(([val, label], i) => (
                <div key={label} style={{
                  padding: "32px 20px", textAlign: "center",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none"
                }}>
                  <p style={{ fontSize: 30, fontWeight: 300, color: "rgba(255,252,245,0.82)", margin: "0 0 6px" }}>{val}</p>
                  <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OPPORTUNITY */}
        <div id="opportunity" style={{ padding: "60px 32px 80px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <p style={{ color: "rgba(160,190,130,0.7)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 22 }}>The Opportunity</p>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 40px)", fontWeight: 300, color: "rgba(255,252,245,0.86)", marginBottom: 24, lineHeight: 1.25 }}>
                The Farm Is the Engine.<br />The Zoning Is the Key.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, lineHeight: 1.95, marginBottom: 14 }}>
                This is not potential. It is position. A working USDA-registered farm anchors the land in its most powerful state — preserving agricultural status and securing a classification that supports far greater flexibility than typical acreage.
              </p>
              <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 14, lineHeight: 1.95 }}>
                What others would need to build, maintain, and protect has already been done. The farm generates momentum. The zoning secures it. What remains is control.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                ["15 Acres", "Secured agricultural standing with natural forest buffer."],
                ["The Farm", "3-acre USDA veganic operation securing the estate's zoning."],
                ["Uncommon Freedom", "Private compound, wellness retreat, or hospitality venue."],
                ["Compound Ready", "Architect guest house shell + 7 buildable acres."],
              ].map(([title, desc]) => (
                <div key={title} style={{ ...glassCard, padding: "22px 18px" }}>
                  <div style={{ width: 16, height: 1, background: "rgba(160,190,130,0.4)", marginBottom: 14 }} />
                  <h3 style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,252,245,0.78)", letterSpacing: "0.06em", marginBottom: 10, lineHeight: 1.4 }}>{title}</h3>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", lineHeight: 1.75, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INVESTMENT PILLARS */}
        <div style={{ padding: "0 32px 80px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <p style={{ color: "rgba(160,190,130,0.55)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 14 }}>Investment Summary</p>
              <h2 style={{ fontSize: 28, fontWeight: 300, color: "rgba(255,252,245,0.7)", margin: 0 }}>The Strategic Value of the Land</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[
                ["15 Acres of Opportunity", "Secured agricultural standing enveloped by a protected natural forest buffer."],
                ["The Agricultural Engine", "A 3-acre USDA-registered veganic farm that secures the estate's zoning."],
                ["Uncommon Freedom", "The rare entitlement to create a private family compound, wellness retreat, or hospitality venue."],
                ["Architectural Permanence", "A curated ~7,500 sq ft design masterpiece by Robert E. Clark, built to commercial standards."],
                ["Engineered Independence", "True self-sufficiency through advanced solar, geothermal climate control, and deep-water wells."],
                ["Compound Expansion", "An architect-designed guest house shell and 7 buildable acres ready for development."],
              ].map(([title, desc]) => (
                <div key={title} style={{ ...glassCard, padding: "28px 24px" }}>
                  <div style={{ width: 18, height: 1, background: "rgba(160,190,130,0.35)", marginBottom: 16 }} />
                  <h3 style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,252,245,0.8)", letterSpacing: "0.06em", marginBottom: 10, lineHeight: 1.4 }}>{title}</h3>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", lineHeight: 1.8, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* THE FARM */}
        <div id="farm" style={{ padding: "0 32px 80px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ color: "rgba(160,190,130,0.65)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 16 }}>The Farm</p>
              <h2 style={{ fontSize: 34, fontWeight: 300, color: "rgba(255,252,245,0.84)", marginBottom: 18, lineHeight: 1.3 }}>Veganic. Established. Running.</h2>
              <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 14, lineHeight: 1.95, maxWidth: 560, margin: "0 auto 10px" }}>
                Operational since 2009. USDA-registered. NC Qualifying Farmer Exemption in place. CSA members, farmers market relationships, revenue and community already established.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 40 }}>
              {[
                ["Biochar & Compost Pavilion", "Covered aerated composting system and biochar kiln. Converts forest debris into stable carbon — building fertility that lasts centuries."],
                ["High Tunnel Greenhouse", "96 × 36 ft with custom Climate Battery geothermal. Extends the growing season for warm-season crops year-round."],
                ["Farm Workshop", "30 × 40 ft with concrete slab, full electrical, and dedicated 12 × 8 ft walk-in cooler for post-harvest storage."],
              ].map(([title, desc]) => (
                <div key={title} style={{ ...glassCard, padding: "28px 24px" }}>
                  <h3 style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,252,245,0.78)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>{title}</h3>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", lineHeight: 1.85, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "rgba(160,190,130,0.45)", fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 18 }}>Grown on the Land</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {["Tomatoes","Cucumbers","Leafy Greens","Herbs","Peppers","Squash & Zucchini","Strawberries","Potatoes","Hardy Kiwi","Cut Flowers"].map(crop => (
                  <span key={crop} style={{
                    ...glassLight,
                    color: "rgba(255,255,255,0.25)", fontSize: 10, letterSpacing: "0.18em",
                    textTransform: "uppercase", padding: "8px 16px"
                  }}>{crop}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RESIDENCE */}
        <div id="residence" style={{ padding: "0 32px 80px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ color: "rgba(160,190,130,0.65)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 16 }}>The Residence</p>
              <h2 style={{ fontSize: 34, fontWeight: 300, color: "rgba(255,252,245,0.84)", marginBottom: 18, lineHeight: 1.3 }}>
                The House That Quietly<br />Steals the Whole Show
              </h2>
              <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 14, lineHeight: 1.95, maxWidth: 580, margin: "0 auto 10px" }}>
                Crafted by architect Robert E. Clark — ~7,500 sq ft built to commercial standards. Civil War-era heart pine, massive timber trusses, artisan brick. Five ensuite bedrooms, two autonomous guest apartments, 60" Wolf range, Sub-Zero suite, walk-out lower level with Brown Safe vault.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: matterportUrl ? 40 : 0 }}>
              {[
                ["~7,500 sq ft","Total Living Area"],
                ["5","Ensuite Bedrooms"],
                ["2","Autonomous Guest Apts"],
                ["20","Geothermal Wells"],
                ["14.3 kW","Solar Array"],
                ["Robert E. Clark","Architect"],
              ].map(([val, label]) => (
                <div key={label} style={{ ...glassCard, padding: "26px 24px", display: "flex", alignItems: "center", gap: 18 }}>
                  <p style={{ fontSize: 18, fontWeight: 300, color: "rgba(255,252,245,0.82)", margin: 0, minWidth: 88 }}>{val}</p>
                  <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
            {matterportUrl && (
              <div style={{ textAlign: "center" }}>
                <button onClick={() => setShowTour(true)} style={{
                  ...glassCard,
                  color: "rgba(180,210,155,0.8)", fontSize: 10, letterSpacing: "0.35em",
                  textTransform: "uppercase", padding: "16px 44px", cursor: "pointer"
                }}>◈ Launch Virtual 3D Tour</button>
              </div>
            )}
          </div>
        </div>

        {/* QUOTE */}
        <div style={{ padding: "40px 32px 80px", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.14)", fontSize: 19, fontStyle: "italic", fontWeight: 300, lineHeight: 1.75, maxWidth: 660, margin: "0 auto" }}>
            "The architecture is merely the anchor. The land it sits upon provides the true foundation for autonomy."
          </p>
        </div>

        {/* CONTACT */}
        <div id="contact" style={{ padding: "0 32px 80px" }}>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div style={{ ...glassCard, padding: "60px 48px", textAlign: "center" }}>
              <p style={{ color: "rgba(160,190,130,0.65)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 18 }}>Private Showing</p>
              <h2 style={{ fontSize: 30, fontWeight: 300, color: "rgba(255,252,245,0.84)", marginBottom: 14 }}>Schedule a Private Viewing</h2>
              <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 13, lineHeight: 1.85, marginBottom: 32 }}>
                Flow Farm is offered exclusively.<br />Inquiries by appointment only.
              </p>
              <a href="mailto:rachelhernandezrealtor@gmail.com" style={{
                display: "inline-block",
                border: "1px solid rgba(160,190,130,0.5)", color: "rgba(180,210,155,0.85)",
                fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase",
                padding: "15px 40px", textDecoration: "none"
              }}>Contact Rachel Hernandez</a>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: "36px 32px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p style={{ color: "rgba(255,255,255,0.08)", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", margin: 0 }}>
            Flow Farm · 107 Linden Trail · Aberdeen, North Carolina · rachelhernandezrealtor@gmail.com
          </p>
        </div>

      </div>

      {/* MATTERPORT MODAL */}
      {showTour && matterportUrl && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(5,8,5,0.96)",
          backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <button onClick={() => setShowTour(false)} style={{
            position: "absolute", top: 24, right: 28, background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 28, lineHeight: 1
          }}>✕</button>
          <div style={{ width: "100%", maxWidth: 1100, margin: "0 32px", aspectRatio: "16/9" }}>
            <iframe src={matterportUrl} style={{ width: "100%", height: "100%", border: "none" }}
              allow="xr-spatial-tracking" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  );
}
