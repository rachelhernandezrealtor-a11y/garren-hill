export const SECTION_TEMPLATES = {
  HeroSection: {
    title: "Hero Section",
    description: "Eye-catching hero with call-to-action",
    icon: "Zap",
    category: "Header",
    content: {}
  },
  EstateGroundsSection: {
    title: "Estate Grounds",
    description: "Showcase property grounds and landscape",
    icon: "Trees",
    category: "Content",
    content: {}
  },
  NewVisionSection: {
    title: "New Vision",
    description: "Property stats and capabilities",
    icon: "Lightbulb",
    category: "Content",
    content: {}
  },
  EstateCompoundSection: {
    title: "Estate Compound",
    description: "Main structures and buildings",
    icon: "Building2",
    category: "Content",
    content: {}
  },
  StructuresSection: {
    title: "Structures",
    description: "Architectural structures gallery",
    icon: "Home",
    category: "Gallery",
    content: {}
  },
  FeaturesSection: {
    title: "Features",
    description: "Key property features",
    icon: "Star",
    category: "Content",
    content: {}
  },
  SustainabilitySection: {
    title: "Sustainability",
    description: "Eco-friendly systems and practices",
    icon: "Leaf",
    category: "Content",
    content: {}
  },
  InfrastructureSection: {
    title: "Infrastructure",
    description: "Technical systems and utilities",
    icon: "Zap",
    category: "Gallery",
    content: {}
  },
  ScreenedPorchSection: {
    title: "Screened Porch",
    description: "Porch and outdoor spaces",
    icon: "Wind",
    category: "Gallery",
    content: {}
  },
  ArchitecturalFeaturesSection: {
    title: "Architectural Features",
    description: "Design highlights and details",
    icon: "Palette",
    category: "Gallery",
    content: {}
  },
  StewardshipSection: {
    title: "Stewardship",
    description: "Land stewardship and history",
    icon: "Sprout",
    category: "Content",
    content: {}
  },
  BasementSection: {
    title: "Basement",
    description: "Lower level amenities",
    icon: "Layers",
    category: "Gallery",
    content: {}
  },
  FoyerSection: {
    title: "Foyer",
    description: "Entry and foyer spaces",
    icon: "DoorOpen",
    category: "Gallery",
    content: {}
  },
  GuestHouseSection: {
    title: "Guest House",
    description: "Cabana and guest spaces",
    icon: "Hotel",
    category: "Gallery",
    content: {}
  },
  PropertyShow: {
    title: "Property Experience",
    description: "Interactive property showcase",
    icon: "Layout",
    category: "Content",
    content: {}
  },
  MainResidence: {
    title: "Main Residence",
    description: "Detailed main home presentation",
    icon: "Building",
    category: "Content",
    content: {}
  },
  MainResidenceSection: {
    title: "Main Residence",
    description: "Detailed main home presentation",
    icon: "Building",
    category: "Content",
    content: {}
  }
};

export const CATEGORIES = [...new Set(Object.values(SECTION_TEMPLATES).map(t => t.category))];