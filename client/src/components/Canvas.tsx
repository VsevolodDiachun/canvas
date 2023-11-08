/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useRef } from 'react';
import style from '../styles/canvas.module.scss'
import { useAppDispatch } from '../hooks/redux';
import {canvasSlice} from '../store/reducers/CanvasSlice';
import {toolSlice} from '../store/reducers/ToolSlice';
import Brush from '../tools/Brush';

const Canvas: FC = () => {
      const {setCanvas, pushToUndo} = canvasSlice.actions
      const {setTool} = toolSlice.actions
      const dispatch = useAppDispatch()
      const canvasRef = useRef<HTMLCanvasElement | null>(null)
      
      useEffect(() => {
            // const canvasGetContext = canvasRef.current?.getContext('2d')
            // const contextToDataURL = canvasRef.current?.toDataURL()
            if (canvasRef.current) {
                  dispatch(setCanvas(canvasRef.current))
                  dispatch(setTool(new Brush(canvasRef.current)))
            }      
      }, [])

      const mouseDownHandler = () => {
            dispatch(pushToUndo(canvasRef.current?.toDataURL()))
      }

      return (
            <div className={style.canvas}>
                  <canvas 
                  id='canvas'
                        onMouseDown={() => mouseDownHandler()} 
                        ref={canvasRef} 
                        width={1000} 
                        height={600} 
                  />
            </div>
      );
};

export default Canvas;