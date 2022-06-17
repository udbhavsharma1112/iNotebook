import React,{useContext} from 'react'
import noteContext from '../context/notes/NoteContext'
const Noteitems = (props) => {
    const context=useContext(noteContext);
    const {deleteNote}=context;
    const { note,update,showAlert} = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >

                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} </p>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); showAlert("Deleted Successfully","success")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{update(note)}}></i>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                  
                </div>
            </div>
            
        </div>
    )
}

export default Noteitems
