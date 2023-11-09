import { Container } from "react-bootstrap";

function Storage() {
  // const formik = useFormik({
  //   initialValues: {
  //     file: null,
  //   },
  //   validationSchema: Yup.object({
  //     file: Yup.mixed().required(),
  //   }),
  //   onSubmit: (values) => {
  //     console.log("Storage-values", values);
  //     handleStore(values.file);
  //     formik.resetForm();
  //   },
  // });

  // const handleStore = async (file) => {
  //   const fileRef = storageRef(`personal/${file.name}`);
  //   console.log(fileRef);
  //   try {
  //     await fileRef.put(file);
  //     toast.success("Upload successfully");
  //   } catch (error) {
  //     toast.error(error.message);
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <Container className="col-md-6">
        <h1 className="text-center mt-4 mb-5">Cloud Storage</h1>
      </Container>
    </div>
  );
}

export default Storage;

/* <form onSubmit={formik.handleSubmit}>
          <input
            name="file"
            type="file"
            className="form-control"
            // value={formik.values.file}
            onChange={(e) => {
              formik.setFieldValue("file", e.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.file && formik.errors.file ? (
            <p className="text-danger">{formik.errors.file}</p>
          ) : null}
          <br />
          <Button type="submit">Upload</Button>
          <br />

          {formik.values.file && (
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <img src={URL.createObjectURL(formik.values.file)} alt="" />
              </Card.Body>
            </Card>
          )}
        </form> */
