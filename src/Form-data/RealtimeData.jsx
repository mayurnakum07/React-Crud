import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import { Link } from "react-router-dom";

function RealTimeData({ loading, setLoading, btnLoading, setBtnLoading }) {
  const [realTimeData, setRealTimeData] = useState([]);

  const getRealtimeData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://react-firestore-e8f9e-default-rtdb.firebaseio.com/react-firestore.json"
      );
      const dataArray = [];
      for (const key in response.data) {
        if (response.data[key]) {
          dataArray.push({ ...response.data[key], id: key });
        }
      }
      setRealTimeData(dataArray);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteRealtimeData = async (id) => {
    try {
      setBtnLoading(id);
      const response = await axios.delete(
        `https://react-firestore-e8f9e-default-rtdb.firebaseio.com/react-firestore/${id}.json`
      );
      getRealtimeData();
      console.log(response);
      toast.success("Data deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBtnLoading(null);
    }
  };

  useEffect(() => {
    getRealtimeData();
  }, []);

  return (
    <div>
      <Container className="mt-4">
        <h1 className="text-center mb-4">Realtime Data</h1>
        {loading ? (
          <div style={{ position: "absolute", right: "50%" }}>
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/realTimeForm">
              <Button className="mb-3 float-end">Add New Data</Button>
            </Link>
            <br />

            <table className="table table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile no.</th>
                  <th>Message</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {realTimeData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.number}</td>
                    <td>{item.message}</td>
                    <td>
                      <Button
                        className="bg-danger"
                        onClick={() => deleteRealtimeData(item.id)}
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
          </div>
        )}
      </Container>
    </div>
  );
}

export default RealTimeData;
