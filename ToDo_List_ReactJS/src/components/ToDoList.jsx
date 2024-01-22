import { useContext } from "react";
import ToDo from "./ToDo";
import { ToDoContext } from "../context/ToDoContext";

const ToDoList = ()=>{
  const [todos, setTodos] = useContext(ToDoContext);

  return (
    1 <= todos.length ? todos.map((item) =>{
      return(
        <ToDo key = {item.id} id = {item.id} title = {item.title} completed = {item.completed}/>
      );
    })   : <h4>No Todos Found. </h4>
    
  );
}

export default ToDoList;