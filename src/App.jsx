import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./Form-data/Header";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { useState } from "react";
import FireStoreData from "./Form-data/FireStoreData";
import RealTimeData from "./Form-data/RealtimeData";
import FireStoreForm from "./Form-data/FireStoreForm";
import RealtimeForm from "./Form-data/RealtimeForm";
export default function App() {
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(null);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
