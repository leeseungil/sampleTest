import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import http from '@/api/http'

// import createPersistedState from 'vuex-persistedstate'
// eslint-disable-next-line import/no-cycle
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [
  //   // eslint-disable-next-line no-undef
  //   createPersistedState({
  //   }),
  // ],
  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false,
  },
  mutations: {
    // state 상태 변경
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload
    },
    loginError(state) {
      state.isLogin = false
      state.isLoginError = true
    },
    logOut(state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
    },
  },
  actions: {
    // 로그인 시도
    login({ dispatch, commit }, loginObj) {
      // 로그인 -> 토큰 반환
      http
        .post('api/user/idpwLogin', loginObj) // 파라미터 (body)
        .then(response => {
          console.log(response)
          console.log(response.data.resultData.accessToken)

          // 토큰을 로컬스토리지 저장
          localStorage.setItem('X-Auth-Token', response.data.resultData.accessToken)
          const userInfo = {
            loginId: response.data.resultData.loginId,
            userName: response.data.resultData.userName,
          }
          commit('loginSuccess', userInfo)
          router.push({ name: 'dashboard' })

          // dispatch('getMemberInfo') : disPathch 사용법 - Actions 내에 함수 호출
        })
        .catch(() => {
          // eslint-disable-next-line no-alert
          alert('아이디와 비밀번호를 확인하세요.')
          commit('loginError')
          // eslint-disable-next-line no-undef
        })
        .then(() => {
          console.log('then log')
        })
    },
    logOut({ commit }) {
      localStorage.setItem('X-Auth-Token', null)
      commit('logOut')
      router.push({ name: 'pages-login' })
    },
    getMemberInfo({ commit }) {
      // 로컬 스토리지에 저장된 토큰 활용
      const token = localStorage.getItem('X-Auth-Token')
      const config = {
        headers: {
          'X-Auth-Token': token,
        },
      }
      console.log('getMemberInfo')
      console.log(config)

      // 토큰 -> 반환된 토큰으로 멤버 정보를 반환
      // 새로 고침 -> 토큰만 가지고 멤버정보 요청
      axios
        .get('https://reqres.in/api/users/2', config)
        .then(res => {
          const userInfo = {
            avatar: res.data.data.first_name,
            email: res.data.data.email,
            first_name: res.data.data.first_name,
            id: res.data.data.id,
            last_name: res.data.data.last_name,
          }
          commit('loginSuccess', userInfo)
          router.push({ name: 'dashboard' })
        })
        .catch(() => {
          // eslint-disable-next-line no-alert
          alert('이메일과 비밀번호를 확인하세요')
          commit('loginError')
        })
    },
  },
  modules: {},
})
