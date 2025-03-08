import React from "react";
import { MdDeleteSweep } from "react-icons/md";

const Todocard = ({ title, description, taskIndex, onDelete }) => {
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <div className="card-body bg-dark text-white">
        <h4>{title}</h4>
        <p>{description}</p>
        <button className="btn btn-secondary" onClick={() => onDelete(taskIndex)}>
          <MdDeleteSweep />
        </button>
      </div>
    </div>
  );
};

export default Todocard;
