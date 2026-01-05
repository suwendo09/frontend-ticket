import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  const iconStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    padding: "8px",
    backgroundColor: "#22c55e",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconHoverStyle = {
    backgroundColor: "#16a34a",
    transform: "scale(1.1)",
  };

  return (
    <footer className="mt-auto" style={{ backgroundColor: "#16a34a", color: "#fff", padding: "40px 0" }}>
      <Container>
        <Row className="text-center text-md-start align-items-center">
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">TicketApp</h5>
            <p>Aplikasi pemesanan tiket terbaik untuk konser, seminar, workshop, dan festival.</p>
          </Col>

          <Col md={4} className="mb-3">
            <h5 className="fw-bold">Navigasi</h5>
            <ul className="list-unstyled">
              <li><a href="#hero" style={{ color: "#fff", textDecoration: "none" }}>Beranda</a></li>
              <li><a href="#events" style={{ color: "#fff", textDecoration: "none" }}>Event</a></li>
              <li><a href="#contact" style={{ color: "#fff", textDecoration: "none" }}>Kontak</a></li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <h5 className="fw-bold">Ikuti Kami</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={iconStyle}
                onMouseEnter={e => Object.assign(e.currentTarget.style, iconHoverStyle)}
                onMouseLeave={e => Object.assign(e.currentTarget.style, iconStyle)}
              >
                <img 
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" 
                  alt="Facebook" 
                  style={{ width: "20px", height: "20px", filter: "invert(1)" }} 
                />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/suwendo_wend?igsh=MXF0MDRyejUzbjB5MQ=="
                target="_blank"
                rel="noopener noreferrer"
                style={iconStyle}
                onMouseEnter={e => Object.assign(e.currentTarget.style, iconHoverStyle)}
                onMouseLeave={e => Object.assign(e.currentTarget.style, iconStyle)}
              >
                <img 
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" 
                  alt="Instagram" 
                  style={{ width: "20px", height: "20px", filter: "invert(1)" }} 
                />
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={iconStyle}
                onMouseEnter={e => Object.assign(e.currentTarget.style, iconHoverStyle)}
                onMouseLeave={e => Object.assign(e.currentTarget.style, iconStyle)}
              >
                <img 
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg" 
                  alt="Twitter" 
                  style={{ width: "20px", height: "20px", filter: "invert(1)" }} 
                />
              </a>
            </div>
          </Col>
        </Row>
        <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />
        <p className="text-center mb-0">&copy; 2025 TicketApp. All Rights Reserved.</p>
      </Container>
    </footer>
  );
}
