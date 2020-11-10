import * as React from 'react';
import { Socket } from './Socket';

export function Faq() {
  const [question, setQuestion] = React.useState([]);
  const [answer, setAnswer] = React.useState([]);

  function getFaqs() {
    React.useEffect(() => {
      Socket.on('faq list', (data) => {
        setQuestion(data.question);
        setAnswer(data.answer);
      });
      return() => Socket.off('faq list');
    });
  }

  getFaqs();
  
  return (
    <div id="faq-div">
      <h1 className="faq-h1">Frequently Asked Questions</h1>
      <ul className="faq-ul">
        {question.map((faq, index) => (
          <li key={index}>
            <p className="faq-question">{question[index]}</p>
            <p className="faq-answer">{answer[index]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
