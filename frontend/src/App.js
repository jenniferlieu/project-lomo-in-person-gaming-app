import logo from "./logo.svg";
import "./App.css";
import HomePage from "./HomePage.js";
import Profile from "./Profile.js";
import BeaconInfoWindow from "./BeaconInfoWindow.js";
import GameAPITest from "./GameAPITest.js";

function App() {
  
  return (
    <div className="App bg-gradient-to-tl from-[#10021e] to-[#210210] h-screen">
      <HomePage />
      {/* <Profile username={"amofro"} /> */}
      {/* <BeaconInfoWindow /> */}
      {/* <GameAPITest /> */}
    </div>
  );
}

export default App;
