<template>
  <div class="wrap">
    <div class="sidenav">
      <div class="login-main-text">

      </div>
    </div>
    <div class="main">
      <div class="col-md-8 col-sm-12">
        <div class="login-form">
          <span class="text-danger small" v-if="errors">{{errors.detail}}</span>
          <hr>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              placeholder="Enter your email"
              v-model="email"
            />
          </div>
          <div class="small mb-3 text-white" align="right"><router-link to="/login">Login</router-link></div>
          <button type="submit" @click="confirm()" class="btn btn-black btn-block">
            <span v-if="!loading">Confirm</span>
            <span v-else>Loading...</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from '@/config';

  export default {
    name: 'confirm-email',
    data() {
      return{
        email: '',
        loading: false,
        errors: {},
      };
    },
    methods: {
      confirm(){
        this.loading = true;
        axios.post(`${config.apiUrl}/user/ce/`, {
          email: this.email
        }).then((response) => {
          this.loading = false;
          this.error = '';
          const results = response.data;
          this.$noty.success('Great! Email Address identified!');
          this.$router.push(`/email-success/${results.slug}`);
        }).catch(({response}) => {
          this.loading = false;
          this.errors = response.data;
          this.$noty.error(`Oops! ${this.errors.detail}`);
        })
      }
    }
  }
</script>

<style scoped>
  body {
    font-family: "Lato", sans-serif;

  }
  .wrap{
    background:#002c59;
    height: 100vh;
  }

  h2 {
    color: #fff;
  }

  .sidenav {
    height: 100%;
    background:url('../../assets/images/forgot-password.jpg');
    overflow-x: hidden;
    padding-top: 20px;
  }

  .main {
    padding: 2px 10px 0 80px;

  }

  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
  }

  @media screen and (max-width: 450px) {
    .login-form {
      margin-top: 10%;
    }
  }

  @media screen and (min-width: 768px) {
    .main {
      margin-left: 40%;

    }

    .sidenav {
      width: 40%;
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
    }

    .login-form {
      margin-top: 50%;
    }
  }

  .btn-black {
    background-color: #ffbe0b !important;
    color: #002c59;
  }
</style>
