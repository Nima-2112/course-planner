//-------import-------

import { useState } from "react";

import CourseCard from "../components/CourseCard";

import { usePlanner } from "../context/PlannerContext";

import useCourseSearch from "../hooks/useCourseSearch";

import "../styles/Catalog.css";

//-------Component-------

function Catalog() {
  //-------Global State-------

  const {
    courses,
    loading,
    error,
    planner,
    addCourse,
    isCourseInPlanner,
    retryFetchCourses,
  } = usePlanner();

  //-------Search State-------

  const [searchTerm, setSearchTerm] = useState("");

  const [department, setDepartment] = useState("All");

  //-------Search Hook-------

  const { filteredCourses, departments } = useCourseSearch(
    courses,
    searchTerm,
    department,
  );

  //-------Loading-------

  if (loading) {
    return (
      <div className="catalog-page">
        <div className="catalog-container">
          <div className="loading-container" role="status" aria-live="polite">
            <div className="loading-spinner" aria-hidden="true" />

            <p>Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  //-------Error-------

  if (error) {
    return (
      <div className="catalog-page">
        <div className="catalog-container">
          <div className="error-banner" role="alert">
            <h2>Unable to load courses</h2>

            <p>{error}</p>

            <p>Please make sure JSON Server is running.</p>

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
    <div className="catalog-page">
      <div className="catalog-container">
        <div className="catalog-header">
          <h1>Course Catalog</h1>

          <p className="catalog-description">
            Browse available university courses and add them to your planner.
          </p>
        </div>

        {/*-------Search Controls-------*/}

        <div className="catalog-filters">
          <div className="search-field">
            <label htmlFor="course-search">Search courses</label>

            <input
              id="course-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title or course code..."
            />
          </div>

          <div className="department-field">
            <label htmlFor="department-filter">Department</label>

            <select
              id="department-filter"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              <option value="All">All Departments</option>

              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/*-------Results Summary-------*/}

        <div className="catalog-result-summary">
          <span>
            Showing {filteredCourses.length} of {courses.length} courses
          </span>

          <span>Planner: {planner.length}</span>
        </div>

        {/*-------Empty-------*/}

        {filteredCourses.length === 0 ? (
          <div className="empty-catalog">
            <h2>No courses found</h2>

            <p>Try changing the search term or department filter.</p>
          </div>
        ) : (
          <div className="catalog-grid">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isAdded={isCourseInPlanner(course.id)}
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
