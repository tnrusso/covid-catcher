import * as React from 'react';

export function About() {
  return (
    <div id="about">
      <h1>About Us</h1>
      <p>
        Our team member are Tim Russo, Carlos Osegueda, Madison Miatke, Andrea Paz.
        We are four seniors at NJIT majoring in Computer Science.
      </p>
      <br />
      <h1>Covid Catcher</h1>
      <p>
        We`&apos`ve created a one stop web application to get the most relevant and
        up to date information about all things COVID-19. On our homepage, you can
        find a map of the U.S. showing which states have a higher concentration of
        COVID cases. From the dropdown, you can choose a state and you`&apos`ll be redirected
        to a page with current statistics for that state and its counties. On the
        menu bar you choose the Articles tab to view links to recent
        news articles related to COVID. On the FAQ tab, you can view frequently
        asked questions and answers related to COVID-19 you may have on a variety of
        topics ranging from Child Care to Traveling. Click on the Questionnaire tab,
        to take a survey that will advise whether or not you should seek medical
        attention based on your symptoms. Finally, you can choose the Testing Sites
        tab to view the three closest testing centers based on your location.
      </p>
      <br />
      <h1>Technologies We Used</h1>
      <p>
        We used React/JS for the frontend, Flask for the backend of our application
        and Socket.io for communication between the two.
        We used Heroku for deployment. We also used the following API`&apos`s to get our
        data:
        <br />
        <br />
        <ul>
          <li>Testing Site API: https://developer.here.com/blog/finding-covid-19-testing-sites</li>
          <li>Covid News API:   https://newsapi.org/pricing </li>
          <li>State and County Statistics API:  https://corona.lmao.ninja/</li>
          <li>Frequently Asked Questions API:   https://faq.coronavirus.gov/api/</li>
          <li>Get User`&apos`s IP Address API:    https://ipstack.com/</li>
        </ul>
      </p>
      <br />
      <h1>Why It Matters</h1>
      <p>
        The COVID-19 pandemic has greatly affected everyone around the world.
        It`$apos`s important to stay informed about new health regulations, updates on the
        developing vaccines, and cases in your local area.  However, it can be
        overwhelming to search for information on the internet and distressing to
        turn on the news. Covid Catcher was designed to be a simple and
        straightforward application that has all the latest information one may need.
      </p>
      <br />
      <a href="https://sheltered-waters-86353.herokuapp.com/">Visit our Homepage</a>
    </div>
  );
}
