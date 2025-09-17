import {
  Account,
  Client,
  Databases,
  Storage,
  Query,
  ID,
  AppwriteException,
} from "appwrite";

// Import mock data for demo mode
import { 
  mockUsers, 
  mockPatients, 
  mockDoctors, 
  mockDoctorAvailabilities, 
  mockBookings, 
  mockReviews,
  simulateAsync,
  generateMockId 
} from './mockData.js';

// Demo mode flag - set to true to use static data
const DEMO_MODE = true;

// Appwrite client setup (kept for potential future use)
const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6824ecf7001d3e68b288");

export const databases = new Databases(client);
const databaseID = "6824ee070017a8b56e75";

// === Collection IDs (Schemas) ===
// patientDetailsCollection: Patient Profile Info
// doctorDetailsCollection: Doctor Info
// doctorAvailabilityTableCollection: Doctor Timeslots
// bookingTableCollection: Appointments/Bookings

const patientDetailsCollection = "6824ee2f002f4da05c7f";
const doctorDetailsCollection = "6824f18600264fbb6788";
const doctorAvailabilityTableCollection = "6824f390002cdc2ac392";
const bookingTableCollection = "6824f4a800050e8fb291";

// =================== AUTH ROUTES ===================

// Send OTP to phone number (Demo Mode)
export const createOTP = async (phoneNo: string) => {
  if (DEMO_MODE) {
    // In demo mode, always return a mock user ID
    await simulateAsync(null, 1000); // Simulate network delay
    return "user_demo_123";
  }
  
  try {
    const account = new Account(client);
    const token = await account.createPhoneToken(ID.unique(), `+91${phoneNo}`);
    const userId = token.userId;
    return userId;
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

// Login with OTP (Demo Mode)
export const login = async (userId: string, secret: string) => {
  if (DEMO_MODE) {
    // In demo mode, accept any OTP for the demo user
    await simulateAsync(null, 800);
    if (userId === "user_demo_123") {
      return { userId: "user_demo_123", sessionId: "demo_session_123" };
    }
    throw new Error("Invalid demo user");
  }
  
  try {
    const account = new Account(client);
    return await account.createSession(userId, secret);
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

// Get current user data (Demo Mode)
export const getUserData = async () => {
  if (DEMO_MODE) {
    await simulateAsync(null, 300);
    return mockUsers[0]; // Return demo user
  }
  
  try {
    const account = new Account(client);
    return account.get();
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

// Logout current session (Demo Mode)
export const logout = async () => {
  if (DEMO_MODE) {
    await simulateAsync(null, 200);
    return { success: true };
  }
  
  try {
    const account = new Account(client);
    return await account.deleteSession("current");
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

// =================== PATIENT DETAILS ===================

// Get patient details by ID (Demo Mode)
export const getPatientDetails = async (patientId: any) => {
  if (DEMO_MODE) {
    await simulateAsync(null, 300);
    const patient = mockPatients.find(p => p.patient_id === patientId);
    return patient || null;
  }
  
  try {
    return await databases.getDocument(
      databaseID,
      patientDetailsCollection,
      patientId
    );
  } catch (error) {
    // If not found, Appwrite throws, so return null
    return null;
  }
};

// Create patient details (Demo Mode)
export const createPatientDetails = async (patientId: any, data: any) => {
  if (DEMO_MODE) {
    await simulateAsync(null, 500);
    const newPatient = {
      $id: patientId,
      ...data,
      $createdAt: new Date().toISOString(),
      $updatedAt: new Date().toISOString()
    };
    
    // Update mock data (in a real app, this would persist)
    const existingIndex = mockPatients.findIndex(p => p.patient_id === patientId);
    if (existingIndex >= 0) {
      mockPatients[existingIndex] = newPatient;
    } else {
      mockPatients.push(newPatient);
    }
    
    return newPatient;
  }
  
  try {
    return await databases.createDocument(
      databaseID,
      patientDetailsCollection,
      patientId, // use $id from login as document id
      data
    );
  } catch (error) {
    const appwriteError = error as any;
    throw new Error(appwriteError.message);
  }
};

// Update patient details (Demo Mode)
export const updatePatientDetails = async (patientId: any, data: any) => {
  if (DEMO_MODE) {
    await simulateAsync(null, 400);
    const existingIndex = mockPatients.findIndex(p => p.patient_id === patientId);
    if (existingIndex >= 0) {
      mockPatients[existingIndex] = {
        ...mockPatients[existingIndex],
        ...data,
        $updatedAt: new Date().toISOString()
      };
      return mockPatients[existingIndex];
    }
    return null;
  }
  
  try {
    return await databases.updateDocument(
      databaseID,
      patientDetailsCollection,
      patientId,
      data
    );
  } catch (error) {
    const appwriteError = error as any;
    throw new Error(appwriteError.message);
  }
};

// =================== DOCTOR DETAILS ===================

// Get all doctors (Demo Mode)
export const getAllDoctors = async () => {
  if (DEMO_MODE) {
    await simulateAsync(null, 400);
    return mockDoctors;
  }
  
  try {
    const res = await databases.listDocuments(databaseID, doctorDetailsCollection);
    return res.documents;
  } catch (error) {
    throw new Error("Failed to fetch doctors");
  }
};

// =================== DOCTOR AVAILABILITY ===================

// Get all doctor availabilities (Demo Mode)
export const getAllDoctorAvailabilities = async () => {
  if (DEMO_MODE) {
    await simulateAsync(null, 300);
    return mockDoctorAvailabilities;
  }
  
  try {
    const res = await databases.listDocuments(databaseID, doctorAvailabilityTableCollection);
    return res.documents;
  } catch (error) {
    throw new Error("Failed to fetch doctor availabilities");
  }
};

// Get all timeslots for a doctor (Demo Mode)
export const getDoctorTimeslots = async (doctor_id: any) => {
  if (DEMO_MODE) {
    await simulateAsync(null, 200);
    return mockDoctorAvailabilities.filter(slot => slot.doctor_id === doctor_id);
  }
  
  try {
    const res = await databases.listDocuments(
      databaseID,
      doctorAvailabilityTableCollection,
      [Query.equal("doctor_id", [doctor_id])]
    );
    return res.documents;
  } catch (error) {
    throw new Error("Failed to fetch timeslots");
  }
};

// Search doctors by speciality and slot (Demo Mode)
export const searchDoctorsBySpecialityAndSlot = async (speciality: any, date: any, start_time: any) => {
  if (DEMO_MODE) {
    await simulateAsync(null, 600);
    
    // Filter doctors by speciality
    const doctors = mockDoctors.filter(doc => 
      doc.speciality.toLowerCase() === speciality.toLowerCase()
    );
    
    if (!doctors.length) return [];
    
    // Get all timeslots for these doctors
    const doctorIds = doctors.map(d => d.doctor_id);
    const slots = mockDoctorAvailabilities.filter(slot => 
      doctorIds.includes(slot.doctor_id)
    );
    
    // Attach slots to doctors
    return doctors.map(doc => ({
      ...doc,
      slots: slots.filter(slot => slot.doctor_id === doc.doctor_id),
      matchingSlots: [] // In demo mode, we don't filter by exact date/time
    }));
  }
  
  try {
    // 1. Get doctors by speciality
    const doctorRes = await databases.listDocuments(
      databaseID,
      doctorDetailsCollection,
      [Query.equal("speciality", [speciality])]
    );
    const doctors = doctorRes.documents;
    if (!doctors.length) return [];
    // 2. Get all timeslots for these doctors
    const doctorIds = doctors.map(d => d.doctor_id);
    const slotRes = await databases.listDocuments(
      databaseID,
      doctorAvailabilityTableCollection,
      [Query.equal("doctor_id", doctorIds)]
    );
    // 3. Attach slots to doctors
    return doctors.map(doc => ({
      ...doc,
      slots: slotRes.documents.filter(slot => slot.doctor_id === doc.doctor_id),
      matchingSlots: slotRes.documents.filter(slot => slot.doctor_id === doc.doctor_id && slot.date === date && slot.start_time === start_time)
    }));
  } catch (error) {
    throw new Error("Failed to search doctors");
  }
};

// =================== BOOKINGS ===================

// Create a new booking (Demo Mode)
export const createBooking = async (data: {
  booking_id: string,
  patient_id: string,
  doctor_id: string,
  timeslot_id: string,
  disease?: string
}) => {
  if (DEMO_MODE) {
    await simulateAsync(null, 500);
    const newBooking = {
      $id: data.booking_id,
      ...data,
      disease: data.disease || "General consultation",
      rating: null,
      review: "",
      $createdAt: new Date().toISOString(),
      $updatedAt: new Date().toISOString()
    };
    
    // Add to mock bookings (cast to any to avoid type issues)
    (mockBookings as any[]).push(newBooking);
    return newBooking;
  }
  
  try {
    return await databases.createDocument(
      databaseID,
      bookingTableCollection,
      data.booking_id,
      data
    );
  } catch (error) {
    throw new Error("Failed to create booking");
  }
};

// Get all bookings for a patient (Demo Mode)
export const getPatientBookings = async (patient_id: string) => {
  if (DEMO_MODE) {
    await simulateAsync(null, 300);
    return mockBookings.filter(booking => booking.patient_id === patient_id);
  }
  
  try {
    const res = await databases.listDocuments(
      databaseID,
      bookingTableCollection,
      [Query.equal("patient_id", [patient_id])]
    );
    return res.documents;
  } catch (error) {
    return [];
  }
};

// Update a booking (Demo Mode)
export const updateBooking = async (
  booking_id: string,
  data: { rating?: number; review?: string }
) => {
  if (DEMO_MODE) {
    await simulateAsync(null, 400);
    const bookingIndex = mockBookings.findIndex(b => b.booking_id === booking_id);
    if (bookingIndex >= 0) {
      mockBookings[bookingIndex] = {
        ...mockBookings[bookingIndex],
        ...data,
        $updatedAt: new Date().toISOString()
      };
      return mockBookings[bookingIndex];
    }
    return null;
  }
  
  try {
    return await databases.updateDocument(
      databaseID,
      bookingTableCollection,
      booking_id,
      data
    );
  } catch (error) {
    throw new Error("Failed to update booking");
  }
};

// Get all doctor reviews (Demo Mode)
export const getAllDoctorReviews = async () => {
  if (DEMO_MODE) {
    await simulateAsync(null, 200);
    return mockReviews;
  }
  
  try {
    const res = await databases.listDocuments(
      databaseID,
      bookingTableCollection
      // No query here!
    );
    // Filter in JS for only those with rating and review
    return res.documents.filter(doc =>
      typeof doc.rating === "number" &&
      doc.rating >= 0 &&
      doc.review &&
      doc.review.trim().length > 0
    );
  } catch {
    return [];
  }
};