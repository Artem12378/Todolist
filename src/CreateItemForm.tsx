import React, {ChangeEvent, useState} from 'react';
import {Button} from "./button";


export type CreateItemFormProps = {


    CreateItem: (title:string) => void

}
const CreateItemForm = (props: CreateItemFormProps) => {

    const [ItemInput, setItemInput] = useState('')

    const onClickCreateItemHandler = () => {
        props.CreateItem(ItemInput)
        setItemInput('')

    }

    const onChangeSetTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setItemInput(e.currentTarget.value)

    const onKeyDownCreateItemHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickCreateItemHandler()
        }
    }

    return (
        <div>
            <input
                value={ItemInput}
                onKeyDown={onKeyDownCreateItemHandler}
                onChange={onChangeSetTitleHandler}
            />
            <Button
                name={'+'}
                onClick={onClickCreateItemHandler}
            />
            {!!ItemInput.length && ItemInput.length < 3 && (
                <div>title must be more than 3 characters</div>
            )}
            {ItemInput.length >= 3 && ItemInput.length <= 10 && (
                <div>title must be less than 10 characters</div>
            )}
            {ItemInput.length > 10 && (
                <div style={{ color: 'red' }}>
                    title must be less than 10 characters
                </div>
            )}
        </div>
    );
};

export default CreateItemForm;