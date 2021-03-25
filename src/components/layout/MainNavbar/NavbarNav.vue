<template>
  <d-navbar-nav class="border-left flex-row bg-white">

    <li class="nav-item dropdown">
      <span class="nav-link dropdown-toggle dropleft text-nowrap px-3" v-d-toggle.user-actions>
      <span class="d-none d-md-inline-block h6 pt-2">{{user.full_name}}</span>
      </span>
      <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item>
          <router-link to="/home" class="card-link" ><i class="material-icons">&#xE7FD;</i> Apps</router-link>
        </d-dropdown-item>
        <d-dropdown-item><i class="material-icons">&#xE7FD;</i>
        <router-link to="/profile" class="card-link">Profile</router-link>
         </d-dropdown-item>
        <d-dropdown-divider />
        <d-dropdown-item class="text-danger" >
          <span @click="logout()" ><i class="material-icons text-danger">&#xE879;</i> Logout</span>
        </d-dropdown-item>
      </d-collapse>
    </li>
  </d-navbar-nav>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$root.auth.user;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('auth');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.$router.push('/login');
      this.$noty.success('Logout successful');
    },
    viewprofile() {
      this.$router.push('/profile');
    },
  },
};
</script>

<style>
  .nav-link:hover {
    cursor: pointer;
  }
</style>
