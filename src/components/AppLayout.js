import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

export default function AppLayout() {
  const location = useLocation();

  // Footer hanya tampil di HomePage ("/")
  const showFooter = location.pathname === "/";

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Halaman yang di-render */}
      <div className="flex-grow-1">
        <Outlet />
      </div>

      {/* Footer hanya muncul di "/" */}
      {showFooter && <Footer />}
    </div>
  );
}
