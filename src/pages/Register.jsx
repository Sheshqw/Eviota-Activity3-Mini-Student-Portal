import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COURSES, YEAR_LEVELS, yearLabel } from "../data/students.js";
import { validate } from "../utils/validate.js";

const EMPTY_FORM = { fullName: "", studentId: "", email: "", course: "", yearLevel: "" };

export default function Register({ students, onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form, students.map((s) => s.id));
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onAdd({
      id: form.studentId.trim(),
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      course: form.course,
      yearLevel: form.yearLevel,
    });
    navigate("/students");
  }

  return (
    <section>
      <h1>Register a student</h1>
      <p className="lead">All fields are required.</p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            className={errors.fullName ? "invalid" : ""}
            aria-invalid={Boolean(errors.fullName)}
          />
          {errors.fullName && <small className="error">{errors.fullName}</small>}
        </div>

        <div className="field">
          <label htmlFor="studentId">Student ID</label>
          <input
            id="studentId"
            name="studentId"
            type="text"
            placeholder="2024-0123"
            value={form.studentId}
            onChange={handleChange}
            className={errors.studentId ? "invalid" : ""}
            aria-invalid={Boolean(errors.studentId)}
          />
          <p className="hint">Format: four digits, a dash, four digits.</p>
          {errors.studentId && <small className="error">{errors.studentId}</small>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "invalid" : ""}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="field">
          <label htmlFor="course">Course</label>
          <select
            id="course"
            name="course"
            value={form.course}
            onChange={handleChange}
            className={errors.course ? "invalid" : ""}
            aria-invalid={Boolean(errors.course)}
          >
            <option value="">Choose a course</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.course && <small className="error">{errors.course}</small>}
        </div>

        <div className="field">
          <fieldset>
            <legend>Year level</legend>
            <div className="radio-group">
              {YEAR_LEVELS.map((y) => (
                <label key={y}>
                  <input
                    type="radio"
                    name="yearLevel"
                    value={y}
                    checked={form.yearLevel === y}
                    onChange={handleChange}
                  />
                  {yearLabel(y)}
                </label>
              ))}
            </div>
          </fieldset>
          {errors.yearLevel && <small className="error">{errors.yearLevel}</small>}
        </div>

        <button type="submit" className="btn btn-primary">Register student</button>
      </form>
    </section>
  );
}
