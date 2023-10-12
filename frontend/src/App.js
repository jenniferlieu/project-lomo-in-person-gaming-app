import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer';
import BeaconInfoWindow from './BeaconInfoWindow';

function App() {

  const beaconList = [
    {
      circleLat: 40,
      circleLng: -75
    },
    {
      beaconInfo: {
        miscInfo: "fahgettaboudit",
        username: "amofro",
        gamePic: "images/catScream.jpg",
        userPic: "images/catMonster.jpg"
      }
    },
    {
      circleLat: 40.05,
      circleLng: -75.1,
      beaconInfo: {
        miscInfo: "AYYYYYY fahgettaboudit",
        username: "abkrivo",
        gamePic: "images/catWut.png",
        userPic: "images/catScream.jpg"
      }
    }
  ];

  return (
    <div className="App bg-gradient-to-tl from-[#10021e] to-[#210210] h-screen">
      <MapContainer beaconList={beaconList}/>
      {/* <BeaconInfoWindow /> */}
    </div>
  );
}

export default App;
