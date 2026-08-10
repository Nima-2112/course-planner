import "../styles/Layout.css";
import { useState } from "react";
import CourseCard from "../components/CourseCard";

function Catalog({ courses, planner, addCourse }: any) {
  const [department, setDepartment] = useState("All");

  const departments = [
    "All",
    ...new Set(courses.map((c: any) => c.department)),
  ];

  const filtered =
    department === "All"
      ? [...courses]
      : courses.filter((course: any) => course.department === department);

  filtered.sort((a: any, b: any) => a.code.localeCompare(b.code));

  return (
    <div className="page">
      <h1 className="title">Course Catalog</h1>

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        {departments.map((dep: any) => (
          <option key={dep} value={dep}>
            {dep}
          </option>
        ))}
      </select>

      <br />
      <br />

      {filtered.length === 0 && <p>No courses found.</p>}

      <div className="grid">
        {filtered.map((course: any) => (
          <CourseCard
            key={course.id}
            course={course}
            isAdded={planner.includes(course.id)}
            addCourse={addCourse}
          />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
