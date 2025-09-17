import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import logo from "../assets/logo_horizontal.png";
import heroIllustration from "../assets/hero_illustration.png";
import { FaUserMd, FaCalendarCheck, FaShieldAlt } from "react-icons/fa";
import { FaPersonCane } from "react-icons/fa6";
import { getAllDoctorReviews, getAllDoctors } from "../lib/appwrite";

export default function Hero() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [doctorsMap, setDoctorsMap] = useState({});

  useEffect(() => {
    // Fetch reviews and doctors for mapping
    async function fetchData() {
      try {
        const [reviewsRes, doctorsRes] = await Promise.all([
          getAllDoctorReviews(),
          getAllDoctors(),
        ]);
        setReviews(reviewsRes);
        // Map doctor_id to doctor object for quick lookup
        const docMap = {};
        doctorsRes.forEach((doc) => (docMap[doc.doctor_id] = doc));
        setDoctorsMap(docMap);
      } catch {
        setReviews([]);
        setDoctorsMap({});
      }
    }
    fetchData();
  }, []);

  const features = [
    {
      icon: <FaUserMd size={24} />,
      title: "Expert Doctors",
      desc: "Find specialists across 100+ medical fields.",
    },
    {
      icon: <FaCalendarCheck size={24} />,
      title: "Easy Scheduling",
      desc: "Choose date & time that suits you.",
    },
    {
      icon: <FaPersonCane size={24} />,
      title: "Easy to Use",
      desc: "User-friendly interface for all ages.",
    },
    {
      icon: <FaShieldAlt size={24} />,
      title: "Safe & Private",
      desc: "HIPAA-compliant patient data.",
    },
  ];

  // Helper to render stars for double rating
  function renderStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<span key={i} className="text-yellow-400 text-lg">★</span>);
      } else if (rating > i - 1 && rating < i) {
        stars.push(<span key={i} className="text-yellow-400 text-lg">★</span>); // full star for half, or use half-star icon if you want
      } else {
        stars.push(<span key={i} className="text-gray-300 text-lg">★</span>);
      }
    }
    return stars;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-base-200 px-4 py-10">
      <div className="container mx-auto">
        {/* Main Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <img src={logo} alt="MediLink Logo" className="w-48 mx-auto lg:mx-0 mb-4" />
            <h1 className="text-6xl font-extrabold mb-4 text-primary drop-shadow">
              MediLink
            </h1>
            <p className="mb-6 text-xl text-base-content">
              Bridging Patients & Doctors with Smart Recommendations
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {user ? (
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </button>
              ) : (
                <button
                  className="btn btn-accent btn-lg"
                  onClick={() => navigate("/login")}
                >
                  Get Started
                </button>
              )}
            </div>
          </div>

          {/* Illustration */}
          <div className="flex-1">
            <img
              src={heroIllustration}
              alt="Doctors and Patients Illustration"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="card bg-base-100 shadow-lg p-6 text-center">
              <div className="flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-base-content opacity-80">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">What Our Customers Say</h2>
          {reviews.length === 0 ? (
            <div className="text-center text-gray-400">No reviews yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.slice(0, 6).map((review, idx) => {
                const doc = doctorsMap[review.doctor_id];
                return (
                  <div key={idx} className="card bg-base-100 shadow-xl p-6 flex flex-col items-center">
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(review.rating)}
                      <span className="ml-2 font-bold text-base text-primary">{review.rating}/5</span>
                    </div>
                    <div className="italic text-base-content text-center mb-2">
                      "{review.review}"
                    </div>
                    <div className="text-sm text-gray-500 mb-1">
                      {review.patient_name
                        ? `— ${review.patient_name}`
                        : "— Verified Patient"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {review.$updatedAt
                        ? `Visited on ${new Date(review.$updatedAt).toLocaleDateString()}`
                        : ""}
                    </div>
                    {doc && (
                      <div className="mt-2 text-sm text-base-content text-center">
                        <span className="font-semibold">{doc.first_name} {doc.last_name}</span>
                        <span className="ml-2 badge badge-outline">{doc.speciality}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}