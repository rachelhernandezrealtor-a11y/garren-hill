import { useState, useEffect } from "react";
import { Property } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2, Video, Box, ExternalLink, Loader2, Play } from "lucide-react";
import { Link } from "react-router-dom";

function extractVimeoId(url) {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
}

function extractMatterportId(url) {
  const match = url.match(/my\.matterport\.com\/show\/\?m=([a-zA-Z0-9]+)/);
  if (match) return match[1];
  const match2 = url.match(/matterport\.com\/.*[?&]m=([a-zA-Z0-9]+)/);
  return match2 ? match2[1] : null;
}

function VimeoEmbed({ url }) {
  const id = extractVimeoId(url);
  if (!id) return (
    <div className="bg-gray-100 rounded-xl flex items-center justify-center h-48 text-gray-400 text-sm">
      Invalid Vimeo URL
    </div>
  );
  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingBottom: "56.25%" }}>
      <iframe
        src={`https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function MatterportEmbed({ url }) {
  const id = extractMatterportId(url);
  const embedUrl = id
    ? `https://my.matterport.com/show/?m=${id}&play=1`
    : url;
  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingBottom: "56.25%" }}>
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="xr-spatial-tracking"
      />
    </div>
  );
}

export default function Media() {
  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("property");

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [vimeoUrls, setVimeoUrls] = useState([]);
  const [matterportUrls, setMatterportUrls] = useState([]);
  const [newVimeo, setNewVimeo] = useState("");
  const [newMatterport, setNewMatterport] = useState("");
  const [mediaNotes, setMediaNotes] = useState("");

  useEffect(() => {
    if (!propertyId) return;
    Property.get(propertyId).then((p) => {
      setProperty(p);
      setVimeoUrls(p.vimeo_urls || []);
      setMatterportUrls(p.matterport_urls || []);
      setMediaNotes(p.media_notes || "");
      setLoading(false);
    });
  }, [propertyId]);

  const save = async (updates) => {
    setSaving(true);
    const updated = await Property.update(propertyId, updates);
    setProperty(updated);
    setSaving(false);
  };

  const addVimeo = async () => {
    if (!newVimeo.trim()) return;
    const updated = [...vimeoUrls, newVimeo.trim()];
    setVimeoUrls(updated);
    setNewVimeo("");
    await save({ vimeo_urls: updated });
  };

  const removeVimeo = async (idx) => {
    const updated = vimeoUrls.filter((_, i) => i !== idx);
    setVimeoUrls(updated);
    await save({ vimeo_urls: updated });
  };

  const addMatterport = async () => {
    if (!newMatterport.trim()) return;
    const updated = [...matterportUrls, newMatterport.trim()];
    setMatterportUrls(updated);
    setNewMatterport("");
    await save({ matterport_urls: updated });
  };

  const removeMatterport = async (idx) => {
    const updated = matterportUrls.filter((_, i) => i !== idx);
    setMatterportUrls(updated);
    await save({ matterport_urls: updated });
  };

  const saveNotes = async () => {
    await save({ media_notes: mediaNotes });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
    </div>
  );

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">Property not found</div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{property.address}</h1>
              <p className="text-sm text-gray-500">
                Media Hub
                {property.mls_number && <span className="ml-2 text-gray-400">· MLS# {property.mls_number}</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/Import?property=${propertyId}`}>
              <Button variant="outline" size="sm" className="gap-1 text-sm">Photos</Button>
            </Link>
            <Link to={`/Review?property=${propertyId}`}>
              <Button variant="outline" size="sm" className="gap-1 text-sm">Review</Button>
            </Link>
            <Link to={`/MLS?property=${propertyId}`}>
              <Button variant="outline" size="sm" className="gap-1 text-sm text-blue-600 border-blue-200">MLS</Button>
            </Link>
            {saving && <span className="text-xs text-gray-400 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" />Saving...</span>}
          </div>
        </div>

        {/* Summary bar */}
        <div className="flex items-center gap-6 bg-white rounded-xl border border-gray-200 px-5 py-3 mb-6 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <Video className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600">Videos: <strong>{vimeoUrls.length}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Box className="w-4 h-4 text-purple-500" />
            <span className="text-gray-600">3D Tours: <strong>{matterportUrls.length}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-gray-600">Photos: <strong>{property.photo_count || 0}</strong></span>
          </div>
        </div>

        {/* Vimeo Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Video className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Vimeo Videos</h2>
              <p className="text-xs text-gray-400">Property walkthroughs, highlight reels</p>
            </div>
          </div>

          {/* Add new */}
          <div className="flex gap-2 mb-5">
            <Input
              value={newVimeo}
              onChange={(e) => setNewVimeo(e.target.value)}
              placeholder="Paste Vimeo URL (e.g. https://vimeo.com/123456789)"
              className="text-sm"
              onKeyDown={(e) => e.key === "Enter" && addVimeo()}
            />
            <Button onClick={addVimeo} disabled={!newVimeo.trim()} className="bg-blue-600 hover:bg-blue-700 gap-1 flex-shrink-0">
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>

          {vimeoUrls.length === 0 ? (
            <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl">
              <Play className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No Vimeo videos yet</p>
              <p className="text-xs mt-1">Paste a Vimeo URL above to add one</p>
            </div>
          ) : (
            <div className="space-y-5">
              {vimeoUrls.map((url, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Video {i + 1}</span>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> Open in Vimeo
                      </a>
                    </div>
                    <button onClick={() => removeVimeo(i)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <VimeoEmbed url={url} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Matterport Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Box className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Matterport 3D Tours</h2>
              <p className="text-xs text-gray-400">Virtual walkthroughs, floor plans</p>
            </div>
          </div>

          {/* Add new */}
          <div className="flex gap-2 mb-5">
            <Input
              value={newMatterport}
              onChange={(e) => setNewMatterport(e.target.value)}
              placeholder="Paste Matterport URL (e.g. https://my.matterport.com/show/?m=...)"
              className="text-sm"
              onKeyDown={(e) => e.key === "Enter" && addMatterport()}
            />
            <Button onClick={addMatterport} disabled={!newMatterport.trim()} className="bg-purple-600 hover:bg-purple-700 gap-1 flex-shrink-0">
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>

          {matterportUrls.length === 0 ? (
            <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl">
              <Box className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No 3D tours yet</p>
              <p className="text-xs mt-1">Paste a Matterport URL above to add one</p>
            </div>
          ) : (
            <div className="space-y-5">
              {matterportUrls.map((url, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Tour {i + 1}</span>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-500 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> Open in Matterport
                      </a>
                    </div>
                    <button onClick={() => removeMatterport(i)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <MatterportEmbed url={url} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Media Notes</h2>
          <textarea
            value={mediaNotes}
            onChange={(e) => setMediaNotes(e.target.value)}
            onBlur={saveNotes}
            placeholder="e.g. Vimeo video shot by John Doe Photography, Matterport scan done 4/15..."
            className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

      </div>
    </div>
  );
}
