#pylint: disable=C0103
"""COVID API CALLS STATES AND COUNTY"""
import requests

def get_covid_stats_by_county(state,county):
    """API Call for county stats"""
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
            return CountyStats(state,county,updatedAt,confirmed,deaths,recovered)
def get_covid_stats_by_state(state):
    """API Call for state stats"""
    url = ('https://corona.lmao.ninja/v2/states/'+ state +'?yesterday=')
    response=requests.get(url)
    data = response.json()
    cases = data['cases']
    todaysCases = data['todayCases']
    deaths = data['deaths']
    todayDeaths = data['todayDeaths']
    recovered = data['recovered']
    activeCases = data['active']
    tests = data['tests']
    casesPerMil=data['casesPerOneMillion']
    deathsPerMil=data['deathsPerOneMillion']
    testsPerMil= data['testsPerOneMillion']

    return StateStats(state,cases,todaysCases,activeCases,casesPerMil,deaths,todayDeaths,deathsPerMil,recovered,tests,testsPerMil)

class CountyStats:
    """Stats for County"""
    def __init__(self,state,county,updatedAt,confirmed,deaths,recovered):
        self.state=state
        self.county=county
        self.updatedAt=updatedAt
        self.confirmed=confirmed
        self.deaths=deaths
        self.recovered=recovered

class StateStats:
    """Stats for State"""
    def __init__(self,state,cases,todaysCases,activeCases,casesPerMillion,deaths,todayDeaths,deathsPerMillion,recovered,tests,testsPerPerMillion):
        self.state=state
        self.cases=cases
        self.todaysCases=todaysCases
        self.activeCases=activeCases
        self.casesPerMillion=casesPerMillion
        self.deaths=deaths
        self.todayDeaths=todayDeaths
        self.deathsPerMillion=deathsPerMillion
        self.recovered=recovered
        self.tests=tests
        self.testsPerPerMillion=testsPerPerMillion
'''
county = get_covid_stats_by_county("New Jersey","Passaic")
print(county.state)
print(county.county)
print(county.updatedAt)
print(county.confirmed)
print(county.deaths)
print(county.recovered)

state = get_covid_stats_by_state("New Jersey")
print(state.state)
print(state.cases)
print(state.todaysCases)
print(state.activeCases)
print(state.casesPerMillion)
print(state.deaths)
print(state.todayDeaths)
print(state.deathsPerMillion)
print(state.recovered)
print(state.tests)
print(state.testsPerPerMillion)
'''
