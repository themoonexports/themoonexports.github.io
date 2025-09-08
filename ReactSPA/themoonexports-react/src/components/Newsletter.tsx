import React, { useState } from 'react';
import { ORIGINAL_CONTENT } from '@/constants/content';
import type { NewsletterFormData } from '@/types';

const Newsletter: React.FC = () => {
  const [formData, setFormData] = useState<NewsletterFormData>({ email: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    const email = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
      e.preventDefault();
      setShowError(true);
      setShowSuccess(false);
      return false;
    }
    
    setShowError(false);
    // Form will submit to Zoho
    setTimeout(() => {
      setShowSuccess(true);
      setFormData({ email: '' });
    }, 1000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
    setShowError(false);
  };

  const { newsletter } = ORIGINAL_CONTENT;
  const { zohoConfig } = newsletter;

  return (
    <section className="newsletter-section" aria-label="Newsletter signup">
      <div 
        className="newsletter-container" 
        style={{
          backgroundColor: 'rgb(67, 67, 67)',
          color: 'rgb(166, 166, 166)',
          border: '1px solid rgb(67, 67, 67)',
          overflow: 'hidden',
          margin: '20px auto',
          padding: '20px',
          maxWidth: '400px',
          fontSize: '11px',
          fontFamily: 'Arial',
          textAlign: 'center'
        }}
      >
        <h4 
          style={{
            color: 'rgb(166, 166, 166)',
            fontWeight: 'bold',
            fontSize: '14px',
            fontFamily: 'Verdana',
            textAlign: 'left',
            marginBottom: '15px'
          }}
        >
          {newsletter.title}
        </h4>

        {showSuccess && (
          <div 
            id="newsletter-success"
            style={{
              display: 'block',
              backgroundColor: 'white',
              padding: '10px',
              border: '3px solid rgb(194, 225, 154)',
              margin: '10px 0',
              color: 'rgb(73, 140, 132)',
              fontSize: '14px'
            }}
            role="alert"
          >
            <span>{newsletter.successMessage}</span>
          </div>
        )}

        <form
          id="newsletter-form"
          method="POST"
          action={zohoConfig.action}
          target="_blank"
          aria-label="Newsletter signup form"
          onSubmit={handleSubmit}
        >
          {showError && (
            <div
              id="newsletter-error"
              style={{
                display: 'block',
                backgroundColor: '#FFEBE8',
                padding: '10px',
                color: '#d20000',
                fontSize: '11px',
                margin: '10px 0',
                border: 'solid 1px #ffd9d3'
              }}
              role="alert"
            >
              {newsletter.errorMessage}
            </div>
          )}

          <div style={{ display: 'flex', padding: '10px' }}>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="newsletter-email"
              name="CONTACT_EMAIL"
              placeholder={newsletter.placeholder}
              required
              value={formData.email}
              onChange={handleEmailChange}
              aria-describedby="newsletter-error"
              style={{
                color: 'rgb(217, 217, 217)',
                flex: 1,
                backgroundColor: 'rgb(255, 255, 255)',
                border: '2px solid rgb(255, 255, 255)',
                padding: '8px',
                fontSize: '12px',
                height: '36px',
                borderRadius: '20px 0 0 20px'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: 'rgb(255, 255, 255)',
                color: 'rgb(0, 0, 0)',
                cursor: 'pointer',
                height: '36px',
                border: '1px solid rgb(217, 217, 217)',
                padding: '0 15px',
                fontSize: '13px',
                borderRadius: '0 20px 20px 0',
                fontFamily: "'Open Sans', sans-serif"
              }}
            >
              {newsletter.buttonText}
            </button>
          </div>

          {/* Hidden form fields for Zoho */}
          <input type="hidden" name="zc_trackCode" value={zohoConfig.trackCode} />
          <input type="hidden" name="submitType" value={zohoConfig.submitType} />
          <input type="hidden" name="lD" value={zohoConfig.lD} />
          <input type="hidden" name="formType" value={zohoConfig.formType} />
          <input type="hidden" name="zx" value={zohoConfig.zx} />
          <input type="hidden" name="zcvers" value={zohoConfig.zcvers} />
          <input type="hidden" name="mode" value={zohoConfig.mode} />
          <input type="hidden" name="zcld" value={zohoConfig.zcld} />
          <input type="hidden" name="zc_formIx" value={zohoConfig.formIx} />
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
