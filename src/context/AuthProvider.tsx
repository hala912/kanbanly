import { useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";
import { apiFetch } from "../Apis/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("token");
    if (!saved) return null;
    try {
      return JSON.parse(atob(saved.split(".")[1]));
    } catch {
      return null;
    }
  });

  async function login(email: string, password: string) {
  const data = await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("token", data.token);
  setToken(data.token);
  setUser(data.user);
}

  async function signup(email: string, password: string) {

    const data = await apiFetch(`/signup`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);

  }
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
