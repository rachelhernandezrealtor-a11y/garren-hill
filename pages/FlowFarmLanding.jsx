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
  { url: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public", label: "Chef's Kitchen" },
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
  {
    number: "01",
    name: "Main Residence",
    detail: "8,519 SF",
    description: "Six bedrooms, seven bathrooms. Reclaimed Civil War-era heart pine floors in custom artisan patterns. Glass conservatory with octagonal skylight dome. Gourmet kitchen with Sub-Zero and Wolf 60\" range. Geothermal climate, 30kW generator, 14.3kW solar. Designed by Robert E. Clark, AIA.",
    image: "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg",
  },
  {
    number: "02",
    name: "Cabana House",
    detail: "Private Guest Retreat",
    description: "Fully independent guest quarters with private entrance, full kitchen, one bedroom, and one bathroom. Ideal for extended family, staff, or rental income.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg",
  },
  {
    number: "03",
    name: "High Tunnel Greenhouse",
    detail: "96 x 36 ft",
    description: "Year-round specialty cultivation. Custom geothermal climate battery air-to-soil system. Currently producing pineapples, avocados, and citrus. Built by Four Season Tools.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg",
  },
  {
    number: "04",
    name: "Farm Workshop",
    detail: "30 x 40 ft",
    description: "Fully operational with plumbing and electrical. Walk-in cooler, 1,400 ft double deer fencing enclosing 3 acres. Built for serious production.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg",
  },
  {
    number: "05",
    name: "Compost Pavilion",
    detail: "O2Compost System",
    description: "Covered aerated composting infrastructure. Regenerative waste-to-resource system that closes the agricultural loop on-site.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/983e028f7_CompostingandBioChar.jpg",
  },
  {
    number: "06",
    name: "Biochar Kiln",
    detail: "Covered Structure",
    description: "Industrial biochar production under a covered structure with I-beam and chain hoist. A rare carbon-sequestration asset that enhances soil fertility at scale.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/983e028f7_CompostingandBioChar.jpg",
  },
];

const SPECS = [
  { category: "Land", items: ["15 acres total", "3-acre USDA veganic farm", "7 buildable acres", "1,400 ft double deer fence", "Multiple access points: Linden Trail, Linden Road, Mollie Lane, Skene Lane"] },
  { category: "Residence", items: ["8,519 SF above grade", "1,709 SF partially finished walk-out lower level", "2,531 SF conditioned crawl space", "6 bedrooms / 7 bathrooms", "Grand living room: 27.5 x 23.8 ft, 17 ft vaulted ceiling", "Glass conservatory: 19.5 x 17.7 ft with octagonal skylight dome", "Primary WIC: 11.7 x 21.7 ft"] },
  { category: "Energy", items: ["1,200 amp total electrical service", "14.3 kW solar array (61 Samsung panels)", "Sunny Island 10kW solar battery backup", "30 kW Kohler generator", "2x 1,000 gallon buried propane tanks", "Geothermal loop: 20 deep wells, each 300 ft deep", "Five interconnected HVAC zones (Water Furnace)", "Two Water Furnace superheater geothermal hot water systems", "Energy Recovery Ventilator system"] },
  { category: "Water", items: ["Private water well up to 50 gpm", "Whole-house commercial water filtration (Clear Water Solutions)", "Private septic 2x 1,500 gallon with pump"] },
  { category: "Kitchen", items: ["Sub-Zero refrigerator, freezer, fridge/freezer combo, wine cooler", "Wolf 60\" dual fuel stove: 6 burners, griddle, grill, warming drawer", "2 KitchenAid dishwashers", "Full scullery"] },
  { category: "Technology", items: ["Whole-house Control4 smart home (audio, video, lighting)", "Whole-campus Wi-Fi (Araknis enterprise networking)", "Whole-house alarm system", "Whole-house central vacuum (dual VacuMaid S2400)", "Whole-house fire sprinkler system", "Lennox air purification on each zone"] },
  { category: "Golf Membership", items: ["Pinehurst Country Club Signature Golf Membership included", "Unlimited access to Course No. 7 and No. 9", "Transferable with property sale"] },
];

export default function FlowFarmLanding() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
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

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#0a0a08", color: "#f0ebe0", minHeight: "100vh", overflowX: "hidden" }}>

      {/* GLOBAL STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a08; }
        .ff-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .ff-sans { font-family: 'Montserrat', Arial, sans-serif; }
        .ff-nav-link { letter-spacing: 0.2em; font-size: 11px; font-family: 'Montserrat', Arial, sans-serif; font-weight: 400; color: rgba(240,235,224,0.75); cursor: pointer; transition: color 0.3s; text-decoration: none; background: none; border: none; }
        .ff-nav-link:hover { color: #c9a84c; }
        .ff-btn-primary { background: transparent; border: 1px solid #c9a84c; color: #c9a84c; letter-spacing: 0.2em; font-family: 'Montserrat', Arial, sans-serif; font-size: 11px; font-weight: 500; padding: 14px 36px; cursor: pointer; transition: all 0.3s; text-transform: uppercase; }
        .ff-btn-primary:hover { background: #c9a84c; color: #0a0a08; }
        .ff-btn-ghost { background: transparent; border: 1px solid rgba(240,235,224,0.4); color: rgba(240,235,224,0.8); letter-spacing: 0.2em; font-family: 'Montserrat', Arial, sans-serif; font-size: 11px; font-weight: 400; padding: 12px 32px; cursor: pointer; transition: all 0.3s; }
        .ff-btn-ghost:hover { border-color: #c9a84c; color: #c9a84c; }
        .ff-divider { width: 60px; height: 1px; background: #c9a84c; margin: 20px auto; }
        .ff-section { padding: 120px 40px; }
        .ff-gallery-item:hover img { transform: scale(1.05); }
        .ff-gallery-item img { transition: transform 0.6s ease; }
        .ff-structure-card:hover { border-color: #c9a84c !important; }
        .ff-structure-card:hover .ff-structure-num { color: #c9a84c !important; }
        @media (max-width: 768px) {
          .ff-section { padding: 80px 24px; }
          .ff-hero-title { font-size: 72px !important; }
          .ff-desktop-nav { display: none !important; }
          .ff-mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .ff-mobile-menu-btn { display: none !important; }
          .ff-mobile-nav { display: none !important; }
        }
      `}</style>

      {/* NAVIGATION */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 48px",
        background: navScrolled ? "rgba(10,10,8,0.95)" : "transparent",
        backdropFilter: navScrolled ? "blur(12px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div className="ff-serif" style={{ fontSize: 22, letterSpacing: "0.15em", fontWeight: 300, color: "#f0ebe0" }}>
          FLOW FARM
        </div>
        <div className="ff-desktop-nav" style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l.label} className="ff-nav-link" onClick={() => scrollTo(l.href)}>{l.label}</button>
          ))}
          <button className="ff-btn-primary" style={{ padding: "10px 24px", fontSize: 10 }} onClick={() => scrollTo("#contact")}>PRIVATE INQUIRY</button>
        </div>
        <button className="ff-mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5 }}>
          <span style={{ width: 24, height: 1, background: "#f0ebe0", display: "block" }} />
          <span style={{ width: 24, height: 1, background: "#f0ebe0", display: "block" }} />
          <span style={{ width: 16, height: 1, background: "#f0ebe0", display: "block" }} />
        </button>
      </nav>

      {/* MOBILE NAV */}
      {menuOpen && (
        <div className="ff-mobile-nav" style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(10,10,8,0.98)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          {NAV_LINKS.map(l => (
            <button key={l.label} className="ff-nav-link" style={{ fontSize: 14 }} onClick={() => scrollTo(l.href)}>{l.label}</button>
          ))}
          <button className="ff-btn-primary" onClick={() => scrollTo("#contact")}>PRIVATE INQUIRY</button>
        </div>
      )}

      {/* HERO */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <iframe
          src="https://player.vimeo.com/video/1171394707?background=1&autoplay=1&loop=1&muted=1&quality=1080p"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", pointerEvents: "none" }}
          allow="autoplay; fullscreen"
          title="Flow Farm hero video"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,8,0.3) 0%, rgba(10,10,8,0.4) 50%, rgba(10,10,8,0.85) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}>
          <p className="ff-sans" style={{ letterSpacing: "0.3em", fontSize: 11, color: "#c9a84c", marginBottom: 24, fontWeight: 400 }}>
            107 LINDEN TRAIL -- ABERDEEN, NC
          </p>
          <h1 className="ff-serif ff-hero-title" style={{ fontSize: 110, fontWeight: 300, lineHeight: 0.9, letterSpacing: "0.02em", color: "#f0ebe0", marginBottom: 32 }}>
            Flow<br />Farm
          </h1>
          <p className="ff-sans" style={{ letterSpacing: "0.25em", fontSize: 12, color: "rgba(240,235,224,0.7)", marginBottom: 48, fontWeight: 300 }}>
            AGRITOURISM ESTABLISHED. LEGACY READY.
          </p>
          <p className="ff-serif" style={{ fontSize: 28, color: "#c9a84c", fontWeight: 300, marginBottom: 48 }}>$5,250,000</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="ff-btn-primary" onClick={() => scrollTo("#story")}>DISCOVER THE ESTATE</button>
            <button className="ff-btn-ghost" onClick={() => scrollTo("#contact")}>PRIVATE INQUIRY</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 2, textAlign: "center" }}>
          <div style={{ width: 1, height: 48, background: "rgba(201,168,76,0.5)", margin: "0 auto 8px" }} />
          <p className="ff-sans" style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(240,235,224,0.4)" }}>SCROLL</p>
        </div>
      </div>

      {/* STAT BAR */}
      <div style={{ background: "#111109", borderTop: "1px solid rgba(201,168,76,0.2)", borderBottom: "1px solid rgba(201,168,76,0.2)", padding: "40px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 32 }}>
          {[
            { value: "15", label: "ACRES" },
            { value: "8,519", label: "SQUARE FEET" },
            { value: "6", label: "STRUCTURES" },
            { value: "6 / 7", label: "BED / BATH" },
            { value: "1,200", label: "AMPS" },
            { value: "3 MI", label: "TO PINEHURST" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="ff-serif" style={{ fontSize: 36, fontWeight: 300, color: "#c9a84c", letterSpacing: "0.05em" }}>{s.value}</div>
              <div className="ff-sans" style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(240,235,224,0.5)", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STORY SECTION */}
      <section id="story" className="ff-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 20 }}>THE STORY</p>
              <h2 className="ff-serif" style={{ fontSize: 52, fontWeight: 300, lineHeight: 1.1, marginBottom: 32 }}>
                A Foundation<br />for What<br />Comes Next
              </h2>
              <div style={{ width: 48, height: 1, background: "#c9a84c", marginBottom: 32 }} />
              <p style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(240,235,224,0.75)", fontWeight: 300, marginBottom: 24 }}>
                Flow Farm is not a property. It is a platform. A rare convergence of land, architecture, and infrastructure assembled with singular intentionality -- designed to support energy independence, agricultural productivity, and a life lived at the highest level.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(240,235,224,0.75)", fontWeight: 300, marginBottom: 40 }}>
                Designed by Robert E. Clark, AIA -- one of the Sandhills' most celebrated architects -- the all-brick main residence is one of his final commissions. Every system, every surface, every structure reflects a commitment to permanence.
              </p>
              <button className="ff-btn-primary" onClick={() => scrollTo("#residence")}>EXPLORE THE RESIDENCE</button>
            </div>
            <div style={{ position: "relative" }}>
              <img
                src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg"
                alt="Flow Farm Estate Grounds"
                style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", bottom: -24, right: -24, background: "#111109", border: "1px solid rgba(201,168,76,0.3)", padding: "24px 28px" }}>
                <p className="ff-sans" style={{ fontSize: 9, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 8 }}>DESIGNED BY</p>
                <p className="ff-serif" style={{ fontSize: 18, fontWeight: 300 }}>Robert E. Clark, AIA</p>
                <p className="ff-sans" style={{ fontSize: 9, letterSpacing: "0.15em", color: "rgba(240,235,224,0.5)", marginTop: 4 }}>PINEHURST, NORTH CAROLINA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPPORTUNITY SECTION */}
      <section style={{ background: "#0d0d0b", padding: "100px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 24 }}>THE OPPORTUNITY</p>
          <h2 className="ff-serif" style={{ fontSize: 48, fontWeight: 300, lineHeight: 1.2, marginBottom: 40 }}>
            "A living estate rooted in sustainability, elevated by state-of-the-art infrastructure and refined luxury."
          </h2>
          <div style={{ width: 48, height: 1, background: "#c9a84c", margin: "0 auto 40px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, textAlign: "left" }}>
            {[
              { title: "Energy Independence", body: "1,200 amps, 14.3kW solar, 30kW Kohler generator, geothermal HVAC across 20 deep wells. Operate entirely off-grid." },
              { title: "Agricultural Income", body: "USDA-registered 3-acre veganic farm, high-tunnel greenhouse, full workshop. Transferable as a going concern." },
              { title: "Agritourism Potential", body: "USDA zoning, flexible access points, 7 buildable acres. Event venue, retreat center, or branded destination." },
              { title: "Golf Membership", body: "Pinehurst Country Club Signature Membership included -- unlimited access to Course No. 7 and No. 9." },
              { title: "Tax Positioning", body: "Agricultural land classification provides favorable tax positioning. Farm registration USDA FSA #5893." },
              { title: "Privacy by Design", body: "Multiple private access points. Immediate separation and discretion from the moment of entry." },
            ].map(item => (
              <div key={item.title} style={{ borderTop: "1px solid rgba(201,168,76,0.2)", paddingTop: 24 }}>
                <h3 className="ff-serif" style={{ fontSize: 20, fontWeight: 400, marginBottom: 12 }}>{item.title}</h3>
                <p className="ff-sans" style={{ fontSize: 12, lineHeight: 1.8, color: "rgba(240,235,224,0.6)", fontWeight: 300 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESIDENCE SECTION */}
      <section id="residence" className="ff-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>THE MAIN RESIDENCE</p>
            <h2 className="ff-serif" style={{ fontSize: 56, fontWeight: 300, lineHeight: 1.1 }}>
              Where Architecture<br />Meets Intention
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 80 }}>
            <img src="https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public" alt="Grand Living Room" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} />
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 2 }}>
              <img src="https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public" alt="Conservatory" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <img src="https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public" alt="Kitchen" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }}>
            {[
              { title: "Grand Living Room", detail: "27.5 x 23.8 ft | 17 ft Vaulted Ceiling", body: "The heart of the home. Reclaimed Civil War-era heart pine floors in custom artisan patterns. Proportions designed for entertaining at scale." },
              { title: "Glass Conservatory", detail: "19.5 x 17.7 ft | Octagonal Skylight Dome", body: "A garden room wrapped entirely in glass, anchored by a custom octagonal dome skylight. A living room, dining space, or morning sanctuary." },
              { title: "Chef's Kitchen", detail: "Sub-Zero + Wolf 60\" Range | Scullery", body: "Sub-Zero column refrigeration, Wolf 60\" dual fuel range with six burners, griddle, grill, and warming drawer. Two KitchenAid dishwashers. Full scullery." },
              { title: "Heart Pine Floors", detail: "Civil War-Era Reclaimed", body: "Custom-laid artisan patterns throughout every bedroom, hallway, and closet. Sourced, milled, and installed as a singular design statement." },
              { title: "Primary Suite", detail: "Walk-In Closet: 11.7 x 21.7 ft", body: "A private retreat within the estate. Generous proportions, natural light, and a walk-in closet designed to the scale of a room." },
              { title: "Smart Infrastructure", detail: "Control4 | Araknis | Lennox", body: "Whole-house Control4 audio, video, and lighting. Enterprise-grade Araknis campus Wi-Fi. Lennox air purification on every zone." },
            ].map(item => (
              <div key={item.title} style={{ borderTop: "1px solid rgba(201,168,76,0.2)", paddingTop: 24 }}>
                <h3 className="ff-serif" style={{ fontSize: 20, fontWeight: 400, marginBottom: 6 }}>{item.title}</h3>
                <p className="ff-sans" style={{ fontSize: 9, letterSpacing: "0.2em", color: "#c9a84c", marginBottom: 14 }}>{item.detail}</p>
                <p className="ff-sans" style={{ fontSize: 12, lineHeight: 1.8, color: "rgba(240,235,224,0.6)", fontWeight: 300 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATTERPORT / VIRTUAL TOUR */}
      <section style={{ background: "#0d0d0b", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>IMMERSIVE TOUR</p>
            <h2 className="ff-serif" style={{ fontSize: 44, fontWeight: 300 }}>Walk the Estate</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <div style={{ position: "relative", paddingBottom: "60%", background: "#111109", overflow: "hidden" }}>
                <iframe
                  src="https://my.matterport.com/show/?m=xZRfSiQPuQ8&brand=0"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                  allowFullScreen
                  title="Flow Farm Interior Matterport Tour"
                />
              </div>
              <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.2em", color: "rgba(240,235,224,0.4)", marginTop: 12, textAlign: "center" }}>INTERIOR 3D TOUR</p>
            </div>
            <div>
              <div style={{ position: "relative", paddingBottom: "60%", background: "#111109", overflow: "hidden" }}>
                <iframe
                  src="https://portal.nucleus4d.com/3ec4ff02-9412-4f29-87ba-4926145df7a1/exterior-d302c992-e611-4197-b2df-ff6931a8827a"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                  allowFullScreen
                  title="Flow Farm Exterior 3D Tour"
                />
              </div>
              <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.2em", color: "rgba(240,235,224,0.4)", marginTop: 12, textAlign: "center" }}>EXTERIOR 3D TOUR</p>
            </div>
          </div>
        </div>
      </section>

      {/* ESTATE STRUCTURES */}
      <section id="estate" className="ff-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>THE ESTATE</p>
            <h2 className="ff-serif" style={{ fontSize: 52, fontWeight: 300, lineHeight: 1.1 }}>
              Six Structures.<br />One Vision.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
            {STRUCTURES.map(s => (
              <div key={s.number} className="ff-structure-card" style={{ position: "relative", overflow: "hidden", border: "1px solid transparent", transition: "border-color 0.3s", cursor: "default", aspectRatio: "3/4" }}>
                <img src={s.image} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,8,0.92) 0%, rgba(10,10,8,0.3) 50%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 20px" }}>
                  <p className="ff-structure-num ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(201,168,76,0.6)", marginBottom: 6, transition: "color 0.3s" }}>{s.number}</p>
                  <h3 className="ff-serif" style={{ fontSize: 22, fontWeight: 400, marginBottom: 4 }}>{s.name}</h3>
                  <p className="ff-sans" style={{ fontSize: 9, letterSpacing: "0.2em", color: "#c9a84c", marginBottom: 10 }}>{s.detail}</p>
                  <p className="ff-sans" style={{ fontSize: 11, lineHeight: 1.7, color: "rgba(240,235,224,0.6)", fontWeight: 300 }}>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ background: "#0d0d0b", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>THE GALLERY</p>
            <h2 className="ff-serif" style={{ fontSize: 48, fontWeight: 300 }}>Every Detail, Considered</h2>
          </div>
          <div style={{ columns: "4 200px", gap: 4 }}>
            {GALLERY_PHOTOS.map((photo, i) => (
              <div key={i} className="ff-gallery-item" style={{ breakInside: "avoid", marginBottom: 4, overflow: "hidden", cursor: "pointer" }} onClick={() => setActiveGallery(i)}>
                <img src={photo.url} alt={photo.label} style={{ width: "100%", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {activeGallery !== null && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(10,10,8,0.97)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setActiveGallery(null)}>
          <button onClick={() => setActiveGallery(null)} style={{ position: "absolute", top: 24, right: 32, background: "none", border: "none", color: "#f0ebe0", fontSize: 32, cursor: "pointer", lineHeight: 1 }}>x</button>
          <button onClick={(e) => { e.stopPropagation(); setActiveGallery(a => (a - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length); }} style={{ position: "absolute", left: 24, background: "none", border: "none", color: "#c9a84c", fontSize: 32, cursor: "pointer" }}>{"<"}</button>
          <img src={GALLERY_PHOTOS[activeGallery].url} alt={GALLERY_PHOTOS[activeGallery].label} style={{ maxHeight: "85vh", maxWidth: "85vw", objectFit: "contain" }} onClick={e => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); setActiveGallery(a => (a + 1) % GALLERY_PHOTOS.length); }} style={{ position: "absolute", right: 24, background: "none", border: "none", color: "#c9a84c", fontSize: 32, cursor: "pointer" }}>{">"}</button>
          <p className="ff-sans" style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", fontSize: 10, letterSpacing: "0.2em", color: "rgba(240,235,224,0.5)" }}>{GALLERY_PHOTOS[activeGallery].label}</p>
        </div>
      )}

      {/* VIDEO SECTION */}
      <section style={{ padding: "0 40px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>THE FILM</p>
            <h2 className="ff-serif" style={{ fontSize: 44, fontWeight: 300 }}>See It in Motion</h2>
          </div>
          <div style={{ position: "relative", paddingBottom: "56.25%", background: "#111109" }}>
            <iframe
              src="https://www.youtube.com/embed/ySZBMvFm4mQ?rel=0&color=white"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              allowFullScreen
              title="Flow Farm Property Video"
            />
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section id="specifications" style={{ background: "#0d0d0b", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>SPECIFICATIONS</p>
            <h2 className="ff-serif" style={{ fontSize: 48, fontWeight: 300 }}>Built Without Compromise</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48 }}>
            {SPECS.map(spec => (
              <div key={spec.category} style={{ borderTop: "1px solid rgba(201,168,76,0.25)", paddingTop: 24 }}>
                <h3 className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 20 }}>{spec.category.toUpperCase()}</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {spec.items.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#c9a84c", fontSize: 8, marginTop: 5, flexShrink: 0 }}>--</span>
                      <span className="ff-sans" style={{ fontSize: 12, lineHeight: 1.6, color: "rgba(240,235,224,0.65)", fontWeight: 300 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="ff-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>THE LOCATION</p>
              <h2 className="ff-serif" style={{ fontSize: 48, fontWeight: 300, lineHeight: 1.1, marginBottom: 32 }}>
                Private by Nature.<br />Pinehurst by<br />Proximity.
              </h2>
              <div style={{ width: 48, height: 1, background: "#c9a84c", marginBottom: 32 }} />
              <p className="ff-sans" style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(240,235,224,0.65)", fontWeight: 300, marginBottom: 24 }}>
                Multiple points of access including primary entrance from Linden Trail with additional access via Linden Road, Mollie Lane, and Skene Lane. The private drive creates immediate separation and discretion.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
                {[
                  { label: "Pinehurst Village", detail: "3 miles" },
                  { label: "Moore County Regional Airport", detail: "Private aviation" },
                  { label: "Raleigh-Durham International", detail: "1 hour" },
                  { label: "FirstHealth Moore Regional", detail: "Full hospital services" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(240,235,224,0.08)", paddingBottom: 12 }}>
                    <span className="ff-sans" style={{ fontSize: 12, color: "rgba(240,235,224,0.7)", fontWeight: 300 }}>{item.label}</span>
                    <span className="ff-sans" style={{ fontSize: 11, color: "#c9a84c", letterSpacing: "0.1em" }}>{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/46fb99d0e_TSDroneHouseRoof.jpg"
                alt="Flow Farm Aerial"
                style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "#0d0d0b", padding: "120px 40px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p className="ff-sans" style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 16 }}>PRIVATE INQUIRY</p>
          <h2 className="ff-serif" style={{ fontSize: 52, fontWeight: 300, lineHeight: 1.1, marginBottom: 16 }}>
            Begin the Conversation
          </h2>
          <p className="ff-sans" style={{ fontSize: 12, color: "rgba(240,235,224,0.5)", marginBottom: 48, lineHeight: 1.8, fontWeight: 300 }}>
            Flow Farm is offered exclusively. Showings are by private appointment only.<br />We welcome qualified inquiries from principals and their representatives.
          </p>
          {formSent ? (
            <div style={{ border: "1px solid rgba(201,168,76,0.3)", padding: "48px 32px" }}>
              <p className="ff-serif" style={{ fontSize: 28, fontWeight: 300, marginBottom: 12 }}>Thank you.</p>
              <p className="ff-sans" style={{ fontSize: 12, color: "rgba(240,235,224,0.6)", fontWeight: 300 }}>We will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleForm} style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  required
                  style={{ background: "transparent", border: "1px solid rgba(240,235,224,0.2)", padding: "14px 16px", color: "#f0ebe0", fontSize: 12, fontFamily: "'Montserrat', Arial, sans-serif", outline: "none", width: "100%" }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  required
                  style={{ background: "transparent", border: "1px solid rgba(240,235,224,0.2)", padding: "14px 16px", color: "#f0ebe0", fontSize: 12, fontFamily: "'Montserrat', Arial, sans-serif", outline: "none", width: "100%" }}
                />
              </div>
              <input
                type="tel"
                placeholder="Phone Number (optional)"
                value={formData.phone}
                onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                style={{ background: "transparent", border: "1px solid rgba(240,235,224,0.2)", padding: "14px 16px", color: "#f0ebe0", fontSize: 12, fontFamily: "'Montserrat', Arial, sans-serif", outline: "none", width: "100%" }}
              />
              <textarea
                placeholder="Message (optional)"
                value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                rows={5}
                style={{ background: "transparent", border: "1px solid rgba(240,235,224,0.2)", padding: "14px 16px", color: "#f0ebe0", fontSize: 12, fontFamily: "'Montserrat', Arial, sans-serif", outline: "none", resize: "none", width: "100%" }}
              />
              <button type="submit" className="ff-btn-primary" style={{ width: "100%", padding: "18px", fontSize: 11, marginTop: 8 }}>
                SUBMIT INQUIRY
              </button>
            </form>
          )}
          <div style={{ marginTop: 48, paddingTop: 48, borderTop: "1px solid rgba(240,235,224,0.1)" }}>
            <p className="ff-sans" style={{ fontSize: 11, color: "rgba(240,235,224,0.4)", letterSpacing: "0.1em", marginBottom: 8 }}>LISTING AGENT</p>
            <p className="ff-serif" style={{ fontSize: 22, fontWeight: 300, marginBottom: 4 }}>Rachel Hernandez</p>
            <p className="ff-sans" style={{ fontSize: 11, color: "#c9a84c", letterSpacing: "0.1em" }}>rachelhernandezrealtor@gmail.com</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a0a08", borderTop: "1px solid rgba(201,168,76,0.15)", padding: "40px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div className="ff-serif" style={{ fontSize: 18, letterSpacing: "0.15em", fontWeight: 300 }}>FLOW FARM</div>
          <p className="ff-sans" style={{ fontSize: 10, color: "rgba(240,235,224,0.3)", letterSpacing: "0.15em" }}>107 LINDEN TRAIL -- ABERDEEN, NC 28315</p>
          <p className="ff-sans" style={{ fontSize: 10, color: "rgba(240,235,224,0.3)", letterSpacing: "0.1em" }}>OFFERED AT $5,250,000</p>
        </div>
      </footer>

    </div>
  );
}
