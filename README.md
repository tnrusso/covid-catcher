Heroku link (Sprint 1): [https://obscure-ocean-16087.herokuapp.com/](https://obscure-ocean-16087.herokuapp.com/)

Heroku link (Sprint 2): [https://sheltered-waters-86353.herokuapp.com/](https://sheltered-waters-86353.herokuapp.com/)

![alt text](https://github.com/NJIT-CS490/project3-sec3group4/blob/master/static/covid_catcher.png?raw=true)

# CS490 Project 3 - Covid Catcher

Covid Catcher is a one stop web application to get the most relevant and up to date information about all things COVID-19 in the United States. Covid Catcher provides all the latest statistics on COVID-19 for every state and county in the country, a list of frequently asked questions in regards to COVID-19, recent COVID-19 news articles, a COVID-19 questionnaire, and nearby testing locations.

# Overview
[Installation](#installation)

[Built With](#built-with)

[Testing](#testing)

[Individual Contributions](#individual-contributions)

[Pending work](#pending-work)

# Installation

### Clone the project
```
cd ~/environment && git clone https://github.com/andreapaz7/covidcatcher-sprint2 && cd covidcatcher-sprint2
```
### Install React packages
- If you're not already in project directory `cd covidcatcher-sprint2`
- In your terminal, type:
```
npm install
pip install flask-socketio
pip install eventlet
npm install -g webpack
npm install --save-dev webpack
npm install socket.io-client --save
```

### Sign up for the required API keys
- To use the Map API and Search Testing Site location, visit https://developer.here.com/ and sign up.
- After you signed up, logged in, click Freemium and you will see Javascript and REST.  Click Create API Keys for both and save
- Create api-keys.env in your workspace by
```
touch api-keys.env
c9 api-keys.env
```
- then inside this file, add the following
```
export SITE_API_KEY='YOUR REST API KEY'
export MAP_API_KEY='-YOUR JAVASCRIPT API KEY'
```
### Get PSQL to work with Python
- To update yum (enter 'yes' to all promps) `sudo yum update`

- To upgrade Pip `sudo /usr/local/bin/pip install --upgrade pip`

- To install psycopg2 `sudo /usr/local/bin/pip install psycopg2-binary`

- To install SQLAlchemy `sudo /usr/local/bin/pip install Flask-SQLAlchemy==2.1`


### Set up PSQL
- Install PostGreSQL `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs`

- Initialize PSQL database `sudo service postgresql initdb`

- Start PSQL: `sudo service postgresql start`

- Create new superuser `sudo -u postgres createuser --superuser $USER`

- Create new database `sudo -u postgres createdb $USER`

### Create a new user
- Open PSQL in terminal `psql`

- Create user - fill in brackets with your username/password (Save these somewhere!) `create user [USERNAME] superuser password '[PASSWORD]';`

- Exit out of PSQL `\q`
- Create a new file called `sql.env` in the project directory
- Inside `sql.env`, enter `DATABASE_URL='postgresql://[USERNAME]:[PASSWORD]@localhost/postgres'` where [USERNAME] and [PASSWORD] are the same values used to create your user, and save these changes

### Enable read/write from SQLAlchemy
- Open the file in your terminal by typing `sudo vim /var/lib/pgsql9/data/pg_hba.conf`
- Type `:%s/ident/md5/g` This will replace all values of 'ident' with 'md5' in the file
- Restart PSQL to enable these changes `sudo service postgresql restart`

### Setting up the database
- Open the Python interactive shell `python`
- Once inside your shell, type 
```
import models
models.db.create_all()
models.db.session.commit()
exit()
```

### Running the app on Cloud9
- Start PSQL `sudo service postgresql start`
- Open 2 terminals and `cd covidcatcher-sprint2` in both
- In one terminal, type `npm run watch` and `python app.py` in the other
- Click 'Preview' --> 'Preview Running Application' to view the app

### Deploy to Heroku
- Sign up for a Heroku account on their website [https://www.heroku.com/](https://www.heroku.com/)

- In the project directory in your terminal, create a new Heroku app `npm install -g heroku`
- Login to your Heroku account `heroku login -i`
- Create a new Heroku app `heroku create`
- Set up the database
```
heroku addons:create heroku-postgresql:hobby-dev
heroku pg:wait
PGUSER=[USERNAME] heroku pg:push postgres DATABASE_URL
--> (IF THIS DOES NOT WORK): heroku pg:push postgres DATABASE_URL
heroku pg:psql
select * from user1;
\q
```
- Push to Heroku `git push heroku master`

- Go to your [dashboard](https://dashboard.heroku.com/apps) on Heroku's website and click on your new app, and then click the 'Open App' button.

- If you ever want to reset the database, click on your application, and then go to `Configure Add-ons` --> `Heroku Postgres` --> `Settings` --> `Reset Database`

 # Testing

### Set up testing
- After finishing the installation steps, enter the command `pip install coverage`
- Run the command `coverage run -m --source=. unittest tests/*.py && coverage html` This will run the test files located in the `tests/` directory and create the `htmlcov` directory along with its files
- Locate the `htmlcov/` directory and right click the `index.html` file and click "Preview", this will show the coverage % for every python file in the project directory
- Rerunning the command `coverage run -m --source=. unittest tests/*.py && coverage html` will update these percentages as changes are made


# Built with
[Flask](https://palletsprojects.com/p/flask/)

[HTML](https://www.w3schools.com/html/)

[CSS](https://www.w3schools.com/css/)

[React](https://reactjs.org/docs/getting-started.html)

[Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)

[Flask-Socket.IO](https://flask-socketio.readthedocs.io/en/latest/)

[PostGreSQL](https://www.postgresql.org/)


Deployed on [Heroku](https://www.heroku.com/)

# Individual Contributions
### Carlos
- Created Database to store user information
- Backend sockets for FAQ, Article, Login and Stats Page
- Created unmocked tests for app.py
- Used APIs defined by Madison, to send information to front end pages

### Madison
- Created News API functions to get news articles using News-API
- Created FAQ API funcctions to get FAQ from Coronavirus.gov
- Created Location API functions to get location of IPs using Ip-Stack
- Created Covid Stat API functions to get covid stats of certain states using corona.lmao.ninja
- Created Covid Stat API functions to get covid stats of certain counties using corona.lmao.ninja
- Created unit tests in api_unit_tests.py for all api function calls

### Andrea
- Front end for Login page 
- Front end for Statistics page
- Helped with mocked tests for app.py

### Tim
- Create navigation bar with links to the home, articles, faq, statistics and questionnaire page
- Routing to direct users to different pages when the user clicks a link on the navigation bar
- Route user to a "does not exist" page when user redirects themself to an nonexistent page
- Front end for FAQ page + CSS styling
- Front end for Article page + CSS styling
- Heroku deployment 

# Pending work
- None
