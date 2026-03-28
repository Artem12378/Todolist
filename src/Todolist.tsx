import {Button} from "./button"
import {FilterButtonProps, TodolistType} from "./App";
import {ChangeEvent, useState} from "react";
import CreateItemForm from "./CreateItemForm";
import {EditableSpan} from "./EditableSpan";
import ItemTitle from "./itemTitle";


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
    CreateTodolist : (title:TodolistType['title']) => void
    ChangeTodolistTitle: (title:TaskType['title'],todolistId:TodolistType['id']) => void
    ChangeTaskTitle : (id:TaskType['id'],title:TaskType['title'],todolistId:TodolistType['id']) => void
}


export type TaskType = {
    id: string
    isDone: boolean
    title: string


}

const Todolist = (props: PropsTitle) => {


    const createTaskCallback = (title:TaskType['title']) => {
        props.CreateTask(title,props.id)

    }


    const ChangeIsDoneHandler = (id: string) => {
        props.ChangeIsDone(id, props.id)
    }

     const onClickDeleteTodolistHandler = () => {props.deleteTodolist(props.id)}


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


            {/*<span className={t.isDone ? "task-done" : "task"} >*/}
            {/*    <EditableSpan classname={t.isDone ? "task-done" : "task"} title={t.title} changeTitle={(title:string)=>props.ChangeTaskTitle(t.id,title,props.id)}/>*/}
            {/*</span>*/}
            {/*{<Button name="X" onClick={onClickDeleteHandler}/>}*/}
                    <ItemTitle
                        className={t.isDone ? "task-done" : "task"}
                        title={t.title}
                        changeTitle={(title:string)=>props.ChangeTaskTitle(t.id,title,props.id)}
                        deleteItem={onClickDeleteHandler}
                        />
        </li>)


}
)


return (
    <div>

        <h3>
            {/*<EditableSpan  title={props.title} changeTitle={(title:string)=>props.ChangeTodolistTitle(title,props.id)} />*/}
            {/*<Button name={'X'} onClick={onClickDeleteTodolistHandler}/>*/}
            <ItemTitle title={props.title}
                       changeTitle={(title:string)=>props.ChangeTodolistTitle(title,props.id)}
                       deleteItem={onClickDeleteTodolistHandler}
                       />
        </h3>
        <CreateItemForm CreateItem={createTaskCallback}/>
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
export default Todolist