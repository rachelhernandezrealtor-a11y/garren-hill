with open('/app/pages/FlowFarmLanding2.jsx', 'r') as f:
    content = f.read()

start_marker = 'function EstateSection() {'
end_marker = 'function VideoSection()'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

print(f"start={start_idx}, end={end_idx}")

new_section = r'''function EstateSection() {
  const [active, setActive] = useState(null);

  const PINS = [
    {
      label: "Main Residence",
      tag: "Robert Clark AIA",
      sf: "8,519 SF",
      top: "38%", left: "40%",
      desc: "6 beds, 7 baths. Reclaimed Civil War-era heart pine floors. Glass conservatory with octagonal skylight dome. Sub-Zero + Wolf 60\" kitchen. Geothermal HVAC. 30kW generator. 14.3kW solar. Control4 smart home.",
      img: PHOTOS.exterior,
      systems: ["20 Geothermal Wells", "14.3 kW Solar Array", "Control4 Smart Home"],
      matterport: "https://my.matterport.com/show/?m=xZRfSiQPuQ8",
    },
    {
      label: "Cabana House",
      tag: "Guest Retreat",
      sf: "Private Suite",
      top: "55%", left: "60%",
      desc: "Fully private guest retreat with 1 bed, 1 bath, full kitchen, and private entrance. Complete separation from the main residence.",
      img: PHOTOS.cabana,
      systems: ["Private Entrance", "Full Kitchen", "1 Bed / 1 Bath"],
      matterport: null,
    },
    {
      label: "3-Acre Veganic Farm",
      tag: "USDA Agricultural",
      sf: "3 of 15 Acres",
      top: "20%", left: "28%",
      desc: "USDA-zoned veganic operation with certified organic practices. 7 additional buildable acres. All farm infrastructure and systems transfer.",
      img: PHOTOS.grounds,
      systems: ["USDA Zoned", "Certified Organic", "7 Buildable Acres"],
      matterport: null,
    },
    {
      label: "High Tunnel",
      tag: "Greenhouse",
      sf: "96 x 36 ft",
      top: "22%", left: "62%",
      desc: "Custom climate battery geothermal heating. Year-round specialty crops including pineapples, avocados, and citrus. Four Season Tools construction.",
      img: PHOTOS.highTunnel,
      systems: ["Geothermal Climate Battery", "Year-Round Production", "Specialty Crops"],
      matterport: null,
    },
    {
      label: "Farm Workshop",
      tag: "Infrastructure",
      sf: "30 x 40 ft",
      top: "68%", left: "70%",
      desc: "Fully operational with plumbing, electrical, and walk-in cooler. 1,400ft double deer fencing enclosing 3 certified acres.",
      img: PHOTOS.workshop,
      systems: ["Walk-In Cooler", "Full Plumbing", "1,400 ft Deer Fence"],
      matterport: null,
    },
    {
      label: "Compost + Biochar",
      tag: "Regenerative Systems",
      sf: "Covered Structure",
      top: "75%", left: "52%",
      desc: "O2Compost aerated system and biochar kiln under covered structure with I-beam and chain hoist. Closed-loop regenerative waste management.",
      img: PHOTOS.compost,
      systems: ["O2Compost System", "Biochar Kiln", "I-Beam + Chain Hoist"],
      matterport: null,
    },
  ];

  return (
    <section id="estate" style={{ background: "#0d0d0d", padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: GOLD, fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem", fontFamily: "sans-serif" }}>Six Structures</p>
          <h2 style={{ color: "#fff", fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>A Complete Private Estate</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "1rem", fontFamily: "sans-serif", fontSize: "0.85rem" }}>Click any pin to explore each structure</p>
        </div>
        <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
          <img src={PHOTOS.grounds} alt="Flow Farm Aerial" style={{ width: "100%", display: "block", maxHeight: 620, objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />
          {PINS.map((pin, i) => (
            <div key={pin.label} style={{ position: "absolute", top: pin.top, left: pin.left, transform: "translate(-50%, -50%)", zIndex: 10 }}>
              <div onClick={() => setActive(active === i ? null : i)} style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
                <div style={{
                  width: 14, height: 14, borderRadius: "50%",
                  background: active === i ? GOLD : "rgba(191,162,116,0.85)",
                  border: "2px solid #fff",
                  boxShadow: active === i ? "0 0 0 6px rgba(191,162,116,0.3)" : "0 0 0 3px rgba(191,162,116,0.15)",
                  transition: "all 0.2s",
                }} />
                <div style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(191,162,116,0.4)", padding: "0.3rem 0.6rem", whiteSpace: "nowrap" }}>
                  <span style={{ color: "#fff", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "sans-serif" }}>{pin.label}</span>
                </div>
              </div>
            </div>
          ))}
          {active !== null && (
            <div style={{
              position: "absolute", top: "50%", left: "2%", transform: "translateY(-50%)",
              width: 300, background: "rgba(10,10,10,0.92)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(191,162,116,0.25)", zIndex: 20, overflow: "hidden",
            }}>
              <img src={PINS[active].img} alt={PINS[active].label} style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }} />
              <div style={{ padding: "1.25rem" }}>
                <p style={{ color: GOLD, fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "0.3rem" }}>{PINS[active].tag}</p>
                <h3 style={{ color: "#fff", fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "1.2rem", marginBottom: "0.2rem" }}>{PINS[active].label}</h3>
                <p style={{ color: GOLD, fontSize: "0.72rem", fontFamily: "sans-serif", marginBottom: "0.9rem" }}>{PINS[active].sf}</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78rem", lineHeight: 1.7, fontFamily: "sans-serif", marginBottom: "1rem" }}>{PINS[active].desc}</p>
                <div style={{ marginBottom: "1rem" }}>
                  <p style={{ color: "rgba(191,162,116,0.7)", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "0.5rem" }}>Key Features</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {PINS[active].systems.map(s => (
                      <span key={s} style={{ background: "rgba(191,162,116,0.1)", border: "1px solid rgba(191,162,116,0.25)", color: "rgba(255,255,255,0.7)", fontSize: "0.62rem", padding: "0.2rem 0.5rem", fontFamily: "sans-serif" }}>{s}</span>
                    ))}
                  </div>
                </div>
                {PINS[active].matterport && (
                  <a href={PINS[active].matterport} target="_blank" rel="noopener noreferrer" style={{
                    display: "block", width: "100%", background: "transparent", border: "1px solid " + GOLD,
                    color: GOLD, padding: "0.55rem", fontSize: "0.62rem", letterSpacing: "0.2em",
                    textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif",
                    textDecoration: "none", textAlign: "center", boxSizing: "border-box",
                  }}>Launch Virtual 3D Tour</a>
                )}
              </div>
              <button onClick={() => setActive(null)} style={{
                position: "absolute", top: "0.6rem", right: "0.6rem", background: "rgba(0,0,0,0.6)",
                border: "none", color: "#fff", width: 26, height: 26, cursor: "pointer", fontSize: "0.9rem",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>x</button>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
          {PINS.map((pin, i) => (
            <button key={pin.label} onClick={() => setActive(active === i ? null : i)} style={{
              background: active === i ? GOLD : "transparent",
              border: "1px solid " + (active === i ? GOLD : "rgba(255,255,255,0.2)"),
              color: active === i ? "#000" : "rgba(255,255,255,0.5)",
              padding: "0.4rem 1rem", fontSize: "0.62rem", letterSpacing: "0.15em",
              textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif", transition: "all 0.2s",
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
