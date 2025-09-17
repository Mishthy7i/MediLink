import React from "react";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCalendarPlus, FaUserMd, FaInfoCircle } from "react-icons/fa";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="alert alert-warning text-lg font-semibold">
          Please login to use this.
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: <FaUserCircle size={20} />,
      label: "Profile",
      path: "/profile",
      color: "btn-primary"
    },
    {
      icon: <FaCalendarPlus size={20} />,
      label: "Book Appointment",
      path: "/book-appointment",
      color: "btn-secondary"
    },
    {
      icon: <FaUserMd size={20} />,
      label: "Browse Doctors",
      path: "/browse-doctors",
      color: "btn-accent"
    },
    {
      icon: <FaInfoCircle size={20} />,
      label: "About MediLink",
      path: "/about",
      color: "btn-neutral"
    }
  ];

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-primary text-center mb-4">Dashboard</h1>
        <p className="text-center text-lg text-base-content mb-8">
          Welcome, {user?.name || user?.phone || "User"}!<br />Manage your healthcare journey easily with MediLink.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, idx) => (
            <button
              key={idx}
              className={`btn ${f.color} flex items-center gap-2 w-full justify-center text-base`}
              onClick={() => navigate(f.path)}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>

        <div className="mt-12 text-center text-base-content">
          <p className="text-md font-semibold mb-2">Why use MediLink?</p>
          <ul className="list-disc list-inside text-sm text-left max-w-xl mx-auto">
            <li>Smart disease-to-doctor mapping using intelligent algorithms.</li>
            <li>Easy appointment booking with real-time availability.</li>
            <li>Quick access to doctor profiles and specialization.</li>
            <li>Secure, user-friendly platform to manage your healthcare data.</li>
            <li>Responsive and mobile-friendly experience.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
