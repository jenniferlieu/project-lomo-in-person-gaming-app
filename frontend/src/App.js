import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer';
import BeaconInfo from './BeaconInfo';

function App() {
  return (
    <div className="App bg-gradient-to-tl from-[#10021e] to-[#210210] h-screen">
      <MapContainer/>
      {/* <BeaconInfo /> */}
    </div>
  );
}

export default App;
