import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);
  //"if some component tries to call useAuth() outside the wrapper, fail loudly instead of silently giving undefined and causing confusing bugs later."
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};