import React from 'react'
import Grid from '@mui/material/Grid'
import { Nav } from './Nav'

const Layout = (): JSX.Element => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Nav />
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  )
}

export { Layout }
