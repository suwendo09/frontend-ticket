import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function ProfilePage() {
  const { user, logout, purchases, clearPurchases } = useContext(AuthContext);
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) setAvatar(storedAvatar);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleClearHistory = () => {
    if (window.confirm("Yakin ingin menghapus SEMUA riwayat pembelian?")) {
      clearPurchases();
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      localStorage.setItem("avatar", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const totalTickets = purchases.reduce(
    (sum, p) => sum + (p.quantity || 0),
    0
  );

  return (
    <Container className="my-5">
      <Card className="p-4 shadow-lg mx-auto" style={{ maxWidth: 500, borderRadius: 20 }}>
        <h3 className="text-center text-success fw-bold mb-4">Profil Saya</h3>

        {/* Avatar */}
        <div className="text-center mb-4 position-relative">
          <img
            src={avatar || "https://via.placeholder.com/100?text=👤"}
            alt="avatar"
            className="rounded-circle"
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
          <Form.Label
            htmlFor="avatarInput"
            className="position-absolute bottom-0 end-0 bg-success text-white rounded-circle p-1"
            style={{ cursor: "pointer" }}
          >
            ✏️
          </Form.Label>
          <Form.Control
            type="file"
            id="avatarInput"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Info */}
        <Row className="mb-2">
          <Col><strong>Nama Lengkap</strong></Col>
          <Col className="text-end">{user.fullname}</Col>
        </Row>
        <Row className="mb-2">
          <Col><strong>Username</strong></Col>
          <Col className="text-end">{user.username}</Col>
        </Row>
        <Row className="mb-4">
          <Col><strong>Total Tiket Dibeli</strong></Col>
          <Col className="text-end">{totalTickets}</Col>
        </Row>

        <Button
          as={Link}
          to="/purchase-history"
          variant="success"
          className="w-100 mb-3 rounded-pill fw-bold"
        >
          Lihat Riwayat Pembelian
        </Button>

        <Button
          variant="danger"
          className="w-100 rounded-pill fw-bold"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Card>
    </Container>
  );
}
