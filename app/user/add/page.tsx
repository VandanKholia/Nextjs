'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function AddUser() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  function addTask() {
    setTasks([...tasks, { taskTitle, taskDescription }]);
    setTaskTitle('');
    setTaskDescription('');
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    await fetch('/api/users', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name,
        password,
        tasks,
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
          placeholder="Username"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <h5>Add Tasks</h5>

        <input
          className="form-control mb-2"
          placeholder="Task Title"
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Task Description"
          value={taskDescription}
          onChange={e => setTaskDescription(e.target.value)}
        />
        <div className="form-check">
          <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1" />
          <label className="form-check-label" >
            completed
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault2" />
          <label className="form-check-label">
            pending
          </label>
        </div>

        <button type="button" onClick={addTask} className="btn btn-secondary mb-2">
          Add Task
        </button>

        <ul>
          {tasks.map((t, i) => (
            <li key={i}>{t.taskTitle}</li>
          ))}
        </ul>

        <button className="btn btn-success">
          Create User
        </button>
      </form>
    </div>
  );
}

export default AddUser;
