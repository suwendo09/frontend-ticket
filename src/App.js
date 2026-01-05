import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import AppLayout from "./components/AppLayout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import EventDetailPage from "./pages/EventDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import InvoicePage from "./pages/InvoicePage";
import PurchaseHistoryPage from "./pages/PurchaseHistoryPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentPage from "./pages/PaymentPage"; // pastikan import PaymentPage

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <Routes>
        {/* Semua halaman dibungkus AppLayout agar footer muncul */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-history"
            element={
              <ProtectedRoute>
                <PurchaseHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route path="/event/:id" element={<EventDetailPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice"
            element={
              <ProtectedRoute>
                <InvoicePage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Halaman PaymentPage tidak pakai AppLayout agar full screen QR */}
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
