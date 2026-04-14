const filterOptions = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

const TaskFilter = ({ activeFilter, onChange }) => {
  return (
    <div className="filter-group">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`filter-btn ${activeFilter === option.value ? "active" : ""}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
