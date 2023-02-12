import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ToDoList.scss";

const ToDoList = () => {
  // const URL = "https://pern-todolist-server-only-production.up.railway.app";
  const [taskList, setTaskList] = useState([]);
  const [inputTask, setInputTask] = useState("");
  const [editTask, setEditTask] = useState({});
  const [inputEditTask, setInputEditTask] = useState("");

  // Call API from Server
  useEffect(() => {
    const getAllTaskAPI = async () => {
      try {
        const res = await axios.get("/tasks");
        const data = res.data;
        setTaskList(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTaskAPI();
  }, [taskList]);
  // console.log(taskList);

  // Add task
  const handleInputTask = async (e) => {
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      if (inputTask === "") {
        alert("Input task not be empty");
      } else {
        try {
          // Post new task to server
          let task = { name: inputTask };
          await axios.post("/create", task);

          console.log("Check new add list:", taskList);

          // Reset input
          setInputTask("");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  // Delete task
  const handleDeleteTask = async (e, task) => {
    // Post delete task
    const targetID = task.id;
    const targetDeleteTask = { id: targetID };
    await axios.post("/delete", targetDeleteTask);

    console.log("Check new delete list:", taskList);
  };

  // Complete task
  const handleCompleteTask = async (e, task) => {
    // Post complete task
    const targetID = task.id;
    const targetComplete = { id: targetID };
    await axios.post("/complete", targetComplete);

    console.log("Check new complete list:", taskList);
  };

  // Edit task
  const handleEditTask = async (e, task) => {
    // console.log(task);
    setInputEditTask(task.name);
    setEditTask(task);
  };

  const handleConfirmEditTask = async (e) => {
    if (inputEditTask === "") {
      alert("Input task not be empty");
    } else {
      console.log(editTask);

      // Post edit task
      const targetEdit = { id: editTask.id, name: inputEditTask };
      console.log(targetEdit);
      await axios.post("/edit", targetEdit);

      console.log("Check new edit list:", taskList);
    }
  };

  return (
    <div className="todolist">
      <div className="action">
        <input
          type="text"
          className="input-task"
          value={inputTask}
          placeholder="Input task..."
          onChange={(e) => setInputTask(e.target.value)}
          onKeyDown={(e) => handleInputTask(e)}
        />
        <button className="add-task-btn" onClick={(e) => handleInputTask(e)}>
          Add
        </button>
      </div>
      <div className="task-container">
        {taskList.map((task) => {
          return (
            <div className="task-card" key={task.id}>
              <div className="task-card-title">
                <p className="task-card-name">{task.name}</p>
                {task.status === true ? (
                  <div className="task-card-status">Done</div>
                ) : (
                  <div className="task-card-status">Processing</div>
                )}
              </div>
              <div className="task-card-action">
                <button
                  className="complete-btn"
                  onClick={(e) => handleCompleteTask(e, task)}
                >
                  Complete
                </button>
                {/*==================== MODAL TEMPLATE ====================*/}
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Edit task
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <input
                          type="text"
                          className="edit-input-task"
                          value={inputEditTask}
                          onChange={(e) => setInputEditTask(e.target.value)}
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={(e) => handleConfirmEditTask(e)}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/*==================== MODAL TEMPLATE ====================*/}
                <button
                  className="edit-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={(e) => handleEditTask(e, task)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={(e) => handleDeleteTask(e, task)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToDoList;
