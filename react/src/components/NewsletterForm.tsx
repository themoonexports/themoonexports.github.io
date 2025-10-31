import { useEffect } from "react";

export function NewsletterForm(): JSX.Element {
  useEffect(() => {
    const forms = window.TheMoonExports?.Forms;
    if (forms?.initNewsletterForm) {
      forms.initNewsletterForm();
    }
  }, []);

  return (
    <div className="newsletter-container">
      <h4>Join Our Newsletter</h4>
      <div id="newsletter-success" className="alert-success" role="alert" style={{ display: "none" }}>
        ✓ Thank you for signing up!
      </div>
      <form
        id="newsletter-form"
        method="POST"
        action="https://zc1.maillist-manage.in/weboptin.zc"
        target="_blank"
      >
        <div id="newsletter-error" className="alert-error" role="alert" style={{ display: "none" }}>
          Please enter a valid email address.
        </div>
        <div className="newsletter-input-group">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="newsletter-email"
            name="CONTACT_EMAIL"
            placeholder="Email"
            required
            aria-describedby="newsletter-error"
            className="input-crafts"
          />
          <button type="submit" className="btn-crafts">Join Now</button>
        </div>
        <input type="hidden" name="zc_trackCode" value="ZCFORMVIEW" />
        <input type="hidden" name="submitType" value="optinCustomView" />
        <input type="hidden" name="lD" value="12160b3e5aa53df" />
        <input type="hidden" name="formType" value="QuickForm" />
        <input type="hidden" name="zx" value="1df85a5c1a" />
        <input type="hidden" name="zcvers" value="2.0" />
        <input type="hidden" name="mode" value="OptinCreateView" />
        <input type="hidden" name="zcld" value="12160b3e5aa53df" />
        <input
          type="hidden"
          name="zc_formIx"
          value="137b4d86d289d2da410d2178fab100046a73058460b2a736"
        />
      </form>
    </div>
  );
}
