'use client';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function EditUser() {
    const router = useRouter();
    const { userId } = useParams();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/users/${userId}`)
            .then(res => res.json())
            .then(data => {
                setName(data.username);
                setPassword(data.password); // optional (or remove)
                setTasks(data.tasks || []);
                setLoading(false);
            });
    }, [userId]);

    function addTask() {
        if (!taskTitle) return;
        setTasks([...tasks, { taskTitle, taskDescription }]);
        setTaskTitle('');
        setTaskDescription('');
    }

    function removeTask(index: number) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            await fetch(`/api/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: name,
                    password,
                    tasks: tasks,
                }),

            });
            router.push('/user');
        } catch (err: any) {
            console.error(err);
        }


    }

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-4">
            <h2>Edit User</h2>

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
                />

                <h5>Edit Tasks</h5>

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

                <button
                    type="button"
                    onClick={addTask}
                    className="btn btn-secondary mb-2"
                >
                    Add Task
                </button>

                <ul className="list-group mb-3">
                    {tasks.map((t, i) => (
                        <li
                            key={i}
                            className="list-group-item d-flex justify-content-between"
                        >
                            {t.taskTitle}
                            <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => removeTask(i)}
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>

                <button className="btn btn-primary">
                    Update User
                </button>
            </form>
        </div>
    );
}

export default EditUser;
