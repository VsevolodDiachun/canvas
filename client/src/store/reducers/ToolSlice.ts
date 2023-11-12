import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface colors {
    strokeColor: string;
    fillColor: string;
    lineWidth: number;
}

interface ToolState {
    tool: colors;
    strokeColorValue: string;
    fillColorValue: string;
    lineWidthValue: number;
}

const initialState: ToolState = {
    tool: {
        strokeColor: '#000000',
        fillColor: '#000000',
        lineWidth: 1
    },
    strokeColorValue: '#000000',
    fillColorValue: '#000000',
    lineWidthValue: 1
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
          state.fillColorValue = action.payload
      },
      setStrokeColor(state, action: PayloadAction<string>) {
          state.tool.strokeColor = action.payload
          state.strokeColorValue = action.payload
      },
      setLineWidth(state, action: PayloadAction<number>) {
          state.tool.lineWidth = action.payload
          state.lineWidthValue = action.payload
      },
        updateColor(state, action: PayloadAction<{strokeColorValue: string, fillColorValue: string, lineWidthValue: number}>) {
          const {strokeColorValue, fillColorValue, lineWidthValue} = action.payload
            state.tool.fillColor = fillColorValue
            state.tool.strokeColor = strokeColorValue
            state.tool.lineWidth = lineWidthValue
        }
    }
})

export default toolSlice.reducer