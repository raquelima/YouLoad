# M152

## Installation
py -m pip install fastapi

py -m pip install "uvicorn[standard]"

py -m pip install ffmpy

py -mpip install --upgrade youtube-dl

ffmpeg on your pc ([Download FFmpeg](https://ffmpeg.org/download.html))

## enpoints
http://127.0.0.1:8000/videoInformation This endpoint takes a url and answers with the following videon Informations:
videoTile, channel, videoUrl, thumbnail

Params:
url

Example:

http://127.0.0.1:8000/videoInformation?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DeME0jNxgv-I%26ab_channel%3DBeyondFireship

Output:

{
  "videoTitle": "NEW Firebase Features Just Dropped",
  "channel": "Beyond Fireship",
  "videoUrl": "thumbnail url"
}

http://127.0.0.1:8000/downloadVideo this endpoints downloads a specific video for a URL and converts it to a given format

Params:
url
format

Example:

http://127.0.0.1:8000/downloadVideo?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DeME0jNxgv-I%26ab_channel%3DBeyondFireship&format=mov

Output:

Downloads video

# Start backend
uvicorn main:app --reload



