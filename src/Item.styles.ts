import {SxProps} from "@mui/material";
import {TaskType} from "./Todolist";


export const getItemTitleSx= (isDone:TaskType['isDone']): SxProps => ({
        fontWeight: isDone ? 'normal' : 'bold',
        textDecoration: isDone ? 'line-through' : 'none',
        fontStyle: isDone ? 'italic' : 'normal',
        opacity: isDone? 0.5 : 1
})

//     .task-done {
//     font-style: italic;
//     text-decoration: line-through;
//     opacity: 0.5;
//
// }
//
// .task {
//     fo   nt-weight: bold;
// }