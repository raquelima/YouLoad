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
  const [videoInformations, setVideoInformations] = useState({
    videoTitle: '',
    channel: '',
    videoUrl: '',
    thumbnail: ''
  })
  const [error, setError] = useState('')

  const [success, setSuccess] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }

  const handleClick = async () => {
    setVideoInformations({
      videoTitle: '',
      channel: '',
      videoUrl: '',
      thumbnail: ''
    })
    setError('')
    setSuccess('')
    const res = await fetch(`http://127.0.0.1:8000/videoInformations?url=${url}`)
    const resBody = await res.json()

    if (resBody == 'an error occurred') {
      setError('Video not found')
    } else {
      setSuccess('Video Found')
      setVideoInformations(resBody)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {error && <AlertError/>}
      {success && <AlertSuccess/>}
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
        {videoInformations.videoTitle && <YoutubeCard videoInformations={videoInformations} />}
      </Box>
    </Box>
  )
}

export { Main }
