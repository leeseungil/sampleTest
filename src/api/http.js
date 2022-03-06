import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,  // 'http://localhost:18081/api/',
})

export default instance
