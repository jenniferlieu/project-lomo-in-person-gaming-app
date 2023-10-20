import logo from "./logo.svg";
import "./App.css";
import HomePage from "./HomePage";
import BeaconCreation from "./BeaconCreation";

function App() {
  return (
    <div className="App bg-gradient-to-tl from-[#10021e] to-[#210210] h-screen">
      {/* <HomePage /> */}
      <BeaconCreation />
    </div>
  );
}

export default App;
