import React, { useState, useEffect } from "react";
import {
  getAllDoctors,
  getAllDoctorAvailabilities,
  createBooking,
  getPatientBookings,
  updateBooking,
} from "../lib/appwrite";
import { diseaseToSpecialityMap } from "../lib/diseaseToSpecialityMap";
import { useAuthStore } from "../store/auth";
import { ID } from "appwrite";

// Helper to map user input to a doctor speciality
function getSpecialityFromInput(input) {
  const normalized = input.trim().toLowerCase();
  for (const entry of diseaseToSpecialityMap) {
    if (entry.keywords.some(keyword => normalized.includes(keyword))) {
      return entry.speciality;
    }
  }
  // Default to General Physician if nothing matches
  return "General Physician";
}

export default function BookAppointment() {
  const [disease, setDisease] = useState("");
  const [date, setDate] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [doctorsMap, setDoctorsMap] = useState({});
  const [slotsMap, setSlotsMap] = useState({});
  const [ratingModal, setRatingModal] = useState({ open: false, booking: null });
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewValue, setReviewValue] = useState("");
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

// Helper to render clickable stars for rating
function StarRating({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-2xl ${value >= star ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => onChange(star)}
          onKeyDown={e => (e.key === "Enter" || e.key === " ") && onChange(star)}
          tabIndex={0}
          role="button"
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

  // Helper to check if a time falls within a slot
  function isTimeInSlot(time, slot) {
    if (!time || !slot.working_hours) return false;
    const [start, end] = slot.working_hours.split("-");
    return time >= start && time < end;
  }

  // Fetch patient's bookings and doctor/slot details
  useEffect(() => {
    if (user?.$id) {
      fetchBookings();
      fetchDoctorsAndSlots();
    }
    // eslint-disable-next-line
  }, [user]);

  const fetchDoctorsAndSlots = async () => {
    try {
      const [doctors, slots] = await Promise.all([
        getAllDoctors(),
        getAllDoctorAvailabilities(),
      ]);
      const docMap = {};
      doctors.forEach((doc) => (docMap[doc.doctor_id] = doc));
      setDoctorsMap(docMap);
      const slotMap = {};
      slots.forEach((slot) => (slotMap[slot.timeslot_id] = slot));
      setSlotsMap(slotMap);
    } catch {
      setDoctorsMap({});
      setSlotsMap({});
    }
  };

  const fetchBookings = async () => {
    try {
      const bookings = await getPatientBookings(user.$id);
      setBookedAppointments(bookings);
    } catch {
      setBookedAppointments([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    setResults([]);
    try {
      const [doctors, slots] = await Promise.all([
        getAllDoctors(),
        getAllDoctorAvailabilities(),
      ]);
      const userSpeciality = getSpecialityFromInput(disease);
      let filteredDocs = doctors.filter(
        (doc) => doc.speciality.toLowerCase() === userSpeciality.toLowerCase()
      );
      if (
        filteredDocs.length === 0 &&
        userSpeciality !== "General Physician"
      ) {
        filteredDocs = doctors.filter(
          (doc) => doc.speciality.toLowerCase() === "general physician"
        );
      }
      const doctorCards = filteredDocs.map((doc) => {
        const docSlots = slots.filter((a) => a.doctor_id === doc.doctor_id);
        return { ...doc, slots: docSlots };
      });
      setResults(doctorCards);
    } catch (err) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Booking handler
  const handleBookNow = async (doctor_id, slot) => {
    if (!user?.$id) return alert("Please login to book.");
    setBookingLoading(true);
    try {
      const booking_id = ID.unique();
      await createBooking({
        booking_id,
        patient_id: user.$id,
        doctor_id,
        timeslot_id: slot.timeslot_id,
        disease,
        rating: null,
        review: "",
      });
      await fetchBookings();
      alert("Appointment booked successfully!");
    } catch (err) {
      alert("Failed to book appointment.");
    } finally {
      setBookingLoading(false);
    }
  };

  // Rating handler
  const openRatingModal = (booking) => {
    setRatingValue(0);
    setReviewValue("");
    setRatingModal({ open: true, booking });
  };

  const handleRatingSubmit = async () => {
    if (!ratingModal.booking) return;
    try {
      await updateBooking(ratingModal.booking.booking_id, {
        rating: ratingValue,
        review: reviewValue,
      });
      setRatingModal({ open: false, booking: null });
      await fetchBookings();
    } catch {
      alert("Failed to submit rating.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-base-200 py-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Search Doctor</h1>
      <form
        className="bg-base-100 p-6 rounded-xl shadow-md flex flex-col gap-4 w-full max-w-md"
        onSubmit={handleSearch}
      >
        <label className="form-control w-full">
          <span className="label-text font-semibold">Disease*</span>
          <input
            className="input input-bordered w-full"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            placeholder="Heart, Brain, Skin, Stomach, Kids, Pregnancy"
            required
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text font-semibold">Preferred Date</span>
          <input
            type="date"
            className="input input-bordered w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text font-semibold">
            Preferred Time (24h, e.g. 15:30)*
          </span>
          <input
            type="time"
            className="input input-bordered w-full"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            required
          />
        </label>
        <button
          className="btn btn-primary mt-2"
          type="submit"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Available Doctors"}
        </button>
      </form>
      {searched && (
        <div className="w-full max-w-2xl mt-8">
          <h2 className="text-xl font-bold mb-4 text-primary">
            Recommended Doctor
          </h2>
          {results.length === 0 ? (
            <div className="alert alert-warning">
              No doctors found for your criteria.
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {results.map((doc) => (
                <div
                  key={doc.doctor_id}
                  className="card bg-base-100 shadow-xl flex flex-row items-stretch"
                >
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-200 rounded-l-xl min-w-[120px]">
                    <div className="w-20 h-20 rounded-full bg-base-300 flex items-center justify-center text-5xl">
                      {doc.profile_url ? (
                        <img
                          src={doc.profile_url}
                          alt="profile"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <span className="material-icons">person</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="card-title text-lg mb-1">
                        {doc.first_name} {doc.last_name}
                      </h2>
                      <div className="text-base-content mb-1">
                        {doc.speciality}
                      </div>
                      <div className="text-sm text-gray-500 mb-1">
                        {doc.degree} ({doc.college})
                      </div>
                      <div className="text-sm text-gray-500 mb-1">
                        {doc.experience} years of trust
                      </div>
                      <div className="text-sm text-gray-500 mb-1">
                        {doc.posted_at}
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-yellow-400 text-lg mr-1">
                          ★★★★★
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="flex gap-2 overflow-x-auto pb-2">
                       
{doc.slots.length === 0 ? (
  <>
    <span className="badge badge-outline">No slots</span>
    {doc.speciality.toLowerCase() === "general physician" && (
      <button
        className="btn btn-outline btn-sm w-fit"
        disabled={bookingLoading}
        onClick={() =>
          handleBookNow(doc.doctor_id, { timeslot_id: "no-slot", working_days: "Any", working_hours: "Any" })
        }
      >
        {bookingLoading ? "Booking..." : "Book Now"}
      </button>
    )}
  </>
) : (
  doc.slots.map((slot) => {
    const isMatch = isTimeInSlot(timestamp, slot);
    return (
      <div key={slot.timeslot_id} className="flex items-center gap-2">
        <div
          className={`badge px-4 py-3 text-base ${
            isMatch ? "badge-success" : "badge-warning"
          }`}
        >
          {slot.working_days} {slot.working_hours}
        </div>
        {isMatch && (
          <button
            className="btn btn-outline btn-sm w-fit"
            disabled={bookingLoading}
            onClick={() => handleBookNow(doc.doctor_id, slot)}
          >
            {bookingLoading ? "Booking..." : "Book Now"}
          </button>
        )}
      </div>
    );
  })
)}

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Booked Appointments Section */}
      {user?.$id && (
<div className="flex flex-col gap-4">
  {bookedAppointments.map((booking) => {
    const doc = doctorsMap[booking.doctor_id];
    const slot = slotsMap[booking.timeslot_id];
    const isRated = typeof booking.rating === "number" && booking.rating >= 0;
    return (
      <div
        key={booking.booking_id}
        className={`card shadow p-6 flex flex-col md:flex-row items-center justify-between transition-all ${
          isRated
            ? "bg-green-50 border border-green-300"
            : "bg-base-100 border"
        }`}
      >
        <div className="flex items-center gap-4 flex-1">
          <div>
            <div className="font-semibold text-lg">
              {doc
                ? `${doc.first_name} ${doc.last_name}`
                : "Doctor"}
            </div>
            <div className="text-sm text-gray-500">
              {doc?.speciality}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Disease:</span>{" "}
              {booking.disease}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Date:</span>{" "}
              {slot?.working_days}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Time:</span>{" "}
              {slot?.working_hours}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Booking ID: {booking.booking_id}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 mt-4 md:mt-0 min-w-[180px]">
          {isRated ? (
            <div className="flex flex-col items-end w-full">
              <span className="badge badge-success mb-2">Visited & Rated</span>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      booking.rating > i ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="font-bold ml-2">{booking.rating}/5</span>
              </div>
              <div className="bg-green-100 border border-green-300 rounded p-2 text-sm text-green-900 max-w-xs text-right italic">
                "{booking.review}"
              </div>
            </div>
          ) : (
            <button
              className="btn btn-accent btn-sm"
              onClick={() => openRatingModal(booking)}
            >
              Rate Visit
            </button>
          )}
        </div>
      </div>
    );
  })}
</div>
      )}

      {/* Rating Modal */}
      {ratingModal.open && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-base-100 rounded-xl p-8 shadow-xl w-full max-w-md">
      <h3 className="text-xl font-bold mb-4">Rate Your Visit</h3>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Rating</label>
        <StarRating value={ratingValue} onChange={setRatingValue} />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Review</label>
        <textarea
          className="textarea textarea-bordered w-full"
          value={reviewValue}
          onChange={(e) => setReviewValue(e.target.value)}
          placeholder="Share your experience..."
        />
      </div>
      <div className="flex gap-4 justify-end">
        <button
          className="btn btn-outline"
          onClick={() => setRatingModal({ open: false, booking: null })}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={handleRatingSubmit}
          disabled={ratingValue < 1 || ratingValue > 5}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}