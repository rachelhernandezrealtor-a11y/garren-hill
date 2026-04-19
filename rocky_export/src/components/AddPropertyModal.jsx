import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

export default function AddPropertyModal({ onClose, onSaved, property }) {
  const [form, setForm] = useState({
    address: property?.address || "",
    city: property?.city || "",
    state: property?.state || "",
    mls_number: property?.mls_number || "",
    vimeo_url: property?.vimeo_url || "",
    matterport_url: property?.matterport_url || "",
    status: property?.status || "active",
  });
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    if (property) {
      await base44.entities.Property.update(property.id, form);
    } else {
      const token = Math.random().toString(36).substring(2, 12);
      await base44.entities.Property.create({ ...form, gallery_token: token });
    }
    onSaved();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{property ? "Edit Property" : "Add Property"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <Label>Street Address *</Label>
            <Input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="123 Main St" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>City *</Label>
              <Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Miami" />
            </div>
            <div>
              <Label>State *</Label>
              <Select value={form.state} onValueChange={(v) => set("state", v)}>
                <SelectTrigger><SelectValue placeholder="State" /></SelectTrigger>
                <SelectContent>
                  {US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>MLS Number</Label>
              <Input value={form.mls_number} onChange={(e) => set("mls_number", e.target.value)} placeholder="A12345" />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => set("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Vimeo URL</Label>
            <Input value={form.vimeo_url} onChange={(e) => set("vimeo_url", e.target.value)} placeholder="https://vimeo.com/..." />
          </div>
          <div>
            <Label>Matterport URL</Label>
            <Input value={form.matterport_url} onChange={(e) => set("matterport_url", e.target.value)} placeholder="https://my.matterport.com/..." />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving || !form.address || !form.city || !form.state} className="bg-blue-600 hover:bg-blue-700">
              {saving ? "Saving…" : "Save Property"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}