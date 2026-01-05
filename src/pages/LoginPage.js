import { Container, Form, Button, Card, Image } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo ticket app.jpeg";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [animateLogo, setAnimateLogo] = useState(false);

  useEffect(() => {
    setAnimateLogo(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Masukkan username dan password!");
      return;
    }

    const success = login({ username, password });
    if (success) {
      navigate("/profile"); // login berhasil → tampil profil
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: 350, borderRadius: "20px" }}>
        <div
          className="d-flex flex-column align-items-center mb-4"
          style={{
            transform: animateLogo ? "translateY(0)" : "translateY(-50px)",
            opacity: animateLogo ? 1 : 0,
            transition: "all 0.8s ease-out",
          }}
        >
          <Image
            src={logo}
            roundedCircle
            style={{ width: 80, height: 80, objectFit: "cover", boxShadow: "0 4px 12px rgba(0,0,0,0.25)" }}
          />
          <h3 className="fw-bold mt-2 text-success">TicketApp</h3>
        </div>

        <h4 className="mb-4 text-center fw-bold">Login</h4>

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Button type="submit" className="w-100 rounded-pill mt-2 fw-bold" variant="success">Login</Button>
        </Form>

        <p className="mt-3 text-center">
          Belum punya akun? <Link to="/signin">Daftar</Link>
        </p>
      </Card>
    </Container>
  );
}
