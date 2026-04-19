import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Camera } from "lucide-react";

export default function ClientGallery() {
  const pathParts = window.location.pathname.split("/");
  const token = pathParts[pathParts.length - 1];

  const [property, setProperty] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!token) return;
    load();
  }, [token]);

  const load = async () => {
    setLoading(true);
    const props = await base44.entities.Property.filter({ gallery_token: token });
    if (props.length === 0) { setLoading(false); return; }
    const prop = props[0];
    setProperty(prop);
    const photoList = await base44.entities.PropertyPhoto.filter({ property_id: prop.id }, "sort_order");
    setPhotos(photoList);
    setLoading(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-8 h-8 border-4 border-gray-700 border-t-white rounded-full animate-spin" />
    </div>
  );

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-400">
      <div className="text-center">
        <Camera className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p>Gallery not found or link is invalid.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="border-b border-gray-800 px-6 py-6 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <Camera className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 font-semibold text-sm">Photo Hub</span>
        </div>
        <h1 className="text-2xl font-bold">{property.address}</h1>
        <p className="text-gray-400 mt-1">{property.city}, {property.state}{property.mls_number ? " - MLS# " + property.mls_number : ""}</p>
        <p className="text-gray-500 text-sm mt-2">{photos.length} photos</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {photos.length === 0 ? (
          <div className="text-center py-24 text-gray-600">No photos available yet.</div>
        ) : (
          <div className="columns-2 sm:columns-3 md:columns-4 gap-3 space-y-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="break-inside-avoid cursor-pointer rounded-lg overflow-hidden bg-gray-900 hover:opacity-90 transition-opacity"
                onClick={() => setLightbox(photo)}
              >
                <img src={photo.file_url} alt="" className="w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox.file_url}
            alt=""
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none"
            onClick={() => setLightbox(null)}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
}
