import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetail = ({ tasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const taskId = Number(id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <div>
        <p>Không tìm thấy công việc.</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  const { title, assignee, priority, hours, done } = task;

  return (
    <div>
      <h2>Chi tiết công việc</h2>
      <p>{`Tên công việc: ${title}`}</p>
      <p>{`Người làm: ${assignee}`}</p>
      <p>{`Mức ưu tiên: ${priority}`}</p>
      <p>{`Số giờ: ${hours}`}</p>
      <p>{`Trạng thái: ${done ? 'Đã xong' : 'Đang làm'}`}</p>
      <button onClick={() => navigate(-1)} style={{ marginTop: '10px', padding: '6px 12px' }}>
        Quay lại
      </button>
    </div>
  );
};

export default TaskDetail;