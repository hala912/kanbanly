import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

export function LoginTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = useAuth();
  const handleLogin = () => {
    user.login(email, password).catch((err) => {
      setError(err.message);
      navigate("/");
    }); 
  };

  return (
    <div style={{ padding: 20 }}>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} >Log in</button>
      {error && <p>{error}</p>}
    </div>
  );
}
