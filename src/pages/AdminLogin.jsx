import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);console.log("FULL URL:", `${import.meta.env.VITE_API_URL}/api/auth/login`);

      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("TOKEN STORED:", data.token);

        alert("Login successful ✅");
        navigate("/admin"); // redirect to admin panel
      } else {
        alert(data.message || "Login failed ❌");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Admin Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login} className="btn btn-primary">
        Login
      </button>
    </div>
  );
};

export default AdminLogin;