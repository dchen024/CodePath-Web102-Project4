import "./Banlist.css";

function Banlist({ banList, removeFromBanList }) {
  return (
    <div className="sideNav">
      <h2>Ban List</h2>
      <h3>Select an attribute to filter</h3>
      <div className="sideNav-container">
        {banList.map((item, index) => (
          <button
            key={index}
            type="banned item"
            className="banned-buttons"
            onClick={() => removeFromBanList(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Banlist;
