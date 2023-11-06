import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CanvasState {
      canvas: any
}

const initialState: CanvasState = {
      canvas: null
}

export const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
      setCanvas(state, action: PayloadAction<any>){						
            state.canvas = action.payload
      }
    }
})

export default canvasSlice.reducer