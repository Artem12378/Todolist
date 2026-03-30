import React, { useState } from 'react';
import { EditableSpan } from "./EditableSpan";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Box, IconButton, SxProps } from "@mui/material";

type Props = {
    title: string;
    changeTitle: (title: string) => void;
    deleteItem: () => void;
    sx?: SxProps;
};

const ItemTitle = ({ title, changeTitle, deleteItem, sx }: Props) => {
    const [editMode, setEditMode] = useState(false);

    const onEditMode = () => setEditMode(true);
    const offEditMode = () => setEditMode(false);

    return (
        <Box sx={sx} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <EditableSpan
                title={title}
                changeTitle={changeTitle}
                editMode={editMode}           // теперь поле знает, что редактирование включено
                onEditMode={onEditMode}
                offEditMode={offEditMode}
            />
            <IconButton size="small" onClick={deleteItem}>
                <DeleteForeverRoundedIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default ItemTitle;