import * as React from 'react';
import { Socket } from './Socket';

export function Navigation() {
  const [text, setText] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setText('');
  }

  function handleChange(e) {
    setText(e.target.value);
  }

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
          <li><a href="/statistics">Statistics</a></li>
          <li><a href="/questionnaire">Questionnaire</a></li>
        </ul>
        <form onSubmit={handleSubmit} className="navbar-form d-flex justify-content-center w-100 navbar-right">
          <input type="text" value={text} onChange={handleChange} className="form-control" />
          <button type="submit" className="btn btn-danger">Search</button>
        </form>
      </div>
    </nav>
  );
}
