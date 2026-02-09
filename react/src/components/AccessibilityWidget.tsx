import React, { useState, useEffect, useCallback } from 'react';

interface A11yPreferences {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
}

const A11Y_STORAGE_KEY = 'tme_a11y_prefs';
const DEFAULT_FONT_SIZE = 16;
const FONT_STEP = 2;
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;

function loadPrefs(): A11yPreferences {
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return { fontSize: DEFAULT_FONT_SIZE, highContrast: false, reducedMotion: false };
    return JSON.parse(raw);
  } catch {
    return { fontSize: DEFAULT_FONT_SIZE, highContrast: false, reducedMotion: false };
  }
}

function savePrefs(prefs: A11yPreferences): void {
  localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs));
}

const AccessibilityWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPreferences>(loadPrefs);

  const applyPrefs = useCallback((p: A11yPreferences) => {
    document.documentElement.style.fontSize = `${p.fontSize}px`;
    document.documentElement.classList.toggle('high-contrast', p.highContrast);
    document.documentElement.classList.toggle('reduced-motion', p.reducedMotion);
  }, []);

  useEffect(() => {
    const saved = loadPrefs();
    setPrefs(saved);
    applyPrefs(saved);
  }, [applyPrefs]);

  useEffect(() => {
    applyPrefs(prefs);
    savePrefs(prefs);
  }, [prefs, applyPrefs]);

  const increaseFontSize = () =>
    setPrefs((p) => ({ ...p, fontSize: Math.min(p.fontSize + FONT_STEP, MAX_FONT_SIZE) }));

  const decreaseFontSize = () =>
    setPrefs((p) => ({ ...p, fontSize: Math.max(p.fontSize - FONT_STEP, MIN_FONT_SIZE) }));

  const resetFontSize = () =>
    setPrefs((p) => ({ ...p, fontSize: DEFAULT_FONT_SIZE }));

  const toggleHighContrast = () =>
    setPrefs((p) => ({ ...p, highContrast: !p.highContrast }));

  const toggleReducedMotion = () =>
    setPrefs((p) => ({ ...p, reducedMotion: !p.reducedMotion }));

  return (
    <div className="accessibility-widget">
      <button
        className="accessibility-toggle btn-icon-crafts"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Accessibility options"
        title="Accessibility"
      >
        <i className="fas fa-universal-access" aria-hidden="true"></i>
      </button>

      {open && (
        <div className="accessibility-panel card-crafts" role="dialog" aria-label="Accessibility settings">
          <h4>Accessibility</h4>
          <div className="a11y-controls">
            <div className="a11y-group">
              <span>Font Size</span>
              <div className="a11y-buttons">
                <button className="btn-icon-crafts" onClick={decreaseFontSize} aria-label="Decrease font size">A-</button>
                <button className="btn-icon-crafts" onClick={resetFontSize} aria-label="Reset font size">A</button>
                <button className="btn-icon-crafts" onClick={increaseFontSize} aria-label="Increase font size">A+</button>
              </div>
            </div>
            <label className="a11y-toggle-label">
              <input type="checkbox" checked={prefs.highContrast} onChange={toggleHighContrast} />
              High Contrast
            </label>
            <label className="a11y-toggle-label">
              <input type="checkbox" checked={prefs.reducedMotion} onChange={toggleReducedMotion} />
              Reduced Motion
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityWidget;
