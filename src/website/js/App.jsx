import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../pages/css/App.css";
import Dashboard from "../pages/Home/Dashboard";
import FireStoreData from "../pages/Firebase/FireStoreData";
import FireStoreForm from "../Pages/Firebase/FireStoreForm";
import RealTimeData from "../Pages/Firebase/RealtimeData";
import RealtimeForm from "../Pages/Firebase/RealtimeForm";
import LoginAuth from "../Pages/Auth/Login-Auth";
import SignupAuth from "../Pages/Auth/Signup-Auth";
import Country from "../pages/Api/Country";
import CountryForm from "../pages/Api/CountryForm";
import State from "../pages/Api/State";
import StateForms from "../pages/Api/StateForm";
import City from "../pages/Api/City";
import CityForm from "../pages/Api/CityForm";
import { auth } from "../library/init-firebase";
import { getAuth, signOut } from "firebase/auth";
import { useDarkMode } from "../theme/Theme";
import Usestate from "../pages/Hooks/Usestate";
import UseEffect from "../pages/Hooks/Useeffect";
import Useref from "../pages/Hooks/Useref";
import Usereducer from "../pages/Hooks/Usereducer";
import Manubar from "../pages/home/Manubar";
export default function App() {
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(null);
  const [userName, setUserName] = useState("");
  const { isDarkTable, toggleDarkTable } = useDarkMode();

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
      <Manubar name={userName} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/useState" element={<Usestate />} />
        <Route path="/useEffect" element={<UseEffect />} />
        <Route path="/useRef" element={<Useref />} />
        <Route path="/useReducer" element={<Usereducer />} />

        <Route
          path="/firestoreData"
          element={
            <FireStoreData
              loading={loading}
              setLoading={setLoading}
              btnLoading={btnLoading}
              setBtnLoading={setBtnLoading}
              theme={isDarkTable}
              toggle={toggleDarkTable}
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
              theme={isDarkTable}
              toggle={toggleDarkTable}
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
        <Route
          path="/country"
          element={
            <Country
              loading={loading}
              setLoading={setLoading}
              btnLoading={btnLoading}
              setBtnLoading={setBtnLoading}
              theme={isDarkTable}
              toggle={toggleDarkTable}
            />
          }
        />
        <Route
          path="/updateCountry/:id"
          element={<CountryForm loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/addCountry"
          element={<CountryForm loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/state"
          element={
            <State
              loading={loading}
              setLoading={setLoading}
              btnLoading={btnLoading}
              setBtnLoading={setBtnLoading}
              theme={isDarkTable}
              toggle={toggleDarkTable}
            />
          }
        />
        <Route
          path="/addState"
          element={<StateForms loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/updateState/:id"
          element={<StateForms loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/city"
          element={
            <City
              loading={loading}
              setLoading={setLoading}
              btnLoading={btnLoading}
              setBtnLoading={setBtnLoading}
              theme={isDarkTable}
              toggle={toggleDarkTable}
            />
          }
        />
        <Route
          path="/addCity"
          element={<CityForm loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/updateCity/:id"
          element={<CityForm loading={loading} setLoading={setLoading} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
