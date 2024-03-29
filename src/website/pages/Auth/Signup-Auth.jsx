/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../library/init-firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function SignupAuth({ loading, setLoading }) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().min(3).required(),
      email: Yup.string().trim().required(),
      password: Yup.string().min(8).trim().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      try {
        const create = await createUserWithEmailAndPassword(
          auth,
          formik.values.email,
          formik.values.password
        );
        await updateProfile(create.user, {
          displayName: formik.values.name,
        });
        console.log("create", create);
        toast.success("create account & login successfully");
        navigate("/");
      } catch (error) {
        toast.error("Sorry,this account already exist ");
      }
      setLoading(false);
      formik.resetForm();
    },
  });

  return (
    <div>
      <Container>
        <h1 className="text-center mt-4 mb-4">Sign up</h1>
        <Link to="/loginAuth">
          <Button className="mb-3 float-end">Login</Button>
        </Link>
        <Container className="col-md-6 mt-5">
          <form onSubmit={formik.handleSubmit}>
            <label className="form-label">name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter your name"
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
              name="email"
              type="text"
              className="form-control"
              placeholder="Enter your email"
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
              name="password"
              type="password"
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
            <Button
              type="submit"
              className="w-50 offset-md-3 mt-3"
              disabled={loading === true}
            >
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
      </Container>
    </div>
  );
}

export default SignupAuth;
