import { useState, useEffect } from "react";
import { PropertyPhoto, Property } from "@/api/entities";

const PROPERTY_ID = "69e4406f90bbe19ad72108ab";

export default function FlowFarmHome() {
  const [matterportUrl, setMatterportUrl] = useState(null);
  const [showTour, setShowTour] = useState(false);
  const [heroPhoto, setHeroPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const props = await Property.filter({ id: PROPERTY_ID });
        if (props.length > 0 && props[0].matterport_urls && props[0].matterport_urls.length) {
          setMatterportUrl(props[0].matterport_urls[0]);
        }
        const ps = await PropertyPhoto.filter({ property_id: PROPERTY_ID }, { limit: 50, sort: "sort_order" });
        if (ps.length > 0) setHeroPhoto(ps[0]);
        setPhotos(ps);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const glass = {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 2,
  };

  const glassCard = {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(32px)",
    WebkitBackdropFilter: "blur(32px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 2,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060906", fontFamily: "Georgia, serif", color: "#fff", overflowX: "hidden" }}>

      {/* Fixed background layers — creates the depth */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse at 20% 50%, rgba(40,70,25,0.35) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(20,45,15,0.3) 0%, transparent 55%), radial-gradient(ellipse at 60% 80%, rgba(15,35,10,0.4) 0%, transparent 50%)",
      }} />
      {heroPhoto && (
        <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
          <img src={heroPhoto.file_url} alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18, filter: "blur(2px)" }} />
        </div>
      )}
      <div style={{ position: "fixed", inset: 0, zIndex: 1, background: "rgba(6,9,6,0.6)" }} />

      {/* All content floats above */}
      <div style={{ position: "relative", zIndex: 10 }}>

        {/* Nav — glass */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          ...glass,
          borderLeft: "none", borderRight: "none", borderTop: "none",
          borderRadius: 0,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 40px",
        }}>
          <div>
            <p style={{ color: "rgba(255,252,245,0.9)", fontSize: 12, letterSpacing: "0.4em", textTransform: "uppercase", margin: 0 }}>Flow Farm</p>
            <p style={{ color: "rgba(120,160,90,0.7)", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", margin: "2px 0 0" }}>107 Linden Trail · Aberdeen, NC</p>
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <a href="#opportunity" style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none" }}>Estate</a>
            <a href="#farm" style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none" }}>The Farm</a>
            <a href="#residence" style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none" }}>Residence</a>
            <a href="/FlowFarmGallery" style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none" }}>Gallery</a>
            <a href="#contact" style={{
              ...glassCard,
              color: "rgba(154,184,125,0.9)", fontSize: 10, letterSpacing: "0.25em",
              textTransform: "uppercase", padding: "9px 20px", textDecoration: "none"
            }}>Schedule Viewing</a>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 80px", paddingTop: 100 }}>
          <div style={{ maxWidth: 800 }}>
            {/* Floating address pill */}
            <div style={{ ...glass, display: "inline-flex", alignItems: "center", gap: 20, padding: "10px 24px", marginBottom: 40 }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase" }}>
                107 Linden Trail · Aberdeen, NC
              </span>
              <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.15)" }} />
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase" }}>
                3 Miles from Pinehurst
              </span>
              <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.15)" }} />
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase" }}>
                Pinehurst ETJ
              </span>
            </div>

            <p style={{ color: "rgba(154,184,125,0.7)", fontSize: 10, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 16 }}>
              A Working Estate · Fifteen Acres
            </p>
            <h1 style={{ fontSize: "clamp(56px, 10vw, 120px)", fontWeight: 300, color: "rgba(255,252,245,0.92)", letterSpacing: "0.03em", margin: "0 0 24px", lineHeight: 0.95 }}>
              Flow<br />Farm
            </h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, maxWidth: 500, marginBottom: 44, lineHeight: 1.9 }}>
              Fifteen acres anchored by a commercial-grade residence and a USDA-registered farm, offering absolute privacy and rare zoning flexibility just three miles from Pinehurst.
            </p>

            {/* CTA row — glass buttons */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <a href="/FlowFarmGallery" style={{
                ...glassCard,
                color: "rgba(154,184,125,0.9)", fontSize: 10,
                letterSpacing: "0.35em", textTransform: "uppercase", padding: "15px 36px", textDecoration: "none"
              }}>All Photos</a>
              {matterportUrl && (
                <button onClick={() => setShowTour(true)} style={{
                  ...glass,
                  color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "0.35em",
                  textTransform: "uppercase", padding: "15px 36px", cursor: "pointer"
                }}>◈ Virtual Tour</button>
              )}
              <a href="#contact" style={{ color: "rgba(255,255,255,0.18)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", textDecoration: "none", marginLeft: 8 }}>
                Private Inquiry →
              </a>
            </div>
          </div>
        </div>

        {/* Stats — floating glass bar */}
        <div style={{ padding: "0 32px 80px" }}>
          <div style={{ ...glassCard, maxWidth: 900, margin: "0 auto", padding: "0 8px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
              {[["15","USDA Acres"],["7","Buildable Acres"],["3","Acre Veganic Farm"],["$5.26M","Offered At"]].map(([val, label], i) => (
                <div key={label} style={{
                  padding: "32px 24px", textAlign: "center",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none"
                }}>
                  <p style={{ fontSize: 30, fontWeight: 300, color: "rgba(255,252,245,0.85)", margin: "0 0 6px" }}>{val}</p>
                  <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Opportunity Section */}
        <div id="opportunity" style={{ padding: "80px 32px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <p style={{ color: "rgba(120,160,90,0.8)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 24 }}>The Opportunity</p>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: "rgba(255,252,245,0.88)", marginBottom: 24, lineHeight: 1.25 }}>
                The Farm Is the Engine.<br />The Zoning Is the Key.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 15, lineHeight: 1.95, marginBottom: 16 }}>
                This is not potential. It is position. A working USDA-registered farm anchors the land in its most powerful state — preserving agricultural status and securing a classification that supports far greater flexibility than typical acreage.
              </p>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 15, lineHeight: 1.95 }}>
                What others would need to build, maintain, and protect has already been done. The farm generates momentum. The zoning secures it. What remains is control.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                ["15 Acres", "Secured agricultural standing with natural forest buffer."],
                ["The Farm", "3-acre USDA-registered veganic operation securing the estate's zoning."],
                ["Uncommon Freedom", "Private family compound, wellness retreat, or hospitality venue."],
                ["Compound Ready", "Architect-designed guest house shell + 7 buildable acres."],
              ].map(([title, desc]) => (
                <div key={title} style={{ ...glassCard, padding: "24px 20px" }}>
                  <div style={{ width: 16, height: 1, background: "rgba(120,160,90,0.5)", marginBottom: 14 }} />
                  <h3 style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,252,245,0.8)", letterSpacing: "0.08em", marginBottom: 10, lineHeight: 1.4 }}>{title}</h3>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", lineHeight: 1.75, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Investment pillars */}
        <div style={{ padding: "80px 32px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ color: "rgba(120,160,90,0.6)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 14 }}>Investment Summary</p>
              <h2 style={{ fontSize: 30, fontWeight: 300, color: "rgba(255,252,245,0.75)", margin: 0 }}>The Strategic Value of the Land</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                ["15 Acres of Opportunity", "Secured agricultural standing enveloped by a protected natural forest buffer."],
                ["The Agricultural Engine", "A highly productive, 3-acre USDA-registered veganic farm that secures the estate's zoning."],
                ["Uncommon Freedom", "The rare entitlement to create a private family compound, luxury wellness retreat, or hospitality venue."],
                ["Architectural Permanence", "A curated ~7,500 sq ft design masterpiece by Robert E. Clark, built to commercial standards."],
                ["Engineered Independence", "True self-sufficiency through advanced solar, geothermal climate control, and deep-water wells."],
                ["Compound Expansion", "An architect-designed guest house shell and 7 buildable acres ready for immediate development."],
              ].map(([title, desc]) => (
                <div key={title} style={{ ...glassCard, padding: "32px 28px" }}>
                  <div style={{ width: 20, height: 1, background: "rgba(120,160,90,0.4)", marginBottom: 18 }} />
                  <h3 style={{ fontSize: 12, fontWeight: 400, color: "rgba(255,252,245,0.82)", letterSpacing: "0.06em", marginBottom: 12, lineHeight: 1.4 }}>{title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", lineHeight: 1.8, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Farm */}
        <div id="farm" style={{ padding: "80px 32px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ color: "rgba(120,160,90,0.7)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 16 }}>The Farm</p>
              <h2 style={{ fontSize: 36, fontWeight: 300, color: "rgba(255,252,245,0.85)", marginBottom: 20, lineHeight: 1.3 }}>Veganic. Established. Running.</h2>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 15, lineHeight: 1.95, maxWidth: 600, margin: "0 auto 12px" }}>
                Operational since 2009. USDA-registered. NC Qualifying Farmer Exemption in place.
              </p>
              <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 15, lineHeight: 1.95, maxWidth: 560, margin: "0 auto" }}>
                CSA members, farmers market relationships, and an established reputation. The revenue and community are already in place.
              </p>
            </div>

            {/* Farm infrastructure — glass cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 48 }}>
              {[
                ["Biochar & Compost Pavilion", "A covered aerated composting system and biochar kiln. Converts forest debris into stable carbon — building fertility that lasts for centuries."],
                ["High Tunnel Greenhouse", "96 × 36 ft high tunnel with a custom Climate Battery geothermal system. Extends the growing season for warm-season crops year-round."],
                ["Farm Workshop", "30 × 40 ft operational workshop with concrete slab, full electrical service, and dedicated 12 × 8 ft walk-in cooler for post-harvest storage."],
              ].map(([title, desc]) => (
                <div key={title} style={{ ...glassCard, padding: "32px 28px" }}>
                  <h3 style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,252,245,0.8)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>{title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", lineHeight: 1.85, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>

            {/* Crops */}
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "rgba(120,160,90,0.5)", fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 20 }}>Grown on the Land</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {["Tomatoes","Cucumbers","Leafy Greens","Herbs","Peppers","Squash & Zucchini","Strawberries","Potatoes","Hardy Kiwi","Cut Flowers"].map(crop => (
                  <span key={crop} style={{
                    ...glass,
                    color: "rgba(255,255,255,0.28)", fontSize: 10, letterSpacing: "0.2em",
                    textTransform: "uppercase", padding: "8px 18px"
                  }}>{crop}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Residence */}
        <div id="residence" style={{ padding: "80px 32px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ color: "rgba(120,160,90,0.7)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 16 }}>The Residence</p>
              <h2 style={{ fontSize: 36, fontWeight: 300, color: "rgba(255,252,245,0.85)", marginBottom: 20, lineHeight: 1.3 }}>
                The House That Quietly<br />Steals the Whole Show
              </h2>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 15, lineHeight: 1.95, maxWidth: 600, margin: "0 auto 12px" }}>
                Crafted by architect Robert E. Clark, the ~7,500 sq ft residence is built to commercial standards. Civil War-era heart pine, massive timber trusses, and artisan brick throughout.
              </p>
              <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 15, lineHeight: 1.95, maxWidth: 580, margin: "0 auto" }}>
                Five ensuite bedrooms including two autonomous guest apartments. 60" Wolf range. Sub-Zero suite. Walk-out lower level with Brown Safe vault.
              </p>
            </div>

            {/* Specs — glass grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: matterportUrl ? 40 : 0 }}>
              {[
                ["~7,500 sq ft", "Total Living Area"],
                ["5", "Ensuite Bedrooms"],
                ["2", "Autonomous Guest Apts"],
                ["20", "Geothermal Wells"],
                ["14.3 kW", "Solar Array"],
                ["Robert E. Clark", "Architect"],
              ].map(([val, label]) => (
                <div key={label} style={{ ...glassCard, padding: "28px 28px", display: "flex", alignItems: "center", gap: 20 }}>
                  <p style={{ fontSize: 18, fontWeight: 300, color: "rgba(255,252,245,0.85)", margin: 0, minWidth: 80 }}>{val}</p>
                  <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>

            {matterportUrl && (
              <div style={{ textAlign: "center", marginTop: 40 }}>
                <button onClick={() => setShowTour(true)} style={{
                  ...glassCard,
                  color: "rgba(154,184,125,0.85)", fontSize: 10, letterSpacing: "0.35em",
                  textTransform: "uppercase", padding: "16px 44px", cursor: "pointer"
                }}>◈ Launch Virtual 3D Tour</button>
              </div>
            )}
          </div>
        </div>

        {/* Quote */}
        <div style={{ padding: "60px 32px", textAlign: "center" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 20, fontStyle: "italic", fontWeight: 300, lineHeight: 1.7, letterSpacing: "0.02em" }}>
              "The architecture is merely the anchor. The land it sits upon provides the true foundation for autonomy."
            </p>
          </div>
        </div>

        {/* Contact */}
        <div id="contact" style={{ padding: "80px 32px" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ ...glassCard, padding: "64px 48px", textAlign: "center" }}>
              <p style={{ color: "rgba(120,160,90,0.7)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 20 }}>Private Showing</p>
              <h2 style={{ fontSize: 32, fontWeight: 300, color: "rgba(255,252,245,0.85)", marginBottom: 16 }}>Schedule a Private Viewing</h2>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 14, lineHeight: 1.85, marginBottom: 36 }}>
                Flow Farm is offered exclusively.<br />Inquiries by appointment only.
              </p>
              <a href="mailto:rachelhernandezrealtor@gmail.com" style={{
                display: "inline-block",
                border: "1px solid rgba(120,160,90,0.6)", color: "rgba(154,184,125,0.9)",
                fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase",
                padding: "16px 44px", textDecoration: "none"
              }}>Contact Rachel Hernandez</a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "40px 32px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p style={{ color: "rgba(255,255,255,0.1)", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", margin: 0 }}>
            Flow Farm · 107 Linden Trail · Aberdeen, North Carolina · rachelhernandezrealtor@gmail.com
          </p>
        </div>

      </div>{/* end relative zIndex wrapper */}

      {/* Matterport Modal */}
      {showTour && matterportUrl && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(4,7,4,0.97)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setShowTour(false)} style={{
            position: "absolute", top: 24, right: 28, background: "none", border: "none",
            color: "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: 28, lineHeight: 1
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
