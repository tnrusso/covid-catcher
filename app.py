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
from faq import get_all_categories
from faq import FAQ
import news
from news import get_news
import location
from location import get_location
from app_functions import articleList, push_stat_data
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
FAQS = "faq lists"
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

@socketio.on("faq categories")
def on_faq_categories():
    """get all categories for faqs"""
    categories=get_all_categories()
    socketio.emit('faq category list', categories)

@socketio.on("faq questions")
def on_faq_questions(category):
    """get questions and answers in a category"""
    if category == '' or category== None:
        faqs=get_all_questions()
    else:
        faqs=get_all_questions(category)
        
    response = []
    for faq in faqs:
        response.append({
            'question':faq.question,
            'answer': faq.answer,
        })

    socketio.emit('faq list', response)
    
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

@socketio.on("connect")
def on_connect():
    """Socket for when user connects"""
    articleList(socketio)
    ip = request.environ['HTTP_X_FORWARDED_FOR']
    loc = get_location(ip)
    state = loc.state
    push_stat_data(socketio, state)
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
