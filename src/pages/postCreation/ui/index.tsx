import Box from '@mui/material/Box'
import MainContainer from '../../../widgets/mainContainer/ui'
import PostCreationForm from '../../../features/postCreation/ui'

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
        <PostCreationForm />
      </Box>
    </MainContainer>
  )
}
