import { useContext } from "react";
import { ToDoContext } from "../context/ToDoContext";
// Add this import statement at the beginning of your file
import '@fortawesome/fontawesome-svg-core/styles.css';
// Add these import statements to import the necessary icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Register the icons you want to use
library.add(faTrash);

const ToDo = (props) => {
  const [todos, setTodos] = useContext(ToDoContext);

  const completeToDo = (e) => {
    const updatedTodos = todos.map((item) => {
      if (item.id === e.target.value) {
        item.completed = !item.completed; 
      }
      return item;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (id) =>{
    const filteredTodo = todos.filter((item) =>{
      return item.id !== id;
    })

    setTodos(filteredTodo);
  }

  return (
    <>
    <div className="todo-list">
      <p className={`todo-item ${props.completed ? 'completed' : ''}`}>
        <input
          type="checkbox"
          id={props.id}
          value={props.id}
          onChange={completeToDo}
          checked={props.completed} 
        />
        <label htmlFor={props.id}>{props.title}</label>
      </p>
      <button type="button" className="btn-delete" id= {props.id} onClick={() => deleteTodo(props.id)}>
        <FontAwesomeIcon icon={faTrash}/>
      </button>

    </div>
      
    </>
  );
}

export default ToDo;
