import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import { getPatientDetails } from "../lib/appwrite";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      if (user) {
        try {
          const data = await getPatientDetails(user.$id);
          setPatient(data);
        } catch (err) {
          setError("Could not fetch patient details");
        }
      }
      setLoading(false);
    };
    fetchPatient();
  }, [user]);

if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="alert alert-warning text-lg font-semibold">
          Please login to use this.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <h1 className="text-3xl font-bold mb-8 text-primary">Profile</h1>
      {loading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : patient ? (
        <div className="card w-full max-w-xl bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Patient Details</h2>
            <ul className="space-y-2">
              <li className="flex justify-between border-b border-base-200 py-1"><span className="font-semibold">First Name:</span><span>{patient.first_name}</span></li>
              <li className="flex justify-between border-b border-base-200 py-1"><span className="font-semibold">Last Name:</span><span>{patient.last_name}</span></li>
              <li className="flex justify-between border-b border-base-200 py-1"><span className="font-semibold">Age:</span><span>{patient.age}</span></li>
              <li className="flex justify-between border-b border-base-200 py-1"><span className="font-semibold">Marital Status:</span><span>{patient.marital_status ? "Married" : "Single"}</span></li>
              <li className="flex justify-between border-b border-base-200 py-1"><span className="font-semibold">Weight:</span><span>{patient.weight} kg</span></li>
              <li className="flex justify-between border-b border-base-200 py-1"><span className="font-semibold">Height:</span><span>{patient.height} cm</span></li>
              <li className="flex justify-between border-b border-base-200 py-1"><span className="font-semibold">Gender:</span><span>{patient.gender ? "Female" : "Male"}</span></li>
              <li className="flex justify-between border-b border-base-200 py-1"><span className="font-semibold">Mobile No:</span><span>{patient.mobile_no}</span></li>
              <li className="flex justify-between border-b border-base-200 py-1"><span className="font-semibold">Address:</span><span>{patient.address}</span></li>
              <li className="flex justify-between border-b border-base-200 py-1"><span className="font-semibold">Allergic To:</span><span>{patient.allergic_to}</span></li>
              <li className="flex justify-between border-b border-base-200 py-1"><span className="font-semibold">Medical History:</span><span>{patient.medical_history}</span></li>
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-base-content">No patient data found. Please complete onboarding.</p>
      )}
    </div>
  );
}
