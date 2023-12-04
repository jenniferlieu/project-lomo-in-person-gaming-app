import React, { useState, useEffect } from 'react';
import GetBeaconInfo from './GetBeaconInfo.js';

function ListView() {
  const beaconList = GetBeaconInfo();
  console.log(beaconList);

  return (
    <div className='w-screen'>
      <h1 className='text-center text-xl'>Active Beacons</h1>
      {beaconList.map((beacon) =>
        <div key={beacon.id} className='box-border w-11/12 m-auto my-3 p-2 border-2 rounded-md bg-white text-sky-950'>
          <div>
            <p>{beacon.game_title}</p>
            <p>{beacon.console}</p>
            <p>{beacon.address_name}</p>
            <p>{beacon.address_street}</p>
          </div>
          <div>
            <svg className='w-6 h-6 stroke-sky-950 fill-none' xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p>{beacon.startTime}</p>
            <p>-</p>
            <p>{beacon.endTime}</p>
          </div>
          <div>
            <img src="../../../public/icons/people.png" alt="people"></img>
            <p>{beacon.playerInfo.length}/{beacon.players_wanted}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListView;