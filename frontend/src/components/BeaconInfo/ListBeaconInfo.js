import React, { useState, useEffect } from 'react';
import GetBeaconInfo from './GetBeaconInfo.js';

function ListView() {
    const beaconList = GetBeaconInfo();

    return (
      <div>
        {/* Use beaconList data in your component */}
        {beaconList.map(beacon => (
          <div key={beacon.id}>
            {/* Render beacon information */}
            <p>{beacon.name}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default ListView;