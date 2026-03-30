import React, { useState } from 'react';
import { Button } from './button';

type Props = {
    title: string;
    changeTitle: (newTitle: string) => void;
    className?: string;
    editMode?: boolean;
    onEditMode?: () => void;
    offEditMode?: () => void;
};

export const EditableSpan = ({
                                 title,
                                 changeTitle,
                                 className,
                                 editMode = false,
                                 onEditMode,
                                 offEditMode,
                             }: Props) => {
    const [currentTitle, setCurrentTitle] = useState(title);

    const exitEditMode = () => {
        offEditMode?.();
        changeTitle(currentTitle);
    };

    return editMode ? (
        <>
            <input
                autoFocus
                onBlur={exitEditMode}
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.currentTarget.value)}
            />
            <Button name="save" onClick={exitEditMode} />
        </>
    ) : (
        <span className={className} onDoubleClick={onEditMode}>
            {title}
        </span>
    );
};