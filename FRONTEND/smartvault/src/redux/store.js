import { configureStore } from '@reduxjs/toolkit'
import notesReducer from '../components/NotesApp/noteSlice.js'
export const store = configureStore({
  reducer: {
      note: notesReducer,
  },
})