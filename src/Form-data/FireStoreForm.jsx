import { useFormik } from "formik";
import { Button, Container, Spinner } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import "../App.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { formDataRef } from "../lib/firestore.collaction";
import { toast } from "react-toastify";
import { db } from "../lib/init-firebase";
import { useEffect } from "react";

function FireStoreForm({ loading, setLoading }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().min(8).max(25).required(),
      email: Yup.string().email().trim().required(),
      password: Yup.string()
        .min(8)
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%*!?&])[a-zA-Z0-9@#$%*!?&]{8,}$/
        ),
      age: Yup.number().positive().integer().required().min(18).max(60),
      message: Yup.string().trim().min(10).max(300).required(),
    }),
    onSubmit: async (values) => {
      console.log("Form-values", values);
      setLoading(true);
      if (location.pathname === "/addFireStoreData") {
        try {
          await addDoc(formDataRef, values);
          toast.success("Data added successfully");
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        try {
          const docRef = doc(db, "form-data", id);
          await setDoc(docRef, values);
          toast.success("Data updated successfully");
        } catch (error) {
          toast.error(error.message);
        }
      }
      setLoading(false);
      formik.resetForm();
      navigate("/");
    },
  });

  const fetchDataById = async () => {
    try {
      const response = await getDoc(doc(db, "form-data", id));
      const data = response.data();
      formik.setFieldValue("name", data.name);
      formik.setFieldValue("email", data.email);
      formik.setFieldValue("password", data.password);
      formik.setFieldValue("age", data.age);
      formik.setFieldValue("message", data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (location.pathname !== "/addFireStoreData") {
      fetchDataById();
    }
  }, [location.pathname]);

  return (
    <div>
      <Container className="mt-5 col-md-6">
        <h1 className="text-center mb-4">
          {location.pathname === "/addFireStoreData" ? "Add new" : "Update"}{" "}
          data
        </h1>
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

          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-danger">{formik.errors.password}</p>
          ) : null}
          <br />

          <label className="form-label">Age</label>
          <input
            type="number"
            name="age"
            className="form-control"
            placeholder="Enter your age"
            onChange={(e) => {
              if (e.target.value.length <= 2) {
                formik.handleChange(e);
              }
            }}
            value={formik.values.age}
            onBlur={formik.handleBlur}
          />
          {formik.touched.age && formik.errors.age ? (
            <p className="text-danger">{formik.errors.age}</p>
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
              <div>
                {location.pathname === "/addFireStoreData"
                  ? "Submit"
                  : "Update"}{" "}
                Data
              </div>
            )}
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default FireStoreForm;
