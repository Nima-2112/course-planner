//-------import-------

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Planner from "./pages/Planner";
import AddCourse from "./pages/AddCourse";
import Login from "./pages/Login";
import Register from "./pages/Register";

//-------App-------

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/*-------Home-------*/}

        <Route path="/" element={<Home />} />

        {/*-------Catalog-------*/}

        <Route path="/catalog" element={<Catalog />} />

        {/*-------Planner-------*/}

        <Route
          path="/planner"
          element={
            <ProtectedRoute>
              <Planner />
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

//-------Export-------

export default App;
