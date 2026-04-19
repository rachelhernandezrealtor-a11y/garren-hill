import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Check, Copy } from 'lucide-react';
import { EditingContext } from '@/components/EditingContext';
import { toast } from 'sonner';

export default function ApprovalDialog({ data, onApprove, onReject }) {
  const editingContext = useContext(EditingContext);

  if (!data) return null;

  const handleApprove = () => {
    if (editingContext?.selectedElement) {
      // Apply ChatGPT's raw response without modification
      if (editingContext.selectedElement.type === 'textarea') {
        editingContext.selectedElement.element.value = data.content;
        editingContext.selectedElement.element.dispatchEvent(new Event('input', { bubbles: true }));
      } else {
        editingContext.selectedElement.element.textContent = data.content;
      }
      toast.success('Content applied from ChatGPT');
      onApprove();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data.content);
    toast.success('Copied to clipboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onReject}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="font-semibold text-lg">Review Generated Content</h3>
          <button
            onClick={onReject}
            className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Original */}
            <div>
              <h4 className="text-sm font-semibold text-slate-600 mb-2">Original Content</h4>
              <div className="bg-slate-50 p-4 rounded border border-slate-200 text-sm text-slate-600 whitespace-pre-wrap max-h-40 overflow-y-auto">
                {data.original || '(No original content)'}
              </div>
            </div>

            {/* Generated */}
            <div>
              <h4 className="text-sm font-semibold text-slate-600 mb-2">Generated Content</h4>
              <div className="bg-blue-50 p-4 rounded border border-blue-200 text-sm text-slate-700 whitespace-pre-wrap">
                {data.content}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-6 border-t border-slate-200 bg-slate-50">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-white rounded border border-slate-300 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onReject}
              className="px-4"
            >
              Reject
            </Button>
            <Button
              onClick={handleApprove}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Insert Content
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}