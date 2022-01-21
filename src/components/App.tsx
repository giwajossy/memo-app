import React, { useState } from 'react';
import Header from "./Header"
import Swal from 'sweetalert2'
import CreateNote from "./CreateNote"
import Note from "./Note"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Zoom from '@mui/material/Zoom';

export interface IState {
  note: {
    title: string,
    content: string
  },
  notes: {
    title: string,
    content: string
  }[],
  focused: boolean,
  newNote: {
    title: string,
    content: string
  },
  whenClicked: (newNote: any) => void
}


export type INoteProp = {
  id: number,
  title: string,
  content: string,
  onDelete: (id: number) => void,
  onEdit: (id: number) => void
}



const App = (): JSX.Element => {

  const [notes, setNotes] = useState<IState["notes"]>([])

  const addNote = (newNote: { title: string; content: string; }) => {
    setNotes(previousNotes => {
      return [...previousNotes, newNote]
    })
  }



  const deleteNote = (id: number) => {

    const getNote = notes.find((_item, index) => index === id)

    // Handling the foresight that 'getNote' will return 'undefined' when the note-tray is empty
    let processedNoteTitle = getNote !== undefined ? getNote.title : null

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire(
          'Deleted!',
          `'${processedNoteTitle}' has been deleted.`,
          'success'
        )

        setNotes(previousNotes => {
          return previousNotes.filter((_item, index) => {
            return id !== index
          })
        })

      }
    })
  }


  const editNote = async (id: number) => {

    const getNote = notes.find((_item, index) => index === id)

    // Handling the foresight that 'getNote' will return 'undefined' when the note-tray is empty
    let processedNoteTitle = getNote !== undefined ? getNote.title : null
    let processedNoteContent = getNote !== undefined ? getNote.content : null


    const { value: formValues } = await Swal.fire({
      title: 'Edit Note',
      html:
        `<textarea id="swal-input1" row="1" class="swal2-input" value=${processedNoteTitle} placeholder="Take a note">${processedNoteTitle}</textarea> ` +
        `<textarea id="swal-input2" row="3" class="swal2-input" value=${processedNoteContent} placeholder="Take a note">${processedNoteContent}</textarea> `,
      focusConfirm: false,
      preConfirm: () => {
        let getUpdatedTitle = document.getElementById('swal-input1') as HTMLInputElement
        let getUpdatedContent = document.getElementById('swal-input2') as HTMLInputElement
        return [
          (getUpdatedTitle).value,
          (getUpdatedContent).value
        ]
      }
    })

    if (formValues) {
      // Swal.fire(JSON.stringify(formValues))

      let [getUpdatedTitle, getUpdatedContent] = formValues

      setNotes(previousNotes => {
        console.log(previousNotes)
        return previousNotes.filter((item) => {
          if (item.title === processedNoteTitle) {
            item.title = getUpdatedTitle || processedNoteTitle as string
            item.content = getUpdatedContent || processedNoteContent as string
          }
          console.log("Title", item.title, typeof (item.title))
          console.log("Content", item.content, typeof (item.content))
          return previousNotes
        })
      })

    }
  }

  let displayView: React.CSSProperties = {
    display: notes.length === 0 ? null : "none"
  } as any


  return (
    <div>
      <Header />
      <CreateNote whenClicked={addNote} />

      <Zoom in={true}>
        <div className="emptyView" style={displayView}>
          Simple. Free. Easy to use! Take quick notes on the fly! <br /><br />
          Notes you add appear down here. <br /><br />
          <KeyboardDoubleArrowDownIcon fontSize="large" />
        </div>
      </Zoom>

      {
        notes.map((noteDetails, index) => {
          return <Note
            key={index}
            id={index}
            title={noteDetails.title}
            content={noteDetails.content}
            onDelete={deleteNote}
            onEdit={editNote} />
        })
      }

      {/* <Footer /> */}
    </div>
  );
}

export default App;
