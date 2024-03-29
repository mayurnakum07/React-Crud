/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../css/App.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";

function RealtimeForm({ loading, setLoading }) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().min(8).max(25).required(),
      email: Yup.string().email().trim().required(),
      number: Yup.number().positive().integer().required(),
      message: Yup.string().trim().min(10).max(300).required(),
    }),
    onSubmit: (values) => {
      console.log("Form-values", values);
      postRealTimeData(values);
      navigate("/realTimeData");
      formik.resetForm();
    },
  });

  const postRealTimeData = async (values) => {
    try {
      setLoading(true);
      await axios.post(
        "https://react-firestore-e8f9e-default-rtdb.firebaseio.com/react-firestore.json",
        values
      );
      toast.success("Data posted successfully");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Container className="mt-5 col-md-6">
        <h1 className="text-center mb-4">Firebase Form</h1>
        <form onSubmit={formik.handleSubmit}>
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter your full name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-danger">{formik.errors.name}</p>
          ) : null}
          <br />

          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email address"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-danger">{formik.errors.email}</p>
          ) : null}
          <br />
          <label className="form-label">Mobile Number</label>
          <div className="input-group">
            <span className="input-group-text">+91</span>
            <input
              type="text"
              name="number"
              className="form-control"
              placeholder="Enter your mobile number"
              onChange={formik.handleChange}
              value={formik.values.number}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.number && formik.errors.number ? (
            <p className="text-danger">{formik.errors.number}</p>
          ) : null}
          <br />

          <label className="form-label">Message</label>
          <textarea
            type="text"
            name="message"
            className="form-control"
            placeholder="Your message here... "
            onChange={formik.handleChange}
            value={formik.values.message}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.message && formik.errors.message ? (
            <p className="text-danger">{formik.errors.message}</p>
          ) : null}
          <br />

          <Button type="submit" className="w-50 offset-md-3 mt-3">
            {loading ? (
              <div className="d-flex gap-2 align-items-center justify-content-center">
                <Spinner animation="border" role="status"></Spinner>
                <span> Loading...</span>
              </div>
            ) : (
              <div>Submit Data</div>
            )}
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default RealtimeForm;
