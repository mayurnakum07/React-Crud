import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import "../css/Header.css";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../theme/Theme";
import { useEffect } from "react";
function Header({ name, handleLogout }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    document.body.className = isDarkMode ? "Dark-mode" : "Light-mode";
    return () => {
      document.body.className = "";
    };
  }, [isDarkMode]);

  return (
    <div>
      <Navbar
        bg="dark"
        expand="lg"
        data-bs-theme="dark"
        className="header-main"
      >
        <Container className="header-content">
          <Navbar.Brand href="/" className="header-brand">
            <i
              className="fa-brands fa-react fa-spin"
              style={{ color: "#FFFF", fontSize: "35px" }}
            ></i>
            React Crud
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 manu-bar"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link to="/" style={{ color: "white", fontSize: "20px" }}>
                  Home
                </Link>
              </Nav.Link>

              <Dropdown>
                <Dropdown.Toggle
                  variant="transparent"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  Firebase
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to="/firestoreData" className="link-deep">
                      Firestoredata
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/realTimeData" className="link-deep">
                      Realtime-data
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/cloudStorage" className="link-deep">
                      {" "}
                      Cloud-storage{" "}
                    </Link>
                  </Dropdown.Item>
                  <hr className="dropdown-divider" />
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  variant="transparent"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  Apis
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to="/country" className="link-deep">
                      Country-data
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/state" className="link-deep">
                      {" "}
                      State-data{" "}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/city" className="link-deep">
                      {" "}
                      City-data{" "}
                    </Link>
                  </Dropdown.Item>
                  <hr className="dropdown-divider" />
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
            {name ? (
              <div className=" mt-2 d-flex align-items-center">
                <h4 className="text-white">{name}</h4>
                <Dropdown>
                  <Dropdown.Toggle variant="transparent">
                    <i
                      className="fa-solid fa-ellipsis-vertical m-2"
                      style={{ color: "#ffff", fontSize: "20px" }}
                    ></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link to="loginAuth" className="link-deep">
                        Switch account
                      </Link>
                    </Dropdown.Item>
                    <hr className="dropdown-divider" />
                    <Dropdown.Item
                      onClick={() => handleLogout()}
                      className="link-deep"
                    >
                      <i className="fa-solid fa-power-off text-danger"></i>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <div className="d-flex">
                <h4 className="text-white m-1">Guest</h4>
                <Link to="/loginAuth">
                  <Button className="float-start">Login</Button>
                </Link>
              </div>
            )}

            <div onClick={toggleDarkMode}>
              <div className={`${isDarkMode ? "icon" : "icon"}`}>
                {" "}
                {isDarkMode ? (
                  <i className="bi bi-sun-fill"></i>
                ) : (
                  <i className="bi bi-moon-stars-fill"></i>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
