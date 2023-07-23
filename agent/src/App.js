import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./layouts/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/agent/HomePage";

function App() {
  const [online, setOnline] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    isAdmin: false,
    productionTime: 0,
    pauseTime: 0,
  });

  useEffect(() => {
    // Retrieve user data from local storage on component mount
    const codeStorage = localStorage.getItem("code");
    const nameStorage = localStorage.getItem("name");
    const authStorage = localStorage.getItem("online");
    if (codeStorage) {
      setFormData((data) => ({
        ...data,
        code: JSON.parse(codeStorage),
      }));
      setFormData((data) => ({
        ...data,
        name: JSON.parse(nameStorage),
      }));

      setOnline(JSON.parse(authStorage));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/agent/login/",
        formData
      );
      localStorage.setItem("code", JSON.stringify(formData.code));
      localStorage.setItem("name", JSON.stringify(formData.name));
      localStorage.setItem("online", JSON.stringify(true));
      localStorage.setItem("productionTime", JSON.stringify(0));
      localStorage.setItem("pauseTime", JSON.stringify(0));
      console.log("Login successful:", response.data);
      setOnline(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignUp = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/agent/signup/",
        formData
      );
      console.log("Sign Up successful:", response.data);
      localStorage.setItem("code", JSON.stringify(formData.code));
      localStorage.setItem("name", JSON.stringify(formData.name));
      localStorage.setItem("online", JSON.stringify(true));
      localStorage.setItem("productionTime", JSON.stringify(0));
      localStorage.setItem("pauseTime", JSON.stringify(0));
      console.log("Login successful:", response.data);
      setOnline(true);
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  const handleLogout = () => {
    // Clear user data from local storage and set online status to false
    localStorage.removeItem("code");
    localStorage.removeItem("name");
    localStorage.removeItem("online");
    setOnline(false);
  };

  return (
    <BrowserRouter>
      {!online ? (
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage
                handleSubmit={handleLogin}
                handleChange={handleChange}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <SignUpPage
                handleChange={handleChange}
                handleSubmit={handleSignUp}
              />
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Layout formData={formData} handleLogout={handleLogout} />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      )}

      {/* <Route path="/" element={<Layout />}>
          <Route index
        </Route> */}
    </BrowserRouter>
  );
}

export default App;
