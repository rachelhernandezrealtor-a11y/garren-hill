import { useState, useEffect } from "react";

const IMG = {
  exterior: "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg",
  grounds: "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg",
  aerial: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/46fb99d0e_TSDroneHouseRoof.jpg",
  living1: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public",
  kitchen1: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public",
  conservatory1: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public",
  highTunnel: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg",
  workshop: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg",
  compost: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/983e028f7_CompostingandBioChar.jpg",
  cabana: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg",
};

const MATTERPORT = "https://my.matterport.com/show/?m=xZRfSiQPuQ8&brand=0&mls=1&";
const EXTERIOR_3D = "https://portal.nucleus4d.com/3ec4ff02-9412-4f29-87ba-4926145df7a1/exterior-d302c992-e611-4197-b2df-ff6931a8827a";

const STRUCTURES = [
  { name: "Main Residence", tagline: "Robert Clark Architectural Masterpiece", img: IMG.exterior, desc: "8,519 SF above grade by architect Robert Clark — one of his final works. Grand living room 27.5'×23.8' with 17' vaulted ceiling. Reclaimed Civil War-era heart pine throughout. Glass conservatory, gourmet kitchen with Sub-Zero & Wolf, Control4 smart home, geothermal systems." },
  { name: "Cabana House", tagline: "Private Guest Retreat", img: IMG.cabana, desc: "Independent guest quarters with private entrance, full bath, and kitchenette. Complete privacy from the main residence. Perfect for extended family, guests, or staff." },
  { name: "High Tunnel Greenhouse", tagline: "Year-Round Agricultural Production", img: IMG.highTunnel, desc: "96x36 ft high tunnel with custom Climate Battery air-to-soil geothermal heating — producing pineapples, avocados, citrus, and specialty crops year-round." },
  { name: "Farm Workshop", tagline: "Operational Infrastructure", img: IMG.workshop, desc: "30x40 ft operational workshop with plumbing and electrical. Walk-in cooler 12x8 ft. 1,400 ft of double deer fencing enclosing 3 acres of active cultivation." },
  { name: "Compost & Biochar", tagline: "Regenerative Systems", img: IMG.compost, desc: "Covered aerated composting (O2Compost) and biochar kiln under covered structure with I-Beam and chain hoist. Closes the nutrient loop across the entire estate." },
  { name: "Garage Loft", tagline: "Flex Space Above Grade", img: IMG.aerial, desc: "Separate living and storage area above the attached garage with its own utilities and access — available for studio, office, or additional guest use." },
];

const STATS = [
  ["8,519", "SF Residence"],
  ["6", "Structures"],
  ["15", "USDA Acres"],
  ["20", "Geothermal Wells"],
  ["1,200", "Amps Power"],
  ["$5.26M", "Offered At"],
];

const FEATURES = [
  "Gourmet kitchen with scullery — Sub-Zero refrigerator, freezer, fridge/freezer combo & wine cooler; Wolf 60\" dual fuel stove with 6-burners, griddle, grill & warming drawer; 2 KitchenAid dishwashers",
  "2 sets of Whirlpool washers and steam dryers",
  "Whole house commercial water filtration system (Clear Water Solutions)",
  "Whole house fire sprinkler system",
  "30 kW Kohler generator with 2x 1,000 gallon buried propane tanks",
  "14.3 kW solar array — 61 Samsung panels",
  "Sunny Island 10k Solar Battery Backup system",
  "Private water well — up to 50 gpm",
  "Private septic — 2x 1,500 gallon tanks with pump",
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
  "1,200 amp total power service",
  "Brown Safe — jewelry safe + vault door",
  "Whole smart house Control 4 audio, video & lighting system",
  "Araknis enterprise-grade whole-estate networking",
  "Whole house alarm system",
  "Whole campus Wi-Fi",
  "1,400 ft double deer fence enclosing approx 3 acres",
  "500 ft single fence dog run enclosing approx 1 acre",
  "Children's treehouse with porch on two oak trees in dog run",
  "High tunnel greenhouse — 96x36 ft (Four Season Tools)",
  "Custom Climate Battery air-to-soil geothermal for heating high tunnel",
  "Operational farm workshop building — 30x40 ft",
  "Covered aerated composting system (O2Compost)",
  "Biochar kiln under covered structure with I-Beam and chain hoist",
  "Walk-in cooler — 12x8 ft in farm auxiliary building",
  "Transferable Pinehurst Country Club Signature Golf Membership — unlimited access to Course No. 7 & No. 9",
];

export default function FlowFarmHome() {
  const [bgReady, setBgReady] = useState(false);
  const [showMatterport, setShowMatterport] = useState(false);
  const [activeStructure, setActiveStructure] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const glass = "background:rgba(8,10,8,0.6);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);border-radius:2px;";

  const G = {
    background: "rgba(8,10,8,0.6)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 2,
  };

  const GL = {
    background: "rgba(8,10,8,0.35)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 2,
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Georgia, serif", color: "#fff", background: "#080c08", overflowX: "hidden" }}>

      {/* MATTERPORT MODAL */}
      {showMatterport && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setShowMatterport(false)} style={{ position: "absolute", top: 24, right: 32, background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 32, cursor: "pointer" }}>X</button>
          <iframe src={MATTERPORT} width="88%" height="82%" frameBorder="0" allow="fullscreen" allowFullScreen style={{ borderRadius: 4 }} />
        </div>
      )}

      {/* STRUCTURE MODAL */}
      {activeStructure && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setActiveStructure(null)}>
          <div style={{ ...G, maxWidth: 620, width: "100%", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
            <img src={activeStructure.img} alt={activeStructure.name} style={{ width: "100%", height: 240, objectFit: "cover" }} />
            <div style={{ padding: "24px 28px 28px" }}>
              <p style={{ color: "rgba(160,190,130,0.7)", fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", margin: "0 0 8px" }}>{activeStructure.tagline}</p>
              <h3 style={{ fontSize: 20, fontWeight: 300, color: "rgba(255,252,245,0.9)", margin: "0 0 14px" }}>{activeStructure.name}</h3>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.85, margin: "0 0 20px" }}>{activeStructure.desc}</p>
              <button onClick={() => setActiveStructure(null)} style={{ ...GL, color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", padding: "10px 20px", cursor: "pointer" }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: navScrolled ? "rgba(8,10,8,0.92)" : "transparent",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "22px 44px",
      }}>
        <div>
          <p style={{ color: "rgba(255,252,245,0.9)", fontSize: 13, letterSpacing: "0.35em", textTransform: "uppercase", margin: 0, fontWeight: 300 }}>Flow Farm</p>
          <p style={{ color: "rgba(160,190,140,0.45)", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", margin: "3px 0 0" }}>107 Linden Trail · Aberdeen, NC</p>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[["Residence","#residence"],["The Farm","#farm"],["Features","#features"],["Location","#location"]].map(([label, href]) => (
            <a key={label} href={href} style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none" }}>{label}</a>
          ))}
          <a href="#contact" style={{ ...GL, color: "rgba(180,210,155,0.8)", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", padding: "10px 22px", textDecoration: "none" }}>Private Inquiry</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden", background: "#000" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: bgReady ? 1 : 0, transition: "opacity 1.6s ease" }}>
          <iframe
            src="https://player.vimeo.com/video/1171394707?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            onLoad={() => setBgReady(true)}
            style={{ position: "absolute", top: "50%", left: "50%", width: "max(177.78vh, 100vw)", height: "max(56.25vw, 100vh)", transform: "translate(-50%, -50%)", border: "none", pointerEvents: "none" }}
          />
        </div>

        {!bgReady && (
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.aerial})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        )}

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 50%, rgba(0,0,0,0.8) 85%, #080c08 100%)" }} />
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 200px 60px rgba(0,0,0,0.25)" }} />

        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
          <p style={{ color: "rgba(180,210,150,0.65)", fontSize: 9, letterSpacing: "0.65em", textTransform: "uppercase", marginBottom: 20 }}>A Regenerative Estate · Fifteen Acres · Six Structures</p>

          <h1 style={{ fontSize: "clamp(50px, 9vw, 108px)", fontWeight: 300, color: "#fff", letterSpacing: "0.02em", margin: "0 0 24px", lineHeight: 0.95, textShadow: "0 2px 32px rgba(0,0,0,0.6)" }}>
            Agritourism<br /><em style={{ fontStyle: "italic" }}>Established.</em><br />Legacy Ready.
          </h1>

          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(13px, 1vw, 15px)", maxWidth: 620, lineHeight: 1.9, marginBottom: 44, textShadow: "0 1px 12px rgba(0,0,0,0.7)" }}>
            A rare convergence of land, architecture, and infrastructure — offering energy independence, rare zoning flexibility, and a transferable Pinehurst Country Club Signature Golf Membership with unlimited access to Course No. 7 and No. 9.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 44 }}>
            {[["15 Acres","USDA Zoned"],["3 Miles","to Pinehurst"],["$5.26M","Offered At"],["6","Structures"]].map(([val, label]) => (
              <div key={label} style={{ ...GL, padding: "10px 20px", textAlign: "center" }}>
                <p style={{ fontSize: 16, fontWeight: 300, color: "rgba(255,252,245,0.9)", margin: "0 0 3px" }}>{val}</p>
                <p style={{ fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => setShowMatterport(true)} style={{ ...G, color: "rgba(180,210,155,0.85)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", padding: "15px 36px", cursor: "pointer" }}>
              Virtual Tour
            </button>
            <a href={EXTERIOR_3D} target="_blank" rel="noopener noreferrer" style={{ ...GL, color: "rgba(255,255,255,0.38)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", padding: "15px 36px", textDecoration: "none" }}>
              Walk the Land
            </a>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", margin: "0 0 8px" }}>Scroll</p>
          <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)", margin: "0 auto" }} />
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{ padding: "0 32px 60px" }}>
        <div style={{ ...G, maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}>
            {STATS.map(([val, label], i) => (
              <div key={label} style={{ padding: "26px 14px", textAlign: "center", borderRight: i < 5 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <p style={{ fontSize: 24, fontWeight: 300, color: "rgba(255,252,245,0.85)", margin: "0 0 5px" }}>{val}</p>
                <p style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RESIDENCE */}
      <div id="residence" style={{ padding: "40px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "rgba(160,190,130,0.65)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 14 }}>The Residence</p>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 300, color: "rgba(255,252,245,0.88)", marginBottom: 44, lineHeight: 1.2, maxWidth: 660 }}>
            Designed by Robert Clark AIA.<br />One of His Final Works.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 44, alignItems: "start" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              <img src={IMG.living1} alt="Grand Living Room" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", gridColumn: "1 / -1" }} />
              <img src={IMG.conservatory1} alt="Conservatory" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
              <img src={IMG.kitchen1} alt="Kitchen" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, lineHeight: 1.95, marginBottom: 16 }}>
                The residence encompasses 8,519 SF above grade, plus 1,709 SF of partially finished walk-out lower level and 2,531 SF of fully conditioned crawl space. Grand central living room: 27.5' x 23.8' with a 17' vaulted ceiling.
              </p>
              <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 14, lineHeight: 1.95, marginBottom: 16 }}>
                The glass-wrapped conservatory (19.5' x 17.7') with octagonal skylight dome acts as a luminous hinge between interior luxury and the regenerative landscape. Reclaimed Civil War-era heart pine floors custom-laid in artisan patterns throughout — including bedrooms, hallways, and closets.
              </p>
              <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 14, lineHeight: 1.95, marginBottom: 28 }}>
                Primary suite: cathedral-ceiling bedroom, sitting room, spa bath, and exceptional dressing room (11.7' x 21.7'). Basement: media room, sauna, and Brown Safe vault — all fully conditioned.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 22 }}>
                {[
                  ["Kitchen", "Sub-Zero suite + Wolf 60\" range, double ovens, 2 KitchenAid dishwashers"],
                  ["Smart Home", "Control4 audio/video/lighting + Araknis enterprise networking"],
                  ["Energy", "20 geothermal wells, 61 solar panels, 30kW generator, 1,200 amp service"],
                  ["Basement", "Media room, sauna, Brown Safe vault — all fully conditioned"],
                ].map(([title, desc]) => (
                  <div key={title} style={{ ...GL, padding: "16px 14px" }}>
                    <div style={{ width: 14, height: 1, background: "rgba(160,190,130,0.4)", marginBottom: 9 }} />
                    <p style={{ fontSize: 10, color: "rgba(255,252,245,0.7)", letterSpacing: "0.06em", margin: "0 0 6px" }}>{title}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowMatterport(true)} style={{ ...G, color: "rgba(180,210,155,0.8)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", padding: "12px 26px", cursor: "pointer" }}>
                Interior Tour
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SIX STRUCTURES */}
      <div id="farm" style={{ padding: "40px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "rgba(160,190,130,0.65)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 14 }}>The Compound</p>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 300, color: "rgba(255,252,245,0.88)", marginBottom: 44, lineHeight: 1.2 }}>
            Six Structures.<br />Every One with Purpose.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {STRUCTURES.map((s) => (
              <div key={s.name} onClick={() => setActiveStructure(s)} style={{ ...G, cursor: "pointer", overflow: "hidden" }}>
                <img src={s.img} alt={s.name} style={{ width: "100%", height: 170, objectFit: "cover" }} />
                <div style={{ padding: "18px 20px 22px" }}>
                  <p style={{ color: "rgba(160,190,130,0.6)", fontSize: 8, letterSpacing: "0.45em", textTransform: "uppercase", margin: "0 0 7px" }}>{s.tagline}</p>
                  <h3 style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,252,245,0.82)", margin: "0 0 9px" }}>{s.name}</h3>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", lineHeight: 1.65, margin: "0 0 12px" }}>{s.desc.substring(0, 90)}...</p>
                  <span style={{ color: "rgba(160,190,130,0.5)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" }}>Details</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div id="features" style={{ padding: "40px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "rgba(160,190,130,0.65)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 14 }}>Property Features</p>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 300, color: "rgba(255,252,245,0.88)", marginBottom: 44, lineHeight: 1.2 }}>
            Nothing Was Left Out.
          </h2>
          <div style={{ ...G, padding: "40px 36px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 44px" }}>
              {FEATURES.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(160,190,130,0.5)", marginTop: 8, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.27)", lineHeight: 1.7, margin: 0 }}>{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LOCATION */}
      <div id="location" style={{ padding: "40px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center" }}>
          <div>
            <p style={{ color: "rgba(160,190,130,0.65)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 14 }}>Location</p>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 300, color: "rgba(255,252,245,0.88)", marginBottom: 22, lineHeight: 1.2 }}>
              Private by Nature.<br />Pinehurst by Proximity.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 14, lineHeight: 1.9, marginBottom: 14 }}>
              Flow Farm is approached via private drive from Linden Trail with additional access via Linden Road, Mollie Lane, and Skene Lane — creating immediate separation and discretion.
            </p>
            <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 14, lineHeight: 1.9, marginBottom: 28 }}>
              Rare privacy without isolation. Minutes from Pinehurst, private aviation, advanced healthcare, and within easy reach of Raleigh-Durham International Airport.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[["3 Miles","Historic Village of Pinehurst"],["Minutes","Moore County Regional Airport"],["1 Hour","Raleigh-Durham International"],["Nearby","FirstHealth Moore Regional Hospital"]].map(([val, label]) => (
                <div key={label} style={{ ...GL, padding: "14px 13px" }}>
                  <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,252,245,0.7)", margin: "0 0 4px" }}>{val}</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", margin: 0, lineHeight: 1.4 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
          <img src={IMG.grounds} alt="Flow Farm grounds" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} />
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ padding: "60px 32px 100px" }}>
        <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "rgba(160,190,130,0.65)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 14 }}>Private Inquiry</p>
          <h2 style={{ fontSize: "clamp(26px, 3.2vw, 40px)", fontWeight: 300, color: "rgba(255,252,245,0.88)", marginBottom: 16, lineHeight: 1.3 }}>
            Shown By Appointment Only.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 14, lineHeight: 1.9, marginBottom: 36 }}>
            Flow Farm is offered at $5,260,000. For qualified inquiries, private tours, and full disclosure documents, contact listing agent Rachel Hernandez directly.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:rachelhernandezrealtor@gmail.com" style={{ ...G, color: "rgba(180,210,155,0.85)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", padding: "15px 34px", textDecoration: "none" }}>
              Email Rachel
            </a>
            <button onClick={() => setShowMatterport(true)} style={{ ...GL, color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", padding: "15px 34px", cursor: "pointer" }}>
              Virtual Tour
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ ...G, borderRadius: 0, borderLeft: "none", borderRight: "none", borderBottom: "none", padding: "24px 44px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", margin: 0 }}>Flow Farm · 107 Linden Trail · Aberdeen, NC 28315</p>
          <p style={{ color: "rgba(255,255,255,0.1)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", margin: "4px 0 0" }}>Offered at $5,260,000 · Rachel Hernandez, Listing Agent</p>
        </div>
        <p style={{ color: "rgba(255,255,255,0.1)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", margin: 0 }}>flowfarmforest.com</p>
      </div>

    </div>
  );
}
