import React from 'react';
import './App.css';
import PageTitle from './components/PageTitle';
import {Container} from 'react-bootstrap';
import TodoList from './components/todo/TodoList';
import "./assets/App.css"

function App() {
  return (
    <div className="App">
      <Container>
        <PageTitle>TODO LIST</PageTitle>
        <TodoList />
    </Container>
    </div>
  );
}

export default App;
