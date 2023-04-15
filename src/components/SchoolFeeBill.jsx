import React, { useState, useEffect } from "react";
import "./bill.css";
import axios from "axios";
function SchoolFeeBill(props) {
  const challan = [
    {
      schoolname: "ABC School System",
      schooladdress: "Temp Address Street 31, Plot 12 City XYZ",
      schoolphone: "+92-123-1237123",
      no: 4132,
      date: "3/5/2023",
      studentroll_no: 4231,
      studentname: "Ahmad Ali",
      student_father_name: "Ali Ahmad",
      student_class: "1A",
      fee_info: [
        { title: "Tutuion Fee", value: 5000 },
        { title: "Previous Dues", value: 0 },
        { title: "Admission Fee Fee", value: 10000 },
      ],
      due_date: "28/5/2023",
      total: 15000,
      footer_message: "This is a temp disclaimer message for a fee challan",
    },
  ];
  const [c, setC] = useState(props.challanId);
  const [bill, setBill] = useState(props.challanId);
  const [challans, setChallans] = useState(challan);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(
          "http://localhost:5000/print-challan/",
          { id: c.id }
        );
        setBill(result.data);
        console.log("challan result : ", result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {challans.map((challan) => (
        <div className="bill-container">
          <table className="bill-table">
            <thead>
              <tr className="all-thick-border">
                <th colSpan={6} className="text-center">
                  The Lessons School
                </th>
              </tr>
              <tr>
                <td
                  colSpan={6}
                  rowSpan={1}
                  className="school-address text-center"
                >
                  107 Jhal Silanwali Road, Sargodha
                </td>
              </tr>
              <tr className="bottom-thick-border">
                <td
                  colSpan={6}
                  className="school-phone text-center bottom-thick-border"
                >
                  Ph: 0344-4896806
                </td>
              </tr>
            </thead>
            <tbody className="bill-body">
              <tr className="challan-info">
                <td colSpan={2} className="b-header">
                  <b>Challan No.</b>
                </td>
                <td colSpan={1} className="b-val">
                  {bill.id}
                </td>
                <td colSpan={2} className="b-header">
                  <b className="date">Date</b>
                </td>
                <td colSpan={1} className="b-val">
                  {bill.challan_date}
                </td>
              </tr>

              <tr className="student-info">
                <td colSpan={2} className="b-header">
                  <b>Student Name</b>
                </td>
                <td colSpan={4} className="b-val">
                  {bill.student_name}
                </td>
              </tr>

              <tr className="student-info">
                <td colSpan={2} className="b-header">
                  <b>Registration No.</b>
                </td>
                <td colSpan={4} className="b-val">
                  {bill.student_roll_no}
                </td>
              </tr>

              <tr className="student-info">
                <td colSpan={2} className="b-header">
                  <b>Father Name</b>
                </td>
                <td colSpan={4} className="b-val">
                  {bill.student_fathername}
                </td>
              </tr>

              <tr className="student-info all-thick-border">
                <td colSpan={2} className="b-header all-thick-border">
                  <b>Class</b>
                </td>
                <td colSpan={4} className="b-val">
                  {bill.class_title}
                </td>
              </tr>

              <tr className="fee-info-header all-thick-border">
                <th className="text-left" colSpan={4}>
                  Title
                </th>
                <th colSpan={2}>Amount (Rs.)</th>
              </tr>

              <tr>
                <td className="text-left" colSpan={4}>
                  Tution Fee
                </td>
                <td className="text-right" colSpan={2}>
                  {bill.class_fee}
                </td>
              </tr>

              {(() => {
                const enrollmentMonth = new Date(
                  bill.student_enrollment_date
                ).getMonth();
                const challanMonth = new Date(bill.challan_date).getMonth();

                const rows = [];

                // Check if the admission fee should be added
                if (enrollmentMonth === challanMonth) {
                  rows.push(
                    <tr>
                      <td className="text-left" colSpan={4}>
                        Admission Fee
                      </td>
                      <td className="text-right" colSpan={2}>
                        {bill.student_admission_fee}
                      </td>
                    </tr>
                  );
                }

                // Check if previous dues should be added
                else if (bill.challan_total > bill.class_fee) {
                  rows.push(
                    <tr>
                      <td className="text-left" colSpan={4}>
                        Previous Dues
                      </td>
                      <td className="text-right" colSpan={2}>
                        {bill.challan_total - bill.class_fee}
                      </td>
                    </tr>
                  );
                }

                return rows;
              })()}

              <tr >
                <td style={{paddingTop:'10px'}} className="text-left" colSpan={4}>
                  <b>Total</b> (Payable till {challan.due_date})
                </td>
                <td style={{paddingTop:'10px'}} className="text-right" colSpan={2}>
                  {bill.challan_total}
                </td>
              </tr>
              <tr>
                <td className="text-left" colSpan={4}>
                  <b>Total</b> (Payable after {bill.challan_due_date})
                </td>
                <td className="text-right" colSpan={2}>
                  {bill.challan_due_date + 100}
                </td>
              </tr>

              <tr>
                <td colSpan={6} rowSpan={3}>
                  <p className="footer">{"temp Footer Message"}</p>
                </td>
              </tr>
              <tr>
                <td colSpan={6} rowSpan={3}>
                  {" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default SchoolFeeBill;
