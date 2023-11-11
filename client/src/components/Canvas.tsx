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

const Canvas: FC = () => {
      const {setCanvas, pushToUndo, setUsername, setSocket, setSessionId} = canvasSlice.actions
      const {setTool} = toolSlice.actions
      const {username} = useAppSelector(state => state.canvasReducer)
      const dispatch = useAppDispatch()
      const [modal, setModal] = useState(true)
      const [usernameRef, setUsernameRef] = useState<string>('')
      const canvasRef = useRef<HTMLCanvasElement | null>(null)
      //const usernameRef = useRef<HTMLInputElement | null>(null)
      const params= useParams()

      useEffect(() => {
            // const canvasGetContext = canvasRef.current?.getContext('2d')
            // const contextToDataURL = canvasRef.current?.toDataURL()
            if (canvasRef.current) {
                  dispatch(setCanvas(canvasRef.current))
            }
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
                                    console.log(`User ${msg.username} joined`)
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
                        Brush.draw(ctx, figure.x, figure.y)
                        //console.log('brush')
                        break
                  case 'rect':
                        Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height)
                        //console.log('rect')
                        break
                  case 'eraser':
                        Eraser.drawEraser(ctx, figure.x, figure.y)
                      //console.log('eraser')
                        break
                  case 'finish':
                        if (ctx) ctx.beginPath()
                        break
            }
      }

      const mouseDownHandler = () => {
            dispatch(pushToUndo(canvasRef.current?.toDataURL()))
      }

      const connectHandler = () => {
            if (usernameRef) {
                  dispatch(setUsername(usernameRef))
                  setModal(false)
            }
      }

      // useEffect(() => {
      //       console.log(usernameRef.current?.value)
      // }, [usernameRef.current?.value])
      //console.log(usernameRef.current?.value)

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
                                        value={usernameRef}
                                        onChange={(e) => setUsernameRef(e.target.value)}
                                    />
                              </InputGroup>
                        </Modal.Body>
                        <Modal.Footer>
                              <Button
                                  variant={usernameRef ? "primary" : 'secondary'}
                                  onClick={() => connectHandler()}
                              >
                                    Login
                              </Button>
                        </Modal.Footer>
                  </Modal>
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