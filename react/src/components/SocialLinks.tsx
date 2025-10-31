import { useTracking } from "@hooks/useTracking";

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

const socialLinks: SocialLink[] = [
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
];

export function SocialLinks(): JSX.Element {
  const { trackEvent } = useTracking();

  const handleClick = (platform: string) => {
    trackEvent("social", "click", platform);
  };

  return (
    <div className="social-links">
      {socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener"
          aria-label={link.label}
          onClick={() => handleClick(link.platform)}
        >
          <i className={link.icon} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
