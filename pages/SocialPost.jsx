import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Sparkles, Instagram, Facebook, Linkedin, ArrowRight, RefreshCw, Copy, Check, Download, ChevronLeft } from "lucide-react";
import { InvokeAgent } from "@/api/ai";

const MEDIA_HUB_URL = "https://rocky-40781cce.base44.app/functions/getPropertyPhotos";
const MEDIA_HUB_APP_ID = "69e248a2469cc39540781cce";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: "📸", color: "bg-gradient-to-br from-purple-500 to-pink-500", dims: "1:1 or 4:5", maxChars: 2200 },
  { id: "facebook", label: "Facebook", icon: "👍", color: "bg-blue-600", dims: "16:9 or 1:1", maxChars: 63206 },
  { id: "linkedin", label: "LinkedIn", icon: "💼", color: "bg-sky-700", dims: "1.91:1", maxChars: 3000 },
];

const TONES = ["Professional", "Warm & Inviting", "Luxury", "Casual", "Exciting"];

export default function SocialApp() {
  const [step, setStep] = useState("properties"); // properties | photos | generate | result
  const [properties, setProperties] = useState([]);
  const [loadingProps, setLoadingProps] = useState(true);
  const [selectedProp, setSelectedProp] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [platform, setPlatform] = useState("instagram");
  const [tone, setTone] = useState("Professional");
  const [extraNotes, setExtraNotes] = useState("");
  const [generating, setGenerating] = useState(false);
  const [captions, setCaptions] = useState([]);
  const [activeCaption, setActiveCaption] = useState(0);
  const [copied, setCopied] = useState(false);

  // Load properties from media hub
  useEffect(() => {
    fetch(`https://api.base44.com/api/apps/${MEDIA_HUB_APP_ID}/entities/Property/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then(r => r.json())
      .then(data => {
        setProperties(Array.isArray(data) ? data : []);
        setLoadingProps(false);
      })
      .catch(() => setLoadingProps(false));
  }, []);

  const loadPhotos = async (prop) => {
    setSelectedProp(prop);
    setStep("photos");
    try {
      const res = await fetch(`https://api.base44.com/api/apps/${MEDIA_HUB_APP_ID}/entities/PropertyPhoto/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property_id: prop.id }),
      });
      const data = await res.json();
      const kept = (Array.isArray(data) ? data : []).filter(p => p.status === "Keep" || p.status === "Enhance");
      setPhotos(kept);
      setSelectedPhotos([]);
    } catch (e) {
      console.error(e);
    }
  };

  const togglePhoto = (id) => {
    setSelectedPhotos(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const generateCaptions = async () => {
    setGenerating(true);
    setStep("result");
    const chosen = photos.filter(p => selectedPhotos.includes(p.id));
    const photoDesc = chosen.map(p => `${p.custom_name || p.file_name}${p.room ? ` (${p.room})` : ""}`).join(", ");
    const plat = PLATFORMS.find(p => p.id === platform);

    try {
      const result = await InvokeAgent({
        prompt: `You are a real estate social media expert. Write 3 different ${tone.toLowerCase()} captions for a ${platform} post about this property listing.

Property: ${selectedProp.address}${selectedProp.city ? `, ${selectedProp.city}` : ""}${selectedProp.state ? `, ${selectedProp.state}` : ""}
${selectedProp.mls_number ? `MLS#: ${selectedProp.mls_number}` : ""}
Photos featured: ${photoDesc || "property photos"}
Platform: ${plat.label} (max ${plat.maxChars} chars)
Tone: ${tone}
${extraNotes ? `Extra details: ${extraNotes}` : ""}

For each caption:
- Write engaging copy that highlights the property
- Include relevant emojis
- Add 5-8 relevant hashtags at the end
- Keep it under ${Math.min(plat.maxChars, 1000)} characters
- Make each caption feel distinct

Return ONLY a JSON array of 3 strings, like: ["caption 1", "caption 2", "caption 3"]
No other text.`,
      });

      let parsed = [];
      try {
        const text = typeof result === "string" ? result : result?.content || result?.text || JSON.stringify(result);
        const match = text.match(/\[[\s\S]*\]/);
        parsed = match ? JSON.parse(match[0]) : [text];
      } catch {
        parsed = [typeof result === "string" ? result : "Could not generate caption. Please try again."];
      }
      setCaptions(parsed);
      setActiveCaption(0);
    } catch (e) {
      setCaptions(["Error generating caption. Please try again."]);
    }
    setGenerating(false);
  };

  const copyCaption = () => {
    navigator.clipboard.writeText(captions[activeCaption]).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const selectedPhotoObjs = photos.filter(p => selectedPhotos.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Social Post Creator</h1>
            <p className="text-xs text-gray-500">Powered by your property media hub</p>
          </div>
          {step !== "properties" && (
            <button onClick={() => { setStep("properties"); setSelectedProp(null); setPhotos([]); setSelectedPhotos([]); setCaptions([]); }} className="ml-auto text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* STEP 1: Pick Property */}
        {step === "properties" && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Pick a Property</h2>
            <p className="text-sm text-gray-500 mb-6">Select the listing you want to create a post for</p>
            {loadingProps ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Home className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                <p>No properties found in your media hub.</p>
                <p className="text-sm mt-1">Add properties and photos there first.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {properties.map(p => (
                  <button key={p.id} onClick={() => loadPhotos(p)} className="text-left">
                    <Card className="hover:shadow-md transition-all hover:border-purple-300 border border-gray-200 cursor-pointer">
                      <CardContent className="p-4">
                        {p.thumbnail_url ? (
                          <img src={p.thumbnail_url} alt={p.address} className="w-full h-32 object-cover rounded-lg mb-3" />
                        ) : (
                          <div className="w-full h-32 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg mb-3 flex items-center justify-center">
                            <Home className="w-8 h-8 text-purple-200" />
                          </div>
                        )}
                        <h3 className="font-semibold text-gray-900 truncate">{p.address}</h3>
                        {(p.city || p.state) && <p className="text-sm text-gray-500">{[p.city, p.state].filter(Boolean).join(", ")}</p>}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">{p.photo_count || 0} photos</span>
                          {p.mls_number && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">MLS# {p.mls_number}</span>}
                          <ArrowRight className="w-4 h-4 text-purple-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Pick Photos + Platform */}
        {step === "photos" && selectedProp && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedProp.address}</h2>
            <p className="text-sm text-gray-500 mb-6">Select photos to feature, then choose your platform and tone</p>

            {/* Photo Grid */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Choose Photos <span className="text-sm font-normal text-gray-400">({selectedPhotos.length} selected)</span></h3>
                <button onClick={() => setSelectedPhotos(photos.map(p => p.id))} className="text-xs text-purple-600 hover:text-purple-800">Select all</button>
              </div>
              {photos.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl border border-gray-200 text-gray-400">
                  <p>No approved photos for this property yet.</p>
                  <p className="text-sm mt-1">Mark photos as Keep in the media hub first.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {photos.map(p => (
                    <button
                      key={p.id}
                      onClick={() => togglePhoto(p.id)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all aspect-square ${
                        selectedPhotos.includes(p.id) ? "border-purple-500 ring-2 ring-purple-300" : "border-transparent hover:border-purple-200"
                      }`}
                    >
                      <img src={p.enhanced_url || p.file_url} alt={p.custom_name} className="w-full h-full object-cover" />
                      {selectedPhotos.includes(p.id) && (
                        <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {selectedPhotos.indexOf(p.id) + 1}
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-1.5 py-1">
                        <p className="text-white text-xs truncate">{p.room || p.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Platform */}
            <div className="mb-5">
              <h3 className="font-semibold text-gray-800 mb-3">Platform</h3>
              <div className="grid grid-cols-3 gap-3">
                {PLATFORMS.map(pl => (
                  <button
                    key={pl.id}
                    onClick={() => setPlatform(pl.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      platform === pl.id ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-purple-200"
                    }`}
                  >
                    <span className="text-2xl">{pl.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{pl.label}</span>
                    <span className="text-xs text-gray-400">{pl.dims}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div className="mb-5">
              <h3 className="font-semibold text-gray-800 mb-3">Tone</h3>
              <div className="flex gap-2 flex-wrap">
                {TONES.map(t => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      tone === t ? "bg-purple-600 text-white border-purple-600" : "border-gray-200 text-gray-600 hover:border-purple-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Extra notes */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Extra Details <span className="text-sm font-normal text-gray-400">(optional)</span></h3>
              <textarea
                value={extraNotes}
                onChange={e => setExtraNotes(e.target.value)}
                placeholder="e.g. 3 bed / 2 bath, newly renovated kitchen, open house Saturday..."
                className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>

            <Button
              onClick={generateCaptions}
              disabled={selectedPhotos.length === 0}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 h-12 text-base gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Generate Captions
            </Button>
          </div>
        )}

        {/* STEP 3: Results */}
        {step === "result" && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Your Social Post</h2>
            <p className="text-sm text-gray-500 mb-6">{selectedProp?.address} · {PLATFORMS.find(p => p.id === platform)?.label} · {tone}</p>

            {/* Selected photos preview */}
            {selectedPhotoObjs.length > 0 && (
              <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                {selectedPhotoObjs.map(p => (
                  <img key={p.id} src={p.enhanced_url || p.file_url} alt="" className="w-20 h-20 object-cover rounded-xl flex-shrink-0 border border-gray-200" />
                ))}
              </div>
            )}

            {generating ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500 text-sm">AI is writing your captions...</p>
              </div>
            ) : (
              <>
                {/* Caption tabs */}
                <div className="flex gap-2 mb-4">
                  {captions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveCaption(i)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                        activeCaption === i ? "bg-purple-600 text-white border-purple-600" : "border-gray-200 text-gray-600 hover:border-purple-300"
                      }`}
                    >
                      Option {i + 1}
                    </button>
                  ))}
                </div>

                {/* Caption display */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4 relative min-h-32">
                  <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{captions[activeCaption]}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{captions[activeCaption]?.length || 0} characters</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={copyCaption} className="gap-1 text-xs h-8">
                        {copied ? <><Check className="w-3 h-3 text-green-500" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Regenerate */}
                <div className="flex gap-3">
                  <Button onClick={generateCaptions} variant="outline" className="gap-2 flex-1">
                    <RefreshCw className="w-4 h-4" /> Regenerate
                  </Button>
                  <Button onClick={() => setStep("photos")} className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 gap-2 flex-1">
                    ← Adjust & Redo
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
