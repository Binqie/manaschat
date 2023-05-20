import Box from '@mui/material/Box'
import MainContainer from 'widgets/mainContainer'
import PostEditingForm from 'components/post/PostEditingForm'

export default function PostEdition() {
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
        <PostEditingForm />
      </Box>
    </MainContainer>
  )
}
