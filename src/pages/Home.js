import React from 'react';

const Home = ({ tasks }) => {
  const totalTasks = tasks.length;
  
  const completedTasks = tasks.filter((t) => t.done).length;

  
  const remainingHours = tasks.reduce((sum, task) => {
    return !task.done ? sum + task.hours : sum;
  }, 0);

  return (
    <div>
      <h2>Công việc nhóm</h2>
      <div style={{ marginTop: '15px', lineHeight: '1.8' }}>
        <p>{`Tổng số công việc: ${totalTasks}`}</p>
        <p>{`Số công việc đã xong: ${completedTasks}`}</p>
        <p>{`Tổng số giờ còn lại: ${remainingHours}`}</p>
      </div>
    </div>
  );
};

export default Home;