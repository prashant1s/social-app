import { useState } from "react";
import API from "../api";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    await API.post("/signup", { username, email, password });
    alert("Account created. Login now.");
    window.location = "/login";
  };

  return (
    <div className="center">
      <h2>Signup</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
             onChange={e => setPassword(e.target.value)} />
      <button onClick={signup}>Signup</button>
    </div>
  );
}
