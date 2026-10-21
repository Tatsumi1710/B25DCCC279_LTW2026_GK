import React from 'react';
import TaskTable from '../components/TaskTable';

const TaskList = ({ tasks, onToggleStatus, onDelete }) => {
  return (
    <div>
      <h2>Danh sách công việc</h2>
      <TaskTable
        tasks={tasks}
        onToggleStatus={onToggleStatus}
        onDelete={onDelete}
      />
    </div>
  );
};

export default TaskList;