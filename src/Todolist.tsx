import { FilterButtonProps, TodolistType } from "./App";
import { useState } from "react";
import CreateItemForm from "./CreateItemForm";
import { EditableSpan } from "./EditableSpan";
import ItemTitle from "./itemTitle";
import {Box, Button, Checkbox, Typography} from "@mui/material";
import {containerSxBox} from "./Todolist.style";
import {getItemTitleSx} from "./Item.styles";

export type TaskType = {
    id: string;
    isDone: boolean;
    title: string;
};

export type PropsTitle = {
    id: string;
    title: string;
    tasks: TaskType[];
    deleteTask: (taskId: string, todolistId: string) => void;
    ChangeTodolistFilter: (Filter: FilterButtonProps, todolistId: string) => void;
    CreateTask: (title: string, todolistId: string) => void;
    ChangeIsDone: (id: string, todolistId: string) => void;
    Filter: string;
    deleteTodolist: (todolistId: string) => void;
    ChangeTodolistTitle: (title: string, todolistId: string) => void;
    ChangeTaskTitle: (id: string, title: string, todolistId: string) => void;
    CreateTodolist: (title: TodolistType["title"]) => void;
};

const Todolist = (props: PropsTitle) => {
    const [editModeTaskId, setEditModeTaskId] = useState<string | null>(null);

    const createTaskCallback = (title: string) => {
        props.CreateTask(title, props.id);
    };

    const ChangeIsDoneHandler = (id: string) => {
        props.ChangeIsDone(id, props.id);
    };

    const onClickDeleteTodolistHandler = () => {
        props.deleteTodolist(props.id);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Typography fontWeight={'bold'}
                        variant={'h4'}
                        sx={{display: 'flex', justifyContent: 'center'
            }}>
                <ItemTitle
                    title={props.title}
                    changeTitle={(title) => props.ChangeTodolistTitle(title, props.id)}
                    deleteItem={onClickDeleteTodolistHandler}

                />
            </Typography>

            <CreateItemForm CreateItem={createTaskCallback} />

            {/* Контейнер карточек */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap", // перенос на новую строку
                    justifyContent: "center",
                    gap: "0.5rem",
                    marginTop: "1rem",
                }}
            >
                {props.tasks.length === 0 ? (
                    <span>Your list is empty</span>
                ) : (
                    props.tasks.map((t) => (
                        <div
                            key={t.id}
                            style={{
                                width: "120px",
                                height: "120px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "8px",
                                border: "1px solid #eee",
                                borderRadius: "8px",
                                backgroundColor: "#f9f9f9",
                            }}
                        >
                            <Checkbox
                                checked={t.isDone}
                                onChange={() => ChangeIsDoneHandler(t.id)}
                                size="small"
                            />
                            <ItemTitle
                                title={t.title}
                                changeTitle={(title) => props.ChangeTaskTitle(t.id, title, props.id)}
                                deleteItem={() => props.deleteTask(t.id, props.id)}   // <--- добавлено
                                //className={t.isDone ? "task-done" : "task"}



                                sx={getItemTitleSx(t.isDone)}
                            />
                            <Button size="small" color="error" onClick={() => props.deleteTask(t.id, props.id)}>
                                X
                            </Button>
                        </div>
                    ))
                )}
            </div>

            {/* Фильтры */}
            <Box sx={containerSxBox}>
                <Button
                    variant="contained"
                    disableElevation
                    size="small"
                    color={props.Filter === "all" ? "secondary" : "primary"}
                    onClick={() => props.ChangeTodolistFilter("all", props.id)}
                >
                    All
                </Button>
                <Button
                    variant="contained"
                    disableElevation
                    size="small"
                    color={props.Filter === "active" ? "secondary" : "primary"}
                    onClick={() => props.ChangeTodolistFilter("active", props.id)}
                >
                    Active
                </Button>
                <Button
                    variant="contained"
                    disableElevation
                    size="small"
                    color={props.Filter === "completed" ? "secondary" : "primary"}
                    onClick={() => props.ChangeTodolistFilter("completed", props.id)}
                >
                    Completed
                </Button>
            </Box>
        </div>
    );
};

export default Todolist;