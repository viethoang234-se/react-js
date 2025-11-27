import React, { useState } from 'react';
import './App.css';

function App() {
  // State lưu trữ danh sách công việc
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Công việc 1', completed: true },
    { id: 2, text: 'Công việc 2', completed: false },
    { id: 3, text: 'Công việc 3', completed: false }
  ]);
  
  // State lưu trữ giá trị input
  const [taskInput, setTaskInput] = useState('');

  // Hàm thêm công việc mới
  const addTask = () => {
    if (taskInput.trim() === '') {
      alert('Vui lòng nhập công việc!');
      return;
    }
    
    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  // Hàm xóa công việc
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Hàm đánh dấu hoàn thành công việc
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Tính toán thống kê
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="container">
      <h1>Danh sách công việc</h1>
      <div className="input-section">
        <input 
          type="text" 
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Thêm công việc mới..."
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Thêm</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
      <div className="stats">
        <p>Tổng số: <span>{totalTasks}</span></p>
        <p>Đã hoàn thành: <span>{completedTasks}</span></p>
      </div>
    </div>
  );
}

// Component cho từng task item
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input 
        type="checkbox" 
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-text">{task.text}</span>
      <button 
        className="delete-btn"
        onClick={() => onDelete(task.id)}
      >
        Xóa
      </button>
    </li>
  );
}

export default App;