from fastapi import APIRouter, WebSocket
from fastapi.responses import HTMLResponse

websocket_router = APIRouter()

@websocket_router.websocket("/ws/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")
