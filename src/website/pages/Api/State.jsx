/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

function State({
  loading,
  setLoading,
  btnLoading,
  setBtnLoading,
  theme,
  toggle,
}) {
  const [stateData, setStateData] = useState([]);

  const feachStateData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        " https://api.metaestate.ai/api/v1/state"
      );
      setStateData(response.data.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    feachStateData();
  }, []);

  const deleteState = async (id) => {
    try {
      setBtnLoading(id);
      const response = await axios.delete(
        ` https://api.metaestate.ai/api/v1/state/${id}`
      );
      feachStateData();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBtnLoading(null);
    }
  };

  return (
    <div>
      <Container>
        <h1 className="text-center mt-4">States</h1>
        {loading ? (
          <div style={{ position: "absolute", right: "50%" }}>
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/addState">
              <Button className="float-end  mb-3">Add New Data</Button>
            </Link>
            <br />

            <div
              onClick={toggle}
              className={`${theme ? "icon2" : "icon2"} float-start`}
            >
              {theme ? (
                <i className="bi bi-sun-fill"></i>
              ) : (
                <i className="bi bi-moon-stars-fill"></i>
              )}
            </div>

            <table
              className={`table ${
                theme && "table-dark"
              } table-hover table-bordered text-center`}
            >
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>country-name</th>
                  <th>State-name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {stateData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.state_id}</td>
                    <td>{item.master_country?.country_name}</td>
                    <td>{item.state_name}</td>
                    <td>
                      <Link to={`/updateState/${item.state_id}`}>
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
                        onClick={() => deleteState(item.state_id)}
                        disabled={btnLoading === item.state_id}
                      >
                        {btnLoading === item.state_id ? (
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

export default State;
