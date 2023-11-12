/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useRef, useState} from 'react';
import style from '../styles/canvas.module.scss'
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {canvasSlice} from '../store/reducers/CanvasSlice';
import {toolSlice} from '../store/reducers/ToolSlice';
import Brush from '../tools/Brush';
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";
import Rect from "../tools/Rect";
import Eraser from "../tools/Eraser";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import { toast } from 'react-toastify';
import axios from "axios";
import {getDocQSCanvas} from "../hooks/getDocQSCanvas";

const Canvas: FC = () => {
      const {pushToUndo, setUsername, setSocket, setSessionId, setCanvas} = canvasSlice.actions
      const {setTool, updateColor} = toolSlice.actions
      const {username} = useAppSelector(state => state.canvasReducer)
      const {strokeColorValue, fillColorValue, lineWidthValue} = useAppSelector(state => state.toolReducer)
      const dispatch = useAppDispatch()
      const [modal, setModal] = useState(true)
      const [usernameState, setUsernameState] = useState<string>('')
      const canvasRef = useRef<HTMLCanvasElement | null>(null)
      const params= useParams()

      useEffect(() => {
            if (canvasRef.current) {
                  dispatch(setCanvas(canvasRef.current))
            }
            let ctx = canvasRef.current?.getContext('2d')
            axios.get(`http://localhost:5001/image?id=${params.id}`)
                .then(response => {
                      const img = new Image()
                      img.src = response.data
                      img.onload = () => {
                            if (ctx) {
                                  ctx.clearRect(0, 0, canvasRef.current?.width as number, canvasRef.current?.height as number)
                                  ctx.drawImage(img, 0, 0, canvasRef.current?.width as number, canvasRef.current?.height as number)
                            }
                      }
                })
      }, [])

      useEffect(() => {
            const socket = new WebSocket('ws://localhost:5001')
            if (username && socket && params.id) {
                  dispatch(setSocket(socket))
                  dispatch(setSessionId(params.id))
                  dispatch(setTool(new Brush(canvasRef.current, socket, params.id)))
                  socket.onopen = () => {
                        socket.send(JSON.stringify({
                              id: params.id,
                              username,
                              method: 'connection'
                        }))
                  }
                  socket.onmessage = (event: MessageEvent) => {
                        let msg = JSON.parse(event.data)
                        //console.log(msg.figure)
                        switch (msg.method) {
                              case 'connection':
                                    toast.info(`User ${msg.username} joined`, {
                                    closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        theme: "colored",
                              });
                                break
                              case 'draw':
                                    drawHandler(msg)
                                break
                        }
                  }
            }
      }, [username])

      const drawHandler = (msg: any) => {
            const figure = msg.figure
            const ctx = canvasRef.current?.getContext('2d')
            switch (figure.type) {
                  case 'brush':
                        Brush.draw(ctx, figure.x, figure.y, figure.fillColor, figure.strokeColor, figure.lineWidth)
                        //console.log('brush')
                        break
                  case 'line':
                        Line.drawStatic(ctx, figure.start, figure.end, figure.fillColor, figure.strokeColor, figure.lineWidth)
                        //console.log('brush')
                        break
                  case 'rect':
                        Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.fillColor, figure.strokeColor, figure.lineWidth)
                        break
                  case 'circle':
                        Circle.staticDraw(ctx, figure.x, figure.y, figure.r, figure.fillColor, figure.strokeColor, figure.lineWidth)
                        break
                  case 'eraser':
                        //Brush.draw(ctx, figure.x, figure.y, figure.fillColor, figure.strokeColor, figure.lineWidth, figure.type)
                        Eraser.drawEraser(ctx, figure.x, figure.y, figure.lineWidth, figure.type)
                      //console.log('eraser')
                        break
                  case 'finish':
                        if (ctx) ctx.beginPath()
                        break
            }
      }

      const mouseDownHandler = () => {
            dispatch(updateColor({strokeColorValue, fillColorValue, lineWidthValue}))

            dispatch(pushToUndo(canvasRef.current?.toDataURL()))

      }

      const mouseUpHandler = () => {
            axios.post(`http://localhost:5001/image?id=${params.id}`, {img: getDocQSCanvas()?.toDataURL()})
                .catch(() => console.log('error Canvas mouseDownHandler'))
      }

      const connectHandler = () => {
            if (usernameState) {
                  dispatch(setUsername(usernameState))
                  setModal(false)
            }
      }

      return (
            <div className={style.canvas}>
                  <Modal show={modal} onHide={() => {}}>
                        <Modal.Header>
                              <Modal.Title>Enter you name</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                              <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Username"
                                        //ref={usernameRef}
                                        value={usernameState}
                                        onChange={(e) => setUsernameState(e.target.value)}
                                    />
                              </InputGroup>
                        </Modal.Body>
                        <Modal.Footer>
                              <Button
                                  variant={username ? "primary" : 'secondary'}
                                  onClick={() => connectHandler()}
                              >
                                    Login
                              </Button>
                        </Modal.Footer>
                  </Modal>
                  <canvas 
                        id='canvas'
                        onMouseDown={() => mouseDownHandler()}
                        onMouseUp={() => mouseUpHandler()}
                        ref={canvasRef} 
                        width={1000} 
                        height={600} 
                  />
            </div>
      );
};

export default Canvas;