import React from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Zoom from '@mui/material/Zoom';
import { INoteProp } from "./App"

const Note: React.FC<INoteProp> = ({ id, title, content, onDelete, onEdit }): JSX.Element => {

    const handleDeletion = () => onDelete(id)

    const handleEdit = () => onEdit(id)

    return (
        <div className="note">
            <h1>{title}</h1> <hr />
            <p>{content}</p>
            <Zoom in={true}>
                <button onClick={handleDeletion} className="deleteButton">
                    <DeleteIcon />
                </button>
            </Zoom>
            <Zoom in={true}>
                <button onClick={handleEdit} className="editButton">
                    <EditIcon />
                </button>
            </Zoom>
        </div>
    )
}

export default Note

