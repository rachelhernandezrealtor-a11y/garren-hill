import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, Camera, ExternalLink, Link2, Video, Box } from "lucide-react";
import AddPropertyModal from "@/components/AddPropertyModal";
import PhotoUploader from "@/components/PhotoUploader";
import PhotoGrid from "@/components/PhotoGrid";
import ExportPanel from "@/components/ExportPanel";
import { useToast } from "@/components/ui/use-toast";

export default function PropertyDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [property, setProperty] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => { load(); }, [id]);

  const load = async () => {
    setLoading(true);
    const [prop, photoList] = await Promise.all([
      base44.entities.Property.filter({ id }),
      base44.entities.PropertyPhoto.filter({ property_id: id }, "sort_order"),
    ]);
    setProperty(prop[0] || null);
    setPhotos(photoList);
    setLoading(false);
  };

  const copyGalleryLink = () => {
    const url = `${window.location.origin}/gallery/${property.gallery_token}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Gallery link copied!", description: url });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">Property not found</div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-3">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{property.address}</h1>
              <p className="text-sm text-gray-500">{property.city}, {property.state}{property.mls_number ? " - MLS# " + property.mls_number : ""}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {property.vimeo_url && (
                <a href={property.vimeo_url} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="gap-1"><Video className="w-4 h-4" /> Vimeo</Button>
                </a>
              )}
              {property.matterport_url && (
                <a href={property.matterport_url} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="gap-1"><Box className="w-4 h-4" /> Matterport</Button>
                </a>
              )}
              <Button variant="outline" size="sm" className="gap-1" onClick={copyGalleryLink}>
                <Link2 className="w-4 h-4" /> Gallery Link
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={() => setShowEdit(true)}>
                <Edit className="w-4 h-4" /> Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <Tabs defaultValue="photos">
          <TabsList className="mb-6">
            <TabsTrigger value="photos" className="gap-2"><Camera className="w-4 h-4" /> Photos ({photos.length})</TabsTrigger>
            <TabsTrigger value="export" className="gap-2"><ExternalLink className="w-4 h-4" /> Export</TabsTrigger>
          </TabsList>

          <TabsContent value="photos">
            <PhotoUploader propertyId={id} onUploaded={load} />
            <PhotoGrid photos={photos} onUpdated={load} />
          </TabsContent>

          <TabsContent value="export">
            <ExportPanel property={property} photos={photos} />
          </TabsContent>
        </Tabs>
      </div>

      {showEdit && (
        <AddPropertyModal
          property={property}
          onClose={() => setShowEdit(false)}
          onSaved={() => { setShowEdit(false); load(); }}
        />
      )}
    </div>
  );
}
