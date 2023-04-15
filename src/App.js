import React, { useState, useEffect } from "react";
import { auth } from "./services/auth-service";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import AddClass from "./components/AddClass";
import ClassList from "./components/ClassList";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import GenerateChallan from "./components/GenerateChallan";
import Payment from "./components/Payment";
import Nav from "./components/Navbar";
import SchoolFeeBill from "./components/SchoolFeeBill.jsx";
import ChallanList from "./components/ChallanList.jsx";

function ProtectedRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.checkAuth().then((authenticated) => {
      console.log("setting is logged in to : ", authenticated);
      setIsLoggedIn(authenticated);
    });
  }, []);

  if (isLoggedIn) {
    return (
      <>
        <Nav />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/add-class" element={<AddClass />} />
          <Route path="/class-list" element={<ClassList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/student-list" element={<StudentList />} />
          <Route path="/generate-challan" element={<GenerateChallan />} />
          <Route path="/print-challan" element={<SchoolFeeBill />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/challan-list" element={<ChallanList />} />

          <Route path="/" element={<Login onLogin={setIsLoggedIn} />} />
        </Routes>
      </>
    );
  } else {
    return <Login onLogin={setIsLoggedIn} />;
  }
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </Router>
  );
}
