"""
Replace the interior room sections with a full Sotheby's walk-through.
RoomGallery component: hero image left (60%), 3-up photo strip below, story panel right.
HistoryWhisper between rooms stays.
"""
import re

with open('/app/.agents/GarrenHillV2_MASTER.jsx', 'r') as f:
    content = f.read()

# ── NEW COMPONENTS ────────────────────────────────────────────────────────────

ROOM_GALLERY = '''
function RoomGallery({ eyebrow, headline, body, heroImg, thumbs = [], reverse = false }) {
  const [active, setActive] = React.useState(0);
  const allImgs = [heroImg, ...thumbs];
  return (
    <section style={{ background: DARK, padding: 'clamp(4rem,7vw,7rem) clamp(1.5rem,6vw,7rem)', borderTop: '1px solid rgba(201,169,110,0.06)' }}>
      <FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: reverse ? '1fr 1fr' : '1fr 1fr', gap: 'clamp(2rem,4vw,5rem)', alignItems: 'start', maxWidth: 1280, margin: '0 auto' }}>
          {/* Photo column */}
          <div style={{ order: reverse ? 2 : 1 }}>
            <div style={{
              width: '100%', aspectRatio: '4/3', overflow: 'hidden',
              backgroundImage: `url(${allImgs[active]})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              transition: 'background-image 0.4s ease',
            }} />
            {thumbs.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                {allImgs.map((img, i) => (
                  <div key={i} onClick={() => setActive(i)} style={{
                    flex: 1, aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer',
                    backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: active === i ? 1 : 0.45,
                    outline: active === i ? `1px solid ${GOLD}` : 'none',
                    transition: 'opacity 0.2s',
                  }} />
                ))}
              </div>
            )}
          </div>
          {/* Text column */}
          <div style={{ order: reverse ? 1 : 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(1rem,2vw,2rem) 0' }}>
            <span style={eyebrowStyle}>{eyebrow}</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.8rem,2.6vw,3rem)', color: '#fff', lineHeight: 1.15, margin: '0 0 1.8rem', letterSpacing: '-0.01em' }}
              dangerouslySetInnerHTML={{ __html: headline }} />
            <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.4, margin: '0 0 1.8rem' }} />
            <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, opacity: 0.82, margin: 0 }}>{body}</p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function DetailStrip({ images, caption }) {
  return (
    <section style={{ background: '#050505', padding: '0 clamp(1.5rem,6vw,7rem) clamp(2rem,3vw,3rem)', borderTop: '1px solid rgba(201,169,110,0.04)' }}>
      <FadeIn>
        <div style={{ display: 'flex', gap: '0.5rem', maxWidth: 1280, margin: '0 auto' }}>
          {images.map((img, i) => (
            <div key={i} style={{
              flex: 1, aspectRatio: '3/2', overflow: 'hidden',
              backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
            }} />
          ))}
        </div>
        {caption && (
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, opacity: 0.4, textAlign: 'center', margin: '1rem 0 0' }}>{caption}</p>
        )}
      </FadeIn>
    </section>
  );
}

function FullBleedDetail({ img, headline, sub, position = 'center' }) {
  const scrollY = useScrollY();
  const ref = useRef();
  const [top, setTop] = React.useState(0);
  useEffect(() => { if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY); }, []);
  const parallax = Math.max(-50, Math.min(50, (scrollY - top) * 0.18));
  return (
    <section ref={ref} style={{ position: 'relative', height: '65vh', minHeight: 420, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${img})`, backgroundSize: 'cover',
        backgroundPosition: `${position} calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)', zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.55)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 clamp(2rem,8vw,12rem)' }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.4rem,2.2vw,2.4rem)', color: '#fff', lineHeight: 1.5, margin: '0 auto 1.2rem', maxWidth: 680, textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>{headline}</p>
          {sub && <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, opacity: 0.6, margin: 0 }}>{sub}</p>}
        </FadeIn>
      </div>
    </section>
  );
}
'''

# ── ROOM SECTIONS ─────────────────────────────────────────────────────────────

ROOM_SECTIONS = '''
function TheThreshold() {
  const scrollY = useScrollY();
  const ref = useRef();
  const [top, setTop] = React.useState(0);
  useEffect(() => { if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY); }, []);
  const parallax = Math.max(-60, Math.min(60, (scrollY - top) * 0.2));
  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '95vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_THRESHOLD})`, backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)', zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.82) 36%, rgba(10,10,10,0.1) 100%)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, width: 'min(50%, 520px)', padding: 'clamp(4rem,8vw,7rem) clamp(2.5rem,5vw,5rem)' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Entrance -- 1916</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(2rem,3vw,3.4rem)', color: '#fff', lineHeight: 1.1, margin: '0 0 1.8rem', letterSpacing: '-0.01em' }}>
            The door. The fanlight.<br /><em style={{ fontWeight: 300 }}>The year carved in stone.</em>
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.4, margin: '0 0 1.8rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, opacity: 0.85, margin: 0 }}>
            The original 1916 leaded glass sidelights and fanlight. The granite threshold stone engraved "Garran Hill 1916." The brass hardware original to the house. This is the invitation in -- and it has not changed in one hundred and ten years.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function TheEntryHall() {
  return (
    <>
      <RoomGallery
        eyebrow="The Entry Hall"
        headline="Georgian millwork.<br /><em style='font-weight:300'>Hand-turned. Every spindle.</em>"
        body="Custom woodwork by master carpenter David Prest. The staircase balusters are hand-turned to the original 1916 Georgian profile. Raised panel wainscoting lines the stair wall. The newel posts are solid oak. Nothing was simplified."
        heroImg={IMG_STAIR_WIDE}
        thumbs={[IMG_BALUSTER, IMG_STAIR_DETAIL]}
      />
    </>
  );
}

function TheSalon() {
  return (
    <RoomGallery
      eyebrow="The Salon"
      headline="Original oak floors.<br /><em style='font-weight:300'>Seven carved mantels. Not one was touched.</em>"
      body="The restoration preserved every original element worth preserving: wide-plank oak floors, solid-wood interior doors with original brass key plates and their original keys, the carved dining room frontispiece. Everything else was rebuilt to match."
      heroImg={IMG_SALON_A}
      thumbs={[IMG_SALON_B, IMG_SALON_C]}
      reverse={true}
    />
  );
}

function TheDining() {
  return (
    <RoomGallery
      eyebrow="The Dining Room"
      headline="The original frontispiece.<br /><em style='font-weight:300'>Not reproduced -- preserved.</em>"
      body="Every gathering since 1916 has happened under the same carved woodwork. The English Speaking Union. Pi Beta Phi. Betty Dumaine's royalty. This room was designed for people worth impressing."
      heroImg={IMG_DINING_A}
      thumbs={[IMG_DINING_B, IMG_DINING_C]}
    />
  );
}

function TheStudy() {
  return (
    <RoomGallery
      eyebrow="The Study"
      headline="A room that has always<br /><em style='font-weight:300'>held serious thinking.</em>"
      body="Walter Hines Page was a publisher and a kingmaker before he was an ambassador. A house built for him would need a room like this -- serious proportions, original millwork, a fireplace that actually draws."
      heroImg={IMG_STUDY_A}
      thumbs={[IMG_STUDY_B]}
      reverse={true}
    />
  );
}

function TheKitchen() {
  return (
    <RoomGallery
      eyebrow="The Kitchen"
      headline="Heart pine floors.<br /><em style='font-weight:300'>Original to the house.</em>"
      body="The kitchen floor is original heart pine -- reclaimed from the 1916 build and still sound. Fully updated for modern use without losing the character of the original space. The proportions are generous. The light is exceptional."
      heroImg={IMG_KITCHEN_A}
      thumbs={[IMG_KITCHEN_B, IMG_KITCHEN_C]}
    />
  );
}

function ThePrimarySuite() {
  return (
    <>
      <RoomGallery
        eyebrow="The Primary Suite"
        headline="The full south wing.<br /><em style='font-weight:300'>Private. Quiet. Generous.</em>"
        body="The primary suite occupies the south wing: bedroom, sitting room, two custom walk-in closets, and a full spa bath. Balcony off the second floor. Views over the grounds. Restored to every original detail."
        heroImg={IMG_PRIMARY_A}
        thumbs={[IMG_PRIMARY_B, IMG_PRIMARY_C]}
        reverse={true}
      />
      <DetailStrip
        images={[IMG_BATH_A, IMG_BATH_B]}
        caption="Primary bath -- Tennessee marble -- fully restored"
      />
    </>
  );
}

function TheFireplaces() {
  return (
    <>
      <FullBleedDetail
        img={IMG_WEDGWOOD}
        headline="Seven fireplaces. Every carved mantel original. Every damper new."
        sub="Restored 1916 -- propane gas logs in six of seven"
      />
      <RoomGallery
        eyebrow="Seven Fireplaces"
        headline="The mantels were carved<br /><em style='font-weight:300'>in 1916. They did not need to be touched.</em>"
        body="The restoration team cleaned all seven fireplaces and installed new dampers throughout. Propane gas logs were added to six. The carved mantels -- original to the house -- were left exactly as built."
        heroImg={IMG_FIRE}
        thumbs={[IMG_DETAIL_A, IMG_DETAIL_B]}
      />
    </>
  );
}

function TheGuestWing() {
  return (
    <RoomGallery
      eyebrow="The Guest Wing"
      headline="Three additional bedrooms.<br /><em style='font-weight:300'>Each with its own character.</em>"
      body="The north wing holds three well-proportioned guest bedrooms, each with original millwork, restored wood floors, and updated baths. Generous closets throughout. The house was built for people who stayed."
      heroImg={IMG_GUEST_A}
      thumbs={[IMG_GUEST_B, IMG_GUEST_C]}
      reverse={true}
    />
  );
}

function TheSunroom() {
  return (
    <RoomGallery
      eyebrow="The Sunroom"
      headline="Light from three sides.<br /><em style='font-weight:300'>Ann's favorite room.</em>"
      body="The sunroom was Ann's project -- new Marvin windows made to the original Georgian profiles, fully restored ceiling, original pine floors refinished. The afternoon light in this room is extraordinary."
      heroImg={IMG_SUNROOM_A}
      thumbs={[IMG_SUNROOM_B]}
    />
  );
}

function TheLowerLevel() {
  return (
    <RoomGallery
      eyebrow="The Lower Level"
      headline="Four stone rooms.<br /><em style='font-weight:300'>Built to last centuries.</em>"
      body="The stone basement contains four finished rooms -- original 1916 construction, fieldstone walls, full ceiling height. Used for storage, wine, workshop, or recreation. The foundation of the house is as solid as the day it was built."
      heroImg={IMG_LOWER_A}
      thumbs={[IMG_LOWER_B]}
      reverse={true}
    />
  );
}

function TheRestoration() {
  return (
    <section style={{ background: '#060606', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,8vw,10rem)', borderTop: '1px solid rgba(201,169,110,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Restoration -- 1998 to 2001</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.8rem,2.8vw,3rem)', color: '#fff', lineHeight: 1.18, margin: '0 0 3rem', letterSpacing: '-0.01em', maxWidth: 640 }}>
            Three years. Every system.<br /><em style={{ fontWeight: 300 }}>Not a detail missed.</em>
          </h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {[
            { label: 'Custom Woodwork', body: 'Master carpenter David Prest. All-new Georgian interior: custom paneling, crown moldings, chair rails, raised panel wainscoting throughout.' },
            { label: 'Original Windows', body: 'Every window replaced with Marvin custom units made to the original 1916 Georgian profiles. The proportions are correct because the original drawings survived.' },
            { label: 'Leaded Glass', body: 'The original 1916 leaded glass sidelights and over-door fanlight were preserved exactly as built. They have not been touched.' },
            { label: 'Seven Fireplaces', body: 'All seven cleaned and relined. New dampers throughout. Propane gas logs in six. The carved mantels were not touched.' },
            { label: 'Mechanical Systems', body: 'All new HVAC, electrical, and plumbing. The house performs to modern standards behind every original surface.' },
            { label: 'Tennessee Marble', body: 'The powder room features Tennessee marble -- sourced to match the original specification. Original solid-wood doors with original brass key plates throughout.' },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ borderTop: `1px solid rgba(201,169,110,0.2)`, paddingTop: '1.5rem' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.8rem', opacity: 0.8 }}>{item.label}</p>
                <p style={{ color: CREAM, fontSize: '0.9rem', lineHeight: 1.85, opacity: 0.75, margin: 0 }}>{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {[IMG_DETAIL_B, IMG_DETAIL_C, IMG_BALUSTER].map((img, i) => (
              <div key={i} style={{ aspectRatio: '4/3', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
'''

# ── INSERT before function ThePool ────────────────────────────────────────────
content = content.replace(
    'function ThePool() {',
    ROOM_GALLERY + ROOM_SECTIONS + 'function ThePool() {'
)

# ── REWIRE RENDER ─────────────────────────────────────────────────────────────
old_render = '''      <Manifesto />
      <CrestDivider />
      <Architecture />
      <HistoryWhisper text="Ralph Page built this for his father. Walter Hines Page -- Ambassador to the Court of St. James, the man who pushed Wilson into the First World War -- died weeks after coming home. He never walked through the door." />
      <TheSalon />
      <HistoryWhisper text="The English Speaking Union met here. Pi Beta Phi. Betty Dumaine\'s royalty. This room has always known how to hold a conversation." />
      <TheDining />
      <HistoryWhisper text="Betty Dumaine shared a room at Vassar with a woman who became Queen of Thailand. Royalty visited. The dining room frontispiece was already a hundred years old by then." />
      <TheFireplaces />
      <HistoryWhisper text="The friend of Britain in her sorest need." attribution="Westminster Abbey -- Walter Hines Page Memorial -- 1918" />
      <TheRestoration />
      <HistoryWhisper text="When Blue Fox died, Betty buried him in a 10x16 slate-covered grave with a brass marker and a four-foot blue fox statue. He is still on the property." />'''

new_render = '''      <Manifesto />
      <CrestDivider />
      <TheThreshold />
      <HistoryWhisper text="Ralph Page built this for his father. Walter Hines Page -- Ambassador to the Court of St. James, the man who pushed Wilson into the First World War -- died weeks after coming home. He never walked through the door." />
      <TheEntryHall />
      <HistoryWhisper text="The English Speaking Union met here. Pi Beta Phi. Betty Dumaine\'s royalty. This room has always known how to hold a conversation." />
      <TheSalon />
      <TheDining />
      <HistoryWhisper text="Betty Dumaine shared a room at Vassar with a woman who became Queen of Thailand. Royalty visited. The dining room frontispiece was already a hundred years old by then." />
      <TheStudy />
      <TheKitchen />
      <HistoryWhisper text="The friend of Britain in her sorest need." attribution="Westminster Abbey -- Walter Hines Page Memorial -- 1918" />
      <ThePrimarySuite />
      <TheGuestWing />
      <TheSunroom />
      <TheFireplaces />
      <TheLowerLevel />
      <TheRestoration />
      <HistoryWhisper text="When Blue Fox died, Betty buried him in a 10x16 slate-covered grave with a brass marker and a four-foot blue fox statue. He is still on the property." />'''

if old_render in content:
    content = content.replace(old_render, new_render)
    print("Render rewired OK")
else:
    print("ERROR: render block not found")
    idx = content.find('<Manifesto />')
    print(repr(content[idx:idx+600]))

with open('/app/.agents/GarrenHillV2_MASTER.jsx', 'w') as f:
    f.write(content)
print("Done, length:", len(content))
PYEOF