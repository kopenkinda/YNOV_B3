<script>
import './global.scss';
import AppNav from './components/menu.vue';
import { notificationPool } from './store/notifications';
export default {
  components: {
    AppNav,
  },
  setup() {
    function alertClassFromType(type) {
      switch (type) {
        case 'success':
          return 'alert-success';
        case 'info':
          return 'alert-info';
        case 'warning':
        case 'warn':
          return 'alert-warning';
        case 'danger':
        case 'error':
          return 'alert-danger';
        default:
          return 'alert-primary';
      }
    }
    return {
      pool: notificationPool,
      alertClassFromType,
    };
  },
};
</script>

<template>
  <div class="notification-container">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="alert" :class="alertClassFromType(n.type)" v-for="n in pool.slice().reverse()" :key="n.id">
            {{ n.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container my-4">
    <div class="row">
      <div class="col">
        <app-nav />
      </div>
    </div>
  </div>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.notification-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  max-width: 320px;
  z-index: 100;
}
</style>
