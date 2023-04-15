import { useState } from "react";
import axios from "axios";
import ChallanList from "./ChallanList";

function GenerateChallan() {
  const [date, setDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");
  const [prevFlag, setPrevFlag] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("before submit")
    // Send POST request to API
    axios
      .post("http://localhost:5000/generate-challan", {
        date: date,
        dueDate: dueDate,
        prevFlag:prevFlag
      })
      .then((response) => {
        // Update state with response data
        console.log("response")
        console.log(response)
        setMessage(response.data.message)
      })
      .catch((error) => {
        console.log("response error")
        console.log(error);
    
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{border:'1px solid black',borderRadius:'5px',padding:'5px',margin:'5px'}}>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <p>Include Previous Dues:</p>
        <input type="checkbox" defaultChecked={prevFlag} onChange={(e) => setPrevFlag(e.target.value)} />
        <br />
        <button type="submit">Generate Challan</button>
      </form>
      <h3>{message}</h3>
      <ChallanList />
    </div>
  );
}

export default GenerateChallan;
