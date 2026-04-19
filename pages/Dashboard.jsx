import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Home, Camera, MapPin } from "lucide-react";
import AddPropertyModal from "@/components/AddPropertyModal";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [photoCounts, setPhotoCounts] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    const data = await base44.entities.Property.list("-created_date");
    setProperties(data);
    const counts = {};
    await Promise.all(
      data.map(async (p) => {
        const photos = await base44.entities.PropertyPhoto.filter({ property_id: p.id });
        counts[p.id] = photos.length;
      })
    );
    setPhotoCounts(counts);
    setLoading(false);
  };

  const filtered = properties.filter((p) =>
    [p.address, p.city, p.state, p.mls_number]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const statusColor = { active: "bg-green-100 text-green-700", sold: "bg-gray-100 text-gray-600", pending: "bg-yellow-100 text-yellow-700" };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Photo Hub</h1>
        </div>
        <Button onClick={() => setShowAdd(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="w-4 h-4" /> Add Property
        </Button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by address, city, MLS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <Home className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">No properties yet</p>
            <p className="text-sm">Click "Add Property" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <Link key={p.id} to={`/property/${p.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Home className="w-5 h-5 text-blue-600" />
                      </div>
                      <Badge className={statusColor[p.status || "active"]}>
                        {p.status || "active"}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug">{p.address}</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                      <MapPin className="w-3 h-3" />
                      {p.city}, {p.state}
                    </div>
                    {p.mls_number && (
                      <p className="text-xs text-gray-400 mt-1">MLS# {p.mls_number}</p>
                    )}
                    <div className="mt-4 pt-3 border-t flex items-center gap-1 text-xs text-gray-500">
                      <Camera className="w-3 h-3" />
                      {photoCounts[p.id] ?? 0} photos
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {showAdd && (
        <AddPropertyModal
          onClose={() => setShowAdd(false)}
          onSaved={() => { setShowAdd(false); loadProperties(); }}
        />
      )}
    </div>
  );
}
