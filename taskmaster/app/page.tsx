"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<{ id: number; title: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  }

  async function addTask() {
    if (!newTask) return;
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: newTask }),
      headers: { "Content-Type": "application/json" },
    });
    setNewTask("");
    fetchTasks();
  }

  async function completeTask(id: number) {
    await fetch(`/api/tasks/${id}`, { method: "PUT" });
    fetchTasks();
  }

  async function deleteTask(id: number) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">TaskMaster</h1>
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="p-2 border rounded text-black"
        />
        <button onClick={addTask} className="px-4 py-2 bg-blue-500 rounded">
          Add Task
        </button>
      </div>
      <ul className="mt-6 w-full max-w-md">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between p-2 border-b border-gray-700">
            <span className={task.completed ? "line-through" : ""}>{task.title}</span>
            <div className="flex gap-2">
              {!task.completed && (
                <button onClick={() => completeTask(task.id)} className="text-green-400">✔</button>
              )}
              <button onClick={() => deleteTask(task.id)} className="text-red-400">✖</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
