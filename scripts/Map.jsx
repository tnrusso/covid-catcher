import * as React from 'react';
import H from "@here/maps-api-for-javascript";
import * as ReactDOM from 'react-dom';
import {InfoMap} from './InfoMap';
export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.map = null;

  }
  componentDidMount() {
    if (!this.map) {
      // instantiate a platform, default layers and a map as usual
      var platform = new H.service.Platform({
        apikey: this.props.key1
      });
      const layers = platform.createDefaultLayers();
      var service = platform.getSearchService();
     
      
      
var targetElement = document.getElementById('mapContainer');

// Get the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate the map:
var map = new H.Map(
  this.ref.current,
  defaultLayers.vector.normal.map,
  {
    zoom: 14,
    center: { lat: this.props.userLat, lng: this.props.userLng }
  });
  this.map = map;;
var userOrigin = this.props.userLat+','+this.props.userLng;
var dest1 = this.props.lat1+','+this.props.lng1
var dest2 = this.props.lat2+','+this.props.lng2
var dest3 = this.props.lat3+','+this.props.lng3
var routingParameters = {
  'routingMode': 'fast',
  'transportMode': 'car',
 
  'origin': userOrigin,
  
  'destination': dest1,
  
  'return': 'polyline'
};
var routingParameters1 = {
  'routingMode': 'fast',
  'transportMode': 'car',
 
  'origin': userOrigin,
  
  'destination': dest2,
  
  'return': 'polyline'
};
var routingParameters2 = {
  'routingMode': 'fast',
  'transportMode': 'car',
 
  'origin': userOrigin,
  
  'destination': dest3,
  
  'return': 'polyline'
};

// Define a callback function to process the routing response:
var onResult = function(result) {
  // ensure that at least one route was found
  if (result.routes.length) {
    result.routes[0].sections.forEach((section) => {
         // Create a linestring to use as a point source for the route line
        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
        var routeOutline = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 10,
            strokeColor: 'rgba(0, 128, 255, 0.7)',
            lineTailCap: 'arrow-tail',
            lineHeadCap: 'arrow-head'
          }
          });
        var routeArrows = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 10,
            fillColor: 'white',
            strokeColor: 'rgba(255, 255, 255, 1)',
            lineDash: [0, 2],
            lineTailCap: 'arrow-tail',
            lineHeadCap: 'arrow-head' }
          }
          );
var routeLine = new H.map.Group();
routeLine.addObjects([routeOutline, routeArrows]);

        let startMarker = new H.map.Marker(section.departure.place.location);
        let endMarker = new H.map.Marker(section.arrival.place.location);
        map.addObjects([routeLine, startMarker, endMarker]);
       
        });}
};
var onResult3 = function(result) {
  // ensure that at least one route was found
  if (result.routes.length) {
    result.routes[0].sections.forEach((section) => {
         // Create a linestring to use as a point source for the route line
        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
        var routeOutline = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 10,
            strokeColor: 'rgba(0, 128, 0, 0.7)',
            lineTailCap: 'arrow-tail',
            lineHeadCap: 'arrow-head'
          }
          });
        var routeArrows = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 10,
            fillColor: 'white',
            strokeColor: 'rgba(255, 255, 255, 1)',
            lineDash: [0, 2],
            lineTailCap: 'arrow-tail',
            lineHeadCap: 'arrow-head' }
          }
          );
var routeLine = new H.map.Group();
routeLine.addObjects([routeOutline, routeArrows]);

        let startMarker = new H.map.Marker(section.departure.place.location);
        let endMarker = new H.map.Marker(section.arrival.place.location);
        map.addObjects([routeLine, startMarker, endMarker]);
       
        });}
};
var onResult1 = function(result) {
  // ensure that at least one route was found
  if (result.routes.length) {
    result.routes[0].sections.forEach((section) => {
         // Create a linestring to use as a point source for the route line
        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
        var routeOutline = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 10,
            strokeColor: 'rgba(220, 0, 0, 0.7)',
            lineTailCap: 'arrow-tail',
            lineHeadCap: 'arrow-head'
          }
          });
        var routeArrows = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 10,
            fillColor: 'white',
            strokeColor: 'rgba(255, 255, 255, 1)',
            lineDash: [0, 2],
            lineTailCap: 'arrow-tail',
            lineHeadCap: 'arrow-head' }
          }
          );
var routeLine = new H.map.Group();
routeLine.addObjects([routeOutline, routeArrows]);

        let startMarker = new H.map.Marker(section.departure.place.location);
        let endMarker = new H.map.Marker(section.arrival.place.location);
        map.addObjects([routeLine, startMarker, endMarker]);
       
        });}
};

var router = platform.getRoutingService(null, 8);

router.calculateRoute(routingParameters, onResult,
  function(error) {
    alert(error.message);
  });
  router.calculateRoute(routingParameters1, onResult1,
  function(error) {
    alert(error.message);
  });
  router.calculateRoute(routingParameters2, onResult3,
  function(error) {
    alert(error.message);
  });
 



    }
  }

  render() {
    return (
      <div 
        style={{ width: '900px', height:'900px' }}
        ref={this.ref}
      >
       </div>
        
    
      
    )
  }
}