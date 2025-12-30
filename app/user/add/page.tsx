'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.css';

function AddUser() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch('/api/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: name,
        password,
      })
    })
  }

  return (
    <div className="container mt-4">
      <h2>Add User</h2>

      <form onSubmit={handleSubmit} className="w-50">
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-success">
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;
