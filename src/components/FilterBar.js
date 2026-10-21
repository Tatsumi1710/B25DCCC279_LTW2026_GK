import React from 'react';
import { PRIORITIES } from '../data';

const FilterBar = ({ searchTerm, onSearchChange, priorityFilter, onPriorityChange }) => {
  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', margin: '15px 0' }}>
      <div>
        <label htmlFor="search">Tìm kiếm</label>
        <input
          id="search"
          type="text"
          placeholder="Nhập tên công việc..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ marginLeft: '8px', padding: '6px' }}
        />
      </div>

      <div>
        <label htmlFor="priority-filter">Mức ưu tiên</label>
        <select
          id="priority-filter"
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
          style={{ marginLeft: '8px', padding: '6px' }}
        >
          <option value="Tất cả">Tất cả</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;