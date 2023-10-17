import logo from "./logo.svg";
import "./App.css";
import HomePage from "./HomePage";
import Profile from "./Profile";

function App() {
  return (
    <div className="App bg-gradient-to-tl from-[#10021e] to-[#210210] h-screen">
      {/* <HomePage /> */}
      <Profile username={"Y'all play Ori and the Blind Forest, it is so good"} />
    </div>
  );
}

export default App;
