#unmocked_unit_tests.py
"""Mocked Unit Test for app.py"""
import sys
import unittest.mock as mock
import unittest
import os
from os.path import join, dirname
sys.path.append(join(dirname(__file__), "../"))
from app import faqList
from app import push_stat_data
from app import articleList

EXPECTED = "expected"
INPUT = "input"

class MockedItem:
    """ This class defines a mocked item returned from faq api call """
    def __init__(self):
        self.question = "question"
        self.answer = "answer"

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
        self.description= "description"
        self.url = "url"


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
                result = push_stat_data(test[INPUT])
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
                result = articleList()
                expected = test[EXPECTED]
                self.assertEqual(expected, result)

if __name__ == '__main__':
    unittest.main()
    