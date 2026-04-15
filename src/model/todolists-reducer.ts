import React from 'react';
import {TodolistType} from "../App";


export type deleteTodolistAction = ReturnType<typeof deleteTodolistAC>



export const TodolistsReducer = (todolists:TodolistType[], action: deleteTodolistAction):TodolistType[] => {
    switch (action.type) {
        case 'delete-todolist':
            return todolists.filter(todolist => todolist.id !== action.payload.id)
        default:
            return todolists;
    }
};

export const deleteTodolistAC = (id:TodolistType['id']) => ({
    type: 'delete-todolist',
    payload: {
        id: id
    }
} as const)