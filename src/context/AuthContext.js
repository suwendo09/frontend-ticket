import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  // USER LOGIN
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // RIWAYAT PEMBELIAN
  const [purchases, setPurchases] = useState(() => {
    const stored = localStorage.getItem("purchases");
    return stored ? JSON.parse(stored) : [];
  });

  // SIGNUP
  const signup = ({ fullname, username, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some(u => u.username === username)) {
      alert("Username sudah digunakan!");
      return false;
    }

    users.push({ fullname, username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Akun berhasil dibuat, silahkan login.");
    return true;
  };

  // LOGIN
  const login = ({ username, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      u => u.username === username && u.password === password
    );

    if (!found) return false;

    const userData = {
      username: found.username,
      fullname: found.fullname,
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", "dummy-token");

    return true;
  };

  // LOGOUT (RESET DATA)
  const logout = () => {
    setUser(null);
    clearPurchases(); // ⬅️ RIWAYAT IKUT DIHAPUS
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // TAMBAH PEMBELIAN
  const addPurchase = (purchase) => {
    const updated = [...purchases, purchase];
    setPurchases(updated);
    localStorage.setItem("purchases", JSON.stringify(updated));
  };

  // HAPUS SEMUA RIWAYAT
  const clearPurchases = () => {
    setPurchases([]);
    localStorage.removeItem("purchases");
  };

  // HAPUS 1 INVOICE
  const deletePurchaseByInvoice = (invoiceNumber) => {
    const filtered = purchases.filter(
      p => p.invoiceNumber !== invoiceNumber
    );
    setPurchases(filtered);
    localStorage.setItem("purchases", JSON.stringify(filtered));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        purchases,
        addPurchase,
        clearPurchases,
        deletePurchaseByInvoice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
