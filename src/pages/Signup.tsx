import React, { FC, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import MuiLink from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Select from 'react-select'

import { PUBLIC_ROUTES } from '../constants/consts'
import { Link } from 'react-router-dom'
import { ISelectCollection } from '../types'
import { fetchDepartments, fetchFaculties, setDepartments, setFaculties } from '../store/slices/UserSlice'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { useForm } from 'react-hook-form'

// {
//   "email": "string",
//   "password": "string",
//   "fullname": "string",
//   "facultyId": 0,
//   "departmentId": 0,
//   "classroom": 0,
//   "course": 0,
//   "yearOfAdmission": 0
// }

const inputs = [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'input your email',
  },
  {
    id: 'pass',
    name: 'password',
    type: 'password',
    label: 'enter your password',
  },
  {
    id: 'fullname',
    name: 'fullname',
    type: 'text',
    label: 'your full name',
  },
  {
    id: 'classroom',
    name: 'classroom',
    type: 'number',
    label: 'your class room',
  },
  {
    id: 'course',
    name: 'course',
    type: 'text',
    label: 'your course',
  },
  {
    id: 'yearOfAdmission',
    name: 'yearOfAdmission',
    type: 'date',
    label: 'your year Of Admission',
  },
]

const faculties: ISelectCollection = {
  name: 'faculties',
  selects: [
    { value: 1, label: 'Chocolate' },
    { value: 2, label: 'Strawberry' },
  ],
}

const departments: ISelectCollection = {
  name: 'departments',
  selects: [
    { value: 1, label: 'dep 1' },
    { value: 2, label: 'dep 2' },
  ],
}

const MySelect: FC<ISelectCollection> = (options: ISelectCollection) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <Select
        {...(options.name === 'faculties' && {
          defaultValue: options.selects[0],
        })}
        options={options.selects}
      />
    </div>
  )
}

function Copyright(props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <MuiLink
        color='inherit'
        href='https://mui.com/'
      >
        Your Website
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

const Signup = () => {
  const dispatch = useAppDispatch()
  const faculties: ISelectCollection = useAppSelector((state) => state.user.faculties)
  const departments: ISelectCollection = useAppSelector((state) => state.user.departments)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onTouched' })

  const onSubmit = (data: Object) => {
    console.log('data', data)
  }

  useEffect(() => {
    dispatch(fetchFaculties())
    dispatch(fetchDepartments())
  }, [])

  useEffect(() => {
    console.log(faculties, departments)
  }, [faculties, departments])

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component='main'
        sx={{ height: '100vh' }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component='h1'
              variant='h5'
            >
              Sign up
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              {inputs.map((input, index) => (
                <TextField
                  key={index}
                  margin='normal'
                  required
                  fullWidth
                  id={input.id}
                  label={input.label}
                  autoComplete={input.name}
                  autoFocus
                  {...register(input.name)}
                />
              ))}

              <MySelect {...faculties} />
              <MySelect {...departments} />

              <FormControlLabel
                control={
                  <Checkbox
                    value='remember'
                    color='primary'
                  />
                }
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid
                  item
                  xs
                >
                  <Link to='/password/forgot'>Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to={PUBLIC_ROUTES.SIGNIN}>
                    {'Already have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Signup
