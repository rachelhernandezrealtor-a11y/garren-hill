import { useState, useEffect } from "react";
import { Property } from "@/api/entities";
import { Link } from "react-router-dom";
import { Plus, Image, Video, Box, ChevronRight, Home } from "lucide-react";

export default function Index() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Property.list().then((data) => {
      setProperties(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto" />
        <p className="text-sm text-gray-400">Loading properties...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Rocky</h1>
              <p className="text-xs text-gray-400">Property Media Hub</p>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Properties</h2>
          <span className="text-xs text-gray-400">{properties.length} total</span>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Home className="w-10 h-10 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No properties yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Thumbnail */}
                <div className="h-40 bg-gray-100 relative overflow-hidden">
                  {property.thumbnail_url ? (
                    <img src={property.thumbnail_url} alt={property.address}
                      className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium uppercase tracking-wide
                      ${property.status === 'active' ? 'bg-green-100 text-green-700' :
                        property.status === 'Reviewing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-500'}`}>
                      {property.status || 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-base mb-0.5">{property.address}</h3>
                  <p className="text-sm text-gray-400">{property.city}{property.state ? `, ${property.state}` : ""}</p>

                  {/* Stats row */}
                  <div className="flex items-center gap-4 mt-3 mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Image className="w-3.5 h-3.5 text-gray-400" />
                      <span>{property.photo_count || 0} photos</span>
                    </div>
                    {property.vimeo_urls?.length > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Video className="w-3.5 h-3.5 text-blue-400" />
                        <span>{property.vimeo_urls.length} video{property.vimeo_urls.length > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {property.matterport_urls?.length > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Box className="w-3.5 h-3.5 text-purple-400" />
                        <span>3D tour</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link to={`/Import?property=${property.id}`}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-700 transition-colors">
                      <Plus className="w-3.5 h-3.5" /> Add Photos
                    </Link>
                    <Link to={`/Review?property=${property.id}`}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                      Review
                    </Link>
                    <Link to={`/Media?property=${property.id}`}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                      <Video className="w-3.5 h-3.5" /> Media
                    </Link>
                    <Link to={`/MLS?property=${property.id}`}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
                      MLS Export
                    </Link>
                  </div>

                  {/* Public site links */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex gap-3 flex-wrap">
                    {property.address === "Flow Farm" && (
                      <>
                        <a href="/FlowFarmHome" target="_blank"
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
                          <ChevronRight className="w-3 h-3" /> Public Site
                        </a>
                        <a href="/FlowFarmGallery" target="_blank"
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
                          <ChevronRight className="w-3 h-3" /> Gallery
                        </a>
                      </>
                    )}
                    {property.address === "200 Hollycrest Drive" || property.city === "Pinehurst" && property.address !== "Flow Farm" ? (
                      <>
                        <a href="/Home" target="_blank"
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
                          <ChevronRight className="w-3 h-3" /> Public Site
                        </a>
                        <a href="/GarrenHillGallery" target="_blank"
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
                          <ChevronRight className="w-3 h-3" /> Gallery
                        </a>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
