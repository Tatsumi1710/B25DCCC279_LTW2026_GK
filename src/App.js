import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get('/data/tasks.json', { signal: controller.signal })
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError('Không tải được dữ liệu.');
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  const handleToggleStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  };

  const handleAddTask = (newTask) => {
    const maxId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) : 0;
    const taskToAdd = { ...newTask, id: maxId + 1 };
    setTasks((prevTasks) => [...prevTasks, taskToAdd]);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            loading ? (
              <p>Đang tải...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <Home tasks={tasks} />
            )
          }
        />
        <Route
          path="tasks"
          element={
            loading ? (
              <p>Đang tải...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <TaskList
                tasks={tasks}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteTask}
              />
            )
          }
        />
        <Route
          path="tasks/new"
          element={<AddTask onAddTask={handleAddTask} />}
        />
        <Route
          path="tasks/:id"
          element={<TaskDetail tasks={tasks} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
