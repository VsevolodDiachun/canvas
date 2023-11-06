export default class Tool {
    canvas: any
    ctx: any
    constructor(canvas: any) {
        this.canvas = canvas
        //this.imgReturn()
        this.ctx = canvas.getContext('2d')
        this.destroyEvents()
    }

    // imgReturn() {
    //     const canvasElement = document.createElement('canvas');
    //     canvasElement.width = 1000;
    //     canvasElement.height = 600;
    //     const canvasDataURL = this.canvas.toDataURL()
    //     const img = new Image()
    //     img.onload = () => {
    //         const context = canvasElement.getContext('2d');
    //         if (context) {
    //         context.drawImage(img, 0, 0);
    //         } else {
    //         console.error("getContext('2d') returned null");
    //         }
    //     }
    //     img.src = canvasDataURL
    //     //this.canvas = img.src
    //     console.log(img.src)
    // }

    destroyEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }
}