import './index.css'

const TaskItem = (props) => {
  const { eachTask,deletetask } = props;
  const { id, title, description, dueDate, selectOption } = eachTask;
  const onClickDeletetask=()=>{
    deletetask(id)
  }
  return (
    <div className="taskItem">
      <p className='title'>{title}</p>
      <p className='description'>{description}</p>
      <p className='description'>{dueDate}</p>
      {selectOption === "Pending" && <p className="pending">{selectOption}</p>}
      {selectOption === "In Progress" && <p className="in_progress">{selectOption}</p>}
      {selectOption === "Completed" && <p className="completed">{selectOption}</p>}
      <button onClick={onClickDeletetask} className='delet_Btn'>Delete</button>
    </div>
  );
};
export default TaskItem;
