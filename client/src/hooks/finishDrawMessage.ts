export function finishDrawMessage(socket: WebSocket | null | undefined, id: string) {
    if (socket) {
        const message = {
            method: 'draw',
            id: id,
            figure: {
                type: 'finish',
            }
        };

        socket.send(JSON.stringify(message));
    }
}
