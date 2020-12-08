import React from 'react';
import * as Survey from 'survey-react';
import { useHistory } from 'react-router-dom';
import { Socket } from './Socket';

export function Quest() {
  
  const history = useHistory();
  
  function emailResults() {
    Socket.emit('email results', {
      'results': model.renderedCompletedHtml,
    });
    history.push('/questionnaire-start');
    return false;
  }
  
  Survey.StylesManager.applyTheme('modern');
  const surveyJSON = {
    title: 'Covid Questionnaire',
    description: 'This survey will guide you through a series of questions that will help you determine if you should get tested for covid.',
    completedHtmlOnCondition: [
      {
        expression: "{question1} = 'item1'",
        html: 'Based on your response please call 911 or go directly to your nearest emergency department.',
      },
      {
        expression: "{question2} = 'item1'",
        html: 'Please call 811 to speak with a nurse.\n\nBecause you may need to speak with a nurse about your symptoms, please call 811.',
      },
      {
        expression: "{question3} = 'item1'",
        html: 'You are legally required to immediately self-isolate. You are recommended to be tested for COVID-19.\n\nIf you DO NOT get tested, you must isolate for 10 days from the onset of symptoms AND until symptoms have resolved (whichever is latest).\nIndividuals who are tested, MUST isolate pending their results and should visit ahs.ca/results for further information regarding the next steps they must take following their test results.\nIf your symptoms worsen, call 811.\n\nCall 911 if you are seriously ill and need immediate medical attention. Inform them that you may have COVID-19.\n\n',
      },
      {
        expression: "{question4} = 'item1' or {question5} = 'item1'",
        html: 'You are recommended to be tested for COVID-19.',
      },
      {
        expression: "{question6} = 'item1'",
        html: "You are legally required to immediately self-isolate.\n\nPeople of all ages who have returned from international travel in the last 14 days are legally required to isolate for 14 days after arriving.\n\nPlease do not visit a hospital, physician’s office, lab or healthcare facility without consulting Health Link (811) first.\nDon't go to any public places.\nStay at home, and don’t have any visitors.\nDon’t share personal items like dishes, utensils, and towels.\nWash your hands often.\nAvoid close contact with other people, especially those with chronic conditions, a compromised immune system, or seniors (over 65 years of age).\nIf you do develop any COVID-19 symptoms, take this self-assessment again.",
      },
      {
        expression: "{question7} = 'item1'",
        html: 'Take steps to protect yourself and others.\n\nPlease get a test within 72 hours of leaving for your destination.',
      },
      {
        expression: "{question1} = 'item2' and {question2} = 'item2' and {question3} = 'item2' and {question4} = 'item2' and {question5} = 'item2' and {question6} = 'item2' and {question7} = 'item2'",
        html: 'You do not need to get tested.\n\nBut please Take steps to protect yourself and others.\n\nYou have a responsibility to help prevent the spread of COVID-19. There are steps you can take to protect yourself and others.\n\nPractice physical distancing. This is not the same as self-isolation. You do not need to remain indoors, but you do need to avoid being in close contact with people.\nPractice good hygiene: wash hands often, cover coughs and sneezes, and avoid touching your face.\nMonitor for COVID-19 symptoms: fever, cough, shortness of breath, sore throat or runny nose.\nIf you do develop any COVID-19 symptoms, stay home and take this self-assessment again.',
      },
    ],
    pages: [
      {
        name: 'page1',
        elements: [
          {
            type: 'radiogroup',
            name: 'question1',
            title: 'Are you experiencing any of the following...',
            description: 'Severe difficulty breathing (e.g., struggling for each breath, speaking in single words), severe chest pain, having a very hard time waking up, feeling confused, lost consciousness',
            isRequired: true,
            choices: [
              { value: 'item1', text: 'Yes' },
              { value: 'item2', text: 'No' }],
          },
          {
            type: 'radiogroup',
            name: 'question2',
            title: 'Are you experience any of the following...',
            description: 'Shortness of breath at rest, inability to lie down because of difficulty breathing, chronic health conditions that you are having difficulty managing because of your current respiratory illness',
            isRequired: true,
            choices: [
              { value: 'item1', text: 'Yes' },
              { value: 'item2', text: 'No' }],
          },
          {
            type: 'radiogroup',
            name: 'question3',
            title: 'In the past 10 days, have you experienced any of the following:',
            description: 'Fever, new onset of cough or worsening of chronic cough, new or worsening shortness of breath, new or worsening difficulty breathing, sore throat, runny nose',
            isRequired: true,
            choices: [
              { value: 'item1', text: 'Yes' },
              { value: 'item2', text: 'No' }],
          },
          {
            type: 'radiogroup',
            name: 'question4',
            title: 'Do you have any of the following:',
            description: 'Chills, painful swallowing, stuffy nose, headache, muscle or joint ache, feeling unwell, fatigue or severe exhaustion, nausea, vomiting, diarrhea or unexplained loss of appetite, loss of sense of smell or taste, conjunctivitis (pink eye)\n',
            isRequired: true,
            choices: [
              { value: 'item1', text: 'Yes' },
              { value: 'item2', text: 'No' }],
          },
          {
            type: 'radiogroup',
            name: 'question5',
            title: 'In the past 14 days, were you notified that you are connected to an outbreak OR that you are a close contact of a confirmed case of COVID-19 by:',
            description: 'AHS, Your employer, Someone who tested positive for COVID-19',
            isRequired: true,
            choices: [
              { value: 'item1', text: 'Yes' },
              { value: 'item2', text: 'No' }],
          },
          {
            type: 'radiogroup',
            name: 'question6',
            title: 'In the past 14 days, did you return from travel outside of your Country?',
            isRequired: true,
            choices: [
              { value: 'item1', text: 'Yes' },
              { value: 'item2', text: 'No' }],
          },
          {
            type: 'radiogroup',
            name: 'question7',
            title: 'Do you require testing for the purpose of outgoing travel?',
            isRequired: true,
            choices: [
              { value: 'item1', text: 'Yes' },
              { value: 'item2', text: 'No' }],
          },
        ],
      },
    ],
  };
  const model = new Survey.Model(surveyJSON);

  // function sendDataToServer(survey) {
  //   // send Ajax request to your web server.
  //   alert(`The results are:${JSON.stringify(survey.data)}`);
  // }

  return (
    <div className="survey-container">
      <link href="https://surveyjs.azureedge.net/1.8.14/modern.css" type="text/css" rel="stylesheet" />
      <script src="https://surveyjs.azureedge.net/1.8.14/survey.react.min.js" />
      <Survey.Survey model={model}/>
      <button onClick={emailResults} className="start-quest-button" id="emailresultbtn" value="Email Results">
        Email Results
      </button>
    </div>
  );
}