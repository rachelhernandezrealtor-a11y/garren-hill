import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Upload, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

export default function PageImportExport({ pageName = 'Home' }) {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const sections = await base44.entities.PageSection.filter({ page_name: pageName });
      const exportData = {
        pageName,
        timestamp: new Date().toISOString(),
        sections: sections.map(s => ({
          section_type: s.section_type,
          order: s.order,
          title: s.title,
          content: s.content,
          visible: s.visible
        }))
      };

      const jsonStr = JSON.stringify(exportData, null, 2);
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonStr));
      element.setAttribute('download', `${pageName}-export-${Date.now()}.json`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setShowMenu(false);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export page');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const text = await file.text();
      const importData = JSON.parse(text);

      if (!importData.sections || !Array.isArray(importData.sections)) {
        alert('Invalid file format');
        return;
      }

      // Delete existing sections
      const existingSections = await base44.entities.PageSection.filter({ page_name: pageName });
      for (const section of existingSections) {
        await base44.entities.PageSection.delete(section.id);
      }

      // Import new sections
      for (const section of importData.sections) {
        await base44.entities.PageSection.create({
          page_name: pageName,
          section_type: section.section_type,
          order: section.order,
          title: section.title,
          content: section.content,
          visible: section.visible ?? true
        });
      }

      alert('Page imported successfully! Refreshing...');
      window.location.reload();
      setShowMenu(false);
    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import page: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyJson = async () => {
    try {
      const sections = await base44.entities.PageSection.filter({ page_name: pageName });
      const exportData = {
        pageName,
        timestamp: new Date().toISOString(),
        sections: sections.map(s => ({
          section_type: s.section_type,
          order: s.order,
          title: s.title,
          content: s.content,
          visible: s.visible
        }))
      };

      await navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      alert('Failed to copy configuration');
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setShowMenu(!showMenu)}
        variant="outline"
        size="sm"
        className="gap-2">
        <Copy className="w-4 h-4" />
        Copy Page
      </Button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 bg-white border border-border rounded-lg shadow-lg p-2 z-50 min-w-max">

            <button
              onClick={handleExport}
              disabled={loading}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-background rounded transition-colors text-left disabled:opacity-50">
              <Download className="w-4 h-4" />
              Download JSON
            </button>

            <button
              onClick={handleCopyJson}
              disabled={loading}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-background rounded transition-colors text-left disabled:opacity-50">
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy JSON
                </>
              )}
            </button>

            <label className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-background rounded transition-colors cursor-pointer">
              <Upload className="w-4 h-4" />
              Import JSON
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                disabled={loading}
                className="hidden"
              />
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}