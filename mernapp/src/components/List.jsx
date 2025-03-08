import React, { useState } from "react";
import Todocard from "./Todocard";
import "./List.css"; // Import the CSS file
import { useEffect } from "react";
const List = () => {

  const [tasks, setTasks] = useState([]); // State to store multiple tasks

  const createnew = async () => {
    let taskTitle = document.getElementById("Title").value;
    let taskDescription = document.getElementById("Task").value;
    let userEmail = localStorage.getItem("UserEmail");

    if (taskTitle && taskDescription) {
        let newTask = { title: taskTitle, description: taskDescription };

        let response = await fetch("https://to-do-list-wuoo.onrender.com/api/listdata", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                list_data: [newTask], 
                email: userEmail,
                list_date: new Date().toDateString()
            })
        });

        if (!response.ok) {
            console.error("Error creating task:", response.statusText);
            return;
        }

        // ✅ Fetch the updated task list from the backend
        fetchMyList();
    }

    document.getElementById("Title").value = "";
    document.getElementById("Task").value = "";
};

  
  const [listData, setListData] = useState([]); // Ensure state is an array

  const fetchMyList = async () => {
    try {
        const res = await fetch("https://to-do-list-wuoo.onrender.com/api/mylistdata", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: localStorage.getItem("UserEmail") })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const response = await res.json();
        console.log("API Response:", response); // 🔍 Debug log
        setListData(response.listData || []); // Ensure it's always an array
    } catch (error) {
        console.error("Error fetching data:", error);
        setListData([]); // Handle error by setting an empty array
    }
};
  
  useEffect(()=>{
    fetchMyList()
  },[]);

  useEffect(() => {
    console.log("Updated listData:", listData);
}, [listData]);

  
const deleteTask = async (taskIndex) => {
  let userEmail = localStorage.getItem("UserEmail");

  const deleteUrl = `https://to-do-list-wuoo.onrender.com/api/deletetask?email=${userEmail}&index=${taskIndex}`;
  console.log("Sending DELETE request to:", deleteUrl); // ✅ Debugging Step

  try {
      let response = await fetch(deleteUrl, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from backend:", data); // ✅ Debugging Step

      // ✅ Update frontend state with new data
      setListData(data.updatedList);
      console.log("Task deleted successfully");
  } catch (error) {
      console.error("Failed to delete task:", error);
  }
};


  return (
    <div className="container-fluid bg-dark" style={{ minHeight: "100vh" }}>

      <div className="container-fluid">
      <div className="mb-3">
      <label for="Title" className="form-label text-white">Title</label>
      <input type="text" className="form-control bg-dark text-white" id="Title"/>
      </div>
      <div className="mb-3">
      <label for="Task" className="form-label text-white">Enter Task Description</label>
      <textarea type="text" className="form-control bg-dark text-white" id="Task"/>
      </div>
      </div>

      <div className="create-new d-flex justify-content-center p-3">
        <button className="btn btn-primary" onClick={createnew}>
          Create A New Task
        </button>
      </div>
      
      <div className="task">
  {listData && listData.length > 0 ? (
    listData
      .slice(0) // Clone the array to prevent modifying the original
      .reverse() // Show latest data first
      .map((innerArray, index) =>
        Array.isArray(innerArray) && innerArray.length > 1 ? ( // Ensure it's an array and has at least two objects
          <Todocard
            key={index}
            title={innerArray[1].title} // Access the second object
            description={innerArray[1].description}
            taskIndex={index}
            onDelete={deleteTask}
          />
        ) : (
          <p key={index} className="text-white text-center">Case Clear 1</p>
        )
      )
  ) : (
    <p className="text-white text-center">No Task Are Available</p>
  )}
</div>
    </div>
  );
};

export default List;
