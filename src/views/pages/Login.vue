<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-alert
        :value="isLoginError"
        dense
        outlined
        type="error"
      >
        Login <strong>Error</strong> please <strong>check</strong> your email or password
      </v-alert>
      <v-alert
        :value="isLogin"
        dense
        outlined
        type="success"
      >
        로그인이 완료되었습니다.
      </v-alert>
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="require('@/assets/images/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              QuantumMES
            </h2>
          </router-link>
        </v-card-title>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="loginId"
              outlined
              label="ID"
              placeholder="Input ID"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="loginPassword"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox
                label="Remember Me"
                hide-details
                class="me-3 mt-1"
              >
              </v-checkbox>

              <!-- forgot link -->
              <a
                href="javascript:void(0)"
                class="mt-1"
              >
                Forgot Password?
              </a>
            </div>

            <v-btn
              color="primary"
              class="mt-6"
              @click="login({loginId, loginPassword})"
            >
              Login
            </v-btn>

            <v-btn
              color="primary"
              class="mt-6"
              @click="loginTest({loginId, loginPassword})"
            >
              TestLogin
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            New on our platform?
          </span>
          <router-link :to="{name:'pages-register'}">
            Create an account
          </router-link>
        </v-card-text>

        <!-- divider -->
        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">or</span>
          <v-divider></v-divider>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { computed, ref } from '@vue/composition-api'
import { mapActions } from 'vuex'
import { loginUser } from '@/api/index'

export default {

  setup(props, { root }) {
    const isPasswordVisible = ref(false)
    const loginId = ref('')
    const loginPassword = ref('')
    const isLogin = computed(() => root.$store.state.isLogin)
    const isLoginError = computed(() => root.$store.state.isLoginError)
    const loginTest = computed(() => loginUser)

    return {
      loginTest,
      isPasswordVisible,
      loginId,
      loginPassword,
      ...mapActions(['login']),
      isLogin,
      isLoginError,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
