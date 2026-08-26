//-------import-------
import { useState } from "react";
import "../styles/Layout.css";
import "../styles/AddCourse.css";

//-------Props-------
type Props = {
  courses: any[];
  addNewCourse: (course: any) => void;
};

//-------Component-------
function AddCourse({ courses, addNewCourse }: Props) {
  //-------State-------
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("Computer Science");
  const [credits, setCredits] = useState(3);

  //-------Handle Submit-------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || !title) {
      alert("Please fill in all fields.");
      return;
    }

    //-------Create New Course-------
    const newCourse = {
      id: Date.now(),
      code,
      title,
      department,
      credits,
      description: "Custom course",
    };
    //-------Add Course-------
    addNewCourse(newCourse);

    //-------Reset Form-------
    setCode("");
    setTitle("");
    setDepartment("Computer Science");
    setCredits(3);

    //-------Success Message-------
    alert("Course added successfully!");
  };

  //-------Return-------
  return (
    <div className="add-course-page">
      {/*-------Add Course Box-------*/}
      <div className="add-course-box">
        {/*-------Title-------*/}
        <h1>Add New Course</h1>
        {/*-------Form-------*/}
        <form onSubmit={handleSubmit}>
          {/*-------Course Code-------*/}
          <div className="form-group">
            <label htmlFor="course-code">Course Code</label>

            <input
              id="course-code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter course code"
            />
          </div>

          {/*-------Course Title-------*/}
          <div className="form-group">
            <label htmlFor="course-title">Course Title</label>

            <input
              id="course-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title"
            />
          </div>

          {/*-------Department-------*/}
          <div className="form-group">
            <label htmlFor="department">Department</label>

            <select
              id="department"
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

          {/*-------Credits-------*/}
          <div className="form-group">
            <label htmlFor="credits">Credits</label>

            <input
              id="credits"
              type="number"
              min={1}
              max={6}
              value={credits}
              onChange={(e) => setCredits(Number(e.target.value))}
            />
          </div>

          {/*-------Submit Button-------*/}
          <button type="submit" className="add-course-button">
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
}

//-------Export-------
export default AddCourse;
