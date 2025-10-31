export function TrustBadges(): JSX.Element {
  return (
    <section className="payment-info" aria-label="Trust and payment information">
      <div className="trust-badge">
        <span className="badge-icon">🛡️</span>
        <span className="badge-text">Trusted Exporter</span>
      </div>
      
      <div className="company-logo">
        <a
          href="https://commons.wikimedia.org/wiki/File:The_Moon_Exports.svg"
          target="_blank"
          rel="noopener"
          aria-label="View company logo"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/The_Moon_Exports.svg/128px-The_Moon_Exports.svg.png"
            alt="The Moon Exports"
            width={112}
            height={112}
            loading="lazy"
          />
        </a>
        <p className="company-tagline">Authentic Handicrafts Since 2015</p>
      </div>
      
      <div className="payment-logo">
        <p className="payment-text">Secure International Payments</p>
        <a
          href="https://www.paypal.com/in/webapps/mpp/paypal-popup"
          target="_blank"
          rel="noopener"
          aria-label="PayPal secure payments"
        >
          <img
            src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/IN/logo-center/logo-center-other-options-blue-secured-pp.png"
            alt="Secured by PayPal"
            width={150}
            height={60}
            loading="lazy"
          />
        </a>
      </div>
    </section>
  );
}
