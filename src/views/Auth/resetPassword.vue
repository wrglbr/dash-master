<template>
  <div class="wrap">
    <div class="sidenav">
      <div class="login-main-text">

      </div>
    </div>
    <div class="main">
      <div class="col-md-8 col-sm-12">
        <div class="login-form">
          <span class="ml-3 pb-3 text-white">
          Great! Please enter your new Password
          </span>
          <div class="form-group mt-3">
            <input type="password" v-bind:class="{'is-invalid': errors.detail}" v-model="password" class="form-control" placeholder="Enter New Password"/>
          </div>
          <div class="form-group">
            <input type="password" v-bind:class="{'is-invalid': errors.detail}" v-model="again" class="form-control" placeholder="Confirm Password"/>
            <span class="small text-danger" v-if="msg">{{msg}}</span>
          </div>
          <button @click="reset_password()" id="id_submit" :disabled="loading" type="submit" class="btn btn-black btn-block">
            <span v-if="!loading">Reset Password</span><span v-else>Loading...</span>
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
    data(){
      return{
        password: '',
        again: '',
        object: {},
        loading: false,
        errors: {},
        msg: '',
      };
    },
    methods: {
      validPassword() {
        if (this.password !== this.again) {
          this.msg = 'Passwords do not match';
          document.getElementById('id_submit').disabled = true;
          return false;
        }
        this.msg = '';
        document.getElementById('id_submit').disabled = false;
        return true;
      },
      reset_password(){
        this.loading = true;
        const slug = this.$route.params.slug;
        axios.post(`${config.apiUrl}/user/fp/${slug}/`, {
          password: this.password,
          again: this.again
        }).then((response) => {
          this.loading = false;
          this.object = response.data;
          this.$noty.success(`Great, Password reset successful!`);
          this.$router.push('/login');
        }).catch(({response}) => {
          this.loading = false;
          this.errors = response.data;
          this.$noty.error(`Oops! ${this.errors.detail}`)
        })
      }
    },
    watch:{
      again(value){
        this.again = value;
        this.validPassword();
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
