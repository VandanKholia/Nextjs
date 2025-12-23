'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link'

type User = {
  id: number;
  name: string;
  email: string;
}
function Users() {
  const [user, setUser] = useState<User[]>([]);


  useEffect(() => {
    fetch("/api/users")
    .then((res)=> res.json()).then((data)=>setUser(data))
  }, []);

  // async function deleteUser(userId: string) {
  //   await fetch(`${URL}/${userId}`, {
  //     method: 'DELETE',
  //   });
  //   setUser(prevUsers =>
  //     prevUsers.filter(user => user.id !== userId)
  //   );
  // }

  return (
    <div className="container mt-4">
      <Link href='/user/add'>      <button
        className="btn btn-success"
      >Add</button></Link>

      <div className="row">
        {user.map(user => (
          <div className="col-md-4 mb-3" key={user.id}>
            <div className="card text-primary">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>

                <h6 className="card-subtitle mb-2 text-muted">
                  {user.email}
                </h6>

                <p className="card-text">User ID: {user.id}</p>

                <button
                  className="btn btn-danger"
                  // onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
