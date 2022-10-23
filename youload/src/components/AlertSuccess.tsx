import * as React from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'

export interface AlertArgs {
  success: string
}

const AlertSuccess = ({success}:AlertArgs): JSX.Element => {
  const [open, setOpen] = React.useState(true)

  return (
    <Box sx={{ width: '800px' }}>
      <Collapse in={open}>
        <Alert
          severity='success'
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {success}
        </Alert>
      </Collapse>
    </Box>
  )
}
export { AlertSuccess }
