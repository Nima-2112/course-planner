import "../styles/Layout.css";
import { useState } from "react";

type Props = {
  courses: any[];
  addNewCourse: (course: any) => void;
};

function AddCourse({ courses, addNewCourse }: Props) {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("Computer Science");
  const [credits, setCredits] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || !title) {
      alert("Please fill in all fields.");
      return;
    }

    const newCourse = {
      id: Date.now(),
      code,
      title,
      department,
      credits,
      description: "Custom course",
    };

    addNewCourse(newCourse);

    setCode("");
    setTitle("");
    setDepartment("Computer Science");
    setCredits(3);

    alert("Course added successfully!");
  };

  return (
    <div>
      <h1>Add New Course</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Code</label>
          <br />
          <input value={code} onChange={(e) => setCode(e.target.value)} />
        </div>

        <br />

        <div>
          <label>Course Title</label>
          <br />
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <br />

        <div>
          <label>Department</label>
          <br />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option>Computer Science</option>
            <option>Mathematics</option>
            <option>History</option>
            <option>Physics</option>
            <option>Languages</option>
          </select>
        </div>

        <br />

        <div>
          <label>Credits</label>
          <br />
          <input
            type="number"
            min={1}
            max={6}
            value={credits}
            onChange={(e) => setCredits(Number(e.target.value))}
          />
        </div>

        <br />

        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;
