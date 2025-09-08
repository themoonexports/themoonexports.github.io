// Content preservation constants and mappings for React migration
// This file maintains exact original content to ensure design consistency

export const ORIGINAL_CONTENT = {
  // Hero carousel content - preserve exact wording
  hero: {
    slides: [
      {
        id: "slide-1",
        image: "/images/one.jpg",
        alt: "The Moon Exports crafts showcase",
        title: "The Truth is The Everlasting",
        subtitle: "The Moon Exports",
        ctaText: "Enquiry",
        ctaLink: "/contact"
      },
      {
        id: "slide-2", 
        image: "/images/two.jpg",
        alt: "The Moon Exports product range",
        title: "The Truth is The Everlasting",
        subtitle: "The Moon Exports",
        ctaText: "Enquiry",
        ctaLink: "/contact"
      }
    ]
  },

  // Product categories - preserve exact structure
  categories: [
    {
      id: "horn-crafts",
      name: "Horn Crafts",
      slug: "horn-crafts",
      description: "Traditional horn craft products",
      image: "/images/Horn-Crafts.JPG",
      href: "/horn-crafts"
    },
    {
      id: "wooden-crafts", 
      name: "Wooden Crafts",
      slug: "wooden-crafts", 
      description: "Handcrafted wooden products",
      image: "/images/pizza-cutter.jpg",
      href: "/wooden-crafts"
    },
    {
      id: "resin-products",
      name: "Resin Products", 
      slug: "resin",
      description: "Modern resin craft items",
      image: "/images/resin-bangle.jpg",
      href: "/resin"
    }
  ],

  // Navigation structure - preserve exact menu items
  navigation: {
    main: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { 
        label: "Handicrafts",
        href: "/products",
        children: [
          { label: "Horn Crafts", href: "/horn-crafts" },
          { label: "Buffalo Horn Plates", href: "/buffalo-horn-plates" },
          { label: "Wooden Crafts", href: "/wooden-crafts" },
          { label: "Resin Products", href: "/resin" }
        ]
      },
      { label: "Contact Us", href: "/contact" }
    ],
    
    footer: {
      company: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Terms and Conditions", href: "/legal/terms" },
        { label: "Impressum", href: "/legal/imprint" },
        { label: "Content License", href: "/license" },
        { label: "FAQ", href: "/faq" }
      ],
      products: [
        { label: "Horn Crafts", href: "/horn-crafts" },
        { label: "Wooden Crafts", href: "/wooden-crafts" },
        { label: "Resin Products", href: "/resin" }
      ],
      essentialOil: [
        { 
          label: "Diffuser essential oil", 
          href: "https://smellofmoon.com/",
          external: true
        }
      ]
    }
  },

  // Contact information - preserve exact formatting
  contact: {
    phone: "+91 8909070131",
    email: "info@themoonexports.com",
    phoneHref: "tel:+918909070131",
    emailHref: "mailto:info@themoonexports.com"
  },

  // Social media links - preserve exact URLs
  social: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/themoonexports",
      icon: "fab fa-facebook-f",
      label: "Facebook"
    },
    {
      platform: "twitter", 
      url: "https://twitter.com/themoonexports",
      icon: "fab fa-twitter",
      label: "Twitter"
    },
    {
      platform: "instagram",
      url: "https://instagram.com/themoonexports/", 
      icon: "fab fa-instagram",
      label: "Instagram"
    },
    {
      platform: "pinterest",
      url: "https://www.pinterest.com/themoonexports/",
      icon: "fab fa-pinterest-p", 
      label: "Pinterest"
    },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/company/themoonexports/",
      icon: "fab fa-linkedin-in",
      label: "LinkedIn"
    }
  ],

  // Languages - preserve exact structure
  languages: [
    {
      code: "en",
      name: "English", 
      flag: "/images/english.png",
      href: "/"
    },
    {
      code: "de",
      name: "Deutsch",
      flag: "/images/german.png", 
      href: "/de"
    },
    {
      code: "fr", 
      name: "Français",
      flag: "/images/french.png",
      href: "/fr"
    }
  ],

  // Company branding - preserve exact content
  branding: {
    name: "The Moon Exports",
    tagline: "The Truth is The Everlasting",
    logo: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/The_Moon_Exports.svg/128px-The_Moon_Exports.svg.png",
      alt: "The Moon Exports logo",
      width: 112,
      height: 112,
      href: "https://commons.wikimedia.org/wiki/File:The_Moon_Exports.svg"
    },
    paypal: {
      src: "https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/IN/logo-center/logo-center-other-options-blue-secured-pp.png",
      alt: "Secured by PayPal",
      width: 150,
      height: 60,
      href: "https://www.paypal.com/in/webapps/mpp/paypal-popup"
    },
    copyright: "COPYRIGHT © {year} THEMOONEXPORTS.COM"
  },

  // Newsletter configuration - preserve exact Zoho integration
  newsletter: {
    title: "Join Our Newsletter", 
    placeholder: "Email",
    buttonText: "Join Now",
    successMessage: "✓ Thank you for signing up!",
    errorMessage: "Please enter a valid email address.",
    zohoConfig: {
      action: "https://zc1.maillist-manage.in/weboptin.zc",
      trackCode: "ZCFORMVIEW",
      submitType: "optinCustomView", 
      lD: "12160b3e5aa53df",
      formType: "QuickForm",
      zx: "1df85a5c1a",
      zcvers: "2.0",
      mode: "OptinCreateView",
      zcld: "12160b3e5aa53df",
      formIx: "137b4d86d289d2da410d2178fab100046a73058460b2a736"
    }
  },

  // Analytics configuration - preserve exact IDs
  analytics: {
    googleAnalytics: "UA-64284432-2",
    yandexMetrika: 52371760
  }
} as const;

// Color scheme preservation - from original CSS
export const ORIGINAL_COLORS = {
  background: "#191919",
  text: "#D3D3D3", 
  white: "#fff",
  lightGray: "#eee",
  darkGray: "#333",
  black: "#000"
} as const;

// Typography preservation
export const ORIGINAL_TYPOGRAPHY = {
  fontFamily: "sans-serif",
  headingColor: "#fff"
} as const;
