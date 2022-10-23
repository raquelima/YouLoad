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

@app.get("/videoInformation")
def read_root(url: str):
    ydl = youtube_dl.YoutubeDL({})

    try:
        with ydl:
            result = ydl.extract_info(
                url,
                download=False 
            )

        if 'entries' in result:
            video = result['entries'][0]
        else:
            video = result

        videoTitle = video.get("title", None)
        channel = video.get("channel", None)
        videoUrl = 'http://www.youtube.com/watch?v=' + video.get("id", None)
        thumbnail = video.get("thumbnails", None)[0].get('url', None)

        return {
            'videoTitle': videoTitle,
            'channel': channel,
            'videoUrl': videoUrl,
            'thumbnail': thumbnail
        }
    except:
        return "an error occurred"
        

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

@app.get("/downloadAudio")
def read_root(url: str, format: str):
    out_name = "download/output." + format
    if os.path.exists("download/input.mp4"):
      os.remove("download/input.mp4")

    if os.path.exists(out_name):
          os.remove(out_name)
    ydl_opts = {
        'format': 'bestaudio/audio',
        'outtmpl': 'download/input.mp3',
    }
    
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    
    ff = ffmpy.FFmpeg(
        inputs={ydl_opts['outtmpl']: None},
        outputs={out_name: None}
    )
    ff.run()

    return FileResponse(out_name, filename="downloadedAudio." + format)