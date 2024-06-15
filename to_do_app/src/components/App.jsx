import React, {useEffect, useState} from "react";
import Input from "./Input.jsx";
import Heading from "./Heading.jsx"
import TaskList from "./TaskList.jsx";
import axios from "axios";

function App() {
    const [tasks, setTasks] = useState([])
    async function addTask(task) {
        const response = await axios.post("http://localhost:8080/task",{
            task: task
        })
        setTasks(response.data)
    }
    useEffect(() => {
        axios.get("http://localhost:8080").then((response) => {
            setTasks(response.data)
        })
    }, [])
    async function deleteTask(id) {   
        const response = await axios.delete("http://localhost:8080?id="+id, {
                taskID: id
        })
        setTasks(response.data)

    }
    
      return (<div className="content">  
      <div className="task-create">
        <Heading />
        <Input passTask={addTask} />
        </div>
        <TaskList className="task-list" tasks={tasks} deleteTask={deleteTask}/>

    </div>
        
    )
}
export default App