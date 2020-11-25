"""API Call for FAQ's"""
import requests

def get_all_questions(category=None):
    """API call for FAQ"""
    questions = []
    url = ("https://faq.coronavirus.gov/api/v2/questions.json")
    response=requests.get(url)
    data = response.json()
    for question in data:
        q=question['title']
        
        fromCat = False
        if category==None:
            fromCat = True
        else: 
            for cat in question['categories']:
                if cat['title']==category:
                    fromCat = True
        
        if q != 'None' and fromCat:
            a=question['answer']
            a_html=question['answer_html']
            sources = ''
            for source in question['sources']:
                sources+=source['agency'] + ', '
            sources = sources[:-2]
            questions.append(FAQ(q,a,a_html,sources))
            
    return questions

def get_all_categories():
    """API call for FAQ"""
    categories = []
    url = ("https://faq.coronavirus.gov/api/v2/categories.json")
    response=requests.get(url)
    data = response.json()
    for category in data:
        categories.append(category['title'])
    
    return categories
    

class FAQ:
    """FAQ Class"""
    def __init__(self, question, answer, answer_html, source):
        self.question = question
        self.answer = answer
        self.answer_html = answer_html
        self.source = source

