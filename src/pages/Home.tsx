//-------import-------

import { Link } from "react-router-dom";

import { usePlanner } from "../context/PlannerContext";

import "../styles/Layout.css";

//-------Component-------

function Home() {
  //-------Global State-------

  const { planner, totalCredits } = usePlanner();

  //-------Return-------

  return (
    <div className="home-page">
      <div className="home-container">
        <h1>University Course Planner</h1>

        <p>Plan your university courses and keep track of your credits.</p>

        <div className="home-actions">
          <Link to="/catalog" className="home-button">
            Browse Courses
          </Link>

          <Link to="/planner" className="home-button">
            My Planner
          </Link>
        </div>
        <div className="home-summary">
          <div>
            <span>Selected Courses</span>

            <strong>{planner.length}</strong>
          </div>

          <div>
            <span>Total Credits</span>

            <strong>{totalCredits}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
