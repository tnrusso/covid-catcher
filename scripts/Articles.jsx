import * as React from 'react';
import { Socket } from './Socket';

export function Articles() {
  const [image, setImage] = React.useState([]);
  const [title, setTitle] = React.useState([]);
  const [source, setSource] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  const [url, setUrl] = React.useState([]);

  function getArticles() {
    React.useEffect(() => {
      Socket.on('article list', (data) => {
        setImage(data.img);
        setTitle(data.title);
        setSource(data.sources);
        setDesc(data.desc);
        setUrl(data.url);
      });
    });
  }
  
  getArticles();
  return (
    <div className="article-page">
      <h1 className="article-page-h1">Latest COVID-19 News</h1>
      <hr id="hr-7" />
      <ul className="article-ul">
        {title.map((articleTitle, index) => (
          <li className="article-li" key={index}>
            <div className="article-content">
              <div className="article-image-container">
                <img className="article-image" src={image[index]} alt="article" />
                <a className="article-link" target="_blank" rel="noreferrer" href={url[index]}>
                  Read Article at {source[index]}
                </a>
              </div>
              <div className="article-text">
                <p className="article-title">{articleTitle}</p>
                <p className="article-desc">{desc[index]}</p>
                <p className="article-source">
                  <i>
                    Supplied by {source[index]}
                  </i>
                </p>
              </div>
            </div>

            <hr id="hr-8" />
          </li>
        ))}
      </ul>
    </div>

  );
}