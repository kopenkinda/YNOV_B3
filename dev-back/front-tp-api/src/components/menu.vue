<script>
import { RouterLink } from 'vue-router';
import useAuth from '../store/auth';

export default {
  components: {
    RouterLink,
  },
  setup() {
    const { loggedIn, user, logout, token } = useAuth();
    return {
      loggedIn,
      user,
      logout,
      token,
    };
  },
};
</script>

<template>
  <nav class="card">
    <div class="card-body">
      <ul class="navigation h-100 d-flex justify-content-end align-items-center">
        <li class="me-auto">
          <router-link to="/" style="text-decoration: none">
            <h3 class="text-light mb-0">
              <i class="far fa-comments"></i>
              Quizzy
            </h3>
          </router-link>
        </li>
        <li>
          <router-link to="/scores" style="text-decoration: none">
            <span class="text-light mb-0">
              <i class="far fa-chart-bar"></i>
              Scores
            </span>
          </router-link>
        </li>
        <li v-if="loggedIn && user.isAdmin" class="me-2">
          <router-link to="/admin"><button class="btn btn-success">Admin Panel</button></router-link>
        </li>
        <li v-if="!loggedIn">
          <router-link to="/auth"><button class="btn btn-info">Log In | Register</button></router-link>
        </li>
        <li v-else>
          Logged in as:
          <b>{{ user.name }}</b>
          <br />
          <small>
            <a @click="logout" href="#">Logout</a>
          </small>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss">
.navigation {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>
