//-------import-------

import { Link } from "react-router-dom";

import { usePlanner } from "../context/PlannerContext";

import "../styles/MyPlanner.css";

//-------Component-------

function Planner() {
  //-------Global State-------

  const {
    selectedCourses,
    totalCredits,
    removeCourse,
    loading,
    error,
    retryFetchCourses,
  } = usePlanner();

  //-------Loading-------

  if (loading) {
    return (
      <div className="planner-page">
        <div className="planner-container">
          <div className="loading-container">
            <div className="loading-spinner" aria-hidden="true" />

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
          <div className="error-banner" role="alert">
            <h2>Unable to load planner</h2>

            <p>{error}</p>

            <button
              type="button"
              onClick={() => {
                void retryFetchCourses();
              }}
            >
              Try Again
            </button>
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

            <Link to="/catalog" className="planner-catalog-link">
              Browse Course Catalog
            </Link>
          </div>
        ) : (
          <div className="planner-grid">
            {selectedCourses.map((course) => (
              <article key={course.id} className="course-card">
                <h2>{course.title}</h2>

                <p>
                  <strong>Code:</strong> {course.code}
                </p>

                <p>
                  <strong>Department:</strong> {course.department}
                </p>

                <p>
                  <strong>Credits:</strong> {course.credits}
                </p>

                <button type="button" onClick={() => removeCourse(course.id)}>
                  Remove
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Planner;
