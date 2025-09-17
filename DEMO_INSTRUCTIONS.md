# Demo Mode Instructions for MediLink

Your MediLink application is now running in **DEMO MODE** to bypass Appwrite credits. Here's how to demo the application:

## Demo Credentials
- **Phone Number**: Any phone number (e.g., 9876543210)
- **OTP**: Any 6-digit number (e.g., 123456)

## Demo User Profile
- **Name**: John Doe
- **Age**: 28
- **Phone**: 9876543210
- **Location**: Gwalior, MP

## Available Features in Demo Mode

### 1. Login Process
- Enter any phone number on the login page
- Enter any OTP (the system will accept any code)
- You'll be logged in as the demo user

### 2. Patient Profile
- The demo user already has a complete profile
- You can view and edit the profile information
- Changes will be simulated (not actually saved)

### 3. Browse Doctors
- 10 sample doctors across different specialties:
  - Cardiologist (Dr. Amit Sharma)
  - Dermatologist (Dr. Priya Verma)
  - Neurologist (Dr. Rahul Gupta)
  - Pediatrician (Dr. Sneha Patel)
  - Orthopedic (Dr. Vikram Singh)
  - Gynecologist (Dr. Anjali Mehra)
  - ENT (Dr. Rohit Jain)
  - Psychiatrist (Dr. Pooja Chopra)
  - Dentist (Dr. Suresh Yadav)
  - General Physician (Dr. Neha Agarwal)

### 4. Book Appointments
- Search by disease/symptom (e.g., "heart", "skin", "fever")
- The system will recommend appropriate specialists
- All bookings are simulated
- Available time slots are shown for each doctor

### 5. Patient Reviews
- Demo user has 2 completed appointments with ratings
- 1 pending appointment for rating
- Sample reviews from other patients are displayed on the homepage

## Disease-to-Doctor Mapping
The system intelligently maps diseases to specialists:
- **Heart problems** → Cardiologist
- **Skin issues** → Dermatologist  
- **Brain/headache** → Neurologist
- **Child-related** → Pediatrician
- **Bone/joint** → Orthopedic
- **Women's health** → Gynecologist
- **Ear/nose/throat** → ENT
- **Mental health** → Psychiatrist
- **Dental** → Dentist
- **General symptoms** → General Physician

## Demo Limitations
- Data is not persistent (resets on page refresh)
- No real SMS/OTP integration
- No actual appointment scheduling
- All network delays are simulated

## Switching Back to Live Mode
To switch back to using Appwrite:
1. Open `src/lib/appwrite.ts`
2. Change `const DEMO_MODE = true;` to `const DEMO_MODE = false;`
3. Ensure your Appwrite credentials are valid

## Stakeholder Demo Flow
1. **Login**: Show the simple phone + OTP process
2. **Dashboard**: Display the clean, modern interface
3. **Search**: Demonstrate intelligent doctor recommendation
4. **Booking**: Show easy appointment booking
5. **Reviews**: Highlight patient feedback system
6. **Profile**: Show comprehensive patient data management

The application is fully functional in demo mode and will provide a smooth demonstration experience for your stakeholders!