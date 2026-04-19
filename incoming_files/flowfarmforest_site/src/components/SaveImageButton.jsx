import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function SaveImageButton({ imageUrl, title, section }) {
  const [isSaved, setIsSaved] = useState(false);
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: () => base44.entities.SavedImage.create({ image_url: imageUrl, title, section }),
    onSuccess: () => {
      setIsSaved(true);
      queryClient.invalidateQueries({ queryKey: ['savedImages'] });
      setTimeout(() => setIsSaved(false), 2000);
    },
  });

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => saveMutation.mutate()}
        disabled={saveMutation.isPending}
        className="text-white/60 hover:text-white"
      >
        <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
      </Button>
    </motion.div>
  );
}