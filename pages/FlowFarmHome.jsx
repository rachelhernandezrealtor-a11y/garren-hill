import { useState, useEffect } from "react";

const G = { background: "rgba(8,10,8,0.6)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2 };
const GL = { background: "rgba(8,10,8,0.35)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2 };
const EYEBROW = { color: "rgba(160,190,130,0.65)", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", marginBottom: 14 };
const H2 = { fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 300, color: "rgba(255,252,245,0.88)", marginBottom: 44, lineHeight: 1.2 };
const WRAP = { maxWidth: 1100, margin: "0 auto", padding: "60px 32px 80px" };

const STRUCTURES = [
  { name: "Main Residence", tagline: "Robert Clark Architectural Masterpiece", img: "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg", desc: "8,519 SF above grade by architect Robert Clark - one of his final works. Grand living room 27.5x23.8 ft with 17 ft vaulted ceiling. Reclaimed Civil War-era heart pine throughout. Glass conservatory, Sub-Zero and Wolf kitchen, Control4 smart home, geothermal systems." },
  { name: "Cabana House", tagline: "Private Guest Retreat", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg", desc: "Independent guest quarters with private entrance, full bath, and kitchenette. Complete privacy from the main residence." },
  { name: "High Tunnel Greenhouse", tagline: "Year-Round Agricultural Production", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg", desc: "96x36 ft high tunnel with custom Climate Battery geothermal heating. Produces pineapples, avocados, citrus year-round." },
  { name: "Farm Workshop", tagline: "Operational Infrastructure", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg", desc: "30x40 ft operational workshop with plumbing, electrical, and 12x8 ft walk-in cooler. 1,400 ft double deer fencing enclosing 3 acres." },
  { name: "Compost and Biochar", tagline: "Regenerative Systems", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/983e028f7_CompostingandBioChar.jpg", desc: "Covered aerated composting (O2Compost) and biochar kiln under covered structure with I-Beam and chain hoist." },
  { name: "Garage Loft", tagline: "Flex Space Above Grade", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/46fb99d0e_TSDroneHouseRoof.jpg", desc: "Separate living and storage area above the attached garage with its own utilities - available for studio, office, or guest use." },
];

const FEATURES = [
  "Gourmet kitchen with scullery - Sub-Zero refrigerator, freezer, fridge/freezer combo and wine cooler; Wolf 60 inch dual fuel stove with 6-burners, griddle, grill and warming drawer; 2 KitchenAid dishwashers",
  "2 sets of Whirlpool washers and steam dryers",
  "Whole house commercial water filtration system (Clear Water Solutions)",
  "Whole house fire sprinkler system",
  "30 kW Kohler generator with 2x 1,000 gallon buried propane tanks",
  "14.3 kW solar array - 61 Samsung panels",
  "Sunny Island 10k Solar Battery Backup system",
  "Private water well - up to 50 gpm",
  "Private septic - 2x 1,500 gallon tanks with pump",
  "Geothermal loop - 20 deep wells, each 300 feet deep",
  "Five interconnected HVAC zones with Water Furnace geothermal systems",
  "Lennox air purification systems on each zone",
  "Two Water Furnace superheaters providing geothermal hot water",
  "Energy Recovery Ventilator system",
  "HVAC design by Energy Innovations / Harry Boody",
  "Energy efficient insulation and mylar wrap - whole house",
  "Whole house central vacuum - dual VacuMaid S2400",
  "Sealed and fully conditioned crawl space below full footprint",
  "All mechanicals fully accessible in conditioned space",
  "1,200 amp total power service",
  "Brown Safe - jewelry safe and vault door",
  "Whole smart house Control4 audio, video and lighting system",
  "Araknis enterprise-grade whole-estate networking",
  "Whole house alarm system and whole campus Wi-Fi",
  "1,400 ft double deer fence enclosing approx 3 acres",
  "500 ft single fence dog run enclosing approx 1 acre",
  "Childrens treehouse with porch on two oak trees in dog run",
  "High tunnel greenhouse 96x36 ft (Four Season Tools)",
  "Custom Climate Battery air-to-soil geothermal for heating high tunnel",
  "Operational farm workshop building 30x40 ft",
  "Covered aerated composting system (O2Compost)",
  "Biochar kiln under covered structure with I-Beam and chain hoist",
  "Walk-in cooler 12x8 ft in farm auxiliary building",
  "Transferable Pinehurst Country Club Signature Golf Membership - unlimited access to Course No. 7 and No. 9",
];

export default function FlowFarmHome() {
  const [bgReady, setBgReady] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [showMatterport, setShowMatterport] = useState(false);
  const [activeStructure, setActiveStructure] = useState(null);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Georgia, serif", color: "#fff", background: "#080c08", overflowX: "hidden" }}>

      {/* MATTERPORT MODAL */}
      {showMatterport && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.96)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setShowMatterport(false)} style={{ position: "absolute", top: 20, right: 28, background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 28, cursor: "pointer" }}>X</button>
          <iframe src="https://my.matterport.com/show/?m=xZRfSiQPuQ8&brand=0&mls=1&" width="88%" height="82%" frameBorder="0" allow="fullscreen" allowFullScreen style={{ borderRadius: 4 }} />
        </div>
      )}

      {/* STRUCTURE MODAL */}
      {activeStructure && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setActiveStructure(null)}>
          <div style={{ ...G, maxWidth: 600, width: "100%", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
            <img src={activeStructure.img} alt={activeStructure.name} style={{ width: "100%", height: 230, objectFit: "cover" }} />
            <div style={{ padding: "22px 26px 26px" }}>
              <p style={{ color: "rgba(160,190,130,0.65)", fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", margin: "0 0 8px" }}>{activeStructure.tagline}</p>
              <h3 style={{ fontSize: 20, fontWeight: 300, color: "rgba(255,252,245,0.9)", margin: "0 0 12px" }}>{activeStructure.name}</h3>
              <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 13, lineHeight: 1.85, margin: "0 0 20px" }}>{activeStructure.desc}</p>
              <button onClick={() => setActiveStructure(null)} style={{ ...GL, color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", padding: "10px 20px", cursor: "pointer" }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", background: navScrolled ? "rgba(8,10,8,0.94)" : "transparent", backdropFilter: navScrolled ? "blur(20px)" : "none", WebkitBackdropFilter: navScrolled ? "blur(20px)" : "none", borderBottom: navScrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.4s ease" }}>
        <div>
          <p style={{ color: "rgba(255,252,245,0.9)", fontSize: 13, letterSpacing: "0.35em", textTransform: "uppercase", margin: 0, fontWeight: 300 }}>Flow Farm</p>
          <p style={{ color: "rgba(160,190,140,0.4)", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", margin: "3px 0 0" }}>107 Linden Trail   |   Aberdeen, NC</p>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["Residence","#residence"],["The Farm","#farm"],["Features","#features"],["Location","#location"]].map(([label, href]) => (
            <a key={label} href={href} style={{ color: "rgba(255,255,255,0.28)", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none" }}>{label}</a>
          ))}
          <a href="#contact" style={{ ...GL, color: "rgba(180,210,155,0.8)", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", padding: "10px 20px", textDecoration: "none" }}>Inquire</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden", background: "#000" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: bgReady ? 1 : 0, transition: "opacity 1.8s ease" }}>
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
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/46fb99d0e_TSDroneHouseRoof.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 30%, transparent 50%, rgba(0,0,0,0.78) 85%, #080c08 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
          <p style={{ color: "rgba(180,210,150,0.6)", fontSize: 9, letterSpacing: "0.65em", textTransform: "uppercase", marginBottom: 20 }}>A Regenerative Estate   |   Fifteen Acres   |   Six Structures</p>
          <h1 style={{ fontSize: "clamp(48px, 8.5vw, 104px)", fontWeight: 300, color: "#fff", margin: "0 0 24px", lineHeight: 0.95, textShadow: "0 2px 32px rgba(0,0,0,0.6)" }}>
            Agritourism<br /><em>Established.</em><br />Legacy Ready.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "clamp(13px, 1vw, 15px)", maxWidth: 600, lineHeight: 1.9, marginBottom: 40, textShadow: "0 1px 12px rgba(0,0,0,0.7)" }}>
            A rare convergence of land, architecture, and infrastructure - offering energy independence, rare zoning flexibility, and a transferable Pinehurst Country Club Signature Golf Membership with unlimited access to Course No. 7 and No. 9.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
            {[["15 Acres","USDA Zoned"],["3 Miles","to Pinehurst"],["$5.26M","Offered At"],["6","Structures"]].map(([val, label]) => (
              <div key={label} style={{ ...GL, padding: "10px 20px", textAlign: "center" }}>
                <p style={{ fontSize: 16, fontWeight: 300, color: "rgba(255,252,245,0.9)", margin: "0 0 3px" }}>{val}</p>
                <p style={{ fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)", margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => setShowMatterport(true)} style={{ ...G, color: "rgba(180,210,155,0.85)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", padding: "14px 34px", cursor: "pointer" }}>Virtual Tour</button>
            <a href="https://portal.nucleus4d.com/3ec4ff02-9412-4f29-87ba-4926145df7a1/exterior-d302c992-e611-4197-b2df-ff6931a8827a" target="_blank" rel="noopener noreferrer" style={{ ...GL, color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", padding: "14px 34px", textDecoration: "none" }}>Walk the Land</a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.16)", fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", margin: "0 0 8px" }}>Scroll</p>
          <div style={{ width: 1, height: 26, background: "linear-gradient(to bottom, rgba(255,255,255,0.16), transparent)", margin: "0 auto" }} />
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{ padding: "0 32px 60px" }}>
        <div style={{ ...G, maxWidth: 1040, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}>
          {[["8,519","SF Residence"],["6","Structures"],["15","USDA Acres"],["20","Geothermal Wells"],["1,200","Amps Power"],["$5.26M","Offered At"]].map(([val, label], i) => (
            <div key={label} style={{ padding: "26px 14px", textAlign: "center", borderRight: i < 5 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <p style={{ fontSize: 22, fontWeight: 300, color: "rgba(255,252,245,0.85)", margin: "0 0 5px" }}>{val}</p>
              <p style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RESIDENCE */}
      <div id="residence">
        <div style={WRAP}>
          <p style={EYEBROW}>The Residence</p>
          <h2 style={H2}>Designed by Robert Clark AIA.<br />One of His Final Works.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 44, alignItems: "start" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              <img src="https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public" alt="Grand Living Room" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", gridColumn: "1 / -1" }} />
              <img src="https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public" alt="Conservatory" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
              <img src="https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public" alt="Kitchen" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, lineHeight: 1.95, marginBottom: 14 }}>8,519 SF above grade, plus 1,709 SF partially finished walk-out lower level and 2,531 SF fully conditioned crawl space. Grand central living room: 27.5 x 23.8 ft with 17 ft vaulted ceiling.</p>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 14, lineHeight: 1.95, marginBottom: 14 }}>Glass-wrapped conservatory (19.5 x 17.7 ft) with octagonal skylight dome. Reclaimed Civil War-era heart pine floors in artisan patterns throughout - including bedrooms, hallways, and closets.</p>
              <p style={{ color: "rgba(255,255,255,0.16)", fontSize: 14, lineHeight: 1.95, marginBottom: 28 }}>Primary suite: cathedral-ceiling bedroom, sitting room, spa bath, and dressing room (11.7 x 21.7 ft). Basement: media room, sauna, and Brown Safe vault - all fully conditioned.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 22 }}>
                {[["Kitchen","Sub-Zero suite + Wolf 60 inch range, double ovens, 2 KitchenAid dishwashers"],["Smart Home","Control4 audio/video/lighting + Araknis enterprise networking"],["Energy","20 geothermal wells, 61 solar panels, 30kW generator, 1,200 amp service"],["Basement","Media room, sauna, Brown Safe vault - all fully conditioned"]].map(([title, desc]) => (
                  <div key={title} style={{ ...GL, padding: "14px 13px" }}>
                    <div style={{ width: 14, height: 1, background: "rgba(160,190,130,0.4)", marginBottom: 9 }} />
                    <p style={{ fontSize: 10, color: "rgba(255,252,245,0.7)", letterSpacing: "0.06em", margin: "0 0 6px" }}>{title}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowMatterport(true)} style={{ ...G, color: "rgba(180,210,155,0.8)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", padding: "12px 26px", cursor: "pointer" }}>Interior Tour</button>
            </div>
          </div>
        </div>
      </div>

      {/* SIX STRUCTURES */}
      <div id="farm">
        <div style={WRAP}>
          <p style={EYEBROW}>The Compound</p>
          <h2 style={H2}>Six Structures.<br />Every One with Purpose.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {STRUCTURES.map((st) => (
              <div key={st.name} onClick={() => setActiveStructure(st)} style={{ ...G, cursor: "pointer", overflow: "hidden" }}>
                <img src={st.img} alt={st.name} style={{ width: "100%", height: 170, objectFit: "cover" }} />
                <div style={{ padding: "16px 18px 20px" }}>
                  <p style={{ color: "rgba(160,190,130,0.6)", fontSize: 8, letterSpacing: "0.45em", textTransform: "uppercase", margin: "0 0 6px" }}>{st.tagline}</p>
                  <h3 style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,252,245,0.82)", margin: "0 0 8px" }}>{st.name}</h3>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", lineHeight: 1.65, margin: "0 0 12px" }}>{st.desc.substring(0, 88)}...</p>
                  <span style={{ color: "rgba(160,190,130,0.5)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" }}>Details</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div id="features">
        <div style={WRAP}>
          <p style={EYEBROW}>Property Features</p>
          <h2 style={H2}>Nothing Was Left Out.</h2>
          <div style={{ ...G, padding: "36px 32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 40px" }}>
              {FEATURES.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(160,190,130,0.45)", marginTop: 8, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", lineHeight: 1.7, margin: 0 }}>{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LOCATION */}
      <div id="location">
        <div style={{ ...WRAP, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center" }}>
          <div>
            <p style={EYEBROW}>Location</p>
            <h2 style={H2}>Private by Nature.<br />Pinehurst by Proximity.</h2>
            <p style={{ color: "rgba(255,255,255,0.26)", fontSize: 14, lineHeight: 1.9, marginBottom: 14 }}>Flow Farm is approached via private drive from Linden Trail with additional access via Linden Road, Mollie Lane, and Skene Lane - creating immediate separation and discretion.</p>
            <p style={{ color: "rgba(255,255,255,0.16)", fontSize: 14, lineHeight: 1.9, marginBottom: 26 }}>Rare privacy without isolation. Minutes from Pinehurst, private aviation, advanced healthcare, and within easy reach of Raleigh-Durham International Airport.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[["3 Miles","Historic Village of Pinehurst"],["Minutes","Moore County Regional Airport"],["1 Hour","Raleigh-Durham International"],["Nearby","FirstHealth Moore Regional Hospital"]].map(([val, label]) => (
                <div key={label} style={{ ...GL, padding: "13px 12px" }}>
                  <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,252,245,0.7)", margin: "0 0 3px" }}>{val}</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", margin: 0, lineHeight: 1.4 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
          <img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg" alt="Flow Farm grounds" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} />
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ padding: "60px 32px 100px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <p style={EYEBROW}>Private Inquiry</p>
          <h2 style={{ fontSize: "clamp(26px, 3.2vw, 40px)", fontWeight: 300, color: "rgba(255,252,245,0.88)", marginBottom: 14, lineHeight: 1.3 }}>Shown By Appointment Only.</h2>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 14, lineHeight: 1.9, marginBottom: 34 }}>Flow Farm is offered at $5,260,000. Contact listing agent Rachel Hernandez directly for qualified inquiries, private tours, and full disclosure documents.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:rachelhernandezrealtor@gmail.com" style={{ ...G, color: "rgba(180,210,155,0.85)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", padding: "14px 32px", textDecoration: "none" }}>Email Rachel</a>
            <button onClick={() => setShowMatterport(true)} style={{ ...GL, color: "rgba(255,255,255,0.32)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", padding: "14px 32px", cursor: "pointer" }}>Virtual Tour</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ ...G, borderRadius: 0, borderLeft: "none", borderRight: "none", borderBottom: "none", padding: "22px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ color: "rgba(255,255,255,0.16)", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", margin: 0 }}>Flow Farm   |   107 Linden Trail   |   Aberdeen, NC 28315</p>
          <p style={{ color: "rgba(255,255,255,0.08)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", margin: "4px 0 0" }}>Offered at $5,260,000   |   Rachel Hernandez, Listing Agent</p>
        </div>
        <p style={{ color: "rgba(255,255,255,0.08)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", margin: 0 }}>flowfarmforest.com</p>
      </div>

    </div>
  );
}
