import "../styles/Layout.css";
import "../styles/Card.css";
import "../styles/MyPlanner.css";
type Props = {
  courses: any[];
  planner: number[];
  removeCourse: (id: number) => void;
};

function Planner({ courses, planner, removeCourse }: Props) {
  const selectedCourses = courses.filter((course) =>
    planner.includes(course.id),
  );

  const totalCredits = selectedCourses.reduce(
    (sum, course) => sum + course.credits,
    0,
  );

  return (
    <div className="planner-page">
      <h1>My Planner</h1>

      <h2 className="total-credits">Total Credits: {totalCredits}</h2>

      {selectedCourses.length === 0 ? (
        <div className="empty-planner">
          <h2>Total Credits: 0</h2>
          <p>No courses selected.</p>
        </div>
      ) : (
        <div className="planner-grid">
          {selectedCourses.map((course) => (
            <div key={course.id} className="course-card">
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

              <button onClick={() => removeCourse(course.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Planner;
