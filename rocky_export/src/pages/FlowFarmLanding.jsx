import { useState, useEffect } from "react";

const VIMEO_ID = "1171394707";

const STRUCTURES = [
  {
    name: "Main Residence",
    sf: "8,519 SF",
    detail: "6 bed / 7 bath. Architect Robert E. Clark AIA. Reclaimed Civil War-era heart pine floors, glass conservatory with octagonal skylight dome, Sub-Zero & Wolf kitchen, geothermal, 30kW generator, 14.3kW solar, Control4 smart home.",
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
  "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/c8ebe094-9daf-4314-12b3-88a9c3503d00/public",
  "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/7581b09c-9215-4bf9-73da-6b220e9b6400/public",
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

const glass = {
  background: "rgba(232,228,220,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(232,228,220,0.1)",
};

const glassStrong = {
  background: "rgba(232,228,220,0.06)",
  backdropFilter: "blur(32px)",
  WebkitBackdropFilter: "blur(32px)",
  border: "1px solid rgba(232,228,220,0.12)",
};

export default function FlowFarmLanding() {
  const [scrolled, setScrolled] = useState(false);
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
  };

  return (
    <div style={{ background: "#060a06", color: "#e8e4dc", fontFamily: "Georgia, serif", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "18px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(6,10,6,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(232,228,220,0.08)" : "none",
        transition: "all 0.5s ease",
      }}>
        <div style={{ fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: "#e8e4dc", fontWeight: 400 }}>Flow Farm</div>
        <div style={{ display: "flex", gap: 36 }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(232,228,220,0.6)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", transition: "color 0.3s", padding: 0 }}
              onMouseEnter={e => e.target.style.color = "#e8e4dc"}
              onMouseLeave={e => e.target.style.color = "rgba(232,228,220,0.6)"}
            >{link}</button>
          ))}
        </div>
        <button onClick={() => scrollTo("contact")} style={{
          ...glass,
          color: "#e8e4dc", padding: "8px 24px", fontSize: 10, letterSpacing: "0.2em",
          textTransform: "uppercase", cursor: "pointer", border: "1px solid rgba(232,228,220,0.2)",
          transition: "all 0.3s", fontFamily: "Georgia, serif",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,228,220,0.1)"; e.currentTarget.style.borderColor = "rgba(232,228,220,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(232,228,220,0.04)"; e.currentTarget.style.borderColor = "rgba(232,228,220,0.2)"; }}
        >Private Inquiry</button>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <iframe
            src={`https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&autopause=0`}
            style={{ width: "100%", height: "100%", border: "none", transform: "scale(1.06)" }}
            allow="autoplay; fullscreen"
            title="Flow Farm"
          />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,10,6,0.25) 0%, rgba(6,10,6,0.45) 50%, rgba(6,10,6,1) 100%)", zIndex: 1 }} />

        {/* Floating hero card */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "56px 72px", ...glassStrong, maxWidth: 640 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(232,228,220,0.45)", marginBottom: 28, margin: "0 0 28px" }}>107 Linden Trail &mdash; Aberdeen, NC</p>
          <h1 style={{ fontSize: "clamp(52px, 9vw, 96px)", fontWeight: 300, margin: "0 0 16px", letterSpacing: "0.06em", lineHeight: 1 }}>Flow Farm</h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 300, color: "rgba(232,228,220,0.6)", margin: "0 0 12px" }}>$5,250,000</p>
          <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(232,228,220,0.35)", margin: "0 0 40px" }}>Agritourism Established. Legacy Ready.</p>
          <button onClick={() => scrollTo("story")} style={{
            background: "transparent", border: "1px solid rgba(232,228,220,0.35)",
            color: "#e8e4dc", padding: "13px 42px", fontSize: 10, letterSpacing: "0.28em",
            textTransform: "uppercase", cursor: "pointer", transition: "all 0.4s", fontFamily: "Georgia, serif",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,228,220,0.08)"; e.currentTarget.style.borderColor = "rgba(232,228,220,0.7)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(232,228,220,0.35)"; }}
          >Discover the Estate</button>
        </div>

        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
          <div style={{ width: 1, height: 52, background: "linear-gradient(to bottom, transparent, rgba(232,228,220,0.35))" }} />
        </div>
      </section>

      {/* STORY */}
      <section id="story" style={{ padding: "140px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Floating glass text card */}
          <div style={{ ...glass, padding: "64px 72px" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(232,228,220,0.35)", marginBottom: 32 }}>The Opportunity</p>
            <h2 style={{ fontSize: "clamp(30px, 4.5vw, 50px)", fontWeight: 300, lineHeight: 1.15, marginBottom: 40, letterSpacing: "0.02em" }}>
              Flow Farm: A Foundation<br />for What Comes Next.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, color: "rgba(232,228,220,0.65)", marginBottom: 24 }}>
              A rare convergence of land, architecture, and infrastructure. This private estate offers energy independence, favorable tax positioning, rare zoning flexibility, and enterprise potential &mdash; all within three miles of Pinehurst.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, color: "rgba(232,228,220,0.65)", marginBottom: 24 }}>
              A living estate rooted in sustainability, elevated by state-of-the-art infrastructure and refined luxury. 15 acres total, with 3 acres of USDA-registered veganic farmland, 7 buildable acres, and 6 distinct structures designed for both private residence and scalable enterprise.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, color: "rgba(232,228,220,0.65)", margin: 0 }}>
              The transferable Pinehurst Country Club Signature Golf Membership provides unlimited access to Course No. 7 and No. 9 &mdash; one of the most coveted amenities in the Sandhills.
            </p>
          </div>
        </div>
      </section>

      {/* FULL BLEED IMAGE BREAK */}
      <div style={{ position: "relative", height: "55vh", overflow: "hidden" }}>
        <img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg"
          alt="Flow Farm Estate"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,10,6,0.5), rgba(6,10,6,0.3), rgba(6,10,6,0.7))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontSize: "clamp(13px, 2vw, 18px)", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(232,228,220,0.7)", textAlign: "center" }}>15 Acres &mdash; 6 Structures &mdash; 3 Miles from Pinehurst</p>
        </div>
      </div>

      {/* RESIDENCE */}
      <section id="residence" style={{ padding: "140px 48px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(232,228,220,0.35)", marginBottom: 16, textAlign: "center" }}>Main Residence</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, textAlign: "center", marginBottom: 72, letterSpacing: "0.03em" }}>Designed by Robert E. Clark AIA</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "start" }}>
            <div>
              <img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg"
                alt="Flow Farm Main Residence"
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, marginTop: 2 }}>
                {[
                  "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public",
                  "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/ada10c6f-d704-40ce-10e5-58d25e101200/public",
                  "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6c90dba3-97de-4654-ccba-a70677a7a300/public",
                ].map((url, i) => (
                  <div key={i} style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => setLightbox(url)}>
                    <img src={url} alt="" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...glass, padding: "48px 40px", height: "fit-content" }}>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(232,228,220,0.65)", marginBottom: 20 }}>
                8,519 SF above grade with 1,709 SF partially finished walk-out lower level. One of Robert E. Clark's final commissions &mdash; a landmark of craft and intention in the North Carolina Sandhills.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(232,228,220,0.65)", marginBottom: 36 }}>
                Reclaimed Civil War-era heart pine floors in custom artisan patterns throughout. Grand living room with 17-foot vaulted ceiling. Glass-wrapped conservatory with octagonal skylight dome.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 24px" }}>
                {[
                  ["Bedrooms", "6"],
                  ["Bathrooms", "7"],
                  ["Main Level", "8,519 SF"],
                  ["Lower Level", "1,709 SF"],
                  ["Living Rm Ceiling", "17 ft vaulted"],
                  ["Primary WIC", "11.7 x 21.7 ft"],
                ].map(([label, val]) => (
                  <div key={label} style={{ borderTop: "1px solid rgba(232,228,220,0.1)", paddingTop: 14 }}>
                    <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(232,228,220,0.35)", marginBottom: 5 }}>{label}</p>
                    <p style={{ fontSize: 15, color: "#e8e4dc", margin: 0 }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONSERVATORY */}
      <section style={{ padding: "0 48px 140px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3 }}>
            {[
              "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public",
              "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1abfcd89-c693-4c59-0c1f-0aa35ab1e100/public",
              "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6482459c-9f90-4821-b6e3-043f45097500/public",
            ].map((url, i) => (
              <div key={i} style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => setLightbox(url)}>
                <img src={url} alt="Conservatory" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "transform 0.6s" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"} />
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(232,228,220,0.28)", marginTop: 20 }}>
            Glass Conservatory &mdash; 19.5 x 17.7 ft &mdash; Octagonal Skylight Dome
          </p>
        </div>
      </section>

      {/* ESTATE STRUCTURES */}
      <section id="estate" style={{ padding: "100px 48px 140px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(232,228,220,0.015)" }} />
        <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(232,228,220,0.35)", marginBottom: 16, textAlign: "center" }}>The Estate</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, textAlign: "center", marginBottom: 16, letterSpacing: "0.03em" }}>Six Structures. One Vision.</h2>
          <p style={{ textAlign: "center", color: "rgba(232,228,220,0.45)", fontSize: 15, maxWidth: 520, margin: "0 auto 72px", lineHeight: 1.7 }}>
            15 acres of intentional design &mdash; built for privacy, productivity, and generational legacy.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 3 }}>
            {STRUCTURES.map((s) => (
              <div key={s.name} style={{ position: "relative", overflow: "hidden", cursor: "pointer" }} onClick={() => setLightbox(s.img)}>
                <img src={s.img} alt={s.name} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "transform 0.7s ease" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,10,6,0.92) 0%, rgba(6,10,6,0.15) 55%, transparent 100%)" }} />
                {/* Floating glass label */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 28px" }}>
                  <div style={{ ...glass, padding: "20px 24px", border: "1px solid rgba(232,228,220,0.1)" }}>
                    <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,228,220,0.45)", marginBottom: 6 }}>{s.sf}</p>
                    <h3 style={{ fontSize: 18, fontWeight: 400, marginBottom: 8, color: "#e8e4dc", margin: "0 0 8px" }}>{s.name}</h3>
                    <p style={{ fontSize: 12, lineHeight: 1.65, color: "rgba(232,228,220,0.55)", margin: 0 }}>{s.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section style={{ padding: "140px 48px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(232,228,220,0.35)", marginBottom: 16, textAlign: "center" }}>Infrastructure</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, textAlign: "center", marginBottom: 72, letterSpacing: "0.03em" }}>Built for Energy Independence</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3, marginBottom: 3 }}>
            {[
              { val: "1,200", unit: "Amps", desc: "Total electrical capacity across the estate" },
              { val: "14.3kW", unit: "Solar", desc: "61 Samsung panels with battery backup" },
              { val: "30kW", unit: "Generator", desc: "Kohler with dual 1,000-gallon propane tanks" },
            ].map(item => (
              <div key={item.val} style={{ ...glass, padding: "40px 32px", textAlign: "center" }}>
                <p style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#e8e4dc", margin: "0 0 6px" }}>{item.val}</p>
                <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", margin: "0 0 12px" }}>{item.unit}</p>
                <p style={{ fontSize: 13, color: "rgba(232,228,220,0.4)", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 3 }}>
            {[
              { val: "20", unit: "Geothermal Wells", desc: "Each 300 ft deep  -  5 interconnected HVAC zones" },
              { val: "Control4", unit: "Smart Home", desc: "Full audio, video, lighting + Araknis enterprise networking" },
            ].map(item => (
              <div key={item.val} style={{ ...glass, padding: "32px", textAlign: "center" }}>
                <p style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 300, color: "#e8e4dc", margin: "0 0 6px" }}>{item.val}</p>
                <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", margin: "0 0 10px" }}>{item.unit}</p>
                <p style={{ fontSize: 13, color: "rgba(232,228,220,0.4)", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATTERPORT */}
      <section style={{ padding: "0 48px 140px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(232,228,220,0.35)", marginBottom: 16, textAlign: "center" }}>Virtual Tour</p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 300, textAlign: "center", marginBottom: 48, letterSpacing: "0.03em" }}>Experience Flow Farm</h2>
          <div style={{ ...glass, padding: 3 }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
              <iframe
                src="https://my.matterport.com/show/?m=xZRfSiQPuQ8&brand=0"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allowFullScreen
                title="Flow Farm Virtual Tour"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ padding: "100px 48px 140px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(232,228,220,0.015)" }} />
        <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(232,228,220,0.35)", marginBottom: 16, textAlign: "center" }}>Gallery</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, textAlign: "center", marginBottom: 72, letterSpacing: "0.03em" }}>The Estate in Detail</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 3 }}>
            {GALLERY.map((url, i) => (
              <div key={i} style={{ overflow: "hidden", cursor: "pointer", position: "relative" }} onClick={() => setLightbox(url)}>
                <img src={url} alt={`Flow Farm ${i + 1}`}
                  style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section id="specifications" style={{ padding: "140px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(232,228,220,0.35)", marginBottom: 16, textAlign: "center" }}>By The Numbers</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, textAlign: "center", marginBottom: 64, letterSpacing: "0.03em" }}>Specifications</h2>
          <div style={{ ...glass, padding: "48px 56px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              {SPECS.map(({ label, value }, i) => (
                <div key={label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "16px 0", borderBottom: "1px solid rgba(232,228,220,0.07)",
                  paddingRight: i % 2 === 0 ? 48 : 0, paddingLeft: i % 2 === 1 ? 48 : 0,
                  borderRight: i % 2 === 0 ? "1px solid rgba(232,228,220,0.07)" : "none",
                }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(232,228,220,0.38)" }}>{label}</span>
                  <span style={{ fontSize: 14, color: "#e8e4dc" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section style={{ padding: "0 48px 140px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/46fb99d0e_TSDroneHouseRoof.jpg"
              alt="Flow Farm Aerial"
              style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(6,10,6,0.85) 0%, rgba(6,10,6,0.3) 60%, rgba(6,10,6,0.6) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 72px" }}>
              <div style={{ maxWidth: 480 }}>
                <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 20 }}>Location</p>
                <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 300, marginBottom: 20, lineHeight: 1.2 }}>Private by Nature.<br />Pinehurst by Proximity.</h2>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(232,228,220,0.6)", marginBottom: 32 }}>
                  Multiple points of access including primary entrance from Linden Trail and additional access via Linden Road, Mollie Lane, and Skene Lane.
                </p>
                <div style={{ display: "flex", gap: 32 }}>
                  {[
                    { place: "Pinehurst Village", dist: "3 mi" },
                    { place: "Moore County Airport", dist: "Nearby" },
                    { place: "RDU", dist: "1 hr" },
                  ].map(item => (
                    <div key={item.place}>
                      <p style={{ fontSize: 14, color: "#e8e4dc", marginBottom: 4 }}>{item.dist}</p>
                      <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(232,228,220,0.35)" }}>{item.place}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 48px 140px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(232,228,220,0.015)" }} />
        <div style={{ maxWidth: 580, margin: "0 auto", position: "relative" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(232,228,220,0.35)", marginBottom: 16, textAlign: "center" }}>Private Inquiries</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 300, textAlign: "center", marginBottom: 12, letterSpacing: "0.03em" }}>Request Information</h2>
          <p style={{ textAlign: "center", color: "rgba(232,228,220,0.4)", fontSize: 13, marginBottom: 48, letterSpacing: "0.05em" }}>Rachel Hernandez &mdash; rachelhernandezrealtor@gmail.com</p>
          <div style={{ ...glassStrong, padding: "52px 48px" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <p style={{ fontSize: 18, color: "#e8e4dc", marginBottom: 12 }}>Thank you for your interest.</p>
                <p style={{ fontSize: 14, color: "rgba(232,228,220,0.5)" }}>We will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { key: "name", placeholder: "Full Name", type: "text" },
                  { key: "email", placeholder: "Email Address", type: "email" },
                  { key: "phone", placeholder: "Phone Number", type: "tel" },
                ].map(({ key, placeholder, type }) => (
                  <input key={key} type={type} placeholder={placeholder} value={formData[key]}
                    onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                    style={{
                      background: "rgba(232,228,220,0.04)", border: "1px solid rgba(232,228,220,0.12)",
                      color: "#e8e4dc", padding: "14px 18px", fontSize: 14, outline: "none",
                      fontFamily: "Georgia, serif", transition: "border-color 0.3s",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(232,228,220,0.35)"}
                    onBlur={e => e.target.style.borderColor = "rgba(232,228,220,0.12)"} />
                ))}
                <textarea placeholder="Message or questions..." value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  style={{
                    background: "rgba(232,228,220,0.04)", border: "1px solid rgba(232,228,220,0.12)",
                    color: "#e8e4dc", padding: "14px 18px", fontSize: 14, outline: "none",
                    fontFamily: "Georgia, serif", resize: "vertical", transition: "border-color 0.3s",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(232,228,220,0.35)"}
                  onBlur={e => e.target.style.borderColor = "rgba(232,228,220,0.12)"} />
                <button type="submit" style={{
                  background: "transparent", border: "1px solid rgba(232,228,220,0.3)",
                  color: "#e8e4dc", padding: "16px", fontSize: 10, letterSpacing: "0.28em",
                  textTransform: "uppercase", cursor: "pointer", marginTop: 8, transition: "all 0.3s", fontFamily: "Georgia, serif",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,228,220,0.07)"; e.currentTarget.style.borderColor = "rgba(232,228,220,0.6)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(232,228,220,0.3)"; }}
                >Submit Inquiry</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 48px", borderTop: "1px solid rgba(232,228,220,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,228,220,0.2)" }}>Flow Farm</p>
        <p style={{ fontSize: 11, color: "rgba(232,228,220,0.2)" }}>107 Linden Trail, Aberdeen, NC &mdash; $5,250,000</p>
        <p style={{ fontSize: 11, color: "rgba(232,228,220,0.2)" }}>Rachel Hernandez</p>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.94)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 24,
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        }}>
          <img src={lightbox} alt="Flow Farm" style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }} />
          <div style={{ position: "absolute", top: 24, right: 32, fontSize: 28, color: "rgba(232,228,220,0.5)", fontWeight: 300 }}>x</div>
        </div>
      )}

    </div>
  );
}
