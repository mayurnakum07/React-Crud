import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

function Country({ loading, setLoading, btnLoading, setBtnLoading }) {
  const [countryData, setCountryData] = useState([]);

  const feachCountryData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.metaestate.ai/api/v1/country"
      );
      setCountryData(response.data.data);
    } catch (error) {
      toast.error("Api Not Feached");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    feachCountryData();
  }, []);

  const deleteCountry = async (id) => {
    try {
      setBtnLoading(id);
      const response = await axios.delete(
        `https://api.metaestate.ai/api/v1/country/${id}`
      );
      feachCountryData();
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
        <h1 className="text-center mt-4">Countrys & Currency</h1>
        {loading ? (
          <div style={{ position: "absolute", right: "50%" }}>
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/addCountry">
              <Button className="mb-3 float-end">Add New Data</Button>
            </Link>
            <br />
            <table className="table table-hover table-bordered text-center">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>country-name</th>
                  <th>currency-name</th>
                  <th>currency-code</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {countryData.map((item) => (
                  <tr key={item.country_id}>
                    <th>{item.country_id}</th>
                    <td>{item.country_name}</td>
                    <td>{item.currency_name}</td>
                    <td>{item.currency_code}</td>
                    <td>
                      <Link
                        to={`/updateCountry/${item.country_id}`}
                        className="text-white"
                      >
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
                        onClick={() => deleteCountry(item.country_id)}
                        className="bg-danger"
                        disabled={btnLoading === item.country_id}
                      >
                        {btnLoading === item.country_id ? (
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

export default Country;
