//-------import-------
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Planner from "./pages/Planner";
import AddCourse from "./pages/AddCourse";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { courses } from "./data/courses";

import { useAuth } from "./context/AuthContext";

//-------Constants-------
const PLANNER_STORAGE_KEY = "coursePlannerSelectedCourses";

//-------App-------
function App() {
  //-------Authentication-------
  const { user, isLoggedIn } = useAuth();

  //-------Course State-------
  const [courseList, setCourseList] = useState(courses);

  //-------Planner State-------
  const [planner, setPlanner] = useState<number[]>([]);

  //-------Load Planner From Local Storage-------
  useEffect(() => {
    try {
      const savedPlanner = localStorage.getItem(PLANNER_STORAGE_KEY);

      if (!savedPlanner) {
        return;
      }

      const parsedPlanner = JSON.parse(savedPlanner);

      if (Array.isArray(parsedPlanner)) {
        setPlanner(
          parsedPlanner.map(Number).filter((id) => Number.isFinite(id)),
        );
      }
    } catch (error) {
      console.error("Could not load planner from localStorage:", error);
    }
  }, []);

  //-------Save Planner To Local Storage-------
  useEffect(() => {
    try {
      localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(planner));
    } catch (error) {
      console.error("Could not save planner to localStorage:", error);
    }
  }, [planner]);

  //-------Add New Course-------
  function addNewCourse(newCourse: any) {
    setCourseList((previousCourses) => [...previousCourses, newCourse]);
  }

  //-------Add Course-------
  function addCourse(id: number) {
    setPlanner((previousPlanner) => {
      if (previousPlanner.includes(id)) {
        return previousPlanner;
      }

      return [...previousPlanner, id];
    });
  }

  //-------Remove Course-------
  function removeCourse(id: number) {
    setPlanner((previousPlanner) =>
      previousPlanner.filter((courseId) => courseId !== id),
    );
  }

  //-------Clear Planner On Logout-------
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    console.log(`Planner loaded for user: ${user?.username}`);
  }, [isLoggedIn, user]);

  //-------Return-------
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/*-------Home-------*/}
        <Route
          path="/"
          element={<Home planner={planner} courses={courseList} />}
        />

        {/*-------Catalog-------*/}
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

        {/*-------Protected Planner-------*/}
        <Route
          path="/planner"
          element={
            <ProtectedRoute>
              <Planner
                courses={courseList}
                planner={planner}
                removeCourse={removeCourse}
              />
            </ProtectedRoute>
          }
        />

        {/*-------Add Course-------*/}
        <Route
          path="/add-course"
          element={
            <AddCourse courses={courseList} addNewCourse={addNewCourse} />
          }
        />

        {/*-------Login-------*/}
        <Route path="/login" element={<Login />} />

        {/*-------Register-------*/}
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
