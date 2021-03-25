<template>
  <div class="wrap">
    <div class="sidenav">
      <div class="login-main-text">

      </div>
    </div>
    <div class="main">
      <div class="col-md-8 col-sm-12">

        <div class="login-form">
          <div class="card">
            <div class="card-body">
              Hi {{object.full_name}}, an email has been sent to <i>{{object.email}}</i>
            </div>
            <div class="card-footer" align="right">
              <router-link to="/login" class="btn btn-primary btn-sm">Back to Login</router-link>
            </div>
          </div>
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
        object: {},
        errors: {},
      };
    },
    methods:{
      user(){
        const slug = this.$route.params.slug;
        axios.get(`${config.apiUrl}/user/fp/${slug}/`,).then((res) => {
          this.object = res.data;
          console.log(res.data);
        }).catch(({res}) => {
          this.errors = res.data;
          console.log(this.errors);
        });
      }
    },
    mounted(){
      this.user();
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
