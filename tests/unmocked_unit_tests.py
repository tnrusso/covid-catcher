#unmocked_unit_tests.py
"""Unmocked Unit Test for app.py"""
import unittest
import sys
from os.path import join, dirname
from app import push_new_user_to_db
from app import on_new_google_user
from app import emit_all_users
from app import userLog
import models
sys.path.append(join(dirname(__file__), "../"))


KEY_INPUT = 'input'
KEY_EXPECTED = "expected"
KEY_ANSWER = 'answer'
KEY_EMAIL = 'email'
KEY_ROOM = 'room'
KEY_NAME = 'name'
KEY_PIC = 'pic'
KEY_MESSAGE = 'message'
class DbTest(unittest.TestCase):
    """unit test for push_new_user_to_db"""
    def setUp(self):
        self.success_test_params = [
             {
                KEY_INPUT: {
                    KEY_NAME: "Carl",
                    KEY_EMAIL: "cs2950742@gmail.com",
                    KEY_PIC: "https://lh3.googleusercontent.com/a-/AOh14GhgqbOOswIBxGPgEfyJd6bUHBhdIq0p-XpqKoT9=s96-c",
                    KEY_ROOM: "0e841f9b1f3449088cac2bbcfc301314"
                },
                KEY_EXPECTED: {
                    KEY_ANSWER: "Carl",
                },
                KEY_INPUT: {
                    KEY_NAME: "New1user",
                    KEY_EMAIL: "New123user@gmail.com",
                    KEY_PIC: "N/A",
                    KEY_ROOM: "N/A"
                },
                KEY_EXPECTED: {
                    KEY_ANSWER: "New1user",
                }
            }
        ]
        self.failure_test_params = [
             {
                KEY_INPUT: {
                    KEY_NAME: "Carl",
                    KEY_EMAIL: "cs2950742@gmail.com",
                    KEY_PIC: "N/A",
                    KEY_ROOM: "N/A"
                },
                KEY_EXPECTED: {
                    KEY_ANSWER: "",
                }
            }
        ]
    def test_parse_message_success(self):
        """success tests"""
        for test in self.success_test_params:
            response = test[KEY_INPUT]
            testing = push_new_user_to_db(response[KEY_NAME],response[KEY_EMAIL], response[KEY_PIC], response[KEY_ROOM])
            expected = test[KEY_EXPECTED]
            self.assertEqual(testing, expected[KEY_ANSWER])
    def test_parse_message_failure(self):
        """failure tests"""
        for test in self.failure_test_params:
            response = test[KEY_INPUT]
            testing = push_new_user_to_db(response[KEY_NAME],response[KEY_EMAIL], response[KEY_PIC], response[KEY_ROOM])
            expected = test[KEY_EXPECTED]
            self.assertNotEqual(testing, expected[KEY_ANSWER])
class EmitTest(unittest.TestCase):
    """unit test for emit_all_users"""
    def setUp(self):
        self.success_test_params = [
             {
                KEY_INPUT: {
                    KEY_MESSAGE:"users updated"
                },
                KEY_EXPECTED: {
                    KEY_ANSWER: "users updated",
                    }
            }
        ]
        self.failure_test_params = [
             {
                KEY_INPUT: {
                    KEY_MESSAGE:"users updated"
                },
                KEY_EXPECTED: {
                    KEY_ANSWER: "",
                }
            }
        ]
    def test_parse_message_success(self):
        """success tests"""
        for test in self.success_test_params:
            response = test[KEY_INPUT]
            testing = emit_all_users(response[KEY_MESSAGE])
            expected = test[KEY_EXPECTED]
            self.assertEqual(testing, expected[KEY_ANSWER])
    def test_parse_message_failure(self):
        """failure tests"""
        for test in self.failure_test_params:
            response = test[KEY_INPUT]
            testing = emit_all_users(response[KEY_MESSAGE])
            expected = test[KEY_EXPECTED]
            self.assertNotEqual(testing, expected[KEY_ANSWER])
class NewTest(unittest.TestCase):
    """unit test for on_new_google_user"""
    def setUp(self):
        self.success_test_params = [
             {
                KEY_INPUT: {
                    KEY_NAME:"Carl",
                    KEY_EMAIL: "cs2950742@gmail.com",
                    KEY_PIC: "https://lh3.googleusercontent.com/a-/AOh14GhgqbOOswIBxGPgEfyJd6bUHBhdIq0p-XpqKoT9=s96-c",
                    KEY_ROOM: "0e841f9b1f3449088cac2bbcfc301314"
                    },
                KEY_EXPECTED: {
                    KEY_ANSWER: "users updated",
                    }
            }
        ]
        self.failure_test_params = [
             {
                KEY_INPUT: {
                    KEY_NAME:"Carl",
                    KEY_EMAIL: "cs2950742@gmail.com",
                    KEY_PIC: "https://lh3.googleusercontent.com/a-/AOh14GhgqbOOswIBxGPgEfyJd6bUHBhdIq0p-XpqKoT9=s96-c",
                    KEY_ROOM: "0e841f9b1f3449088cac2bbcfc301314"
                },
                KEY_EXPECTED: {
                    KEY_ANSWER: "",
                    }
            }
        ]
    def test_parse_message_success(self):
        """success tests"""
        for test in self.success_test_params:
            response = test[KEY_INPUT]
            testing = on_new_google_user(response)
            expected = test[KEY_EXPECTED]
            self.assertEqual(testing, expected[KEY_ANSWER])
    def test_parse_message_failure(self):
        """failure tests"""
        for test in self.failure_test_params:
            response = test[KEY_INPUT]
            testing = on_new_google_user(response)
            expected = test[KEY_EXPECTED]
            self.assertNotEqual(testing, expected[KEY_ANSWER])
class LoginTest(unittest.TestCase):
    """unit test for userLog"""
    def setUp(self):
        self.success_test_params = [
             {
                KEY_INPUT: {},
                KEY_EXPECTED: {
                    KEY_ANSWER: 1,
                    }
            }
        ]
        self.failure_test_params = [
             {
                KEY_INPUT: {},
                KEY_EXPECTED: {
                    KEY_ANSWER: 0,
                    }
            }
        ]
    def test_parse_message_success(self):
        """success tests"""
        for test in self.success_test_params:
            testing = userLog()
            expected = test[KEY_EXPECTED]
            self.assertEqual(testing, expected[KEY_ANSWER])
    def test_parse_message_failure(self):
        """failure tests"""
        for test in self.failure_test_params:
            testing = userLog()
            expected = test[KEY_EXPECTED]
            self.assertNotEqual(testing, expected[KEY_ANSWER])
if __name__ == '__main__':
    unittest.main()
    