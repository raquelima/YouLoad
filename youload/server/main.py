from typing import Union

from fastapi import FastAPI

from fastapi.responses import FileResponse

from fastapi.middleware.cors import CORSMiddleware

import youtube_dl

import ffmpy

import os

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/downloadVideo")
def read_root(url: str, format: str):
    out_name = "download/output." + format
    if os.path.exists("download/input.mp4"):
      os.remove("download/input.mp4")

    if os.path.exists(out_name):
          os.remove(out_name)
    ydl_opts = {
        'format': 'mp4/bestaudio',
        'outtmpl': 'download/input.mp4',
    }
    
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    
    ff = ffmpy.FFmpeg(
        inputs={ydl_opts['outtmpl']: None},
        outputs={out_name: None}
    )
    ff.run()

    return FileResponse(out_name, filename="downloadedVideo." + format)