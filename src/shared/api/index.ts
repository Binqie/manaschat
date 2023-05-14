import axios from 'axios'
import { BASE_URL } from '../config/consts'
import Cookies from 'js-cookie'

export const $api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    common: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': 'https://localhost:3000',
      'Access-Control-Expose-Headers': ' X-My-Custom-Header, Set-Cookie',
    },
  },
})

// export const $api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: {
//     common: {
//       'Content-Type': 'application/json;charset=utf-8',
//       'Access-Control-Allow-Origin': 'https://localhost:3000',
//     },
//   },
// })
