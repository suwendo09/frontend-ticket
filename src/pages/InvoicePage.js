// InvoicePage.js
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { useLocation } from "react-router-dom";

// Import QR code image
import qrImage from "../assets/qr code.jpg";

export default function InvoicePage() {
  const location = useLocation();
  const purchase = location.state;

  if (!purchase) {
    return (
      <Container className="my-5 text-center">
        <h3>Invoice tidak ditemukan!</h3>
      </Container>
    );
  }

  // Tanggal invoice otomatis
  const invoiceDate = purchase.date
    ? new Date(purchase.date)
    : new Date();

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="fw-bold mb-4 text-center">Invoice Tiket</h2>

          {/* Ringkasan Pembelian */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">Ringkasan Pembelian</h5>

              {/* NOMOR INVOICE (PALING ATAS) */}
              <p>
                <strong>Nomor Invoice:</strong>{" "}
                <span
                  style={{
                    backgroundColor: "#d6eaf8",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontWeight: "600",
                  }}
                >
                  {purchase.invoiceNumber}
                </span>
              </p>

              {/* NAMA PEMBELI */}
              <p>
                <strong>Nama:</strong> {purchase.buyerName}
              </p>

              {/* TANGGAL */}
              <p>
                <strong>Tanggal:</strong>{" "}
                {invoiceDate.toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <div className="mb-2 d-flex gap-2 align-items-center">
                <Badge bg="success">{purchase.event?.category}</Badge>
                <span className="fw-bold">{purchase.event?.title}</span>
              </div>

              {/* Nama tiket */}
              {purchase.ticketName && (
                <p>
                  <strong>Nama Tiket:</strong> {purchase.ticketName}
                </p>
              )}

              <p>
                <strong>Jumlah Tiket:</strong> {purchase.quantity}
              </p>

              <p>
                <strong>Total Harga:</strong>{" "}
                <span className="fw-bold text-success">
                  Rp {purchase.totalPrice.toLocaleString("id-ID")}
                </span>
              </p>

              <p>
                <strong>Metode Pembayaran:</strong> {purchase.paymentMethod}
              </p>

              {/* QR CODE */}
              <div className="text-center mt-4">
                <p className="mb-2 fw-bold">
                  Tunjukan QR Code ini ke petugas saat anda berada di area
                </p>
                <img
                  src={qrImage}
                  alt="QR Code Tiket"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
