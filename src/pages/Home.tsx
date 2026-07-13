type Props = {
  planner: number[];
  courses: any[];
};

function Home({ planner, courses }: Props) {
  const totalCredits = courses
    .filter((course) => planner.includes(course.id))
    .reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="page">
      <h1>University Course Planner</h1>

      <div className="course-card">
        <h2>Dashboard</h2>

        <p>Total Selected Courses: {planner.length}</p>

        <p>Total Credits: {totalCredits}</p>
      </div>
    </div>
  );
}

export default Home;
