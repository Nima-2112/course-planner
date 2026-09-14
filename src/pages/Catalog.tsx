//-------import-------

import { useEffect, useState } from "react";

import CourseCard from "../components/CourseCard";

import type { Course } from "../types";

import "../styles/Catalog.css";

//-------Props-------

type Props = {
  planner: number[];
  addCourse: (id: number) => void;
};

//-------Component-------

function Catalog({ planner, addCourse }: Props) {
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

  //-------Loading UI-------

  if (loading) {
    return (
      <div className="catalog-page">
        <div className="catalog-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>

            <p>Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  //-------Error UI-------

  if (error) {
    return (
      <div className="catalog-page">
        <div className="catalog-container">
          <div className="error-banner">
            <h2>Unable to load courses</h2>

            <p>{error}</p>

            <p>Please make sure JSON Server is running.</p>
          </div>
        </div>
      </div>
    );
  }

  //-------Return-------

  return (
    <div className="catalog-page">
      <div className="catalog-container">
        <h1>Course Catalog</h1>

        <p className="catalog-description">
          Browse available university courses and add them to your planner.
        </p>

        {courses.length === 0 ? (
          <div className="empty-catalog">
            <h2>No courses available</h2>

            <p>There are currently no courses in the catalog.</p>
          </div>
        ) : (
          <div className="catalog-grid">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isAdded={planner.includes(course.id)}
                addCourse={addCourse}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;
