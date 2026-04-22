export default function RockyGuide() {
  return (
    <div style={{
      background: '#0a0a0a',
      minHeight: '100vh',
      fontFamily: 'Georgia, serif',
      color: '#F5F0E8',
      padding: '0 0 80px 0'
    }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #111 0%, #0a0a0a 100%)',
        borderBottom: '1px solid rgba(201,169,110,0.3)',
        padding: '48px 32px 40px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: 11,
          letterSpacing: '0.36em',
          color: '#C9A96E',
          textTransform: 'uppercase',
          marginBottom: 16,
          fontFamily: 'sans-serif'
        }}>Your Field Guide</div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          color: '#fff',
          margin: '0 0 12px',
          lineHeight: 1.15
        }}>Working With Rocky</h1>
        <p style={{
          color: 'rgba(245,240,232,0.6)',
          fontSize: 16,
          maxWidth: 480,
          margin: '0 auto',
          fontFamily: 'sans-serif'
        }}>The short rules that make everything run faster</p>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>

        {/* Section 1 */}
        <Section
          number="01"
          title="Tag every file you send"
          gold
        >
          <p style={body}>When you drop a file into chat, start your message with a tag. One word. That's it.</p>
          <div style={tagGrid}>
            <Tag tag="FF:" desc="Flow Farm asset" />
            <Tag tag="GH:" desc="Garren Hill asset" />
            <Tag tag="NEW:" desc="New property (I'll ask which)" />
            <Tag tag="FYI:" desc="Store it, no action needed" />
          </div>
          <p style={note}>If there's no tag, I'll figure it out from the filename. But a tag means zero guessing and zero errors.</p>
        </Section>

        {/* Section 2 */}
        <Section number="02" title="Be specific when correcting me">
          <p style={body}>When I get something wrong, one specific sentence fixes it instantly.</p>
          <div style={exampleGrid}>
            <Example bad="That's wrong." good="That's Flow Farm not Garren Hill." />
            <Example bad="The image isn't right." good="That's the kitchen photo, not the foyer." />
            <Example bad="Fix the headline." good="Change it to 'Legacy Ready' not 'Estate Ready'." />
          </div>
          <p style={note}>I fix it immediately, silently, no drama. Then we move on.</p>
        </Section>

        {/* Section 3 */}
        <Section number="03" title="Paste links directly">
          <p style={body}>If you have a URL -- FlexMLS, Nucleus 4D, Vimeo, anything -- just paste it. I add it to the vault instantly.</p>
          <p style={note}>Don't describe what the link is for. Just paste it and I'll figure it out from context.</p>
        </Section>

        {/* Section 4 */}
        <Section number="04" title="One task at a time">
          <p style={body}>Ideas mid-task are great -- I log them and come back. But if you switch topics while something is half-built, that's when things break.</p>
          <p style={note}>If you want to switch, just say "park this." I'll save where we are and pivot cleanly.</p>
        </Section>

        {/* Section 5 */}
        <Section number="05" title="Trust the vault, not your memory">
          <p style={body}>Everything we've ever saved -- every link, every file, every decision -- is in the Property Vault. You never need to remember it or re-send it.</p>
          <p style={note}>If you're not sure if I have something, just ask "do you have X?" I'll check before asking you for it.</p>
        </Section>

        {/* Section 6 */}
        <Section number="06" title="What Rocky handles automatically">
          <p style={body}>You don't need to ask me to do these -- they happen every session:</p>
          <ul style={list}>
            <li style={li}>Read the vault before responding to anything</li>
            <li style={li}>Upload files to permanent storage immediately</li>
            <li style={li}>Back up all site code to GitHub every 6 hours</li>
            <li style={li}>Restore pages if they go blank (Page Guardian runs every 2 hrs)</li>
            <li style={li}>Alert you to new inquiries via WhatsApp</li>
            <li style={li}>Log every idea you mention to the backlog</li>
          </ul>
        </Section>

        {/* Section 7 */}
        <Section number="07" title="The only things Rocky needs from you">
          <div style={pillRow}>
            <Pill text="File tags (FF: / GH:)" />
            <Pill text="Specific corrections" />
            <Pill text="Paste links directly" />
            <Pill text="Say 'park this' to switch tasks" />
          </div>
        </Section>

        {/* Footer */}
        <div style={{
          marginTop: 64,
          padding: '32px',
          borderTop: '1px solid rgba(201,169,110,0.2)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: 11,
            letterSpacing: '0.3em',
            color: '#C9A96E',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
            marginBottom: 8
          }}>Rocky Chat</div>
          <a
            href="https://app.base44.com/superagent/69e248a2469cc39540781cce"
            style={{ color: '#C9A96E', fontSize: 14, fontFamily: 'sans-serif' }}
          >
            app.base44.com/superagent/69e248a2469cc39540781cce
          </a>
        </div>

      </div>
    </div>
  );
}

function Section({ number, title, gold, children }) {
  return (
    <div style={{
      marginTop: 48,
      paddingBottom: 48,
      borderBottom: '1px solid rgba(255,255,255,0.07)'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 20 }}>
        <div style={{
          fontSize: 11,
          letterSpacing: '0.2em',
          color: '#C9A96E',
          fontFamily: 'sans-serif',
          paddingTop: 6,
          minWidth: 28
        }}>{number}</div>
        <h2 style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          color: gold ? '#C9A96E' : '#fff',
          margin: 0,
          fontWeight: 700,
          lineHeight: 1.2
        }}>{title}</h2>
      </div>
      <div style={{ paddingLeft: 48 }}>{children}</div>
    </div>
  );
}

function Tag({ tag, desc }) {
  return (
    <div style={{
      background: 'rgba(201,169,110,0.08)',
      border: '1px solid rgba(201,169,110,0.25)',
      borderRadius: 8,
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }}>
      <span style={{
        fontFamily: 'monospace',
        fontSize: 18,
        color: '#C9A96E',
        fontWeight: 700,
        minWidth: 52
      }}>{tag}</span>
      <span style={{ fontFamily: 'sans-serif', fontSize: 14, color: 'rgba(245,240,232,0.8)' }}>{desc}</span>
    </div>
  );
}

function Example({ bad, good }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 8,
      padding: '16px 18px',
    }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
        <span style={{ color: '#ff6b6b', fontFamily: 'sans-serif', fontSize: 12, minWidth: 36, paddingTop: 1 }}>Vague</span>
        <span style={{ fontFamily: 'sans-serif', fontSize: 14, color: 'rgba(245,240,232,0.5)' }}>{bad}</span>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span style={{ color: '#C9A96E', fontFamily: 'sans-serif', fontSize: 12, minWidth: 36, paddingTop: 1 }}>Clear</span>
        <span style={{ fontFamily: 'sans-serif', fontSize: 14, color: '#F5F0E8' }}>{good}</span>
      </div>
    </div>
  );
}

function Pill({ text }) {
  return (
    <div style={{
      background: 'rgba(201,169,110,0.12)',
      border: '1px solid rgba(201,169,110,0.3)',
      borderRadius: 100,
      padding: '10px 20px',
      fontFamily: 'sans-serif',
      fontSize: 14,
      color: '#C9A96E',
      display: 'inline-block'
    }}>{text}</div>
  );
}

const body = {
  fontFamily: 'sans-serif',
  fontSize: 15,
  lineHeight: 1.7,
  color: 'rgba(245,240,232,0.85)',
  margin: '0 0 14px'
};

const note = {
  fontFamily: 'sans-serif',
  fontSize: 13,
  color: 'rgba(245,240,232,0.45)',
  margin: '14px 0 0',
  fontStyle: 'italic',
  lineHeight: 1.6
};

const tagGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 12,
  margin: '16px 0'
};

const exampleGrid = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  margin: '16px 0'
};

const pillRow = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  marginTop: 8
};

const list = {
  margin: '8px 0 0',
  padding: '0 0 0 20px'
};

const li = {
  fontFamily: 'sans-serif',
  fontSize: 15,
  color: 'rgba(245,240,232,0.8)',
  lineHeight: 1.8,
  marginBottom: 4
};
