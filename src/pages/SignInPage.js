import { Container, Form, Button, Card, Image } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo ticket app.jpeg";

export default function SignInPage() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [animateLogo, setAnimateLogo] = useState(false);

  useEffect(() => {
    setAnimateLogo(true);
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!fullname || !username || !password || !confirmPassword) {
      alert("Harap isi semua field!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password dan Konfirmasi Password tidak sama!");
      return;
    }

    const success = signup({ fullname, username, password });
    if (success) {
      navigate("/login"); // setelah daftar → ke login dulu
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

        <h4 className="mb-4 text-center fw-bold">Sign In</h4>

        <Form onSubmit={handleSignIn}>
          <Form.Group className="mb-3">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control type="text" placeholder="Masukkan nama lengkap" value={fullname} onChange={(e) => setFullname(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Konfirmasi Password</Form.Label>
            <Form.Control type="password" placeholder="Masukkan kembali password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Group>

          <Button type="submit" className="w-100 rounded-pill mt-2 fw-bold" variant="success">Buat Akun</Button>
        </Form>

        <p className="mt-3 text-center">
          Sudah punya akun? <Link to="/login">Login</Link>
        </p>
      </Card>
    </Container>
  );
}
