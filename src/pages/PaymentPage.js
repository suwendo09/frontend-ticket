import { useEffect, useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import qrImage from "../assets/qr code.jpg";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addPurchase } = useContext(AuthContext);

  const purchase = location.state;

  useEffect(() => {
    if (!purchase) {
      navigate("/", { replace: true });
      return;
    }

    // ⏳ simulasi pembayaran 5 detik
    const timer = setTimeout(() => {
      // 🔥 SIMPAN KE PURCHASE HISTORY
      addPurchase(purchase);

      // 🔥 PINDAH KE INVOICE
      navigate("/invoice", { state: purchase });
    }, 5000);

    return () => clearTimeout(timer);
  }, [purchase, navigate, addPurchase]);

  if (!purchase) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <h3>Data pembayaran tidak ditemukan</h3>
      </Container>
    );
  }

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6}>
          <Card className="shadow-sm text-center p-4">
            <h4 className="mb-3">Scan QR Code untuk membayar</h4>

            <img
              src={qrImage}
              alt="QR Code Pembayaran"
              style={{ width: "200px", height: "200px", margin: "0 auto" }}
            />

            <p className="mt-3">
              Setelah pembayaran, invoice akan otomatis muncul.
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
