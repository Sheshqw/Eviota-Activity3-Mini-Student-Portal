const STUDENT_ID_PATTERN = /^\d{4}-\d{4}$/;
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

// Returns an object with one message per invalid field. An empty object means the form is valid.
export function validate(values, existingIds = []) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Enter the student's full name.";
  }

  const studentId = values.studentId.trim();
  if (!studentId) {
    errors.studentId = "Enter the student ID.";
  } else if (!STUDENT_ID_PATTERN.test(studentId)) {
    errors.studentId = "Use the format ####-#### (e.g. 2024-0123).";
  } else if (existingIds.includes(studentId)) {
    errors.studentId = "This student ID is already registered.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Enter an email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email, like name@example.com.";
  }

  if (!values.course) {
    errors.course = "Choose a course.";
  }

  if (!values.yearLevel) {
    errors.yearLevel = "Choose a year level.";
  }

  return errors;
}
