export const PostFormInputs = [
  {
    id: 'selectedTitle',
    name: 'title',
    type: 'text',
    label: 'title',
  },
  {
    id: 'selectedBody',
    name: 'body',
    type: 'text',
    label: 'body',
  },
]

export const SignupInputs = [
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
      required: false,
    },
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