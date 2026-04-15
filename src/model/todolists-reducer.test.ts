import { v1 } from 'uuid';
import type { TodolistType } from '../App';
import {deleteTodolistAC, TodolistsReducer} from './todolists-reducer';

test('correct todolist should be deleted', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];

    //const action = deleteTodolistAC(todolistId1)

    const endState = TodolistsReducer(startState, deleteTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});