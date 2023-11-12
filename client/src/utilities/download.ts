import {useAppSelector} from "../hooks/redux";

export const Download = (): void => {
    const {canvas, sessionId} = useAppSelector(state => state.canvasReducer)
    const dataURL = canvas.toDataURL()
    const a = document.createElement('a')
    a.href = dataURL
    a.download = sessionId + '.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}