import React, { useState, useEffect } from 'react';
import GetBeaconInfo from './GetBeaconInfo.js';

function ListView() {
    const beaconList = GetBeaconInfo();
    console.log(beaconList);

    return (
      <div>
        <h1 className='text-center text-xl'>Active Beacons</h1>
        {beaconList.map((beacon) => 
            <div key={beacon.id} className='w-full m-2 m-auto p-2'>
                <h3>{beacon.title}</h3>
                <p>{beacon.description}</p>
                <div className='flex'>
                    <p>Console: {beacon.console}</p>
                </div>
            </div>
        )}
      </div>
    );
  }
  
  export default ListView;