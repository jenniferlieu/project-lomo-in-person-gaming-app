import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer';
import BeaconInfoWindow from './BeaconInfoWindow';

function App() {
  return (
    <div className="App bg-gradient-to-tl from-[#10021e] to-[#210210] h-screen">
      <MapContainer/>
      {/* <BeaconInfoWindow /> */}
    </div>
  );
}

export default App;
