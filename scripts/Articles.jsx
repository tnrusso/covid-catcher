import * as React from 'react';
import { Socket } from './Socket';

export function Articles() {
  const [article, setArticle] = React.useState([]);

  function getArticles() {
    React.useEffect(() => {
      Socket.on('article list', (data) => {
        setArticle(data.articles);
      });
    });
  }

  getArticles();

  return (
    <div id="article-div">
      <h1 className="article-h1">COVID-19 Articles</h1>
      <ul className="articles-ul">
        <li>
          <p>Article title</p>
          <p>Link to article</p>
        </li>
      </ul>
    </div>
  );
}
