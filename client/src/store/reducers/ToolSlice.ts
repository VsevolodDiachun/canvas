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
      },
      setFillColor(state, action: PayloadAction<string>) {
        state.tool.fillColor = action.payload
      },
      setStrokeColor(state, action: PayloadAction<string>) {
        state.tool.strokeColor = action.payload
      },
      setLineWidth(state, action: PayloadAction<string>) {
        state.tool.lineWidth = action.payload
      },
    }
})

export default toolSlice.reducer