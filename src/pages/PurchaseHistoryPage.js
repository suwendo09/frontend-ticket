import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function PurchaseHistoryPage() {
  const { purchases } = useContext(AuthContext);

  if (!purchases || purchases.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h3 style={{ color: "#34495e" }}>Belum ada riwayat pembelian</h3>
        <Button
          as={Link}
          to="/"
          variant="success"
          className="mt-3 rounded-pill px-4 fw-bold"
          style={{
            background: "linear-gradient(90deg, #2ecc71, #27ae60)",
            border: "none",
          }}
        >
          Kembali ke Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#2c3e50" }}>
        Riwayat Pembelian
      </h2>

      <Row className="g-4">
        {purchases
          .slice() // copy array
          .reverse() // terbaru di atas
          .map((purchase, idx) => (
            <Col key={idx} xs={12} md={6}>
              <Card
                className="shadow-lg h-100"
                style={{
                  borderRadius: "15px",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Card.Body>
                  {/* Judul Event */}
                  <h5 className="fw-bold mb-2" style={{ color: "#27ae60" }}>
                    {purchase.event?.title || "Event tidak tersedia"}
                  </h5>

                  <Badge
                    bg="success"
                    className="mb-3"
                    style={{ fontSize: "0.9rem", padding: "0.4em 0.6em" }}
                  >
                    {purchase.event?.category || "-"}
                  </Badge>

                  {/* NOMOR INVOICE (DIPINDAH KE ATAS) */}
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <span>Nomor Invoice:</span>
                    <span
                      style={{
                        backgroundColor: "#d6eaf8",
                        color: "#2c3e50",
                        padding: "4px 10px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                      }}
                    >
                      {purchase.invoiceNumber ?? "-"}
                    </span>
                  </div>

                  {/* JUMLAH TIKET */}
                  <div className="mb-2 d-flex justify-content-between">
                    <span>Jumlah Tiket:</span>
                    <span>{purchase.quantity ?? "-"}</span>
                  </div>

                  {/* TOTAL HARGA */}
                  <div className="mb-2 d-flex justify-content-between">
                    <span>Total Harga:</span>
                    <span className="fw-bold" style={{ color: "#2ecc71" }}>
                      Rp{" "}
                      {purchase.totalPrice?.toLocaleString("id-ID") ?? "-"}
                    </span>
                  </div>

                  {/* METODE BAYAR */}
                  <div className="mb-3 d-flex justify-content-between">
                    <span>Metode Bayar:</span>
                    <span>{purchase.paymentMethod ?? "-"}</span>
                  </div>

                  {/* BUTTON DETAIL */}
                  <Button
                    as={Link}
                    to="/invoice"
                    state={purchase}
                    className="w-100 rounded-pill fw-bold"
                    style={{
                      background:
                        "linear-gradient(90deg, #3498db, #2980b9)",
                      border: "none",
                      color: "#fff",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "linear-gradient(90deg, #2980b9, #3498db)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "linear-gradient(90deg, #3498db, #2980b9)")
                    }
                  >
                    Lihat Detail
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
