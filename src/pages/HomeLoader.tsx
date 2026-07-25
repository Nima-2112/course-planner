import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";

function HomeLoader() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <SplashScreen />;
}

export default HomeLoader;
