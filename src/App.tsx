//-------import-------
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Planner from "./pages/Planner";
import AddCourse from "./pages/AddCourse";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthProvider } from "./context/AuthContext";
import { courses } from "./data/courses";

//-------Component-------
function App() {
  //-------Course List-------
  const [courseList, setCourseList] = useState(courses);

  //-------Add New Course-------
  const addNewCourse = (newCourse: any) => {
    setCourseList((currentCourses) => [...currentCourses, newCourse]);
  };

  //-------Planner-------
  const [planner, setPlanner] = useState<number[]>([]);

  //-------Add Course-------
  const addCourse = (id: number) => {
    setPlanner((currentPlanner) => {
      if (currentPlanner.includes(id)) {
        return currentPlanner;
      }

      return [...currentPlanner, id];
    });
  };

  //-------Remove Course-------
  const removeCourse = (id: number) => {
    setPlanner((currentPlanner) =>
      currentPlanner.filter((courseId) => courseId !== id),
    );
  };

  //-------Return-------
  return (
    <AuthProvider>
      <BrowserRouter>
        {/*-------Navbar-------*/}
        <Navbar />

        {/*-------Routes-------*/}
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
                  setPlanner={setPlanner}
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
    </AuthProvider>
  );
}

//-------Export-------
export default App;
