import requests

def get_covid_stats_by_county(state,county):
    url = ('https://corona.lmao.ninja/v2/jhucsse/counties/' + county)
    response=requests.get(url)
    data = response.json()
    
    for res in data:
        if res["province"]==state:
            updatedAt = res['updatedAt']
            stats = res['stats']
            confirmed = stats['confirmed']
            deaths = stats['deaths']
            recovered = stats['recovered']
            
            return CountyStats(updatedAt,confirmed,deaths,recovered)
    

class CountyStats:
    def __init__(self,updatedAt,confirmed,deaths,recovered):
        self.updatedAt=updatedAt
        self.confirmed=confirmed
        self.deaths=deaths
        self.recovered=recovered