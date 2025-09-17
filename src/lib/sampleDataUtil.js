#!/usr/bin/env node
import { databases } from "./appwrite";

const databaseID = "6824ee070017a8b56e75";
const doctorDetailsCollection = "6824f18600264fbb6788";
const doctorAvailabilityTableCollection = "6824f390002cdc2ac392";

const doctorNames = [
    ["Amit", "Sharma"],
    ["Priya", "Verma"],
    ["Rahul", "Gupta"],
    ["Sneha", "Patel"],
    ["Vikram", "Singh"],
    ["Anjali", "Mehra"],
    ["Rohit", "Jain"],
    ["Pooja", "Chopra"],
    ["Suresh", "Yadav"],
    ["Neha", "Agarwal"]
];
const specialities = [
    "Cardiologist", "Dermatologist", "Neurologist", "Pediatrician", "Orthopedic",
    "Gynecologist", "ENT", "Psychiatrist", "Dentist", "General Physician"
];
const degrees = [
    "MBBS, MD", "MBBS, MS", "MBBS, DM", "MBBS, DNB", "MBBS, MCh",
    "MBBS, DGO", "MBBS, DLO", "MBBS, DPM", "BDS, MDS", "MBBS"
];
const colleges = [
    "AIIMS Delhi", "CMC Vellore", "KGMU Lucknow", "JIPMER", "PGI Chandigarh",
    "Grant Medical College", "Maulana Azad Medical College", "BHU", "AFMC Pune", "SMS Jaipur"
];
const profileUrls = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg",
    "https://randomuser.me/api/portraits/women/6.jpg",
    "https://randomuser.me/api/portraits/men/7.jpg",
    "https://randomuser.me/api/portraits/women/8.jpg",
    "https://randomuser.me/api/portraits/men/9.jpg",
    "https://randomuser.me/api/portraits/women/10.jpg"
];

const hospitals = [
    "AIIMS Delhi", "CMC Vellore", "KGMU Lucknow", "JIPMER", "PGI Chandigarh",
    "Grant Medical College", "Maulana Azad Medical College", "BHU", "AFMC Pune", "SMS Jaipur"
];

// Helper to generate timeslots for a doctor
function generateTimeslots(doctor_id) {
    // Use a variety of working_days and working_hours for demo
    const workingDaysArr = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Monday-Wednesday", "Thursday-Friday", "Saturday", "Sunday", "Friday-Sunday"
    ];
    const workingHoursArr = [
        "15:00-16:00", "16:00-17:00", "17:00-18:00", "10:00-12:00", "09:00-11:00",
        "14:00-15:00", "11:00-12:00", "13:00-14:00", "08:00-09:00", "18:00-19:00"
    ];
    const slots = [];
    for (let i = 0; i < 3; i++) { // 3 slots per doctor
        slots.push({
            timeslot_id: `${doctor_id}_slot${i + 1}`,
            doctor_id,
            working_days: workingDaysArr[(i + doctor_id.charCodeAt(doctor_id.length - 1)) % workingDaysArr.length],
            working_hours: workingHoursArr[(i + doctor_id.charCodeAt(doctor_id.length - 1)) % workingHoursArr.length]
        });
    }
    return slots;
}

export async function loadSampleDoctorsAndSlots() {
    // 1. Create 10 doctors
    for (let i = 0; i < 10; i++) {
        const doctor_id = `doc${i + 1}`;
        await databases.createDocument(
            databaseID,
            doctorDetailsCollection,
            doctor_id,
            {
                doctor_id,
                first_name: doctorNames[i][0],
                last_name: doctorNames[i][1],
                speciality: specialities[i],
                experience: 2 + i, // 2-11 years
                degree: degrees[i],
                college: colleges[i],
                posted_at: hospitals[i], // hospital name
                profile_url: profileUrls[i]
            }
        );
        // 2. Create 3 timeslots per doctor
        const slots = generateTimeslots(doctor_id);
        for (const slot of slots) {
            await databases.createDocument(
                databaseID,
                doctorAvailabilityTableCollection,
                slot.timeslot_id,
                slot
            );
        }
    }
    return true;
}

// Allow running as a standalone script (Node/Vite compatible)
if (import.meta.url.endsWith('sampleDataUtil.js')) {
    (async () => {
        try {
            console.log("Loading sample doctors and slots into Appwrite...");
            await loadSampleDoctorsAndSlots();
            console.log("Sample data loaded successfully.");
        } catch (err) {
            console.error("Error loading sample data:", err);
        }
    })();
}
