import * as React from 'react';
import { Socket } from './Socket';

export function Faq() {
  const [faq, setFaq] = React.useState([]);

  function getFaqs() {
    React.useEffect(() => {
      Socket.on('faq list', (data) => {
        setFaq(data.faqs);
      });
    });
  }

  getFaqs();

  return (
    <div id="faq-div">
      <h1 className="faq-h1">Frequently Asked Questions</h1>
      <ul className="faq-ul">
        <li>
          <p>Question</p>
          <p>Answer</p>
        </li>
      </ul>
    </div>
  );
}
