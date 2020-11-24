#pylint: disable=C0103
"""COVID API CALLS STATES AND COUNTY"""
import requests

def get_covid_stats_by_county(state,county):
    """API Call for county stats"""
    url = ('https://corona.lmao.ninja/v2/jhucsse/counties/' + county)
    response=requests.get(url)
    data = response.json()
    counties = []
    for res in data:
        if res["province"]==state:
            county1 = res['county']
            updatedAt = res['updatedAt']
            stats = res['stats']
            confirmed = stats['confirmed']
            deaths = stats['deaths']
            recovered = stats['recovered']
            counties.append(CountyStats(state,county1,updatedAt,confirmed,deaths,recovered))
            #return CountyStats(state,county,updatedAt,confirmed,deaths,recovered)
    return counties
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

def get_covid_stats_for_all_states():
    """API Call for all states stats"""
    url = ('https://corona.lmao.ninja/v2/states/')
    response=requests.get(url)
    data = response.json()
    
    states = []
    
    for state in data:
        stateName = state['state']
        
        cases = state['cases']
        todaysCases = state['todayCases']
        deaths = state['deaths']
        todayDeaths = state['todayDeaths']
        recovered = state['recovered']
        activeCases = state['active']
        tests = state['tests']
        casesPerMil=state['casesPerOneMillion']
        deathsPerMil=state['deathsPerOneMillion']
        testsPerMil= state['testsPerOneMillion']
        
        population = state['population']
        
        if population!=0:
            millionsOfPop = population/1000000.0
            activeCasesPerMil = activeCases/millionsOfPop
            color = get_color(activeCasesPerMil)
            states.append(StateStats(stateName,cases,todaysCases,activeCases,casesPerMil,deaths,todayDeaths,deathsPerMil,recovered,tests,testsPerMil,color))
        else:
            states.append(StateStats(stateName,cases,todaysCases,activeCases,casesPerMil,deaths,todayDeaths,deathsPerMil,recovered,tests,testsPerMil))
    
    return states

def get_color(activePerMillion):
    activePer100k = activePerMillion/10.0
    if activePer100k < 100:
        return '#FFFFFF'
    elif activePer100k < 500:
        return '#F1E2E2'
    elif activePer100k < 1000:
        return '#E3C6C6'
    elif activePer100k < 1500:
        return '#D5AAAA'
    elif activePer100k < 2000:
        return '#C78D8D'
    elif activePer100k < 2500:
        return '#B97171'
    elif activePer100k < 3000:
        return '#AB5555'
    elif activePer100k < 3500:
        return '#9D3838'
    elif activePer100k < 4000:
        return '#8F1C1C'
    else:
        return '#820000'
    

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
    def __init__(self,state,cases,todaysCases,activeCases,casesPerMillion,deaths,todayDeaths,deathsPerMillion,recovered,tests,testsPerPerMillion,color='#FFFFFF'):
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
        self.color = color
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
