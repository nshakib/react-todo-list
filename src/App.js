import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // edit todo
  const [editText, setEditText] = useState("")
  const [todoEditing, setTodoEditing] = useState(null);
  

//for storage
// addtional

useEffect(() => {
  const temp = localStorage.getItem("todos")
  const loadedTodos = JSON.parse(temp)

  if(loadedTodos){
    setTodos(loadedTodos)
  }
},[])

useEffect(()=> {
  const temp = JSON.stringify(todos)
  localStorage.setItem("todos", temp)
  
},[todos])

// form submit
  function handelSubmit(e){
    e.preventDefault();
    
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false
    }
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  // delete todo
  function deleteTodo(id){
    const updateTodos = [...todos].filter((todo) => todo.id !== id)
    setTodos(updateTodos);
  }

  // check todo
  function toggleComplete(id){
    const updateTodos = [...todos].map((todo) => {
      if(todo.id === id)
      {
        todo.completed = !todo.completed
      }
      return todo;
    })
    setTodos(updateTodos);
    
  }

  //edit todo submit
  function editTodo(id){
    const updateTodos = [...todos].map((todo) =>{
      if(todo.id === id)
      {
        todo.text = editText;
      }
      return todo;
    })
    setTodos(updateTodos);
    setTodoEditing(null);
    setEditText("");
  }



  return (
    <div className="App">
     <form onSubmit={handelSubmit}>
      <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} checked={ todo.completed}/>
      
      <button type='submit'>Add Todo</button>
     </form>

     {todos.map((todo)=> <div key={todo.id}>
      {todoEditing === todo.id ? (
        <input type="text" onChange={(e) => setEditText(e.target.value)} value={editText}/>
      ) : (<div>{todo.text}</div>)}
      
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      <input type="checkbox" onClick={() => toggleComplete(todo.id)} />

      {todoEditing === todo.id ? (<button onClick={() => editTodo(todo.id)}>Submit Edit Todo</button>) 
      : (<button onClick={() => setTodoEditing(todo.id)}>Edit Todo</button>)}
      
      
      </div>)}
    
    </div>
  );
}

export default App;
