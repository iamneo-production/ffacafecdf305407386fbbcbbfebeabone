import React, { useState } from "react";

function CreateArea(props){

    const[note, setNote] =useState({
        title:"",
        content:""
    })
    function handleChange(e){
        const {name, value} = e.target;
        setNote(prevNote =>{
            return{
                ...prevNote,
                [name]: value
            };
        });

    }

    const [showPopup, setShowPopup] = useState(false);
    function submitNote(e){
        if (note.title.trim() !== "" && note.content.trim() !== "") {
        props.onAdd(note);
        setNote({
            title:"",
            content:""
        });
        
    }else {
        setShowPopup(true);
    }
        e.preventDefault();

    }
    function Popup({ onClose }) {
        return (
            <div className="popup">
                <p>Please enter both a title and content before adding a note.</p>
                <button className="close" onClick={onClose}>Close</button>
            </div>
        );
    }

    return(
        <div>
            {showPopup && <Popup onClose={() => setShowPopup(false)} />}
            <form>
                <input name="title" value={note.title} onChange={handleChange} placeholder="Task..." />
                <textarea name="content" value={note.content} onChange={handleChange} placeholder="Steps to be done ..."  />
                <button onClick={submitNote}>Add</button>
            </form >
        </div>
    )
}
export default CreateArea;