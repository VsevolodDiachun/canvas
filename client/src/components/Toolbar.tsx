import React, { FC } from 'react';
import style from '../styles/toolbar.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toolSlice } from '../store/reducers/ToolSlice';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Eraser from '../tools/Erasir';
import Line from '../tools/Line';
import { canvasSlice } from '../store/reducers/CanvasSlice';

const Toolbar: FC = () => {
      const {canvas} = useAppSelector(state => state.canvasReducer)
      const {setTool, setStrokeColor, setFillColor} = toolSlice.actions
      const {undo, redo} = canvasSlice.actions
      const dispatch = useAppDispatch()

      const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setStrokeColor(e.target.value))
            dispatch(setFillColor(e.target.value))
      }

      return (
            <div className={style.toolbar}>
                  <button className={style.toolbar__btn + ' ' + style.brush} onClick={() => dispatch(setTool(new Brush(canvas)))}/>
                  {/* <button className={style.toolbar__btn + ' ' + style.brush} onClick={() => console.log(typeof(new Brush(canvas)))}/> */}
                  <button className={style.toolbar__btn + ' ' + style.rect} onClick={() => dispatch(setTool(new Rect(canvas)))}/>
                  <button className={style.toolbar__btn + ' ' + style.circle} onClick={() => dispatch(setTool(new Circle(canvas)))}/>
                  <button className={style.toolbar__btn + ' ' + style.eraser} onClick={() => dispatch(setTool(new Eraser(canvas)))}/>
                  <button className={style.toolbar__btn + ' ' + style.line} onClick={() => dispatch(setTool(new Line(canvas)))}/>
                  <input onChange={e => changeColor(e)} className={style.inputColor} type='color'/>
                  <button className={style.toolbar__btn + ' ' + style.undo} onClick={() => dispatch(undo())}/>
                  <button className={style.toolbar__btn + ' ' + style.redo} onClick={() => dispatch(redo())}/>
                  <button className={style.toolbar__btn + ' ' + style.save}/>
            </div>
      );
};

export default Toolbar;