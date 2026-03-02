import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import {getFilteredTasks} from "./util";


export type FilterButtonProps = 'all' | 'active' | 'completed';


function App() {

  const initialState: TaskType[] = [
  {id:1, title:'HTML&CSS' , isDone:true },
  {id:2, title:'JS' , isDone:false },
  {id:3, title:'REACT' , isDone:true }
  ]



  const [tasks, setTasks] = useState(initialState)
  const [Filter, setFilter] = useState<FilterButtonProps>('all');




  const TodolistTitle = 'What to learn'

  const deleteTask = (taskId: TaskType['id']) => {
    const nextTasks = tasks.filter(f=> f.id !== taskId)
    setTasks(nextTasks)
  }

  const TasksForTodolists = getFilteredTasks(tasks,Filter);

  const ChangeTodolistFilter = (Filter: FilterButtonProps) => {
    setFilter(Filter);
  }

  return (
    <div className="App">
      <Todolist title={TodolistTitle}
                tasks={TasksForTodolists}
                deleteTask={deleteTask}
                ChangeTodolistFilter={ChangeTodolistFilter}
      />

    </div>
  );
}

export default App;
