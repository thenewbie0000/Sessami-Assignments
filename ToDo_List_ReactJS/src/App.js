import './App.css';
import AddToDo from './components/AddToDo';
import ToDoList from './components/ToDoList';
import { ToDoProvider } from './context/ToDoContext';

function App() {
  return (
    <ToDoProvider>
      <div className="container">
        <h1 className='app-title'>To Do List</h1>
        <AddToDo></AddToDo>
        <ToDoList></ToDoList>
      </div>
    </ToDoProvider>
    
  );
}

export default App;
