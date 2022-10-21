import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import { YoutubeCard } from './YoutubeCard'

const Main = (): JSX.Element => {
  const [url, setUrl] = useState('');
  const [videoInformations, setVideoInformations] = useState({
    'videoTitle': '',
    'channel': '',
    'videoUrl': '',
    'thumbnail': '',
    'error': true});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleClick = async () => {
    const res = await fetch(`http://127.0.0.1:8000/videoInformations?url=${url}`);
    setVideoInformations(await res.json());
  };

  return (
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
        <TextField sx={{ width: '570px', backgroundColor: 'white' }} size='small' onChange={handleChange} />
        <Button variant='contained' size='large' sx={{ backgroundColor: '#12232E' }} onClick={handleClick}>
          <SearchIcon />
        </Button>
      </Box>
      <YoutubeCard videoInformations={videoInformations} />
    </Box>
  )
}

export { Main }
