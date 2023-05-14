import Box from '@mui/material/Box'
import MainContainer from 'widgets/mainContainer'
import PostFormContainer from 'components/post/PostCreationForm'

export default function PostCreation() {
  return (
    <MainContainer>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          minWidth: 800,
        }}
      >
        <PostFormContainer />
      </Box>
    </MainContainer>
  )
}
