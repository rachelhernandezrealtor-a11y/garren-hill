with open('/app/pages/FlowFarmLanding2.jsx', 'r') as f:
    content = f.read()

start_marker = 'function EstateSection() {'
end_marker = 'function VideoSection()'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

new_section = r'''function EstateSection() {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);

  const PINS = [
    {
      label: "Main Residence",
      tag: "Robert Clark AIA",
      sf: "8,519 SF",
      top: "15%", left: "42%",
      desc: "6 beds, 7 baths. Reclaimed Civil War-era heart pine floors throughout. Glass conservatory with octagonal skylight dome. Sub-Zero + Wolf 60\" dual fuel kitchen with full scullery. Control4 smart home.",
      img: PHOTOS.exterior,
      systems: ["20 Geothermal Wells x 300 ft", "14.3 kW Solar + Battery Backup", "30kW Kohler Generator", "Control4 Audio/Video/Lighting", "5-Zone Water Furnace HVAC", "1,200 Amp Power", "Whole House Fire Sprinkler", "Commercial Water Filtration"],
      matterport: "https://my.matterport.com/show/?m=xZRfSiQPuQ8",
      color: "#BFA274",
    },
    {
      label: "Cabana House",
      tag: "Guest Retreat",
      sf: "Private Suite",
      top: "28%", left: "48%",
      desc: "Fully private guest retreat with 1 bed, 1 bath, full kitchen, and private entrance. Solar panels on roof. Connected to estate-wide geothermal, water filtration, and smart home systems.",
      img: PHOTOS.cabana,
      systems: ["Solar Panel Array", "Geothermal Connected", "Private Entrance", "Full Kitchen", "Campus Wi-Fi", "Water Filtration"],
      matterport: null,
      color: "#BFA274",
    },
    {
      label: "3-Acre Veganic Farm",
      tag: "USDA Agricultural",
      sf: "3 of 15 Acres",
      top: "55%", left: "32%",
      desc: "USDA-zoned veganic operation with certified organic practices. 1,400 ft double deer fence. 7 additional buildable acres with multiple road frontages. Agritourism eligible.",
      img: PHOTOS.grounds,
      systems: ["USDA Agricultural Zoning", "1,400 ft Double Deer Fence", "Private Well 50 gpm", "Closed-Loop Composting", "7 Buildable Acres", "Agritourism Eligible"],
      matterport: null,
      color: "#7BAE7F",
    },
    {
      label: "High Tunnel",
      tag: "Greenhouse 96 x 36 ft",
      sf: "Four Season Tools",
      top: "72%", left: "50%",
      desc: "Custom climate battery geothermal air-to-soil heating. Year-round specialty crop production including pineapples, avocados, and citrus.",
      img: PHOTOS.highTunnel,
      systems: ["Geothermal Air-to-Soil Heat", "Year-Round Production", "Pineapple + Avocado + Citrus", "Connected to Walk-In Cooler", "Four Season Tools Build"],
      matterport: null,
      color: "#7BAE7F",
    },
    {
      label: "Farm Workshop",
      tag: "Infrastructure Hub",
      sf: "30 x 40 ft",
      top: "82%", left: "52%",
      desc: "Fully operational with full plumbing, electrical, and 12x8 walk-in cooler. Central hub connecting high tunnel, compost, and biochar operations.",
      img: PHOTOS.workshop,
      systems: ["12x8 Walk-In Cooler", "Full Plumbing + Electrical", "I-Beam + Chain Hoist", "O2Compost Hub", "Biochar Kiln Access", "Deer Fence Perimeter"],
      matterport: null,
      color: "#BFA274",
    },
    {
      label: "Compost + Biochar",
      tag: "Regenerative Systems",
      sf: "Covered Structure",
      top: "85%", left: "58%",
      desc: "O2Compost aerated composting and biochar kiln under covered structure with I-beam and chain hoist. Fully closed-loop regenerative waste system feeding back to the veganic farm.",
      img: PHOTOS.compost,
      systems: ["O2Compost Aerated System", "Biochar Kiln", "I-Beam + Chain Hoist", "Closed-Loop Waste Mgmt", "Feeds Veganic Farm", "Covered Structure"],
      matterport: null,
      color: "#7BAE7F",
    },
  ];

  return (
    <section id="estate" style={{ background: "#000", padding: "8rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: GOLD, fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem", fontFamily: "sans-serif" }}>Six Structures</p>
          <h2 style={{ color: "#fff", fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 3.5vw, 3rem)", marginBottom: "0.75rem" }}>A Complete Private Estate</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "sans-serif", fontSize: "0.82rem", letterSpacing: "0.1em" }}>Click any structure to explore</p>
        </div>
      </div>

      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <img src={PHOTOS.aerial} alt="Flow Farm Estate Aerial" style={{ width: "100%", display: "block", height: "auto" }} />

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.65) 100%)" }} />

        <style>{`
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(191,162,116,0.6), 0 0 0 0 rgba(191,162,116,0.3); }
            70% { box-shadow: 0 0 0 8px rgba(191,162,116,0), 0 0 0 16px rgba(191,162,116,0); }
            100% { box-shadow: 0 0 0 0 rgba(191,162,116,0), 0 0 0 0 rgba(191,162,116,0); }
          }
          @keyframes pulsegn {
            0% { box-shadow: 0 0 0 0 rgba(123,174,127,0.6), 0 0 0 0 rgba(123,174,127,0.3); }
            70% { box-shadow: 0 0 0 8px rgba(123,174,127,0), 0 0 0 16px rgba(123,174,127,0); }
            100% { box-shadow: 0 0 0 0 rgba(123,174,127,0), 0 0 0 0 rgba(123,174,127,0); }
          }
          @keyframes cardIn {
            from { opacity: 0; transform: translateY(-50%) translateX(-12px); }
            to { opacity: 1; transform: translateY(-50%) translateX(0); }
          }
        `}</style>

        {PINS.map((pin, i) => (
          <div key={pin.label} style={{ position: "absolute", top: pin.top, left: pin.left, transform: "translate(-50%, -50%)", zIndex: 10 }}>
            <div
              onClick={() => setActive(active === i ? null : i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}
            >
              <div style={{
                width: active === i ? 18 : hovered === i ? 16 : 12,
                height: active === i ? 18 : hovered === i ? 16 : 12,
                borderRadius: "50%",
                background: pin.color,
                border: "2px solid rgba(255,255,255,0.9)",
                animation: active === i ? "none" : (pin.color === "#7BAE7F" ? "pulsegn 2s infinite" : "pulse 2s infinite"),
                transition: "all 0.2s",
                boxShadow: active === i ? ("0 0 20px " + pin.color + ", 0 0 40px " + pin.color + "44") : "none",
              }} />
              <div style={{
                background: active === i ? "rgba(191,162,116,0.15)" : "rgba(0,0,0,0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid " + (active === i ? pin.color : "rgba(255,255,255,0.2)"),
                padding: "0.25rem 0.6rem",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}>
                <span style={{ color: active === i ? pin.color : "rgba(255,255,255,0.85)", fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "sans-serif" }}>{pin.label}</span>
              </div>
            </div>
          </div>
        ))}

        {active !== null && (
          <div style={{
            position: "absolute", top: "50%", left: "2%",
            transform: "translateY(-50%)",
            width: 310,
            background: "rgba(6,6,6,0.82)",
            backdropFilter: "blur(28px) saturate(1.4)",
            border: "1px solid rgba(191,162,116,0.2)",
            boxShadow: "0 0 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
            zIndex: 30,
            overflow: "hidden",
            animation: "cardIn 0.25s ease-out",
          }}>
            <div style={{ position: "relative" }}>
              <img src={PINS[active].img} alt={PINS[active].label} style={{ width: "100%", height: 155, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(6,6,6,0.9) 100%)" }} />
              <div style={{ position: "absolute", bottom: "0.75rem", left: "1.25rem" }}>
                <p style={{ color: PINS[active].color, fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "0.2rem" }}>{PINS[active].tag}</p>
                <h3 style={{ color: "#fff", fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "1.15rem" }}>{PINS[active].label}</h3>
              </div>
            </div>
            <div style={{ padding: "1.1rem 1.25rem 1.25rem" }}>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.76rem", lineHeight: 1.75, fontFamily: "sans-serif", marginBottom: "1rem" }}>{PINS[active].desc}</p>
              <p style={{ color: "rgba(191,162,116,0.5)", fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "0.55rem" }}>Connected Systems</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: PINS[active].matterport ? "1rem" : 0 }}>
                {PINS[active].systems.map(s => (
                  <span key={s} style={{
                    background: "rgba(191,162,116,0.07)",
                    border: "1px solid rgba(191,162,116,0.18)",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "0.58rem",
                    padding: "0.2rem 0.5rem",
                    fontFamily: "sans-serif",
                    letterSpacing: "0.04em",
                  }}>{s}</span>
                ))}
              </div>
              {PINS[active].matterport && (
                <a href={PINS[active].matterport} target="_blank" rel="noopener noreferrer" style={{
                  display: "block", width: "100%", marginTop: "1rem",
                  background: "linear-gradient(135deg, rgba(191,162,116,0.12), rgba(191,162,116,0.04))",
                  border: "1px solid " + GOLD,
                  color: GOLD, padding: "0.6rem", fontSize: "0.6rem",
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  cursor: "pointer", fontFamily: "sans-serif",
                  textDecoration: "none", textAlign: "center", boxSizing: "border-box",
                  transition: "all 0.2s",
                }}>Launch Virtual 3D Tour</a>
              )}
            </div>
            <button onClick={() => setActive(null)} style={{
              position: "absolute", top: "0.6rem", right: "0.6rem",
              background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)", width: 26, height: 26,
              cursor: "pointer", fontSize: "0.8rem",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>x</button>
          </div>
        )}
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
          {PINS.map((pin, i) => (
            <button key={pin.label} onClick={() => setActive(active === i ? null : i)} style={{
              background: active === i ? "rgba(191,162,116,0.12)" : "transparent",
              border: "1px solid " + (active === i ? GOLD : "rgba(255,255,255,0.15)"),
              color: active === i ? GOLD : "rgba(255,255,255,0.4)",
              padding: "0.4rem 0.9rem", fontSize: "0.58rem", letterSpacing: "0.15em",
              textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif",
              transition: "all 0.2s",
            }}>{pin.label}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

'''

new_content = content[:start_idx] + new_section + content[end_idx:]
with open('/app/pages/FlowFarmLanding2.jsx', 'w') as f:
    f.write(new_content)
print("SUCCESS")
