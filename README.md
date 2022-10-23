# M152

## Requirements

- [Python](https://www.python.org/downloads/) version 3.9.1 or higher
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) version 1.22.19 or higher


## Installation

To install YouLoad you need to clone out GitHub repository.
(https://github.com/raquelima/M152)

Command: 
```
git clone https://github.com/raquelima/M152
```

### Frontend:

The project has a python backend and a React frontend. First, we will set up the frontend. To do this, you have to navigate to the folder youload with the following command:
```
cd youload
```

Inside this folder, we need to run ```yarn install```.
This will download all the dependencies.

To start the frontend, simply run the following command:
```
yarn start
```

### Backend:

To start the backend, we have to download a few python packages. To do so, you have to execute these commands:

```
py -m pip install fastapi

py -m pip install "uvicorn[standard]"

py -m pip install ffmpy

py -mpip install --upgrade youtube-dl
```

The last thing to download is FFmpeg. You can get it here. ([Download FFmpeg](https://ffmpeg.org/download.html))
Make sure to add the executable to your environment variables

To start the backend, navigate to the server folder
```
cd youload/server
```

and then to start the server execute this command:
```
py -m uvicorn main:app --reload
```

YouLoad should now be ready!

## Endpoints

### Video information

```http://127.0.0.1:8000/videoInformation``` This endpoint takes a URL and answers with the following video Information:
videoTile, channel, videoUrl, thumbnail

Params:
url

Example:
```
http://127.0.0.1:8000/videoInformation?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DeME0jNxgv-I%26ab_channel%3DBeyondFireship
```
Output:
```
{
  "videoTitle": "NEW Firebase Features Just Dropped",
  "channel": "Beyond Fireship",
  "videoUrl": "thumbnail url"
}
```

### Video download

```http://127.0.0.1:8000/downloadVideo``` this endpoint downloads a video for a specific URL and converts it to a given format

Params:
URL, format

Example:
```
http://127.0.0.1:8000/downloadVideo?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DeME0jNxgv-I%26ab_channel%3DBeyondFireship&format=mov
```

This will download your video

### Video download

```http://127.0.0.1:8000/downloadAudio``` this endpoint downloads a specific audio from a video and converts it to a given format

Params:
URL, format

Example:
```
http://127.0.0.1:8000/downloadAudio?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DeME0jNxgv-I%26ab_channel%3DBeyondFireship&format=mov
```

This will download your audio

