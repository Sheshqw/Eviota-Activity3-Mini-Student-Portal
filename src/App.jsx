import { useState } from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import { INITIAL_STUDENTS } from "./data/students.js";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Students from "./pages/Students.jsx";
import StudentDetail from "./pages/StudentDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  // Lifted state: both Register and Students need the student list.
  const [students, setStudents] = useState(INITIAL_STUDENTS);

  function addStudent(student) {
    setStudents((prev) => [...prev, student]);
  }

  return (
    <>
      <header className="topbar">
        <Link to="/" className="brand">Mini Student Portal · Cubero</Link>
        <nav aria-label="Main">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/students">Students</NavLink>
        </nav>
      </header>

      <main className="page">
        <Routes>
          <Route path="/" element={<Home count={students.length} />} />
          <Route path="/register" element={<Register students={students} onAdd={addStudent} />} />
          <Route path="/students" element={<Students students={students} />} />
          <Route path="/students/:id" element={<StudentDetail students={students} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
