//-------import-------

import { Link } from "react-router-dom";

import "../styles/Layout.css";

//-------Props-------

type Props = {
  planner: number[];
};

//-------Component-------

function Home({ planner }: Props) {
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
          <h2>Selected Courses</h2>

          <p>{planner.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
