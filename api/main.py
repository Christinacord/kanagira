from fastapi import FastAPI, APIRouter
from authenticator import authenticator
from routers import accounts, boards, swim_lanes, issues
import os
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(authenticator.router, tags=["accounts"])
app.include_router(accounts.router, tags=["accounts"])
app.include_router(boards.router, tags=["boards"])
app.include_router(swim_lanes.router, tags=["swim_lanes"])
app.include_router(issues.router, tags=["issues"])

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
