//-------import-------

import { usePlanner } from "../context/PlannerContext";

import "../styles/Layout.css";

//-------Component-------

function Home() {
  //-------Global State-------

  const { courses, selectedCourses, totalCredits } = usePlanner();

  //-------UI-------

  return (
    <main className="home-page">
      <section className="home-container">
        <div className="home-box">
          {/*-------Badge-------*/}

          <span className="home-badge">UNIVERSITY COURSE PLANNER</span>

          {/*-------Heading-------*/}

          <h1>Plan Your University Courses</h1>

          <p className="home-description">
            Search available courses, build your semester planner, and keep
            track of your selected credits in one place.
          </p>

          {/*-------Actions-------*/}

          <div className="home-actions"></div>

          {/*-------Statistics-------*/}

          <div className="home-stats">
            <div className="home-stat">
              <strong>{courses.length}</strong>

              <span>Available Courses</span>
            </div>

            <div className="home-stat">
              <strong>{selectedCourses.length}</strong>

              <span>Selected Courses</span>
            </div>

            <div className="home-stat">
              <strong>{totalCredits}</strong>

              <span>Total Credits</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
