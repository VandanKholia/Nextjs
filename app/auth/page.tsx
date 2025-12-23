'use client';

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "test@gmail.com" && password === "123") {
      router.push('/admin');
    } else if (email === "user@gmail.com" && password === "456") {
      router.push('/user');
    } else {
      alert("Invalid email or password");
    }
    
  };

  return (
    <div className='container d-flex align-items-center justify-content-center my-5'>
      <div className="login-card border-2 border border-success px-5">
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="remember" />
            <label className="form-check-label">Remember me</label>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Login
          </button>

          <p className="text-center mt-3">
            Don't have an account? <a href="#">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
