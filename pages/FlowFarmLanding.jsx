import { useState, useEffect, useRef } from "react";

const B = "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/";
const SB = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/";

const NAV_LINKS = [
  { label: "STORY", href: "#story" },
  { label: "RESIDENCE", href: "#residence" },
  { label: "GALLERY", href: "#gallery" },
  { label: "ESTATE", href: "#estate" },
  { label: "SYSTEMS", href: "#systems" },
  { label: "FAQ", href: "#faq" },
  { label: "CONTACT", href: "#contact" },
];

const CHAPTERS = [
  {
    title: "Arrival & First Impression",
    intro: "Reclaimed heart pine, herringbone floors, and a sense of place from the first step.",
    images: [
      { src: B+"967c6b791_107LindenTrailGrass-65.jpg", alt: "The residence, framed by oak canopy" },
      { src: B+"3cd0985c9_foyer.jpg", alt: "Heart pine underfoot, light overhead" },
      { src: B+"ba776ed77_foyersection.jpg", alt: "Gallery hall in herringbone" },
    ],
  },
  {
    title: "Grand Living",
    intro: "Soaring timber trusses, a masonry hearth, and rooms that breathe.",
    images: [
      { src: B+"5843bc809_livingroom.jpg", alt: "Grand living beneath timber trusses" },
      { src: B+"a7a7e8ca5_fireplace.jpg", alt: "Masonry hearth and gathering room" },
      { src: B+"f84ed29bc_260115107LindenTrailF-9622.jpg", alt: "French doors open to the porch" },
    ],
  },
  {
    title: "Culinary & Entertaining",
    intro: "A professional kitchen, octagonal glass conservatory, and spaces designed to gather.",
    images: [
      { src: B+"bfda33343_KITCHENYES.jpg", alt: "Chef's kitchen, island to conservatory" },
      { src: B+"89e1b25c5_CONSERVATORYBEST.jpg", alt: "Light-filled glass pavilion" },
      { src: B+"48fe6f4ea_verticaldiningroom.jpg", alt: "Dining beneath a sculptural chandelier" },
      { src: B+"b87561484_MONEYSHOT.jpg", alt: "Timber cupola and floor-to-ceiling glass" },
    ],
  },
  {
    title: "Owner's Retreat",
    intro: "Cathedral ceilings, spa-like baths, and a dressing room with granite island.",
    images: [
      { src: B+"e802ebf12_primary1main.jpg", alt: "Private retreat with cathedral light" },
      { src: B+"d0bb8decd_primarytightshottubandshower.jpg", alt: "Spa-like bath with freestanding tub" },
      { src: B+"a32b0b4a1_primaryclosetgreatshot.jpg", alt: "Dressing room with granite island" },
    ],
  },
  {
    title: "Guest Suites & Private Quarters",
    intro: "Independent guest living with private kitchenette, sitting room, and ensuite bath.",
    images: [
      { src: B+"95203cc47_GUESTSUITESITTINGROOM.jpg", alt: "Guest quarters for independent living" },
      { src: B+"ad2afce57_GUESTSUITEKITCHENETTE.jpg", alt: "Private kitchenette above the wing" },
      { src: B+"be8ac3158_GUESTSUITETRAYCEILING.jpg", alt: "Tray ceiling and quiet comfort" },
    ],
  },
  {
    title: "Creative & Flex Spaces",
    intro: "Cathedral offices, flex rooms, and play spaces that adapt to every chapter.",
    images: [
      { src: B+"f6b8bb6bb_markofficemoneyshot.jpg", alt: "Cathedral office with timber overhead" },
      { src: B+"db4f2b48a_tojoffice.jpg", alt: "Bay window desk and natural light" },
      { src: B+"c27c0bc25_thinktankmain.jpg", alt: "Flex room for whatever comes next" },
    ],
  },
  {
    title: "Service Wing & Mudroom",
    intro: "Vaulted ceilings, a granite island, farmhouse sink -- utility elevated to craft.",
    images: [
      { src: B+"59881eba8_260115107LindenTrailF-9475-2.jpg", alt: "Mudroom designed for real life" },
      { src: B+"b94cc0247_MUDROOM3.jpg", alt: "Heart pine cubbies and coat hooks" },
    ],
  },
  {
    title: "The Estate from Above",
    intro: "Cultivated fields, high tunnels, and fifteen acres of managed landscape.",
    images: [
      { src: B+"2a1ce3d2a_Drone2.jpg", alt: "Estate panorama across cultivated ground" },
      { src: B+"595faa261_107LindenTrail-29.jpg", alt: "Full compound in afternoon light" },
      { src: B+"e75aca465_107LindenTrailGrass-44.jpg", alt: "Summer green stretching to the horizon" },
    ],
  },
  {
    title: "Cabana & Outbuildings",
    intro: "Cabana house, three-car garage, and structures built to the same exacting standard.",
    images: [
      { src: B+"346ee953a_CabanaHouseMain.jpg", alt: "Cabana house across the courtyard" },
      { src: B+"d0aa34c28_107LindenTrailGrass-63.jpg", alt: "Three-car garage on brick" },
    ],
  },
];

const AERIAL_PINS = [
  { id: 0, label: "MAIN RESIDENCE", x: 44, y: 38, category: "RESIDENCE", name: "Main Residence", description: "The main residence anchors the estate with architectural presence and a direct relationship to the surrounding land.", systems: ["20 Geothermal Wells", "14.3 kW Solar Array", "Comml. Water Filtration"], tour: "https://my.matterport.com/show/?m=xZRfSiQPuQ8&brand=0", image: B+"595faa261_107LindenTrail-29.jpg" },
  { id: 1, label: "GUESTHOUSE", x: 60, y: 55, category: "GUEST QUARTERS", name: "Cabana House", description: "Fully independent guest retreat with private entrance, full kitchen, one bedroom and one bath.", systems: ["Private Entrance", "Full Kitchen", "Independent HVAC"], tour: null, image: SB+"3af6924d6_CabanaHouseMain.jpg" },
  { id: 2, label: "3-ACRE VEGANIC FARM", x: 52, y: 20, category: "AGRICULTURE", name: "3-Acre Veganic Farm", description: "USDA-registered active farm. 1,400 ft double deer fence. Certified sustainable growing operation.", systems: ["USDA FSA #5893", "1,400 ft Deer Fence", "Walk-In Cooler"], tour: null, image: B+"da785e254_flowfarmmasterphotoswebsite3.jpg" },
  { id: 3, label: "HIGH TUNNEL", x: 65, y: 35, category: "GREENHOUSE", name: "High Tunnel Greenhouse", description: "96x36 ft year-round specialty cultivation. Custom geothermal climate battery. Pineapples, avocados, citrus.", systems: ["96 x 36 ft", "Geothermal Climate Battery", "Four Season Tools"], tour: null, image: SB+"217fdb4a1_HighTunnel.jpg" },
  { id: 4, label: "FARM WORKSHOP", x: 58, y: 70, category: "WORKSHOP", name: "Farm Workshop", description: "30x40 ft operational workshop with plumbing and electrical. Built for serious agricultural production.", systems: ["30 x 40 ft", "Plumbing + Electrical", "Walk-In Cooler"], tour: null, image: SB+"136958608_FarmWorkshop.jpg" },
  { id: 5, label: "COMPOST + BIOCHAR", x: 72, y: 60, category: "SUSTAINABILITY", name: "Compost + Biochar", description: "O2Compost aerated system and biochar kiln with I-beam and chain hoist. Regenerative loop closed on-site.", systems: ["O2Compost System", "Biochar Kiln", "Chain Hoist + I-Beam"], tour: null, image: SB+"983e028f7_CompostingandBioChar.jpg" },
];

const SYSTEMS = [
  { category: "Energy Independence", items: ["14.3 kW solar array (61 Samsung panels)", "Sunny Island 10kW solar battery backup", "30 kW Kohler generator", "2x 1,000 gallon buried propane tanks", "1,200 amp total electrical service"], image: SB+"CrawlSpaceSolarBatteries.jpg" },
  { category: "Geothermal Climate", items: ["20 deep wells, each 300 ft deep", "Five interconnected Water Furnace HVAC zones", "Two Water Furnace superheater geothermal hot water", "Energy Recovery Ventilator system", "Lennox air purification on each zone"], image: SB+"2ab9de092_MechanicalRoom3.jpg" },
  { category: "Smart Home", items: ["Whole-house Control4 audio, video, lighting", "Enterprise Araknis campus Wi-Fi", "Whole-house alarm system", "Whole-house fire sprinkler system", "Brown Safe vault door + jewelry safe in master closet"], image: SB+"9974eff2c_MechanicalRoom2.jpg" },
  { category: "Water & Filtration", items: ["Private water well up to 50 gpm", "Whole-house commercial water filtration (Clear Water Solutions)", "Private septic 2x 1,500 gallon with pump", "Whole-house central vacuum dual VacuMaid S2400", "Sealed fully conditioned crawl space below full footprint"], image: B+"e3e772f98_MechanicalRoom.jpg" },
];

const FAQS = [
  { category: "Property", items: [
    { q: "What is the total acreage?", a: "Flow Farm comprises approximately 15 acres of carefully curated land, with nearly 8 acres of protected forest, multiple access points, and thoughtfully zoned residential, agricultural, and operational areas." },
    { q: "How many structures are on the property?", a: "Six interconnected structures: the main residence (8,519 SF above grade), private cabana house, climate-controlled greenhouse, farm workshop, regenerative compost area, and biochar production zone." },
    { q: "What are the utility systems?", a: "The estate features 14.3 kW solar array (61 Samsung panels), 30 kW Kohler generator backup, private well (50 GPM), dual 1,500-gallon septic tanks, 20 deep geothermal wells, and commercial-grade water filtration." },
  ]},
  { category: "Smart Home & Automation", items: [
    { q: "What is the smart home system?", a: "The property includes a comprehensive Control4 system managing whole-house audio, video, and lighting, with enterprise-grade Araknis networking for secure, estate-wide connectivity supporting both residential and commercial operations." },
    { q: "Is there security infrastructure?", a: "Yes -- whole-house alarm systems, fire sprinklers, a Brown Safe vault door with jewelry safe in the master closet, central vacuum systems, and a comprehensive automation platform." },
  ]},
  { category: "Operations & Use Cases", items: [
    { q: "Can this property support agritourism?", a: "Absolutely. With USDA agricultural zoning, 3-acre veganic farm, separate guest residence, and enterprise-grade infrastructure, the property is ideally suited for agritourism ventures, farm stays, wellness retreats, or farm-to-table hospitality." },
    { q: "What are the primary use cases?", a: "Flow Farm is flexible for multiple uses: private family compound, agritourism destination, wellness retreat center, luxury farm stay, corporate retreat venue, or agricultural enterprise with residential components." },
    { q: "Is the farm operational?", a: "Yes. The property includes a 3-acre veganic farm with high tunnel greenhouse, farm workshop, and operational infrastructure ready for immediate use or expansion." },
  ]},
  { category: "Sustainability & Systems", items: [
    { q: "How sustainable is the property?", a: "The estate integrates solar power, geothermal heating/cooling, water independence via private well and filtration, regenerative composting, biochar production, sealed crawl space, and energy recovery ventilation -- engineered for resilience and minimal environmental impact." },
    { q: "What is the geothermal system?", a: "Twenty deep wells feed into a 5-zone HVAC system with geothermal heat exchange, providing highly efficient climate control across the entire property with Lennox air purification on each zone." },
  ]},
];

const PROXIMITY = [
  { label: "Pinehurst Village", detail: "3 miles", icon: "P" },
  { label: "Moore County Regional Airport", detail: "Private aviation", icon: "A" },
  { label: "Raleigh-Durham International", detail: "1 hour", icon: "R" },
  { label: "FirstHealth Moore Regional", detail: "Full hospital services", icon: "H" },
  { label: "Historic Village of Pinehurst", detail: "UNESCO nominated", icon: "V" },
  { label: "Pinehurst Country Club", detail: "Membership included", icon: "G" },
];

function AerialMap({ isMobile }) {
  const [activePin, setActivePin] = useState(0);
  const pin = AERIAL_PINS[activePin];
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: isMobile ? "4/5" : "16/7", overflow: "hidden", background: "#111109" }}>
        <img src={SB+"46fb99d0e_TSDroneHouseRoof.jpg"} alt="Flow Farm aerial" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,8,0.32)" }} />
        {AERIAL_PINS.map((p, i) => (
          <button key={p.id} onClick={() => setActivePin(i)} style={{ position: "absolute", left: p.x+"%", top: p.y+"%", transform: "translate(-50%,-50%)", background: "none", border: "none", cursor: "pointer", zIndex: 10, padding: 0 }}>
            {activePin === i && <span style={{ position: "absolute", inset: -8, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.5)", animation: "pinPulse 1.8s ease-in-out infinite" }} />}
            <span style={{ display: "flex", alignItems: "center", gap: 6, background: activePin === i ? "rgba(201,168,76,0.92)" : "rgba(15,15,12,0.82)", border: activePin === i ? "1px solid #c9a84c" : "1px solid rgba(201,168,76,0.45)", borderRadius: 2, padding: "5px 10px", backdropFilter: "blur(8px)", transition: "all 0.25s" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: activePin === i ? "#0a0a08" : "#c9a84c", flexShrink: 0 }} />
              <span style={{ fontFamily: "Montserrat,Arial,sans-serif", fontSize: isMobile ? 8 : 10, letterSpacing: "0.18em", fontWeight: 500, color: activePin === i ? "#0a0a08" : "#f0ebe0", whiteSpace: "nowrap" }}>{p.label}</span>
            </span>
          </button>
        ))}
        <div style={{ position: "absolute", top: isMobile ? "auto" : "50%", bottom: isMobile ? 0 : "auto", left: isMobile ? 0 : 40, right: isMobile ? 0 : "auto", transform: isMobile ? "none" : "translateY(-50%)", width: isMobile ? "100%" : 340, background: "rgba(12,12,10,0.93)", backdropFilter: "blur(16px)", border: "1px solid rgba(201,168,76,0.2)", padding: isMobile ? "20px 20px 24px" : "32px 28px", zIndex: 20 }}>
          <p style={{ fontFamily: "Montserrat,Arial,sans-serif", fontSize: 9, letterSpacing: "0.3em", color: "#c9a84c", marginBottom: 8 }}>{pin.category}</p>
          <h3 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: isMobile ? 24 : 30, fontWeight: 300, color: "#f0ebe0", marginBottom: 12, lineHeight: 1.1 }}>{pin.name}</h3>
          <p style={{ fontFamily: "Montserrat,Arial,sans-serif", fontSize: 12, lineHeight: 1.75, color: "rgba(240,235,224,0.65)", fontWeight: 300, marginBottom: 20 }}>{pin.description}</p>
          <p style={{ fontFamily: "Montserrat,Arial,sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "#c9a84c", marginBottom: 12 }}>CONNECTED SYSTEMS</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            {pin.systems.map(s => <span key={s} style={{ display: "inline-block", border: "1px solid rgba(201,168,76,0.3)", padding: "6px 12px", fontFamily: "Montserrat,Arial,sans-serif", fontSize: 10, letterSpacing: "0.12em", color: "rgba(240,235,224,0.7)" }}>{s}</span>)}
          </div>
          {pin.tour && (
            <a href={pin.tour} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, background: "transparent", border: "1px solid #c9a84c", padding: "12px 18px", fontFamily: "Montserrat,Arial,sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "#c9a84c", textDecoration: "none", marginBottom: 20 }}>LAUNCH VIRTUAL 3D TOUR  &#8594;</a>
          )}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {AERIAL_PINS.map((_, i) => (
              <button key={i} onClick={() => setActivePin(i)} style={{ width: activePin === i ? 20 : 6, height: 6, borderRadius: 3, background: activePin === i ? "#c9a84c" : "rgba(240,235,224,0.25)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes pinPulse { 0%{transform:scale(1);opacity:0.7} 50%{transform:scale(1.4);opacity:0.2} 100%{transform:scale(1);opacity:0.7} }`}</style>
    </div>
  );
}

function ChapterGallery({ isMobile }) {
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const chapter = CHAPTERS[activeChapter];

  const goChapter = (i) => { setActiveChapter(i); setActiveImg(0); };

  return (
    <div>
      {/* Chapter nav tabs */}
      <div style={{ display: "flex", overflowX: "auto", gap: 0, borderBottom: "1px solid rgba(201,168,76,0.15)", marginBottom: 0, paddingBottom: 0, scrollbarWidth: "none" }}>
        {CHAPTERS.map((c, i) => (
          <button key={i} onClick={() => goChapter(i)} style={{ flexShrink: 0, background: "none", border: "none", borderBottom: activeChapter === i ? "2px solid #c9a84c" : "2px solid transparent", padding: isMobile ? "12px 14px" : "16px 20px", fontFamily: "Montserrat,Arial,sans-serif", fontSize: isMobile ? 9 : 10, letterSpacing: "0.18em", color: activeChapter === i ? "#c9a84c" : "rgba(240,235,224,0.45)", cursor: "pointer", transition: "all 0.25s", whiteSpace: "nowrap", marginBottom: -1 }}>
            {c.title.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Active chapter */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 0 }}>
        {/* Main image */}
        <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", cursor: "pointer" }} onClick={() => setActiveImg((activeImg+1) % chapter.images.length)}>
          <img src={chapter.images[activeImg].src} alt={chapter.images[activeImg].alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity 0.4s" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,8,0.7) 0%, transparent 50%)" }} />
          <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
            <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: isMobile ? 22 : 28, fontWeight: 300, color: "#f0ebe0", marginBottom: 6 }}>{chapter.title}</p>
            <p style={{ fontFamily: "Montserrat,Arial,sans-serif", fontSize: 11, color: "rgba(240,235,224,0.65)", fontWeight: 300 }}>{chapter.intro}</p>
          </div>
          {chapter.images.length > 1 && (
            <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 6 }}>
              {chapter.images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setActiveImg(i); }} style={{ width: activeImg === i ? 16 : 6, height: 6, borderRadius: 3, background: activeImg === i ? "#c9a84c" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
              ))}
            </div>
          )}
        </div>
        {/* Thumbnail strip */}
        <div style={{ display: "grid", gridTemplateRows: `repeat(${chapter.images.length}, 1fr)`, gap: 2, background: "#0a0a08" }}>
          {chapter.images.map((img, i) => (
            <div key={i} onClick={() => setActiveImg(i)} style={{ position: "relative", overflow: "hidden", cursor: "pointer", opacity: activeImg === i ? 1 : 0.5, transition: "opacity 0.3s" }}>
              <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {activeImg === i && <div style={{ position: "absolute", inset: 0, border: "2px solid #c9a84c", pointerEvents: "none" }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FlowFarmLanding() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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

  const g = (d, m) => isMobile ? m : d;

  return (
    <div style={{ fontFamily: "Georgia,'Times New Roman',serif", background: "#0a0a08", color: "#f0ebe0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        .ff-serif{font-family:'Cormorant Garamond',Georgia,serif}
        .ff-sans{font-family:'Montserrat',Arial,sans-serif}
        .ff-nav{letter-spacing:0.2em;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:400;color:rgba(240,235,224,0.72);cursor:pointer;transition:color 0.3s;background:none;border:none}
        .ff-nav:hover{color:#c9a84c}
        .ff-gold{background:transparent;border:1px solid #c9a84c;color:#c9a84c;letter-spacing:0.2em;font-family:'Montserrat',Arial,sans-serif;font-size:11px;font-weight:500;padding:14px 36px;cursor:pointer;transition:all 0.3s;text-transform:uppercase}
        .ff-gold:hover{background:#c9a84c;color:#0a0a08}
        .ff-ghost{background:transparent;border:1px solid rgba(240,235,224,0.3);color:rgba(240,235,224,0.8);letter-spacing:0.2em;font-family:'Montserrat',Arial,sans-serif;font-size:11px;font-weight:400;padding:12px 32px;cursor:pointer;transition:all 0.3s}
        .ff-ghost:hover{border-color:#c9a84c;color:#c9a84c}
        input::placeholder,textarea::placeholder{color:rgba(240,235,224,0.28)}
        input:focus,textarea:focus{border-color:rgba(201,168,76,0.5)!important;outline:none}
        .prox-card{border:1px solid rgba(201,168,76,0.15);padding:18px;transition:border-color 0.3s,background 0.3s}
        .prox-card:hover{border-color:rgba(201,168,76,0.45);background:rgba(201,168,76,0.04)}
        .sys-card{border:1px solid rgba(201,168,76,0.12);overflow:hidden;transition:border-color 0.3s}
        .sys-card:hover{border-color:rgba(201,168,76,0.4)}
        .faq-item{border-bottom:1px solid rgba(240,235,224,0.08);overflow:hidden}
        ::-webkit-scrollbar{height:2px;background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(201,168,76,0.3)}
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,padding:g("18px 48px","14px 20px"),background:navScrolled?"rgba(10,10,8,0.96)":"transparent",backdropFilter:navScrolled?"blur(12px)":"none",borderBottom:navScrolled?"1px solid rgba(201,168,76,0.12)":"none",transition:"all 0.4s",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div className="ff-serif" style={{ fontSize:g(21,17),letterSpacing:"0.15em",fontWeight:300 }}>FLOW FARM</div>
        {!isMobile && (
          <div style={{ display:"flex",gap:32,alignItems:"center" }}>
            {NAV_LINKS.map(l => <button key={l.label} className="ff-nav" onClick={() => scrollTo(l.href)}>{l.label}</button>)}
            <button className="ff-gold" style={{ padding:"9px 20px",fontSize:10 }} onClick={() => scrollTo("#contact")}>PRIVATE INQUIRY</button>
          </div>
        )}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",gap:5 }}>
            <span style={{ width:24,height:1,background:"#f0ebe0",display:"block" }} />
            <span style={{ width:24,height:1,background:"#f0ebe0",display:"block" }} />
            <span style={{ width:16,height:1,background:"#f0ebe0",display:"block" }} />
          </button>
        )}
      </nav>

      {menuOpen && (
        <div style={{ position:"fixed",inset:0,zIndex:99,background:"rgba(10,10,8,0.98)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:28 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position:"absolute",top:22,right:22,background:"none",border:"none",color:"#f0ebe0",fontSize:28,cursor:"pointer" }}>x</button>
          {NAV_LINKS.map(l => <button key={l.label} className="ff-nav" style={{ fontSize:14 }} onClick={() => scrollTo(l.href)}>{l.label}</button>)}
          <button className="ff-gold" onClick={() => scrollTo("#contact")}>PRIVATE INQUIRY</button>
        </div>
      )}

      {/* HERO */}
      <div style={{ position:"relative",height:"100vh",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center" }}>
        <iframe src="https://player.vimeo.com/video/1171394707?background=1&autoplay=1&loop=1&muted=1&quality=1080p" style={{ position:"absolute",inset:0,width:"100%",height:"100%",border:"none",pointerEvents:"none" }} allow="autoplay; fullscreen" title="Flow Farm hero" />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(10,10,8,0.2) 0%,rgba(10,10,8,0.4) 50%,rgba(10,10,8,0.9) 100%)" }} />
        <div style={{ position:"relative",zIndex:2,textAlign:"center",padding:"0 24px",maxWidth:840,margin:"0 auto" }}>
          <p className="ff-sans" style={{ letterSpacing:"0.3em",fontSize:g(11,9),color:"#c9a84c",marginBottom:22 }}>107 LINDEN TRAIL -- ABERDEEN, NC</p>
          <h1 className="ff-serif" style={{ fontSize:g(108,68),fontWeight:300,lineHeight:0.88,color:"#f0ebe0",marginBottom:28 }}>Flow Farm Test</h1>
          <p className="ff-sans" style={{ letterSpacing:"0.25em",fontSize:g(12,9),color:"rgba(240,235,224,0.6)",marginBottom:36,fontWeight:300 }}>AGRITOURISM ESTABLISHED. LEGACY READY.</p>
          <p className="ff-serif" style={{ fontSize:g(28,22),color:"#c9a84c",fontWeight:300,marginBottom:44 }}>$5,250,000</p>
          <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
            <button className="ff-gold" onClick={() => scrollTo("#story")}>DISCOVER THE ESTATE</button>
            <button className="ff-ghost" onClick={() => scrollTo("#contact")}>PRIVATE INQUIRY</button>
          </div>
        </div>
        <div style={{ position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",zIndex:2,textAlign:"center" }}>
          <div style={{ width:1,height:36,background:"rgba(201,168,76,0.45)",margin:"0 auto 8px" }} />
          <p className="ff-sans" style={{ fontSize:9,letterSpacing:"0.3em",color:"rgba(240,235,224,0.3)" }}>SCROLL</p>
        </div>
      </div>

      {/* STAT BAR */}
      <div style={{ background:"#111109",borderTop:"1px solid rgba(201,168,76,0.2)",borderBottom:"1px solid rgba(201,168,76,0.2)",padding:g("32px 48px","24px 20px") }}>
        <div style={{ maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:g(20,16) }}>
          {[["15","ACRES"],["8,519","SQ FT"],["6","STRUCTURES"],["6 / 7","BED / BATH"],["1,200","AMPS"],["3 MI","TO PINEHURST"]].map(([v,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div className="ff-serif" style={{ fontSize:g(32,24),fontWeight:300,color:"#c9a84c" }}>{v}</div>
              <div className="ff-sans" style={{ fontSize:9,letterSpacing:"0.25em",color:"rgba(240,235,224,0.4)",marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STORY */}
      <section id="story" style={{ padding:g("120px 48px","80px 24px") }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:g("1fr 1fr","1fr"),gap:g(80,48),alignItems:"center" }}>
            <div>
              <p className="ff-sans" style={{ fontSize:10,letterSpacing:"0.3em",color:"#c9a84c",marginBottom:18 }}>THE STORY</p>
              <h2 className="ff-serif" style={{ fontSize:g(50,36),fontWeight:300,lineHeight:1.1,marginBottom:24 }}>Built for Enterprise.<br />Designed for Legacy.</h2>
              <div style={{ width:48,height:1,background:"#c9a84c",marginBottom:24 }} />
              <p style={{ fontSize:g(16,14),lineHeight:1.9,color:"rgba(240,235,224,0.68)",fontWeight:300,marginBottom:18 }}>
                Designed by acclaimed architect Robert E. Clark, AIA -- as one of his final works -- the main residence is a culminating expression of proportion, flow, and livable grandeur, encompassing 8,519 SF of finished heated living space above grade, plus 1,709 SF of partially finished walk-out lower level, and an additional 2,531 SF conditioned crawl space with fully accessible mechanical systems.
              </p>
              <p style={{ fontSize:g(16,14),lineHeight:1.9,color:"rgba(240,235,224,0.68)",fontWeight:300,marginBottom:36 }}>
                Flow Farm is not just a residence -- it is a living enterprise. The estate's established organic farm opens doors to multiple income streams: holistic retreats, destination weddings, a branded organic produce line, culinary workshops, or an exclusive wellness center. The infrastructure is already in place.
              </p>
              <button className="ff-gold" onClick={() => scrollTo("#residence")}>EXPLORE THE RESIDENCE</button>
            </div>
            <div style={{ position:"relative" }}>
              <img src={B+"da785e254_flowfarmmasterphotoswebsite3.jpg"} alt="Flow Farm Estate" style={{ width:"100%",aspectRatio:g("3/4","4/3"),objectFit:"cover",display:"block" }} />
              <div style={{ position:"absolute",bottom:g(-22,0),right:g(-22,0),background:"#111109",border:"1px solid rgba(201,168,76,0.3)",padding:"18px 22px" }}>
                <p className="ff-sans" style={{ fontSize:9,letterSpacing:"0.3em",color:"#c9a84c",marginBottom:5 }}>DESIGNED BY</p>
                <p className="ff-serif" style={{ fontSize:16,fontWeight:300 }}>Robert E. Clark, AIA</p>
                <p className="ff-sans" style={{ fontSize:9,letterSpacing:"0.1em",color:"rgba(240,235,224,0.4)",marginTop:3 }}>PINEHURST, NORTH CAROLINA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPPORTUNITY */}
      <section style={{ position:"relative",padding:g("100px 48px","80px 24px"),overflow:"hidden" }}>
        <img src={B+"b5064633b_JPEGimage.jpg"} alt="Forest" style={{ position:"absolute",inset:"-10%",width:"120%",height:"120%",objectFit:"cover",opacity:0.18 }} />
        <div style={{ position:"absolute",inset:0,background:"rgba(10,10,8,0.82)" }} />
        <div style={{ position:"relative",maxWidth:960,margin:"0 auto",textAlign:"center" }}>
          <p className="ff-sans" style={{ fontSize:10,letterSpacing:"0.3em",color:"#c9a84c",marginBottom:18 }}>THE OPPORTUNITY</p>
          <h2 className="ff-serif" style={{ fontSize:g(44,30),fontWeight:300,lineHeight:1.2,marginBottom:32,fontStyle:"italic" }}>"A living estate rooted in sustainability, elevated by state-of-the-art infrastructure and refined luxury."</h2>
          <div style={{ width:48,height:1,background:"#c9a84c",margin:"0 auto 44px" }} />
          <div style={{ display:"grid",gridTemplateColumns:g("repeat(3,1fr)","1fr 1fr"),gap:g(36,20),textAlign:"left" }}>
            {[
              { title:"Energy Independence", body:"1,200 amps, 14.3kW solar, 30kW generator, geothermal HVAC across 20 deep wells. Operate entirely off-grid." },
              { title:"Agricultural Income", body:"USDA-registered 3-acre veganic farm, high-tunnel greenhouse, full workshop. Transferable as a going concern." },
              { title:"Agritourism Potential", body:"USDA zoning, flexible access, 7 buildable acres. Event venue, retreat center, or branded destination." },
              { title:"Golf Membership", body:"Pinehurst Country Club Signature Membership included -- unlimited access to Course No. 7 and No. 9." },
              { title:"Tax Positioning", body:"Agricultural land classification. Farm registration USDA FSA #5893 provides favorable tax treatment." },
              { title:"Privacy by Design", body:"Multiple private access points. Immediate separation and discretion from the moment of entry." },
            ].map(item => (
              <div key={item.title} style={{ borderTop:"1px solid rgba(201,168,76,0.2)",paddingTop:20 }}>
                <h3 className="ff-serif" style={{ fontSize:g(20,16),fontWeight:400,marginBottom:8 }}>{item.title}</h3>
                <p className="ff-sans" style={{ fontSize:12,lineHeight:1.8,color:"rgba(240,235,224,0.55)",fontWeight:300 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESIDENCE */}
      <section id="residence" style={{ padding:g("120px 48px","80px 24px"),background:"#0d0d0b" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:56 }}>
            <p className="ff-sans" style={{ fontSize:10,letterSpacing:"0.3em",color:"#c9a84c",marginBottom:14 }}>THE MAIN RESIDENCE</p>
            <h2 className="ff-serif" style={{ fontSize:g(52,34),fontWeight:300,lineHeight:1.1 }}>Where Architecture<br />Meets Intention</h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:g("1fr 1fr","1fr"),gap:2,marginBottom:56 }}>
            <img src={B+"bfda33343_KITCHENYES.jpg"} alt="Kitchen" style={{ width:"100%",aspectRatio:"4/3",objectFit:"cover" }} />
            <div style={{ display:"grid",gridTemplateRows:"1fr 1fr",gap:2 }}>
              <img src={B+"89e1b25c5_CONSERVATORYBEST.jpg"} alt="Conservatory" style={{ width:"100%",height:"100%",objectFit:"cover" }} />
              <img src={B+"5843bc809_livingroom.jpg"} alt="Living Room" style={{ width:"100%",height:"100%",objectFit:"cover" }} />
            </div>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:g("repeat(3,1fr)","1fr 1fr"),gap:g(44,24) }}>
            {[
              { title:"Grand Living Room", detail:"27.5 x 23.8 ft | 17 ft Vaulted Ceiling", body:"Reclaimed Civil War-era heart pine floors in custom artisan patterns. Proportions designed for entertaining at scale." },
              { title:"Glass Conservatory", detail:"19.5 x 17.7 ft | Octagonal Skylight Dome", body:"Wrapped entirely in glass, anchored by a custom octagonal dome skylight. A living room, dining space, or morning sanctuary." },
              { title:"Chef Kitchen", detail:"Sub-Zero + Wolf 60\" Range | Scullery", body:"Sub-Zero column refrigeration, Wolf 60\" dual fuel range, six burners, griddle, grill, warming drawer. Two dishwashers. Full scullery." },
              { title:"Heart Pine Floors", detail:"Civil War-Era Reclaimed", body:"Custom artisan patterns throughout every bedroom, hallway, and closet. Sourced, milled, installed as a singular design statement." },
              { title:"Primary Suite", detail:"Walk-In Closet: 11.7 x 21.7 ft", body:"A private retreat with generous proportions, natural light, and a walk-in closet designed to the scale of a room." },
              { title:"Smart Infrastructure", detail:"Control4 | Araknis | Lennox", body:"Whole-house Control4 audio, video, and lighting. Enterprise-grade Araknis campus Wi-Fi. Lennox air purification on every zone." },
            ].map(item => (
              <div key={item.title} style={{ borderTop:"1px solid rgba(201,168,76,0.18)",paddingTop:20 }}>
                <h3 className="ff-serif" style={{ fontSize:g(19,16),fontWeight:400,marginBottom:5 }}>{item.title}</h3>
                <p className="ff-sans" style={{ fontSize:9,letterSpacing:"0.18em",color:"#c9a84c",marginBottom:10 }}>{item.detail}</p>
                <p className="ff-sans" style={{ fontSize:12,lineHeight:1.8,color:"rgba(240,235,224,0.55)",fontWeight:300 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CINEMATIC CHAPTER GALLERY */}
      <section id="gallery" style={{ padding:g("120px 0","80px 0") }}>
        <div style={{ maxWidth:1100,margin:"0 auto",padding:g("0 48px","0 0"),marginBottom:48 }}>
          <div style={{ padding:g("0","0 24px") }}>
            <p className="ff-sans" style={{ fontSize:10,letterSpacing:"0.3em",color:"#c9a84c",marginBottom:14 }}>THE GALLERY</p>
            <h2 className="ff-serif" style={{ fontSize:g(52,34),fontWeight:300,lineHeight:1.1 }}>Every Room.<br />Every Detail.</h2>
          </div>
        </div>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <ChapterGallery isMobile={isMobile} />
        </div>
      </section>

      {/* VIRTUAL TOURS */}
      <section style={{ background:"#0d0d0b",padding:g("100px 48px","80px 24px") }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:44 }}>
            <p className="ff-sans" style={{ fontSize:10,letterSpacing:"0.3em",color:"#c9a84c",marginBottom:14 }}>IMMERSIVE TOUR</p>
            <h2 className="ff-serif" style={{ fontSize:g(44,30),fontWeight:300 }}>Walk the Estate</h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:g("1fr 1fr","1fr"),gap:20 }}>
            {[
              { src:"https://my.matterport.com/show/?m=xZRfSiQPuQ8&brand=0",label:"INTERIOR 3D TOUR" },
              { src:"https://portal.nucleus4d.com/3ec4ff02-9412-4f29-87ba-4926145df7a1/exterior-d302c992-e611-4197-b2df-ff6931a8827a",label:"EXTERIOR 3D TOUR" },
            ].map(t => (
              <div key={t.label}>
                <div style={{ position:"relative",paddingBottom:"62%",background:"#111109",overflow:"hidden" }}>
                  <iframe src={t.src} style={{ position:"absolute",inset:0,width:"100%",height:"100%",border:"none" }} allowFullScreen title={t.label} />
                </div>
                <p className="ff-sans" style={{ fontSize:10,letterSpacing:"0.2em",color:"rgba(240,235,224,0.35)",marginTop:10,textAlign:"center" }}>{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESTATE AERIAL MAP */}
      <section id="estate" style={{ padding:g("120px 0 60px","80px 0 40px") }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:g("0 48px","0 24px"),marginBottom:44 }}>
          <p className="ff-sans" style={{ fontSize:10,letterSpacing:"0.3em",color:"#c9a84c",marginBottom:14 }}>THE ESTATE FROM ABOVE</p>
          <h2 className="ff-serif" style={{ fontSize:g(52,34),fontWeight:300,lineHeight:1.1 }}>Six Structures.<br />Fifteen Acres.</h2>
        </div>
        <AerialMap isMobile={isMobile} />
      </section>

      {/* VIDEO */}
      <section style={{ padding:g("80px 48px","60px 24px"),background:"#0d0d0b" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:36 }}>
            <p className="ff-sans" style={{ fontSize:10,letterSpacing:"0.3em",color:"#c9a84c",marginBottom:14 }}>THE FILM</p>
            <h2 className="ff-serif" style={{ fontSize:g(44,30),fontWeight:300 }}>See It in Motion</h2>
          </div>
          <div style={{ position:"relative",paddingBottom:"56.25%",background:"#111109" }}>
            <iframe src="https://www.youtube.com/embed/ySZBMvFm4mQ?rel=0&color=white" style={{ position:"absolute",inset:0,width:"100%",height:"100%",border:"none" }} allowFullScreen title="Flow Farm Video" />
          </div>
        </div>
      </section>

      {/* SYSTEMS */}
      <section id="systems" style={{ padding:g("120px 48px","80px 24px") }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:64 }}>
            <p className="ff-sans" style={{ fontSize:10,letterSpacing:"0.3em",color:"#c9a84c",marginBottom:14 }}>SYSTEMS & TECHNOLOGY</p>
            <h2 className="ff-serif" style={{ fontSize:g(52,34),fontWeight:300 }}>Engineered for<br />Independence</h2>
            <p className="ff-sans" style={{ fontSize:13,color:"rgba(240,235,224,0.5)",maxWidth:600,margin:"20px auto 0",lineHeight:1.8,fontWeight:300 }}>Behind the beauty is a deeply considered operating core -- power, water, automation, and mechanical systems presented with the same care as the architecture itself.</p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:g("1fr 1fr","1fr"),gap:2 }}>
            {SYSTEMS.map(sys => (
              <div key={sys.category} className="sys-card">
                <div style={{ position:"relative",aspectRatio:"16/9",overflow:"hidden" }}>
                  <img src={sys.image} alt={sys.category} style={{ width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.7)" }} />
                  <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(10,10,8,0.9) 0%,transparent 60%)" }} />
                  <h3 className="ff-serif" style={{ position:"absolute",bottom:16,left:20,fontSize:g(22,18),fontWeight:300,color:"#f0ebe0" }}>{sys.category}</h3>
                </div>
                <div style={{ padding:g("24px","18px"),background:"#111109" }}>
                  <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:10 }}>
                    {sys.items.map(item => (
                      <li key={item} style={{ display:"flex",gap:10,alignItems:"flex-start" }}>
                        <span style={{ color:"#c9a84c",fontSize:8,marginTop:5,flexShrink:0 }}>--</span>
                        <span className="ff-sans" style={{ fontSize:12,lineHeight:1.6,color:"rgba(240,235,224,0.6)",fontWeight:300 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section style={{ background:"#0d0d0b",padding:g("100px 48px","80px 24px") }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:48 }}>
            <p className="ff-sans" style={{ fontSize:10,letterSpacing:"0.3em",color:"#c9a84c",marginBottom:14 }}>THE LOCATION</p>
            <h2 className="ff-serif" style={{ fontSize:g(48,32),fontWeight:300,lineHeight:1.1 }}>Private by Nature.<br />Pinehurst by Proximity.</h2>
          </div>
          <p className="ff-sans" style={{ fontSize:12,lineHeight:1.9,color:"rgba(240,235,224,0.52)",fontWeight:300,textAlign:"center",maxWidth:680,margin:"0 auto 48px" }}>
            Multiple points of access: primary entrance from Linden Trail with additional access via Linden Road, Mollie Lane, and Skene Lane. The private drive creates immediate separation and discretion.
          </p>
          <div style={{ display:"grid",gridTemplateColumns:g("repeat(3,1fr)","1fr 1fr"),gap:g(14,10) }}>
            {PROXIMITY.map(item => (
              <div key={item.label} className="prox-card">
                <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:7 }}>
                  <div style={{ width:28,height:28,borderRadius:"50%",border:"1px solid rgba(201,168,76,0.38)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <span className="ff-serif" style={{ fontSize:12,color:"#c9a84c" }}>{item.icon}</span>
                  </div>
                  <span className="ff-sans" style={{ fontSize:g(12,11),color:"rgba(240,235,224,0.7)",fontWeight:300,lineHeight:1.4 }}>{item.label}</span>
                </div>
                <p className="ff-sans" style={{ fontSize:10,color:"#c9a84c",letterSpacing:"0.15em",paddingLeft:40 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding:g("120px 48px","80px 24px") }}>
        <div style={{ maxWidth:800,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:64 }}>
            <p className="ff-sans" style={{ fontSize:10,letterSpacing:"0.3em",color:"#c9a84c",marginBottom:14 }}>FREQUENTLY ASKED</p>
            <h2 className="ff-serif" style={{ fontSize:g(48,32),fontWeight:300 }}>Common Questions</h2>
          </div>
          {FAQS.map((group, gi) => (
            <div key={group.category} style={{ marginBottom:40 }}>
              <p className="ff-sans" style={{ fontSize:9,letterSpacing:"0.3em",color:"#c9a84c",marginBottom:16,paddingBottom:12,borderBottom:"1px solid rgba(201,168,76,0.2)" }}>{group.category.toUpperCase()}</p>
              {group.items.map((item, ii) => {
                const key = `${gi}-${ii}`;
                const open = openFaq === key;
                return (
                  <div key={ii} className="faq-item">
                    <button onClick={() => setOpenFaq(open ? null : key)} style={{ width:"100%",background:"none",border:"none",cursor:"pointer",padding:"18px 0",display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,textAlign:"left" }}>
                      <span className="ff-serif" style={{ fontSize:g(19,16),fontWeight:300,color:"#f0ebe0",lineHeight:1.3 }}>{item.q}</span>
                      <span style={{ color:"#c9a84c",fontSize:20,flexShrink:0,transform:open?"rotate(45deg)":"none",transition:"transform 0.3s" }}>+</span>
                    </button>
                    {open && (
                      <div style={{ paddingBottom:20 }}>
                        <p className="ff-sans" style={{ fontSize:13,lineHeight:1.85,color:"rgba(240,235,224,0.6)",fontWeight:300 }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background:"#0d0d0b",padding:g("120px 48px","80px 24px") }}>
        <div style={{ maxWidth:660,margin:"0 auto",textAlign:"center" }}>
          <p className="ff-sans" style={{ fontSize:10,letterSpacing:"0.3em",color:"#c9a84c",marginBottom:14 }}>PRIVATE INQUIRY</p>
          <h2 className="ff-serif" style={{ fontSize:g(50,34),fontWeight:300,lineHeight:1.1,marginBottom:14 }}>Begin the Conversation</h2>
          <p className="ff-sans" style={{ fontSize:12,color:"rgba(240,235,224,0.42)",marginBottom:44,lineHeight:1.8,fontWeight:300 }}>
            Flow Farm is offered exclusively. Showings are by private appointment only. We welcome qualified inquiries from principals and their representatives.
          </p>
          {formSent ? (
            <div style={{ border:"1px solid rgba(201,168,76,0.28)",padding:"48px 32px" }}>
              <p className="ff-serif" style={{ fontSize:28,fontWeight:300,marginBottom:10 }}>Thank you.</p>
              <p className="ff-sans" style={{ fontSize:12,color:"rgba(240,235,224,0.52)",fontWeight:300 }}>We will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }} style={{ display:"flex",flexDirection:"column",gap:12,textAlign:"left" }}>
              <div style={{ display:"grid",gridTemplateColumns:g("1fr 1fr","1fr"),gap:12 }}>
                <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData(p => ({...p,name:e.target.value}))} style={{ background:"transparent",border:"1px solid rgba(240,235,224,0.16)",padding:"13px 15px",color:"#f0ebe0",fontSize:12,fontFamily:"Montserrat,Arial,sans-serif",width:"100%" }} />
                <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData(p => ({...p,email:e.target.value}))} style={{ background:"transparent",border:"1px solid rgba(240,235,224,0.16)",padding:"13px 15px",color:"#f0ebe0",fontSize:12,fontFamily:"Montserrat,Arial,sans-serif",width:"100%" }} />
              </div>
              <input type="tel" placeholder="Phone (optional)" value={formData.phone} onChange={e => setFormData(p => ({...p,phone:e.target.value}))} style={{ background:"transparent",border:"1px solid rgba(240,235,224,0.16)",padding:"13px 15px",color:"#f0ebe0",fontSize:12,fontFamily:"Montserrat,Arial,sans-serif",width:"100%" }} />
              <textarea placeholder="Message (optional)" rows={5} value={formData.message} onChange={e => setFormData(p => ({...p,message:e.target.value}))} style={{ background:"transparent",border:"1px solid rgba(240,235,224,0.16)",padding:"13px 15px",color:"#f0ebe0",fontSize:12,fontFamily:"Montserrat,Arial,sans-serif",resize:"none",width:"100%" }} />
              <button type="submit" className="ff-gold" style={{ width:"100%",padding:"17px",fontSize:11,marginTop:4 }}>SUBMIT INQUIRY</button>
            </form>
          )}
          <div style={{ marginTop:44,paddingTop:44,borderTop:"1px solid rgba(240,235,224,0.07)" }}>
            <p className="ff-sans" style={{ fontSize:10,color:"rgba(240,235,224,0.3)",letterSpacing:"0.15em",marginBottom:7 }}>LISTING AGENT</p>
            <p className="ff-serif" style={{ fontSize:21,fontWeight:300,marginBottom:4 }}>Rachel Hernandez</p>
            <p className="ff-sans" style={{ fontSize:11,color:"#c9a84c",letterSpacing:"0.1em" }}>rachelhernandezrealtor@gmail.com</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#0a0a08",borderTop:"1px solid rgba(201,168,76,0.1)",padding:g("32px 48px","24px 20px") }}>
        <div style={{ maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14 }}>
          <div className="ff-serif" style={{ fontSize:17,letterSpacing:"0.15em",fontWeight:300 }}>FLOW FARM</div>
          <p className="ff-sans" style={{ fontSize:10,color:"rgba(240,235,224,0.25)",letterSpacing:"0.12em" }}>107 LINDEN TRAIL -- ABERDEEN, NC 28315</p>
          <p className="ff-sans" style={{ fontSize:10,color:"rgba(240,235,224,0.25)",letterSpacing:"0.1em" }}>OFFERED AT $5,250,000</p>
        </div>
      </footer>
    </div>
  );
}
