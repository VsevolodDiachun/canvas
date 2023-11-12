import { eventMouseHandler } from "../models/eventMouseHandler";
import Tool from "./Tool";
import {finishDrawMessage} from "../hooks/finishDrawMessage";

export default class Brush extends Tool {
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
        if (this.socket && this.id) finishDrawMessage(this.socket, this.id)
    }
    mouseDownHandler(e: eventMouseHandler) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
    mouseMoveHandler(e: eventMouseHandler) {
        if (this.mouseDown && this.socket) {
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'brush',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    fillColor: this.ctx.fillStyle,
                    strokeColor: this.ctx.strokeStyle,
                    lineWidth: this.ctx.lineWidth
                }
            }))
        }
    }

    static draw(ctx: any, x: number, y: number, fillColor: string, strokeColor: string, lineWidth: number) {
        ctx.fillStyle = fillColor
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = lineWidth
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}