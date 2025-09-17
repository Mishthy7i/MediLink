import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_horizontal.png";
import { useAuthStore } from "../store/auth";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a onClick={() => navigate("/")}>Home</a></li>
            <li><a onClick={() => navigate("/profile")}>Patient Regn</a></li>
            <li><a onClick={() => navigate("/book-appointment")}>Book Appointment</a></li>
            <li><a onClick={() => navigate("/browse-doctors")}>Browse Doctors</a></li>
            <li><a onClick={() => navigate("/about")}>About Us</a></li>
          </ul>
        </div>
        <img src={logo} alt="MediLink Logo" className="w-40 ml-2" />
        {/* Location Chip */}
        <div
          className="ml-4 badge badge-outline flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-primary/10 transition"
          onClick={() => setShowModal(true)}
        >
          <FaMapMarkerAlt className="text-primary" />
          <span className="font-semibold text-base">Gwalior</span>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a onClick={() => navigate("/")}>Home</a></li>
          <li><a onClick={() => navigate("/profile")}>Patient Regn</a></li>
          <li><a onClick={() => navigate("/book-appointment")}>Book Appointment</a></li>
          <li><a onClick={() => navigate("/browse-doctors")}>Browse Doctors</a></li>  
          <li><a onClick={() => navigate("/about")}>About Us</a></li>
        </ul>
      </div>
      <div className="navbar-end flex items-center gap-2">
        {!user ? (
          <button className="btn btn-primary min-w-[100px]" onClick={() => navigate("/login")}>Login</button>
        ) : (
          <>
            <button className="btn btn-accent min-w-[100px]" onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button className="btn btn-error min-w-[100px]" onClick={() => {
              window.location.href = "/login";
            }}>Logout</button>
          </>
        )}
      </div>
      {/* Modal for place selection (for show only) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-xl p-8 shadow-xl w-full max-w-xs flex flex-col items-center">
            <FaMapMarkerAlt className="text-primary text-4xl mb-2" />
            <h3 className="text-xl font-bold mb-2">Select City</h3>
            <div className="mb-4 text-base-content">Currently only <b>Gwalior</b> is supported.</div>
            <button className="btn btn-primary w-full" onClick={() => setShowModal(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}