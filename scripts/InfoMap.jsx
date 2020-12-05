import * as React from 'react';
import H from "@here/maps-api-for-javascript";
import { Socket } from './Socket';
import Map from './Map';
import { Articles } from './Articles';


export function InfoMap() {
    const [title, setTitle] = React.useState([]);
    const [address, setAddress] = React.useState([]);
    const [latitudes, setLat] = React.useState([]);
    const [longitudes, setLng] = React.useState([]);
    const [phone, setPhone] = React.useState([]);
    const [web, setWeb] = React.useState([]);
    const [miles, setMiles] = React.useState([]);
    const [ulatitude, setLatu] = React.useState([]);
    const [ulongitude, setLngu] = React.useState([]);
    const [key, setKey] = React.useState([]);
    function getInfoMap() {
      React.useEffect(() => {
        Socket.on('site page', (data) => {
          setTitle(data.title);
          setAddress(data.address);
          setLat(data.latitude);
          setLng(data.longitude);
          setPhone(data.phone);
          setWeb(data.web);
          setMiles(data.miles);
          setLatu(data.user_lat);
          setLngu(data.user_lng);
          setKey(data.key);
        });
        return () => Socket.off('site page');
    });
     
  }

  getInfoMap();
  
if (key != ''){
  var l  = 
  
    <div className="testing-content">
      <div className="testing-map">
        <Map align="right" key1={key} 
          titleplace1={title[0]} lat1={latitudes[0]} lng1={longitudes[0]} web1 = {web[0]} 
          titleplace2={title[1]} lat2={latitudes[1]} lng2={longitudes[1]} web2 = {web[1]} 
          titleplace3={title[2]} lat3={latitudes[2]} lng3={longitudes[2]} web3 = {web[2]}
          userLat={ulatitude} userLng={ulongitude} />
      </div>
        
      <ul className="testing-ul">
        {title.map((siteTitle, index) => (
          <li className="testing-li" key={index}>
            <p className="testing-title">{siteTitle}</p>
            <p className="testing-desc">{address[index]}</p>
            <p className="testing-source">Tel: <i>{phone[index]}</i></p>
            <p className="testing-desc">Distance : <i>{miles[index]}</i> miles</p>
            <a className="testing-link" href={web[index]}>Go To Website</a>
            <hr id='hr-9' />
          </li>
        ))} 
      </ul>
    </div>
}
  return (
  <div className="testing-wrapper">
    <h1 className="testing-h1">Nearest COVID-19 Testing Locations</h1>
    <hr id='hr-8'/>
    
       {l}
  </div>
   
  );
}