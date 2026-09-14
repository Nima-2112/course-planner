//-------import-------

import type { Course } from "../types";

import "../styles/Card.css";

//-------Props-------

type Props = {
  course: Course;
  isAdded: boolean;
  addCourse: (id: number) => void;
};

//-------Component-------

function CourseCard({ course, isAdded, addCourse }: Props) {
  //-------Return-------

  return (
    <div className="course-card">
      <div className="course-card-content">
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
      </div>

      <button
        type="button"
        onClick={() => addCourse(course.id)}
        disabled={isAdded}
      >
        {isAdded ? "Added" : "Add Course"}
      </button>
    </div>
  );
}

export default CourseCard;
