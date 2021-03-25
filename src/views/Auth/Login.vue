<template>
  <div class="home">
    <div class="sidenav">
      <div class="login-main-text">
        <img src="@/assets/images/gra.png"/><br>
        <h2>Welcome To Our Portal, Sign-in to Perform your Task Now </h2>
      </div>
    </div>
    <div class="main">
      <div class="col-md-8 col-sm-12">
        <div class="login-form">
          <!-- <form> -->
          <span class="text-danger small" v-if="errors">{{errors.detail}}</span>
          <hr>
          <div class="form-group">
            <input v-bind:class="{'is-invalid': errors.response_code === '101' || errors.response_code === '103'}" type="email" v-model="email" class="form-control" placeholder="Email Address">
          </div>
          <div class="form-group">
            <input v-bind:class="{'is-invalid': errors.response_code === '102' || errors.response_code === '103'}" type="password" v-model="password" class="form-control" placeholder="Password">
          </div>
          <!--<div class="small mb-3" align="right"><router-link to="/confirm-email">Forgot Password?</router-link></div>-->
          <button type="submit" :disabled="loading" class="btn btn-black btn-block" @click="Signin()"><span v-if="!loading">Login</span> <span v-else>Loading...</span></button>
          <!-- </form> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import axios from 'axios';
  import config from '@/config';
  import Spinner from '@/components/common/Spinner.vue';

  export default {
    name: 'LOGIN',
    components: {
      Spinner,
    },

    data() {
      return {
        email: '',
        password: '',
        errors: {},
        loading: false,
      };
    },
    methods: {
      Signin() {
        this.loading = true;
        axios.post(`${config.apiUrl}/user/login/`, {
          email: this.email,
          password: this.password,
        }).then((response) => {
          this.loading = false;
          const results = response.data;
          // console.log(response);
          // localStorage.setItem('auth', response.data);
          config.set_token(results.token.token);
          config.set_auth(JSON.stringify(results));
          config.set_user(JSON.stringify(results.user));
          this.$root.auth = results;
          this.$noty.success('Great! Login Successful!');
          this.$router.push('/home');
        }).catch(({ response }) => {
          this.loading = false;
          // console.log(response);
          this.errors = response.data;
          this.$noty.error(`Oops! ${this.errors.detail}`);
        });
      },
    },
  };
</script>

<style scoped>
  body {
    font-family: "Lato", sans-serif;
  }

  h2{
    color:#fff;
  }

  .main-head{
    height: 150px;
    background: #FFF;

  }

  .sidenav {
    height: 100%;
    background-color: #002c59;
    overflow-x: hidden;
    padding-top: 20px;
  }


  .main {
    padding: 2px 10px 0 80px;
  }

  @media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
  }

  @media screen and (max-width: 450px) {
    .login-form{
      margin-top: 10%;
    }


  }

  @media screen and (min-width: 768px){
    .main{
      margin-left: 40%;
    }

    .sidenav{
      width: 40%;
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
    }

    .login-form{
      margin-top: 50%;
    }


  }


  .login-main-text{
    margin-top: 20%;
    padding: 60px;
    color: #fff;
  }

  .login-main-text h2{
    font-weight: 300;
  }

  .btn-black{
    background-color: #002c59 !important;
    color: #fff;
  }
</style>
