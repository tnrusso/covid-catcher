import * as React from 'react';
import { Socket } from './Socket';

export function Faq() {
  const [questions, setQuestions] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [categories, setCategories] = React.useState(() => {
    Socket.emit('faq categories');
    return [];
  });
  
  React.useEffect(() => {
    Socket.on('faq category list', (data) => {
      console.log('category');
      setCategories(data);
    });
    return () => Socket.off('faq category list');
  });
  
  function getQuestions(c) {
    if(category == c) {
      c=''
    }
    setCategory(c);
    Socket.emit('faq questions', c);
  }
  
  React.useEffect(() => {
    Socket.on('faq list', (data) => {
        console.log('questions');
        setQuestions(data);
    });
    return () => Socket.off('faq list');
  });
  

  return (
    <div id="faq-div">
      <h1 className="faq-h1">Frequently Asked Questions</h1>
      
      <ul className="faq-category-list">
      
        {(categories||[]).map((cat, index) => (
          <li key={index} id={cat}>
            <button onClick={(e)=>getQuestions(cat)}>{cat}</button>
            {cat == category &&
              <ul className="faq-ul">
        
                {questions.map((faq, index) => (
                  <li key={index}>
                    <p className="faq-question">{faq.question}</p>
                    <p className="faq-answer">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}