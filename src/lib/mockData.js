// Mock data to bypass Appwrite - for demo purposes
import { ID } from "appwrite";

// Static user data for login bypass
export const mockUsers = [
  {
    $id: "user_demo_123",
    name: "Demo User",
    phone: "+919876543210",
    email: "demo@example.com"
  }
];

// Static patient data
export const mockPatients = [
  {
    $id: "user_demo_123",
    patient_id: "user_demo_123",
    first_name: "John",
    last_name: "Doe",
    age: 28,
    marital_status: false,
    weight: 70,
    height: 175,
    gender: "male",
    mobile_no: "9876543210",
    address: "123 Demo Street, Gwalior, MP",
    allergic_to: "None",
    medical_history: "No major health issues",
    $createdAt: "2024-01-01T00:00:00.000Z",
    $updatedAt: "2024-01-01T00:00:00.000Z"
  }
];

// Static doctors data
export const mockDoctors = [
  {
    $id: "doc1",
    doctor_id: "doc1",
    first_name: "Amit",
    last_name: "Sharma",
    speciality: "Cardiologist",
    experience: 8,
    degree: "MBBS, MD",
    college: "AIIMS Delhi",
    posted_at: "AIIMS Delhi",
    profile_url: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    $id: "doc2",
    doctor_id: "doc2",
    first_name: "Priya",
    last_name: "Verma",
    speciality: "Dermatologist",
    experience: 6,
    degree: "MBBS, MD",
    college: "CMC Vellore",
    posted_at: "CMC Vellore",
    profile_url: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    $id: "doc3",
    doctor_id: "doc3",
    first_name: "Rahul",
    last_name: "Gupta",
    speciality: "Neurologist",
    experience: 10,
    degree: "MBBS, DM",
    college: "KGMU Lucknow",
    posted_at: "KGMU Lucknow",
    profile_url: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    $id: "doc4",
    doctor_id: "doc4",
    first_name: "Sneha",
    last_name: "Patel",
    speciality: "Pediatrician",
    experience: 5,
    degree: "MBBS, DNB",
    college: "JIPMER",
    posted_at: "JIPMER",
    profile_url: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    $id: "doc5",
    doctor_id: "doc5",
    first_name: "Vikram",
    last_name: "Singh",
    speciality: "Orthopedic",
    experience: 12,
    degree: "MBBS, MS",
    college: "PGI Chandigarh",
    posted_at: "PGI Chandigarh",
    profile_url: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    $id: "doc6",
    doctor_id: "doc6",
    first_name: "Anjali",
    last_name: "Mehra",
    speciality: "Gynecologist",
    experience: 7,
    degree: "MBBS, DGO",
    college: "Grant Medical College",
    posted_at: "Grant Medical College",
    profile_url: "https://randomuser.me/api/portraits/women/6.jpg"
  },
  {
    $id: "doc7",
    doctor_id: "doc7",
    first_name: "Rohit",
    last_name: "Jain",
    speciality: "ENT",
    experience: 4,
    degree: "MBBS, DLO",
    college: "Maulana Azad Medical College",
    posted_at: "Maulana Azad Medical College",
    profile_url: "https://randomuser.me/api/portraits/men/7.jpg"
  },
  {
    $id: "doc8",
    doctor_id: "doc8",
    first_name: "Pooja",
    last_name: "Chopra",
    speciality: "Psychiatrist",
    experience: 9,
    degree: "MBBS, DPM",
    college: "BHU",
    posted_at: "BHU",
    profile_url: "https://randomuser.me/api/portraits/women/8.jpg"
  },
  {
    $id: "doc9",
    doctor_id: "doc9",
    first_name: "Suresh",
    last_name: "Yadav",
    speciality: "Dentist",
    experience: 6,
    degree: "BDS, MDS",
    college: "AFMC Pune",
    posted_at: "AFMC Pune",
    profile_url: "https://randomuser.me/api/portraits/men/9.jpg"
  },
  {
    $id: "doc10",
    doctor_id: "doc10",
    first_name: "Neha",
    last_name: "Agarwal",
    speciality: "General Physician",
    experience: 3,
    degree: "MBBS",
    college: "SMS Jaipur",
    posted_at: "SMS Jaipur",
    profile_url: "https://randomuser.me/api/portraits/women/10.jpg"
  }
];

// Static doctor availability data
export const mockDoctorAvailabilities = [
  {
    $id: "slot1",
    timeslot_id: "doc1_slot1",
    doctor_id: "doc1",
    working_days: "Monday-Wednesday",
    working_hours: "15:00-16:00"
  },
  {
    $id: "slot2",
    timeslot_id: "doc1_slot2",
    doctor_id: "doc1",
    working_days: "Thursday-Friday",
    working_hours: "16:00-17:00"
  },
  {
    $id: "slot3",
    timeslot_id: "doc2_slot1",
    doctor_id: "doc2",
    working_days: "Tuesday",
    working_hours: "10:00-12:00"
  },
  {
    $id: "slot4",
    timeslot_id: "doc2_slot2",
    doctor_id: "doc2",
    working_days: "Friday",
    working_hours: "14:00-15:00"
  },
  {
    $id: "slot5",
    timeslot_id: "doc3_slot1",
    doctor_id: "doc3",
    working_days: "Monday",
    working_hours: "09:00-11:00"
  },
  {
    $id: "slot6",
    timeslot_id: "doc3_slot2",
    doctor_id: "doc3",
    working_days: "Wednesday",
    working_hours: "17:00-18:00"
  },
  {
    $id: "slot7",
    timeslot_id: "doc4_slot1",
    doctor_id: "doc4",
    working_days: "Tuesday-Thursday",
    working_hours: "11:00-12:00"
  },
  {
    $id: "slot8",
    timeslot_id: "doc5_slot1",
    doctor_id: "doc5",
    working_days: "Monday-Friday",
    working_hours: "08:00-09:00"
  },
  {
    $id: "slot9",
    timeslot_id: "doc6_slot1",
    doctor_id: "doc6",
    working_days: "Wednesday-Friday",
    working_hours: "13:00-14:00"
  },
  {
    $id: "slot10",
    timeslot_id: "doc7_slot1",
    doctor_id: "doc7",
    working_days: "Monday",
    working_hours: "18:00-19:00"
  },
  {
    $id: "slot11",
    timeslot_id: "doc8_slot1",
    doctor_id: "doc8",
    working_days: "Tuesday-Wednesday",
    working_hours: "15:00-16:00"
  },
  {
    $id: "slot12",
    timeslot_id: "doc9_slot1",
    doctor_id: "doc9",
    working_days: "Thursday-Friday",
    working_hours: "10:00-12:00"
  },
  {
    $id: "slot13",
    timeslot_id: "doc10_slot1",
    doctor_id: "doc10",
    working_days: "Monday-Sunday",
    working_hours: "09:00-11:00"
  },
  {
    $id: "slot14",
    timeslot_id: "doc10_slot2",
    doctor_id: "doc10",
    working_days: "Monday-Sunday",
    working_hours: "15:00-17:00"
  }
];

// Static bookings data (for demo purposes)
export const mockBookings = [
  {
    $id: "booking1",
    booking_id: "booking1",
    patient_id: "user_demo_123",
    doctor_id: "doc1",
    timeslot_id: "doc1_slot1",
    disease: "chest pain",
    rating: 5,
    review: "Excellent doctor, very professional and caring. Highly recommended!",
    $createdAt: "2024-08-15T10:00:00.000Z",
    $updatedAt: "2024-08-16T10:00:00.000Z"
  },
  {
    $id: "booking2",
    booking_id: "booking2",
    patient_id: "user_demo_123",
    doctor_id: "doc2",
    timeslot_id: "doc2_slot1",
    disease: "skin rash",
    rating: 4,
    review: "Good consultation, solved my skin problem effectively.",
    $createdAt: "2024-09-01T14:00:00.000Z",
    $updatedAt: "2024-09-02T14:00:00.000Z"
  },
  {
    $id: "booking3",
    booking_id: "booking3",
    patient_id: "user_demo_123",
    doctor_id: "doc10",
    timeslot_id: "doc10_slot1",
    disease: "fever",
    rating: null,
    review: "",
    $createdAt: "2024-09-10T09:00:00.000Z",
    $updatedAt: "2024-09-10T09:00:00.000Z"
  }
];

// Additional sample reviews from other patients for hero section
export const mockReviews = [
  {
    $id: "review1",
    booking_id: "booking1",
    patient_id: "user_demo_123",
    doctor_id: "doc1",
    rating: 5,
    review: "Excellent doctor, very professional and caring. Highly recommended!",
    patient_name: "Demo User",
    $updatedAt: "2024-08-16T10:00:00.000Z"
  },
  {
    $id: "review2",
    booking_id: "booking2",
    patient_id: "user_demo_123",
    doctor_id: "doc2",
    rating: 4,
    review: "Good consultation, solved my skin problem effectively.",
    patient_name: "Demo User",
    $updatedAt: "2024-09-02T14:00:00.000Z"
  },
  {
    $id: "review3",
    booking_id: "sample1",
    patient_id: "sample_patient_1",
    doctor_id: "doc3",
    rating: 5,
    review: "Dr. Gupta helped me with my migraine issues. Very knowledgeable!",
    patient_name: "Ravi Kumar",
    $updatedAt: "2024-08-20T11:00:00.000Z"
  },
  {
    $id: "review4",
    booking_id: "sample2",
    patient_id: "sample_patient_2",
    doctor_id: "doc4",
    rating: 5,
    review: "Amazing pediatrician! My child felt comfortable throughout the visit.",
    patient_name: "Sunita Sharma",
    $updatedAt: "2024-08-25T16:00:00.000Z"
  },
  {
    $id: "review5",
    booking_id: "sample3",
    patient_id: "sample_patient_3",
    doctor_id: "doc5",
    rating: 4,
    review: "Great orthopedic surgeon. Fixed my knee problem efficiently.",
    patient_name: "Manoj Singh",
    $updatedAt: "2024-09-05T12:00:00.000Z"
  },
  {
    $id: "review6",
    booking_id: "sample4",
    patient_id: "sample_patient_4",
    doctor_id: "doc6",
    rating: 5,
    review: "Dr. Mehra is very understanding and professional. Excellent care!",
    patient_name: "Kavya Patel",
    $updatedAt: "2024-09-08T15:00:00.000Z"
  }
];

// Helper function to simulate async calls with delay
export const simulateAsync = (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Helper to generate unique IDs (similar to Appwrite's ID.unique())
export const generateMockId = () => {
  return 'mock_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};