import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import TaskTable from '../components/TaskTable';

const TaskList = ({ tasks, onToggleStatus, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('Tất cả');

  // Lọc đồng thời theo tên và mức ưu tiên
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'Tất cả' || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  return (
    <div>
      <h2>Danh sách công việc</h2>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />

      <p style={{ fontWeight: '500' }}>
        {`Tìm thấy ${filteredTasks.length} công việc`}
      </p>

      {filteredTasks.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <TaskTable
          tasks={filteredTasks}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default TaskList;