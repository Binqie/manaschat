import React, { FC, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'

import Select from 'react-select'

import { PUBLIC_ROUTES } from '../constants/consts'
import { Link } from 'react-router-dom'
import { ISelectCollection, IUser } from '../types'
import { fetchDepartments, fetchFaculties } from '../store/slices/UserSlice'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { useForm } from 'react-hook-form'
import $api from '../api'

const inputs = [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'input your email',
    hint: 'Your email must be in format 0000.00000@manas.edu.kg',
    validation: {
      required: true,
      maxLength: 24,
      minLength: 22,
      pattern: new RegExp(/[0-9]+\.[0-9]+(@manas\.edu\.kg)$/gm),
    },
  },
  {
    id: 'pass',
    name: 'password',
    type: 'password',
    label: 'enter your password',
    hint: 'Length of your password must be 4-15 characters.',
    validation: {
      required: true,
      maxLength: 15,
      minLength: 4,
    },
  },
  {
    id: 'fullname',
    name: 'fullname',
    type: 'text',
    label: 'your full name',
    validation: {
      required: true,
      minLength: 2,
    },
  },
  {
    id: 'course',
    name: 'course',
    type: 'number',
    label: 'your course',
    validation: {
      required: true,
      max: 5,
      min: 0,
    },
  },
  {
    id: 'classroom',
    name: 'classroom',
    type: 'number',
    label: 'your class room',
    display: 'none',
    validation: {
      required: false
    }
  },
  {
    id: 'yearOfAdmission',
    name: 'yearOfAdmission',
    type: 'month',
    label: 'your year Of Admission',
    validation: {
      required: true,
      max: new Date().getFullYear(),
      min: 1995,
    },
  },
]

interface IFaculty {
  value: number
  label: string
}

interface IDepartment {
  value: number
  label: string
  facultyId?: number
}

const Signup = () => {
  const dispatch = useAppDispatch()
  const faculties: ISelectCollection = useAppSelector(
    (state) => state.user.faculties
  )
  const departments: ISelectCollection = useAppSelector(
    (state) => state.user.departments
  )
  const [selectedFaculty, setSelectedFaculty] = useState<IFaculty | null>(null)
  const [selectedDepartment, setSelectedDepartment] =
    useState<IDepartment | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<number>(0)
  const [selectedClassroom, setSelectedClassroom] = useState<number | null>(null)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onTouched' })

  const onSubmit = async (data: any) => {
    const userInfo: IUser = {
      email: data.email,
      password: data.password,
      fullname: data.fullname,
      facultyId: selectedFaculty?.value || 0,
      departmentId: selectedDepartment?.value || 0,
      classroom: selectedClassroom,
      course: selectedCourse,
      yearOfAdmission: +data.yearOfAdmission.split('-')[0],
    }
    console.log(userInfo)
    const response = await $api.post('/Users/SignUp', userInfo)
    console.log(response)
  }

  useEffect(() => {
    dispatch(fetchFaculties())
    dispatch(fetchDepartments())
  }, [])

  return (
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
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 400,
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
                style={{ marginBottom: 10, display: (input.name === 'classroom' && (selectedCourse !== 0 || selectedCourse === null)) ? 'none' : 'block' }}
                key={index}
                variant='outlined'
                margin='none'
                required
                fullWidth
                size='small'
                type={input.type}
                id={input.id}
                label={input.label}
                autoComplete={input.name}
                autoFocus
                {...(((input.name === 'email' && errors.email) ||
                  (input.name === 'password' && errors.password)) && {
                  helperText: input.hint,
                })}
                {...(input.name === 'course' && {
                  onInput: ({target}) => {
                    setSelectedCourse(+(target as HTMLButtonElement).value)
                    setSelectedClassroom(null)
                  }
                })}
                {...(input.name === 'classroom' && {
                  onInput: ({target}) => setSelectedClassroom(+(target as HTMLButtonElement).value),
                })}
                {...register(input.name, { ...input.validation })}
              />
            ))}
            <div style={{ marginBottom: 10 }}>
              <Select
                value={selectedFaculty}
                isClearable={false}
                defaultValue={faculties.selects[0]}
                options={faculties.selects}
                onChange={(choise) => {
                  setSelectedFaculty(choise)
                  setSelectedDepartment(null)
                }}
              />
            </div>
            <div>
              <Select
                value={selectedDepartment}
                isDisabled={selectedFaculty === null}
                defaultValue={departments.selects[0]}
                options={departments.selects.filter(
                  (dep: IDepartment) => dep.facultyId === selectedFaculty?.value
                )}
                onChange={(choise) => setSelectedDepartment(choise)}
              />
            </div>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
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
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Signup
