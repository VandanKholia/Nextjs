'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.css';

function AddUser() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [age, setAge] = useState('');

  const URL = 'https://6940e3ad993d68afba6d6d36.mockapi.io/Users';

  async function handleSubmit(e: any) {
    e.preventDefault();

    await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        id,
        age,
      }),
    });
    router.push('/user');
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
          placeholder="Email"
          value={id}
          onChange={e => setId(e.target.value)}
          required
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
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
