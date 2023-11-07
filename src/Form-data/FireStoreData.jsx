import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { formDataRef } from "../lib/firestore.collaction";
import { Link } from "react-router-dom";
import { db } from "../lib/init-firebase";
import { toast } from "react-toastify";

function FireStoreData({ loading, setLoading, btnLoading, setBtnLoading }) {
  const [firestoreData, setFirestoreData] = useState([]);
  useEffect(() => {
    console.log("FireStoreData", firestoreData);
  }, [firestoreData]);

  const getFormData = async () => {
    setLoading(true);
    try {
      const response = await getDocs(formDataRef);
      const data = response.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      setFirestoreData(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFormData();
  }, []);

  const deleteFormData = async (id) => {
    const docRef = doc(db, "form-data", id);
    try {
      setBtnLoading(id);
      await deleteDoc(docRef);
      getFormData();
      toast.success("Data deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBtnLoading(null);
    }
  };

  return (
    <div>
      <Container>
        <h1 className="text-center mt-4">FireStore Data</h1>
        {loading ? (
          <div style={{ position: "absolute", right: "50%" }}>
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/addFireStoreData">
              <Button className="mb-3 float-end">Add New Data</Button>
            </Link>
            <br />

            <table className="table table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Age</th>
                  <th>Message</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {firestoreData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.data.name}</td>
                    <td>{item.data.email}</td>
                    <td>{item.data.password}</td>
                    <td>{item.data.age}</td>
                    <td>{item.data.message}</td>
                    <td>
                      <Link to={`/updateData/${item.id}`}>
                        <Button>
                          Edit{" "}
                          <i
                            className="fa-solid fa-pen-to-square"
                            style={{ color: "white" }}
                          ></i>
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        className="bg-danger"
                        onClick={() => deleteFormData(item.id)}
                        disabled={btnLoading === item.id}
                      >
                        {btnLoading === item.id ? (
                          <Spinner animation="border" size="sm"></Spinner>
                        ) : (
                          <div>
                            Delete{" "}
                            <i
                              className="fa-solid fa-trash"
                              style={{ color: "white" }}
                            ></i>
                          </div>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
          </div>
        )}
      </Container>
    </div>
  );
}

export default FireStoreData;
