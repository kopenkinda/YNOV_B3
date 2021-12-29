<script>
import useAuth from '../store/auth';

export default {
  setup() {
    const { token, loggedIn } = useAuth();
    return {
      token,
      loggedIn,
    };
  },
};
</script>

<template>
  State:
  <br />
  <code>
    Token: "{{ token }}"
    <br />
    LoggedIn: {{ loggedIn }}
  </code>
</template>
