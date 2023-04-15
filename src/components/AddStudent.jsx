import { useState, useEffect } from "react";
import "./addstudent.css";

function AddStudent() {
  const [classes, setClasses] = useState([]);
  const [student, setStudent] = useState({
    rollNo: "",
    name: "",
    fatherName: "",
    classId: "",
    admissionFee: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/class-list")
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("in handle submit add student");
    fetch("http://localhost:5000/add-student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.error);
          setSuccessMessage("");
        } else {
          setSuccessMessage(data.message);
          setErrorMessage("");
          setStudent({
            rollNo: "",
            name: "",
            fatherName: "",
            classId: "",
            admissionFee: "",
            dob: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="add-student-container">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="add-student-form" onSubmit={handleSubmit}>
        <h1 className="title">Add Student</h1>
        <label htmlFor="rollNo">Roll No:</label>
        <input
          type="text"
          id="rollNo"
          name="rollNo"
          value={student.rollNo}
          onChange={handleInputChange}
        />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={student.name}
          onChange={handleInputChange}
        />
        <label htmlFor="fatherName">Father Name:</label>
        <input
          type="text"
          id="fatherName"
          name="fatherName"
          value={student.fatherName}
          onChange={handleInputChange}
        />

        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={student.dob}
          onChange={handleInputChange}
        />

        <label htmlFor="classId">Class:</label>
        <select
          id="classId"
          name="classId"
          value={student.classId}
          onChange={handleInputChange}
        >
          <option value="">Select Class</option>
          {classes.map((classObj) => (
            <option key={classObj.id} value={classObj.id}>
              {classObj.title}
            </option>
          ))}
        </select>
        <label htmlFor="admissionFee">Admission Fee:</label>
        <input
          type="number"
          id="admissionFee"
          name="admissionFee"
          value={student.admissionFee}
          onChange={handleInputChange}
        />
        <input type="submit" value="Save" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default AddStudent;
