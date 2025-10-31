import React, { useState } from 'react';
import { useConsent } from '../hooks/useConsent';

const ContactForm: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { analytics } = useConsent();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate Zoho integration
    const email = (e.currentTarget.elements.namedItem('CONTACT_EMAIL') as HTMLInputElement)?.value;
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      setSuccess(false);
      return;
    }
    setError('');
    setSuccess(true);
    // Consent-aware tracking
    if (analytics && window.ga) {
      window.ga('send', 'event', 'Contact', 'submit', email);
    }
    if (analytics && window.ym) {
      window.ym(12345678, 'reachGoal', 'contact_submit');
    }
  };

  return (
    <form id="contact-form" method="POST" action="https://zc1.maillist-manage.in/weboptin.zc" target="_blank" onSubmit={handleSubmit}>
      {success && <div className="alert-success" role="alert">✓ Thank you for contacting us!</div>}
      {error && <div className="alert-error" role="alert">{error}</div>}
      <div className="form-group">
        <label htmlFor="contact-email">Email address</label>
        <input type="email" id="contact-email" name="CONTACT_EMAIL" required className="input-crafts" />
      </div>
      <div className="form-group">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="CONTACT_MESSAGE" required className="textarea-crafts" />
      </div>
      <button type="submit" className="btn-crafts">Send</button>
    </form>
  );
};

export default ContactForm;
