import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import MyButton from 'ui/button'
import { IRequest, IUser } from 'shared/model/Types'
import { Button } from '@mui/material'
import { $api } from 'shared/api'

const SendExecuteChangeGroupRequest = async (id: number) => {
  return await $api.put(`/Requests/ExecuteChangeGroupRequest?id=${id}`)
}
const SendDeleteChangeGroupRequest = async (id: number) => {
  return await $api.delete(`/Requests/Delete?id=${id}`)
}

const SendActivateUserRequest = async (email: string) => {
  return await $api.get(`/Users/Activate?email=${email}`)
}

const SendDeleteUserRequest = async (id: number) => {
  return await $api.delete(`/Users/Delete?id=${id}`)
}

function Row(props: { row: any; openedTab: string }) {
  const [open, setOpen] = React.useState(false)

  const handleAcceptRequest = async () => {
    const response = await SendExecuteChangeGroupRequest(props.row.id)
    console.log('accept request', response)
  }

  const handleDeleteRequest = async () => {
    const response = await SendDeleteChangeGroupRequest(props.row.id)
    console.log('reject request', response)
  }

  const handleDeleteUser = async () => {
    const response = await SendDeleteUserRequest(props.row.id)
    console.log('delete user', response)
  }

  const handleActivateUser = async () => {
    const response = await SendActivateUserRequest(props.row.email)
    console.log('activate user', response)
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component='th'
          scope='row'
        >
          {props.row.email}
        </TableCell>
        <TableCell align='right'>
          <Button
            variant='outlined'
            color='success'
            onClick={
              props.openedTab === 'users'
                ? handleActivateUser
                : handleAcceptRequest
            }
          >
            {props.openedTab === 'users' ? 'Activate' : 'Accept'}
          </Button>
        </TableCell>
        <TableCell align='right'>
          <Button
            variant='outlined'
            color='error'
            onClick={
              props.openedTab === 'users'
                ? handleDeleteUser
                : handleDeleteRequest
            }
          >
            {props.openedTab === 'users' ? 'Delete' : 'Reject'}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse
            in={open}
            timeout='auto'
            unmountOnExit
          >
            <Box sx={{ margin: 1 }}>
              <Typography
                variant='h6'
                gutterBottom
                component='div'
              >
                Request
              </Typography>
              <Table
                size='small'
                aria-label='purchases'
              >
                <TableHead>
                  <TableRow>
                    <TableCell>New course</TableCell>
                    <TableCell>New Classroom</TableCell>
                    <TableCell>User email</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{props.row.course}</TableCell>
                    <TableCell>{props.row.classroom}</TableCell>
                    <TableCell>{props.row.email}</TableCell>
                    <TableCell>{props.row.createdAt}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function CollapsibleTable({ data, openedTab }: any) {
  if (openedTab === 'users') {
    data = data.filter((item: any) => !item.isActive)
  }
  console.log(data, openedTab)
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell>{openedTab}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: any) => (
            <Row
              openedTab={openedTab}
              key={item.id}
              row={item}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
