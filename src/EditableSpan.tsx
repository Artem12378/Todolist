import React, {useState} from 'react';
import {Button} from "./button";

type Props = {
    title: string;
    changeTitle: (newTitle: string) => void;
    classname?: string
    editMode?: boolean
    onEditMode: () => void;
    offEditMode: () => void;
};

export const EditableSpan = (props: Props) => {

    const [title, setTitle] = useState(props.title);


    const offEditMode = () => {
        props.offEditMode();
        props.changeTitle(title);

    }
    return (
        <>
            {props.editMode ? (
                <>
                    <input
                    autoFocus
                    onBlur={offEditMode}
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    />
                    <Button name="save" onClick={offEditMode}/>
                </>
            ) : (
                <span className={props.classname} onDoubleClick={props.onEditMode}>
                    {props.title}
                </span>
            )}
        </>
    );
};
