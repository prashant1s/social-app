import { useState } from "react";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await API.post("/login", { email, password });
    localStorage.setItem("token", res.data.token);
    window.location = "/";
  };

  return (
    <div className="center">
      <h2>Login</h2>
      <input className="d-flex mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="d-flex mb-3" type="password" placeholder="Password"
             onChange={e => setPassword(e.target.value)} />
      {/* <button onClick={login}></button> */}
      <div className="d-flex mb-2">
      <button onClick={login} type="button" class="btn btn-success">Login Me</button>
      </div>
      <a href="/signup">Signup</a>
    </div>
  );
}
