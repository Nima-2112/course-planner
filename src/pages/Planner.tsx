//-------import-------
import { useEffect, useState } from "react";
import "../styles/Layout.css";
import "../styles/Card.css";
import "../styles/MyPlanner.css";
import { useAuth } from "../context/AuthContext";

//-------Types-------
type Course = {
  id: number;
  code: string;
  title: string;
  department: string;
  credits: number;
  description: string;
};

//-------Props-------
type Props = {
  courses: Course[];
  planner: number[];
  setPlanner: React.Dispatch<React.SetStateAction<number[]>>;
  removeCourse: (id: number) => void;
};

//-------Component-------
function Planner({ courses, planner, setPlanner, removeCourse }: Props) {
  //-------Auth-------
  const { token } = useAuth();

  //-------State-------
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  //-------Load Saved Planner-------
  useEffect(() => {
    const loadPlanner = async () => {
      if (!token) {
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/planner", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (Array.isArray(data.planner)) {
          setPlanner(data.planner);
        }
      } catch (error) {
        console.error("Failed to load planner:", error);
      }
    };

    loadPlanner();
  }, [token, setPlanner]);

  //-------Selected Courses-------
  const selectedCourses = courses.filter((course) =>
    planner.includes(course.id),
  );

  //-------Total Credits-------
  const totalCredits = selectedCourses.reduce(
    (sum, course) => sum + course.credits,
    0,
  );

  //-------Save Planner-------
  const savePlanner = async () => {
    if (!token) {
      return;
    }

    try {
      setIsSaving(true);
      setMessage("");

      const response = await fetch("http://localhost:5000/api/planner", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planner,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save planner.");
      }

      setMessage("Planner saved successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to save planner.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  //-------Remove Course And Save-------
  const handleRemoveCourse = async (id: number) => {
    const newPlanner = planner.filter((courseId) => courseId !== id);

    setPlanner(newPlanner);

    if (!token) {
      return;
    }

    try {
      await fetch("http://localhost:5000/api/planner", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planner: newPlanner,
        }),
      });
    } catch (error) {
      console.error("Failed to save planner:", error);
    }
  };

  //-------Return-------
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
        <>
          {/*-------Save Button-------*/}
          <div className="planner-actions">
            <button
              className="save-planner-button"
              onClick={savePlanner}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Planner"}
            </button>

            {message && <p className="planner-message">{message}</p>}
          </div>

          {/*-------Courses-------*/}
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

                <button onClick={() => handleRemoveCourse(course.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

//-------Export-------
export default Planner;
