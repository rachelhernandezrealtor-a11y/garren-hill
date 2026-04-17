import { useState, useEffect } from "react";
import { Property } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Home, Plus, ArrowRight, Copy, Check, FileImage } from "lucide-react";
import { Link } from "react-router-dom";

const statusColors = {
  Importing: "bg-blue-100 text-blue-700",
  Reviewing: "bg-yellow-100 text-yellow-700",
  Complete: "bg-green-100 text-green-700",
};

const GALLERY_BASE = "https://rocky-app-b6e5df8e.base44.app/Gallery";

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ address: "", city: "", state: "", notes: "", mls_number: "" });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    Property.list("-created_date")
      .then((data) => { setProperties(data || []); setPageLoading(false); })
      .catch(() => setPageLoading(false));
  }, []);

  const handleCreate = async () => {
    if (!form.address) return;
    setLoading(true);
    try {
      const p = await Property.create({ ...form, status: "Importing", photo_count: 0 });
      setProperties((prev) => [p, ...prev]);
      setShowNew(false);
      setForm({ address: "", city: "", state: "", notes: "", mls_number: "" });
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const copyGalleryLink = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const link = `${GALLERY_BASE}?property=${id}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  if (pageLoading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Photo Hub</h1>
              <p className="text-sm text-gray-500">Rachel Hernandez Real Estate</p>
            </div>
          </div>
          <Button onClick={() => setShowNew(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" /> New Property
          </Button>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20">
            <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No properties yet</h3>
            <p className="text-sm text-gray-400 mb-6">Create your first property to start organizing photos</p>
            <Button onClick={() => setShowNew(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="w-4 h-4" /> New Property
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((p) => (
              <div key={p.id} className="relative group">
                <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <Link to={`/Import?property=${p.id}`}>
                      {p.thumbnail_url ? (
                        <div className="w-full h-36 rounded-lg overflow-hidden mb-4 bg-gray-100">
                          <img src={p.thumbnail_url} alt={p.address} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-full h-36 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-4">
                          <Home className="w-10 h-10 text-blue-300" />
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{p.address}</h3>
                          {(p.city || p.state) && (
                            <p className="text-sm text-gray-500">{[p.city, p.state].filter(Boolean).join(", ")}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <p className="text-xs text-gray-400">{p.photo_count || 0} photos</p>
                            {p.mls_number && <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">MLS# {p.mls_number}</span>}
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${statusColors[p.status] || "bg-gray-100 text-gray-600"}`}>
                          {p.status}
                        </span>
                      </div>
                    </Link>

                    {/* Quick action buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      <Link to={`/Review?property=${p.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full text-xs h-8 gap-1">
                          <ArrowRight className="w-3 h-3" /> Review
                        </Button>
                      </Link>
                      <Link to={`/MLS?property=${p.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full text-xs h-8 gap-1 text-blue-600 border-blue-200 hover:bg-blue-50">
                          <FileImage className="w-3 h-3" /> MLS
                        </Button>
                      </Link>
                      <button
                        onClick={(e) => copyGalleryLink(e, p.id)}
                        className="flex-1 h-8 px-2 rounded-md border border-gray-200 text-xs flex items-center justify-center gap-1 hover:bg-gray-50 transition-colors"
                      >
                        {copiedId === p.id ? <><Check className="w-3 h-3 text-green-500" />Copied!</> : <><Copy className="w-3 h-3 text-gray-400" />Gallery</>}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>New Property</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Street Address *</Label>
              <Input placeholder="123 Main Street" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>City</Label>
                <Input placeholder="New York" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>State</Label>
                <Input placeholder="NY" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="mt-1" />
              </div>
            </div>
            <div>
              <Label>MLS Number</Label>
              <Input placeholder="e.g. 12345678" value={form.mls_number} onChange={(e) => setForm({ ...form, mls_number: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label>Notes (optional)</Label>
              <Input placeholder="Any notes about this property..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="mt-1" />
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
