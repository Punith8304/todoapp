import React from 'react';
function Tasks(props) {

    return <div onClick={ ()=>{ props.completeTask(props.id) }}><li>{props.task}</li></div>

}

export default Tasks