import {Button} from "./button"
import {FilterButtonProps} from "./App";




export type PropsTitle = {
    title: string
    tasks: TaskType[]
    deleteTask:(taskId: TaskType['id'])=>void
    ChangeTodolistFilter:(Filter: FilterButtonProps) => void
}


export type TaskType = {
    id: number
    isDone: boolean
    title: string


}

export const Todolist = (props: PropsTitle) => {

    const {title, tasks, deleteTask} = props

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
                <input />
                <button>+</button>
            </div>
            <ul>

                {tasksList}
            </ul>

            <div>

                <Button name='all' onClick={()=>(props.ChangeTodolistFilter('all'))}/>
                <Button name='active' onClick={()=>(props.ChangeTodolistFilter('active'))}/>
                <Button name='completed' onClick={()=>(props.ChangeTodolistFilter('completed'))}/>
            </div>
        </div>
    )



}