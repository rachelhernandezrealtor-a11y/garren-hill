import { useState, useEffect, useCallback } from "react";
import { Property, PropertyPhoto } from "@/api/entities";
import { UploadFile } from "@/api/integrations";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Upload, Image, CheckCircle, Loader2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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

export default function Import() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("property");

  const [property, setProperty] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (propertyId) Property.get(propertyId).then(setProperty);
  }, [propertyId]);

  const addFiles = (newFiles) => {
    const imageFiles = Array.from(newFiles).filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...imageFiles]);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  }, []);

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);
  const removeFile = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleUpload = async () => {
    if (!files.length || !propertyId) return;
    setUploading(true);
    setProgress(0);

    let uploaded = 0;
    for (const file of files) {
      try {
        const [{ file_url }, orientation] = await Promise.all([
          UploadFile({ file }),
          getOrientation(file),
        ]);

        await PropertyPhoto.create({
          property_id: propertyId,
          file_url,
          file_name: file.name,
          custom_name: file.name.replace(/\.[^/.]+$/, ""),
          category: "Uncategorized",
          room: "",
          ai_category: "",
          ai_room: "",
          status: "Pending",
          orientation,
          sort_order: uploaded,
        });
        uploaded++;
        setProgress(Math.round((uploaded / files.length) * 100));
      } catch (err) {
        console.error("Upload failed for", file.name, err);
      }
    }

    await Property.update(propertyId, { status: "Reviewing", photo_count: uploaded });
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
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{property.address}</h1>
            <p className="text-sm text-gray-500">Upload photos for this property</p>
          </div>
        </div>

        {done ? (
          <div className="text-center py-16">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Photos uploaded!</h2>
            <p className="text-gray-500 mb-6">{files.length} photos ready for review and organization</p>
            <Button onClick={() => navigate(`/Review?property=${propertyId}`)} className="bg-blue-600 hover:bg-blue-700">
              Start Reviewing Photos →
            </Button>
          </div>
        ) : (
          <>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all mb-6 ${
                dragOver ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30"
              }`}
            >
              <Upload className="w-10 h-10 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Drag & drop photos here</h3>
              <p className="text-sm text-gray-400 mb-4">or click to browse your files — select all at once with Cmd+A / Ctrl+A</p>
              <label className="cursor-pointer">
                <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => addFiles(e.target.files)} />
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                  <Image className="w-4 h-4" />
                  Browse Photos
                </span>
              </label>
            </div>

            {files.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 mb-6">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-700">{files.length} photos selected</span>
                  <button onClick={() => setFiles([])} className="text-xs text-red-500 hover:text-red-700">Clear all</button>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                  {files.map((f, i) => {
                    const preview = URL.createObjectURL(f);
                    return (
                      <div key={i} className="flex items-center gap-3 px-4 py-2">
                        <img src={preview} alt={f.name} className="w-10 h-10 rounded object-cover flex-shrink-0" />
                        <span className="text-sm text-gray-700 flex-1 truncate">{f.name}</span>
                        <span className="text-xs text-gray-400">{(f.size / 1024 / 1024).toFixed(1)}MB</span>
                        <button onClick={() => removeFile(i)}><X className="w-4 h-4 text-gray-300 hover:text-red-400" /></button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {uploading ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Uploading... {progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            ) : (
              <Button onClick={handleUpload} disabled={!files.length} className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base">
                Upload {files.length > 0 ? `${files.length} Photos` : "Photos"}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
