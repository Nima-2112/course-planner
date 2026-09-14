//-------import-------

import { useEffect, useState } from "react";

import type { Course } from "../types";

import "../styles/MyPlanner.css";

//-------Props-------

type Props = {
  planner: number[];
  removeCourse: (id: number) => void;
};

//-------Component-------

function Planner({ planner, removeCourse }: Props) {
  //-------State-------

  const [courses, setCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  //-------Fetch Courses-------

  useEffect(() => {
    let isMounted = true;

    async function fetchCourses() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:3001/courses");

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as Course[];

        if (isMounted) {
          setCourses(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(
            error instanceof Error ? error.message : "Failed to load courses.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCourses();

    //-------Cleanup-------

    return () => {
      isMounted = false;
    };
  }, []);

  //-------Selected Courses-------

  const selectedCourses = courses.filter((course) =>
    planner.includes(course.id),
  );

  //-------Total Credits-------

  const totalCredits = selectedCourses.reduce(
    (sum, course) => sum + course.credits,
    0,
  );

  //-------Loading-------

  if (loading) {
    return (
      <div className="planner-page">
        <div className="planner-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>

            <p>Loading planner...</p>
          </div>
        </div>
      </div>
    );
  }

  //-------Error-------

  if (error) {
    return (
      <div className="planner-page">
        <div className="planner-container">
          <div className="error-banner">
            <h2>Unable to load planner</h2>

            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  //-------Return-------

  return (
    <div className="planner-page">
      <div className="planner-container">
        <h1>My Planner</h1>

        <div className="planner-summary">
          <h2>Total Credits: {totalCredits}</h2>

          <p>Saved courses: {selectedCourses.length}</p>
        </div>

        {selectedCourses.length === 0 ? (
          <div className="empty-planner">
            <h2>No courses selected.</h2>

            <p>Go to the Catalog and add courses to your planner.</p>
          </div>
        ) : (
          <div className="planner-grid">
            {selectedCourses.map((course) => (
              <div key={course.id} className="course-card">
                <h2>{course.title}</h2>

                <p>
                  <b>Code:</b> {course.code}
                </p>

                <p>
                  <b>Department:</b> {course.department}
                </p>

                <p>
                  <b>Credits:</b> {course.credits}
                </p>

                <button type="button" onClick={() => removeCourse(course.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Planner;
