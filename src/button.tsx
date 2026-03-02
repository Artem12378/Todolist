import {TaskType} from "./Todolist";

type TitleBut = {
    name:string
    onClick?:() => void
}


export const Button = (props:TitleBut) => {


    return (

            <button onClick={props.onClick} >{props.name}</button>


    )

}