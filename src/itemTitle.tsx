import React, {useState} from 'react';
import {EditableSpan} from "./EditableSpan";
import {Button} from "./button";

type Props = {
    className?: string,
    title: string,
    changeTitle: (title: string) => void,
    deleteItem: () => void,
}

const ItemTitle = (props: Props) => {
    const [editMode, setEditMode] = useState(false);

    const onEditMode = () => setEditMode(true);
    const offEditMode = () => setEditMode(false);

    return (
        editMode
            ?
            <span>
                <EditableSpan
                    title={props.title}
                    classname={props.className}
                    editMode={editMode}
                    onEditMode={onEditMode}
                    offEditMode={offEditMode}
                    changeTitle={(title: string) =>
                        props.changeTitle(title)}/>



            </span>
            :
            <span className={props.className}>
                <EditableSpan
                    title={props.title}
                    classname={props.className}
                    editMode={editMode}
                    onEditMode={onEditMode}
                    offEditMode={offEditMode}
                    changeTitle={(title: string) =>
                        props.changeTitle(title)}/>

            <Button name="X" onClick={props.deleteItem}/>
            </span>


    );
};

export default ItemTitle;