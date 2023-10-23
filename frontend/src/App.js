import logo from "./logo.svg";
import "./App.css";
import HomePage from "./HomePage";
import Profile from "./Profile";
import BeaconInfoWindow from "./BeaconInfoWindow";

function App() {
  return (
    <div className="App bg-gradient-to-tl from-[#10021e] to-[#210210] h-screen">
      <HomePage />
      {/* <Profile username={"amofro"} /> */}
      {/* <BeaconInfoWindow /> */}
    </div>
  );
}

export default App;
