import * as React from 'react';
import { Socket } from './Socket';

export function Faq() {
  const [question, setQuestion] = React.useState([]);
  const listItemsQ = question.map((q, index) => <li>{q}</li>)

  function getFaqs() {
    React.useEffect(() => {
      Socket.on('faq list', (data) => {
        setQuestion(data['everything']);
      });
      return() => Socket.off('faq list');
    });
  }

  getFaqs();
  
  return (
    <div id="faq-div">
      <h1 className="faq-h1">Frequently Asked Questions</h1>
      <ul className="faq-ul">
        
        {listItemsQ}
  
       
      </ul>
    </div>
  );
}
