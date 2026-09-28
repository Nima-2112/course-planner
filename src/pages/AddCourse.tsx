//-------import-------

import { useState, type FormEvent } from "react";

import { createCourse } from "../api/courseApi";

import type { CreateCourseInput } from "../types";

import ErrorState from "../components/ErrorState";

import "../styles/AddCourse.css";

//-------Component-------

function AddCourse() {
  //-------State-------

  const [code, setCode] = useState("");

  const [title, setTitle] = useState("");

  const [department, setDepartment] = useState("Computer Science");

  const [credits, setCredits] = useState(3);

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  //-------Submit-------

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccess("");
    setError("");

    //-------Normalize Values-------

    const normalizedCode = code.trim().toUpperCase();

    const normalizedTitle = title.trim();

    const normalizedDepartment = department.trim();

    const normalizedDescription = description.trim() || "University course.";

    //-------Validation-------

    if (!normalizedCode || !normalizedTitle) {
      setError("Course code and title are required.");

      return;
    }

    if (!normalizedDepartment) {
      setError("Department is required.");

      return;
    }

    if (!Number.isInteger(credits) || credits < 1 || credits > 6) {
      setError("Credits must be between 1 and 6.");

      return;
    }

    //-------Loading-------

    setLoading(true);

    //-------Create Course-------

    try {
      const newCourse: CreateCourseInput = {
        code: normalizedCode,

        title: normalizedTitle,

        department: normalizedDepartment,

        credits,

        description: normalizedDescription,
      };

      await createCourse(newCourse);

      //-------Reset Form-------

      setCode("");

      setTitle("");

      setDepartment("Computer Science");

      setCredits(3);

      setDescription("");

      //-------Success-------

      setSuccess(
        "Course added successfully. It is now available in the catalog.",
      );
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Unable to add the course.",
      );
    } finally {
      setLoading(false);
    }
  }

  //-------UI-------

  return (
    <section className="add-course-page">
      <div className="add-course-box">
        {/*-------Heading-------*/}

        <div className="add-course-heading">
          <span className="eyebrow">CATALOG MANAGEMENT</span>

          <h1>Add New Course</h1>

          <p>Create a course and publish it directly to the catalog.</p>
        </div>

        {/*-------Error-------*/}

        {error && <ErrorState title="Could not add course" message={error} />}

        {/*-------Success-------*/}

        {success && <div className="success-banner">✓ {success}</div>}

        {/*-------Form-------*/}

        <form onSubmit={handleSubmit}>
          {/*-------Code and Credits-------*/}

          <div className="form-grid">
            <label>
              Course code
              <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="CS401"
                maxLength={12}
                disabled={loading}
                required
              />
            </label>

            <label>
              Credits
              <input
                type="number"
                min={1}
                max={6}
                value={credits}
                onChange={(event) => setCredits(Number(event.target.value))}
                disabled={loading}
                required
              />
            </label>
          </div>

          {/*-------Title-------*/}

          <label>
            Course title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Advanced Web Development"
              disabled={loading}
              required
            />
          </label>

          {/*-------Department-------*/}

          <label>
            Department
            <select
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              disabled={loading}
            >
              <option value="Computer Science">Computer Science</option>

              <option value="Mathematics">Mathematics</option>

              <option value="History">History</option>

              <option value="Physics">Physics</option>

              <option value="Languages">Languages</option>

              <option value="Business">Business</option>
            </select>
          </label>

          {/*-------Description-------*/}

          <label>
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Briefly describe what students will learn..."
              rows={4}
              maxLength={240}
              disabled={loading}
            />
          </label>

          {/*-------Submit Button-------*/}

          <button
            type="submit"
            className="primary-button add-course-submit"
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish course"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddCourse;
