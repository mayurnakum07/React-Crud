import  { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

function CityForm({ loading, setLoading }) {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      country_id: "",
      state_id: "",
      city_name: "",
    },
    validationSchema: Yup.object({
      country_id: Yup.string().trim().min(2).max(20).required(),
      state_id: Yup.string().trim().min(2).max(20).required(),
      city_name: Yup.string().trim().min(2).max(20).required(),
    }),
    onSubmit: (values) => {
      console.log("submitted-citys", values);
      if (location.pathname === "/addCity") {
        addNewCity(values);
      } else updateCityData(values);
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

  const feachSateData = async (id) => {
    try {
      if (id) {
        const response = await axios.get(
          `  https://api.metaestate.ai/api/v1/state/StateByCountryId/${id}`
        );
        setStateData(response.data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    feachSateData(formik.values.country_id);
  }, [formik.values.country_id]);

  const addNewCity = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.metaestate.ai/api/v1/city",
        {
          country_id: data.country_id,
          state_id: data.state_id,
          city_name: data.city_name,
        }
      );
      formik.resetForm();
      toast.success(response.data.message);
      navigate("/city");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const feachCityById = async () => {
    try {
      const response = await axios.get(
        ` https://api.metaestate.ai/api/v1/city/CityByCityId?city_id=${id}`
      );
      formik.setFieldValue(
        "country_id",
        response.data.data.master_state.master_country.country_id
      );
      formik.setFieldValue(
        "state_id",
        response.data.data.master_state.state_id
      );
      formik.setFieldValue("city_name", response.data.data.city_name);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateCityData = async (data) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `https://api.metaestate.ai/api/v1/city/${id}`,
        data
      );
      toast.success(response.data.message);
      navigate("/city");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname !== "/addCity") {
      feachCityById();
    }
  }, [location.pathname]);

  return (
    <div>
      <Container className="col-md-6">
        <h1 className="text-center mt-4 mb-3">
          {" "}
          {location.pathname === "/addCity" ? "Add New" : "Update"} City
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
            <option hidden>Choose country</option>
            {countryData.map((item) => (
              <option key={item.country_id} value={item.country_id}>
                {item.country_name}
              </option>
            ))}
          </select>
          {formik.touched.country_id && formik.errors.country_id ? (
            <p className="text-danger">{formik.errors.country_id}</p>
          ) : null}
          <br />
          <label className="form-label">Select State</label>
          <select
            name="state_id"
            className="form-select"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.state_id}
          >
            <option hidden>Choose State</option>
            {stateData.map((item) => (
              <option key={item.state_id} value={item.state_id}>
                {item.state_name}
              </option>
            ))}
          </select>
          <br />
          {formik.touched.state_id && formik.errors.state_id ? (
            <p className="text-danger">{formik.errors.state_id}</p>
          ) : null}
          <label className="form-label">City</label>
          <input
            type="text"
            name="city_name"
            className="form-control"
            value={formik.values.city_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city_name && formik.errors.city_name ? (
            <p className="text-danger">{formik.errors.city_name}</p>
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
                {location.pathname === "/addCity" ? "Sumbit" : "Update"} Data
              </div>
            )}
          </Button>
        </form>
        <br />
      </Container>
    </div>
  );
}

export default CityForm;
