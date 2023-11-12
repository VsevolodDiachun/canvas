import { eventMouseHandler } from "../models/eventMouseHandler";
import Tool from "./Tool";
import {finishDrawMessage} from "../hooks/finishDrawMessage";

export default class Line extends Tool {
    name: string;
    mouseDown: boolean | undefined;
    currentX: number | undefined;
    currentY: number | undefined;
    saved: any;
    startX: number | undefined;
    startY: number | undefined;
    endX: number | undefined;
    endY: number | undefined;

    constructor(canvas: any, socket: WebSocket, id: string | null) {
        super(canvas, socket, id);
        this.listen()
        this.name = 'Line'
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseDownHandler(e: eventMouseHandler) {
        this.mouseDown = true
        this.currentX = e.pageX-e.target.offsetLeft
        this.currentY = e.pageY-e.target.offsetTop
        this.ctx.beginPath()
        this.ctx.moveTo(this.currentX, this.currentY )
        this.saved = this.canvas.toDataURL()
    }

    mouseUpHandler(e: eventMouseHandler) {
        this.mouseDown = false
        if (this.socket) {
            this.endX = e.pageX - e.target.offsetLeft;
            this.endY = e.pageY - e.target.offsetTop;

            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'line',
                    start: { x: this.currentX, y: this.currentY },
                    end: { x: this.endX, y: this.endY },
                    fillColor: this.ctx.fillStyle,
                    strokeColor: this.ctx.strokeStyle,
                    lineWidth: this.ctx.lineWidth
                }
            }))
            if (this.socket && this.id) finishDrawMessage(this.socket, this.id)
        }
    }

    mouseMoveHandler(e: eventMouseHandler) {
        if (this.mouseDown) {
            this.draw(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop);
        }
    }

    draw(x: number,y: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = async () => {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.currentX, this.currentY )
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }
    }

    static drawStatic(
        ctx: CanvasRenderingContext2D | null | undefined,
        start: { x: number; y: number },
        end: { x: number; y: number },
        fillColor: string,
        strokeColor: string,
        lineWidth: number)
    {
        if (ctx) {
            ctx.fillStyle = fillColor
            ctx.strokeStyle = strokeColor
            ctx.lineWidth = lineWidth
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke()
        }
    }
}