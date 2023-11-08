import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./Form-data/Header";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import { useEffect, useState } from "react";
import FireStoreData from "./Form-data/FireStoreData";
import RealTimeData from "./Form-data/RealtimeData";
import FireStoreForm from "./Form-data/FireStoreForm";
import RealtimeForm from "./Form-data/RealtimeForm";
import SignupAuth from "./Form-data/Auth/Signup-Auth";
import LoginAuth from "./Form-data/Auth/Login-Auth";
import { auth } from "./lib/init-firebase";
import { getAuth, signOut } from "firebase/auth";
export default function App() {
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
    });
  });

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      toast.success("Logout successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header name={userName} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <FireStoreData
              loading={loading}
              setLoading={setLoading}
              btnLoading={btnLoading}
              setBtnLoading={setBtnLoading}
            />
          }
        />
        <Route
          path="/addFireStoreData"
          element={<FireStoreForm loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/updateData/:id"
          element={<FireStoreForm loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/realTimeData"
          element={
            <RealTimeData
              loading={loading}
              setLoading={setLoading}
              btnLoading={btnLoading}
              setBtnLoading={setBtnLoading}
            />
          }
        />
        <Route
          path="/realTimeForm"
          element={<RealtimeForm loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/signupAuth"
          element={<SignupAuth loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/loginAuth"
          element={<LoginAuth loading={loading} setLoading={setLoading} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
