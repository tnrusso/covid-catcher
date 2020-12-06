import * as React from 'react';
import H from '@here/maps-api-for-javascript';
import * as ReactDOM from 'react-dom';
import { InfoMap } from './InfoMap';
import { Content } from './Content';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.map = null;
  }

  componentDidMount() {
    if (!this.map) {
      const platform = new H.service.Platform({
        apikey: this.props.key1,
      });
      const layers = platform.createDefaultLayers();
      const service = platform.getSearchService();

      const targetElement = document.getElementById('mapContainer');
      const defaultLayers = platform.createDefaultLayers();

      const map = new H.Map(
        this.ref.current,

        defaultLayers.vector.normal.map,
        {
          zoom: 14,
          center: { lat: this.props.userLat, lng: this.props.userLng },
        },
      );
      this.map = map;
      const userOrigin = `${this.props.userLat},${this.props.userLng}`;
      console.log(userOrigin);
      const dest1 = `${this.props.lat1},${this.props.lng1}`;
      const dest2 = `${this.props.lat2},${this.props.lng2}`;
      const dest3 = `${this.props.lat3},${this.props.lng3}`;
      const ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');
      const mapEvents = new H.mapevents.MapEvents(map);
      const bh = new H.mapevents.Behavior(mapEvents);
      const startMarker1 = new H.map.Marker({ lat: this.props.userLat, lng: this.props.userLng });
      startMarker1.addEventListener('tap', (event) => {
        const bubble = new H.ui.InfoBubble(
          { lat: this.props.userLat, lng: this.props.userLng },
          {
            content: '<b> You are Here! </b>',
          },
        );
        ui.addBubble(bubble);
      }, false);
      startMarker1.setGeometry({ lat: this.props.userLat, lng: this.props.userLng });
      const endMarker1 = new H.map.Marker({ lat: this.props.lat1, lng: this.props.lng1 });
      endMarker1.addEventListener('tap', (event) => {
        const bubble1 = new H.ui.InfoBubble(
          { lat: this.props.lat1, lng: this.props.lng1 },
          {
            content: `<a href=${this.props.web1}>${this.props.titleplace1}</a>`,
          },
        );
        ui.addBubble(bubble1);
      }, false);
      const endMarker2 = new H.map.Marker({ lat: this.props.lat2, lng: this.props.lng2 });
      endMarker2.addEventListener('tap', (event) => {
        const bubble2 = new H.ui.InfoBubble(
          { lat: this.props.lat2, lng: this.props.lng2 },
          {
            content: `<a href=${this.props.web2}>${this.props.titleplace2}</a>`,
          },
        );
        ui.addBubble(bubble2);
      }, false);
      const endMarker3 = new H.map.Marker({ lat: this.props.lat3, lng: this.props.lng3 });
      endMarker3.addEventListener('tap', (event) => {
        const bubble3 = new H.ui.InfoBubble(
          { lat: this.props.lat3, lng: this.props.lng3 },
          {
            content: `<a href=${this.props.web3}>${this.props.titleplace3}</a>`,
          },
        );
        ui.addBubble(bubble3);
      }, false);

      const routingParameters = {
        routingMode: 'fast',
        transportMode: 'car',

        origin: userOrigin,

        destination: dest1,

        return: 'polyline',
      };
      const routingParameters1 = {
        routingMode: 'fast',
        transportMode: 'car',

        origin: userOrigin,

        destination: dest2,

        return: 'polyline',
      };
      const routingParameters2 = {
        routingMode: 'fast',
        transportMode: 'car',

        origin: userOrigin,

        destination: dest3,

        return: 'polyline',
      };

      const onResult = function (result) {
        if (result.routes.length) {
          result.routes[0].sections.forEach((section) => {
            const linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
            const routeOutline = new H.map.Polyline(linestring, {
              style: {
                lineWidth: 10,
                strokeColor: 'rgba(0, 128, 255, 0.7)',
                lineTailCap: 'arrow-tail',
                lineHeadCap: 'arrow-head',
              },
            });
            const routeArrows = new H.map.Polyline(linestring, {
              style: {
                lineWidth: 10,
                fillColor: 'white',
                strokeColor: 'rgba(255, 255, 255, 1)',
                lineDash: [0, 2],
                lineTailCap: 'arrow-tail',
                lineHeadCap: 'arrow-head',
              },
            });
            const routeLine = new H.map.Group();
            routeLine.addObjects([routeOutline, routeArrows]);

            // let startMarker = new H.map.Marker(section.departure.place.location);
            // let endMarker = new H.map.Marker(section.arrival.place.location);
            map.addObjects([routeLine, startMarker1, endMarker1]);
          });
        }
      };
      const onResult3 = function (result) {
        if (result.routes.length) {
          result.routes[0].sections.forEach((section) => {
            const linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
            const routeOutline = new H.map.Polyline(linestring, {
              style: {
                lineWidth: 10,
                strokeColor: 'rgba(0, 128, 0, 0.7)',
                lineTailCap: 'arrow-tail',
                lineHeadCap: 'arrow-head',
              },
            });
            const routeArrows = new H.map.Polyline(linestring, {
              style: {
                lineWidth: 10,
                fillColor: 'white',
                strokeColor: 'rgba(255, 255, 255, 1)',
                lineDash: [0, 2],
                lineTailCap: 'arrow-tail',
                lineHeadCap: 'arrow-head',
              },
            });
            const routeLine = new H.map.Group();
            routeLine.addObjects([routeOutline, routeArrows]);

            // let startMarker = new H.map.Marker(section.departure.place.location);

            // let endMarker = new H.map.Marker(section.arrival.place.location);
            map.addObjects([routeLine, startMarker1, endMarker3]);
          });
        }
      };
      const onResult1 = function (result) {
        if (result.routes.length) {
          result.routes[0].sections.forEach((section) => {
            const linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
            const routeOutline = new H.map.Polyline(linestring, {
              style: {
                lineWidth: 10,
                strokeColor: 'rgba(220, 0, 0, 0.7)',
                lineTailCap: 'arrow-tail',
                lineHeadCap: 'arrow-head',
              },
            });
            const routeArrows = new H.map.Polyline(linestring, {
              style: {
                lineWidth: 10,
                fillColor: 'white',
                strokeColor: 'rgba(255, 255, 255, 1)',
                lineDash: [0, 2],
                lineTailCap: 'arrow-tail',
                lineHeadCap: 'arrow-head',
              },
            });
            const routeLine = new H.map.Group();
            routeLine.addObjects([routeOutline, routeArrows]);

            // let startMarker = new H.map.Marker(section.departure.place.location);
            // let endMarker = new H.map.Marker(section.arrival.place.location);
            map.addObjects([routeLine, startMarker1, endMarker2]);
          });
        }
      };

      const router = platform.getRoutingService(null, 8);

      router.calculateRoute(routingParameters, onResult,
        (error) => {
          alert(error.message);
        });
      router.calculateRoute(routingParameters1, onResult1,
        (error) => {
          alert(error.message);
        });
      router.calculateRoute(routingParameters2, onResult3,
        (error) => {
          alert(error.message);
        });
      const mapSettings = ui.getControl('mapsettings');
      const zoom = ui.getControl('zoom').setDisabled(false);
      const scalebar = ui.getControl('scalebar');

      mapSettings.setAlignment('top-left');
      zoom.setAlignment('top-left');
      scalebar.setAlignment('top-left');
    }
  }

  componentDidUpdate() {
    
  }

  render() {
    return (
      <div
        ref={this.ref}
      />

    );
  }
}
