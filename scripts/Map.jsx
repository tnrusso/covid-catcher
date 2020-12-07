import * as React from 'react';
import H from '@here/maps-api-for-javascript';
import * as ReactDOM from 'react-dom';
import { InfoMap } from './InfoMap';

export const Map = (props) => {
  const mapRef = React.useRef(null);
  React.useLayoutEffect(() => {
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
        apikey: props.key1
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: props.userLat, lng: props.userLng },
      zoom: 14,
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);
    const home = new H.map.Marker({ lat: props.userLat, lng: props.userLng });
      home.addEventListener('tap', (event) => {
        const  bubble = new H.ui.InfoBubble(
          { lat: props.userLat, lng: props.userLng },
          {
            content: '<b> You are Here! </b>',
          },
        );
        ui.addBubble(bubble);
      }, false);
       const  endMarker1 = new H.map.Marker({ lat: props.lat1, lng: props.lng1 });
      endMarker1.addEventListener('tap', (event) => {
        const bubble = new H.ui.InfoBubble(
          { lat: props.lat1, lng: props.lng1 },
          {
            content: `<a href=${props.web1}>${props.titleplace1}</a>`,
          },
        );
        ui.addBubble(bubble);
      }, false);
      const endMarker2 = new H.map.Marker({ lat: props.lat2, lng: props.lng2 });
      endMarker2.addEventListener('tap', (event) => {
        const bubble = new H.ui.InfoBubble(
          { lat: props.lat2, lng: props.lng2 },
          {
            content: `<a href=${props.web2}>${props.titleplace2}</a>`,
          },
        );
        ui.addBubble(bubble);
      }, false);
      const  endMarker3 = new H.map.Marker({ lat: props.lat3, lng: props.lng3 });
      endMarker3.addEventListener('tap', (event) => {
        const bubble= new H.ui.InfoBubble(
          { lat: props.lat3, lng: props.lng3 },
          {
            content: `<a href=${props.web3}>${props.titleplace3}</a>`,
          },
        );
        ui.addBubble(bubble);
      }, false);
      hMap.addObjects([home,endMarker1, endMarker2, endMarker3]);
    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef]); // This will run this hook every time this ref is updated
  
  return <div  ref={mapRef}  />;
};
