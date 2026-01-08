'use client'
import React, {useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link'
import { useRouter } from 'next/navigation';


type User = {
  userId: number;
  username: string;
  password: string
}
function Users() {
  const router = useRouter();
  const [user, setUser] = useState<User[]>([]);
  
  useEffect(() => {
    fetch("/api/users")
    .then((res)=> res.json()).then((data)=>setUser(data))
  }, []);

  async function deleteUser(userId: number) {
    await fetch(`/api/users/${userId} `, {
      method: 'DELETE',
    });
    setUser(prev => prev.filter(u => u.userId !== userId));
  }
  

  return (
    <div className="container mt-4">
      <Link href='/user/add'>      <button
        className="btn btn-success"
      >Add</button></Link>

      <div className="row">
        {user.map(user => (
          <div className="col-md-4 mb-3" key={user.userId}>
            <div className="card text-primary">
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>

                <p className="card-text">User ID: {user.userId}</p>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.userId)}
                  
                >
                  Delete
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => router.push(`/user/${user.userId}`)}
                >
                  Details
                </button>

                <button
                  className="btn btn-info"
                  onClick={() => router.push(`/user/${user.userId}/edit`)}
                >
                  Edit
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
