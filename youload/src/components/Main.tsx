import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import { YoutubeCard } from './YoutubeCard'
import { AlertError } from './AlertError'
import { AlertSuccess } from './AlertSuccess'

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

  const updateSuccess = (success: string) => {
    setParentError('')
    setParentSuccess(success)
  }

  const updateError = (error: string) => {
    setParentSuccess('')
    setParentError(error)
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

    fetch(`http://127.0.0.1:8000/videoInformation?url=${url}`)
      .then(async function (res) {
        if (res.ok) {
          setParentSuccess('Video Found')
          return setVideoInformation(await res.json())
        }

        throw new Error('Video not found')
      })
      .catch(function (error) {
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
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '80px' }}>
          <TextField
            sx={{ width: '570px', backgroundColor: 'white' }}
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
        {videoInformation.videoTitle && (
          <YoutubeCard
            videoTitle={videoInformation.videoTitle}
            channel={videoInformation.channel}
            videoUrl={videoInformation.videoUrl}
            thumbnail={videoInformation.thumbnail}
            updateSuccess={updateSuccess}
            updateError={updateError}
          />
        )}
      </Box>
    </Box>
  )
}

export { Main }
