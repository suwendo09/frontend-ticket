import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Badge, Button, Form } from "react-bootstrap";
import { useState } from "react";

// Import gambar lokal
import konserMusikImg from "../assets/konser musik.jpg";
import seminarTechImg from "../assets/seminar tech it.jpg";
import workshopCodingImg from "../assets/workshop coding.jpg";
import festivalSeniImg from "../assets/festival seni.jpg";
import konserJazzImg from "../assets/konser jazz.jpg";
import seminarAIImg from "../assets/seminar ai.jpg";

export default function EventDetailPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const events = [
    { id: 1, title: "Konser Musik Nasional", price: "150.000", category: "Music", description: "Nikmati konser musik terbesar tahun ini dengan artis papan atas Indonesia.", img: konserMusikImg },
    { id: 2, title: "Seminar Teknologi IT", price: "75.000", category: "Tech", description: "Belajar tren terbaru di dunia teknologi dan IT bersama pakar industri.", img: seminarTechImg },
    { id: 3, title: "Workshop Coding Profesional", price: "100.000", category: "Workshop", description: "Tingkatkan kemampuan coding Anda dengan praktisi berpengalaman.", img: workshopCodingImg },
    { id: 4, title: "Festival Seni", price: "120.000", category: "Art", description: "Rayakan kreativitas dalam festival seni terbesar di kota.", img: festivalSeniImg },
    { id: 5, title: "Konser Jazz", price: "200.000", category: "Music", description: "Nikmati malam penuh musik jazz dengan musisi terkenal.", img: konserJazzImg },
    { id: 6, title: "Seminar AI & Machine Learning", price: "90.000", category: "Tech", description: "Pelajari AI dan machine learning langsung dari pakarnya.", img: seminarAIImg },
  ];

  const event = events.find((e) => e.id === parseInt(id));
  if (!event) return <Container className="my-4"><h5>Event tidak ditemukan</h5></Container>;

  return (
    <Container className="my-4" style={{ maxWidth: "650px" }}>
      {/* Gambar Event */}
      <div className="mb-4 rounded shadow-sm overflow-hidden" style={{ transition: "transform 0.3s" }}>
        <img
          src={event.img}
          alt={event.title}
          className="img-fluid w-100"
          style={{ objectFit: "cover", height: 220, borderRadius: "12px" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        />
      </div>

      {/* Info Event */}
      <Row className="g-3">
        <Col xs={12}>
          <h3 className="fw-bold">{event.title}</h3>
          <Badge
            style={{
              background: "linear-gradient(90deg, #22c55e, #16a34a)",
              color: "white",
              fontWeight: "500",
              boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
              fontSize: "0.9rem",
            }}
            className="mb-2"
          >
            {event.category}
          </Badge>

          <p className="text-muted mb-1"><i className="bi bi-geo-alt-fill"></i> Lokasi: Jakarta • Offline</p>
          <p className="text-muted mb-2"><i className="bi bi-calendar-event-fill"></i> Tanggal: 20 Desember 2025</p>
          <p>{event.description}</p>
        </Col>

        {/* Card Harga & Beli Tiket */}
        <Col xs={12}>
          <div className="p-3 rounded shadow-sm" style={{ background: "#f0fdf4", transition: "transform 0.2s" }}>
            <h5 className="text-success fw-bold mb-3">Rp {event.price}</h5>

            <Form.Group className="mb-3">
              <Form.Label>Jumlah Tiket</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </Form.Group>

            <Button
              as={Link}
              to="/checkout"
              state={{ event, quantity }}
              variant="success"
              size="md"
              className="w-100 rounded-pill fw-semibold shadow-sm"
              style={{ transition: "0.3s" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              Beli Tiket
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
