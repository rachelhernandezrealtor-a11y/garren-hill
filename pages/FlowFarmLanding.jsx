import { useState, useEffect } from "react";

const VIMEO_ID = "1171394707";

const STRUCTURES = [
  {
    name: "Main Residence",
    sf: "8,519 SF",
    detail: "6 bed / 7 bath — Architect Robert E. Clark AIA. Reclaimed Civil War-era heart pine floors, glass conservatory with octagonal skylight dome, Sub-Zero & Wolf kitchen, geothermal, 30kW generator, 14.3kW solar, Control4 smart home.",
    img: "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg",
  },
  {
    name: "Cabana House",
    sf: "Private Guest Retreat",
    detail: "1 bed / 1 bath with full kitchen and private entrance. A fully self-contained guest experience set apart from the main residence.",
    img: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/bb6c9c80-2258-4414-87c7-5ae5a49b1700/public",
  },
  {
    name: "High Tunnel Greenhouse",
    sf: "96 x 36 ft",
    detail: "Four Season Tools construction with custom Climate Battery air-to-soil geothermal heating. Year-round specialty crops including pineapples, avocados, and citrus.",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg",
  },
  {
    name: "Farm Workshop",
    sf: "30 x 40 ft",
    detail: "Fully operational with plumbing, electrical, and walk-in cooler. 1,400ft double deer fencing enclosing 3 acres of USDA-registered veganic farmland.",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg",
  },
  {
    name: "Compost + Biochar",
    sf: "Regenerative Infrastructure",
    detail: "O2Compost covered aerated system and biochar kiln under covered structure with I-Beam and chain hoist. Closed-loop soil regeneration at scale.",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/983e028f7_CompostingandBioChar.jpg",
  },
];

const GALLERY = [
  "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/ada10c6f-d704-40ce-10e5-58d25e101200/public",
  "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public",
  "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6c90dba3-97de-4654-ccba-a70677a7a300/public",
  "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public",
  "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1abfcd89-c693-4c59-0c1f-0aa35ab1e100/public",
  "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public",
  "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/53360e16-7ba3-4bae-ef62-721a86fdbd00/public",
  "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/3ea36a81-abc3-48b7-bf95-5dbddd664900/public",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/46fb99d0e_TSDroneHouseRoof.jpg",
  "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg",
];

const SPECS = [
  { label: "Total Acreage", value: "15 Acres" },
  { label: "USDA Veganic Farm", value: "3 Acres" },
  { label: "Buildable Acres", value: "7 Acres" },
  { label: "Main Residence", value: "8,519 SF" },
  { label: "Lower Level", value: "1,709 SF" },
  { label: "Structures", value: "6 Total" },
  { label: "Bedrooms", value: "6" },
  { label: "Bathrooms", value: "7" },
  { label: "Power", value: "1,200 Amps" },
  { label: "Solar Array", value: "14.3 kW" },
  { label: "Generator", value: "30 kW Kohler" },
  { label: "Geothermal Wells", value: "20 x 300 ft" },
  { label: "Golf Membership", value: "Pinehurst CC Signature" },
  { label: "Distance to Pinehurst", value: "3 Miles" },
];

const NAV_LINKS = ["Story", "Residence", "Estate", "Gallery", "Specifications", "Contact"];

export default function FlowFarmLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "#080c08", color: "#e8e4dc", fontFamily: "Georgia, serif", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,12,8,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(232,228,220,0.08)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8e4dc" }}>Flow Farm</div>
        <div style={{ display: "flex", gap: 32 }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(232,228,220,0.7)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#e8e4dc"}
              onMouseLeave={e => e.target.style.color = "rgba(232,228,220,0.7)"}
            >{link}</button>
          ))}
        </div>
        <a href="tel:+19105551234" style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(232,228,220,0.6)", textDecoration: "none", textTransform: "uppercase" }}>Inquire</a>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <iframe
            src={`https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&autopause=0`}
            style={{ width: "100%", height: "100%", border: "none", transform: "scale(1.05)" }}
            allow="autoplay; fullscreen"
            title="Flow Farm"
          />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,12,8,0.3) 0%, rgba(8,12,8,0.5) 60%, rgba(8,12,8,0.95) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(232,228,220,0.5)", marginBottom: 24 }}>107 Linden Trail &mdash; Aberdeen, NC</p>
          <h1 style={{ fontSize: "clamp(56px, 10vw, 110px)", fontWeight: 300, margin: "0 0 20px", letterSpacing: "0.05em", lineHeight: 1 }}>Flow Farm</h1>
          <p style={{ fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 300, color: "rgba(232,228,220,0.65)", margin: "0 0 16px" }}>$5,250,000</p>
          <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)" }}>Agritourism Established. Legacy Ready.</p>
          <button onClick={() => scrollTo("story")} style={{
            marginTop: 48, background: "transparent", border: "1px solid rgba(232,228,220,0.3)",
            color: "#e8e4dc", padding: "14px 40px", fontSize: 11, letterSpacing: "0.25em",
            textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.target.style.background = "rgba(232,228,220,0.1)"; e.target.style.borderColor = "rgba(232,228,220,0.6)"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(232,228,220,0.3)"; }}
          >Discover the Estate</button>
        </div>
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, rgba(232,228,220,0.4))", margin: "0 auto" }} />
        </div>
      </section>

      {/* STORY */}
      <section id="story" style={{ maxWidth: 860, margin: "0 auto", padding: "120px 40px" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 32 }}>The Opportunity</p>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, lineHeight: 1.2, marginBottom: 40, letterSpacing: "0.02em" }}>
          Flow Farm: A Foundation for What Comes Next.
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(232,228,220,0.7)", marginBottom: 28 }}>
          A rare convergence of land, architecture, and infrastructure. This private estate offers energy independence, favorable tax positioning, rare zoning flexibility, and enterprise potential &mdash; all within three miles of Pinehurst.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(232,228,220,0.7)", marginBottom: 28 }}>
          A living estate rooted in sustainability, elevated by state-of-the-art infrastructure and refined luxury. 15 acres total, with 3 acres of USDA-registered veganic farmland, 7 buildable acres, and 6 distinct structures designed for both private residence and scalable enterprise.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(232,228,220,0.7)" }}>
          The transferable Pinehurst Country Club Signature Golf Membership provides unlimited access to Course No. 7 and No. 9 &mdash; one of the most coveted amenities in the Sandhills.
        </p>
      </section>

      {/* DIVIDER */}
      <div style={{ maxWidth: 860, margin: "0 auto 0", padding: "0 40px" }}>
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(232,228,220,0.15), transparent)" }} />
      </div>

      {/* RESIDENCE */}
      <section id="residence" style={{ padding: "120px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 16, textAlign: "center" }}>Main Residence</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, textAlign: "center", marginBottom: 64, letterSpacing: "0.02em" }}>Designed by Robert E. Clark AIA</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg"
                alt="Flow Farm Main Residence"
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} />
            </div>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(232,228,220,0.7)", marginBottom: 24 }}>
                8,519 SF above grade with an additional 1,709 SF partially finished walk-out lower level. One of architect Robert E. Clark's final commissions &mdash; a landmark of craft and intention.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(232,228,220,0.7)", marginBottom: 40 }}>
                Reclaimed Civil War-era heart pine floors in custom-laid artisan patterns throughout. A glass-wrapped conservatory with 19.5' x 17.7' dimensions and octagonal skylight dome. Grand living room with 17-foot vaulted ceiling spanning 27.5' x 23.8'.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 32px" }}>
                {[
                  ["Bedrooms", "6"],
                  ["Bathrooms", "7"],
                  ["Main Level SF", "8,519"],
                  ["Lower Level SF", "1,709"],
                  ["Living Room Ceiling", "17 ft vaulted"],
                  ["Primary WIC", "11.7 x 21.7 ft"],
                ].map(([label, val]) => (
                  <div key={label} style={{ borderTop: "1px solid rgba(232,228,220,0.1)", paddingTop: 12 }}>
                    <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 4 }}>{label}</p>
                    <p style={{ fontSize: 15, color: "#e8e4dc" }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONSERVATORY FEATURE */}
      <section style={{ padding: "0 40px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
            {[
              "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public",
              "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1abfcd89-c693-4c59-0c1f-0aa35ab1e100/public",
              "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6482459c-9f90-4821-b6e3-043f45097500/public",
            ].map((url, i) => (
              <div key={i} style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => setLightbox(url)}>
                <img src={url} alt="Conservatory" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", transition: "transform 0.6s ease" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"} />
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,228,220,0.3)", marginTop: 20 }}>Glass Conservatory &mdash; Octagonal Skylight Dome</p>
        </div>
      </section>

      {/* ESTATE STRUCTURES */}
      <section id="estate" style={{ padding: "80px 40px 120px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 16, textAlign: "center" }}>The Estate</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, textAlign: "center", marginBottom: 16, letterSpacing: "0.02em" }}>Six Structures. One Vision.</h2>
          <p style={{ textAlign: "center", color: "rgba(232,228,220,0.5)", fontSize: 15, marginBottom: 64, maxWidth: 560, margin: "0 auto 64px" }}>15 acres of intentional design &mdash; built for privacy, productivity, and generational legacy.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 2 }}>
            {STRUCTURES.map((s) => (
              <div key={s.name} style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
                onClick={() => setLightbox(s.img)}>
                <img src={s.img} alt={s.name} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,12,8,0.9) 0%, rgba(8,12,8,0.2) 60%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24 }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,228,220,0.5)", marginBottom: 6 }}>{s.sf}</p>
                  <h3 style={{ fontSize: 20, fontWeight: 400, marginBottom: 8, color: "#e8e4dc" }}>{s.name}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(232,228,220,0.6)" }}>{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE HIGHLIGHT */}
      <section style={{ padding: "120px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 32 }}>Infrastructure</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, marginBottom: 48, letterSpacing: "0.02em" }}>Built for Energy Independence</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, marginBottom: 64 }}>
            {[
              { val: "1,200", unit: "Amps", desc: "Total electrical capacity" },
              { val: "14.3kW", unit: "Solar", desc: "61 Samsung panels + battery backup" },
              { val: "30kW", unit: "Generator", desc: "Kohler with dual 1,000-gal propane" },
            ].map(item => (
              <div key={item.val} style={{ borderTop: "1px solid rgba(232,228,220,0.1)", paddingTop: 24 }}>
                <p style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, color: "#e8e4dc", marginBottom: 4 }}>{item.val}</p>
                <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,228,220,0.5)", marginBottom: 8 }}>{item.unit}</p>
                <p style={{ fontSize: 13, color: "rgba(232,228,220,0.4)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(232,228,220,0.6)" }}>
            Five interconnected geothermal HVAC zones powered by 20 deep wells, each 300 feet deep. Two Water Furnace superheaters, Energy Recovery Ventilator, whole-house Control4 automation, and a Brown Safe vault. Every system engineered for off-grid resilience.
          </p>
        </div>
      </section>

      {/* MATTERPORT */}
      <section style={{ padding: "0 40px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 16, textAlign: "center" }}>Virtual Tour</p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 300, textAlign: "center", marginBottom: 40 }}>Experience Flow Farm</h2>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
            <iframe
              src="https://my.matterport.com/show/?m=xZRfSiQPuQ8&brand=0"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              allowFullScreen
              title="Flow Farm Virtual Tour"
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ padding: "80px 40px 120px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 16, textAlign: "center" }}>Gallery</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, textAlign: "center", marginBottom: 64 }}>The Estate in Detail</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 4 }}>
            {GALLERY.map((url, i) => (
              <div key={i} style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => setLightbox(url)}>
                <img src={url} alt={`Flow Farm ${i + 1}`}
                  style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section id="specifications" style={{ padding: "120px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 16, textAlign: "center" }}>By The Numbers</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, textAlign: "center", marginBottom: 64 }}>Specifications</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
            {SPECS.map(({ label, value }, i) => (
              <div key={label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "18px 0", borderBottom: "1px solid rgba(232,228,220,0.08)",
                paddingRight: i % 2 === 0 ? 40 : 0, paddingLeft: i % 2 === 1 ? 40 : 0,
              }}>
                <span style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(232,228,220,0.45)" }}>{label}</span>
                <span style={{ fontSize: 15, color: "#e8e4dc", textAlign: "right" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section style={{ padding: "0 40px 120px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 32 }}>Location</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, marginBottom: 24 }}>Private by Nature. Pinehurst by Proximity.</h2>
          <p style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(232,228,220,0.6)", marginBottom: 48 }}>
            Multiple points of access including primary entrance from Linden Trail and additional access via Linden Road, Mollie Lane, and Skene Lane. Private drive creates immediate separation and discretion. Moore County Regional Airport minutes away. Raleigh-Durham International one hour.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {[
              { place: "Pinehurst Village", dist: "3 Miles" },
              { place: "Moore County Airport", dist: "Minutes" },
              { place: "Raleigh-Durham", dist: "1 Hour" },
            ].map(item => (
              <div key={item.place} style={{ borderTop: "1px solid rgba(232,228,220,0.1)", paddingTop: 20 }}>
                <p style={{ fontSize: 15, color: "#e8e4dc", marginBottom: 6 }}>{item.place}</p>
                <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)" }}>{item.dist}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "80px 40px 120px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 16, textAlign: "center" }}>Private Inquiries</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, textAlign: "center", marginBottom: 16 }}>Request Information</h2>
          <p style={{ textAlign: "center", color: "rgba(232,228,220,0.5)", fontSize: 14, marginBottom: 48 }}>Rachel Hernandez &mdash; rachelhernandezrealtor@gmail.com</p>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <p style={{ fontSize: 18, color: "#e8e4dc", marginBottom: 12 }}>Thank you for your interest.</p>
              <p style={{ fontSize: 14, color: "rgba(232,228,220,0.5)" }}>We will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { key: "name", placeholder: "Full Name", type: "text" },
                { key: "email", placeholder: "Email Address", type: "email" },
                { key: "phone", placeholder: "Phone Number", type: "tel" },
              ].map(({ key, placeholder, type }) => (
                <input key={key} type={type} placeholder={placeholder} value={formData[key]}
                  onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                  style={{
                    background: "rgba(232,228,220,0.05)", border: "1px solid rgba(232,228,220,0.15)",
                    color: "#e8e4dc", padding: "14px 18px", fontSize: 14, outline: "none",
                    fontFamily: "Georgia, serif",
                  }} />
              ))}
              <textarea placeholder="Message or questions..." value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                style={{
                  background: "rgba(232,228,220,0.05)", border: "1px solid rgba(232,228,220,0.15)",
                  color: "#e8e4dc", padding: "14px 18px", fontSize: 14, outline: "none",
                  fontFamily: "Georgia, serif", resize: "vertical",
                }} />
              <button type="submit" style={{
                background: "transparent", border: "1px solid rgba(232,228,220,0.4)",
                color: "#e8e4dc", padding: "16px", fontSize: 11, letterSpacing: "0.25em",
                textTransform: "uppercase", cursor: "pointer", marginTop: 8, transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.target.style.background = "rgba(232,228,220,0.08)"; e.target.style.borderColor = "rgba(232,228,220,0.7)"; }}
                onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(232,228,220,0.4)"; }}
              >Submit Inquiry</button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px", borderTop: "1px solid rgba(232,228,220,0.08)", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,228,220,0.25)", marginBottom: 8 }}>Flow Farm &mdash; 107 Linden Trail, Aberdeen, NC</p>
        <p style={{ fontSize: 11, color: "rgba(232,228,220,0.2)" }}>Represented by Rachel Hernandez &mdash; rachelhernandezrealtor@gmail.com</p>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 999,
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 20,
        }}>
          <img src={lightbox} alt="Flow Farm" style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }} />
        </div>
      )}

    </div>
  );
}
