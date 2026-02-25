import { ButtonName } from "./button"




export type PropsTitle = {
    title: string
    tasks: TaskType[]
}


export type TaskType = {
    id: number
    isDone: boolean
    title: string
}

export const Todolist = (props: PropsTitle) => {

    const {title, tasks} = props

    const tasksList = props.tasks.length === 0 
    ? <span>Your is empty</span>
    : props.tasks.map(t => {
        return <li key={t.id}>
            <input type="checkbox" checked={t.isDone} /> <span>{t.title}</span>
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
                {<ButtonName name="ALL"/>}
                {<ButtonName name="ACTsssSIVE"/>}
                {<ButtonName name="COMPLETED"/>}
            </div>
        </div>
    )



}