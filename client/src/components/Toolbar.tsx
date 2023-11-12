import React, {FC} from 'react';
import style from '../styles/toolbar.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toolSlice } from '../store/reducers/ToolSlice';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';
import { canvasSlice } from '../store/reducers/CanvasSlice';
import {getDocQSCanvas} from "../hooks/getDocQSCanvas";

const Toolbar: FC = () => {
    const {canvas, socket, sessionId} = useAppSelector(state => state.canvasReducer)
    const {fillColorValue} = useAppSelector(state => state.toolReducer)
    const {setTool, setStrokeColor, setFillColor} = toolSlice.actions
    const {undo, redo} = canvasSlice.actions
    const dispatch = useAppDispatch()

    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setStrokeColor(e.target.value))
        dispatch(setFillColor(e.target.value))
    }

    const download = (): void => {
        const dataURL = canvas.toDataURL()
        const a = document.createElement('a')
        a.href = dataURL
        a.download = sessionId + '.jpg'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className={style.toolbar}>
            <button
                className={style.toolbar__btn + ' ' + style.brush}
                onClick={() => dispatch(setTool(new Brush(getDocQSCanvas() as HTMLCanvasElement, socket as WebSocket, sessionId)))}
            />
            <button
                className={style.toolbar__btn + ' ' + style.rect}
                onClick={() => dispatch(setTool(new Rect(getDocQSCanvas() as HTMLCanvasElement, socket as WebSocket, sessionId)))}
            />
            <button
                className={style.toolbar__btn + ' ' + style.circle}
                onClick={() => dispatch(setTool(new Circle(getDocQSCanvas() as HTMLCanvasElement, socket as WebSocket, sessionId)))}
            />
            <button
                className={style.toolbar__btn + ' ' + style.eraser}
                onClick={() => dispatch(setTool(new Eraser(getDocQSCanvas() as HTMLCanvasElement, socket as WebSocket, sessionId)))}
            />
            <button
                className={style.toolbar__btn + ' ' + style.line}
                onClick={() => dispatch(setTool(new Line(getDocQSCanvas() as HTMLCanvasElement, socket as WebSocket, sessionId)))}
            />
            <input
                onChange={e => changeColor(e)} value={fillColorValue}
                className={style.settingBar__input} type='color'
            />
            <button
                className={style.toolbar__btn + ' ' + style.undo}
                onClick={() => dispatch(undo())}
            />
            <button
                className={style.toolbar__btn + ' ' + style.redo}
                onClick={() => dispatch(redo())}
            />
            <button
                className={style.toolbar__btn + ' ' + style.save}
                onClick={() => download()}
            />
        </div>
    );
};

export default Toolbar;