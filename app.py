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
import covid
import news

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")
dotenv_path = join(dirname(__file__), "sql.env")
load_dotenv(dotenv_path)
database_uri = os.environ["DATABASE_URL"]
app.config["SQLALCHEMY_DATABASE_URI"] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app
db.create_all()
db.session.commit()
USERS_UPDATED_CHANNEL = "users updated"
STATISTICS = "stats"
NEWUSER = "new user"


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
    all_users = [user.name for user in db.session.query(models.User1).all()]
    if email in all_users:
        print(email, " is already a user in the database!")
    else:
        db.session.add(models.User1(name, email, picture, room))
        db.session.commit()
    emit_all_users(USERS_UPDATED_CHANNEL)


def push_stat_data(STATISTICS):
    information = covid.get_covid_stats_by_state("New Jersey")
    print(information)
    case = information.cases
    death = information.deaths
    rec = information.recovered
    print("CASES DEATHS AND RECOVERED: ", case, death, rec)
    socketio.emit(STATISTICS, {"cases": case, "deaths": death, "recovered": rec})


def checkLogin(NEWUSER):
    x = 1
    socketio.emit(NEWUSER, {"login": x})


@app.route("/")
def index():
    """loads page"""
    emit_all_users(USERS_UPDATED_CHANNEL)
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
