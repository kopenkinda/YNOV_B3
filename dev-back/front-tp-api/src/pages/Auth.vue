<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '../store/auth';

export default {
  setup() {
    const router = useRouter();
    const { login: authLogin, register: authRegister } = useAuth();
    const selectedTab = ref('');
    const email = ref('');
    const password = ref('');
    const password_confirmation = ref('');
    const error = ref('');
    const loading = ref(false);
    async function login() {
      try {
        await authLogin(email.value, password.value);
        router.push('/');
      } catch (err) {
        error.value = err.message;
      }
    }
    async function register() {
      try {
        await authRegister(email.value, password.value, password_confirmation.value);
        changeTab('login');
        error.value = '';
      } catch (err) {
        error.value = err.message;
      }
    }
    function changeTab(tab) {
      selectedTab.value = tab;
      window.history.replaceState(window.history.state, null, '?page=' + tab);
    }
    return {
      selectedTab,
      email,
      password,
      password_confirmation,
      error,
      loading,
      login,
      register,
      changeTab,
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    if (page) {
      this.selectedTab = page;
    }
  },
};
</script>

<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <!--? Select action -->
          <h5 class="card-title text-center">
            {{ selectedTab == '' ? 'What do you want to do?' : selectedTab == 'login' ? 'Login' : 'Register' }}
          </h5>
          <div class="d-flex justify-content-center py-2" v-if="selectedTab == ''">
            <button @click="changeTab('login')" class="btn btn-secondary mx-2">Log In</button>
            <button @click="changeTab('register')" class="btn btn-secondary mx-2">Register</button>
          </div>

          <!--? Login -->
          <form @submit.prevent="login" v-if="selectedTab == 'login'">
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" v-model="email" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" />
            </div>
            <button type="submit" class="btn btn-primary my-2">Submit</button>
            <br />
            <small>
              Don't have an account?
              <a href="#" @click="changeTab('register')">Register</a>
            </small>
          </form>

          <!--? Register -->
          <form @submit.prevent="register" v-if="selectedTab == 'register'">
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" v-model="email" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" />
            </div>
            <div class="form-group">
              <label for="password_confirmation">Password Confirmation</label>
              <input
                type="password_confirmation"
                class="form-control"
                id="password_confirmation"
                v-model="password_confirmation"
              />
            </div>
            <button type="submit" class="btn btn-primary my-2">Submit</button>
            <br />
            <small>
              Already have an account?
              <a href="#" @click="changeTab('login')">Log In</a>
            </small>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
