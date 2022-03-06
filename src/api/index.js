import axios from 'axios'

function loginUser(loginObj) {
  const url = 'http://localhost:18081/api/user/idpwLogin'

  console.log(`${loginObj.loginId} 로그인 시도`)

  return axios.post(url)
}

// eslint-disable-next-line import/prefer-default-export
export { loginUser }
