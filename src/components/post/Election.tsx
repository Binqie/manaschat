import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Button } from '@mui/material'
import { IPostProps } from 'shared/model/Types'

export default function ElectionCard({ post }: IPostProps) {
  return (
    <Card
      sx={{ maxWidth: 345 }}
      variant='outlined'
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label='recipe'
          >
            R
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.authorFullname}
        subheader={`${new Date(Date.parse(post.createdAt)).toLocaleDateString()}`}
      />
      <CardMedia
        component='img'
        height='194'
        image={`data:image/png;base64, ${post.image}`}
      />
      <CardContent>
        <Typography
          variant='body2'
          color='text.primary'
        >
          {post.body}
        </Typography>
        <FormControl style={{ width: '100%' }}>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='female'
            name='radio-buttons-group'
          >
            {post.electionPostDetailsList.map((item) => (
              <FormControlLabel
                key={item.id}
                value={item.id}
                control={<Radio />}
                label={item.variant}
              />
            ))}
          </RadioGroup>
          <Button variant='outlined'>Vote</Button>
        </FormControl>
      </CardContent>
    </Card>
  )
}
