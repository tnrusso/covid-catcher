import unittest
import mock
import json
import sys, os
sys.path.append('../')
from faq import get_all_questions, FAQ
from news import get_news, Article

class MockResponse:
    def __init__(self, json_data, status_code):
        self.json_data = json_data
        self.status_code = status_code

    def json(self):
        return self.json_data

def mock_faq_request_one(url):
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
    data= {"status":"404",
        "totalResults":0}
    return MockResponse(data, 200)

class api_unit_tests(unittest.TestCase):
    def setUp(self):
        """set up"""
        self.maxDiff=None
    
    def tearDown(self):
        """tear down"""
        pass
    
    def test_get_all_questions_one(self):
        
        EXPECTED_QUESTION = FAQ("What is Covid?","Covid is covid.","<p>Covid is covid.</p>","cdc, who")
        
        with mock.patch("requests.get", mock_faq_request_one):
            questions = get_all_questions()
            
            question = questions[0]
            
            self.assertEqual(question.question, EXPECTED_QUESTION.question)
            self.assertEqual(question.answer, EXPECTED_QUESTION.answer)
            self.assertEqual(question.answer_html, EXPECTED_QUESTION.answer_html)
            self.assertEqual(question.source, EXPECTED_QUESTION.source)
    
    def test_get_all_questions_two(self):
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
        response = get_news(0)
        self.assertEqual(response['Error'],'Amount of articles must be > 0')
        
    def test_get_new_two(self):
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
        EXPETECTED_ERROR='API call failed, status = 404'
        with mock.patch("requests.get", mock_news_request_two):
            error = get_news(1)
            self.assertEqual(error['Error'], EXPETECTED_ERROR)
            
                
        
        
if __name__ == '__main__':
    unittest.main()