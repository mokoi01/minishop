import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function register(nama, email, password) {
    // Cek apakah email sudah terdaftar
    const penggunaTersimpan = localStorage.getItem("user");

    if (penggunaTersimpan) {
      const pengguna = JSON.parse(penggunaTersimpan);

      if (pengguna.email === email) {
        return {
          success: false,
          message: "Email sudah terdaftar",
        };
      }
    }

    // Simpan data pengguna
    const dataUser = {
      nama: nama,
      email: email,
      password: password,
    };

    localStorage.setItem("user", JSON.stringify(dataUser));

    return {
      success: true,
      message: "Registrasi berhasil!",
    };
  }

  function login(email, password) {
    const penggunaTersimpan = localStorage.getItem("user");

    if (!penggunaTersimpan) {
      return {
        success: false,
        message: "Akun belum terdaftar",
      };
    }

    const pengguna = JSON.parse(penggunaTersimpan);

    if (pengguna.email === email && pengguna.password === password) {
      setUser({
        nama: pengguna.nama,
        email: pengguna.email,
      });

      return {
        success: true,
        message: "Login berhasil!",
      };
    }

    return {
      success: false,
      message: "Email atau password salah",
    };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}