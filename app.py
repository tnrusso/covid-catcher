#pylint: disable=C0103
"""Covid Catcher Backend"""
import os
from os.path import join, dirname
from datetime import datetime
import json
import flask
from flask import request
import flask_sqlalchemy
import flask_socketio
import requests
from dotenv import load_dotenv
from covid import get_covid_stats_by_state
from covid import get_covid_stats_by_county
from faq import get_all_questions
from faq import FAQ
import news
from news import get_news
import location
from location import get_location
app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")
dotenv_path = join(dirname(__file__), "sql.env")
load_dotenv(dotenv_path)
database_uri = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
login=0
db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app
db.create_all()
db.session.commit()
USERS_UPDATED_CHANNEL = "users updated"
STATISTICS = "stats"
NEWUSER = "new user"
FAQS = "faq list"
ARTICLE = "article list"
import models
def emit_all_users(channel):
    """emits all users"""
    all_users = [user.name for user in db.session.query(models.User1).all()]
    socketio.emit(channel, {"allUsers": all_users})
    return channel
@socketio.on("new google user")
def on_new_google_user(data):
    """new user when log in"""
    print("Got an event for new google user input with data:", data)
    push_new_user_to_db(data["name"], data["email"], data["pic"], data["room"])
    emit_all_users(USERS_UPDATED_CHANNEL)
    return USERS_UPDATED_CHANNEL

def push_new_user_to_db(name, email, picture, room):
    """puts new user in the database"""
    global login
    all_users = [user.email for user in db.session.query(models.User1).all()]
    if email in all_users:
        print(email, " is already a user in the database!")
    else:
        db.session.add(models.User1(name, email, picture, room))
        db.session.commit()
    login = 1
    userLog()
    emit_all_users(USERS_UPDATED_CHANNEL)
    return name

def userLog():
    """User Login Check"""
    if login == 1:
        socketio.emit(NEWUSER,{'login' : 1})
    return True
def push_stat_data(state):
    """Calls Covid API"""
    information = get_covid_stats_by_state(state)
    case = information.cases
    death = information.deaths
    rec = information.recovered
    county_list = []
    county_confirmed = []
    county_deaths = []
    county_rec = []
    updated = []
    print("CASES DEATHS AND RECOVERED: ",case, death, rec)
    allcounty = get_covid_stats_by_county(state,'')
    for x in allcounty:
        county_list.append(x.county)
        county_confirmed.append(x.confirmed)
        county_deaths.append(x.deaths)
        county_rec.append(x.recovered)
        updated.append(x.updatedAt)
        '''
        print(x.county)
        print(x.confirmed)
        print(x.deaths)
        print(x.recovered)
        print(x.updatedAt)
        '''
    socketio.emit(STATISTICS, {'state': state, 'cases' : case, 'deaths' : death, 'recovered' : rec, 'countyNames' : county_list, 'countyStats' : county_confirmed, 'countydeaths' : county_deaths, 'countyrecovered' : county_rec, 'updated' : updated})
    r = "stats are pushed"
    return r

def faqList():
    """Calls the FAQ API"""
    faqs = get_all_questions()
    question_list = []
    answer_list = []
    for item in faqs:
        question_list.append(item.question)
        answer_list.append(item.answer)
    socketio.emit(FAQS,{'question': question_list, 'answer': answer_list } )
    return True
def articleList():
    """Calls the Article API"""
    articles = get_news(5, since = news.YESTERDAY.strftime("%yyyy-%mm-%dd"),  query = 'covid')
    title_list = []
    desc_list = []
    url_list = []
    image_list = []
    source_list = []
    for art in articles:
        image_list.append(art.image)
        title_list.append(art.title)
        source_list.append(art.source)
        desc_list.append(art.description)
        url_list.append(art.url)
    socketio.emit(ARTICLE,{'title': title_list, 'desc':desc_list,'url':url_list,
                    'img': image_list, 'sources': source_list})
    return True
@socketio.on("connect")
def on_connect():
    """Socket for when user connects"""
    faqList()
    articleList()
    ip = request.environ['HTTP_X_FORWARDED_FOR']
    loc = get_location(ip)
    state = loc.state
    push_stat_data(state)
    return True

@app.route("/")
def index():
    """loads page"""
    return flask.render_template("index.html")


@app.errorhandler(404)
def page_not_found(e):
    """Handles Page Not Found"""
    return flask.render_template("index.html")


if __name__ == "__main__":
    socketio.run(
        app,
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", 8080)),
        debug=True,
    )
