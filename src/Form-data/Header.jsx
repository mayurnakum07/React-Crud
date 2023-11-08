import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import { Link } from "react-router-dom";
function Header({ name, handleLogout }) {
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
            Hooks Example
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 manu-bar"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link to="/"> FireStore-data </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/realTimeData"> Realtime-Database </Link>
              </Nav.Link>
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
                      <Link to="loginAuth">Switch account</Link>
                    </Dropdown.Item>
                    <hr className="dropdown-divider" />
                    <Dropdown.Item onClick={() => handleLogout()}>
                      <i
                        className="fa-solid fa-power-off text-danger"
                        style={{ fontSize: "18px" }}
                      ></i>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
