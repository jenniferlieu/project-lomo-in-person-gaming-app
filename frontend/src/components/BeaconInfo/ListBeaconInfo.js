import React, { useState, useEffect } from 'react';
import GetBeaconInfo from './GetBeaconInfo.js';
import BeaconInfoWindow from '../Beacon/InfoWindow/BeaconInfoWindow.js';

function formatTime(dateString) {
  const date = new Date(dateString);
  let hours = date.getHours() + 5;
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
  return strTime;
}

function openWindow(beacon) {
  console.log('beacon clicked', {...beacon});
  <BeaconInfoWindow {...beacon} />
}

function ListView() {
  const beaconList = GetBeaconInfo();
  console.log(beaconList);

  return (
    <div className='w-screen'>
      <h1 className='text-center text-shrink font-bold text-6xl text-sky-950'>Active Beacons</h1>
      {beaconList.map((beacon) =>
        <div key={beacon.id}  className='box-border w-11/12 m-auto my-3 p-2 rounded-md bg-white text-sky-950 flex' onClick={() => openWindow(beacon)}>
          <div className='w-min-2/3 flex-grow text-left'>
            <p className='font-bold text-lg'>{beacon.game_title}</p>
            <p>{beacon.console}</p>
            <p className='font-bold text-md'>{beacon.place_name}</p>
            <p>{beacon.street_address}</p>
          </div>
          <div className='w-1/6 text-center flex-col mx-1'>
            <svg className='w-10 h-10 md:w-20 md:h-20 stroke-sky-200 fill-none mx-auto stroke-2' viewBox='0 0 24 24'>
              <path d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
            </svg>
            <div className='md:hidden'>
              <p>{formatTime(beacon.start_date_time)}</p>
              <p>-</p>
              <p>{formatTime(beacon.end_date_time)}</p>
            </div>
            <div className='hidden md:block'>
              <p>{formatTime(beacon.start_date_time)} - {formatTime(beacon.end_date_time)}</p>
            </div>
          </div>
          <div className='text-center align-right w-1/6'>
            <svg className='w-10 h-10 md:w-20 md:h-20 stroke-sky-200 fill-sky-200 mx-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <g>
                <path d="M42,22.3c-2.8-1.1-3.2-2.2-3.2-3.3s0.8-2.2,1.8-3c1.7-1.4,2.6-3.5,2.6-5.8c0-4.4-2.9-8.2-8-8.2
		c-4.7,0-7.5,3.2-7.9,7.1c0,0.4,0.2,0.7,0.5,0.9c3.8,2.4,6.1,6.6,6.1,11.7c0,3.8-1.5,7.2-4.2,9.6c-0.2,0.2-0.2,0.6,0,0.8
		c0.7,0.5,2.3,1.2,3.3,1.7c0.3,0.1,0.5,0.2,0.8,0.2h12.1c2.3,0,4.1-1.9,4.1-4v-0.6C50,25.9,46.2,24,42,22.3z"/>
                <path d="M28.6,36.2c-3.4-1.4-3.9-2.6-3.9-3.9c0-1.3,1-2.6,2.1-3.6c2-1.7,3.1-4.1,3.1-6.9c0-5.2-3.4-9.7-9.6-9.7
		c-6.1,0-9.6,4.5-9.6,9.7c0,2.8,1.1,5.2,3.1,6.9c1.1,1,2.1,2.3,2.1,3.6c0,1.3-0.5,2.6-4,3.9c-5,2-9.9,4.3-9.9,8.5V45v1
		c0,2.2,1.8,4,4.1,4h27.7c2.3,0,4.2-1.8,4.2-4v-1v-0.4C38,40.5,33.6,38.2,28.6,36.2z"/>
              </g>
            </svg>
            <p>{beacon.players_wanted} players</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListView;