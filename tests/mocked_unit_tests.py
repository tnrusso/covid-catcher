#pylint: disable=R0903 
#pylint: disable=W0613
#pylint: disable=W0621
#pylint: disable=C0103
#mocked_unit_tests.py
"""Mocked Unit Test for app.py"""
import sys
import unittest.mock as mock
import unittest
from os.path import join, dirname
from app_functions import push_stat_data, articleList
from app import push_new_user_to_db, userLog, emit_all_users, on_new_google_user
sys.path.append(join(dirname(__file__), "../"))

EXPECTED = "expected"
INPUT = "input"
NAME = "name"
EMAIL = "email"
PIC = "pic"
ROOM = "room"
ANSWER = "answer"
MESSAGE = "message"

'''
class MockedItem:
    """ This class defines a mocked item returned from faq api call """
    def __init__(self):
        self.question = "question"
        self.answer = "answer"
'''
class MockedDB:
    """ This class defines a mocked db object"""
    def __init__(self, session=""):
        self.session = MockedDBSession()

class MockedDBSession:
    """ This class defines a mocked db session object """
    def __init__(self, add="", commit="", query=""):
        self.add = add
        self.commit = commit
        self.query = MockedDBQuery()

class MockedDBQuery:
    """ This class defines a mocked db query object """
    def __init__(self, models=""):
        self.models = MockedDBModel()
    def all(self):
        """ mocks all method"""
        return True

class MockedDBModel:
    """"This class defines a mocked db model object"""
    def __init__(self, user1=""):
        self.user1 = user1

class MockedBDUser1:
    """ This class defines a mocked db user object"""
    def __init__(self, name="", email="", picture="", room=""):
        self.name = name
        self.email = email
        self.picture = picture
        self.room = room

class MockedSocketio:
    """ This class defines a mocked socketio object """
    def emit(self, arg_x, arg_y):
        """This mocks the emit method"""
        return True

class MockedInfo:
    """ This class defines a mocked item returned from covid api call """
    def __init__(self):
        self.cases = 100
        self.deaths = 1
        self.recovered = 99

class MockedArticles:
    """ This class defines a mocked item returned from news api call """
    def __init__(self):
        self.image = "image"
        self.title = "title"
        self.source = "source"
        self.description = "description"
        self.url = "url"

'''
class FaqListTest(unittest.TestCase):
    """ This class contains the tests and paramaters to test """
    def setUp(self):
        """ This function defines paramaters used for testing """
        self.faq_params = [
            {
                EXPECTED: True
            }
        ]

    def mocked_get_all_questions(self):
        """ mocked geta_all_questions() """
        item = MockedItem()
        return item

    def test_faq_success(self):
        """ success test """
        for test in self.faq_params:
            with mock.patch('faq.get_all_questions', self.mocked_get_all_questions):
                result = faqList()
                expected = test[EXPECTED]
                self.assertEqual(expected, result)
'''
class PushStatDataTest(unittest.TestCase):
    """ This class contains the tests and paramaters to test """
    def setUp(self):
        """ This function defines paramaters used for testing """
        self.push_stat_params = [
            {
                INPUT: "New Jersey",
                EXPECTED: "stats are pushed"
            }
        ]

    def mocked_get_covid_stats(self):
        """ mocked get_covid stats() """
        information = MockedInfo()
        return information

    def test_push_stat_success(self):
        """ success test """
        for test in self.push_stat_params:
            with mock.patch('covid.get_covid_stats_by_state', self.mocked_get_covid_stats):
                socketio = MockedSocketio()
                result = push_stat_data(socketio, test[INPUT])
                expected = test[EXPECTED]
                self.assertEqual(expected, result)

class ArticleListTest(unittest.TestCase):
    """ This class contains the tests and paramaters to test """
    def setUp(self):
        """ This function defines paramaters used for testing """
        self.article_params = [
            {
                EXPECTED: True
            }
        ]

    def mocked_get_news(self):
        """ mocked get_news() """
        articles = MockedArticles()
        return articles

    def test_article_list_success(self):
        """ success test """
        for test in self.article_params:
            with mock.patch('news.get_news', self.mocked_get_news):
                socketio = MockedSocketio()
                result = articleList(socketio)
                expected = test[EXPECTED]
                self.assertEqual(expected, result)

class EmitTest(unittest.TestCase):
    """unit test for emit_all_users"""
    def setUp(self):
        self.success_test_params = [
            {
                INPUT:
                {
                    MESSAGE:"users updated"
                },
                EXPECTED:
                {
                    ANSWER: "users updated",
                }
            }
        ]
        self.failure_test_params = [
            {
                INPUT:
                {
                    MESSAGE:"users updated"
                },
                EXPECTED:
                {
                    ANSWER: "",
                }
            }
        ]

    @mock.patch("app.socketio")
    @mock.patch("app.db")
    def test_parse_message_success(self, MockedSocketio, MockedDB):
        """success tests"""
        for test in self.success_test_params:
            response = test[INPUT]
            testing = emit_all_users(response[MESSAGE])
            expected = test[EXPECTED]
            self.assertEqual(testing, expected[ANSWER])

    @mock.patch("app.socketio")
    @mock.patch("app.db")
    def test_parse_message_failure(self, MockedSocketio, MockedDB):
        """failure tests"""
        for test in self.failure_test_params:
            response = test[INPUT]
            testing = emit_all_users(response[MESSAGE])
            expected = test[EXPECTED]
            self.assertNotEqual(testing, expected[ANSWER])

class DbTest(unittest.TestCase):
    """unit test for push_new_user_to_db"""
    def setUp(self):
        self.success_test_params = [
            {
                INPUT:
                {
                    NAME: "Carl",
                    EMAIL: "cs2950742@gmail.com",
                    PIC: "https://lh3.googleusercontent.com/a-/AOh14GhgqbOOswIBxGPgEfyJd6bUHBhdIq0p-XpqKoT9=s96-c",
                    ROOM: "0e841f9b1f3449088cac2bbcfc301314"
                },
                EXPECTED:
                {
                    ANSWER: "Carl",
                },
                INPUT:
                {
                    NAME: "New1user",
                    EMAIL: "New123user@gmail.com",
                    PIC: "N/A",
                    ROOM: "N/A"
                },
                EXPECTED: {
                    ANSWER: "New1user",
                }
            }
        ]
        self.failure_test_params = [
            {
                INPUT:
                {
                    NAME: "Carl",
                    EMAIL: "cs2950742@gmail.com",
                    PIC: "N/A",
                    ROOM: "N/A"
                },
                EXPECTED:
                {
                    ANSWER: "",
                }
            }
        ]

    @mock.patch('app.db')
    def test_parse_message_success(self, MockedDB):
        """success tests"""
        for test in self.success_test_params:
            response = test[INPUT]
            testing = push_new_user_to_db(response[NAME], response[EMAIL], response[PIC], response[ROOM])
            expected = test[EXPECTED]
            self.assertEqual(testing, expected[ANSWER])

    @mock.patch('app.db')
    def test_parse_message_failure(self, MockedDB):
        """failure tests"""
        for test in self.failure_test_params:
            response = test[INPUT]
            testing = push_new_user_to_db(response[NAME], response[EMAIL], response[PIC], response[ROOM])
            expected = test[EXPECTED]
            self.assertNotEqual(testing, expected[ANSWER])

class LoginTest(unittest.TestCase):
    """unit test for userLog"""
    def setUp(self):
        self.success_test_params = [
            {
                INPUT: {},
                EXPECTED:
                {
                    ANSWER: 1,
                }
            }
        ]
        self.failure_test_params = [
            {
                INPUT: {},
                EXPECTED:
                {
                    ANSWER: 0,
                }
            }
        ]

    @mock.patch("app.socketio")
    def test_parse_message_success(self, MockedSocketio):
        """success tests"""
        for test in self.success_test_params:
            testing = userLog()
            expected = test[EXPECTED]
            self.assertEqual(testing, expected[ANSWER])

    @mock.patch("app.socketio")
    def test_parse_message_failure(self, MockedSocketio):
        """failure tests"""
        for test in self.failure_test_params:
            testing = userLog()
            expected = test[EXPECTED]
            self.assertNotEqual(testing, expected[ANSWER])

class NewTest(unittest.TestCase):
    """unit test for on_new_google_user"""
    def setUp(self):
        self.success_test_params = [
            {
                INPUT:
                {
                    NAME:"Carl",
                    EMAIL: "cs2950742@gmail.com",
                    PIC: "https://lh3.googleusercontent.com/a-/AOh14GhgqbOOswIBxGPgEfyJd6bUHBhdIq0p-XpqKoT9=s96-c",
                    ROOM: "0e841f9b1f3449088cac2bbcfc301314"
                },
                EXPECTED:
                {
                    ANSWER: "users updated",
                }
            }
        ]
        self.failure_test_params = [
            {
                INPUT:
                {
                    NAME:"Carl",
                    EMAIL: "cs2950742@gmail.com",
                    PIC: "https://lh3.googleusercontent.com/a-/AOh14GhgqbOOswIBxGPgEfyJd6bUHBhdIq0p-XpqKoT9=s96-c",
                    ROOM: "0e841f9b1f3449088cac2bbcfc301314"
                },
                EXPECTED:
                {
                    ANSWER: "",
                }
            }
        ]

    @mock.patch("app.socketio")
    @mock.patch("app.db")
    def test_parse_message_success(self, MockedSocketio, MockedDB):
        """success tests"""
        for test in self.success_test_params:
            response = test[INPUT]
            testing = on_new_google_user(response)
            expected = test[EXPECTED]
            self.assertEqual(testing, expected[ANSWER])

    @mock.patch("app.socketio")
    @mock.patch("app.db")
    def test_parse_message_failure(self, MockedSocketio, MockedDB):
        """failure tests"""
        for test in self.failure_test_params:
            response = test[INPUT]
            testing = on_new_google_user(response)
            expected = test[EXPECTED]
            self.assertNotEqual(testing, expected[ANSWER])

if __name__ == '__main__':
    unittest.main()
    