import {TaskType} from "./Todolist";

type TitleBut = {
    name:string
    onClick?:() => void
    disabled?:boolean
}


export const Button = (props:TitleBut) => {


    return (

            <button disabled={props.disabled} onClick={props.onClick} >{props.name}</button>


    )

}