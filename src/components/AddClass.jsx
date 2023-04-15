import React, { useState } from "react";
import axios from "axios";

import "./AddClass.css";

function AddClass() {
  const [title, setTitle] = useState("");
  const [tutionFee, setTutionFee] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/add-class", {
        title: title,
        tution_fee: tutionFee,
      })
      .then((response) => {
        setPopupMessage("Class added successfully");
        setShowPopup(true);
        setTitle("");
        setTutionFee("");
      })
      .catch((error) => {
        setPopupMessage("Error: " + error.message);
        setShowPopup(true);
      });
  };

  return (
    <div className="addClassContainer">
      <h1>Add Class</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <label htmlFor="tutionFee">Tution Fee:</label>
        <input
          type="number"
          id="tutionFee"
          value={tutionFee}
          onChange={(event) => setTutionFee(event.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {showPopup && (
        <div className="popup">
          <p>{popupMessage}</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default AddClass;
