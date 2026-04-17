import { useState, useEffect, useRef } from "react";
import { Property, PropertyPhoto } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, GripVertical, CheckCircle, Loader2, AlertCircle, Trash2, Plus, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MLS_MAX = 50;
const MLS_NAME = "FlexMLS";

// Resize image to max 1024x768 maintaining aspect ratio, returns a blob
function resizeImage(file, maxW = 1024, maxH = 768) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let { naturalWidth: w, naturalHeight: h } = img;
      const ratio = Math.min(maxW / w, maxH / h, 1);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob(resolve, "image/jpeg", 0.92);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load image")); };
    img.src = url;
  });
}

export default function MLS() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("property");

  const [property, setProperty] = useState(null);
  const [allPhotos, setAllPhotos] = useState([]);
  const [mlsPhotos, setMlsPhotos] = useState([]); // already queued
  const [availablePhotos, setAvailablePhotos] = useState([]); // Keep photos not yet in MLS
  const [loading, setLoading] = useState(true);
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [addingId, setAddingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);

  useEffect(() => {
    if (!propertyId) return;
    Promise.all([
      Property.get(propertyId),
      PropertyPhoto.filter({ property_id: propertyId }),
    ]).then(([prop, photos]) => {
      setProperty(prop);
      setAllPhotos(photos);
      const mls = photos
        .filter(p => p.mls_status === "Queued" || p.mls_status === "Ready")
        .sort((a, b) => (a.mls_sort_order ?? 999) - (b.mls_sort_order ?? 999));
      const available = photos.filter(p =>
        (p.status === "Keep" || p.status === "Enhance") &&
        (!p.mls_status || p.mls_status === "None")
      );
      setMlsPhotos(mls);
      setAvailablePhotos(available);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [propertyId]);

  const addToMLS = async (photo) => {
    if (mlsPhotos.length >= MLS_MAX) return;
    setAddingId(photo.id);
    const newOrder = mlsPhotos.length;
    await PropertyPhoto.update(photo.id, { mls_status: "Queued", mls_sort_order: newOrder });
    setMlsPhotos(prev => [...prev, { ...photo, mls_status: "Queued", mls_sort_order: newOrder }]);
    setAvailablePhotos(prev => prev.filter(p => p.id !== photo.id));
    setAddingId(null);
  };

  const removeFromMLS = async (photo) => {
    setRemovingId(photo.id);
    await PropertyPhoto.update(photo.id, { mls_status: "None", mls_sort_order: null });
    const updated = mlsPhotos.filter(p => p.id !== photo.id);
    // Re-index
    for (let i = 0; i < updated.length; i++) {
      await PropertyPhoto.update(updated[i].id, { mls_sort_order: i });
      updated[i] = { ...updated[i], mls_sort_order: i };
    }
    setMlsPhotos(updated);
    setAvailablePhotos(prev => [...prev, { ...photo, mls_status: "None" }]);
    setRemovingId(null);
  };

  // Drag to reorder
  const handleDragStart = (idx) => setDragIdx(idx);
  const handleDragOver = (e, idx) => { e.preventDefault(); setDragOverIdx(idx); };
  const handleDrop = async (e, idx) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) { setDragIdx(null); setDragOverIdx(null); return; }
    const reordered = [...mlsPhotos];
    const [moved] = reordered.splice(dragIdx, 1);
    reordered.splice(idx, 0, moved);
    // Optimistically update UI
    setMlsPhotos(reordered.map((p, i) => ({ ...p, mls_sort_order: i })));
    setDragIdx(null);
    setDragOverIdx(null);
    // Persist
    setSavingOrder(true);
    for (let i = 0; i < reordered.length; i++) {
      await PropertyPhoto.update(reordered[i].id, { mls_sort_order: i });
    }
    setSavingOrder(false);
  };

  // Download zip with numbered filenames
  const downloadZip = async () => {
    if (mlsPhotos.length === 0) return;
    setDownloading(true);
    try {
      // Dynamically load JSZip
      await new Promise((resolve, reject) => {
        if (window.JSZip) { resolve(); return; }
        const s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });

      const zip = new window.JSZip();
      const folder = zip.folder(`${property.address} - MLS Photos`);

      for (let i = 0; i < mlsPhotos.length; i++) {
        const p = mlsPhotos[i];
        const url = p.mls_url || p.enhanced_url || p.file_url;
        const paddedNum = String(i + 1).padStart(2, "0");
        const roomLabel = p.room ? `_${p.room.replace(/\s+/g, "_")}` : "";
        const name = `${paddedNum}${roomLabel}.jpg`;
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          folder.file(name, blob);
        } catch (e) {
          console.error("Failed to fetch", url);
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `${property.address} - FlexMLS Photos.zip`;
      link.click();
    } catch (e) {
      console.error("Download failed", e);
    }
    setDownloading(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
    </div>
  );

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">Property not found</div>
  );

  const overLimit = mlsPhotos.length >= MLS_MAX;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{property.address}</h1>
              <p className="text-sm text-gray-500">
                {MLS_NAME} Photos
                {property.mls_number && <span className="ml-2 text-gray-400">· MLS# {property.mls_number}</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to={`/Review?property=${propertyId}`}>
              <Button variant="outline" size="sm" className="gap-1 text-sm">
                ← Review Photos
              </Button>
            </Link>
            <Button
              onClick={downloadZip}
              disabled={mlsPhotos.length === 0 || downloading}
              className="bg-blue-600 hover:bg-blue-700 gap-2"
            >
              {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {downloading ? "Preparing..." : `Download ZIP (${mlsPhotos.length})`}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* MLS Queue — left/main */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-gray-900">MLS Queue</h2>
                <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                  mlsPhotos.length >= MLS_MAX ? "bg-red-100 text-red-600" :
                  mlsPhotos.length >= MLS_MAX * 0.8 ? "bg-yellow-100 text-yellow-700" :
                  "bg-green-100 text-green-700"
                }`}>
                  {mlsPhotos.length} / {MLS_MAX}
                </span>
                {savingOrder && <span className="text-xs text-gray-400 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" />Saving order...</span>}
              </div>
              <p className="text-xs text-gray-400">Drag to reorder · First photo = hero</p>
            </div>

            {overLimit && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                FlexMLS max is {MLS_MAX} photos. Remove some to stay within the limit.
              </div>
            )}

            {mlsPhotos.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-400">
                <Plus className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                <p className="font-medium">No MLS photos yet</p>
                <p className="text-sm mt-1">Add photos from the panel on the right</p>
              </div>
            ) : (
              <div className="space-y-2">
                {mlsPhotos.map((p, i) => (
                  <div
                    key={p.id}
                    draggable
                    onDragStart={() => handleDragStart(i)}
                    onDragOver={(e) => handleDragOver(e, i)}
                    onDrop={(e) => handleDrop(e, i)}
                    className={`flex items-center gap-3 bg-white rounded-xl border-2 p-3 transition-all cursor-grab active:cursor-grabbing ${
                      dragOverIdx === i ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      i === 0 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                    }`}>
                      {i + 1}
                    </span>
                    <img
                      src={p.enhanced_url || p.file_url}
                      alt={p.custom_name}
                      className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {p.custom_name || p.file_name}
                        {i === 0 && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Hero</span>}
                      </p>
                      <p className="text-xs text-gray-400">{[p.category, p.room].filter(Boolean).join(" · ")}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        p.orientation === "Landscape" ? "bg-sky-100 text-sky-700" : "bg-rose-100 text-rose-700"
                      }`}>
                        {p.orientation === "Landscape" ? "H" : "V"}
                      </span>
                      <button
                        onClick={() => removeFromMLS(p)}
                        disabled={removingId === p.id}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
                      >
                        {removingId === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Available Photos — right panel */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">Available Photos</h2>
              <span className="text-xs text-gray-400">{availablePhotos.length} photos</span>
            </div>

            {availablePhotos.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-400">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-300" />
                <p className="text-sm">All approved photos have been added to MLS</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
                {availablePhotos.map(p => (
                  <div key={p.id} className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-3 hover:border-blue-200 transition-all">
                    <img
                      src={p.enhanced_url || p.file_url}
                      alt={p.custom_name}
                      className="w-14 h-10 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{p.custom_name || p.file_name}</p>
                      <p className="text-xs text-gray-400">{[p.category, p.room].filter(Boolean).join(" · ")}</p>
                    </div>
                    <button
                      onClick={() => addToMLS(p)}
                      disabled={overLimit || addingId === p.id}
                      className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${
                        overLimit ? "text-gray-200 cursor-not-allowed" : "text-gray-300 hover:bg-blue-50 hover:text-blue-500"
                      }`}
                    >
                      {addingId === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {availablePhotos.length === 0 && allPhotos.filter(p => p.status === "Pending").length > 0 && (
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-700">
                You have {allPhotos.filter(p => p.status === "Pending").length} unreviewed photos.{" "}
                <Link to={`/Review?property=${propertyId}`} className="underline font-medium">Review them →</Link>
              </div>
            )}
          </div>
        </div>

        {/* Bottom hint */}
        {mlsPhotos.length > 0 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Ready to upload to FlexMLS?</strong> Click <em>Download ZIP</em> above. Photos are numbered in order ({`01_Front.jpg`}, {`02_Kitchen.jpg`}, etc.) and sized for FlexMLS. Upload them directly to your listing.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
