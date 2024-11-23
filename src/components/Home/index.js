import { Component } from "react";
import Form from "../Form";
import TaskItem from "../TaskItem";
import "./index.css";

class Home extends Component {
  state = { item: {}, allTasks: [] };

  componentDidMount = () => {
    const data = localStorage.getItem("tasks"); // Replace 'myKey' with your storage key
    if (data) {
      const updatedData = JSON.parse(data); // Parse JSON if the data is stored as a JSON string
      this.setState({ allTasks: updatedData });
    }
  };

  saveTaskItem = (task) => {
    let { allTasks } = this.state;
    this.setState({ allTasks: [...allTasks, task] });
    allTasks = [...allTasks, task];
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  };

  ondeletetask = (id) => {
    let { allTasks } = this.state;
    const tasks = allTasks.filter((each) => each.id !== id);
    this.setState({ allTasks: tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  render() {
    const { allTasks } = this.state;
    return (
      <div className="home">
        <Form taskItem={this.saveTaskItem} />
        <div>
          <input type="search" />
          <div className="checkBox_container">
            <div>
              <input type="checkbox" id="Pending" />
              <label htmlFor="Pending">Pending</label>
            </div>
            <div>
              <input type="checkbox" id="in_progress" />
              <label htmlFor="in_progress">In Progress</label>
            </div>
            <div>
              <input type="checkbox" id="completed" />
              <label htmlFor="completed">Completed</label>
            </div>
          </div>
        </div>
        <ul className="ul">
          {allTasks.map((eachTask) => (
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
