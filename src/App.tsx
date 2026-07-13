import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Planner from "./pages/Planner";
import AddCourse from "./pages/AddCourse";

import { courses } from "./data/courses";

function App() {
  const [courseList, setCourseList] = useState(courses);
  const addNewCourse = (newCourse: any) => {
    setCourseList([...courseList, newCourse]);
  };

  const [planner, setPlanner] = useState<number[]>([]);

  const addCourse = (id: number) => {
    if (!planner.includes(id)) {
      setPlanner([...planner, id]);
    }
  };

  const removeCourse = (id: number) => {
    setPlanner(planner.filter((courseId) => courseId !== id));
  };

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home planner={planner} courses={courseList} />}
        />
        <Route
          path="/catalog"
          element={
            <Catalog
              courses={courseList}
              planner={planner}
              addCourse={addCourse}
            />
          }
        />
        <Route
          path="/planner"
          element={
            <Planner
              courses={courseList}
              planner={planner}
              removeCourse={removeCourse}
            />
          }
        />

        <Route
          path="/add-course"
          element={
            <AddCourse courses={courseList} addNewCourse={addNewCourse} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
