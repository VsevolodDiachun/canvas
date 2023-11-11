import Brush from "./Brush";
import {eventMouseHandler} from "../models/eventMouseHandler";
import Tool from "./Tool";

export default class Eraser extends Tool {

    mouseDown: boolean | undefined;
    constructor(canvas: any, socket: WebSocket, id: string | null) {
        super(canvas, socket, id)
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler() {
        this.mouseDown = false
        if (this.socket) {
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'finish',
                }
            }))
        }
    }
    mouseDownHandler(e: eventMouseHandler) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
    mouseMoveHandler(e: eventMouseHandler) {
        if (this.mouseDown && this.socket) {
            //this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'eraser',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop
                }
            }))
        }
    }





    draw(x: number, y: number) {
        this.ctx.strokeStyle = "white"
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }

    static drawEraser(ctx: any, x: number, y: number) {
        ctx.strokeStyle = "white"
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}