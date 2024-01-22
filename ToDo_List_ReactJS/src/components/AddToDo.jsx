import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToDoContext } from "../context/ToDoContext";
// Add this import statement at the beginning of your file
import '@fortawesome/fontawesome-svg-core/styles.css';
// Add these import statements to import the necessary icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./AddToDo.css"
// Register the icons you want to use
library.add(faPlus);

const AddToDo = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useContext(ToDoContext);

  const addTodo = () => {
    if ('' === title || undefined === title) {
      alert("Field cannot be blank!");
      return;
    }

    const newTodos = [...todos, { id: uuidv4(), title: title, completed: false }];
    setTodos(newTodos);
    setTitle('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };
  
  useEffect(() =>{
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);


  return (
    <>
      <div className="form-input-container">
        <input
          type="text"
          value={title}
          className="form-input"
          onChange={e => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add To Do... "
        />
        <button type="button" className="form-button" onClick={addTodo}><FontAwesomeIcon icon={faPlus} /></button>
      </div>
    </>
  );
}

export default AddToDo;