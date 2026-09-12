//-------import-------
import "../styles/MyPlanner.css";

//-------Props-------
type Props = {
  courses: any[];
  planner: number[];
  removeCourse: (id: number) => void;
};

//-------Component-------
function Planner({ courses, planner, removeCourse }: Props) {
  //-------Selected Courses-------
  const selectedCourses = courses.filter((course) =>
    planner.includes(course.id),
  );

  //-------Total Credits-------
  const totalCredits = selectedCourses.reduce(
    (sum, course) => sum + course.credits,
    0,
  );

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

                <button onClick={() => removeCourse(course.id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Planner;
