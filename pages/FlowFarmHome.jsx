import { useState, useEffect } from "react";
import { PropertyPhoto, Property } from "@/api/entities";
import { X } from "lucide-react";

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
        if (props.length > 0 && props[0].matterport_urls?.length) {
          setMatterportUrl(props[0].matterport_urls[0]);
        }
        const ps = await PropertyPhoto.filter({ property_id: PROPERTY_ID }, { limit: 50, sort: "sort_order" });
        if (ps.length > 0) setHeroPhoto(ps[0]);
        setPhotos(ps);
      } catch (e) { console.error(e); }
    };
    load();
  }, []);

  const bg = "#080c08";
  const green = "#6b8f52";
  const lightGreen = "#9ab87d";
  const cream = "rgba(255,252,245,0.85)";

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "'Georgia', 'Times New Roman', serif", color: "#fff" }}>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 40px",
        background: "linear-gradient(to bottom, rgba(8,12,8,0.9), transparent)"
      }}>
        <div>
          <p style={{ color: cream, fontSize: 12, letterSpacing: "0.35em", textTransform: "uppercase", margin: 0, fontWeight: 400 }}>Flow Farm</p>
          <p style={{ color: `${green}99`, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", margin: "3px 0 0" }}>107 Linden Trail · Aberdeen, NC</p>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[["Estate", "#opportunity"], ["The Farm", "#farm"], ["Residence", "#residence"], ["Gallery", "/FlowFarmGallery"]].map(([label, href]) => (
            <a key={label} href={href}
              style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none" }}>
              {label}
            </a>
          ))}
          <a href="#contact" style={{
            border: `1px solid ${green}70`, color: `${lightGreen}`,
            fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
            padding: "9px 20px", textDecoration: "none"
          }}>Schedule Viewing</a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", height: "100vh", minHeight: 700 }}>
        {heroPhoto ? (
          <img src={heroPhoto.file_url} alt="Flow Farm"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #0d1a0d 0%, #1a2e12 40%, #080c08 100%)" }} />
        )}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(8,12,8,0.25) 0%, rgba(8,12,8,0.05) 30%, rgba(8,12,8,0.7) 70%, rgba(8,12,8,1) 100%)"
        }} />

        {/* Address bar */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 32, marginBottom: 60 }}>
            <div style={{ height: 1, width: 80, background: "rgba(255,255,255,0.15)" }} />
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", margin: 0 }}>
              107 Linden Trail · Aberdeen, NC &nbsp;|&nbsp; 3 Miles from Pinehurst &nbsp;|&nbsp; Pinehurst ETJ
            </p>
            <div style={{ height: 1, width: 80, background: "rgba(255,255,255,0.15)" }} />
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 48px 80px" }}>
          <p style={{ color: `${lightGreen}90`, fontSize: 10, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 20 }}>
            A Working Estate · Fifteen Acres
          </p>
          <h1 style={{ fontSize: "clamp(52px, 9vw, 110px)", fontWeight: 300, color: cream, letterSpacing: "0.04em", margin: "0 0 20px", lineHeight: 1 }}>
            Flow Farm
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, maxWidth: 560, marginBottom: 44, lineHeight: 1.85, letterSpacing: "0.02em" }}>
            Fifteen acres anchored by a commercial-grade residence and a USDA-registered farm, offering absolute privacy and rare zoning flexibility just three miles from Pinehurst.
          </p>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <a href="/FlowFarmGallery" style={{
              border: `1px solid ${green}80`, color: lightGreen, fontSize: 10,
              letterSpacing: "0.35em", textTransform: "uppercase", padding: "15px 36px", textDecoration: "none"
            }}>All Photos</a>
            {matterportUrl && (
              <button onClick={() => setShowTour(true)} style={{
                background: "none", border: `1px solid rgba(255,255,255,0.18)`, color: "rgba(255,255,255,0.45)",
                fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase",
                padding: "15px 36px", cursor: "pointer"
              }}>◈ Launch Virtual Tour</button>
            )}
            <a href="#contact" style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", textDecoration: "none", marginLeft: 8 }}>
              Private Inquiry →
            </a>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "36px 32px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, textAlign: "center" }}>
          {[["15","USDA Acres"],["7","Buildable Acres"],["3","Acre Veganic Farm"],["$5.26M","Offered At"]].map(([val, label]) => (
            <div key={label} style={{ padding: "8px 0" }}>
              <p style={{ fontSize: 32, fontWeight: 300, color: cream, margin: "0 0 6px", letterSpacing: "0.02em" }}>{val}</p>
              <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Opportunity */}
      <div id="opportunity" style={{ maxWidth: 760, margin: "0 auto", padding: "100px 32px", textAlign: "center" }}>
        <div style={{ width: 1, height: 48, background: `${green}35`, margin: "0 auto 52px" }} />
        <p style={{ color: `${green}80`, fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 28 }}>The Opportunity</p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: cream, marginBottom: 16, lineHeight: 1.3 }}>
          The Farm Is the Engine.<br />The Zoning Is the Key.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15, lineHeight: 1.95, marginBottom: 20, maxWidth: 620, margin: "0 auto 20px" }}>
          This is not potential. It is position. A working USDA-registered farm anchors the land in its most powerful state — preserving agricultural status and securing a classification that supports far greater flexibility than typical acreage.
        </p>
        <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 15, lineHeight: 1.95, maxWidth: 580, margin: "0 auto 48px" }}>
          What others would need to build, maintain, and protect has already been done. The farm generates momentum. The zoning secures it. What remains is control.
        </p>
        <div style={{ width: 1, height: 40, background: `${green}20`, margin: "0 auto" }} />
      </div>

      {/* Investment Summary Grid */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ color: `${green}70`, fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 16 }}>Investment Summary</p>
          <h2 style={{ fontSize: 32, fontWeight: 300, color: cream, margin: 0 }}>The Strategic Value of the Land</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(255,255,255,0.05)" }}>
          {[
            ["15 Acres of Opportunity", "Secured agricultural standing enveloped by a protected natural forest buffer."],
            ["The Agricultural Engine", "A highly productive, 3-acre USDA-registered veganic farm that secures the estate's zoning."],
            ["Uncommon Freedom", "The rare entitlement to create a private family compound, luxury wellness retreat, or hospitality venue."],
            ["Architectural Permanence", "A curated ~7,500 sq ft design masterpiece by Robert E. Clark, built to commercial standards."],
            ["Engineered Independence", "True self-sufficiency through advanced solar, geothermal climate control, and deep-water wells."],
            ["Compound Expansion", "An architect-designed guest house shell and 7 buildable acres ready for immediate development."],
          ].map(([title, desc]) => (
            <div key={title} style={{ background: bg, padding: "40px 32px" }}>
              <div style={{ width: 20, height: 1, background: `${green}50`, marginBottom: 20 }} />
              <h3 style={{ fontSize: 13, fontWeight: 400, color: cream, letterSpacing: "0.05em", marginBottom: 14, lineHeight: 1.4 }}>{title}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.8, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Farm */}
      <div id="farm" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "100px 32px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", marginBottom: 64 }}>
          <div style={{ width: 1, height: 40, background: `${green}35`, margin: "0 auto 48px" }} />
          <p style={{ color: `${green}80`, fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 28 }}>The Farm</p>
          <h2 style={{ fontSize: 36, fontWeight: 300, color: cream, marginBottom: 24, lineHeight: 1.3 }}>Veganic. Established. Running.</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15, lineHeight: 1.95, marginBottom: 16 }}>
            Operational since 2009. A 3-acre USDA-registered veganic farm with an established NC Qualifying Farmer Exemption already in place. No pesticides, no chemicals, no animal byproducts — just plants feeding plants and land that gets better every season.
          </p>
          <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 15, lineHeight: 1.95 }}>
            CSA members, farmers market relationships, and an established reputation. The revenue and community are already in place.
          </p>
        </div>

        {/* Farm Infrastructure */}
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            ["Biochar & Compost Pavilion", "A covered aerated composting system and biochar kiln under a covered I-Beam structure. Converts forest debris into stable carbon — building fertility that lasts for centuries."],
            ["High Tunnel Greenhouse", "96′ × 36′ high tunnel with a custom Climate Battery air-to-soil geothermal system. Extends the growing season by months for warm-season crops year-round."],
            ["Farm Workshop", "30′ × 40′ operational workshop with concrete slab, full electrical service, and dedicated 12′ × 8′ walk-in cooler for post-harvest crop storage."],
          ].map(([title, desc]) => (
            <div key={title} style={{ borderTop: `1px solid ${green}30`, paddingTop: 28 }}>
              <h3 style={{ fontSize: 12, fontWeight: 400, color: cream, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{title}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.85, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* What We Grow */}
        <div style={{ maxWidth: 760, margin: "64px auto 0", textAlign: "center" }}>
          <p style={{ color: `${green}60`, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 24 }}>Grown on the Land</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {["Tomatoes","Cucumbers","Leafy Greens","Herbs","Peppers","Squash & Zucchini","Strawberries","Potatoes","Hardy Kiwi","Cut Flowers"].map(crop => (
              <span key={crop} style={{
                border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)",
                fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                padding: "8px 16px"
              }}>{crop}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Residence */}
      <div id="residence" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "100px 32px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", marginBottom: 64 }}>
          <div style={{ width: 1, height: 40, background: `${green}35`, margin: "0 auto 48px" }} />
          <p style={{ color: `${green}80`, fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 28 }}>The Residence</p>
          <h2 style={{ fontSize: 36, fontWeight: 300, color: cream, marginBottom: 24, lineHeight: 1.3 }}>
            The House That Quietly<br />Steals the Whole Show
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15, lineHeight: 1.95, marginBottom: 16 }}>
            Crafted by architect Robert E. Clark, the ~7,500 sq ft residence stands as an unyielding testament to classic materiality. Civil War-era heart pine, massive timber trusses, and artisan brick establish a tactile gravity throughout.
          </p>
          <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 15, lineHeight: 1.95 }}>
            Five ensuite bedrooms including two fully autonomous guest apartments. A 60" Wolf dual fuel range. Sub-Zero refrigeration suite. Concealed scullery. Walk-out lower level with a Brown Safe vault. 20 geothermal wells. 14.3kW solar array.
          </p>
        </div>

        {/* Specs grid */}
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: "rgba(255,255,255,0.04)" }}>
          {[
            ["~7,500 sq ft", "Total Living Area"],
            ["5", "Ensuite Bedrooms"],
            ["2", "Autonomous Guest Apartments"],
            ["20", "Geothermal Wells"],
            ["14.3 kW", "Solar Array"],
            ["Robert E. Clark", "Architect"],
          ].map(([val, label]) => (
            <div key={label} style={{ background: bg, padding: "32px 28px", display: "flex", alignItems: "center", gap: 20 }}>
              <p style={{ fontSize: 22, fontWeight: 300, color: cream, margin: 0, minWidth: 80 }}>{val}</p>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>

        {matterportUrl && (
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <button onClick={() => setShowTour(true)} style={{
              background: "none", border: `1px solid ${green}60`, color: `${lightGreen}90`,
              fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase",
              padding: "16px 44px", cursor: "pointer"
            }}>◈ Launch Virtual 3D Tour</button>
          </div>
        )}
      </div>

      {/* Photo CTA */}
      {photos.length > 0 && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 32px", textAlign: "center" }}>
          <a href="/FlowFarmGallery" style={{
            border: `1px solid rgba(255,255,255,0.12)`, color: "rgba(255,255,255,0.3)",
            fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase",
            padding: "15px 40px", textDecoration: "none", display: "inline-block"
          }}>View All {photos.length} Photographs →</a>
        </div>
      )}

      {/* Contact */}
      <div id="contact" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "100px 32px", textAlign: "center" }}>
        <div style={{ width: 1, height: 40, background: `${green}30`, margin: "0 auto 48px" }} />
        <p style={{ color: `${green}70`, fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 20 }}>Private Showing</p>
        <h2 style={{ fontSize: 36, fontWeight: 300, color: cream, marginBottom: 20 }}>Schedule a Private Viewing</h2>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 14, lineHeight: 1.85, maxWidth: 400, margin: "0 auto 40px" }}>
          Flow Farm is offered exclusively. Inquiries by appointment only.
        </p>
        <a href="mailto:rachelhernandezrealtor@gmail.com" style={{
          border: `1px solid ${green}70`, color: lightGreen,
          fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase",
          padding: "17px 44px", textDecoration: "none", display: "inline-block"
        }}>Contact Rachel Hernandez</a>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 32px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.1)", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", margin: 0 }}>
          Flow Farm · 107 Linden Trail · Aberdeen, North Carolina · rachelhernandezrealtor@gmail.com
        </p>
      </div>

      {/* Matterport Modal */}
      {showTour && matterportUrl && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(4,7,4,0.98)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setShowTour(false)}
            style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: 24 }}>
            <X size={22} />
          </button>
          <div style={{ width: "100%", maxWidth: 1100, margin: "0 32px", aspectRatio: "16/9" }}>
            <iframe src={matterportUrl} style={{ width: "100%", height: "100%", border: "none" }}
              allow="xr-spatial-tracking" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  );
}
