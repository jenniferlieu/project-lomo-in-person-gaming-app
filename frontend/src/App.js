import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer';
import BeaconInfo from './BeaconInfo';

function App() {
  return (
    <div className="App bg-gradient-to-tl from-[#10021e] to-[#210210] h-screen">
      <MapContainer/>
      <BeaconInfo />
      <BeaconInfo username='amofro' timeframe='noon til night' gameTitle='smashy bros' miscInfo='Ayyyyy fuggedaboutit' gamePic={'images/catWut.png'} startTime={"1:00 PM"} endTime={"4:30 PM"}/>
    </div>
  );
}

export default App;
