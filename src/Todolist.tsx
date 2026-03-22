import {Button} from "./button"
import {FilterButtonProps, TodolistType} from "./App";
import {ChangeEvent, useState} from "react";


export type PropsTitle = {
    id: string;
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType['id'],todolistId: TodolistType['id']) => void
    ChangeTodolistFilter: (Filter: FilterButtonProps,todolistId: TodolistType['id']) => void
    CreateTask: (props: string,todolistId: TodolistType['id']) => void
    ChangeIsDone: (id: string,todolistId: TodolistType['id']) => void
    Filter:string
    deleteTodolist: (todolistId:TodolistType['id'])=> void
}


export type TaskType = {
    id: string
    isDone: boolean
    title: string


}

export const Todolist = (props: PropsTitle) => {
    const [taskInput, setTaskInput] = useState('')
    const {title, tasks, deleteTask,deleteTodolist} = props


    const onClickCreateTaskHandler = () => {
        taskInput.trim() && props.CreateTask(taskInput.trim(),props.id)
        setTaskInput('')
    }
    const onChangeSetTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskInput(e.currentTarget.value)
    const onKeyDownCreateTaskHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickCreateTaskHandler()
        }
    }

    const ChangeIsDoneHandler = (id: string) => {
        props.ChangeIsDone(id, props.id)
    }

    const onClickDeleteTodolistHandler = () => {deleteTodolist(props.id)}

    const tasksList = props.tasks.length === 0
        ? <span>Your is empty</span>

            :  props.tasks.map(t => {
                const onClickDeleteHandler = () => {
                    props.deleteTask(t.id, props.id)
                }
            return (

                <li key={t.id}>
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => ChangeIsDoneHandler(t.id)}
            />
            <span className={t.isDone ? "task-done" : "task"} >{t.title}</span>
            {<Button name="X" onClick={onClickDeleteHandler}/>}
        </li>)


}
)


return (
    <div>
        <div>
            <h3>
                {props.title}
                <Button name={'X'} onClick={onClickDeleteTodolistHandler}/>
            </h3>

            <input value={taskInput}
                   onKeyDown={onKeyDownCreateTaskHandler}
                   onChange={onChangeSetTitleHandler}/>
            <Button name={'+'}
                // disabled={taskInput.length <3 || taskInput.length > 10}
                    onClick={onClickCreateTaskHandler}
            />
            {!!taskInput.length && taskInput.length < 3 && <div>title must be more then 3 charaters</div>}
            {taskInput.length >= 3 && taskInput.length <= 10 && <div> title must be less then 10 charaters </div>}
            {taskInput.length > 10 && <div style={{color: 'red'}}> title must be less then 10 charaters </div>}

        </div>
        <ul>

            {tasksList}
        </ul>

        <div>

            <Button className={props.Filter==='all' ? 'btn-filter-active' : '' } name='all' onClick={() => (props.ChangeTodolistFilter('all', props.id))}/>
            <Button className={props.Filter==='active' ? 'btn-filter-active' : '' }  name='active' onClick={() => (props.ChangeTodolistFilter('active',props.id))}/>
            <Button className={props.Filter==='completed' ? 'btn-filter-active' : '' } name='completed' onClick={() => (props.ChangeTodolistFilter('completed', props.id))}/>
            <div><Button name='Delete all tasks' onClick={() => (props.ChangeTodolistFilter('delete', props.id))}/></div>
        </div>
    </div>
)


}