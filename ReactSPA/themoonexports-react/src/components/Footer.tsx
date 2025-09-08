import React from 'react';
import { ORIGINAL_CONTENT } from '@/constants/content';
import Newsletter from './Newsletter';
import type { NavigationItem, ContactInfo, SocialLink } from '@/types';

interface FooterProps {
  companyNav?: NavigationItem[];
  productNav?: NavigationItem[];
  essentialOilNav?: NavigationItem[];
  contact?: ContactInfo;
  social?: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ 
  companyNav = ORIGINAL_CONTENT.navigation.footer.company,
  productNav = ORIGINAL_CONTENT.navigation.footer.products,
  essentialOilNav = ORIGINAL_CONTENT.navigation.footer.essentialOil,
  contact = ORIGINAL_CONTENT.contact,
  social = ORIGINAL_CONTENT.social
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-bottom" role="contentinfo">
      <div className="container">
        <div className="row">
          {/* Company Navigation */}
          <div className="col-md-3">
            <h4>{ORIGINAL_CONTENT.branding.name}</h4>
            <nav aria-label="Footer navigation">
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {companyNav.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Products Navigation */}
          <div className="col-md-3">
            <h4>Products</h4>
            <nav aria-label="Product links">
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {productNav.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <h4>Essential Oil</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {essentialOilNav.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-md-3">
            <h4>Contact</h4>
            <address>
              <strong>Contact No.:</strong> <a href={contact.phoneHref}>{contact.phone}</a><br />
              <strong>Email:</strong> <a href={contact.emailHref}>{contact.email}</a>
            </address>
          </div>

          {/* Social Media Links */}
          <div className="col-md-3 socialm">
            <h4>Connect with us</h4>
            <div className="social-links" role="group" aria-label="Social media links">
              {social.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <i className={link.icon} aria-hidden="true"></i>
                  <span className="sr-only">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Newsletter signup section */}
        <Newsletter />

        {/* Company Logo and Payment Info */}
        <section className="payment-info" style={{ clear: 'both', marginTop: '20px', textAlign: 'center' }}>
          <div className="company-logo" style={{ marginBottom: '20px' }}>
            <a
              href={ORIGINAL_CONTENT.branding.logo.href}
              title="The Moon Exports logo on Wikimedia Commons"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                width={ORIGINAL_CONTENT.branding.logo.width}
                height={ORIGINAL_CONTENT.branding.logo.height}
                alt={ORIGINAL_CONTENT.branding.logo.alt}
                src={ORIGINAL_CONTENT.branding.logo.src}
                loading="lazy"
              />
            </a>
          </div>
          <div className="payment-logo">
            <a
              href={ORIGINAL_CONTENT.branding.paypal.href}
              title="How PayPal Works"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  ORIGINAL_CONTENT.branding.paypal.href,
                  'WIPaypal',
                  'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'
                );
              }}
            >
              <img
                src={ORIGINAL_CONTENT.branding.paypal.src}
                alt={ORIGINAL_CONTENT.branding.paypal.alt}
                width={ORIGINAL_CONTENT.branding.paypal.width}
                height={ORIGINAL_CONTENT.branding.paypal.height}
                loading="lazy"
              />
            </a>
          </div>
        </section>

        {/* Copyright */}
        <div className="copyright" style={{ 
          marginTop: '20px', 
          textAlign: 'center', 
          borderTop: '1px solid #eee', 
          paddingTop: '20px' 
        }}>
          <span>{ORIGINAL_CONTENT.branding.copyright.replace('{year}', currentYear.toString())}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
