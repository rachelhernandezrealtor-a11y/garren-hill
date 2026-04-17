import { useState, useEffect } from "react";
import { Property } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Home, Plus, Camera, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const statusColors = {
  Importing: "bg-blue-100 text-blue-700",
  Reviewing: "bg-yellow-100 text-yellow-700",
  Complete: "bg-green-100 text-green-700",
};

const statusIcons = {
  Importing: <Clock className="w-3 h-3" />,
  Reviewing: <Camera className="w-3 h-3" />,
  Complete: <CheckCircle className="w-3 h-3" />,
};

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ address: "", city: "", state: "", notes: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Property.list("-created_date").then(setProperties);
  }, []);

  const handleCreate = async () => {
    if (!form.address) return;
    setLoading(true);
    const p = await Property.create({ ...form, status: "Importing", photo_count: 0 });
    setProperties([p, ...properties]);
    setShowNew(false);
    setForm({ address: "", city: "", state: "", notes: "" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Property Photos</h1>
              <p className="text-sm text-gray-500">Your photo organization system</p>
            </div>
          </div>
          <Button onClick={() => setShowNew(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" />
            New Property
          </Button>
        </div>

        {/* Properties Grid */}
        {properties.length === 0 ? (
          <div className="text-center py-20">
            <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No properties yet</h3>
            <p className="text-sm text-gray-400 mb-6">Create your first property to start organizing photos</p>
            <Button onClick={() => setShowNew(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="w-4 h-4" />
              New Property
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((p) => (
              <Link key={p.id} to={`/import?property=${p.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
                  <CardContent className="p-5">
                    {p.thumbnail_url ? (
                      <div className="w-full h-36 rounded-lg overflow-hidden mb-4 bg-gray-100">
                        <img src={p.thumbnail_url} alt={p.address} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-full h-36 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-4">
                        <Home className="w-10 h-10 text-blue-300" />
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{p.address}</h3>
                        {(p.city || p.state) && (
                          <p className="text-sm text-gray-500">{[p.city, p.state].filter(Boolean).join(", ")}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">{p.photo_count || 0} photos</p>
                      </div>
                      <div className="flex-shrink-0 flex flex-col items-end gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[p.status]}`}>
                          {statusIcons[p.status]}
                          {p.status}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* New Property Dialog */}
      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Property</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Street Address *</Label>
              <Input
                placeholder="123 Main Street"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>City</Label>
                <Input
                  placeholder="New York"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>State</Label>
                <Input
                  placeholder="NY"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Notes (optional)</Label>
              <Input
                placeholder="Any notes about this property..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!form.address || loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? "Creating..." : "Create & Upload Photos"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
