<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #ffbe0b ;">
      <div class="container">
        <img src="@/assets/images/gra.png" alt="">
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ml-auto">
            <!--<li class="nav-item">-->
              <!--<router-link class="nav-link" to="/profile"><h4 class="page-title">{{user.full_name}}</h4></router-link>-->
            <!--</li>-->
            <!--<li class="nav-item">-->
                <!--<span class="nav-link" @click="logout()"><span class="material-icons">-->
                  <!--power_settings_new-->
                  <!--</span>logout</span>-->
            <!--</li>-->
            <li class="nav-item dropdown">
              <span class="nav-link text-nowrap px-3" v-d-toggle.user-actions>
              <span class="d-none d-md-inline-block h4 pt-2">{{user.full_name}}</span>
              </span>
              <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
                <d-dropdown-item><i class="material-icons">&#xE7FD;</i>
                  <router-link to="/profile" class="card-link">Profile</router-link>
                </d-dropdown-item>
                <d-dropdown-divider />
                <d-dropdown-item class="text-danger" >
                  <span @click="logout()" ><i class="material-icons text-danger">&#xE879;</i> Logout</span>
                </d-dropdown-item>
              </d-collapse>
            </li>
          </ul>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  </div>
</template>
<script>

  // import config from '@/config';

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
        this.$router.push('/');
      },
    },

  };
</script>
