export const farmData = {
  landOverview: {
    kicker: 'Estate Land',
    title: 'Regenerative Agricultural Landscape',
    subtitle: 'Working land designed for sustainable production and conservation.',
    stats: [
      { key: 'Total Acreage', value: '380 acres', sub: 'mixed-use estate' },
      { key: 'Pasture & Hay', value: '165 acres', sub: 'rotational grazing' },
      { key: 'Woodlands', value: '120 acres', sub: 'managed forest' },
      { key: 'Infrastructure', value: '95 acres', sub: 'buildings, roads, water' }
    ],
    body: [
      'The 380-acre estate encompasses carefully managed pasture, productive woodlands, and infrastructure designed for both agriculture and conservation. Rolling terrain with water features supports seasonal grazing, hay production, and wildlife habitat.',
      'Modern fencing, water systems, and equipment shelter all support contemporary farming operations. The land is suited for cattle, horses, or diversified agricultural ventures.'
    ],
    galleryGroup: 'land-overview',
    images: [
      { src: 'https://images.unsplash.com/photo-1500595046891-e89fbb58c228?w=1200&h=800&fit=crop', alt: 'Rolling pasture landscape', caption: 'Rolling Pasture • Open Vista' },
      { src: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop', alt: 'Forest treeline', caption: 'Managed Woodlands • Wildlife Corridor' },
      { src: 'https://images.unsplash.com/photo-1574922733968-80c7e48d0f53?w=1200&h=800&fit=crop', alt: 'Water feature', caption: 'Water Systems • Natural Drainage' }
    ]
  },
  
  paddocks: {
    kicker: 'Working Land',
    title: 'Pasture & Paddock System',
    subtitle: 'Rotational grazing infrastructure for livestock management.',
    description: 'The property features 165 acres of improved pasture organized into 12 cross-fenced paddocks with dedicated water points. Modern electric fencing and lane systems support efficient rotational grazing. Native grass mixes and clover species provide high-nutrition forage for cattle and equine operations.',
    tags: ['Rotational grazing', 'Cross-fencing', 'Water infrastructure', 'Pasture renovation', 'Hay production'],
    galleryGroup: 'paddocks',
    images: [
      { src: 'https://images.unsplash.com/photo-1500595046891-e89fbb58c228?w=1200&h=800&fit=crop', alt: 'Fenced paddock', caption: 'Cross-Fenced Paddocks' },
      { src: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop', alt: 'Grazing cattle', caption: 'Rotational Grazing System' },
      { src: 'https://images.unsplash.com/photo-1574922733968-80c7e48d0f53?w=1200&h=800&fit=crop', alt: 'Hay field', caption: 'Hay Production Area' },
      { src: 'https://images.unsplash.com/photo-1500595046891-e89fbb58c228?w=1200&h=800&fit=crop', alt: 'Water trough', caption: 'Water Infrastructure' }
    ]
  },

  facilities: {
    kicker: 'Buildings & Infrastructure',
    title: 'Equipment & Support Structures',
    features: [
      { label: 'Barns', title: '4 Structures', copy: 'Main dairy barn (5,200 SF), equipment storage, hay barn, and equipment shed with modern mechanical systems.' },
      { label: 'Fencing', title: '8 Miles', copy: 'Post and board perimeter, cross-fencing with electric backup, dedicated lane systems for livestock movement.' },
      { label: 'Water Systems', title: 'Multi-point', copy: 'Spring-fed primary system, backup well, multiple troughs per paddock, frost-proof hydrants throughout.' },
      { label: 'Access', title: 'Farm Roads', copy: 'Maintained gravel roads connecting all pastures and structures, designed for equipment and emergency vehicle access.' }
    ],
    galleryGroup: 'facilities',
    images: [
      { src: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop', alt: 'Farm barn', caption: 'Main Barn Structure' },
      { src: 'https://images.unsplash.com/photo-1574922733968-80c7e48d0f53?w=1200&h=800&fit=crop', alt: 'Equipment storage', caption: 'Equipment Storage' },
      { src: 'https://images.unsplash.com/photo-1500595046891-e89fbb58c228?w=1200&h=800&fit=crop', alt: 'Farm fence', caption: 'Cross-Fencing System' }
    ]
  }
};