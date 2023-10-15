import "./ViewedHistory.css";

function ViewedHistory({ history }) {
  return (
    <div className="historyNav">
      <h2>Viewed History</h2>
      <div className="image-container">
        {history.map((dog, index) => (
          <div key={index} className="viewed-item">
            <h3>{dog.breeds[0]?.name || "Unknown Breed"}</h3>
            <img
              src={dog.url}
              alt={dog.breeds[0]?.name || "Unknown Breed"}
              className="viewed-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewedHistory;
