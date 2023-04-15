import React, { useState, useEffect } from "react";
import axios from "axios";
import "./classlist.css";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editClass, setEditClass] = useState({ id: "", title: "", fee: "" });
  const [deleteClass, setDeleteClass] = useState("");

  const fetchClasses = async () => {
    const response = await axios.get("http://localhost:5000/class-list");
    setClasses(response.data);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleEditClick = (id, title, fee) => {
    console.log("in  handle edit click : ")
    setEditClass({ id, title, fee });
    console.log("Edit Class : "+editClass)
    setShowEditModal(true);
    console.log("show Edit Model : "+showEditModal)
  };

  const handleDeleteClick = (id) => {
    console.log("in handle delete click")
    setDeleteClass(id);
    console.log("delete class"+deleteClass)
    setShowDeleteModal(true);
    console.log("ShowDeleteModal : "+showDeleteModal)
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/edit-class", editClass);
      fetchClasses();
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/delete-class", {
        id: deleteClass,
      });
      fetchClasses();
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <br></br>
      <h1>Class List</h1>
      <br></br>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem.id}>
              <td>{classItem.id}</td>
              <td>{classItem.title}</td>
              <td>{classItem.fee}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleEditClick(
                      classItem.id,
                      classItem.title,
                      classItem.fee
                    )
                  }
                >
                  Edit
                </button>     
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(classItem.id)}
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
              &times;
            </span>
            <h2 className="popup-header">Edit Class</h2>
            <form className="popup-form" onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={editClass.title}
                  onChange={(e) =>
                    setEditClass({
                      ...editClass,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="fee">Fee</label>
                <input
                  type="number"
                  id="fee"
                  value={editClass.fee}
                  onChange={(e) =>
                    setEditClass({
                      ...editClass,
                      fee: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <input type="submit" value="Save" />
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
            <h2 className="popup-header">Delete Class</h2>
            <p>Are you sure you want to delete this class?</p>
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

export default ClassList;
