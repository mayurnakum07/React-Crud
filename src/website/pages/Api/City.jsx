import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

function City({ loading, setLoading, btnLoading, setBtnLoading, theme }) {
  const [cityData, setCityData] = useState([]);

  const feachCityData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://api.metaestate.ai/api/v1/city");
      setCityData(response.data.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    feachCityData();
  }, []);

  const deleteCityData = async (id) => {
    try {
      setBtnLoading(id);
      const response = await axios.delete(
        `https://api.metaestate.ai/api/v1/city/${id}`
      );
      feachCityData();
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
        <h1 className="text-center mt-4">Citys</h1>
        {loading ? (
          <div style={{ position: "absolute", right: "50%" }}>
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/addCity">
              <Button className="mb-3 float-end">Add New Data</Button>
            </Link>
            <br />
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
                  <th>City-name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cityData.map((item) => (
                  <tr key={item.city_id}>
                    <td>{item.city_id}</td>
                    <td>{item.master_state.master_country.country_name}</td>
                    <td>{item.master_state.state_name}</td>
                    <td>{item.city_name}</td>
                    <td>
                      <Link to={`/updateCity/${item.city_id}`}>
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
                        onClick={() => deleteCityData(item.city_id)}
                        disabled={btnLoading === item.city_id}
                      >
                        {btnLoading === item.city_id ? (
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

export default City;
