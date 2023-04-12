import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Grid } from '@mui/material'

import { IProps } from '../types'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainContainer = ({ children }: IProps) => {
  return (
    <React.Fragment>
      <Navbar/>
      <CssBaseline />
      <Grid
        style={{ marginTop: 50 }}
        container
        spacing={2}
        minHeight={753}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        rowGap='10px'
      >
        {children}
      </Grid>
      <Footer/>
    </React.Fragment>
  )
}

export default MainContainer
