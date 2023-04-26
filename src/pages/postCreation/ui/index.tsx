import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import MainContainer from '../../../widgets/mainContainer/ui'
import ElectionPostForm from '../../../features/postFormElection/ui'
import SuggestionPostForm from '../../../features/postFormSuggestion/ui'
import CommentPostForm from '../../../features/postFormComment/ui'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

export default function PostCreation() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <MainContainer>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          height: '100%',
          minWidth: 800,
        }}
      >
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab
            label='Election post'
            {...a11yProps(0)}
          />
          <Tab
            label='Suggestion post'
            {...a11yProps(1)}
          />
          <Tab
            label='Comment post'
            {...a11yProps(2)}
          />
        </Tabs>
        <TabPanel
          value={value}
          index={0}
        >
          <ElectionPostForm />
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
        >
          <SuggestionPostForm />
        </TabPanel>
        <TabPanel
          value={value}
          index={2}
        >
          <CommentPostForm />
        </TabPanel>
      </Box>
    </MainContainer>
  )
}
