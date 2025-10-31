import { useEffect } from "react";

export function Header(): JSX.Element {
  useEffect(() => {
    const init = window.TheMoonExports?.Navigation?.init;
    if (typeof init === "function") {
      init();
    }
  }, []);

  return (
    <header className="masthead" data-react="header">
      <nav className="navbar navbar-default navbar-fixed-top" id="nav-main">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="index.html">
              <img src="images/logo.png" alt="The Moon Exports" loading="eager" />
            </a>
          </div>

          <div className="usano">
            <a href="/de" aria-label="Switch to German">
              <img src="images/german.png" alt="DE" className="img-circle" width={25} height={25} />
            </a>
            <a href="/fr" aria-label="Switch to French">
              <img src="images/french.png" alt="FR" className="img-circle" width={25} height={25} />
            </a>
          </div>

          <div id="navbar" className="navbar-collapse navbar-right collapse">
            <ul className="nav navbar-nav">
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li className="dropdown" data-dropdown-hover>
                <a
                  href="products.html"
                  className="dropdown-toggle"
                  id="nav-handicrafts-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Handicrafts <span className="caret" />
                </a>
                <ul
                  className="dropdown-menu"
                  id="nav-handicrafts-menu"
                  role="menu"
                  aria-labelledby="nav-handicrafts-toggle"
                >
                  <li className="dropdown-hero" role="presentation">
                    <a href="products.html" className="dropdown-hero-link" role="menuitem">
                      <figure className="dropdown-hero-figure">
                        <img
                          className="hidden-xs"
                          src="images/dropdown.jpg"
                          alt="Handcrafted horn, wood, and resin collections"
                          loading="lazy"
                        />
                        <figcaption className="dropdown-hero-caption">
                          Discover handcrafted horn, wood, and resin collections.
                        </figcaption>
                      </figure>
                    </a>
                  </li>
                  <li><a href="horn-crafts.html" role="menuitem">Horn Crafts</a></li>
                  <li><a href="buffalo-horn-plates.html" role="menuitem">Buffalo Horn Plates</a></li>
                  <li><a href="wooden-crafts.html" role="menuitem">Wooden Crafts</a></li>
                  <li><a href="resin.html" role="menuitem">Resin Products</a></li>
                </ul>
              </li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
