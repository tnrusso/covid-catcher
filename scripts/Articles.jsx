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
    <div id="article-div">
      <h1 className="article-h1">COVID-19 Articles</h1>
      <ul className="articles-ul">
        {title.map((articleTitle, index) => (
          <li className="article-li" key={index}>
            <p className="article-title">{articleTitle}</p>
            <p className="article-desc">{desc[index]}</p>
            <a href={url[index]}>{url[index]}</a>
            <img className="article-image" src={image[index]} alt="article" />
            <p className="article-source">{source[index]}</p>
          </li>
        ))}
      </ul>
    </div>
   
  );
}
