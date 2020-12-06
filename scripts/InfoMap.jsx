import * as React from 'react';
import H from '@here/maps-api-for-javascript';
import ReactDOM from 'react-dom';
import { Socket } from './Socket';
import Map from './Map';
import { Articles } from './Articles';
import { Content } from './Content';

export function InfoMap() {
  const [title, setTitle] = React.useState([]);
  const [address, setAddress] = React.useState([]);
  const [latitudes, setLat] = React.useState([]);
  const [longitudes, setLng] = React.useState([]);
  const [phone, setPhone] = React.useState([]);
  const [web, setWeb] = React.useState([]);
  const [miles, setMiles] = React.useState([]);
  const [ulatitude, setLatu] = React.useState('');
  const [ulongitude, setLngu] = React.useState('');
  const [key, setKey] = React.useState([]);
  const [l, setL] = React.useState('');
  const inx = 0;
  const ind = 0;
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
    }, []);
  }
  function handleSubmit(event) {
    const area = document.getElementById('newArea');

    Socket.emit('search location', {
      area: area.value,
    });

    console.log(`Sent the address ${area.value}`);

    area.value = '';
    event.preventDefault();
  }
  function handleChange(event) {
    ReactDOM.render(
      <div>
        <Content />
<div className="testing-content">
        <div className="testing-map">
          <Map
            align="right"
            key1={key}
            titleplace1={title[ind]}
            lat1={latitudes[ind]}
            lng1={longitudes[ind]}
            web1={web[ind]}
            titleplace2={title[ind + 1]}
            lat2={latitudes[ind + 1]}
            lng2={longitudes[ind + 1]}
            web2={web[ind + 1]}
            titleplace3={title[ind + 2]}
            lat3={latitudes[ind + 2]}
            lng3={longitudes[ind + 2]}
            web3={web[ind + 2]}
            userLat={ulatitude}
            userLng={ulongitude}
          />
        </div>

        <ul className="testing-ul">
          {title.map((siteTitle, index) => (
            <li className="testing-li" key={index}>
              <p className="testing-title">{siteTitle}</p>
              <p className="testing-desc">{address[index]}</p>
              <p className="testing-source">
                Tel:
              <i>{phone[index]}</i>
              </p>
              <p className="testing-desc">
                Distance :
              <i>{miles[index]}</i>
                {' '}
                miles
            </p>
              <a className="testing-link" href={web[index]}>Go To Website</a>
              <hr id="hr-9" />
            </li>

          ))}

        </ul>
      </div>
      </div>,
      document.getElementById('content'),
    );
  }

  getInfoMap();

  console.log(`this stuff${title[0]}`);

  if (key != '') {
    var v = (
      <div className="testing-content">
        <div className="testing-map">
          <Map
            align="right"
            key1={key}
            titleplace1={title[ind]}
            lat1={latitudes[ind]}
            lng1={longitudes[ind]}
            web1={web[ind]}
            titleplace2={title[ind + 1]}
            lat2={latitudes[ind + 1]}
            lng2={longitudes[ind + 1]}
            web2={web[ind + 1]}
            titleplace3={title[ind + 2]}
            lat3={latitudes[ind + 2]}
            lng3={longitudes[ind + 2]}
            web3={web[ind + 2]}
            userLat={ulatitude}
            userLng={ulongitude}
          />
        </div>

        <ul className="testing-ul">
          {title.map((siteTitle, index) => (
            <li className="testing-li" key={index}>
              <p className="testing-title">{siteTitle}</p>
              <p className="testing-desc">{address[index]}</p>
              <p className="testing-source">
                Tel:
              <i>{phone[index]}</i>
              </p>
              <p className="testing-desc">
                Distance :
              <i>{miles[index]}</i>
                {' '}
                miles
            </p>
              <a className="testing-link" href={web[index]}>Go To Website</a>
              <hr id="hr-9" />
            </li>

          ))}

        </ul>
      </div>
    );
  }

  return (
    <div className="testing-wrapper">
      <h1 className="testing-h1">Nearest COVID-19 Testing Locations</h1>
      <form onSubmit={handleSubmit} className="navbar-form d-flex justify-content-center w-100 navbar-right">
        <input id="newArea" placeholder="Enter Address or City" className="form-control" />
        <button className="btn btn-danger" onClick={handleChange}>Search</button>
      </form>
      <hr id="hr-8" />

      {v}
    </div>

  );
}
