/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useRef } from 'react';
import style from '../styles/canvas.module.scss'
import { useAppDispatch } from '../hooks/redux';
import {canvasSlice} from '../store/reducers/CanvasSlice';
import {toolSlice} from '../store/reducers/ToolSlice';
import Brush from '../tools/Brush';

const Canvas: FC = () => {
      const {setCanvas} = canvasSlice.actions
      const {setTool} = toolSlice.actions
      const dispatch = useAppDispatch()
      const canvasRef = useRef<HTMLCanvasElement | null>(null)
      
      useEffect(() => {
            if (canvasRef.current) {
                  dispatch(setCanvas(canvasRef.current))
                  dispatch(setTool(new Brush(canvasRef.current)))
                  console.log(canvasRef.current)
            }      
      }, [])

      

      return (
            <div className={style.canvas}>
                  <canvas ref={canvasRef} width={1000} height={600} />
            </div>
      );
};

export default Canvas;