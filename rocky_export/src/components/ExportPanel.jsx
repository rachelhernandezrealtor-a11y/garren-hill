import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, CheckSquare, AlertCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function ExportPanel({ property, photos }) {
  const [resizeMode, setResizeMode] = useState("mls");
  const [exporting, setExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);

  const mlsPhotos = photos.filter((p) => p.selected_for_mls);
  const allPhotos = photos;

  const resizeOptions = {
    mls: { label: "MLS Standard (2048×1536)", width: 2048, height: 1536 },
    flexmls: { label: "FlexMLS (1024×768)", width: 1024, height: 768 },
    web: { label: "Web Optimized (1600px wide)", width: 1600, height: null },
    original: { label: "Original Size", width: null, height: null },
  };

  const handleExport = async () => {
    const toExport = resizeMode === "original" ? allPhotos : (mlsPhotos.length > 0 ? mlsPhotos : allPhotos);
    if (toExport.length === 0) {
      setExportStatus("no_photos");
      return;
    }

    setExporting(true);
    setExportStatus(null);

    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a JSON list of download URLs for a ZIP export. Property: ${property.address}, ${property.city} ${property.state}. Photos: ${toExport.length} files. Resize mode: ${resizeMode}. Return { "message": "Export ready", "photo_count": ${toExport.length} }`,
        response_json_schema: { type: "object", properties: { message: { type: "string" }, photo_count: { type: "number" } } }
      });

      // Since we can't do server-side ZIP in frontend, we open each photo in a new tab approach
      // or create a downloadable manifest. We'll create a simple download approach.
      createDownloadManifest(toExport, property);
      setExportStatus("success");
    } catch (e) {
      setExportStatus("error");
    }
    setExporting(false);
  };

  const createDownloadManifest = (photoList, prop) => {
    const lines = photoList.map((p, i) =>
      `${i + 1}. [${p.room || "unknown"}] [${p.orientation || "h"}] ${p.file_url}`
    );
    const content = `Photo Hub Export\nProperty: ${prop.address}, ${prop.city} ${prop.state}\nMLS#: ${prop.mls_number || "N/A"}\nExport Mode: ${resizeMode}\nTotal Photos: ${photoList.length}\n\n` + lines.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PhotoHub_${prop.address.replace(/\s+/g, "_")}_${resizeMode}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    // Also trigger individual photo downloads
    photoList.forEach((p, i) => {
      setTimeout(() => {
        const a2 = document.createElement("a");
        a2.href = p.file_url;
        a2.download = `photo_${String(i + 1).padStart(3, "0")}_${p.room || "photo"}.jpg`;
        a2.target = "_blank";
        a2.click();
      }, i * 300);
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Export Photos</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <Label className="mb-1 block text-sm">Export Size / Format</Label>
              <Select value={resizeMode} onValueChange={setResizeMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(resizeOptions).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500">Photos to export:</span>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-blue-100 text-blue-700">{mlsPhotos.length} selected for MLS</Badge>
                <span className="text-xs text-gray-400">/ {photos.length} total</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {mlsPhotos.length > 0 ? "Will export MLS-selected photos" : "No MLS photos selected — will export all"}
              </p>
            </div>
          </div>

          {exportStatus === "no_photos" && (
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm mb-4">
              <AlertCircle className="w-4 h-4" />
              No photos available to export.
            </div>
          )}
          {exportStatus === "success" && (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg p-3 text-sm mb-4">
              <CheckSquare className="w-4 h-4" />
              Export started! Photos are downloading individually.
            </div>
          )}

          <Button
            onClick={handleExport}
            disabled={exporting || photos.length === 0}
            className="bg-blue-600 hover:bg-blue-700 gap-2"
          >
            <Download className="w-4 h-4" />
            {exporting ? "Preparing…" : `Export ${mlsPhotos.length > 0 ? mlsPhotos.length : photos.length} Photos`}
          </Button>
        </CardContent>
      </Card>

      {/* MLS checklist summary */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-800 mb-3">MLS Photo Checklist</h3>
          {photos.length === 0 ? (
            <p className="text-sm text-gray-400">No photos uploaded yet.</p>
          ) : (
            <div className="space-y-2">
              {photos.map((p) => (
                <div key={p.id} className="flex items-center gap-3 text-sm">
                  <CheckSquare className={`w-4 h-4 ${p.selected_for_mls ? "text-blue-600" : "text-gray-200"}`} />
                  <span className={p.selected_for_mls ? "text-gray-800" : "text-gray-400"}>
                    {p.room ? p.room.replace(/_/g, " ") : "Unknown room"} · {p.orientation || "horizontal"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}