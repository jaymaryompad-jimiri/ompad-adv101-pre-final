
"use client";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("todo"); 

  const addTodo = () => {
    if (!task.trim()) return;
    setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, text: newText } : t)));
    setEditingId(null);
  };

  const deleteTodo = id => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const toggleComplete = id => {
    setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const filteredTodos = todos
    .filter(t =>
      activeTab === "todo" ? !t.completed : t.completed
    )
    .filter(t => t.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>To-Do App</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          placeholder="Add a task..."
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <input
        style={{ marginTop: "20px", width: "100%" }}
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
        <button
          onClick={() => setActiveTab("todo")}
          style={{ fontWeight: activeTab === "todo" ? "bold" : "" }}
        >
          To Do
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          style={{ fontWeight: activeTab === "completed" ? "bold" : "" }}
        >
          Completed
        </button>
      </div>

      <ul style={{ marginTop: "20px", padding: 0, listStyle: "none" }}>
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              padding: "10px",
              background: "#f4f4f4",
              borderRadius: "5px"
            }}
          >
            {editingId === todo.id ? (
              <input
                defaultValue={todo.text}
                onBlur={e => updateTodo(todo.id, e.target.value)}
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer"
                }}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.text}
              </span>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setEditingId(todo.id)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
