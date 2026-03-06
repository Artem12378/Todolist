import {Button} from "./button"
import {FilterButtonProps} from "./App";
import {useRef} from "react";




export type PropsTitle = {
    title: string
    tasks: TaskType[]
    deleteTask:(taskId: TaskType['id'])=>void
    ChangeTodolistFilter:(Filter: FilterButtonProps) => void
    CreateTask:(props:string) =>void
}


export type TaskType = {
    id: string
    isDone: boolean
    title: string


}

export const Todolist = (props: PropsTitle) => {

    const {title, tasks, deleteTask} = props

    const taskInputRef = useRef<HTMLInputElement>(null)

    const tasksList = props.tasks.length === 0 
    ? <span>Your is empty</span>
    : props.tasks.map(t => {
        return <li key={t.id}>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
            {<Button  name="X" onClick={()=>props.deleteTask(t.id)}  />}
        </li>
    })
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <input ref={taskInputRef}

                />
                <Button name={'+'} onClick={()=> {
                    if(taskInputRef.current ){
                        props.CreateTask(taskInputRef.current.value)
                        taskInputRef.current.value=''
                    }
                }    } />
            </div>
            <ul>

                {tasksList}
            </ul>

            <div>

                <Button name='all' onClick={()=>(props.ChangeTodolistFilter('all'))}/>
                <Button name='active' onClick={()=>(props.ChangeTodolistFilter('active'))}/>
                <Button name='completed' onClick={()=>(props.ChangeTodolistFilter('completed'))}/>
                <div><Button name='Delete all tasks' onClick={()=>(props.ChangeTodolistFilter('delete'))}/></div>
            </div>
        </div>
    )



}