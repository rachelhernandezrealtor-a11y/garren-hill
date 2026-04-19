import { useState, useEffect, useCallback } from "react";
import { Property, PropertyPhoto } from "@/api/entities";
import { UploadFile, InvokeAgent } from "@/api/integrations";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Upload, Image, CheckCircle, Loader2, X,
  FolderOpen, Sparkles, CloudIcon, Monitor, Info
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ROOM_CATEGORIES = [
  "Entry Hall", "Living Room", "Dining Room", "Kitchen", "Library",
  "Sitting Room", "Primary Suite", "Primary Bath", "Bedroom 2",
  "Bedroom 3", "Bedroom 4", "Bedroom 5", "Office",
  "Exterior", "Gardens", "Wee Cottage", "Portico", "Details", "Unsorted"
];

function getOrientation(file) {
  return new Promise((resolve) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const orientation = img.naturalWidth >= img.naturalHeight ? "Landscape" : "Portrait";
      URL.revokeObjectURL(url);
      resolve(orientation);
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve("Unknown"); };
    img.src = url;
  });
}

async function aiCategorizePhoto(url) {
  try {
    const result = await InvokeAgent({
      prompt: `You are categorizing a real estate photo for a historic Georgian property called Garren Hill in Pinehurst, NC.
The property has: Entry Hall, Living Room, Dining Room, Kitchen, Library, Sitting Room, Primary Suite, Primary Bath, Bedrooms 2-5, Office, Exterior, Gardens, Wee Cottage, Portico.

Look at this photo and return ONLY a JSON object with:
- category: "Interior" or "Exterior"  
- room: the most specific room from the list above (e.g. "Kitchen", "Primary Suite", "Exterior")
- confidence: "high", "medium", or "low"

JSON only, no other text.`,
      image_urls: [url],
    });
    const text = typeof result === "string" ? result : result?.content || result?.text || JSON.stringify(result);
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : {};
  } catch {
    return {};
  }
}

export default function Import() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("property");

  const [property, setProperty] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState("");
  const [done, setDone] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [source, setSource] = useState("computer"); // "computer" | "dropbox"
  const [dropboxConnected, setDropboxConnected] = useState(false);
  const [dropboxFolders, setDropboxFolders] = useState([]);
  const [dropboxFiles, setDropboxFiles] = useState([]);
  const [dropboxPath, setDropboxPath] = useState("");
  const [dropboxLoading, setDropboxLoading] = useState(false);
  const [selectedDropboxFiles, setSelectedDropboxFiles] = useState(new Set());
  const [useAI, setUseAI] = useState(true);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [previewFiles, setPreviewFiles] = useState([]);

  useEffect(() => {
    if (propertyId) Property.get(propertyId).then(setProperty);
  }, [propertyId]);

  // Check dropbox auth
  useEffect(() => {
    if (source === "dropbox") checkDropboxAuth();
  }, [source]);

  const checkDropboxAuth = async () => {
    try {
      setDropboxLoading(true);
      const res = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer DROPBOX_TOKEN_PLACEHOLDER` },
        body: JSON.stringify({ path: "" }),
      });
      if (res.ok) {
        setDropboxConnected(true);
        const data = await res.json();
        setDropboxFolders(data.entries?.filter(e => e[".tag"] === "folder") || []);
      }
    } catch {
      setDropboxConnected(false);
    }
    setDropboxLoading(false);
  };

  const addFiles = useCallback((newFiles) => {
    const imageFiles = Array.from(newFiles).filter((f) => f.type.startsWith("image/"));
    const withPreviews = imageFiles.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
      name: f.name,
      size: f.size,
      suggestedRoom: null,
      overrideRoom: null,
    }));
    setPreviewFiles((prev) => [...prev, ...withPreviews]);
    setFiles((prev) => [...prev, ...imageFiles]);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const removeFile = (idx) => {
    setPreviewFiles((prev) => prev.filter((_, i) => i !== idx));
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const setRoomOverride = (idx, room) => {
    setPreviewFiles((prev) => prev.map((f, i) => i === idx ? { ...f, overrideRoom: room } : f));
  };

  const handleUpload = async () => {
    if (!files.length || !propertyId) return;
    setUploading(true);
    setProgress(0);
    setUploadedCount(0);

    let uploaded = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const preview = previewFiles[i];
      setCurrentFile(file.name);

      try {
        const [{ file_url }, orientation] = await Promise.all([
          UploadFile({ file }),
          getOrientation(file),
        ]);

        // AI categorize if enabled
        let aiResult = {};
        if (useAI) {
          aiResult = await aiCategorizePhoto(file_url);
        }

        const room = preview?.overrideRoom || aiResult.room || "";
        const category = aiResult.category || (room ? (["Exterior", "Gardens", "Wee Cottage", "Portico"].includes(room) ? "Exterior" : "Interior") : "Uncategorized");

        await PropertyPhoto.create({
          property_id: propertyId,
          file_url,
          file_name: file.name,
          custom_name: file.name.replace(/\.[^/.]+$/, ""),
          category,
          room,
          ai_category: aiResult.category || "",
          ai_room: aiResult.room || "",
          status: "Pending",
          orientation,
          sort_order: uploaded,
        });

        uploaded++;
        setUploadedCount(uploaded);
        setProgress(Math.round(((i + 1) / files.length) * 100));
      } catch (err) {
        console.error("Upload failed for", file.name, err);
      }
    }

    const existing = await PropertyPhoto.filter({ property_id: propertyId });
    await Property.update(propertyId, { status: "Reviewing", photo_count: existing.length });
    setUploading(false);
    setDone(true);
  };

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{property.address}</h1>
            <p className="text-sm text-gray-500">Import photos for this property</p>
          </div>
        </div>

        {done ? (
          <div className="text-center py-16">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">{uploadedCount} photos imported!</h2>
            <p className="text-gray-500 mb-2">{useAI ? "AI has categorized them by room." : "Ready for manual review."}</p>
            <p className="text-sm text-gray-400 mb-6">You can always adjust categories in the Review tab.</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => { setFiles([]); setPreviewFiles([]); setDone(false); }} variant="outline">
                Import More
              </Button>
              <Button onClick={() => navigate(`/Review?property=${propertyId}`)} className="bg-blue-600 hover:bg-blue-700">
                Review & Organize ->
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Source Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setSource("computer")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${source === "computer" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
              >
                <Monitor className="w-4 h-4" /> From My Computer
              </button>
              <button
                onClick={() => setSource("dropbox")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${source === "dropbox" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
              >
                <CloudIcon className="w-4 h-4" /> From Dropbox
              </button>
            </div>

            {/* AI Toggle */}
            <div className="flex items-center gap-3 bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 mb-5">
              <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-purple-800">AI Auto-Categorize</p>
                <p className="text-xs text-purple-600">AI will identify each room automatically after upload</p>
              </div>
              <button
                onClick={() => setUseAI(!useAI)}
                className={`relative w-10 h-5 rounded-full transition-colors ${useAI ? "bg-purple-500" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${useAI ? "left-5" : "left-0.5"}`} />
              </button>
            </div>

            {/* Computer Upload */}
            {source === "computer" && (
              <>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all mb-5 ${dragOver ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30"}`}
                >
                  <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">Drag & drop photos here</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Select all at once with <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">CmdA</kbd> then drag, or click to browse
                  </p>
                  <label className="cursor-pointer">
                    <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => addFiles(e.target.files)} />
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                      <Image className="w-4 h-4" /> Browse Photos
                    </span>
                  </label>
                  <p className="text-xs text-gray-400 mt-3">You can also drag your whole Garren Hill folder right here</p>
                </div>
              </>
            )}

            {/* Dropbox */}
            {source === "dropbox" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <CloudIcon className="w-6 h-6 text-blue-500" />
                  <h3 className="font-semibold text-gray-800">Connect Dropbox</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  To import photos directly from Dropbox, you need to connect your account first.
                </p>
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex gap-2 mb-4">
                  <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">
                    Dropbox integration is coming soon! For now, the fastest way is to open Dropbox on your Mac, select all photos (<strong>CmdA</strong>), and drag them directly into the upload box.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Quick workaround:</p>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Open <strong>Dropbox.app</strong> on your Mac</li>
                    <li>Navigate to your Garren Hill photos folder</li>
                    <li>Press <kbd className="bg-white border border-gray-200 px-1.5 py-0.5 rounded text-xs">CmdA</kbd> to select all</li>
                    <li>Switch to "From My Computer" tab above</li>
                    <li>Drag them into the upload box</li>
                  </ol>
                </div>
              </div>
            )}

            {/* File Preview Grid */}
            {previewFiles.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 mb-5">
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-700">
                    {previewFiles.length} photos selected
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                      {useAI ? "AI will sort these automatically" : "You can assign rooms below"}
                    </span>
                    <button onClick={() => { setPreviewFiles([]); setFiles([]); }} className="text-xs text-red-500 hover:text-red-700">
                      Clear all
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4 max-h-80 overflow-y-auto">
                  {previewFiles.map((pf, i) => (
                    <div key={i} className="relative group rounded-lg overflow-hidden bg-gray-100 aspect-square">
                      <img src={pf.preview} alt={pf.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeFile(i)}
                        className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                      {!useAI && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                          <select
                            value={pf.overrideRoom || ""}
                            onChange={(e) => setRoomOverride(i, e.target.value)}
                            className="w-full text-xs bg-transparent text-white border-none outline-none"
                          >
                            <option value="">Pick room...</option>
                            {ROOM_CATEGORIES.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </div>
                      )}
                      {pf.overrideRoom && (
                        <div className="absolute top-1 left-1">
                          <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">{pf.overrideRoom}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Progress */}
            {uploading && (
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-5">
                <div className="flex items-center gap-3 mb-3">
                  {useAI ? <Sparkles className="w-4 h-4 text-purple-500" /> : <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
                  <span className="text-sm font-medium text-gray-700">
                    {useAI ? `AI sorting & uploading... ${progress}%` : `Uploading... ${progress}%`}
                  </span>
                </div>
                <Progress value={progress} className="h-2 mb-2" />
                <p className="text-xs text-gray-400 truncate">{currentFile}</p>
                <p className="text-xs text-gray-400 mt-1">{uploadedCount} of {files.length} complete</p>
              </div>
            )}

            {/* Upload Button */}
            {!uploading && (
              <Button
                onClick={handleUpload}
                disabled={!files.length}
                className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 gap-2"
              >
                {useAI ? <Sparkles className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                {files.length > 0
                  ? `${useAI ? "AI Import" : "Upload"} ${files.length} Photos`
                  : "Select photos to upload"}
              </Button>
            )}

            {files.length > 0 && !uploading && (
              <p className="text-center text-xs text-gray-400 mt-2">
                {useAI ? "Each photo will be analyzed and sorted by room automatically." : "Photos will be uploaded as-is. You can sort them in Review."}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
