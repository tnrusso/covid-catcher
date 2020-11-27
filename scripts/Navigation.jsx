import * as React from 'react';

export function Navigation() {

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            Covid Catcher
          </a>
        </div>
        <ul className="nav navbar-nav">
          <li><a href="/articles">Articles</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/questionnaire">Questionnaire</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
    </nav>
  );
}
