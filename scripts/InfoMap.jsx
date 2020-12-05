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
 
console.log("this is "+ key)
if(key == '')
{
  console.log("LOADING")
  
}
else{
  var l  =      <ul className="articles-ul"><Map align="right" key1={key} titleplace1={title[0]} titleplace2={title[1]} titleplace3={title[2]} userLat={ulatitude} userLng={ulongitude} lat1={latitudes[0]} lng1={longitudes[0]} lat2={latitudes[1]} lng2={longitudes[1]} lat3={latitudes[2]} lng3={longitudes[2]}/>
        {title.map((siteTitle, index) => (
          <li className="article-li" key={index}>
            <p className="article-title">{siteTitle}</p>
            <p className="article-desc">{address[index]}</p>
            <p className="article-source">{phone[index]}</p>
            <a href={web[index]}>{web[index]}</a>
            <p className="article-desc">Distance : {miles[index]} miles</p>
          </li>
        ))} 
      </ul>  
 
}
  return (
  <div id="article-div">
<h1 className="faq-h1">Nearest COVID-19 Testing Locations</h1>
    
       {l}
    </div>
   
  );
}