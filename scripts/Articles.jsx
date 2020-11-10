import * as React from 'react';
import { Socket } from './Socket';

export function Articles() {
  const [article, setArticle] = React.useState([]);
  const listItems = article.map((message, index) => {
            if(message.includes("https:"))
            {
               if(message.includes('.jpg') || message.includes('.png') || message.includes('.gif') )
                    {
                        var picture = message
                        return <li key={index}><img src={picture} alt="image"/> </li>
                    }
                    else
                    {
                        var link = message
                        return <li key={index}><a href={link}>{link}</a> </li>
                    }
            } 
            else
            {
                
                return <li key={index}>{message}</li>}
            }
            );
  function getArticles() {
    React.useEffect(() => {
      Socket.on('article list', (data) => {
        setArticle(data['articles']);
      });
    });
  }

  getArticles();

  return (
    <div id="article-div">
      <h1 className="article-h1">COVID-19 Articles</h1>
      <ul className="articles-ul">
        {listItems}
         
       
      </ul>
    </div>
  );
}
