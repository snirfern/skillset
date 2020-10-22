import React from "react";
import "./App.css";
import { StoreProvider } from "./Store/Store";
import Feed from "./Components/Feed/Feed";
import skillset from "./skillset.jpg";
function App() {
  return (
    <StoreProvider>
      <div className="App">
        <div className="skillsset">
          <img
            alt="skillsset"
            style={{ width: 200, height: 50 }}
            src={skillset}
          />
        </div>
        <Feed />
      </div>
    </StoreProvider>
  );
}

export default App;
