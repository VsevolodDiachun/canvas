import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WebSocketType} from "../../utils/consts";

interface CanvasState {
    canvas: any;
    undoList: any;
    redoList: any;
    username: string | null;
    socket: WebSocketType | null,
    sessionId: string | null
}

const initialState: CanvasState = {
    canvas: null,
    undoList: [],
    redoList: [],
    username: '',
    socket: null,
    sessionId: null
}

export const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        setUsername(state, action:PayloadAction<string>) {
            state.username = action.payload
        },
        setCanvas(state, action: PayloadAction<any>){
            state.canvas = action.payload
        },
        pushToUndo(state, action: PayloadAction<any>) {
            state.undoList.push(action.payload)
        },
        pushToRedo(state, action: PayloadAction<any>) {
            state.redoList.push(action.payload)
        },
        setSocket(state, action: PayloadAction<WebSocketType>) {
            state.socket = action.payload
        },
        setSessionId(state, action: PayloadAction<string>) {
            state.sessionId = action.payload
        },
        undo(state) {
            const canvas = state.canvas
            const ctx = canvas?.getContext('2d')
            if (state.undoList.length > 0 && state.canvas) {
                let dataURL = state.undoList.pop()
                state.redoList.push(state.canvas().toDataURL())
                let img = new Image()
                img.src = dataURL
                img.onload = () => {
                    if (canvas) {
                        ctx?.clearRect(0, 0, canvas.width, canvas.height)
                        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
                    }
                }
            } else {
                  if(state.canvas()) ctx?.clearRect(0, 0, state.canvas.width, state.canvas.height)

            }
        },
        redo(state) {
            const ctx = state.canvas()?.getContext('2d')
            const canvas = state.canvas()
            if (state.redoList.length > 0 && state.canvas()) {
                let dataURL = state.redoList.pop()
                state.undoList.push(state.canvas().toDataURL())
                let img = new Image()
                img.src = dataURL
                img.onload = () => {
                    if (canvas) {
                        ctx?.clearRect(0, 0, canvas.width, canvas.height)
                        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
                    }
                }
            }
        }
    }
})

export default canvasSlice.reducer