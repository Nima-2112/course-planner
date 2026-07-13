import "../styles/Card.css";

type Props = {
  course: any;

  isAdded: boolean;

  addCourse: (id: number) => void;
};

function CourseCard({ course, isAdded, addCourse }: Props) {
  return (
    <div className="course-card">
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

      <p>{course.description}</p>

      <button disabled={isAdded} onClick={() => addCourse(course.id)}>
        {isAdded ? "Added" : "Add to Planner"}
      </button>
    </div>
  );
}

export default CourseCard;
