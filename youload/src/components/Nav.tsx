import React from 'react'
import Box from '@mui/material/Box'

const Nav = (): JSX.Element => {
  return (
    <Box
      sx={{
        height: '59px',
        backgroundColor: '#12232E',
      }}
    >
      <Box
        component='img'
        sx={{ height: 43, pt: 1, pl: 1 }}
        alt='youLoad logo'
        src={require('../images/logo.png')}
      />
    </Box>
  )
}

export { Nav }
