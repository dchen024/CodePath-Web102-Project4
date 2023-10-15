import { useState } from "react";
import "./App.css";
import Banlist from "./components/Banlist.jsx";
import Discover from "./components/Discover.jsx";
import ViewedHistory from "./Components/ViewedHistory";

function App() {
  const [banList, setBanList] = useState([]);
  const [viewedHistory, setViewedHistory] = useState([]);

  const addToBanList = (attribute) => {
    setBanList((prev) => [...prev, attribute]);
  };

  const removeFromBanList = (attribute) => {
    setBanList((prev) => prev.filter((item) => item !== attribute));
  };

  const addToHistory = (dog) => {
    setViewedHistory((prev) => [dog, ...prev]);
  };

  return (
    <>
      <div className="dog-box">
        <h1>Dog API</h1>
        <h3>Click to see a dog!</h3>
        <Discover
          banList={banList}
          addToBanList={addToBanList}
          addToHistory={addToHistory}
        />
      </div>
      <Banlist banList={banList} removeFromBanList={removeFromBanList} />
      <ViewedHistory history={viewedHistory} />
    </>
  );
}

export default App;
