import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "STORY", href: "#story" },
  { label: "RESIDENCE", href: "#residence" },
  { label: "ESTATE", href: "#estate" },
  { label: "GALLERY", href: "#gallery" },
  { label: "SPECIFICATIONS", href: "#specifications" },
  { label: "CONTACT", href: "#contact" },
];

const GALLERY_PHOTOS = [
  { url: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/ada10c6f-d704-40ce-10e5-58d25e101200/public", label: "Foyer" },
  { url: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public", label: "Grand Living Room" },
  { url: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6c90dba3-97de-4654-ccba-a70677a7a300/public", label: "Living Room" },
  { url: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/3ea36a81-abc3-48b7-bf95-5dbddd664900/public", label: "Living Room" },
  { url: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public", label: "Chef Kitchen" },
  { url: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/00b098c8-fea7-4300-bf34-6c2f557dd200/public", label: "Kitchen" },
  { url: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/c8ebe094-9daf-4314-12b3-88a9c3503d00/public", label: "Kitchen" },
  { url: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public", label: "Conservatory" },
  { url: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1abfcd89-c693-4c59-0c1f-0aa35ab1e100/public", label: "Conservatory" },
  { url: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6482459c-9f90-4821-b6e3-043f45097500/public", label: "Conservatory" },
  { url: "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg", label: "Main Residence" },
  { url: "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg", label: "Estate Grounds" },
  { url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/46fb99d0e_TSDroneHouseRoof.jpg", label: "Aerial" },
  { url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg", label: "High Tunnel Greenhouse" },
  { url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg", label: "Farm Workshop" },
  { url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg", label: "Cabana House" },
];

const STRUCTURES = [
  { number: "01", name: "Main Residence", detail: "8,519 SF", description: "Six bedrooms, seven bathrooms. Reclaimed Civil War-era heart pine floors in custom artisan patterns. Glass conservatory with octagonal skylight dome. Gourmet kitchen with Sub-Zero and Wolf 60\" range. Geothermal climate, 30kW generator, 14.3kW solar. Designed by Robert E. Clark, AIA.", image: "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg" },
  { number: "02", name: "Cabana House", detail: "Private Guest Retreat", description: "Fully independent guest quarters with private entrance, full kitchen, one bedroom, and one bathroom. Ideal for extended family, staff, or rental income.", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg" },
  { number: "03", name: "High Tunnel Greenhouse", detail: "96 x 36 ft", description: "Year-round specialty cultivation. Custom geothermal climate battery air-to-soil system. Currently producing pineapples, avocados, and citrus. Built by Four Season Tools.", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg" },
  { number: "04", name: "Farm Workshop", detail: "30 x 40 ft", description: "Fully operational with plumbing and electrical. Walk-in cooler, 1,400 ft double deer fencing enclosing 3 acres. Built for serious production.", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg" },
  { number: "05", name: "Compost Pavilion", detail: "O2Compost System", description: "Covered aerated composting infrastructure. Regenerative waste-to-resource system that closes the agricultural loop on-site.", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/983e028f7_CompostingandBioChar.jpg" },
  { number: "06", name: "Biochar Kiln", detail: "Covered Structure", description: "Industrial biochar production under a covered structure with I-beam and chain hoist. A rare carbon-sequestration asset that enhances soil fertility at scale.", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/983e028f7_CompostingandBioChar.jpg" },
];

const SPECS = [
  { category: "Land", items: ["15 acres total", "3-acre USDA veganic farm", "7 buildable acres", "1,400 ft double deer fence", "Multiple access points: Linden Trail, Linden Road, Mollie Lane, Skene Lane"] },
  { category: "Residence", items: ["8,519 SF above grade", "1,709 SF partially finished walk-out lower level", "2,531 SF conditioned crawl space", "6 bedrooms / 7 bathrooms", "Grand living room: 27.5 x 23.8 ft, 17 ft vaulted ceiling", "Glass conservatory: 19.5 x 17.7 ft with octagonal skylight dome", "Primary WIC: 11.7 x 21.7 ft"] },
  { category: "Energy", items: ["1,200 amp total electrical service", "14.3 kW solar array (61 Samsung panels)", "Sunny Island 10kW solar battery backup", "30 kW Kohler generator", "2x 1,000 gallon buried propane tanks", "Geothermal loop: 20 deep wells each 300 ft deep", "Five interconnected HVAC zones (Water Furnace)", "Two Water Furnace superheater geothermal hot water systems", "Energy Recovery Ventilator system"] },
  { category: "Water", items: ["Private water well up to 50 gpm", "Whole-house commercial water filtration (Clear Water Solutions)", "Private septic 2x 1,500 gallon with pump"] },
  { category: "Kitchen", items: ["Sub-Zero refrigerator, freezer, fridge/freezer combo, wine cooler", "Wolf 60\" dual fuel stove: 6 burners, griddle, grill, warming drawer", "2 KitchenAid dishwashers", "Full scullery"] },
  { category: "Technology", items: ["Whole-house Control4 smart home (audio, video, lighting)", "Whole-campus Wi-Fi (Araknis enterprise networking)", "Whole-house alarm system", "Whole-house central vacuum (dual VacuMaid S2400)", "Whole-house fire sprinkler system", "Lennox air purification on each zone"] },
  { category: "Golf Membership", items: ["Pinehurst Country Club Signature Golf Membership included", "Unlimited access to Course No. 7 and No. 9", "Transferable with property sale"] },
];

const PROXIMITY = [
  { label: "Pinehurst Village", detail: "3 miles", icon: "P" },
  { label: "Moore County Regional Airport", detail: "Private aviation", icon: "A" },
  { label: "Raleigh-Durham International", detail: "1 hour", icon: "R" },
  { label: "FirstHealth Moore Regional", detail: "Full hospital services", icon: "H" },
  { label: "Historic Village of Pinehurst", detail: "UNESCO nominated", icon: "V" },
  { label: "Pinehurst Country Club", detail: "Membership included", icon: "G" },
];

export default function FlowFarmLanding() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleForm = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  const g = (desktop, mobile) => isMobile ? mobile : desktop;

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: "#0a0a08", color: "#f0ebe0", minHeight: "100vh", overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .ff-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .ff-sans { font-family: 'Montserrat', Arial, sans-serif; }
        .ff-nav-link { letter-spacing: 0.2em; font-size: 11px; font-family: 'Montserrat', Arial, sans-serif; font-weight: 400; color: rgba(240,235,224,0.75); cursor: pointer; transition: color 0.3s; text-decoration: none; background: none; border: none; }
        .ff-nav-link:hover { color: #c9a84c; }
        .ff-btn-gold { background: transparent; border: 1px solid #c9a84c; color: #c9a84c; letter-spacing: 0.2em; font-family: 'Montserrat', Arial, sans-serif; font-size: 11px; font-weight: 500; padding: 14px 36px; cursor: pointer; transition: all 0.3s; text-transform: uppercase; }
        .ff-btn-gold:hover { background: #c9a84c; color: #0a0a08; }
        .ff-btn-ghost { background: transparent; border: 1px solid rgba(240,235,224,0.35); color: rgba(240,235,224,0.8); letter-spacing: 0.2em; font-family: 'Montserrat', Arial, sans-serif; font-size: 11px; font-weight: 400; padding: 12px 32px; cursor: pointer; transition: all 0.3s; }
        .ff-btn-ghost:hover { border-color: #c9a84c; color: #c9a84c; }
        input::placeholder, textarea::placeholder { color: rgba(240,235,224,0.3); }
        input:focus, textarea:focus { border-color: rgba(201,168,76,0.5) !important; outline: none; }
        .prox-card { border: 1px solid rgba(201,168,76,0.15); padding: 20px; transition: border-color 0.3s, background 0.3s; cursor: default; }
        .prox-card:hover { border-color: rgba(201,168,76,0.5); background: rgba(201,168,76,0.04); }
        .struct-card { position: relative; overflow: hidden; aspect-ratio: 3/4; }
        .struct-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .struct-card:hover img { transform: scale(1.04); }
        .gal-item { break-inside: avoid; margin-bottom: 4px; overflow: hidden; cursor: pointer; }
        .gal-item img { width: 100%; display: block; transition: transform 0.5s ease; }
        .gal-item:hover img { transform: scale(1.04); }
        .map-wrapper { position: relative; width: 100%; padding-bottom: 56%; overflow: hidden; background: #111109; }
        .map-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: g("20px 48px", "16px 24px"),
        background: navScrolled ? "rgba(10,10,8,0.96)" : "transparent",
        backdropFilter: navScrolled ? "blur(12px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div className="ff-serif" style={{ fontSize: g(22, 18), letterSpacing: "0.15em", fontWeight: 300 }}>FLOW FARM</div>
        {!isMobile && (
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <button key={l.label} className="ff-nav-link" onClick={() => scrollTo(l.href)}>{l.label}</button>
            ))}
            <button className="ff-btn-gold" style={{ padding: "10px 22px", fontSize: 10 }} onClick={() => scrollTo("#contact")}>PRIVATE INQUIRY</button>
          </div>
        )}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}>
            <span style={{ width: 24, height: 1, background: "#f0ebe0", display: "block" }} />
            <span style={{ width: 24, height: 1, background: "#f0ebe0", display: "block" }} />
            <span style={{ width: 16, height: 1, background: "#f0ebe0", display: "block" }} />
          </button>
        )}
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(10,10,8,0.98)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "#f0ebe0", fontSize: 28, cursor: "pointer", lineHeight: 1 }}>x</button>
          {NAV_LINKS.map(l => (
            <button key={l.label} className="ff-nav-link" style={{ fontSize: 14 }} onClick={() => scrollTo(l.href)}>{l.label}</button>
          ))}
          <button className="ff-btn-gold" onClick={() => scrollTo("#contact")}>PRIVATE INQUIRY</button>
        </div>
      )}

      {/* HERO */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <iframe
          src="https://player.vimeo.com/video/1171394707?background=1&autoplay=1&loop=1&muted=1&quality=1080p"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", pointerEvents: "none" }}
          allow="autoplay; fullscreen"
          title="Flow Farm hero"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,8,0.25) 0%, rgba(10,10,8,0.4) 50%, rgba(10,10,8,0.88) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: 800, margin: "0 auto" }}>
          <p className="ff-sans" style={{ letterSpacing: "0.3em", fontSize: g(11, 9), color: "#c9a84c", marginBottom: 24, fontWeight: 400 }}>107 LINDEN TRAIL -- ABERDEEN, NC</p>
          <h1 className="ff-serif" style={{ fontSize: g(110, 72), fontWeight: 300, lineHeight: 0.88, letterSpacing: "0.02em", color: "#f0ebe0", marginBottom: 32 }}>Flow<br />Farm</h1>
          <p className="ff-sans" style={{ letterSpacing: "0.25em", fontSize: g(12, 9), color: "rgba(240,235,224,0.65)", marginBottom: 40, fontWeight: 300 }}>AGRITOURISM ESTABLISHED. LEGACY READY.</p>
          <p className="ff-serif" style={{ fontSize: g(30, 24), color: "#c9a84c", fontWeight: 300, marginBottom: 48 }}>$5,250,000</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="ff-btn-gold" onClick={() => scrollTo("#story")}>DISCOVER THE ESTATE</button>
            <button className="ff-btn-ghost" onClick={() => scrollTo("#contact")}>PRIVATE INQUIRY</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 2, textAlign: "center" }}>
          <div style={{ width: 1, height: 40, background: "rgba(201,168,76,0.5)", margin: "0 auto 8px" }} />
          <p className="ff-sans" style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(240,235,224,0.35)" }}>SCROLL</p>
        </div>
      </div>

      {/* STAT BAR */}
      <div style={{ background: "#111109", borderTop: "1px solid rgba(201,168,76,0.2)", borderBottom: "1px solid rgba(201,168,76,0.2)", padding: g("36px 48px", "28px 24px") }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: g(24, 20) }}>
          {[
            { value: "15", label: "ACRES" },
            { value: "8,519", label: "SQ FT" },
            { value: "6", label: "STRUCTURES" },
            { value: "6 / 7", label: "BED / BATH" },
            { value: "1,200", label: "AMPS" },
            { value: "3 MI", label: "TO PINEHURST" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center", minWidth: g(80, 60) }}>
              <div className="ff-serif" style={{ fontSize: g(34, 26), fontWeight: 300, color: "#c9a84c" }}>{s.value}</div>
              <div className="ff-sans" style={{ fontSize: 9, letterSpacing: "0.25em", color: "rgba(240,235,224,0.45)", marginTop: 5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STORY */}
      <section id="story" style={{ padding: g("120px 48px", "80px 24px") }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: g(80, 48), alignItems: "center" }}>
            <div>
              <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 20 }}>THE STORY</p>
              <h2 className="ff-serif" style={{ fontSize: g(52, 38), fontWeight: 300, lineHeight: 1.1, marginBottom: 28 }}>A Foundation<br />for What<br />Comes Next</h2>
              <div style={{ width: 48, height: 1, background: "#c9a84c", marginBottom: 28 }} />
              <p style={{ fontSize: g(17, 15), lineHeight: 1.85, color: "rgba(240,235,224,0.72)", fontWeight: 300, marginBottom: 22 }}>
                Flow Farm is not a property. It is a platform. A rare convergence of land, architecture, and infrastructure assembled with singular intentionality -- designed to support energy independence, agricultural productivity, and a life lived at the highest level.
              </p>
              <p style={{ fontSize: g(17, 15), lineHeight: 1.85, color: "rgba(240,235,224,0.72)", fontWeight: 300, marginBottom: 40 }}>
                Designed by Robert E. Clark, AIA -- one of the Sandhills' most celebrated architects -- the all-brick main residence is one of his final commissions. Every system, every surface, every structure reflects a commitment to permanence.
              </p>
              <button className="ff-btn-gold" onClick={() => scrollTo("#residence")}>EXPLORE THE RESIDENCE</button>
            </div>
            <div style={{ position: "relative" }}>
              <img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg" alt="Flow Farm Estate" style={{ width: "100%", aspectRatio: g("3/4", "4/3"), objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", bottom: g(-24, 0), right: g(-24, 0), background: "#111109", border: "1px solid rgba(201,168,76,0.3)", padding: "20px 24px" }}>
                <p className="ff-sans" style={{ fontSize: 9, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 6 }}>DESIGNED BY</p>
                <p className="ff-serif" style={{ fontSize: 17, fontWeight: 300 }}>Robert E. Clark, AIA</p>
                <p className="ff-sans" style={{ fontSize: 9, letterSpacing: "0.1em", color: "rgba(240,235,224,0.45)", marginTop: 3 }}>PINEHURST, NORTH CAROLINA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPPORTUNITY */}
      <section style={{ background: "#0d0d0b", padding: g("100px 48px", "80px 24px") }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 20 }}>THE OPPORTUNITY</p>
          <h2 className="ff-serif" style={{ fontSize: g(46, 32), fontWeight: 300, lineHeight: 1.2, marginBottom: 36 }}>"A living estate rooted in sustainability,<br />elevated by state-of-the-art infrastructure<br />and refined luxury."</h2>
          <div style={{ width: 48, height: 1, background: "#c9a84c", margin: "0 auto 48px" }} />
          <div style={{ display: "grid", gridTemplateColumns: g("repeat(3,1fr)", "1fr 1fr"), gap: g(40, 24), textAlign: "left" }}>
            {[
              { title: "Energy Independence", body: "1,200 amps, 14.3kW solar, 30kW generator, geothermal HVAC across 20 deep wells. Operate entirely off-grid." },
              { title: "Agricultural Income", body: "USDA-registered 3-acre veganic farm, high-tunnel greenhouse, full workshop. Transferable as a going concern." },
              { title: "Agritourism Potential", body: "USDA zoning, flexible access, 7 buildable acres. Event venue, retreat center, or branded destination." },
              { title: "Golf Membership", body: "Pinehurst Country Club Signature Membership included -- unlimited access to Course No. 7 and No. 9." },
              { title: "Tax Positioning", body: "Agricultural land classification. Farm registration USDA FSA #5893 provides favorable tax treatment." },
              { title: "Privacy by Design", body: "Multiple private access points. Immediate separation and discretion from the moment of entry." },
            ].map(item => (
              <div key={item.title} style={{ borderTop: "1px solid rgba(201,168,76,0.2)", paddingTop: 22 }}>
                <h3 className="ff-serif" style={{ fontSize: g(20, 17), fontWeight: 400, marginBottom: 10 }}>{item.title}</h3>
                <p className="ff-sans" style={{ fontSize: 12, lineHeight: 1.8, color: "rgba(240,235,224,0.58)", fontWeight: 300 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESIDENCE */}
      <section id="residence" style={{ padding: g("120px 48px", "80px 24px") }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>THE MAIN RESIDENCE</p>
            <h2 className="ff-serif" style={{ fontSize: g(54, 36), fontWeight: 300, lineHeight: 1.1 }}>Where Architecture<br />Meets Intention</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 2, marginBottom: 64 }}>
            <img src="https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public" alt="Grand Living Room" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} />
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 2 }}>
              <img src="https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public" alt="Conservatory" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <img src="https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public" alt="Kitchen" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: g("repeat(3,1fr)", "1fr 1fr"), gap: g(48, 28) }}>
            {[
              { title: "Grand Living Room", detail: "27.5 x 23.8 ft | 17 ft Vaulted Ceiling", body: "The heart of the home. Reclaimed Civil War-era heart pine floors in custom artisan patterns. Proportions designed for entertaining at scale." },
              { title: "Glass Conservatory", detail: "19.5 x 17.7 ft | Octagonal Skylight Dome", body: "Wrapped entirely in glass, anchored by a custom octagonal dome skylight. A living room, dining space, or morning sanctuary." },
              { title: "Chef Kitchen", detail: "Sub-Zero + Wolf 60\" Range | Scullery", body: "Sub-Zero column refrigeration, Wolf 60\" dual fuel range, six burners, griddle, grill, warming drawer. Two dishwashers. Full scullery." },
              { title: "Heart Pine Floors", detail: "Civil War-Era Reclaimed", body: "Custom artisan patterns throughout every bedroom, hallway, and closet. Sourced, milled, and installed as a singular design statement." },
              { title: "Primary Suite", detail: "Walk-In Closet: 11.7 x 21.7 ft", body: "A private retreat within the estate. Generous proportions, natural light, and a walk-in closet designed to the scale of a room." },
              { title: "Smart Infrastructure", detail: "Control4 | Araknis | Lennox", body: "Whole-house Control4 audio, video, and lighting. Enterprise-grade Araknis campus Wi-Fi. Lennox air purification on every zone." },
            ].map(item => (
              <div key={item.title} style={{ borderTop: "1px solid rgba(201,168,76,0.2)", paddingTop: 22 }}>
                <h3 className="ff-serif" style={{ fontSize: g(20, 17), fontWeight: 400, marginBottom: 6 }}>{item.title}</h3>
                <p className="ff-sans" style={{ fontSize: 9, letterSpacing: "0.18em", color: "#c9a84c", marginBottom: 12 }}>{item.detail}</p>
                <p className="ff-sans" style={{ fontSize: 12, lineHeight: 1.8, color: "rgba(240,235,224,0.58)", fontWeight: 300 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIRTUAL TOURS */}
      <section style={{ background: "#0d0d0b", padding: g("100px 48px", "80px 24px") }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>IMMERSIVE TOUR</p>
            <h2 className="ff-serif" style={{ fontSize: g(44, 32), fontWeight: 300 }}>Walk the Estate</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 24 }}>
            <div>
              <div className="map-wrapper">
                <iframe src="https://my.matterport.com/show/?m=xZRfSiQPuQ8&brand=0" allowFullScreen title="Interior 3D Tour" />
              </div>
              <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.2em", color: "rgba(240,235,224,0.38)", marginTop: 12, textAlign: "center" }}>INTERIOR 3D TOUR</p>
            </div>
            <div>
              <div className="map-wrapper">
                <iframe src="https://portal.nucleus4d.com/3ec4ff02-9412-4f29-87ba-4926145df7a1/exterior-d302c992-e611-4197-b2df-ff6931a8827a" allowFullScreen title="Exterior 3D Tour" />
              </div>
              <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.2em", color: "rgba(240,235,224,0.38)", marginTop: 12, textAlign: "center" }}>EXTERIOR 3D TOUR</p>
            </div>
          </div>
        </div>
      </section>

      {/* ESTATE STRUCTURES */}
      <section id="estate" style={{ padding: g("120px 48px", "80px 24px") }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>THE ESTATE</p>
            <h2 className="ff-serif" style={{ fontSize: g(52, 36), fontWeight: 300, lineHeight: 1.1 }}>Six Structures.<br />One Vision.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: g("repeat(3,1fr)", "1fr 1fr"), gap: 2 }}>
            {STRUCTURES.map(s => (
              <div key={s.number} className="struct-card">
                <img src={s.image} alt={s.name} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,8,0.93) 0%, rgba(10,10,8,0.25) 55%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: g("22px 20px", "14px 12px") }}>
                  <p className="ff-sans" style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(201,168,76,0.65)", marginBottom: 4 }}>{s.number}</p>
                  <h3 className="ff-serif" style={{ fontSize: g(22, 16), fontWeight: 400, marginBottom: 3 }}>{s.name}</h3>
                  <p className="ff-sans" style={{ fontSize: 9, letterSpacing: "0.15em", color: "#c9a84c", marginBottom: g(10, 0) }}>{s.detail}</p>
                  {!isMobile && <p className="ff-sans" style={{ fontSize: 11, lineHeight: 1.7, color: "rgba(240,235,224,0.58)", fontWeight: 300 }}>{s.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ background: "#0d0d0b", padding: g("100px 48px", "80px 24px") }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>THE GALLERY</p>
            <h2 className="ff-serif" style={{ fontSize: g(48, 32), fontWeight: 300 }}>Every Detail, Considered</h2>
          </div>
          <div style={{ columns: g("4 200px", "2 140px"), gap: 4 }}>
            {GALLERY_PHOTOS.map((photo, i) => (
              <div key={i} className="gal-item" onClick={() => setActiveGallery(i)}>
                <img src={photo.url} alt={photo.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {activeGallery !== null && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(10,10,8,0.97)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setActiveGallery(null)}>
          <button onClick={() => setActiveGallery(null)} style={{ position: "absolute", top: 20, right: 28, background: "none", border: "none", color: "#f0ebe0", fontSize: 30, cursor: "pointer", lineHeight: 1 }}>x</button>
          <button onClick={(e) => { e.stopPropagation(); setActiveGallery(a => (a - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length); }} style={{ position: "absolute", left: g(24, 8), background: "none", border: "none", color: "#c9a84c", fontSize: g(36, 28), cursor: "pointer" }}>{"<"}</button>
          <img src={GALLERY_PHOTOS[activeGallery].url} alt={GALLERY_PHOTOS[activeGallery].label} style={{ maxHeight: "85vh", maxWidth: "90vw", objectFit: "contain" }} onClick={e => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); setActiveGallery(a => (a + 1) % GALLERY_PHOTOS.length); }} style={{ position: "absolute", right: g(24, 8), background: "none", border: "none", color: "#c9a84c", fontSize: g(36, 28), cursor: "pointer" }}>{">"}</button>
          <p className="ff-sans" style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", fontSize: 10, letterSpacing: "0.2em", color: "rgba(240,235,224,0.45)", whiteSpace: "nowrap" }}>{GALLERY_PHOTOS[activeGallery].label}</p>
        </div>
      )}

      {/* VIDEO */}
      <section style={{ padding: g("100px 48px", "80px 24px") }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>THE FILM</p>
            <h2 className="ff-serif" style={{ fontSize: g(44, 32), fontWeight: 300 }}>See It in Motion</h2>
          </div>
          <div style={{ position: "relative", paddingBottom: "56.25%", background: "#111109" }}>
            <iframe src="https://www.youtube.com/embed/ySZBMvFm4mQ?rel=0&color=white" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }} allowFullScreen title="Flow Farm Video" />
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section id="specifications" style={{ background: "#0d0d0b", padding: g("100px 48px", "80px 24px") }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>SPECIFICATIONS</p>
            <h2 className="ff-serif" style={{ fontSize: g(48, 32), fontWeight: 300 }}>Built Without Compromise</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: g("repeat(3,1fr)", "1fr 1fr"), gap: g(48, 28) }}>
            {SPECS.map(spec => (
              <div key={spec.category} style={{ borderTop: "1px solid rgba(201,168,76,0.22)", paddingTop: 22 }}>
                <h3 className="ff-sans" style={{ fontSize: 9, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 18 }}>{spec.category.toUpperCase()}</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                  {spec.items.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#c9a84c", fontSize: 8, marginTop: 5, flexShrink: 0 }}>--</span>
                      <span className="ff-sans" style={{ fontSize: 12, lineHeight: 1.6, color: "rgba(240,235,224,0.62)", fontWeight: 300 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION + MAP */}
      <section style={{ padding: g("120px 48px", "80px 24px") }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>THE LOCATION</p>
            <h2 className="ff-serif" style={{ fontSize: g(52, 36), fontWeight: 300, lineHeight: 1.1 }}>Private by Nature.<br />Pinehurst by Proximity.</h2>
          </div>

          {/* MAP - full responsive embed */}
          <div style={{ width: "100%", position: "relative", paddingBottom: g("45%", "70%"), overflow: "hidden", marginBottom: 48, background: "#111109", border: "1px solid rgba(201,168,76,0.15)" }}>
            <iframe
              title="Flow Farm Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.4!2d-79.4296!3d35.1321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ab2e6d6d6d6d6d%3A0x0!2s107+Linden+Trail%2C+Aberdeen%2C+NC+28315!5e1!3m2!1sen!2sus!4v1713000000000!5m2!1sen!2sus"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none", filter: "invert(90%) hue-rotate(180deg) saturate(0.6) brightness(0.85)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* ACCESS NOTE */}
          <p className="ff-sans" style={{ fontSize: g(13, 12), lineHeight: 1.9, color: "rgba(240,235,224,0.6)", fontWeight: 300, textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }}>
            Multiple points of access including primary entrance from Linden Trail with additional access via Linden Road, Mollie Lane, and Skene Lane. The private drive creates immediate separation and discretion.
          </p>

          {/* PROXIMITY CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: g("repeat(3,1fr)", "1fr 1fr"), gap: g(16, 12) }}>
            {PROXIMITY.map(item => (
              <div key={item.label} className="prox-card">
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span className="ff-serif" style={{ fontSize: 14, color: "#c9a84c", fontWeight: 400 }}>{item.icon}</span>
                  </div>
                  <span className="ff-sans" style={{ fontSize: g(12, 11), color: "rgba(240,235,224,0.75)", fontWeight: 300, lineHeight: 1.4 }}>{item.label}</span>
                </div>
                <p className="ff-sans" style={{ fontSize: 10, color: "#c9a84c", letterSpacing: "0.15em", paddingLeft: 46 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "#0d0d0b", padding: g("120px 48px", "80px 24px") }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>PRIVATE INQUIRY</p>
          <h2 className="ff-serif" style={{ fontSize: g(52, 36), fontWeight: 300, lineHeight: 1.1, marginBottom: 16 }}>Begin the Conversation</h2>
          <p className="ff-sans" style={{ fontSize: 12, color: "rgba(240,235,224,0.45)", marginBottom: 48, lineHeight: 1.8, fontWeight: 300 }}>
            Flow Farm is offered exclusively. Showings are by private appointment only. We welcome qualified inquiries from principals and their representatives.
          </p>
          {formSent ? (
            <div style={{ border: "1px solid rgba(201,168,76,0.3)", padding: "48px 32px" }}>
              <p className="ff-serif" style={{ fontSize: 28, fontWeight: 300, marginBottom: 10 }}>Thank you.</p>
              <p className="ff-sans" style={{ fontSize: 12, color: "rgba(240,235,224,0.55)", fontWeight: 300 }}>We will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleForm} style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
              <div style={{ display: "grid", gridTemplateColumns: g("1fr 1fr", "1fr"), gap: 14 }}>
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required style={{ background: "transparent", border: "1px solid rgba(240,235,224,0.18)", padding: "14px 16px", color: "#f0ebe0", fontSize: 12, fontFamily: "Montserrat, Arial, sans-serif", width: "100%" }} />
                <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required style={{ background: "transparent", border: "1px solid rgba(240,235,224,0.18)", padding: "14px 16px", color: "#f0ebe0", fontSize: 12, fontFamily: "Montserrat, Arial, sans-serif", width: "100%" }} />
              </div>
              <input type="tel" placeholder="Phone Number (optional)" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} style={{ background: "transparent", border: "1px solid rgba(240,235,224,0.18)", padding: "14px 16px", color: "#f0ebe0", fontSize: 12, fontFamily: "Montserrat, Arial, sans-serif", width: "100%" }} />
              <textarea placeholder="Message (optional)" value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} rows={5} style={{ background: "transparent", border: "1px solid rgba(240,235,224,0.18)", padding: "14px 16px", color: "#f0ebe0", fontSize: 12, fontFamily: "Montserrat, Arial, sans-serif", resize: "none", width: "100%" }} />
              <button type="submit" className="ff-btn-gold" style={{ width: "100%", padding: "18px", fontSize: 11, marginTop: 6 }}>SUBMIT INQUIRY</button>
            </form>
          )}
          <div style={{ marginTop: 48, paddingTop: 48, borderTop: "1px solid rgba(240,235,224,0.08)" }}>
            <p className="ff-sans" style={{ fontSize: 10, color: "rgba(240,235,224,0.35)", letterSpacing: "0.15em", marginBottom: 8 }}>LISTING AGENT</p>
            <p className="ff-serif" style={{ fontSize: 22, fontWeight: 300, marginBottom: 4 }}>Rachel Hernandez</p>
            <p className="ff-sans" style={{ fontSize: 11, color: "#c9a84c", letterSpacing: "0.1em" }}>rachelhernandezrealtor@gmail.com</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a0a08", borderTop: "1px solid rgba(201,168,76,0.12)", padding: g("36px 48px", "28px 24px") }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div className="ff-serif" style={{ fontSize: 18, letterSpacing: "0.15em", fontWeight: 300 }}>FLOW FARM</div>
          <p className="ff-sans" style={{ fontSize: 10, color: "rgba(240,235,224,0.28)", letterSpacing: "0.12em" }}>107 LINDEN TRAIL -- ABERDEEN, NC 28315</p>
          <p className="ff-sans" style={{ fontSize: 10, color: "rgba(240,235,224,0.28)", letterSpacing: "0.1em" }}>OFFERED AT $5,250,000</p>
        </div>
      </footer>

    </div>
  );
}
