import { Container, Row, Col, Badge, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

// Import gambar lokal
import konserMusikImg from "../assets/konser musik.jpg";
import seminarTechImg from "../assets/seminar tech it.jpg";
import workshopCodingImg from "../assets/workshop coding.jpg";
import festivalSeniImg from "../assets/festival seni.jpg";
import konserJazzImg from "../assets/konser jazz.jpg";
import seminarAIImg from "../assets/seminar ai.jpg";

export default function HomePage() {
  const eventsSectionRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState([]);

  const events = [
    { id: 1, title: "Konser Musik Nasional", price: "150.000", category: "Music", img: konserMusikImg, description: "Nikmati konser musik terbesar tahun ini dengan artis papan atas Indonesia." },
    { id: 2, title: "Seminar Teknologi IT", price: "75.000", category: "Tech", img: seminarTechImg, description: "Belajar tren terbaru di dunia teknologi dan IT bersama pakar industri." },
    { id: 3, title: "Workshop Coding Profesional", price: "100.000", category: "Workshop", img: workshopCodingImg, description: "Tingkatkan kemampuan coding Anda dengan praktisi berpengalaman." },
    { id: 4, title: "Festival Seni", price: "120.000", category: "Art", img: festivalSeniImg, description: "Rayakan kreativitas dalam festival seni terbesar di kota." },
    { id: 5, title: "Konser Jazz", price: "200.000", category: "Music", img: konserJazzImg, description: "Nikmati malam penuh musik jazz dengan musisi terkenal." },
    { id: 6, title: "Seminar AI & Machine Learning", price: "90.000", category: "Tech", img: seminarAIImg, description: "Pelajari AI dan machine learning langsung dari pakarnya." },
  ];

  const scrollToEvents = () => {
    eventsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fade-in animation saat scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight - 100;
      const newVisible = events.map((_, idx) => {
        const el = document.getElementById(`event-card-${idx}`);
        if (el && el.offsetTop < scrollPos) return idx;
        return null;
      }).filter(v => v !== null);
      setVisibleCards(newVisible);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* HERO SECTION */}
      <div className="py-5 text-white text-center" style={{ background: "linear-gradient(135deg, #4ade80, #16a34a)" }}>
        <Container>
          <h1 className="fw-bold mb-3 display-5 animate__animated animate__fadeInDown">Temukan Event Favoritmu</h1>
          <p className="fs-5 mb-4 animate__animated animate__fadeInUp">Konser • Seminar • Workshop • Festival</p>
          <Button 
            variant="light" 
            className="px-5 py-2 rounded-pill fw-bold shadow-sm"
            onClick={scrollToEvents}
            style={{ transition: "0.3s" }}
          >
            Lihat Semua Event
          </Button>
        </Container>
      </div>

      {/* EVENT LIST */}
      <Container className="my-5 flex-grow-1" ref={eventsSectionRef}>
        <h3 className="mb-4 fw-bold text-dark text-center">Event Terbaru</h3>
        <Row className="g-4 justify-content-center">
          {events.map((event, idx) => (
            <Col 
              key={event.id} 
              xs={12} sm={6} md={4} 
              id={`event-card-${idx}`}
              style={{ 
                opacity: visibleCards.includes(idx) ? 1 : 0, 
                transform: visibleCards.includes(idx) ? "translateY(0px)" : "translateY(50px)", 
                transition: "all 0.8s ease-in-out"
              }}
            >
              <div 
                className="card h-100 shadow-sm border-0"
                style={{ 
                  transition: "transform 0.3s, box-shadow 0.3s", 
                  cursor: "pointer", 
                  borderRadius: "15px", 
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 20px 30px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
                }}
              >
                <img 
                  src={event.img} 
                  className="card-img-top" 
                  alt={event.title} 
                  style={{ height: "220px", objectFit: "cover" }} 
                />
                <div className="card-body d-flex flex-column">
                  <div className="mb-2">
                    <Badge 
                      style={{ 
                        background: "linear-gradient(90deg, #22c55e, #16a34a)", 
                        color: "white", 
                        fontWeight: "500",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.2)"
                      }}
                    >
                      {event.category}
                    </Badge>
                  </div>
                  <h5 className="card-title fw-bold">{event.title}</h5>

                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{event.description}</Tooltip>}
                  >
                    <p className="text-muted small mb-2">{event.description.slice(0, 60)}...</p>
                  </OverlayTrigger>

                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <p className="text-success fw-bold fs-5 mb-0" style={{ background: "#d1fae5", padding: "4px 10px", borderRadius: "10px" }}>
                      Rp {event.price}
                    </p>
                    <Button 
                      as={Link} 
                      to={`/event/${event.id}`} 
                      state={{ event }} 
                      variant="success" 
                      className="rounded-pill shadow-sm"
                      style={{ transition: "0.3s" }}
                    >
                      Detail
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      </div>
  );
}
