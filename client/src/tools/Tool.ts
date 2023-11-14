export default class Tool {
    canvas: any;
    ctx: any;
    socket: WebSocket;
    id: string | null;
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string | null) {
        this.canvas = canvas
        this.socket = socket
        this.id = id
        if (canvas) this.ctx = canvas.getContext('2d')
        this.destroyEvents()
    }

    set fillColor(color: string) {
        this.ctx.fillStyle = color
    }

    set strokeColor(color: string) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width: string) {
        this.ctx.lineWidth = width
    }

    // imgReturn() {
    //     const canvasElement = document.createElement('canvas');
    //     canvasElement.width = 1000;
    //     canvasElement.height = 600;
    //     const img = new Image()
    //     const {fff, fff2} = this.canvas
    //     this.canvas = canvasElement
    //     this.ctx = fff
    //     img.src = fff2
    //     img.onload = () => {
    //         try {
    //             this.ctx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height)

    //             //context.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
    //             // let f3 = this.canvas
    //             // this.canvas = canvasElement
    //             // //this.canvas.src = img.src;
    //             // console.log('fff1')
    //             // //console.log(this.canvas)
    //             // this.ctx = this.canvas.getContext('2d')
    //             // console.log('fff2')
    //             // console.log(f3)
    //             // console.log(this.canvas)
    //             // this.ctx.drawImage(img.src, 0, 0, this.canvas.width, this.canvas.height);
    //             // console.log('fff3')
    //             // //console.log(this.canvas)
    //             // console.log(this.ctx)
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }
    // }

    destroyEvents() {
        if (this.canvas) {
            this.canvas.onmousemove = null
            this.canvas.onmousedown = null
            this.canvas.onmouseup = null
        }
    }
}