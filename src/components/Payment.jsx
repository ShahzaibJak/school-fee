import { useState } from "react";
import axios from "axios";
import './Payment.css'

const Payment = (props) => {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handlePaymentAmountChange = (event) => {
    setPaymentAmount(event.target.value);
  };

  const handlePaymentDateChange = (event) => {
    setPaymentDate(event.target.value);
  };

  const handleSave = () => {
    axios
      .post("http://localhost:5000/pay-challan", {
        id: props.challan.id,
        paymentAmount: paymentAmount,
        paymentDate: paymentDate,
        remarks: remarks
      })
      .then((response) => {
        setResponseMessage(response.data.message);
      })
      .catch((error) => {
        setResponseMessage(error.message);
        console.log(error);
      });
  };
  console.log(props.challan)
  return (
    <div>
        <h3>Add Payment</h3>
      <label>Challan ID</label>
      <input type="text" value={props.challan.id} disabled />
      <br />
      <label>Roll No</label>
      <input type="text" value={props.challan.roll_no} disabled />
      <br />
      <label>Name</label>
      <input type="text" value={props.challan.name} disabled />
      <br />
      <label>Total</label>
      <input type="text" value={props.challan.amount} disabled />
      <br />
      <label>Payment Amount</label>
      <input
        type="number"
        value={paymentAmount}
        onChange={handlePaymentAmountChange}
      />
      <br />
      <label>Payment Date</label>
      <input
        type="date"
        value={paymentDate}
        onChange={handlePaymentDateChange}
      />
      <br />
      <label>Remarks</label>
      <textarea
        value={remarks}
        onChange={setRemarks}
      />
      <br />
      <button onClick={handleSave}>Save</button>
      <br />
      {responseMessage && <label>{responseMessage}</label>}
    </div>
  );
};

export default Payment;
