import { useState, useEffect } from "react";

const STATS = [
  { value: "15", label: "Acres" },
  { value: "8,519", label: "Sq Ft Main Residence" },
  { value: "6", label: "Structures" },
  { value: "1,200", label: "Amps Total Power" },
];

const FEATURES = [
  { title: "Glass Conservatory", desc: "19.5 x 17.7ft glass-wrapped sanctuary with octagonal skylight dome" },
  { title: "Geothermal System", desc: "20 deep wells, each 300 feet, powering five interconnected HVAC zones" },
  { title: "14.3 kW Solar Array", desc: "61 Samsung panels with Sunny Island battery backup system" },
  { title: "Gourmet Kitchen", desc: "Sub-Zero, Wolf 60\" dual fuel stove, scullery, and two KitchenAid dishwashers" },
  { title: "Control4 Smart Home", desc: "Whole-home audio, video, lighting and Araknis enterprise networking" },
  { title: "30 kW Generator", desc: "Kohler generator with two 1,000-gallon buried propane tanks" },
];

const STRUCTURES = [
  { name: "Main Residence", detail: "8,519 SF | 6 beds | 7 baths", img: "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg" },
  { name: "Cabana House", detail: "Private guest retreat | 1 bed | 1 bath | full kitchen", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg" },
  { name: "High Tunnel Greenhouse", detail: "96x36ft | Custom geothermal climate control", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg" },
  { name: "Farm Workshop", detail: "30x40ft | Plumbing | Electrical | Walk-in cooler", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg" },
  { name: "Compost System", detail: "O2Compost | Regenerative waste management", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/983e028f7_CompostingandBioChar.jpg" },
  { name: "Biochar Area", detail: "Covered structure | I-Beam and chain hoist", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/983e028f7_CompostingandBioChar.jpg" },
];

export default function FlowFarmHome() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#080c08", color: "#e8e4dc", fontFamily: "Georgia, serif", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,12,8,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.4s ease"
      }}>
        <div style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase" }}>Flow Farm</div>
        <div style={{ display: "flex", gap: 40 }}>
          {["The Estate", "The Land", "Infrastructure", "Inquire"].map(link => (
            <span key={link} style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(232,228,220,0.7)", cursor: "pointer" }}>{link}</span>
          ))}
        </div>
      </nav>

      {/* HERO - photo background */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <img
          src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg"
          alt="Flow Farm"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }}
        />
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: "linear-gradient(to bottom, rgba(8,12,8,0.2) 0%, rgba(8,12,8,0.15) 40%, rgba(8,12,8,0.8) 100%)"
        }} />
        <div style={{ position: "absolute", bottom: "12%", left: "8%", zIndex: 3, maxWidth: 680 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,228,220,0.6)", marginBottom: 20 }}>
            107 Linden Trail - Aberdeen, NC
          </div>
          <h1 style={{ fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 300, lineHeight: 1.1, margin: "0 0 24px" }}>
            Agritourism Established.<br />Legacy Ready.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(232,228,220,0.8)", maxWidth: 520, marginBottom: 36 }}>
            A rare convergence of land, architecture, and infrastructure. Energy independence, favorable tax positioning, and a transferable Pinehurst Country Club Signature Golf Membership.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <button style={{
              padding: "14px 32px", background: "transparent",
              border: "1px solid rgba(232,228,220,0.6)", color: "#e8e4dc",
              fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer"
            }}>View Gallery</button>
            <button style={{
              padding: "14px 32px", background: "rgba(232,228,220,0.08)",
              border: "1px solid rgba(232,228,220,0.2)", color: "rgba(232,228,220,0.8)",
              fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer"
            }}>Private Inquiry</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "10%", right: "6%", zIndex: 3, fontSize: 24, fontWeight: 300, letterSpacing: "0.05em" }}>
          $5,250,000
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            padding: "40px 32px", textAlign: "center",
            borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none"
          }}>
            <div style={{ fontSize: 36, fontWeight: 300, marginBottom: 8 }}>{s.value}</div>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,228,220,0.5)" }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* INTRO */}
      <section style={{ padding: "120px 8%", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 24 }}>The Estate</div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 300, lineHeight: 1.2, marginBottom: 32 }}>
              A Foundation for What Comes Next
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(232,228,220,0.7)", marginBottom: 24 }}>
              A living estate rooted in sustainability, elevated by state-of-the-art infrastructure and refined luxury. Designed by Robert E. Clark AIA of Pinehurst - one of his final and most personal works.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(232,228,220,0.7)" }}>
              Reclaimed Civil War-era heart pine floors, custom-laid in artisan patterns throughout every bedroom, hallway, and closet. A glass conservatory with octagonal skylight dome. Six structures across 15 curated acres.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg"
              alt="Flow Farm Estate"
              style={{ width: "100%", height: 480, objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", bottom: -24, left: -24,
              background: "rgba(8,12,8,0.92)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "20px 28px"
            }}>
              <div style={{ fontSize: 11, color: "rgba(232,228,220,0.5)", letterSpacing: "0.1em", marginBottom: 4 }}>ARCHITECT</div>
              <div style={{ fontSize: 14 }}>Robert E. Clark AIA</div>
              <div style={{ fontSize: 11, color: "rgba(232,228,220,0.5)", marginTop: 2 }}>Pinehurst, NC</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "80px 8%", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 16 }}>Infrastructure</div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, marginBottom: 60 }}>Built for Independence</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(255,255,255,0.06)" }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ padding: "40px 36px", background: "#080c08" }}>
                <h3 style={{ fontSize: 16, fontWeight: 400, marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(232,228,220,0.55)", margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRUCTURES */}
      <section style={{ padding: "100px 8%" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 16 }}>The Compound</div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, marginBottom: 60 }}>Six Structures. One Vision.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {STRUCTURES.map((s, i) => (
              <div key={i} style={{ position: "relative", overflow: "hidden" }}>
                <img src={s.img} alt={s.name} style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(to top, rgba(8,12,8,0.95) 0%, transparent 100%)",
                  padding: "40px 20px 20px"
                }}>
                  <div style={{ fontSize: 15, fontWeight: 400, marginBottom: 4 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(232,228,220,0.55)" }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOLF */}
      <section style={{ padding: "100px 8%", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 24 }}>Included</div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 42px)", fontWeight: 300, lineHeight: 1.3, marginBottom: 24 }}>
            Pinehurst Country Club<br />Signature Golf Membership
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(232,228,220,0.65)" }}>
            Transferable membership with unlimited access to the legendary Course No. 7 and Course No. 9. One of the most coveted memberships in American golf - included with the estate.
          </p>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(232,228,220,0.35)", marginTop: 32 }}>
            3 Miles from Pinehurst Village
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section style={{ padding: "100px 8%" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 24 }}>Location</div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, lineHeight: 1.3, marginBottom: 32 }}>
              Private by Nature.<br />Pinehurst by Proximity.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(232,228,220,0.65)", marginBottom: 32 }}>
              Multiple points of access including primary entrance from Linden Trail and additional access via Linden Road, Mollie Lane, and Skene Lane. Private drive creates immediate separation and discretion.
            </p>
            {["Moore County Regional Airport - private aviation", "Raleigh-Durham International - 1 hour", "FirstHealth Moore Regional Hospital - nearby", "Historic Village of Pinehurst - 3 miles"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <div style={{ width: 24, height: 1, background: "rgba(232,228,220,0.3)", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "rgba(232,228,220,0.6)" }}>{item}</span>
              </div>
            ))}
          </div>
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/46fb99d0e_TSDroneHouseRoof.jpg"
            alt="Flow Farm Aerial"
            style={{ width: "100%", height: 500, objectFit: "cover", display: "block" }}
          />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "120px 8%", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", marginBottom: 24 }}>Private Inquiry</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 300, marginBottom: 20 }}>Begin the Conversation</h2>
        <p style={{ fontSize: 15, color: "rgba(232,228,220,0.55)", marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
          This offering is presented exclusively. Private viewings available by appointment.
        </p>
        <a href="mailto:rachelhernandezrealtor@gmail.com" style={{
          display: "inline-block", padding: "18px 52px", background: "transparent",
          border: "1px solid rgba(232,228,220,0.4)", color: "#e8e4dc",
          fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
          textDecoration: "none"
        }}>Request Private Viewing</a>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "40px 8%", borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}>Flow Farm</div>
        <div style={{ fontSize: 11, color: "rgba(232,228,220,0.35)" }}>107 Linden Trail, Aberdeen, NC | $5,250,000</div>
        <div style={{ fontSize: 11, color: "rgba(232,228,220,0.35)" }}>Rachel Hernandez</div>
      </footer>

    </div>
  );
}
