import React, { useState } from "react";
import "./stores.css";
import DISTRIBUTORS from "../../utils/Data";
import { saveSites } from "../../utils/saveSites";

const storesData = DISTRIBUTORS.map((name, index) => ({ id: index + 1, name }));

const Stores = () => {
  const [checkedStores, setCheckedStores] = useState([]);

  const handleToggle = (storeId) => {
    setCheckedStores((prevCheckedStores) =>
      prevCheckedStores.includes(storeId)
        ? prevCheckedStores.filter((id) => id !== storeId)
        : [...prevCheckedStores, storeId]
    );
  };

  const handleSelectAll = () => {
    setCheckedStores(storesData.map((store) => store.id));
  };

  const handleUnselectAll = () => {
    setCheckedStores([]);
  };

  const handleSave = async () => {
    try {
      const selectedStoreNames = checkedStores.map(
        (storeId) => storesData.find((store) => store.id === storeId).name
      );
      await saveSites(selectedStoreNames);
      console.log("Selected stores saved successfully!");
    } catch (error) {
      console.error("Error saving selected stores:", error.message);
    }
  };

  return (
    <div className="stores">
      <h1>Select the Stores you wish to Monitor</h1>
      <div className="button-group">
        <button className="select-all-button" onClick={handleSelectAll}>
          Select All
        </button>
        <button className="unselect-all-button" onClick={handleUnselectAll}>
          Unselect All
        </button>
      </div>
      <ul className="stores-list">
        {storesData.map((store) => (
          <li key={store.id}>
            <label>
              <input
                type="checkbox"
                checked={checkedStores.includes(store.id)}
                onChange={() => handleToggle(store.id)}
              />
              {store.name}
            </label>
          </li>
        ))}
      </ul>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Stores;
