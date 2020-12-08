/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { useHistory } from 'react-router-dom';

export function About() {
  const history = useHistory();

  function sendHome() {
    history.push('/');
  }

  return (
    <div className="about">
      <div className="about-content">
        <p className="about-header">About Us</p>
        <hr id="hr-1" />
        <p className="team-desc about-paragraph">
          Our team is made up four passionate computer scientists
          that are skilled in variety of technologies. We worked
          on this project for a software engineering class. We hope
          you find our project useful in these difficult times.
        </p>
        <div className="about-team-members">
          <div className="about-team-member">
            <img src="https://avatars3.githubusercontent.com/u/14780167?s=460&u=258307af4df52ede746fabe532261059868116ea&v=4" alt="madison" />
            <p className="medium-text">Madison Miatke</p>
            <p className="small-text">A senior Computer Science Major well versed in software development and web design.</p>
          </div>
          <div className="about-team-member">
            <img src="https://avatars2.githubusercontent.com/u/53951160?s=460&v=4" alt="andrea" />
            <p className="medium-text">Andrea Paz</p>
            <p className="small-text">A senior Computer Science Major well versed in software development and web design.</p>
          </div>
          <div className="about-team-member">
            <img src="https://avatars1.githubusercontent.com/u/55631041?s=400&v=4" alt="tim" />
            <p className="medium-text">Timothy Russo</p>
            <p className="small-text">A senior Computer Science Major well versed in software development and web design.</p>
          </div>
          <div className="about-team-member">
            <img src="https://avatars2.githubusercontent.com/u/66849046?s=460&v=4" alt="carlos" />
            <p className="medium-text">Carlos Osegueda</p>
            <p className="small-text">A senior Computer Science Major well versed in software development and web design.</p>
          </div>

        </div>

        <p className="about-header">Covid Catcher</p>
        <hr id="hr-2" />
        <p className="about-paragraph">
          We've created a one stop web application to get the most relevant and
          up to date information about all things COVID-19. On our homepage, you can
          find a map of the U.S. showing which states have a higher concentration of
          COVID cases. From the dropdown, you can choose a state and you'll be redirected
          to a page with current statistics for that state and its counties. On the
          menu bar you choose the Articles tab to view links to recent
          news articles related to COVID. On the FAQ tab, you can view frequently
          asked questions and answers related to COVID-19 you may have on a variety of
          topics ranging from Child Care to Traveling. Click on the Questionnaire tab,
          to take a survey that will advise whether or not you should seek medical
          attention based on your symptoms. Finally, you can choose the Testing Sites
          tab to view the three closest testing centers based on your location.
        </p>
        <p className="about-header">Why It Matters</p>
        <hr id="hr-3" />
        <p className="about-paragraph">
          The COVID-19 pandemic has greatly affected everyone around the world.
          It's important to stay informed about new health regulations, updates on the
          developing vaccines, and cases in your local area.  However, it can be
          overwhelming to search for information on the internet and distressing to
          turn on the news. Covid Catcher was designed to be a simple and
          straightforward application that has all the latest information one may need.
        </p>
        <p className="about-header">Technologies We Used</p>
        <hr id="hr-4" />
        <div className="about-paragraph">
          We used React/JS for the frontend, Flask for the backend of our application
          and Socket.io for communication between the two.
          We used Heroku for deployment. We also used the following API's to get our
          data:
          <br />
          <ul className="about-tech">
            <li>
              Testing Site API:
              <a href="https://developer.here.com/blog/finding-covid-19-testing-sites">
                https://developer.here.com/blog/finding-covid-19-testing-sites
              </a>
            </li>
            <li>
              Covid News API:
              <a href="https://newsapi.org/pricing">
                https://newsapi.org/pricing
              </a>
            </li>
            <li>
              State and County Statistics API:
              <a href="https://corona.lmao.ninja/">
                https://corona.lmao.ninja/
              </a>
            </li>
            <li>
              Frequently Asked Questions API:
              <a href="https://faq.coronavirus.gov/api/">
                https://faq.coronavirus.gov/api/
              </a>
            </li>
            <li>
              Get User's IP Address API:
              <a href="https://ipstack.com/">
                https://ipstack.com/
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
