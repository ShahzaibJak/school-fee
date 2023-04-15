import React, { useState, useEffect } from "react";
import axios from "axios";
import "./classlist.css";
import Payment from "./Payment";
import SchoolFeebill from "./SchoolFeeBill";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ChallanList = (props) => {
  const [challans, setChallans] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(new Date().toDateString());
  const [showFeebillModal, setShowFeebillModal] = useState(false);
  const [date, setDate] = useState(props.date || new Date());

  const fetchChallans = async () => {
    console.log("Before call to challan-list : ");
    const response = await axios.post("http://localhost:5000/challan-list", {
      date: date,
    });
    console.log("Response from challan list : ");
    console.log(response);
    setChallans(response.data);
  };

  const handleOpenFeebillModal = (challanId) => {
    setSelectedChallan(challanId);
    setShowFeebillModal(true);
  };

  useEffect(() => {
    fetchChallans();
  }, []);

  const filteredChallans = challans.filter((challan) => {
    //apply date filter
    const date1 = new Date(dateFilter);
    const date2 = new Date(challan.date);
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    const year1 = date1.getYear();
    const year2 = date2.getYear();
    if (dateFilter && month1 != month2 || year1 != year2) {
      return false;
    }
    // apply status filter
    if (statusFilter && challan.status !== statusFilter) {
      return false;
    }

    // apply name filter
    if (
      nameFilter &&
      !challan.name.toLowerCase().includes(nameFilter.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
  const [selectedChallan, setSelectedChallan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // function to handle opening the payment modal
  const handleOpenPaymentModal = (challan) => {
    setSelectedChallan(challan);
    console.log(selectedChallan);
    setShowPaymentModal(true);
  };

  // function to handle closing the payment modal
  const handleClosePaymentModal = () => {
    setSelectedChallan(null);
    setShowPaymentModal(false);
  };

  const generatePdf = () => {
    // code to generate pdf
    const input = document.getElementById("fee-bill"); // the element to be printed
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // convert canvas to image data
      const pdf = new jsPDF("p", "pt", "a3"); // create new pdf document
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width; // calculate height based on width and aspect ratio
      pdf.addImage(imgData, "PNG", 0, 0, width, height); // add image to pdf
      pdf.addImage(imgData, "PNG", 0, height + 1, width, height); // add copy image to pdf
      let name =
        selectedChallan.name + "-" + new Date().toDateString() + ".pdf";
      console.log(name);
      pdf.save(name); // save pdf
    });
  };

  return (
    <div style={{marginBottom:'30px'}}>
      <br />
      <h1>Challan List</h1>
      <br />
      <div className="filter">
        <label htmlFor="month" className="filter-label">
          Month:
        </label>
        <input
          type="date"
          id="month"
          className="filter-input"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        ></input>

        <label htmlFor="status" className="filter-label">
          Status:
        </label>
        <select
          id="status"
          className="filter-input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="submitted">Submitted</option>
        </select>

        <label htmlFor="name" className="filter-label">
          Student Name:
        </label>
        <input
          type="text"
          id="name"
          className="filter-input"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        ></input>
      </div>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Challan No</th>
            <th>Student Roll No</th>
            <th>Student Name</th>
            <th>Challan Date</th>
            <th>Challan Due Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredChallans.map((challan) => (
            <tr key={challan.id}>
              <td>{challan.id}</td>
              <td>{challan.roll_no}</td>
              <td>{challan.name}</td>
              <td>{challan.date}</td>
              <td>{challan.due_date}</td>
              <td>{challan.amount}</td>
              <td>{challan.status}</td>
              <td>
                {challan.status !== "submitted" ? (
                  <button onClick={() => handleOpenPaymentModal(challan)}>
                    Add Payment
                  </button>
                ) : (
                  <button disabled>Add Payment</button>
                )}
                <button
                  style={{ marginLeft: "3px" }}
                  onClick={() => handleOpenFeebillModal(challan)}
                >
                  View Bill
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* payment modal */}
      {selectedChallan && showPaymentModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClosePaymentModal}>
              &times;
            </span>
            <Payment challan={selectedChallan} />
          </div>
        </div>
      )}

      {selectedChallan && showFeebillModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowFeebillModal(false)}>
              &times;
            </span>
            <div
              style={{ paddingTop: "50px", paddingBottom: "50px" }}
              id="fee-bill"
            >
              <SchoolFeebill challanId={selectedChallan} />
            </div>
            <button onClick={generatePdf}>Generate PDF</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallanList;
