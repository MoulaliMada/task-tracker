import { Component } from "react";
import Form from "../Form";
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
  };

  componentDidMount = () => {
    const data = localStorage.getItem("tasks"); // Replace 'myKey' with your storage key
    if (data) {
      const updatedData = JSON.parse(data); // Parse JSON if the data is stored as a JSON string
      this.setState({ allTasks: updatedData, filterdTasks: updatedData });
    }
  };

  saveTaskItem = (task) => {
    let { allTasks, statusFilter } = this.state;
    this.setState({
      allTasks: [...allTasks, task],
      filterdTasks: [...allTasks, task],
    });
    allTasks = [...allTasks, task];
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    this.filterItemsByStatus(statusFilter);
  };

  ondeletetask = (id) => {
    let { allTasks } = this.state;
    const tasks = allTasks.filter((each) => each.id !== id);
    this.setState({ allTasks: tasks, filterdTasks: tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  filterItemsByStatus = (statusList) => {
    const { allTasks } = this.state;
    const filterdTask = allTasks.filter((eachTask) =>
      statusList.includes(eachTask.selectOption)
    );
    this.setState({ filterdTasks: filterdTask });
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

  onChangeSearch=(event)=>{
  //const{allTasks}=this.state
  let searchValue=event.target.value.toLowerCase()
  console.log(searchValue);
  }

  render() {
    const { inProgress, pending, filterdTasks, completed } = this.state;
    return (
      <div className="home">
        <Form taskItem={this.saveTaskItem} />
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
            />
          ))}
        </ul>
      </div>
    );
  }
}
export default Home;
