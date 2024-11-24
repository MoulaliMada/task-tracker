import { Component } from "react";
import Form from "../Form";
import EditForm from "../EditForm";
import TaskItem from "../TaskItem";
import "./index.css";

class Home extends Component {
  state = {
    item: {},
    allTasks: [],
    statusFilter: ["Pending", "In Progress", "Completed"],
    filterdTasks: [],
    pending: true,
    inProgress: true,
    completed: true,
    searchInput: "",
    editingTaskId: "",
  };

  componentDidMount = () => {
    const data = localStorage.getItem("tasks");
    if (data) {
      const updatedData = JSON.parse(data);
      this.setState({ allTasks: updatedData, filterdTasks: updatedData });
    }
  };

  saveTaskItem = (task) => {
    let { allTasks, editingTaskId } = this.state;
    const newallTasks = allTasks.filter((each) => each.id !== editingTaskId);
    this.setState({
      filterdTasks: [...newallTasks, task],
      allTasks: [...newallTasks, task],
      editingTaskId: "",
    });
    allTasks = [...newallTasks, task];
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    if (task.selectOption === "Pending") {
      this.setState({ pending: true });
    }
    if (task.selectOption === "In Progress") {
      this.setState({ inProgress: true });
    }
    if (task.selectOption === "Completed") {
      this.setState({ completed: true });
    }
  };

  ondeletetask = (id) => {
    let { allTasks ,editingTaskId} = this.state;
    const tasks = allTasks.filter((each) => each.id !== id);
    this.setState({ allTasks: tasks, filterdTasks: tasks, });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if(editingTaskId === id){
      this.setState({editingTaskId:''})
    }

  };

  filterItemsByStatus = (statusList) => {
    const { allTasks, searchInput } = this.state;
    const filterdTask = allTasks.filter((eachTask) =>
      statusList.includes(eachTask.selectOption)
    );
    const searchTasks = filterdTask.filter((eachTask) =>
      eachTask.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    this.setState({ filterdTasks: searchTasks });
  };

  changePendingCheckBox = () => {
    const { pending, statusFilter } = this.state;
    this.setState({ pending: !pending });
    let statusList = [];
    if (!pending) {
      statusList = [...statusFilter, "Pending"];
      this.setState({ statusFilter: statusList });
    } else {
      statusList = statusFilter.filter((each) => each !== "Pending");
      this.setState({ statusFilter: statusList });
    }
    this.filterItemsByStatus(statusList);
  };

  onChangeInProgress = () => {
    const { inProgress, statusFilter } = this.state;
    this.setState({ inProgress: !inProgress });
    let statusList = [];
    if (!inProgress) {
      statusList = [...statusFilter, "In Progress"];
      this.setState({ statusFilter: statusList });
    } else {
      statusList = statusFilter.filter((each) => each !== "In Progress");
      this.setState({ statusFilter: statusList });
    }
    this.filterItemsByStatus(statusList);
  };

  onChangeCompleted = () => {
    const { completed, statusFilter } = this.state;
    this.setState({ completed: !completed });
    let statusList = [];
    if (!completed) {
      statusList = [...statusFilter, "Completed"];
      this.setState({ statusFilter: statusList });
    } else {
      statusList = statusFilter.filter((each) => each !== "Completed");
      this.setState({ statusFilter: statusList });
    }
    this.filterItemsByStatus(statusList);
  };

  onChangeSearch = (event) => {
    const { statusFilter, allTasks } = this.state;
    const filterdTask = allTasks.filter((eachTask) =>
      statusFilter.includes(eachTask.selectOption)
    );
    const searchTasks = filterdTask.filter((eachTask) =>
      eachTask.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({
      searchInput: event.target.value,
      filterdTasks: searchTasks,
    });
  };

  oneditTheTask = (id) => {
    const { editingTaskId } = this.state;
    if (editingTaskId === "") {
      this.setState({ editingTaskId: id });
    }
  };

  renderEditForm = () => {
    const { allTasks, editingTaskId } = this.state;
    let editExitTask = allTasks.find(
      (eachTask) => eachTask.id === editingTaskId
    );
    return (
      <EditForm
        taskItem={this.saveTaskItem}
        editExitTask={editExitTask}
        ondeletetask={this.ondeletetask}
      />
    );
  };

  render() {
    const { inProgress, pending, filterdTasks, completed, editingTaskId } =
      this.state;

    return (
      <div className="home">
        {editingTaskId === "" ? (
          <Form taskItem={this.saveTaskItem} />
        ) : (
          this.renderEditForm()
        )}

        <div>
          <div className="checkBox_container">
            <h1 className="filter_heading">Filter by</h1>
            <div>
              <input
                type="checkbox"
                id="Pending"
                checked={pending}
                onChange={this.changePendingCheckBox}
              />
              <label htmlFor="Pending">Pending</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="in_progress"
                checked={inProgress}
                onChange={this.onChangeInProgress}
              />
              <label htmlFor="in_progress">In Progress</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="completed"
                checked={completed}
                onChange={this.onChangeCompleted}
              />
              <label htmlFor="completed">Completed</label>
            </div>
          </div>
          <div className="search_container">
            <span className="search">Search</span>
            <input
              type="search"
              className="search_bar"
              placeholder="search by title"
              onChange={this.onChangeSearch}
            />
          </div>
        </div>
        <ul className="ul">
          {filterdTasks.map((eachTask) => (
            <TaskItem
              key={eachTask.id}
              eachTask={eachTask}
              deletetask={this.ondeletetask}
              editTheTask={this.oneditTheTask}
            />
          ))}
        </ul>
      </div>
    );
  }
}
export default Home;
