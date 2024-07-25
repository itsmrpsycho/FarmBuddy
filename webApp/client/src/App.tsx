import Form from "./components/DiseasePrediction";
import "./App.css";
// import CLOUDS from "vanta/src/vanta.clouds.js";
import { useEffect } from "react";

// TAILBLOCKS
// MATERIAL UI
function App() {
  return (
    <>
      <div className="heading">Disease Classification</div>
      <div className="app-container" id="suyash">
        <div className="form-container" key="form">
          <Form />
        </div>
      </div>
    </>
  );
}

export default App;
