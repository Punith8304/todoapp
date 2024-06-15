import React, {useState} from "react"


function Input(props) {
    const [task, setTask] = useState("")
    function handleChange(event){
        const value = event.target.value;
        setTask(value)
    }
    return (<div className="inputTask">
        <input type="text" name="title" onChange={handleChange} value={task} />
        <button onClick={() => {
            props.passTask(task);
            setTask("")
            }}>+</button>
    </div>)
}
export default Input;