// GLOBAL STORAGE AREA
import { createContext, useState } from "react";

export const ToDoContext = createContext();

export const ToDoProvider = (props) =>{
  const getTodos = JSON.parse(localStorage.getItem('todos'))
  const [todos, setTodos] = useState(getTodos? getTodos: []);

  return (
    <ToDoContext.Provider value = {[todos, setTodos]}>
      {props.children}

    </ToDoContext.Provider>
  );
} 