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

  const features = [
    "Gourmet kitchen with scullery — Sub-Zero refrigerator, freezer, fridge/freezer combo & wine cooler; Wolf 60\" dual fuel stove with 6-burners, griddle, grill & warming drawer; 2 KitchenAid dishwashers",
    "2 sets of Whirlpool washers and steam dryers",
    "Whole house commercial water filtration system (Clear Water Solutions)",
    "Whole house fire sprinkler system",
    "30 kW Kohler generator with 2× 1,000 gallon buried propane tanks",
    "14.3 kW solar array — 61 Samsung panels",
    "Sunny Island 10k Solar Battery Backup system",
    "Private water well — up to 50 gpm",
    "Private septic — 2× 1,500 gallon tanks with pump",
    "Geothermal loop — 20 deep wells, each 300 feet deep",
    "Five interconnected HVAC zones with Water Furnace geothermal systems",
    "Lennox air purification systems on each zone",
    "Two Water Furnace superheaters providing geothermal hot water",
    "Energy Recovery Ventilator system",
    "HVAC design by Energy Innovations / Harry Boody",
    "Energy efficient insulation and mylar wrap — whole house",
    "Whole house central vacuum — dual VacuMaid S2400",
    "Sealed and fully conditioned crawl space below full footprint",
    "All mechanicals fully accessible in conditioned space",
    "Brown Safe — jewelry safe + vault door",
    "Whole \"smart house\" Control 4 audio, video & lighting system",
    "Whole house alarm system",
    "Whole campus Wi-Fi",
    "1,400 ft double deer fence enclosing approx 3 acres",
    "500 ft single fence dog run enclosing approx 1 acre",
    "Children's treehouse with porch on two oak trees in dog run",
    "High tunnel greenhouse — 96'×36' (Four Season Tools)",
    "Custom Climate Battery air-to-soil geothermal for heating high tunnel",
    "Operational farm workshop building — 30'×40'",
    "Covered aerated composting system (O2Compost)",
    "Biochar kiln under covered structure with I-Beam and chain hoist",
    "Walk-in cooler — 12'×8' in farm auxiliary building",
  ];

  const structures = [
    { name: "Main Residence", desc: "7,500 sq ft designed by Robert E. Clark AIA. Ground floor, loft level, and fully conditioned basement. Reclaimed Civil War-era heart pine floors throughout. Octagonal conservatory skylight dome. Painted artisan brick exterior with cedar shingles and terra cotta accents." },
    { name: "Basement", desc: "Full-footprint lower level with recreation space, media room, sauna, workshop, and Brown Safe vault room — all in conditioned space." },
    { name: "Cabana & Racquetball Court", desc: "Regulation racquetball court with full cabana, private bath, storage, and upper loft viewing area. Adjacent to the pool." },
    { name: "Root Cellar & Greenhouse", desc: "Below-grade root cellar attached to a south-facing greenhouse — purpose-built for year-round growing and preservation." },
    { name: "Garage Loft", desc: "Separate living and storage area above the attached garage with its own utilities and access." },
    { name: "Farm Workshop", desc: "Operational 30'×40' farm workshop building. Covered biochar production area with I-Beam, chain hoist, and composting system." },
  ];

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Georgia, serif", color: "#fff", overflowX: "hidden" }}>

      {/* BACKGROUND */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "#0a0d0a" }} />
      <div style={{
        position: "fixed", inset: 0, zIndex: 1,
        background: "radial-gradient(ellipse at 30% 40%, rgba(30,50,20,0.22) 0%, transparent 65%)"
      }} />
      {heroPhoto && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2 }}>
          <img src={heroPhoto.file_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.12, filter: "blur(40px) saturate(0.4)" }} />
        </div>
      )}
      <div style={{ position: "fixed", inset: 0, zIndex: 3, background: "rgba(8,11,8,0.72)" }} />

      {/* MATTERPORT MODAL */}
      {showTour && matterportUrl && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.92)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setShowTour(false)} style={{ position: "absolute", top: 24, right: 32, background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 28, cursor: "pointer" }}>✕</button>
          <iframe src={matterportUrl} width="90%" height="80%" frameBorder="0" allowFullScreen style={{ borderRadius: 4 }} />
        </div>
      )}

      <div style={{ position: "relative", zIndex: 10 }}>

        {/* NAV */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          ...glassCard, borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none",
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px",
        }}>
          <div>
            <p style={{ color: "rgba(255,252,245,0.88)", fontSize: 12, letterSpacing: "0.4em", textTransform: "uppercase", margin: 0 }}>Flow Farm</p>
            <p style={{ color: "rgba(160,190,140,0.55)", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", margin: "3px 0 0" }}>107 Linden Trail · Aberdeen, NC</p>
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {[["The Estate","#estate"],["The Compound","#compound"],["Residence","#residence"],["Features","#features"],["Gallery","/FlowFarmGallery"]].map(([label, href]) => (
              <a key={label} href={href} style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none" }}>{label}</a>
            ))}
            <a href="#contact" style={{ ...glassLight, color: "rgba(180,210,160,0.85)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", padding: "9px 20px", textDecoration: "none" }}>Schedule Viewing</a>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "120px 48px 80px" }}>
          <div style={{ ...glassLight, display: "inline-flex", alignItems: "center", gap: 20, padding: "10px 24px", marginBottom: 40, alignSelf: "flex-start" }}>
            <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase" }}>107 Linden Trail · Aberdeen, NC</span>
            <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.12)", display: "inline-block" }} />
            <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase" }}>3 Miles from Pinehurst</span>
            <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.12)", display: "inline-block" }} />
            <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase" }}>USDA Registered Farm</span>
          </div>

          <p style={{ color: "rgba(160,195,130,0.65)", fontSize: 10, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 18 }}>A Private Compound · Fifteen Acres · Six Structures</p>

          <h1 style={{ fontSize: "clamp(60px, 10vw, 118px)", fontWeight: 300, color: "rgba(255,252,245,0.92)", letterSpacing: "0.03em", margin: "0 0 28px", lineHeight: 0.95 }}>
            Flow<br />Farm
          </h1>

          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 15, maxWidth: 560, marginBottom: 48, lineHeight: 1.9 }}>
            Fifteen acres anchored by a commercial-grade residence, a USDA-registered farm, a regulation racquetball court, a root cellar and greenhouse, and a fully conditioned basement compound — offering absolute privacy and rare zoning flexibility just three miles from Pinehurst.
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <a href="/FlowFarmGallery" style={{ ...glassCard, color: "rgba(180,210,155,0.85)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", padding: "15px 36px", textDecoration: "none" }}>All Photos</a>
            {matterportUrl && (
              <button onClick={() => setShowTour(true)} style={{ ...glassLight, color: "rgba(255,255,255,0.38)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", padding: "15px 36px", cursor: "pointer", border: "1px solid rgba(255,255,255,0.07)" }}>◈ Virtual Tour</button>
            )}
            <a href="#contact" style={{ color: "rgba(255,255,255,0.18)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", textDecoration: "none", marginLeft: 12 }}>Private Inquiry →</a>
          </div>
        </div>

        {/* STATS BAR */}
        <div style={{ padding: "0 32px 80px" }}>
          <div style={{ ...glassCard, maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}>
              {[["15","Acres"],["6","Structures"],["20","Geothermal Wells"],["61","Solar Panels"],["30kW","Generator"],["$5.26M","Offered At"]].map(([val, label], i) => (
                <div key={label} style={{ padding: "28px 14px", textAlign: "center", borderRight: i < 5 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <p style={{ fontSize: 26, fontWeight: 300, color: "rgba(255,252,245,0.82)", margin: "0 0 6px" }}>{val}</p>
                  <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* THE ESTATE */}
        <div id="estate" style={{ padding: "60px 32px 80px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <p style={{ color: "rgba(160,190,130,0.7)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 22 }}>The Opportunity</p>
            <h2 style={{ fontSize: "clamp(26px, 3.2vw, 42px)", fontWeight: 300, color: "rgba(255,252,245,0.86)", marginBottom: 32, lineHeight: 1.25, maxWidth: 700 }}>
              The Farm Is the Engine.<br />The Compound Is the Reward.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, lineHeight: 1.95, marginBottom: 18 }}>
                  This is not potential — it is position. A working USDA-registered farm anchors the land in its most powerful state, preserving agricultural classification and securing zoning flexibility that typical acreage cannot touch.
                </p>
                <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 14, lineHeight: 1.95, marginBottom: 18 }}>
                  What others would need to build, permit, and protect has already been done. The farm generates momentum. The zoning secures it. The compound delivers on every dimension of private living — wellness, production, recreation, and retreat.
                </p>
                <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 14, lineHeight: 1.95 }}>
                  Beneath the residence: a fully conditioned basement with media room, sauna, and a Brown Safe vault room. Adjacent to the pool: a regulation racquetball court with loft viewing area. On the land: a root cellar, greenhouse, biochar facility, and walk-in cooler. This is a compound.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  ["15 Acres", "Secured agricultural standing with natural forest buffer and 7 buildable acres."],
                  ["USDA Farm", "3-acre veganic operation securing the estate's zoning and classification."],
                  ["The Compound", "Racquetball court, root cellar, greenhouse, vault, sauna, and media room."],
                  ["Off-Grid Ready", "20 geothermal wells, 61 solar panels, 30kW generator, private well and septic."],
                ].map(([title, desc]) => (
                  <div key={title} style={{ ...glassCard, padding: "22px 18px" }}>
                    <div style={{ width: 16, height: 1, background: "rgba(160,190,130,0.4)", marginBottom: 14 }} />
                    <h3 style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,252,245,0.78)", letterSpacing: "0.06em", marginBottom: 10, lineHeight: 1.4 }}>{title}</h3>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", lineHeight: 1.7, margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* THE COMPOUND — SIX STRUCTURES */}
        <div id="compound" style={{ padding: "60px 32px 80px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <p style={{ color: "rgba(160,190,130,0.7)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 22 }}>Six Structures</p>
            <h2 style={{ fontSize: "clamp(26px, 3.2vw, 42px)", fontWeight: 300, color: "rgba(255,252,245,0.86)", marginBottom: 48, lineHeight: 1.25 }}>
              Every Structure Has a Purpose.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {structures.map(({ name, desc }) => (
                <div key={name} style={{ ...glassCard, padding: "32px 26px" }}>
                  <div style={{ width: 20, height: 1, background: "rgba(160,190,130,0.35)", marginBottom: 18 }} />
                  <h3 style={{ fontSize: 13, fontWeight: 400, color: "rgba(255,252,245,0.82)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14, lineHeight: 1.4 }}>{name}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", lineHeight: 1.85, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RESIDENCE */}
        <div id="residence" style={{ padding: "60px 32px 80px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
            <div>
              <p style={{ color: "rgba(160,190,130,0.7)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 22 }}>The Residence</p>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 40px)", fontWeight: 300, color: "rgba(255,252,245,0.86)", marginBottom: 24, lineHeight: 1.25 }}>
                Designed by Robert E. Clark AIA.<br />Built to Last Generations.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, lineHeight: 1.95, marginBottom: 14 }}>
                The main residence spans three levels — ground floor, loft, and a fully conditioned basement. Reclaimed Civil War-era heart pine floors run throughout. The conservatory features an octagonal skylight dome. The exterior is painted artisan brick with cedar shingles and terra cotta accents.
              </p>
              <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 14, lineHeight: 1.95, marginBottom: 14 }}>
                The kitchen is built for professional production — Sub-Zero and Wolf appliances throughout, scullery, and double dishwashers. The master suite includes walk-in closet, steam shower, and wardrobe room. The basement holds the media room, sauna, vault, and workshop — all in conditioned space.
              </p>
              <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 14, lineHeight: 1.95 }}>
                The whole "smart house" is wired with Control 4 audio, video, and lighting. Campus-wide Wi-Fi. Whole house alarm. Central vacuum. Commercial water filtration. Every system at commercial grade.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                ["Ground Floor", "Foyer, living/dining, kitchen, conservatory, master suite, office/library, mudroom, covered terrace."],
                ["Loft Level", "Upper bedroom, loft living/dining, kitchenette, east wing loft, storage, and conservatory view."],
                ["Basement", "Recreation space, media room, sauna, Brown Safe vault room, workshop — all conditioned."],
                ["Conservatory", "Octagonal skylight dome — the architectural centerpiece of the residence."],
              ].map(([title, desc]) => (
                <div key={title} style={{ ...glassCard, padding: "22px 18px" }}>
                  <div style={{ width: 16, height: 1, background: "rgba(160,190,130,0.4)", marginBottom: 14 }} />
                  <h3 style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,252,245,0.78)", letterSpacing: "0.06em", marginBottom: 10, lineHeight: 1.4 }}>{title}</h3>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURES LIST */}
        <div id="features" style={{ padding: "60px 32px 80px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <p style={{ color: "rgba(160,190,130,0.7)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 22 }}>Property Features</p>
            <h2 style={{ fontSize: "clamp(26px, 3.2vw, 40px)", fontWeight: 300, color: "rgba(255,252,245,0.86)", marginBottom: 48, lineHeight: 1.25 }}>
              Nothing Was Left Out.
            </h2>
            <div style={{ ...glassCard, padding: "48px 40px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 48px" }}>
                {features.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(160,190,130,0.5)", marginTop: 7, flexShrink: 0 }} />
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", lineHeight: 1.7, margin: 0 }}>{f}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div id="contact" style={{ padding: "60px 32px 120px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <p style={{ color: "rgba(160,190,130,0.7)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 22 }}>Private Inquiry</p>
            <h2 style={{ fontSize: "clamp(26px, 3.2vw, 40px)", fontWeight: 300, color: "rgba(255,252,245,0.86)", marginBottom: 20, lineHeight: 1.3 }}>
              This Estate Is Shown<br />By Appointment Only.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 14, lineHeight: 1.9, marginBottom: 40 }}>
              Flow Farm is offered at $5,260,000. For qualified inquiries, private tours, and full disclosure documents, contact listing agent Rachel Hernandez directly.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="mailto:rachelhernandezrealtor@gmail.com" style={{ ...glassCard, color: "rgba(180,210,155,0.85)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", padding: "16px 36px", textDecoration: "none" }}>
                Email Rachel
              </a>
              {matterportUrl && (
                <button onClick={() => setShowTour(true)} style={{ ...glassLight, color: "rgba(255,255,255,0.38)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", padding: "16px 36px", cursor: "pointer", border: "1px solid rgba(255,255,255,0.07)" }}>
                  ◈ Virtual Tour
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ ...glassCard, borderRadius: 0, borderLeft: "none", borderRight: "none", borderBottom: "none", padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", margin: 0 }}>Flow Farm · 107 Linden Trail · Aberdeen, NC</p>
            <p style={{ color: "rgba(255,255,255,0.1)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", margin: "4px 0 0" }}>Offered at $5,260,000 · Rachel Hernandez, Listing Agent</p>
          </div>
          <p style={{ color: "rgba(255,255,255,0.1)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", margin: 0 }}>flowfarmforest.com</p>
        </div>

      </div>
    </div>
  );
}
