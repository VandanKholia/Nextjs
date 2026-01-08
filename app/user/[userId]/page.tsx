export default async function UserDetails({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params; // ✅ correct

  const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
    cache: "no-store",
  });

  const user = await res.json();
  console.log(user);
  return (
   <div className="container mt-5">
  <div className="card shadow-sm mb-4">
    <div className="card-body">
      <h2 className="card-title text-primary mb-1">
        {user.username}
      </h2>
      <p className="text-muted mb-0">
        User ID: {user.userId}
      </p>
    </div>
  </div>

  <div className="card shadow-sm">
    <div className="card-header bg-primary text-white">
      <h5 className="mb-0">Tasks</h5>
    </div>

    <ul className="list-group list-group-flush">
      {user.tasks.length === 0 ? (
        <li className="list-group-item text-center text-muted">
          No tasks assigned
        </li>
      ) : (
        user.tasks.map((task: any) => (
          <li key={task.taskId} className="list-group-item">
            <h6 className="mb-1 fw-bold text-dark">
              {task.taskTitle}
            </h6>
            <p className="mb-0 text-muted">
              {task.taskDescription}
            </p>
          </li>
        ))
      )}
    </ul>
  </div>
</div>

  );
}
