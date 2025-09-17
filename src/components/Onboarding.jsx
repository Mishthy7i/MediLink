import React, { useState, useEffect } from "react";
import { createPatientDetails, updatePatientDetails, getPatientDetails } from "../lib/appwrite";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

const requiredFields = [
  "first_name", "last_name", "age", "marital_status", "weight", "height",
  "gender", "mobile_no", "address", "allergic_to", "medical_history"
];

const initialState = {
  first_name: "",
  last_name: "",
  age: '',
  marital_status: false,
  weight: "",
  height: "",
  gender: "", // changed from false to empty string
  mobile_no: "",
  address: "",
  allergic_to: "",
  medical_history: "",
};

export default function Onboarding() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [missing, setMissing] = useState([]);
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

  useEffect(() => {
    const fetchPatient = async () => {
      if (user) {
        const patient = await getPatientDetails(user.$id);
        if (patient) {
          setForm({
            ...initialState,
            ...patient,
            age: patient.age || '',
            weight: patient.weight || '',
            height: patient.height || '',
            gender: patient.gender || "", // ensure gender is string
          });
          setMissing(requiredFields.filter(field => patient[field] === undefined || patient[field] === null || patient[field] === ""));
        } else {
          setMissing(requiredFields);
        }
      }
    };
    fetchPatient();
    // eslint-disable-next-line
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (missing.includes(name) && value !== "" && value !== undefined && value !== null) {
      setMissing(missing.filter(f => f !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const cleanForm = { ...form };
      delete cleanForm.$id;
      delete cleanForm.$collectionId;
      delete cleanForm.$databaseId;
      delete cleanForm.$createdAt;
      delete cleanForm.$updatedAt;
      const payload = {
        ...cleanForm,
        age: parseInt(form.age, 10),
        weight: parseFloat(form.weight),
        height: parseFloat(form.height),
        patient_id: user.$id,
        gender: form.gender, // already string
      };
      const existing = await getPatientDetails(user.$id);
      if (existing) {
        await updatePatientDetails(user.$id, payload);
      } else {
        await createPatientDetails(user.$id, payload);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to save details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <div className="card w-full max-w-xl bg-base-100 shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">Patient Onboarding</h2>
        {error && <div className="alert alert-error mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="form-control">
            <span>First Name{missing.includes("first_name") && <span className="text-error">*</span>}</span>
            <input className="input input-bordered" name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name" required />
          </label>
          <label className="form-control">
            <span>Last Name{missing.includes("last_name") && <span className="text-error">*</span>}</span>
            <input className="input input-bordered" name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" required />
          </label>
          <label className="form-control">
            <span>Age{missing.includes("age") && <span className="text-error">*</span>}</span>
            <input className="input input-bordered" name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" required />
          </label>
          <label className="form-control">
            <span>Weight (kg){missing.includes("weight") && <span className="text-error">*</span>}</span>
            <input className="input input-bordered" name="weight" type="number" value={form.weight} onChange={handleChange} placeholder="Weight (kg)" required />
          </label>
          <label className="form-control">
            <span>Height (cm){missing.includes("height") && <span className="text-error">*</span>}</span>
            <input className="input input-bordered" name="height" type="number" value={form.height} onChange={handleChange} placeholder="Height (cm)" required />
          </label>
          <label className="form-control">
            <span>Mobile No{missing.includes("mobile_no") && <span className="text-error">*</span>}</span>
            <input className="input input-bordered" name="mobile_no" value={form.mobile_no} onChange={handleChange} placeholder="Mobile No" required />
          </label>
          <label className="form-control col-span-2">
            <span>Address{missing.includes("address") && <span className="text-error">*</span>}</span>
            <input className="input input-bordered" name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
          </label>
          <label className="form-control col-span-2">
            <span>Allergic To{missing.includes("allergic_to") && <span className="text-error">*</span>}</span>
            <input className="input input-bordered" name="allergic_to" value={form.allergic_to} onChange={handleChange} placeholder="Allergic To" />
          </label>
          <label className="form-control col-span-2">
            <span>Medical History{missing.includes("medical_history") && <span className="text-error">*</span>}</span>
            <input className="input input-bordered" name="medical_history" value={form.medical_history} onChange={handleChange} placeholder="Medical History" />
          </label>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Married?{missing.includes("marital_status") && <span className="text-error">*</span>}</span>
              <input type="checkbox" name="marital_status" checked={form.marital_status} onChange={handleChange} className="checkbox ml-2" />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Gender{missing.includes("gender") && <span className="text-error">*</span>}</span>
              <select name="gender" value={form.gender} onChange={handleChange} className="select select-bordered ml-2" required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          <button type="submit" className="btn btn-primary col-span-2 mt-4" disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}