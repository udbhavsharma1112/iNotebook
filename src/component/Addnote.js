import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/NoteContext'


const Addnote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const {showAlert}=props;
    const [note,setNote]=useState({title: "",description:"",tags:""});

const handle=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tags);
    setNote({ id: "", title: "", description: "", tags: "" });
    showAlert("Your Notes added successfully","success");
}

const onChange=(e)=>{
setNote({...note,[e.target.name]: e.target.value})
}

  return (
    <div className="container my-3">
    <h1 >Add a Note</h1>
       <form>
    <div className="form-group mb-3">
      <label htmlFor="title">Title</label>
      <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange} value={note.title}  minLength={5} required/>
    </div>
    <div className="form-group mb-3">
      <label htmlFor="description">Description</label>
      <input type="text" className="form-control" id="description" name='description' placeholder="Description" onChange={onChange} value={note.description}  minLength={5} required/>
    </div>
    <div className="form-group">
      <label htmlFor="tags">Tags</label>
      <input type="text" className="form-control" id="tags" name='tags' placeholder="Tags" onChange={onChange} value={note.tags}/>
    </div>
    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handle}>Save</button>
  </form>
  </div>
  )
}

export default Addnote
