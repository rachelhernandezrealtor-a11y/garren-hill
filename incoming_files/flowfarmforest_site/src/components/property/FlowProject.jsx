import React, { useState } from "react";
import { EditableText, EditableImage } from "@/components/EditableText";

function Lightbox({ image, onClose }) {
  if (!image) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 12, 10, 0.82)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "24px",
        cursor: "zoom-out",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          width: "100%",
          maxHeight: "90vh",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
          background: "#000",
        }}
      >
        <img
          src={image}
          alt="Expanded image"
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "90vh",
            objectFit: "contain",
            display: "block",
            background: "#000",
          }}
        />
      </div>
    </div>
  );
}

function EditableImageCard({ id, defaultSrc, alt, onClick, minHeight = 420, offsetTop = 0 }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        border: "none",
        padding: 0,
        margin: 0,
        background: "transparent",
        cursor: "zoom-in",
        marginTop: offsetTop,
      }}
    >
      <div
        style={{
          width: "100%",
          minHeight,
          borderRadius: "28px",
          overflow: "hidden",
          background: "#d9d0c5",
        }}
      >
        <EditableImage
          id={id}
          src={defaultSrc}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            minHeight,
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </button>
  );
}

function EditableTextPanel({ prefix, defaultLabel, defaultTitle, defaultBody, defaultQuote, align = "left" }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        textAlign: align,
      }}
    >
      {defaultLabel !== undefined && (
        <EditableText
          storageKey={`${prefix}_label`}
          defaultValue={defaultLabel}
          tag="div"
          style={{
            fontSize: "12px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#7a6c5e",
            fontWeight: 600,
          }}
        />
      )}

      {defaultTitle !== undefined && (
        <EditableText
          storageKey={`${prefix}_title`}
          defaultValue={defaultTitle}
          tag="h2"
          style={{
            margin: 0,
            fontSize: "clamp(28px, 4.4vw, 54px)",
            lineHeight: 1.03,
            color: "#1f1a17",
            fontWeight: 500,
          }}
        />
      )}

      {defaultQuote !== undefined && (
        <EditableText
          storageKey={`${prefix}_quote`}
          defaultValue={defaultQuote}
          tag="blockquote"
          style={{
            margin: 0,
            fontSize: "clamp(21px, 2.8vw, 32px)",
            lineHeight: 1.28,
            color: "#2a231f",
            fontStyle: "italic",
          }}
        />
      )}

      {defaultBody !== undefined && (
        <EditableText
          storageKey={`${prefix}_body`}
          defaultValue={defaultBody}
          tag="p"
          style={{
            margin: 0,
            fontSize: "17px",
            lineHeight: 1.78,
            color: "#4b423b",
          }}
        />
      )}
    </div>
  );
}

function EditorialRow({ reverse = false, prefix, defaultLabel, defaultTitle, defaultBody, defaultQuote, defaultImage, onImageClick }) {
  return (
    <div
      className="flowproject-row"
      style={{
        display: "grid",
        gridTemplateColumns: reverse ? "0.85fr 1.15fr" : "1.15fr 0.85fr",
        gap: "34px",
        alignItems: "center",
      }}
    >
      {!reverse ? (
        <>
          <EditableImageCard id={`${prefix}_img`} defaultSrc={defaultImage} alt={defaultTitle} onClick={() => onImageClick(`${prefix}_img`)} minHeight={560} />
          <EditableTextPanel prefix={prefix} defaultLabel={defaultLabel} defaultTitle={defaultTitle} defaultBody={defaultBody} defaultQuote={defaultQuote} />
        </>
      ) : (
        <>
          <EditableTextPanel prefix={prefix} defaultLabel={defaultLabel} defaultTitle={defaultTitle} defaultBody={defaultBody} defaultQuote={defaultQuote} />
          <EditableImageCard id={`${prefix}_img`} defaultSrc={defaultImage} alt={defaultTitle} onClick={() => onImageClick(`${prefix}_img`)} minHeight={560} />
        </>
      )}
    </div>
  );
}

function StaggeredRow({ reverse = false, prefix, defaultLabel, defaultTitle, defaultBody, defaultQuote, defaultImageOne, defaultImageTwo, onImageClick }) {
  return (
    <div
      className="flowproject-row"
      style={{
        display: "grid",
        gridTemplateColumns: reverse ? "0.9fr 1.1fr" : "1.1fr 0.9fr",
        gap: "34px",
        alignItems: "center",
      }}
    >
      {!reverse ? (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: "22px", alignItems: "end" }}>
            <EditableImageCard id={`${prefix}_imgA`} defaultSrc={defaultImageOne} alt={defaultTitle} onClick={() => onImageClick(`${prefix}_imgA`)} minHeight={360} offsetTop={56} />
            <EditableImageCard id={`${prefix}_imgB`} defaultSrc={defaultImageTwo} alt={defaultTitle} onClick={() => onImageClick(`${prefix}_imgB`)} minHeight={520} />
          </div>
          <EditableTextPanel prefix={prefix} defaultLabel={defaultLabel} defaultTitle={defaultTitle} defaultBody={defaultBody} defaultQuote={defaultQuote} />
        </>
      ) : (
        <>
          <EditableTextPanel prefix={prefix} defaultLabel={defaultLabel} defaultTitle={defaultTitle} defaultBody={defaultBody} defaultQuote={defaultQuote} />
          <div style={{ display: "grid", gridTemplateColumns: "1.08fr 0.92fr", gap: "22px", alignItems: "end" }}>
            <EditableImageCard id={`${prefix}_imgB`} defaultSrc={defaultImageTwo} alt={defaultTitle} onClick={() => onImageClick(`${prefix}_imgB`)} minHeight={520} />
            <EditableImageCard id={`${prefix}_imgA`} defaultSrc={defaultImageOne} alt={defaultTitle} onClick={() => onImageClick(`${prefix}_imgA`)} minHeight={360} offsetTop={56} />
          </div>
        </>
      )}
    </div>
  );
}

const DEFAULTS = {
  pageEyebrow: "FLOW PROJECT",
  pageTitle: "A main house story told through rhythm, detail, and atmosphere.",
  pageIntro: "This page is designed as an editorial storytelling sequence: layered images, short narrative copy, and pull quotes that let the home unfold with clarity and emotion.",
  s1: {
    label: "Arrival",
    title: "The first impression should feel composed, warm, and cinematic.",
    body: "Use this block to introduce the main house with one dominant image and one concise piece of narrative copy. It should feel calm, elevated, and directional.",
    quote: "A home with real presence does not need to shout.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  },
  s2: {
    label: "Living",
    title: "Layer moments of scale with detail and intimacy.",
    body: "This staggered image block creates editorial movement. Use one image for atmosphere and one for architecture or detail, then support it with thoughtful copy and one elegant quote.",
    quote: "The best rooms feel intentional from every angle.",
    imageOne: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    imageTwo: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
  },
  s3: {
    label: "Flow",
    title: "Alternate direction so the page keeps moving naturally.",
    body: "This next single-image block flips the layout and keeps the storytelling dynamic. It is ideal for a kitchen, salon, bedroom, or any defining architectural moment.",
    quote: "Elegance comes from restraint, proportion, and light.",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1400&q=80",
  },
  s4: {
    label: "Details",
    title: "Use the final staggered block to close with texture and feeling.",
    body: "End with spaces or details that leave an impression: the quiet corner, the architectural line, the material richness, the atmosphere at a certain hour of day.",
    quote: "What stays with people is rarely just the room — it is the feeling inside it.",
    imageOne: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    imageTwo: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  closingText: "Built as a reusable editorial page structure: stable layout, simple content swaps, and a clear visual rhythm that can carry any main house story.",
};

export default function FlowProject() {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleImageClick = (imageId) => {
    // Find the actual rendered image src from the DOM
    const container = document.querySelector(`[data-editable-id="${imageId}"]`);
    const img = container?.querySelector('img');
    if (img?.src) setLightboxSrc(img.src);
  };

  return (
    <>
      <section style={{ width: "100%", background: "#f6f1ea", padding: "88px 24px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "76px" }}>

          {/* Page Header */}
          <div style={{ maxWidth: "920px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <EditableText
              storageKey="fp_page_eyebrow"
              defaultValue={DEFAULTS.pageEyebrow}
              tag="div"
              style={{ fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#7a6c5e", fontWeight: 600 }}
            />
            <EditableText
              storageKey="fp_page_title"
              defaultValue={DEFAULTS.pageTitle}
              tag="h1"
              style={{ margin: 0, fontSize: "clamp(34px, 6vw, 68px)", lineHeight: 1.02, color: "#1f1a17", fontWeight: 500 }}
            />
            <EditableText
              storageKey="fp_page_intro"
              defaultValue={DEFAULTS.pageIntro}
              tag="p"
              className="flowproject-dropcap"
            />
          </div>

          {/* Section 1 — Single image left */}
          <EditorialRow
            prefix="fp_s1"
            defaultLabel={DEFAULTS.s1.label}
            defaultTitle={DEFAULTS.s1.title}
            defaultBody={DEFAULTS.s1.body}
            defaultQuote={DEFAULTS.s1.quote}
            defaultImage={DEFAULTS.s1.image}
            onImageClick={handleImageClick}
          />

          {/* Section 2 — Staggered reversed */}
          <StaggeredRow
            reverse
            prefix="fp_s2"
            defaultLabel={DEFAULTS.s2.label}
            defaultTitle={DEFAULTS.s2.title}
            defaultBody={DEFAULTS.s2.body}
            defaultQuote={DEFAULTS.s2.quote}
            defaultImageOne={DEFAULTS.s2.imageOne}
            defaultImageTwo={DEFAULTS.s2.imageTwo}
            onImageClick={handleImageClick}
          />

          {/* Section 3 — Single image reversed */}
          <EditorialRow
            reverse
            prefix="fp_s3"
            defaultLabel={DEFAULTS.s3.label}
            defaultTitle={DEFAULTS.s3.title}
            defaultBody={DEFAULTS.s3.body}
            defaultQuote={DEFAULTS.s3.quote}
            defaultImage={DEFAULTS.s3.image}
            onImageClick={handleImageClick}
          />

          {/* Section 4 — Staggered */}
          <StaggeredRow
            prefix="fp_s4"
            defaultLabel={DEFAULTS.s4.label}
            defaultTitle={DEFAULTS.s4.title}
            defaultBody={DEFAULTS.s4.body}
            defaultQuote={DEFAULTS.s4.quote}
            defaultImageOne={DEFAULTS.s4.imageOne}
            defaultImageTwo={DEFAULTS.s4.imageTwo}
            onImageClick={handleImageClick}
          />

          {/* Closing */}
          <div style={{ paddingTop: "10px", borderTop: "1px solid rgba(31,26,23,0.12)" }}>
            <EditableText
              storageKey="fp_closing_text"
              defaultValue={DEFAULTS.closingText}
              tag="p"
              style={{ margin: 0, fontSize: "20px", lineHeight: 1.6, color: "#2f2924", maxWidth: "900px" }}
            />
          </div>
        </div>
      </section>

      <Lightbox image={lightboxSrc} onClose={() => setLightboxSrc(null)} />

      <style>{`
        .flowproject-dropcap {
          margin: 0;
          font-size: 18px;
          line-height: 1.8;
          color: #4b423b;
          max-width: 780px;
        }
        .flowproject-dropcap::first-letter {
          float: left;
          font-size: 4.8rem;
          line-height: 0.88;
          padding-right: 0.12em;
          margin-top: 0.06em;
          color: #1f1a17;
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 500;
        }
        @media (max-width: 900px) {
          .flowproject-row {
            grid-template-columns: 1fr !important;
          }
          .flowproject-dropcap::first-letter {
            font-size: 3.6rem;
            line-height: 0.9;
          }
        }
      `}</style>
    </>
  );
}