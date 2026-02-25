import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskType, Todolist } from './Todolist';

function App() {

  const task1: TaskType[] = [
  {id:1, title:'HTML&CSS' , isDone:true },
  {id:2, title:'JS' , isDone:false },
  {id:3, title:'REACT' , isDone:true }
  ]

  const task2: TaskType[] = []

  return (
    <div className="App">
      <Todolist title='What to learn' tasks={task1}/>
      <Todolist title='What to buy' tasks={task2} />
    </div>
  );
}

export default App;
