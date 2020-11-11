import requests
import os
from datetime import date
from datetime import timedelta 

YESTERDAY = date.today() - timedelta(days = 1) 
SOURCES = ('abc-news,associated-press,bloomberg,'
        'cbs-news,cnn,fox-news,google-news,'
        'independent,msnbc,medical-news-today,'
        'nbc-news,the-hill,usa-today')

def get_news(amtArticles, since = YESTERDAY.strftime("%yyyy-%mm-%dd"), query = 'covid'):
    '''
    This function is used to pull articles from NEWS API
        PARAMERTERS:
            amtArticles: the amount of articles you would like to be returned
            since: what is the oldest you would like an article to be
                DEFAULT: yesterday's date
            query: what one keyword would you liek to query for
                DEFUALT: covid
        RETURNS
            an array of Article objects
    '''    
    
    if amtArticles < 1: 
        return {'Error':'Amount of articles must be > 0'}
    
    #ensure that the query is one word
    query = query.split()[0]
    
    url = ('http://newsapi.org/v2/top-headlines?'
            'sources='+SOURCES+'&'
            'q='+query+'&'
            'from='+since+'&'
            'sortBy=publishedAt&'
            'apiKey='+ os.environ['NEWS_API_KEY'])
    response=requests.get(url)
    data = response.json()
    
    articles = []
    
    if data['status'] == 'ok':
        
        if data['totalResults'] < amtArticles:
            amtArticles=data['totalResults']
            
        for i in range(0,amtArticles):
            art = data['articles'][i]
            source = art['source']['name']
            author = art['author']
            title = art['title']
            desc = art['description']
            link = art['url']
            image = art['urlToImage']
            pubDate = art['publishedAt']
            
            articles.append(Article(title, author, desc, source, image, pubDate, link))
            
        return articles
        
    else:
        return {'Error': 'API call failed, status = ' + data['status'] }
    

class Article:
    def __init__(self, title, author, description, source, image, publishDate, url):
        self.title = title
        self.author = author
        self.description = description
        self.source = source
        self.image = image
        self.publishDate = publishDate
        self.url = url

'''
{
    "status": "ok",
    "totalResults": 225,
    -"articles": [
        -{
        -"source": {
            "id": "axios",
            "name": "Axios"
        },
        "author": "Jacob Knutson",
        "title": "\"This is getting insane\": Republicans rebuke Trump over baseless election claims",
        "description": "\"STOP Spreading debunked misinformation,\" Rep. Adam Kinzinger said.",
        "url": "https://www.axios.com/trump-republicans-baseless-election-claims-fa686850-efb9-41cd-a25e-1b9cc1b52b85.html",
        "urlToImage": "https://images.axios.com/OgCs7tNiHvLM8zUDGuXgCOlqgZM=/fit-in/1366x1366/2020/11/06/1604623553559.jpg",
        "publishedAt": "2020-11-06T01:29:23Z",
        "content": "A growing list of Republicans have reproached President Trump for his baseless claims of widespread voter fraud.\r\nWhy it matters: In televised remarks on Thursday evening. the president provided no e… [+1962 chars]"
    },
-{
'''