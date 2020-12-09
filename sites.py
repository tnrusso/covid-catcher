# pylint: disable=C0301, C0103
"""API Calls for Testing Site Location"""
import os
from os.path import join, dirname
import requests
from dotenv import load_dotenv
dotenv_path = join(dirname(__file__), "api-keys.env")
load_dotenv(dotenv_path)

def get_sites(lat,lng):
    """Gets Nearest Sites using Lat and Lng"""
    url = ('https://discover.search.hereapi.com/v1/discover?apikey='+os.environ['SITE_API_KEY']+'&q=COVID&at='+str(lat)+','+str(lng)+'&limit=3')
    response=requests.get(url)
    data = response.json()
    sites = []
    for x in data['items']:
        title = x['title']
        address = x['address']
        position = x['position']
        if 'houseNumber' not in address.keys():
            address['houseNumber'] = ''
        if 'street' not in address.keys():
            address['street'] = ''
        if 'city' not in address.keys():
            address['city'] = ''
        if 'state' not in address.keys():
            address['state'] = ''
        if 'postalCode' not in address.keys():
            address['postalCode'] = ''
        entireAddress = address['houseNumber']+" "+address['street']+", "+address['city']+", "+address['state']+" "+address['postalCode']
        latitude = position['lat']
        longitude = position['lng']
        if 'contacts' not in x.keys():
            phone = ''
            web = ''
        else:
            for i in x['contacts']:
                if 'phone' not in i.keys():
                    phone =''
                else:
                    phone = i['phone'][0]['value']
                if 'www' not in i.keys():
                    web = ''
                else:
                    web = i['www'][0]['value']
        if 'distance' not in x.keys():
            meter = 0
        meter = x['distance']
        miles = meter*0.00062137119224
        miles = str(miles)[0:4]
        sites.append(TestingSites(title,entireAddress,latitude,longitude,phone,web,miles))
    return sites
def search_user(area):
    """Gets Lat and Lng of the Address"""
    url = ('https://geocode.search.hereapi.com/v1/geocode?apikey='+os.environ['SITE_API_KEY']+'&q='+area)
    response=requests.get(url)
    data = response.json()
    lat_lng = []
    for i in data['items']:
        p = i['position']
        latitude = p['lat']
        longitude = p['lng']
        lat_lng.append(latitude)
        lat_lng.append(longitude)
    return lat_lng
class TestingSites:
    """Testing Site Information"""
    def __init__(self,title,entireAddress,latitude,longitude,phone,web,miles):
        self.title=title
        self.entireAddress=entireAddress
        self.latitude=latitude
        self.longitude=longitude
        self.phone=phone
        self.web=web
        self.miles=miles
