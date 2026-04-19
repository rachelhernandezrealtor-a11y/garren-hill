import { base44 } from '@/api/base44Client';

export function trackInteractionEvent(eventName, properties = {}) {
  base44.analytics.track({ eventName, properties });
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, { ...properties, event_category: 'engagement' });
  }

  const record = {
    event_name: eventName,
    page_path: window.location.pathname,
    item_label: properties.item_label ?? properties.image_title ?? properties.image_alt ?? properties.image_caption ?? undefined,
    item_category: properties.category ?? undefined,
    item_group: properties.group ?? undefined,
    direction: properties.direction ?? undefined,
    position: typeof properties.position === 'number' ? properties.position : undefined,
    total_items: typeof properties.total_images === 'number' ? properties.total_images : undefined,
  };

  void base44.entities.InteractionEvent.create(record).catch(() => {});
}