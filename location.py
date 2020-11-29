"""API Call to get User's Location"""
import requests
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), "api-keys.env")
load_dotenv(dotenv_path)

def get_location(ip):
    """API Call for Location"""
    url = ('http://api.ipstack.com/'
        ''+ip+'?'
        'access_key='+ os.environ['LOCATION_API_KEY']+''
        '&format=1')
    response=requests.get(url)
    data = response.json()
    country_code = data['country_code']
    country_name = data['country_name']
    state_code = data['region_code']
    state = data['region_name']
    city = data['city']
    zipcode = data['zip']
    latitude = data['latitude']
    longitude = data['longitude']
    return Location(country_code,country_name,state_code,state,city,zipcode,latitude,longitude)
class Location:
    """Location Class"""
    def __init__(self, country_code,country_name,state_code,state,city,zipcode,latitude,longitude):
        self.country_code=country_code
        self.country_name=country_name
        self.state_code=state_code
        self.state=state
        self.city=city
        self.zipcode=zipcode
        self.latitude=latitude
        self.longitude=longitude
        