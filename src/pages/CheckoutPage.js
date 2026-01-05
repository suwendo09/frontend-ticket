import { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Badge } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const event = location.state?.event;
  const quantityFromState = location.state?.quantity || 1;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [quantity, setQuantity] = useState(quantityFromState);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (event) {
      const numericPrice = parseInt(event.price.replace(/\./g, ""));
      setTotalPrice(numericPrice * quantity);
    }
  }, [quantity, event]);

  if (!event) {
    return (
      <Container className="my-5 text-center">
        <h3>Data event tidak ditemukan!</h3>
      </Container>
    );
  }

  const handleBayar = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Anda harus login dulu!");
      navigate("/login");
      return;
    }
    if (!paymentMethod) {
      alert("Pilih metode pembayaran terlebih dahulu!");
      return;
    }

    // Buat object purchase untuk diteruskan ke PaymentPage
    const purchase = {
      event,
      quantity,
      totalPrice,
      paymentMethod,
      invoiceNumber: "INV-" + Date.now(),
      buyerName: user?.fullname || "Guest",
    };

    navigate("/payment", { state: purchase });
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="fw-bold mb-4 text-center">Checkout Tiket</h2>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5>Ringkasan Event</h5>
              <div className="mb-2 d-flex gap-2 align-items-center">
                <Badge bg="success">{event.category}</Badge>
                <span className="fw-bold">{event.title}</span>
              </div>
              <h4 className="text-success fw-bold">Rp {event.price}</h4>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Jumlah Tiket & Metode Pembayaran</h5>
              <Form.Group className="mb-3">
                <Form.Label>Jumlah Tiket</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </Form.Group>

              <Form>
                <p className="mb-2 fw-semibold">Pilih Metode Pembayaran:</p>
                {["Transfer Bank", "GoPay", "OVO", "DANA"].map((method) => (
                  <Form.Check
                    key={method}
                    type="radio"
                    id={method}
                    name="payment"
                    label={method}
                    className="mb-2"
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                ))}
              </Form>

              <div className="mt-3 p-3 bg-light text-center rounded shadow-sm">
                <h5>Total Harga:</h5>
                <h3 className="text-success fw-bold">Rp {totalPrice.toLocaleString("id-ID")}</h3>
              </div>
            </Card.Body>
          </Card>

          <div className="text-center">
            <Button
              variant="success"
              className="px-5 rounded-pill fw-bold"
              size="lg"
              onClick={handleBayar}
            >
              Bayar Sekarang
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
