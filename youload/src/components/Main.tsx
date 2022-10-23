import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import { YoutubeCard } from './YoutubeCard'
import { AlertError } from './AlertError'
import { AlertSuccess } from './AlertSuccess'
import CircularProgress from '@mui/material/CircularProgress'

const Main = (): JSX.Element => {
  const [url, setUrl] = useState('')
  const [videoInformation, setVideoInformation] = useState({
    videoTitle: '',
    channel: '',
    videoUrl: '',
    thumbnail: '',
  })
  const [parentError, setParentError] = useState('')
  const [parentSuccess, setParentSuccess] = useState('')
  const [onLoad, setOnLoad] = useState(false)

  const updateSuccess = (success: string) => {
    setParentError('')
    setParentSuccess(success)
  }

  const updateError = (error: string) => {
    setParentSuccess('')
    setParentError(error)
  }

  const updateOnLoad = (state: boolean) => {
    setOnLoad(state)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }

  const handleClick = () => {
    setVideoInformation({
      videoTitle: '',
      channel: '',
      videoUrl: '',
      thumbnail: '',
    })
    setParentError('')
    setParentSuccess('')
    setOnLoad(true)

    fetch(`http://127.0.0.1:8000/videoInformation?url=${url}`)
      .then(async function (res) {
        if (res.ok) {
          setParentSuccess('Video Found')
          setOnLoad(false)
          return setVideoInformation(await res.json())
        }
        setOnLoad(false)
        throw new Error('Video not found')
      })
      .catch(function (error) {
        setOnLoad(false)
        setParentError(`${error}`)
      })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {parentError && <AlertError error={parentError} />}
      {parentSuccess && <AlertSuccess success={parentSuccess} />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '100px',
        }}
      >
        <Box
          component='img'
          sx={{ height: 159, borderRadius: 4, pt: 1, pl: 1 }}
          alt='youLoad logo'
          src={require('../images/banner.png')}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '80px 0' }}>
          <TextField
            sx={{ backgroundColor: 'white' }}
            size='small'
            onChange={handleChange}
            placeholder='Enter Youtube URL'
          />
          <Button
            variant='contained'
            size='large'
            sx={{ backgroundColor: '#12232E' }}
            onClick={handleClick}
          >
            <SearchIcon />
          </Button>
        </Box>
        {onLoad && <Box sx={{ marginBottom: '30px' }}><CircularProgress /></Box>}
        {videoInformation.videoTitle && (
          <YoutubeCard
            videoTitle={videoInformation.videoTitle}
            channel={videoInformation.channel}
            videoUrl={videoInformation.videoUrl}
            thumbnail={videoInformation.thumbnail}
            updateSuccess={updateSuccess}
            updateError={updateError}
            updateOnLoad={updateOnLoad}
          />
        )}
      </Box>
    </Box>
  )
}

export { Main }
