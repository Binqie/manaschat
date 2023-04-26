import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Grid } from '@mui/material'

import { IProps } from 'shared/model/Types'
import Navbar from 'widgets/navbar/ui'
import Footer from 'widgets/footer/ui'

const MainContainer = ({ children }: IProps) => {
  return (
    <React.Fragment>
      <Navbar />
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
      <Footer />
    </React.Fragment>
  )
}

export default MainContainer
