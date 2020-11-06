import requests
import os
from datetime import date
from datetime import timedelta 

YESTERDAY = date.today() - timedelta(days = 1) 
SOURCES = 'abc-news,associated-press,bloomberg,cbs-news,cnn,fox-news,google-news,independent,msnbc,medical-news-today,nbc-news,the-hill,usa-today'

def get_news(amtArticles, since = YESTERDAY.strftime("%yyyy-%mm-%dd"), query = 'covid'):
    
    if amtArticles < 1: 
        return {'Error':'Amount of articles must be > 0'}
    
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
        return {'Error': 'API call failed, status= ' + data['status'] }
    

class Article:
    def __init__(self, title, author, description, source, image, publishDate, url):
        self.title = title
        self.author = author
        self.description = description
        self.source = source
        self.image = image
        self.publishDate = publishDate
        self.url = url