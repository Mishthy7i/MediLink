import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4 py-12">
      <div className="card bg-base-100 shadow-xl max-w-2xl w-full p-8">
        <h1 className="text-3xl font-bold text-primary mb-4">About MediLink</h1>
        <p className="mb-4 text-base-content text-lg">
          <span className="font-semibold text-accent">MediLink</span> is a modern healthcare platform designed to seamlessly connect patients with the right doctors. Our mission is to simplify the process of finding, booking, and managing medical appointments, making healthcare more accessible and efficient for everyone.
        </p>
        <ul className="list-disc ml-6 mb-4 text-base-content">
          <li>🔍 <span className="font-semibold">Smart Doctor Search:</span> Find doctors by symptoms, diseases, or specialization using our intelligent recommendation system.</li>
          <li>📅 <span className="font-semibold">Easy Booking:</span> Instantly book appointments with available doctors and time slots.</li>
          <li>📝 <span className="font-semibold">Patient Profiles:</span> Securely manage your health records and appointment history.</li>
          <li>⭐ <span className="font-semibold">Feedback & Ratings:</span> Rate your experience and help others choose the best care.</li>
        </ul>
        <div className="alert alert-info mb-4">
          <span>
            <b>Built with:</b> React, Vite, Appwrite, Zustand, Tailwind CSS, DaisyUI
          </span>
        </div>
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MediLink. All rights reserved.
        </div>
      </div>
    </div>
  );
}