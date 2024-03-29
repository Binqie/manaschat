export const PostFormInputs = [
  {
    id: "selectedTitle",
    name: "title",
    type: "text",
    label: "Аталышы",
  },
  {
    id: "selectedBody",
    name: "body",
    type: "text",
    label: "Текст",
  },
];

export const SignupInputs = [
  {
    id: "email",
    name: "email",
    type: "email",
    label: "Почтаңызды жазыңыз",
    hint: "Сиздин почта 0000.00000@manas.edu.kg форматында болуусу керек",
    validation: {
      required: true,
      maxLength: 24,
      minLength: 22,
      pattern: new RegExp(/[0-9]+\.[0-9]+(@manas\.edu\.kg)$/gm),
    },
  },
  {
    id: "pass",
    name: "password",
    type: "password",
    label: "Сыр сөздү тандаңыз",
    hint: "Сыр сөздүн узундугу 4-15 символ.",
    validation: {
      required: true,
      maxLength: 15,
      minLength: 4,
    },
  },
  {
    id: "fullname",
    name: "fullname",
    type: "text",
    label: "Сиздин аты жөнүңүз",
    validation: {
      required: true,
      minLength: 2,
    },
  },
  {
    id: "course",
    name: "course",
    type: "number",
    label: "Сиздин курс",
    validation: {
      required: true,
      max: 5,
      min: 0,
    },
  },
  {
    id: "classroom",
    name: "classroom",
    type: "number",
    label: "Сиздин группа",
    display: "none",
    validation: {
      required: false,
    },
  },
  {
    id: "yearOfAdmission",
    name: "yearOfAdmission",
    type: "month",
    label: "Тапшырган жылыңыз",
    validation: {
      required: true,
      max: new Date().getFullYear(),
      min: 1995,
    },
  },
];
