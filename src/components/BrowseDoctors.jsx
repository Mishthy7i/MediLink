import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import { getAllDoctors, getAllDoctorAvailabilities } from "../lib/appwrite";

const databaseID = "6824ee070017a8b56e75";
const doctorDetailsCollection = "6824f18600264fbb6788";
const doctorAvailabilityTableCollection = "6824f390002cdc2ac392";

export default function BrowseDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const user = useAuthStore((state) => state.user);
if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="alert alert-warning text-lg font-semibold">
          Please login to use this.
        </div>
      </div>
    );
  }

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        // Fetch all doctors
        const doctorList = await getAllDoctors();
        // Fetch all availabilities
        const availList = await getAllDoctorAvailabilities();
        // Map availabilities to doctors
        const doctorCards = doctorList.map(doc => {
          const slots = availList.filter(a => a.doctor_id === doc.doctor_id);
          return { ...doc, slots };
        });
        setDoctors(doctorCards);
      } catch (err) {
        setError("Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-base-200 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Browse Doctor</h1>
      {loading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : (
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          {doctors.map((doc) => (
            <div key={doc.doctor_id} className="card bg-base-100 shadow-xl flex flex-row items-stretch">
              <div className="flex flex-col items-center justify-center p-6 bg-gray-200 rounded-l-xl min-w-[120px]">
                <div className="w-20 h-20 rounded-full bg-base-300 flex items-center justify-center text-5xl">
                  {doc.profile_url ? (
                    <img src={doc.profile_url} alt="profile" className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <span className="material-icons">person</span>
                  )}
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="card-title text-lg mb-1">{doc.first_name} {doc.last_name}</h2>
                  <div className="text-base-content mb-1">{doc.speciality}</div>
                  <div className="text-sm text-gray-500 mb-1">{doc.degree} ({doc.college})</div>
                  <div className="text-sm text-gray-500 mb-1">{doc.experience} years of trust</div>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 text-lg mr-1">★★★★★</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 items-center mt-2">
                  {doc.slots.length > 0 ? doc.slots.map(slot => (
                    <div key={slot.timeslot_id} className="badge badge-outline badge-success px-3 py-2">
                      {slot.working_days} {slot.working_hours}
                    </div>
                  )) : <span className="badge badge-outline">No slots</span>}
                  {/* <button className="btn btn-outline ml-auto">Book Now</button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
