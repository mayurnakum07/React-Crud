/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

function StateForms({ loading, setLoading }) {
  const [countryData, setCountryData] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      country_id: "",
      state_name: "",
    },
    validationSchema: Yup.object({
      country_id: Yup.string().trim().min(2).max(20).required(),
      state_name: Yup.string().trim().min(2).max(20).required(),
    }),
    onSubmit: (values) => {
      console.log("submitted-State", values);
      if (location.pathname === "/addState") {
        addNewState(values);
      } else updateStateData(values);
    },
  });

  const feachCountryData = async () => {
    try {
      const response = await axios.get(
        " https://api.metaestate.ai/api/v1/country"
      );
      setCountryData(response.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    feachCountryData();
  }, []);

  const addNewState = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.metaestate.ai/api/v1/state",
        {
          country_id: data.country_id,
          state_name: data.state_name,
        }
      );
      formik.resetForm();
      toast.success(response.data.message);
      navigate("/state");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const feachStateById = async () => {
    try {
      const response = await axios.get(
        `https://api.metaestate.ai/api/v1/state/getStateByID?state_id=${id}`
      );
      formik.setFieldValue(
        "country_id",
        response.data.data.master_country.country_id
      );
      formik.setFieldValue("state_name", response.data.data.state_name);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateStateData = async (data) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `https://api.metaestate.ai/api/v1/state/${id}`,
        data
      );
      toast.success(response.data.message);
      navigate("/state");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname !== "/addState") {
      feachStateById();
    }
  }, [location.pathname]);

  return (
    <div>
      <Container className="col-md-6">
        <h1 className="text-center mt-4 mb-3">
          {" "}
          {location.pathname === "/addState" ? "Add New" : "Update"} State
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <label className="form-label">Select Country</label>
          <select
            className="form-select"
            name="country_id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country_id}
          >
            <option hidden>Choose Country...</option>
            {countryData.map((item) => (
              <option key={item.country_id} value={item.country_id}>
                {item.country_name}
              </option>
            ))}
          </select>{" "}
          {formik.touched.country_id && formik.errors.country_id ? (
            <p className="text-danger">{formik.errors.country_id}</p>
          ) : null}
          <br />
          <label className="form-label">State</label>
          <input
            type="text"
            name="state_name"
            value={formik.values.state_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control"
          />{" "}
          {formik.touched.state_name && formik.errors.state_name ? (
            <p className="text-danger">{formik.errors.state_name}</p>
          ) : null}
          <br />
          <Button type="submit" className="w-50 offset-md-3 mt-3">
            {loading ? (
              <div className="d-flex gap-2 align-items-center justify-content-center">
                <Spinner animation="border" role="status"></Spinner>
                <span> Loading...</span>
              </div>
            ) : (
              <div>
                {location.pathname === "/addState" ? "Submit" : "Update"} Data
              </div>
            )}
          </Button>
        </form>
          <br />
      </Container>
    </div>
  );
}

export default StateForms;
