import React from 'react';
import { ORIGINAL_CONTENT } from '@/constants/content';
import type { NavigationItem, Language } from '@/types';

interface HeaderProps {
  navigation?: NavigationItem[];
  languages?: Language[];
}

const Header: React.FC<HeaderProps> = ({ 
  navigation = ORIGINAL_CONTENT.navigation.main,
  languages = ORIGINAL_CONTENT.languages 
}) => {
  return (
    <header>
      <div className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button 
              type="button" 
              className="navbar-toggle collapsed" 
              data-toggle="collapse" 
              data-target="#navbar" 
              aria-expanded="false" 
              aria-controls="navbar"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">{ORIGINAL_CONTENT.branding.name}</a>
          </div>
          
          {/* Language selector */}
          <p className="usano">
            {languages.slice(1).map((lang) => (
              <b key={lang.code}>
                <a href={lang.href}>
                  <img 
                    src={lang.flag} 
                    alt={lang.code.toUpperCase()} 
                    className="img-circle lazyload" 
                    width="25" 
                    height="25"
                  />
                </a>
              </b>
            ))}
          </p>
          
          <div id="navbar" className="navbar-collapse navbar-right collapse">
            <ul className="nav navbar-nav">
              {navigation.map((item) => {
                const hasChildren = 'children' in item && item.children;
                return (
                  <li key={item.label} className={hasChildren ? 'dropdown' : ''}>
                    <a 
                      href={item.href}
                      className={hasChildren ? 'dropdown-toggle' : ''}
                      role="button"
                      aria-haspopup={hasChildren ? 'true' : undefined}
                      aria-expanded="false"
                    >
                      {item.label}
                      {hasChildren && <span className="caret"></span>}
                    </a>
                    {hasChildren && (
                      <ul className="dropdown-menu">
                        <a href={item.href}>
                          <img className="hidden-xs lazyload" src="/images/dropdown.jpg" alt="" />
                        </a>
                        {item.children!.map((child) => (
                          <li key={child.label}>
                            <a href={child.href}>{child.label}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
