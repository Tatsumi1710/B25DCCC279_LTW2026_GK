import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIORITIES } from '../data';

const AddTask = ({ onAddTask }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    assignee: '',
    priority: 'Trung bình',
    hours: ''
  });
  const [error, setError] = useState('');

  const { title, assignee, priority, hours } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Kiểm tra ô trống
    if (!title.trim() || !assignee.trim() || hours.toString().trim() === '') {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    // 2. Kiểm tra số giờ: phải là số nguyên từ 1 đến 40
    const numHours = Number(hours);
    if (!Number.isInteger(numHours) || numHours < 1 || numHours > 40) {
      setError('Số giờ phải từ 1 đến 40');
      return;
    }

    const newTask = {
      title: title.trim(),
      assignee: assignee.trim(),
      priority,
      hours: numHours,
      done: false
    };

    onAddTask(newTask);
    navigate('/tasks', { replace: true });
  };

  return (
    <div>
      <h2>Thêm công việc mới</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
        <div>
          <label htmlFor="title">Tên công việc</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={handleChange}
            style={{ width: '100%', padding: '6px', marginTop: '4px' }}
          />
        </div>

        <div>
          <label htmlFor="assignee">Người làm</label>
          <input
            id="assignee"
            name="assignee"
            type="text"
            value={assignee}
            onChange={handleChange}
            style={{ width: '100%', padding: '6px', marginTop: '4px' }}
          />
        </div>

        <div>
          <label htmlFor="priority">Mức ưu tiên</label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={handleChange}
            style={{ width: '100%', padding: '6px', marginTop: '4px' }}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="hours">Số giờ ước tính</label>
          <input
            id="hours"
            name="hours"
            type="number"
            value={hours}
            onChange={handleChange}
            style={{ width: '100%', padding: '6px', marginTop: '4px' }}
          />
        </div>

        <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>
          Thêm
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default AddTask;