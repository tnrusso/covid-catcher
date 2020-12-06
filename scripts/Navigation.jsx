import * as React from 'react';

export function Navigation() {
  React.useEffect(() => {
    let path = window.location.pathname;
    path = path.replace(/\/$/, '');
    path = decodeURIComponent(path);

    const navItems = document.getElementsByTagName('a');
    for (let i = 0; i < navItems.length; i += 1) {
      const { href } = navItems[i];
      if (path.substring(path.lastIndexOf('/') + 1) === href.substring(href.lastIndexOf('/') + 1)) {
        navItems[i].firstElementChild.classList.add('nav-selected');
      }
    }
  });

  return (
    <nav className="navbar navbar-inverse">
      <div className="nav-content">
        <ul className="nav nav-list">
          <li>
            <a className="dark-text" href="/about">
              <div href="/about" className="nav-destination">
                <hr id="top" />
                <p>About</p>
                <hr id="bototm" />
              </div>
            </a>
          </li>
          <li>
            <a className="dark-text" href="/articles">
              <div className="nav-destination">
                <hr id="top" />
                <p>Articles</p>
                <hr id="bototm" />
              </div>
            </a>
          </li>
          <li>
            <a className="dark-text" href="/map">
              <div className="nav-destination">
                <hr id="top" />
                <p>Testing Sites</p>
                <hr id="bototm" />
              </div>
            </a>
          </li>
          <li>
            <a href="/"><img className="nav-logo" src="static/covid_catcher.png" alt="covid-logo" /></a>
          </li>
          <li>
            <a className="dark-text" href="/questionnaire-start">
              <div className="nav-destination">
                <hr id="top" />
                <p>Questionnaire</p>
                <hr id="bototm" />
              </div>
            </a>
          </li>
          <li>
            <a className="dark-text" href="/statistics">
              <div className="nav-destination">
                <hr id="top" />
                <p>Statistics</p>
                <hr id="bototm" />
              </div>
            </a>
          </li>
          <li>
            <a className="dark-text" href="/faq">
              <div className="nav-destination">
                <hr id="top" />
                <p>FAQ</p>
                <hr id="bototm" />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
