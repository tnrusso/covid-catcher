from covid import get_covid_stats_by_county
from covid import get_covid_stats_by_state
import news
from news import get_news


STATISTICS = "stats"
NEWUSER = "new user"
ARTICLE = "article list"


def push_stat_data(socketio, state):
    """Calls Covid API"""
    information = get_covid_stats_by_state(state)
    case = information.cases
    death = information.deaths
    rec = information.recovered
    county_list = []
    county_confirmed = []
    county_deaths = []
    county_rec = []
    updated = []
    print("CASES DEATHS AND RECOVERED: ",case, death, rec)
    allcounty = get_covid_stats_by_county(state,'')
    for x in allcounty:
        county_list.append(x.county)
        county_confirmed.append(x.confirmed)
        county_deaths.append(x.deaths)
        county_rec.append(x.recovered)
        updated.append(x.updatedAt)
        '''
        print(x.county)
        print(x.confirmed)
        print(x.deaths)
        print(x.recovered)
        print(x.updatedAt)
        '''
    socketio.emit(STATISTICS, {'state': state, 'cases' : case, 'deaths' : death, 'recovered' : rec, 'countyNames' : county_list, 'countyStats' : county_confirmed, 'countydeaths' : county_deaths, 'countyrecovered' : county_rec, 'updated' : updated})
    r = "stats are pushed"
    return r

def articleList(socketio):
    """Calls the Article API"""
    articles = get_news(5, since = news.YESTERDAY.strftime("%yyyy-%mm-%dd"),  query = 'covid')
    title_list = []
    desc_list = []
    url_list = []
    image_list = []
    source_list = []
    for art in articles:
        image_list.append(art.image)
        title_list.append(art.title)
        source_list.append(art.source)
        desc_list.append(art.description)
        url_list.append(art.url)
    socketio.emit(ARTICLE,{'title': title_list, 'desc':desc_list,'url':url_list,
                    'img': image_list, 'sources': source_list})
    return True