import React, { useState, useEffect } from "react";
import axios from "axios";
import "./classlist.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editStudent, setEditStudent] = useState({});
  const [deleteStudent, setDeleteStudent] = useState("");
  const [filterValue, setFilterValue] = useState("active"); // Add a state variable for filter value

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:5000/student-list");
    setStudents(response.data);
    console.log(students);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEditClick = (student) => {
    setEditStudent(student);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteStudent(id);
    setShowDeleteModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Edit Submit");
      await axios.post("http://localhost:5000/edit-student", editStudent);
      fetchStudents();
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    console.log("In delete submit"+deleteStudent)
    try {
      await axios.post("http://localhost:5000/delete-student", {
        id: deleteStudent,
      });
      fetchStudents();
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  }; // Add a function to handle the filter value change

  const filteredStudents = students.filter(
    (student) => student.status === filterValue // Filter the students array based on the filter value
  );

  return (
    <div>
      <br />
      <h1>Student List</h1>
      <br />
      <div className="filter">
        <label htmlFor="statusFilter">Filter by status:</label>
        <select id="statusFilter" onChange={handleFilterChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>RollNo</th>
            <th>Name</th>
            <th>Father Name</th>
            <th>DOB</th>
            <th>Class</th>
            <th>Enrollment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.roll_no}</td>
              <td>{student.name}</td>
              <td>{student.fathername}</td>
              <td>{student.dob}</td>
              <td>{student.class}</td>
              <td>{student.enrollment_date.split(" ")[0]}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditClick(student)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditModal(false)}>
              ×
            </span>
            <h2 className="popup-header">Edit Student</h2>
            <form className="popup-form" onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={editStudent.name}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="fatherName">Father's Name</label>
                <input
                  type="text"
                  id="fathername"
                  value={editStudent.fathername}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      fathername: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  value={editStudent.dob}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      dob: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="roll_no">Roll No.</label>
                <input
                  type="text"
                  id="rollNo"
                  value={editStudent.roll_no}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      roll_no: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <input type="submit" value="Save" onClick={handleEditSubmit} />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowDeleteModal(false)}>
              &times;
            </span>
            <h2 className="popup-header">Delete Student</h2>
            <p>Are you sure you want to delete this student?</p>
            <form className="popup-form" onSubmit={handleDeleteSubmit}>
              <div className="form-group">
                <input type="submit" value="Yes" />
                <button
                  className="btn btn-primary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  No
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
