import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import {getFilteredTasks} from "./util";
import {v1} from "uuid";


export type FilterButtonProps = 'all' | 'active' | 'completed'| 'delete';

export type TodolistType = {
  id: string
  title: string
  filter: FilterButtonProps
}

type TasksStateType = {
  [todolistId: string]: TaskType[]
}

function App() {

  const todolistId_1 = v1()
  const todolistId_2 = v1()

  const [todolists, setTodolists] = useState<TodolistType[]>(
      [
        {id:todolistId_1, title:'What to learn', filter:'all'},
        {id:todolistId_2, title:'What to buy', filter:'all'},
      ]
  )
  // const initialState: TaskType[] = [
  // {id:v1(), title:'HTML&CSS' , isDone:true },
  // {id:v1(), title:'JS' , isDone:false },
  // {id:v1(), title:'REACT' , isDone:true }
  // ]

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId_1]:[
      {id:v1(), title:'HTML&CSS' , isDone:true },
      {id:v1(), title:'JS' , isDone:false },
      {id:v1(), title:'REACT' , isDone:true }
    ],
    [todolistId_2]:[
      {id:v1(), title:'Milk' , isDone:true },
      {id:v1(), title:'Watter' , isDone:false },
      {id:v1(), title:'Bread' , isDone:true }
    ]
  })
  const [Filter, setFilter] = useState<FilterButtonProps>('all');




  const TodolistTitle = 'What to learn'

  const deleteTask = (taskId: TaskType['id'],todolistId:TodolistType['id']) => {
    setTasks({...tasks, [todolistId]:  tasks[todolistId].filter(f=> f.id !== taskId) })
  }

  const CreateTask =(props:string,todolistId:TodolistType['id']) =>{
    const newTask = {
      id: v1(),
      title: props,
      isDone:false
    }

    setTasks({
      ...tasks,
      [todolistId]: [...tasks[todolistId], newTask]
    })
  }



  const ChangeTodolistFilter = (Filter: FilterButtonProps,todolistId:TodolistType['id']) => {
    const nextState = todolists.map((f) => f.id === todolistId ? {...f, filter:Filter} : f ) ;
    setTodolists(nextState)

  }

  const ChangeIsDone = (id:string,todolistId:TodolistType['id']) => {
        setTasks({...tasks,[todolistId]: tasks[todolistId].map(el => el.id === id? {...el, isDone: !el.isDone} : el) })
  }

  const deleteTodolist = (todolistId:TodolistType['id']) => {
      const nextState = todolists.filter((f) => f.id !== todolistId)
    setTodolists(nextState)
    const copyState = {...tasks}
    delete copyState[todolistId]
    setTasks(copyState)
  }



  const todolistComponent = todolists.map((tl) => {
    const TasksForTodolists = getFilteredTasks(tasks[tl.id],tl.filter);
    return (
        <Todolist
                  id={tl.id}
                  key={tl.id}
                  Filter={Filter}
                  title={tl.title}
                  tasks={TasksForTodolists}
                  deleteTask={deleteTask}
                  ChangeTodolistFilter={ChangeTodolistFilter}
                  CreateTask={CreateTask}
                  ChangeIsDone={ChangeIsDone}
                  deleteTodolist={deleteTodolist}
        />

    )
  })

  return (
    <div className="App">
      {todolistComponent}
    </div>
  );
}

export default App;
