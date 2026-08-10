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
    <div>
      <h1>My Planner</h1>

      <h2>Total Credits: {totalCredits}</h2>

      {selectedCourses.length === 0 ? (
        <p>No courses selected.</p>
      ) : (
        selectedCourses.map((course) => (
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
        ))
      )}
    </div>
  );
}

export default Planner;
