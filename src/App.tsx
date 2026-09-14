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

import { useAuth } from "./context/AuthContext";

//-------Constants-------

const PLANNER_STORAGE_KEY = "coursePlannerSelectedCourses";

//-------App-------

function App() {
  //-------Authentication-------

  const { user, isLoggedIn } = useAuth();

  //-------Planner State-------

  const [planner, setPlanner] = useState<number[]>([]);

  //-------Load Planner-------

  useEffect(() => {
    try {
      const savedPlanner = localStorage.getItem(PLANNER_STORAGE_KEY);

      if (!savedPlanner) {
        return;
      }

      const parsedPlanner = JSON.parse(savedPlanner);

      if (Array.isArray(parsedPlanner)) {
        const validPlanner = parsedPlanner
          .map(Number)
          .filter((id) => Number.isFinite(id));

        setPlanner(validPlanner);
      }
    } catch (error) {
      console.error("Could not load planner:", error);
    }
  }, []);

  //-------Save Planner-------

  useEffect(() => {
    try {
      localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(planner));
    } catch (error) {
      console.error("Could not save planner:", error);
    }
  }, [planner]);

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

  //-------Authentication Log-------

  useEffect(() => {
    if (isLoggedIn && user) {
      console.log(`Logged in user: ${user.username}`);
    }
  }, [isLoggedIn, user]);

  //-------Return-------

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/*-------Home-------*/}

        <Route path="/" element={<Home planner={planner} />} />

        {/*-------Catalog-------*/}

        <Route
          path="/catalog"
          element={<Catalog planner={planner} addCourse={addCourse} />}
        />

        {/*-------Planner-------*/}

        <Route
          path="/planner"
          element={
            <ProtectedRoute>
              <Planner planner={planner} removeCourse={removeCourse} />
            </ProtectedRoute>
          }
        />

        {/*-------Add Course-------*/}

        <Route path="/add-course" element={<AddCourse />} />

        {/*-------Login-------*/}

        <Route path="/login" element={<Login />} />

        {/*-------Register-------*/}

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
