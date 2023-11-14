import {eventMouseHandler} from "../models/eventMouseHandler";
import Tool from "./Tool";

export default class Eraser extends Tool {
    mouseDown: boolean | undefined;
    ctxColorStyle: string;
    constructor(canvas: any, socket: WebSocket, id: string | null) {
        super(canvas, socket, id)
        this.listen()
        console.log(this.ctx.strokeStyle)
        this.ctxColorStyle = this.ctx.strokeStyle
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
        this.ctx.strokeStyle = this.ctxColorStyle
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
                    type: 'eraser',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    lineWidth: this.ctx.lineWidth
                }
            }))
            this.ctx.strokeStyle = 'white'
        }
    }

    draw(x: number, y: number) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }

    static drawEraser(ctx: CanvasRenderingContext2D | null | undefined, x: number, y: number, lineWidth: number, figureType: string) {
        if (ctx) {
            if (figureType === 'eraser') {
                ctx.strokeStyle = 'white'
            }
            ctx.lineWidth = lineWidth
            ctx.lineTo(x, y)
            ctx.stroke()
        }
    }
}