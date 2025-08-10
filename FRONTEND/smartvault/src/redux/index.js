import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
 notes:localStorage.getItem("myNote")

 ?  JSON.parse(localStorage.getItem("myNote"))
 :[]
}   

export const notesSlice = createSlice({

  name: 'note',
  initialState,
  reducers: {
    addToNotes: (state,action) => {
      const note=action.payload;
      // add a check that paste already exists 
      // same title exist

      state.notes.push(note);
      localStorage.setItem("myNote",
      JSON.stringify(state.notes)
      )
      toast("Note Created Successfully...")

    },
    updateToNotes: (state,action) => {
      const noteId=action.payload;
      
      const index=state.notes.findIndex((item)=> item._id===noteId._id);

        if(index>=0){
          state.notes[index]=noteId;
          localStorage.setItem("myNote", JSON.stringify(state.notes));
            toast("Note Updated Successfully")
           

        }
      
    },
    resetAllNotes: (state, action) => {
      state.notes=[];
      localStorage.removeItem("myNote");

    },
    removeFromNotes:(state,action)=>{
       const noteId=action.payload;
       console.log(noteId)
       const index=state.notes.findIndex((item)=>
        item._id===noteId);

     
        if(index >=0){
          state.notes.splice(index,1);
          localStorage.setItem("myNote",
            JSON.stringify(state.notes)
          );
          toast.success("Note Deleted ")
        }
    
  
}

  }
})


// Action creators are generated for each case reducer function
export const { addToNotes, updateToNotes, resetAllNotes,removeFromNotes} = notesSlice.actions

export default notesSlice.reducer