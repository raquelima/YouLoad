import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'

const Main = (): JSX.Element => {
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
        <TextField sx={{ width: '570px', backgroundColor: 'white' }} size='small' />
        <Button variant='contained' size='large' sx={{ backgroundColor: '#12232E' }}>
          <SearchIcon />
        </Button>
      </Box>
    </Box>
  )
}

export { Main }
