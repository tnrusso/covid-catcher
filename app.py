import os
import json
from os.path import join, dirname
from datetime import datetime
import flask
import flask_sqlalchemy
import flask_socketio
import requests
from dotenv import load_dotenv
import models
from covid import get_covid_stats_by_state
from faq import get_all_questions
from faq import FAQ
import news
from news import get_news

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


def emit_all_users(channel):
    """emits all users"""
    all_users = [user.name for user in db.session.query(models.User1).all()]
    socketio.emit(channel, {"allUsers": all_users})


@socketio.on("new google user")
def on_new_google_user(data):
    """new user when log in"""
    print("Got an event for new google user input with data:", data)
    push_new_user_to_db(data["name"], data["email"], data["pic"], data["room"])
    emit_all_users(USERS_UPDATED_CHANNEL)


def push_new_user_to_db(name, email, picture, room):
    """puts new user in the database"""
    global login
    all_users = [user.name for user in db.session.query(models.User1).all()]
    if email in all_users:
        print(email, " is already a user in the database!")
    else:
        db.session.add(models.User1(name, email, picture, room))
        db.session.commit()
    login = 1   
    userLog()
    push_stat_data()
    faqList()
    articleList()
    emit_all_users(USERS_UPDATED_CHANNEL)

def userLog():
    if login == 1:
        socketio.emit(NEWUSER,{'login' : 1})
        
def push_stat_data():
    information = get_covid_stats_by_state("New Jersey")
    case = information.cases
    death = information.deaths
    rec = information.recovered
    
    print("CASES DEATHS AND RECOVERED: ",case, death, rec)
    socketio.emit(STATISTICS, {'cases' : case, 'deaths' : death, 'recovered' : rec})
def faqList():
    q = get_all_questions()
    qList = []
    for x in q:
        qList.append("Q: "+x.question)
        qList.append("A: "+x.answer)
        qList.append("Link: "+x.answer_html)
        qList.append("Source: "+x.source)
        '''
        print(x.question)
        print(x.answer)
        print(x.answer_html)
        print(x.source)'''
    socketio.emit(FAQS,{'everything': qList } )
def articleList():
    a = get_news(5, since = news.YESTERDAY.strftime("%yyyy-%mm-%dd"),  query = 'covid')
    newsList = []
    for art in a:
        newsList.append(art.image)
        newsList.append(art.url)
        newsList.append(art.title)
        newsList.append(art.description)
    socketio.emit(ARTICLE,{'articles':newsList})
@socketio.on("connect")
def on_connect():
    push_stat_data() 
    faqList()
    articleList()
def checkLogin(NEWUSER):
    x = 1
    socketio.emit(NEWUSER, {"login": x})


@app.route("/")
def index():
    """loads page"""
    emit_all_users(USERS_UPDATED_CHANNEL)
    push_stat_data()
    faqList()
    return flask.render_template("index.html")


@app.errorhandler(404)
def page_not_found(e):
    return flask.render_template("index.html")


if __name__ == "__main__":
    socketio.run(
        app,
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", 8080)),
        debug=True,
    )
