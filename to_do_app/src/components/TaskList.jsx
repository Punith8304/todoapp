import React from "react"
import Tasks from "./Tasks.jsx"
function TaskList(props) {
    console.log(props)
    return <div className="task-list"><ul className="tasks">
    {props.tasks.map((task, index) => {
        console.log(task)
        return <Tasks key={index} id={task._id} completeTask={props.deleteTask} task={task.task} />
    })}
</ul>
</div>
}
export default TaskList;