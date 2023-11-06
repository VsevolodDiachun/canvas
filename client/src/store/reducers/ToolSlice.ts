import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ToolState {
    tool: any
}

const initialState: ToolState = {
      tool: null
}

export const toolSlice = createSlice({
    name: 'tool',
    initialState,
    reducers: {
      setTool(state, action: PayloadAction<any>){						
            state.tool = action.payload
      }
    }
})

export default toolSlice.reducer