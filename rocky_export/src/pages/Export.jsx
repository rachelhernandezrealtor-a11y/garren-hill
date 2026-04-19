import { useState, useEffect } from "react";
import { Property, PropertyPhoto } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, CheckCircle, Loader2, FolderOpen, Trash2, Sparkles, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Export() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("property");

  const [property, setProperty] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!propertyId) return;
    Promise.all([
      Property.get(propertyId),
      PropertyPhoto.filter({ property_id: propertyId }),
    ]).then(([prop, ph]) => {
      setProperty(prop);
      setPhotos(ph.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)));
      setLoading(false);
    });
  }, [propertyId]);

  const keepPhotos = photos.filter((p) => p.status === "Keep" || p.status === "Enhance");
  const deletePhotos = photos.filter((p) => p.status === "Delete");
  const enhancePhotos = photos.filter((p) => p.status === "Enhance");
  const pendingPhotos = photos.filter((p) => p.status === "Pending");

  // Group by category and room
  const grouped = {};
  keepPhotos.forEach((p) => {
    const cat = p.category || "Uncategorized";
    const room = p.room || "General";
    if (!grouped[cat]) grouped[cat] = {};
    if (!grouped[cat][room]) grouped[cat][room] = [];
    grouped[cat][room].push(p);
  });

  const handleMarkComplete = async () => {
    await Property.update(propertyId, { status: "Complete" });
    navigate("/");
  };

  const downloadPhoto = async (photo) => {
    const url = photo.enhanced_url || photo.file_url;
    const ext = url.split(".").pop().split("?")[0] || "jpg";
    const name = (photo.custom_name || photo.file_name || "photo").replace(/[^a-zA-Z0-9\s_-]/g, "").trim();
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.${ext}`;
    a.target = "_blank";
    a.click();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/review?property=${propertyId}`)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{property?.address}</h1>
            <p className="text-sm text-gray-500">Review & export organized photos</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{keepPhotos.length}</div>
            <div className="text-sm text-gray-500 mt-1">Photos to keep</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{enhancePhotos.length}</div>
            <div className="text-sm text-gray-500 mt-1">To enhance</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{deletePhotos.length}</div>
            <div className="text-sm text-gray-500 mt-1">Marked for delete</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-500">{pendingPhotos.length}</div>
            <div className="text-sm text-gray-500 mt-1">Still pending</div>
          </div>
        </div>

        {pendingPhotos.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-6 text-sm text-yellow-800 flex items-center gap-2">
            <span className="font-medium">! {pendingPhotos.length} photos still pending review.</span>
            <button onClick={() => navigate(`/review?property=${propertyId}`)} className="underline hover:no-underline">Go back to review</button>
          </div>
        )}

        {/* Organized Photo Tree */}
        <div className="space-y-6 mb-8">
          {Object.entries(grouped).map(([cat, rooms]) => (
            <div key={cat} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
                <FolderOpen className="w-5 h-5 text-blue-500" />
                <h2 className="font-semibold text-gray-800">{cat}</h2>
                <span className="text-sm text-gray-400">{Object.values(rooms).flat().length} photos</span>
              </div>
              <div className="divide-y divide-gray-50">
                {Object.entries(rooms).map(([room, rPhotos]) => (
                  <div key={room} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-medium text-gray-600">{room}</span>
                      <span className="text-xs text-gray-400">{rPhotos.length} photos</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {rPhotos.map((p) => (
                        <div key={p.id} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={p.enhanced_url || p.file_url}
                              alt={p.custom_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {p.status === "Enhance" && (
                            <div className="absolute top-1 right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                              <Sparkles className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                          <button
                            onClick={() => downloadPhoto(p)}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
                          >
                            <Download className="w-5 h-5 text-white" />
                          </button>
                          <p className="text-xs text-gray-500 truncate mt-1">{p.custom_name || p.file_name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Download All */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center mb-4">
          <h3 className="font-semibold text-gray-800 mb-1">Download Individual Photos</h3>
          <p className="text-sm text-gray-500 mb-4">Hover over any photo above and click the download icon, or click a photo to download it directly.</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {keepPhotos.slice(0, 5).map((p) => (
              <button key={p.id} onClick={() => downloadPhoto(p)} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-sm transition-all">
                <Download className="w-3.5 h-3.5 text-blue-500" />
                <span className="truncate max-w-[120px]">{p.custom_name || p.file_name}</span>
              </button>
            ))}
            {keepPhotos.length > 5 && (
              <span className="flex items-center px-3 py-2 text-sm text-gray-400">+{keepPhotos.length - 5} more (hover to download)</span>
            )}
          </div>
        </div>

        {/* Mark Complete */}
        <Button
          onClick={handleMarkComplete}
          className="w-full bg-green-600 hover:bg-green-700 h-12 text-base gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Mark as Complete & Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
