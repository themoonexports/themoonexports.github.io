import React, { useEffect, useState } from 'react';

interface ConsentPreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'tme_cookie_consent_v1';

function loadPreferences(): ConsentPreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing ?? false),
    };
  } catch {
    return null;
  }
}

function savePreferences(prefs: ConsentPreferences): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      analytics: prefs.analytics,
      marketing: prefs.marketing,
      timestamp: Date.now(),
    })
  );
  // Notify legacy consent bridge
  const consentApi = window.TheMoonExports?.Consent;
  if (consentApi?.onReady) {
    consentApi.onReady(() => ({ analytics: prefs.analytics, timestamp: Date.now() }));
  }
}

const CookieSettings: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPreferences>(() => loadPreferences() ?? { essential: true, analytics: false, marketing: false });

  useEffect(() => {
    const saved = loadPreferences();
    if (saved) setPrefs(saved);
  }, []);

  const handleToggle = (key: 'analytics' | 'marketing') => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    savePreferences(prefs);
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        className="cookie-settings-trigger btn-crafts btn-crafts--sm"
        onClick={() => setOpen(true)}
        aria-label="Cookie settings"
      >
        <i className="fas fa-cookie-bite" aria-hidden="true"></i> Cookie Settings
      </button>
    );
  }

  return (
    <div className="cookie-settings-panel card-crafts" role="dialog" aria-label="Cookie preferences">
      <h3>Cookie Preferences</h3>
      <p>Manage your cookie preferences below. Essential cookies are always active.</p>
      <ul className="cookie-settings-list">
        <li className="cookie-settings-item">
          <label className="cookie-settings-label">
            <input type="checkbox" checked disabled aria-label="Essential cookies (always on)" />
            <span><strong>Essential</strong> — Required for site functionality</span>
          </label>
        </li>
        <li className="cookie-settings-item">
          <label className="cookie-settings-label">
            <input
              type="checkbox"
              checked={prefs.analytics}
              onChange={() => handleToggle('analytics')}
              aria-label="Analytics cookies"
            />
            <span><strong>Analytics</strong> — Help us understand site usage</span>
          </label>
        </li>
        <li className="cookie-settings-item">
          <label className="cookie-settings-label">
            <input
              type="checkbox"
              checked={prefs.marketing}
              onChange={() => handleToggle('marketing')}
              aria-label="Marketing cookies"
            />
            <span><strong>Marketing</strong> — Used for targeted advertising</span>
          </label>
        </li>
      </ul>
      <div className="cookie-settings-actions">
        <button className="btn-crafts" onClick={handleSave}>Save Preferences</button>
        <button className="btn-crafts btn-crafts--sm" onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default CookieSettings;
