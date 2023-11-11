import { eventMouseHandler } from "../models/eventMouseHandler";
import Tool from "./Tool";
import {WebSocketType} from "../utils/consts";

export default class Rect extends Tool {
    mouseDown: boolean | undefined;
    startX: number | undefined;
    startY: number | undefined;
    saved: any;
    width: number | undefined;
    height: number | undefined;
    constructor(canvas: HTMLCanvasElement, socket: WebSocketType, id: string | null) {
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
                    type: 'rect',
                    x: this.startX,
                    y: this.startY,
                    width: this.width,
                    height: this.height
                }
            }))
        }
    }
    mouseDownHandler(e: eventMouseHandler) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }
    mouseMoveHandler(e: eventMouseHandler) {
        if (this.mouseDown && this.startX && this.startY) {
            let currentX = e.pageX - e.target.offsetLeft
            let currentY = e.pageY - e.target.offsetTop
            this.width = currentX - this.startX
            this.height = currentY - this.startY
            this.draw(this.startX, this.startY, this.width, this.height)
        }
    }

    draw(x: number, y: number, w: number, h: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x, y, w, h)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    static staticDraw(ctx: any, x: number, y: number, w: number, h: number) {
        ctx.beginPath()
        ctx.rect(x, y, w, h)
        ctx.fill()
        ctx.stroke()
    }
}