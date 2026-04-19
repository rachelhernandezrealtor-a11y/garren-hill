import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { EditableText, EditableImage } from '@/components/EditableText';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

export default function NewMainResidenceSection({ section }) {
  const { id, eyebrow, title, p1, p2, images, reverse } = section;
  const [displayImages, setDisplayImages] = useState(images);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadSavedImages = async () => {
      try {
        const savedImages = await base44.entities.ImageContent.filter({
          content_id: { $in: images.map((img) => img.id) }
        });

        if (savedImages.length > 0) {
          const updatedImages = images.map((img) => {
            const saved = savedImages.find((s) => s.content_id === img.id);
            return saved ? { ...img, src: saved.image_url } : img;
          });
          setDisplayImages(updatedImages);
        }
      } catch (error) {
        console.warn('Could not load saved images:', error);
      }
    };

    loadSavedImages();
  }, [images]);

  const openLightbox = (img) => {
    setSelectedImage(img);
    setLightboxOpen(true);
  };

  return null;

































































































































}