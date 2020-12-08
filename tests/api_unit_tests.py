"""API Unit Test"""
import unittest
import unittest.mock as mock
import json
import sys
import os
from os.path import dirname, join
sys.path.append(join(dirname(__file__), "../"))
from faq import get_all_questions
from faq import FAQ
from news import get_news, Article
from location import get_location
from location import Location
from covid import get_covid_stats_by_county
from covid import CountyStats
from covid import get_covid_stats_by_state
from covid import StateStats
from sites import search_user
from sites import get_sites
from sites import TestingSites

class MockResponse:
    """Mock Response Class"""
    def __init__(self, json_data, status_code):
        self.json_data = json_data
        self.status_code = status_code

    def json(self):
        """defines json"""
        return self.json_data

def mock_faq_request_one(url):
    """Mock Test For Faq"""
    data = [
        {
            "title":"What is Covid?",
            "answer":"Covid is covid.",
            "answer_html":"<p>Covid is covid.</p>",
            "sources":[{"agency":"cdc"}, { "agency":"who"}]
        }
    ]
    return MockResponse(data, 200)

def mock_faq_request_two(url):
    """Mock Test For Faq"""
    data = [
        {
            "title":"What is Covid?",
            "answer":"Covid is covid.",
            "answer_html":"<p>Covid is covid.</p>",
            "sources":[{"agency":"cdc"}, { "agency":"who"}]
        },
        {
            "title":"None",
            "answer":"None",
            "answer_html":"None",
            "sources":"None"
        },
        {
            "title":"Where is Covid?",
            "answer":"Covid is here.",
            "answer_html":"<p>Covid is here.</p>",
            "sources":[{"agency":"cdc"}]
        }
    ]
    return MockResponse(data, 200)

def mock_news_request_one(url):
    """Mock Test For NEWS"""
    data = {"status":"ok",
        "totalResults":2,
        "articles":[ {
            "source": {
                "id":"cbs-news",
                "name":"CBS News"},
            "author":"CBS News",
            "title":"Test_Title",
            "description":"this is a description",
            "url": "link to article",
            "urlToImage": "image.jpg",
            "publishedAt": "a time",
            "content": "content is here"
        },
        {
            "source": {
            "id":"cbs-news",
            "name":"CBS News"},
            "author":"CBS News",
            "title":"Test_Title",
            "description":"this is a description",
            "url": "link to article",
            "urlToImage": "image.jpg",
            "publishedAt": "a time",
            "content": "content is here"
        }
    ]}
    return MockResponse(data, 200)

def mock_news_request_two(url):
    """Mock Test For NEWS"""
    data= {"status":"404",
        "totalResults":0}
    return MockResponse(data, 200)

def mock_location_request_one(url):
    """Mock Test For Location"""
    data={
        "country_code":"US",
        "country_name":"United States",
        "region_code":"NJ",
        "region_name":"New Jersey",
        "city":"Newark",
        "zip":"O7103",
        "latitude":40.735657,
        "longitude":-74.172363
    }
    return MockResponse(data,200)

def mock_state_covid_request_one(url):
    """Mock Test For Covid.py States"""
    data={
        "state":"New Jersey",
        "cases":2000,
        "todayCases":1000,
        "deaths":566,
        "todayDeaths":34563,
        "recovered":3455,
        "active":677,
        "tests":45,
        "casesPerOneMillion":100,
        "deathsPerOneMillion":456,
        "testsPerOneMillion":6436
    }
    return MockResponse(data,200)

def mock_county_covid_request_one(url):
    """Mock Test For Covid.py county"""
    data= [{
        "province":"New York",
        "county":"Passaic",
        "updatedAt":"11/11/2020",
        "stats": {
            "confirmed":566,
            "deaths":34563,
            "recovered":3455
        }
        },{
        "province":"New Jersey",
        "county":"Passaic",
        "updatedAt":"11/11/2020",
        "stats": {
            "confirmed":566,
            "deaths":34563,
            "recovered":3455,
        }
        }
    ]
    return MockResponse(data,200)

def mock_get_sites(url):
    """Mock Test For Sites.py"""
    data=[{
        "title":"Covid-19 Testing Sites",
        "address":{
            "houseNumber":'5',
            "street":"abc street",
            "city":"Newark",
            "state":"New Jersey",
            "postalCode":"07700"
        },
        "position":{
            "lat":40000,
            "lng":50000
        },
        "contacts":{
            "phone":"1928392030",
            "www":"www.dot.com"
        },
        "distance":10
    },{
        "title":"Covid-19 Testing Sites",
        "address":{
            "houseNumber":'',
            "street":'',
            "city":'',
            "state":'',
            "postalCode":''
        },
        "position":{
            "lat":40000,
            "lng":50000
        },
        "phone":'',
        "web":'',
        "distance":10
    }
    ]
    return MockResponse(data,200)
    
def mock_searcharea(url):
    """Mock Test For Sites.py Search"""
    data=[50,60]
    return MockResponse(data,200)

class api_unit_tests(unittest.TestCase):
    """API Unit Test Class"""
    def setUp(self):
        """set up"""
        self.maxDiff=None
    def tearDown(self):
        """tear down"""
        pass
    def test_search(self):
        """Testing Get Search"""
        EXPECTED_RESULT = (50,60)
        with mock.patch("requests.get", mock_searcharea):
            searchh = search_user("Newark")
            self.assertEqual(searchh[0], EXPECTED_RESULT[0])
            self.assertEqual(searchh[1], EXPECTED_RESULT[1])
    def test_sites(self):
        """Testing Get Sites"""
        EXPECTED_SITES= [
            TestingSites("Covid-19 Testing Sites","5 abc street, Newark, New Jersey 07700",40000,50000,"1928392030","www.dot.com",10),
            TestingSites("TCovid-19 Testing Sites",", ,  ",40000,50000,"1928392030","www.dot.com",10)
        ]
        with mock.patch("requests.get", mock_get_sites):
            tsites = get_sites(10,20)
            for i in range(0,len(tsites)):
                tsite= tsites[i]
                expected_site = EXPECTED_SITES[i]
                self.assertEqual(tsite.title, expected_site.title)
                self.assertEqual(tsite.entireAddress, expected_site.entireAddress)
                self.assertEqual(tsite.latitude, expected_site.latitude)
                self.assertEqual(tsite.longitude, expected_site.longitude)
                self.assertEqual(tsite.phone, expected_site.phone)
                self.assertEqual(tsite.web, expected_site.web)
                self.assertEqual(tsite.miles, expected_site.miles)
    def test_get_all_questions_one(self):
        """Testing FAQ"""
        EXPECTED_QUESTION = FAQ("What is Covid?","Covid is covid.","<p>Covid is covid.</p>","cdc, who")
        with mock.patch("requests.get", mock_faq_request_one):
            questions = get_all_questions()
            question = questions[0]
            self.assertEqual(question.question, EXPECTED_QUESTION.question)
            self.assertEqual(question.answer, EXPECTED_QUESTION.answer)
            self.assertEqual(question.answer_html, EXPECTED_QUESTION.answer_html)
            self.assertEqual(question.source, EXPECTED_QUESTION.source)
    def test_get_all_questions_two(self):
        """Testing FAQ"""
        EXPECTED_QUESTIONS = [
            FAQ("What is Covid?","Covid is covid.","<p>Covid is covid.</p>","cdc, who"),
            FAQ("Where is Covid?","Covid is here.","<p>Covid is here.</p>","cdc")
        ]
        with mock.patch("requests.get", mock_faq_request_two):
            questions = get_all_questions()
            for i in range(0,len(questions)):
                question = questions[i]
                EXPECTED_QUESTION=EXPECTED_QUESTIONS[i]
                self.assertEqual(question.question, EXPECTED_QUESTION.question)
                self.assertEqual(question.answer, EXPECTED_QUESTION.answer)
                self.assertEqual(question.answer_html, EXPECTED_QUESTION.answer_html)
                self.assertEqual(question.source, EXPECTED_QUESTION.source)
    def test_get_news_one(self):
        """Testing NEWS"""
        response = get_news(0)
        self.assertEqual(response['Error'],'Amount of articles must be > 0')
    def test_get_new_two(self):
        """Testing NEWS"""
        EXPECTED_ARTICLES= [
            Article("Test_Title","CBS News","this is a description","CBS News","image.jpg","a time","link to article"),
            Article("Test_Title","CBS News","this is a description","CBS News","image.jpg","a time","link to article")
        ]
        with mock.patch("requests.get", mock_news_request_one):
            articles = get_news(2)
            for i in range(0,len(articles)):
                article = articles[i]
                expected_article = EXPECTED_ARTICLES[i]
                self.assertEqual(article.title, expected_article.title)
                self.assertEqual(article.author, expected_article.author)
                self.assertEqual(article.description, expected_article.description)
                self.assertEqual(article.source, expected_article.source)
                self.assertEqual(article.image, expected_article.image)
                self.assertEqual(article.publishDate, expected_article.publishDate)
                self.assertEqual(article.url, expected_article.url)
    def test_get_new_three(self):
        """Testing NEWS"""
        EXPECTED_ARTICLES= [
            Article("Test_Title","CBS News","this is a description","CBS News","image.jpg","a time","link to article")
        ]
        with mock.patch("requests.get", mock_news_request_one):
            articles = get_news(1)
            for i in range(0,len(articles)):
                article = articles[i]
                expected_article = EXPECTED_ARTICLES[i]
                self.assertEqual(article.title, expected_article.title)
                self.assertEqual(article.author, expected_article.author)
                self.assertEqual(article.description, expected_article.description)
                self.assertEqual(article.source, expected_article.source)
                self.assertEqual(article.image, expected_article.image)
                self.assertEqual(article.publishDate, expected_article.publishDate)
                self.assertEqual(article.url, expected_article.url)
    def test_get_new_four(self):
        """Testing NEWS"""
        EXPETECTED_ERROR='API call failed, status = 404'
        with mock.patch("requests.get", mock_news_request_two):
            error = get_news(1)
            self.assertEqual(error['Error'], EXPETECTED_ERROR)
    def test_get_location_one(self):
        """Testing Location"""
        EXPETECTED_RESULT=Location("US","United States","NJ","New Jersey","Newark","O7103",40.735657,-74.172363)
        with mock.patch("requests.get", mock_location_request_one):
            location = get_location("122.122.122.122")
            self.assertEqual(location.country_code,EXPETECTED_RESULT.country_code)
            self.assertEqual(location.country_name,EXPETECTED_RESULT.country_name)
            self.assertEqual(location.state_code,EXPETECTED_RESULT.state_code)
            self.assertEqual(location.state,EXPETECTED_RESULT.state)
            self.assertEqual(location.city,EXPETECTED_RESULT.city)
            self.assertEqual(location.zipcode,EXPETECTED_RESULT.zipcode)
            self.assertEqual(location.latitude,EXPETECTED_RESULT.latitude)
            self.assertEqual(location.longitude,EXPETECTED_RESULT.longitude)
    def test_get_covid_stats_by_state_one(self):
        """Testing Covid.py states"""
        EXPECTED_RESULT=StateStats("New Jersey",2000,1000,677,100,566,34563,456,3455,45,6436)
        with mock.patch("requests.get", mock_state_covid_request_one):
            stats = get_covid_stats_by_state("New Jersey")
            self.assertEqual(stats.state,EXPECTED_RESULT.state)
            self.assertEqual(stats.cases,EXPECTED_RESULT.cases)
            self.assertEqual(stats.todaysCases,EXPECTED_RESULT.todaysCases)
            self.assertEqual(stats.activeCases,EXPECTED_RESULT.activeCases)
            self.assertEqual(stats.casesPerMillion,EXPECTED_RESULT.casesPerMillion)
            self.assertEqual(stats.deaths,EXPECTED_RESULT.deaths)
            self.assertEqual(stats.todayDeaths,EXPECTED_RESULT.todayDeaths)
            self.assertEqual(stats.deathsPerMillion,EXPECTED_RESULT.deathsPerMillion)
            self.assertEqual(stats.recovered,EXPECTED_RESULT.recovered)
            self.assertEqual(stats.tests,EXPECTED_RESULT.tests)
            self.assertEqual(stats.testsPerPerMillion,EXPECTED_RESULT.testsPerPerMillion)
    
    def test_get_covid_stats_by_county_one(self):
        """Testing Covid.py county"""
        EXPECTED_RESULT=CountyStats("New Jersey","Passaic","11/11/2020",566,34563,3455)
        with mock.patch("requests.get", mock_county_covid_request_one):
            counties = get_covid_stats_by_county("New Jersey","Passaic")
            stats = counties[0]
            self.assertEqual(stats.state,EXPECTED_RESULT.state)
            self.assertEqual(stats.county,EXPECTED_RESULT.county)
            self.assertEqual(stats.updatedAt,EXPECTED_RESULT.updatedAt)
            self.assertEqual(stats.confirmed,EXPECTED_RESULT.confirmed)
            self.assertEqual(stats.deaths,EXPECTED_RESULT.deaths)
            self.assertEqual(stats.recovered,EXPECTED_RESULT.recovered)
    
if __name__ == '__main__':
    unittest.main()
    
    