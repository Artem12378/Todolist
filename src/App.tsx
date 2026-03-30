import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {getFilteredTasks} from "./util";
import {v1} from "uuid";
import CreateItemForm from "./CreateItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Box, Container, CssBaseline, Grid, Paper} from "@mui/material";
import {containerSxTool} from "./Todolist.style";
import {NavButton} from "./NavButton";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {amber, indigo} from "@mui/material/colors";
import {MaterialUISwitch} from "./ThemeSwitch";

export type FilterButtonProps = 'all' | 'active' | 'completed' | 'delete';

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
            {id: todolistId_1, title: 'What to learn', filter: 'all'},
            {id: todolistId_2, title: 'What to buy', filter: 'all'},
        ]
    )
    // const initialState: TaskType[] = [
    // {id:v1(), title:'HTML&CSS' , isDone:true },
    // {id:v1(), title:'JS' , isDone:false },
    // {id:v1(), title:'REACT' , isDone:true }
    // ]

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'REACT', isDone: true}
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Watter', isDone: false},
            {id: v1(), title: 'Bread', isDone: true}
        ]
    })
    const [Filter, setFilter] = useState<FilterButtonProps>('all');


    const TodolistTitle = 'What to learn'

    const deleteTask = (taskId: TaskType['id'], todolistId: TodolistType['id']) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f => f.id !== taskId)})
    }

    const CreateTask = (props: string, todolistId: TodolistType['id']) => {
        const newTask = {
            id: v1(),
            title: props,
            isDone: false
        }

        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId], newTask]
        })
    }


    const ChangeTodolistFilter = (Filter: FilterButtonProps, todolistId: TodolistType['id']) => {
        const nextState = todolists.map((f) => f.id === todolistId ? {...f, filter: Filter} : f);
        setTodolists(nextState)

    }

    const ChangeIsDone = (id: TaskType['id'], todolistId: TodolistType['id']) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone: !el.isDone} : el)})
    }


    const ChangeTaskTitle = (id: TaskType['id'], title: TaskType['title'], todolistId: TodolistType['id']) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, title: title} : el)})
    }

    const ChangeTodolistTitle = (title: TaskType['title'], todolistId: TodolistType['id']) => {
        const nextState = todolists.map((f) => f.id === todolistId ? {...f, title: title} : f);
        setTodolists(nextState)

    }


    const deleteTodolist = (todolistId: TodolistType['id']) => {
        const nextState = todolists.filter((f) => f.id !== todolistId)
        setTodolists(nextState)
        const copyState = {...tasks}
        delete copyState[todolistId]
        setTasks(copyState)
    }


    const CreateTodolist = (title: TodolistType['title']) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {
            id: todolistId,
            title: title,
            filter: 'all',

        }

        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistId]: []})
    }


    const todolistComponent = todolists.map((tl) => {
        const TasksForTodolists = getFilteredTasks(tasks[tl.id], tl.filter);
        return (
            <Grid key={tl.id}>
            <Paper
                sx={{p:'15px'}}
               elevation={6}
            >
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
                  CreateTodolist={CreateTodolist}
                  ChangeTodolistTitle={ChangeTodolistTitle}
                  ChangeTaskTitle={ChangeTaskTitle}
              />

            </Paper>
            </Grid>
        )
    })
    const [dark,setDark] = useState(false)
    const theme = createTheme({
        palette: {
            primary: indigo,
            secondary: amber,
            mode: dark ?  'dark' : 'light',
        }

    })

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
            <AppBar position="static">

                <Toolbar sx={containerSxTool}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Box>
                        <MaterialUISwitch onChange={() => setDark(!dark)} />
                        <NavButton background="#b35d06">Sign in</NavButton>
                        <NavButton background="#b35d06">Sign out</NavButton>
                        <NavButton background={theme.palette.secondary.dark}>FAQ</NavButton>
                    </Box>

                </Toolbar>

            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container spacing={3} sx={{p:'10px 0'}}>
                    <CreateItemForm CreateItem={CreateTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolistComponent}
                </Grid>
            </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
