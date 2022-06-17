import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext'
import Addnote from './Addnote';
import NoteItems from './Noteitems'
const Notes = (props) => {


const {showAlert}=props;
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
const history=useHistory();


  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etags: "" });


  useEffect(() => {

    if(localStorage.getItem('token'))
    getNotes();
    else {
      history.push('/login')
    }
    // eslint-disable-next-line
  }, [])


  const ref = useRef(null);
  const refclose = useRef(null);


  const updateNote = (currnote) => {
    ref.current.click();
    setNote({ id: currnote._id, etitle: currnote.title, edescription: currnote.description, etags: currnote.tags });
    
  }

  
  const handle = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etags)
    refclose.current.click();
    showAlert("Your notes updated successfully","success");
    
    // addNote(note.title,note.description,note.tags);
  }


  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }


  return (
    <div className='row my-5'>


      <Addnote showAlert={props.showAlert}/>


      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="etitle">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" placeholder="Enter title" value={note.etitle} onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="edescription">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' placeholder="Description" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group">
                  <label htmlFor="etags">Tags</label>
                  <input type="text" className="form-control" id="etags" name='etags' placeholder="Tags" value={note.etags} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary my-3" onClick={handle}>Save</button>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handle} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <h2>Your notes</h2>
      {
        notes.map((note) => {
          return <NoteItems key={note._id} note={note} update={updateNote} showAlert={showAlert} />
        })
      }
    </div>
  )
}

export default Notes
