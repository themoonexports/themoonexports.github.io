import { useEffect, useState } from "react";

interface FooterLink {
  label: string;
  href: string;
  rel?: string;
}

const companyLinks: FooterLink[] = [
  { label: "About Us", href: "about.html" },
  { label: "Contact Us", href: "contact.html" },
  { label: "Privacy Policy", href: "legal/privacy.html" },
  { label: "Terms and Conditions", href: "legal/terms.html" },
  { label: "Impressum", href: "legal/imprint.html" },
  { label: "Content License", href: "license.html", rel: "license" },
  { label: "FAQ", href: "faq.html" }
];

const productLinks: FooterLink[] = [
  { label: "Horn Crafts", href: "horn-crafts.html" },
  { label: "Wooden Crafts", href: "wooden-crafts.html" },
  { label: "Resin Products", href: "resin.html" }
];

export function Footer(): JSX.Element {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <div className="row">
        {/* Company Links */}
        <div className="col-md-3">
          <h4>The Moon Exports</h4>
          <nav aria-label="Footer navigation">
            <ul className="footer-links">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} rel={link.rel}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Product Links */}
        <div className="col-md-3">
          <h4>Products</h4>
          <nav aria-label="Product links">
            <ul className="footer-links">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          
          <h4>Essential Oil</h4>
          <ul className="footer-links">
            <li>
              <a href="https://smellofmoon.com/" target="_blank" rel="noopener">
                Diffuser Essential Oil
              </a>
            </li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div className="col-md-3">
          <h4>Contact</h4>
          <address>
            <strong>Phone:</strong> <a href="tel:+918909070131">+91 8909070131</a>
            <br />
            <strong>Email:</strong>{" "}
            <a href="mailto:info@themoonexports.com">info@themoonexports.com</a>
          </address>
        </div>
        
        {/* Social Media - Placeholder for SocialLinks component */}
        <div className="col-md-3 socialm">
          <h4>Connect with us</h4>
          <div className="social-links" data-react="social-links">
            {/* This will be hydrated by SocialLinks component */}
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="copyright">
        <span>
          COPYRIGHT © <span id="current-year">{currentYear}</span> THEMOONEXPORTS.COM
        </span>
      </div>
    </>
  );
}
