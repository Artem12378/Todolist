import {TaskType} from "./Todolist";
import {FilterButtonProps} from "./App";


export const getFilteredTasks = (tasks:TaskType[], Filter: FilterButtonProps) => {

    return Filter ==='active'
        ? tasks.filter(f => !f.isDone)
        : Filter === 'completed'
            ? tasks.filter(f => f.isDone)
            :  tasks
}