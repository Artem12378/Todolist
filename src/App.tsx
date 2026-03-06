import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import {getFilteredTasks} from "./util";
import {v1} from "uuid";


export type FilterButtonProps = 'all' | 'active' | 'completed'| 'delete';


function App() {

  const initialState: TaskType[] = [
  {id:v1(), title:'HTML&CSS' , isDone:true },
  {id:v1(), title:'JS' , isDone:false },
  {id:v1(), title:'REACT' , isDone:true }
  ]



  const [tasks, setTasks] = useState(initialState)
  const [Filter, setFilter] = useState<FilterButtonProps>('all');




  const TodolistTitle = 'What to learn'

  const deleteTask = (taskId: TaskType['id']) => {
    const nextTasks = tasks.filter(f=> f.id !== taskId)
    setTasks(nextTasks)
  }

  const CreateTask =(props:string) =>{
    const newTask = {
      id: v1(),
      title: props,
      isDone:false
    }
    const newState = [...tasks, newTask]
    setTasks(newState)
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
                CreateTask={CreateTask}
      />

    </div>
  );
}

export default App;
