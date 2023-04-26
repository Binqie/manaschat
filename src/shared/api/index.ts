import axios from 'axios'
import { BASE_URL } from '../config/consts'

const $api = axios.create({
  baseURL: BASE_URL,
  headers: {
    common: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  },
})

export default $api
