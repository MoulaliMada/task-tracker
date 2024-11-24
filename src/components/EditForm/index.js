import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const EditForm = (props) => {
  let { taskItem ,editExitTask} = props;

  const [title, setTitle] = useState(editExitTask.title);
  const [description, setDescription] = useState(editExitTask.description);
  const [dueDate, setdueDate] = useState(editExitTask.dueDate);
  const [selectOption, setSelectOption] = useState(editExitTask.selectOption);
  const [titleError, settitleError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [dueDateError, setdueDateError] = useState(false);

  const changeTitle = (event) => {
    setTitle(event.target.value);
    settitleError(false);
  };
  const chandescription = (event) => {
    setDescription(event.target.value);
    setdescriptionError(false);
  };
  const changDueDate = (event) => {
    setdueDate(event.target.value);
    setdueDateError(false);
  };

  const saveTask = (event) => {
    event.preventDefault();
    if (title === "") {
      settitleError(true);
    } else {
      settitleError(false);
    }

    if (description === "") {
      setdescriptionError(true);
    } else {
      setdescriptionError(false);
    }

    if (dueDate === "") {
      setdueDateError(true);
    } else {
      setdueDateError(false);
    }
    if (title !== "" && description !== "") {
      const task = {
        id: uuidv4(),
        title: title,
        description: description,
        dueDate: dueDate,
        selectOption: selectOption,
      };
      taskItem(task);
      setTitle("");
      setDescription("");
      setdueDate("");
      setSelectOption("Pending");
    }
  };

  const handleChange = (event) => {
    setSelectOption(event.target.value);
  };

  return (
    <div className="form_container">
      <h1 className="add_task_heading">Add Task</h1>
      <form onSubmit={saveTask}>
        <label className="label">Title</label>
        <input
          value={title}
          onChange={changeTitle}
          className="input"
          placeholder="Enter Title"
        />
        {titleError && <p className="title_error">*Title is required.</p>}
        <label className="label">Description</label>
        <textarea
          //value={description}
          value={description}
          onChange={chandescription}
          type="text"
          className="input"
          placeholder="Enter Description"
        />
        {descriptionError && (
          <p className="title_error">
            *Please provide a brief description for the task.
          </p>
        )}
        <label className="label">Due Date</label>
        <input
          type="date"
          //value={dueDate}
          value={dueDate}
          onChange={changDueDate}
          className="input_Date"
        />
        {dueDateError && (
          <p className="title_error">*Please select a due date for the task.</p>
        )}

        <label className="label">Status</label>
        <select value={selectOption} onChange={handleChange} className="select">
          <option value="Pending" className="option">
            Pending
          </option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
export default EditForm;
