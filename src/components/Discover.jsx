import { useState, useEffect } from "react";
import "./Discover.css";

const API_KEY = import.meta.env.VITE_DOG_API_KEY;

function AttributeButton({ attribute, label, addToBanList }) {
  if (!attribute || attribute === "Unknown") return null;

  return (
    <button
      type="attribute"
      className="attribute-buttons"
      onClick={() => addToBanList(attribute)}
    >
      {label || attribute}
    </button>
  );
}

function Discover({ banList, addToBanList, addToHistory }) {
  const [data, setData] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
      setShouldFetch(false);
    }
  }, [banList, shouldFetch]);

  const isValidDog = (dog) => {
    if (dog.breeds.length === 0) return false;

    const attributes = {
      breedName: dog.breeds[0]?.name || "Unknown Breed",
      origin: dog.breeds[0]?.origin || "Unknown Origin",
      lifeSpan: dog.breeds[0]?.life_span || "Unknown Lifespan",
      weight: dog.breeds[0]?.weight?.imperial || "Unknown Weight",
      breedGroup: dog.breeds[0]?.breed_group || "Unknown Group",
    };

    return Object.values(attributes).every((attr) => !banList.includes(attr));
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.thedogapi.com/v1/images/search?limit=7&api_key=${API_KEY}`
      );
      const results = await response.json();

      const validDogs = results.filter(isValidDog);

      if (validDogs.length > 0) {
        setData(validDogs[0]);
        addToHistory(validDogs[0]); // Add to history
      } else {
        fetchData(); // Recursive call if no valid dogs are found
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDiscoverClick = () => {
    setShouldFetch(true);
  };

  return (
    <div className="discover-container">
      {data && (
        <>
          <h2>{data.breeds[0]?.name || "Unknown Breed"}</h2>
          <div className="buttons">
            <AttributeButton
              attribute={data.breeds[0]?.name}
              addToBanList={addToBanList}
            />
            <AttributeButton
              attribute={data.breeds[0]?.origin}
              addToBanList={addToBanList}
            />
            <AttributeButton
              attribute={data.breeds[0]?.life_span}
              addToBanList={addToBanList}
            />
            <AttributeButton
              attribute={data.breeds[0]?.weight?.imperial}
              label={
                data.breeds[0]?.weight?.imperial
                  ? `${data.breeds[0]?.weight?.imperial} lbs`
                  : null
              }
              addToBanList={addToBanList}
            />
            <AttributeButton
              attribute={data.breeds[0]?.breed_group}
              addToBanList={addToBanList}
            />
          </div>
          <br />
          <br />
          <div className="img-container">
            <img src={data.url} alt="Random Dog" />
          </div>
        </>
      )}
      <br />
      <button
        type="discover"
        className="discover-button"
        onClick={handleDiscoverClick}
      >
        🔀 Discover!
      </button>
    </div>
  );
}

export default Discover;
