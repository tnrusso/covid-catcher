import requests

def get_all_questions():
    questions = []
    url = ("https://faq.coronavirus.gov/api/v2/questions.json")
    response=requests.get(url)
    data = response.json()
    
    for question in data:
        q=question['title']
        if q != 'None':
            a=question['answer']
            a_html=question['answer_html']
            
            sources = ''
            for source in question['sources']:
                sources+=source['agency'] + ', '
            sources = sources[:-2]
            
            questions.append(FAQ(q,a,a_html,sources))
    
    return questions

class FAQ:
    def __init__(self, question, answer, answer_html, source):
        self.question = question
        self.answer = answer
        self.answer_html = answer_html
        self.source = source