import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Counter from "./components/Counter";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import BookAppointment from "./components/BookAppointment";
import BrowseDoctors from "./components/BrowseDoctors";
import Onboarding from "./components/Onboarding";
import { useAuthStore } from "./store/auth";
import { logout as appwriteLogout, getPatientDetails } from "./lib/appwrite";
import { loadSampleDoctorsAndSlots } from "./lib/sampleDataUtil";
import './App.css'
import About from "./components/About";

function App() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await appwriteLogout();
    setUser(null);
  };

  useEffect(() => {
    const checkOnboarding = async () => {
      if (user) {
        const patient = await getPatientDetails(user.$id);
        const requiredFields = [
          "first_name", "last_name", "age", "marital_status", "weight", "height",
          "gender", "mobile_no", "address", "allergic_to", "medical_history", "patient_id"
        ];
        const isIncomplete = !patient || requiredFields.some(field => patient[field] === undefined || patient[field] === null || patient[field] === "");
        if (isIncomplete) {
          navigate("/onboarding", { replace: true });
        }
      }
    };
    checkOnboarding();
  }, [user]);

  // Uncomment this block to load sample data into Appwrite ONCE, then comment it again.
  
  // useEffect(() => {
  //   loadSampleDoctorsAndSlots().then(() => {
  //     console.log("Sample data loaded!");
  //   }).catch((err) => {
  //     console.error("Error loading sample data:", err);
  //   });
  // }, []);
  

  return (
    <>
      <Navbar />
      {user && (
        <button className="btn btn-error absolute top-4 right-4 z-50" onClick={handleLogout}>
          Logout
        </button>
      )}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/browse-doctors" element={<BrowseDoctors />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
