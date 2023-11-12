import { eventMouseHandler } from "../models/eventMouseHandler";
import Tool from "./Tool";
import {finishDrawMessage} from "../hooks/finishDrawMessage";

export default class Circle extends Tool {
    mouseDown: boolean | undefined;
    startX: number | undefined;
    startY: number | undefined;
    saved: any;
    width: any;
    height: any;
    constructor(canvas: any, socket: WebSocket, id: string | null) {
        super(canvas, socket, id);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseDownHandler(e: eventMouseHandler) {
        this.mouseDown = true
        let canvasData = this.canvas.toDataURL()
        this.ctx.beginPath()
        this.startX = e.pageX-e.target.offsetLeft
        this.startY = e.pageY-e.target.offsetTop
        this.saved = canvasData
    }

    mouseUpHandler(e: eventMouseHandler) {
        this.mouseDown = false
        if (this.socket && this.startX && this.startY) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            let r = Math.sqrt(width ** 2 + height ** 2);

            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'circle',
                    x: this.startX,
                    y: this.startY,
                    r,
                    fillColor: this.ctx.fillStyle,
                    strokeColor: this.ctx.strokeStyle,
                    lineWidth: this.ctx.lineWidth
                }
            }))
            if (this.socket && this.id) finishDrawMessage(this.socket, this.id)
        }

    }

    mouseMoveHandler(e: eventMouseHandler) {
        if(this.mouseDown && this.startX && this.startY) {
            let curentX = e.pageX-e.target.offsetLeft
            let curentY = e.pageY-e.target.offsetTop
            let width = curentX - this.startX
            let height = curentY - this.startY
            let r = Math.sqrt(width**2 + height**2)
            this.draw(this.startX, this.startY, r)
        }
    }

    draw(x: number, y: number, r: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = async () => {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, r, 0, 2*Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    static staticDraw(ctx: CanvasRenderingContext2D | null | undefined, x: number, y: number, r: number, fillColor: string, strokeColor: string, lineWidth: number) {
        if (ctx) {
            ctx.fillStyle = fillColor
            ctx.strokeStyle = strokeColor
            ctx.lineWidth = lineWidth
            ctx.beginPath()
            ctx.arc(x, y, r, 0, 2 * Math.PI)
            ctx.fill()
            ctx.stroke()
        }
    }
}