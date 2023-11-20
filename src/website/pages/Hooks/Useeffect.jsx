import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UseEffect() {
  const [timer, setTimer] = useState("");
  const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   console.log(data.users);
  // }, [data]);

  useEffect(() => {
    setInterval(() => {
      setTimer(dayjs().format("HH:mm:ss"));
    }, 1000);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://dummyjson.com/users");
        console.log("Response", response);
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="App mt-3">
        <h1>UseEffect</h1>
        <hr className="mb-4" />
        <div
          className={` container col-md-8`}
          style={{
            padding: "40px 60px",
          }}
        >
          <h3>Live Time</h3>
          <h3>{timer}</h3>
        </div>
        <br />
        <br />
        <div
          className={` container col-md-8`}
          style={{
            padding: "40px 60px",
          }}
        >
          <h3>Calling API</h3>
          <div className="group mt-3  m-2 row row-cols-2">
            {users?.map((item) => (
              <div className={` card  `} key={item.id}>
                <img src={item.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.username}</h5>
                  <p className="card-text">
                    Name :- {item.firstName} {item.maidenName} {item.lastName}{" "}
                    <br />
                    Email :- {item.email} <br />
                    Phone:-{item.phone}
                  </p>
                  <button className="btn btn-primary">
                    {" "}
                    <Link
                      to="/details"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {" "}
                      More Details...{" "}
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br /> <br />
      </div>
    </div>
  );
}

export default UseEffect;
