// Centralized content management for the entire website
// Edit text, images, and site data in one place

export const siteContent = {
  // Navigation
  navigation: [
    { label: 'Home', href: '/Home' },
    { label: 'Location', href: '/Location' },
    { label: 'Estate at a Glance', href: '/estate-at-a-glance' },
  ],

  // Property branding
  property: {
    name: 'Flow Farm',
    location: '107 Linden Trail Aberdeen, NC 28315',
    phone: null, // Add if needed
    email: null, // Add if needed
  },

  // CTA buttons
  cta: {
    primary: 'Request Private Viewing',
    primaryHref: '#contact',
    secondary: 'Learn More',
    secondaryHref: '#vision',
  },

  // Global messaging
  messaging: {
    heroTagline: 'A Regenerative Estate',
    heroSubtitle: 'Agricultural legacy meets architectural excellence',
    footerCopy: '© 2025 Flow Farm. All rights reserved.',
  }
};

export default siteContent;