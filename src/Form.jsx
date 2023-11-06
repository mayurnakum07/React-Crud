import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

function Form() {
  const [firebaseData, setFirebaseData] = useState([]);
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
      postData(values);
      formik.resetForm();
    },
  });

  const postData = async (data) => {
    try {
      const response = await axios.post(
        "https://react-firebase-eee38-default-rtdb.firebaseio.com/React-Firebase.json",
        data
      );
      toast.success("Data posted successfully");
      console.log("Data posted successfully:", response);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://react-firebase-eee38-default-rtdb.firebaseio.com/React-Firebase.json"
      );
      const dataArray = [];
      for (const key in response.data) {
        if (response.data[key]) {
          dataArray.push({ ...response.data[key], id: key });
        }
      }
      setFirebaseData(dataArray);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Container className="mt-5 col-md-6">
        <h1 className="text-center mb-4">Firebase Form</h1>
        <ToastContainer />
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

          <Button type="submit" className="w-50 offset-md-3">
            Submit-Data
          </Button>
        </form>
        <br />
        <br />
        <hr />
      </Container>
      <Container>
        <h1 className="text-center mb-4">Firebase Data</h1>
        <table className="table table-hover table-bordered text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile no.</th>
              <th>Message</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {firebaseData.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>{item.message}</td>
                <td>
                  <Button>
                    Edit{" "}
                    <i
                      className="fa-solid fa-pen-to-square"
                      style={{ color: "white" }}
                    ></i>
                  </Button>
                </td>
                <td>
                  <Button className="bg-danger">
                    Delete{" "}
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "white" }}
                    ></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
}

export default Form;
