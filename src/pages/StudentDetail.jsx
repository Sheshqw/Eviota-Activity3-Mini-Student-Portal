import { useParams, useNavigate, Link } from "react-router-dom";
import { yearLabel } from "../data/students.js";

export default function StudentDetail({ students }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <section>
        <h1>Student not found</h1>
        <p className="lead">
          No student has the ID <code>{id}</code>.
        </p>
        <div className="actions">
          <Link to="/students" className="btn btn-primary">Back to students</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="profile">
      <h1>{student.fullName}</h1>
      <dl>
        <dt>Student ID</dt>
        <dd>{student.id}</dd>
        <dt>Email</dt>
        <dd>{student.email}</dd>
        <dt>Course</dt>
        <dd>{student.course}</dd>
        <dt>Year level</dt>
        <dd>{yearLabel(student.yearLevel)}</dd>
      </dl>
      <button className="btn" onClick={() => navigate("/students")}>Back to students</button>
    </section>
  );
}
