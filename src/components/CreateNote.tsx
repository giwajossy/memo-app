import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { IState as Props } from "./App"
import { ToastContainer, toast, Zoom as IZoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

type IProps = {
  whenClicked: Props['whenClicked']
  addButtonStatus: boolean
}


const CreateArea: React.FC<IProps> = ({ whenClicked }): JSX.Element => {

  const [note, setNote] = useState<Props['note']>({
    title: "",
    content: ""
  })

  const focusStatus = false
  const [isFocused, setIsFocused] = useState<Props['focused']>(focusStatus)

  const [buttonStatus, setButtonStatus] = useState<IProps['addButtonStatus']>(true) // Disabled by default

  const handleFocus = (): void => setIsFocused(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setNote(previousNote => {
      return {
        ...previousNote,
        [name]: value
      }
    })

    // Disable button until both fields are filled
    note.title && note.content ? setButtonStatus(false) : setButtonStatus(true)

  }

  const pushNote = (event: any): void => {

    if (!note.title || !note.content) return
    whenClicked(note)
    toast.success(`Added New Note 🙂`, {
      position:  toast.POSITION.BOTTOM_RIGHT
    });
    setNote({
      title: "",
      content: ""
    })

    event.preventDefault()
  }

  return (
    <div className="form-container">
      <form className="create-note" >

        <input
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Title"
          style={{ display: isFocused ? "table" : "none" }}
        />

        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Take a note..."
          rows={isFocused ? 3 : 1}
          onFocus={handleFocus}
        />

        <Zoom in={isFocused}>
          <Fab onClick={pushNote} disabled={buttonStatus}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>

      <ToastContainer  role="alert" transition={IZoom} limit={3}/>
    </div>
  );
}

export default CreateArea;
