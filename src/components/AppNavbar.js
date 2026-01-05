// src/components/AppNavbar.js
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo ticket app.jpeg"; // path sesuai nama file baru

export default function AppNavbar() {
  const { user } = useContext(AuthContext);

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
      <Container>
        {/* Navbar Brand dengan Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold text-success fs-4 d-flex align-items-center"
        >
          <img
            src={logo}
            alt="TicketApp Logo"
            width={40}
            height={40}
            style={{ marginRight: "10px", objectFit: "cover", borderRadius: "50%" }}
          />
          Ticket<span className="text-dark">App</span>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-lg-center gap-lg-3">
            <Nav.Link
              as={NavLink}
              to="/"
              className={({ isActive }) =>
                isActive ? "fw-semibold text-success" : "text-dark"
              }
            >
              Home
            </Nav.Link>

            {!user && (
              <Button
                as={Link}
                to="/login"
                variant="success"
                className="px-4 rounded-pill"
              >
                Login
              </Button>
            )}

            {user && (
              <Link
                to="/profile"
                className="d-flex align-items-center justify-content-center text-decoration-none"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid #28a745",
                  backgroundColor: "#e6f4ea",
                  color: "#28a745",
                  fontSize: "20px",
                }}
              >
                👤
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
