import  { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function CountryForm({ loading, setLoading }) {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      country_name: "",
      currency_name: "",
      currency_code: "",
    },
    validationSchema: Yup.object({
      country_name: Yup.string().trim().min(2).max(20).required(),
      currency_name: Yup.string().trim().min(2).max(20).required(),
      currency_code: Yup.number().positive().min(11111).max(99999).integer().required(),
    }),

    onSubmit: (values) => {
      console.log("Submitting-Country", values);
      if (location.pathname === "/addCountry") {
        addNewCountry(values);
      } else updateCountryData(values);
    },
  });

  const addNewCountry = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.metaestate.ai/api/v1/country",
        data
      );
      formik.resetForm();
      toast.success(response.data.message);
      navigate("/country");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountryById = async () => {
    try {
      const response = await axios.get(
        `https://api.metaestate.ai/api/v1/country/getCountryByID?country_id=${id}`
      );
      formik.setFieldValue("country_name", response.data.data.country_name);
      formik.setFieldValue("currency_name", response.data.data.currency_name);
      formik.setFieldValue("currency_code", response.data.data.currency_code);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateCountryData = async (data) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `https://api.metaestate.ai/api/v1/country/${id}`,
        data
      );
      formik.resetForm();
      navigate("/country");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname !== "/addCountry") {
      fetchCountryById();
    }
  }, [location.pathname]);

  return (
    <div>
      <Container className="col-md-6">
        <h1 className="text-center m-4">
          {location.pathname === "/addCountry" ? "Add New " : "Edit"} Country
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <label className="form-label">country_name</label>
          <input
            type="text"
            name="country_name"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.country_name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.country_name && formik.errors.country_name ? (
            <p className="text-danger">{formik.errors.country_name}</p>
          ) : null}
          <br />

          <label className="form-label">currency_name</label>
          <input
            type="text"
            name="currency_name"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.currency_name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.currency_name && formik.errors.currency_name ? (
            <p className="text-danger">{formik.errors.currency_name}</p>
          ) : null}
          <br />

          <label className="form-label">currency_code</label>
          <input
            type="number"
            name="currency_code"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.currency_code}
            onBlur={formik.handleBlur}
          />
          {formik.touched.currency_code && formik.errors.currency_code ? (
            <p className="text-danger">{formik.errors.currency_code}</p>
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
                {location.pathname === "/addCountry" ? "Submit" : "Update"} Data
              </div>
            )}
          </Button>
        </form>
        <br />
      </Container>
    </div>
  );
}

export default CountryForm;
