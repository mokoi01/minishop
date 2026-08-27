import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login"; // Sesuaikan path menuju file Login.jsx kamu

// 1. Mock useAuth
const mockLogin = vi.fn();
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

// 2. Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login Page Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.alert agar tidak muncul pop-up saat testing
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("TEST 3: Menampilkan pesan validasi jika email kosong", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const buttonSubmit = screen.getByRole("button", { name: /masuk/i });
    fireEvent.click(buttonSubmit);

    expect(screen.getByText("Email wajib diisi")).toBeInTheDocument();
  });

  it("TEST 4: Berhasil submit login dengan email dan password yang valid", () => {
    // Tentukan return value sukses dari fungsi login auth
    mockLogin.mockReturnValue({ success: true, message: "Login Berhasil" });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Mengambil element berdasarkan placeholder & teks di Login.jsx asli
    const inputEmail = screen.getByPlaceholderText("nama@email.com");
    const inputPassword = screen.getByPlaceholderText("Masukkan password");
    const buttonSubmit = screen.getByRole("button", { name: /masuk/i });

    // Simulasi pengisian form
    fireEvent.change(inputEmail, { target: { value: "user@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "password123" } });
    fireEvent.click(buttonSubmit);

    // Verifikasi eksekusi fungsi
    expect(mockLogin).toHaveBeenCalledWith("user@gmail.com", "password123");
    expect(window.alert).toHaveBeenCalledWith("Login Berhasil");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});