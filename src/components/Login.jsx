import React, { useState, useEffect } from "react";
import { createOTP, login, getUserData } from "../lib/appwrite";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [phoneNo, setPhoneNo] = useState("");
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: enter phone, 2: enter OTP, 3: show user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Zustand store
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const id = await createOTP(phoneNo);
      setUserId(id);
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(userId, otp);
      const userData = await getUserData();
      setUser(userData); // update Zustand store
      setStep(3);
    } catch (err) {
      setError(err.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login with Phone</h2>
      {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
      {step === 1 && (
        <form onSubmit={handleSendOTP}>
          <label style={{ display: "block", marginBottom: 8 }}>
            Phone Number:
            <input
              type="tel"
              value={phoneNo}
              onChange={e => setPhoneNo(e.target.value)}
              placeholder="Enter phone number"
              style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 16 }}
              required
            />
          </label>
          <button type="submit" disabled={loading} style={{ width: "100%", padding: 10, background: "#4f8cff", color: "#fff", border: "none", borderRadius: 4 }}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleVerifyOTP}>
          <label style={{ display: "block", marginBottom: 8 }}>
            Enter OTP:
            <input
              type="text"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              placeholder="Enter OTP received"
              style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 16 }}
              required
            />
          </label>
          <button type="submit" disabled={loading} style={{ width: "100%", padding: 10, background: "#4f8cff", color: "#fff", border: "none", borderRadius: 4 }}>
            {loading ? "Verifying..." : "Verify & Login"}
          </button>
        </form>
      )}
      {step === 3 && user && (
        <div>
          <h3 style={{ marginBottom: 12 }}>User Data:</h3>
          <pre style={{ background: "#f6f8fa", padding: 12, borderRadius: 4, fontSize: 14 }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
