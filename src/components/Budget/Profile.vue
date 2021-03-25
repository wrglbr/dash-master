<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">User Profile</h3>
      </d-col>
    </d-row>

    <!-- Content -->
    
    <div class="row pl-5">
      <div class="col-md-9">
        <div class="card">
          <div class="card-header">
            <div align="right">
              <button @click="show_save()" id="edit" class="btn btn-sm btn-primary mr-1"><i class="material-icons">create</i></button>
              <button hidden="hidden" @click="edit()" id="save" class="btn btn-sm btn-success mr-1"><i class="material-icons">sd_card</i></button>
              <button hidden="hidden" @click="hide_save()" id="clear" class="btn btn-sm btn-warning"><i class="material-icons">clear</i></button>
            </div>
            <!--<h4 class="text-center">OBIRI's Profile</h4>-->
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <div class="row">
                  <div class="col-md-3 mt-1">
                    <label for="id_first">First Name:</label>
                  </div>
                  <div class="col-md-9">
                    <input type="text" id="id_first" disabled v-model="profile.first_name" class="form-control">
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="row">
                  <div class="col-md-3 mt-1">
                    <label for="id_last">Last Name:</label>
                  </div>
                  <div class="col-md-9">
                    <input type="text" id="id_last" disabled v-model="profile.last_name" class="form-control">
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <b>Email</b> : {{profile.email}}
              </li>
              <li class="list-group-item">
                <b>Division</b>: {{profile.division_name}}
              </li>
              <li class="list-group-item">
                <b>Department</b>: {{profile.department_name}}
              </li>
              <li class="list-group-item">
                <b>Unit</b>: {{profile.unit_name}}
              </li>
               <li class="list-group-item">
                <b>Staff ID</b>: {{profile.staff_id}}
              </li>
              <li class="list-group-item">
                <b>Role</b>: {{profile.user_type_display}}
              </li>
              <!--<li class="list-group-item">-->
                <!--<b>Department</b>: Human Resources-->
              <!--</li>-->
            </ul>
            <hr>
                <div class="card-title text-center"> <b>CHANGE PASSWORD</b> </div>
                <small class="text-danger p-2" v-if="errors">{{errors.detail}}</small>
            <div class="form-group">
              <label for="oldPassword">Enter Old Password</label>
              <input v-model="old" type="password" id="oldPassword" class="form-control">
            </div>
            <div class="form-group">
              <label for="newPassword">Enter New Password</label>
              <input v-model="neww" type="password" id="newPassword" class="form-control">
            </div>
            <div class="form-group">
              <label for="againPassword">Confirm New Password</label>
              <input v-model="again" type="password" id="againPassword" class="form-control">
              <small v-if="msg" class="text-danger">{{msg}}</small>
            </div>
            <button @click="change_password()" :disabled="loading" id="id_submit" class="btn btn-primary btn-block">Save</button>
          </div>
        </div>
      </div>
      
            
          </div>
          <div class="card-body">
           
          </div>
        


  </d-container>
</template>

<script>
  import axios from 'axios';
  import config from '@/config';

export default {
  name: 'user-profile',
  data(){
    return {
      profile: {},
      loading: false,
      old: '',
      neww: '',
      again: '',
      errors: {},
      msg: '',
    };
  },
  mounted(){
    this.user_profile();
  },
  methods: {
    valid(){
      if(this.neww !== this.again){
        this.msg = 'Passwords do not match';
        document.getElementById('id_submit').disabled = true;
        return false;
      }
      this.msg = '';
      document.getElementById('id_submit').disabled = false;
      return true;
    },
    show_save(){
      document.getElementById('id_first').disabled = false;
      document.getElementById('id_last').disabled = false;
      document.getElementById('edit').hidden = true;
      document.getElementById('clear').hidden = false;
      document.getElementById('save').hidden = false;
    },
    hide_save(){
      document.getElementById('id_first').disabled = true;
      document.getElementById('id_last').disabled = true;
      document.getElementById('edit').hidden = false;
      document.getElementById('clear').hidden = true;
      document.getElementById('save').hidden = true;
    },
    user_profile(){
      this.loading = true;
      axios.get(`${config.apiUrl}/user/up/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`
        }
      }).then((res) => {
        this.loading = false;
        this.profile = res.data;
        this.$noty.success('Everything looks great');
      }).catch(({response}) => {
        this.loading = false;
        const errors = response.data;
        if(response.status === 401){
          this.$noty.error(`Oops! Your session has expired.`);
          localStorage.removeItem('auth');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.$router.push('/login');
        }else{
          this.$noty.error(`Oops! ${errors.detail}`);
        }
      });
    },
    edit(){
      this.loading = true;
      this.$noty.info('Saving...');
      axios.post(`${config.apiUrl}/user/up/`, {
        fname: this.profile.first_name,
        lname: this.profile.last_name,
      },{
        headers: {
          Authorization: `JWT ${config.get_token()}`
        }
      }).then((res) => {
        this.loading = false;
        this.user_profile();
        console.log(res);
        const results = res.data;
        this.hide_save();
        localStorage.removeItem('user');
        this.$root.auth.user = results.user;
        config.set_user(JSON.stringify(results.user));
        this.$noty.success('Profile Updated');
      }).catch(({res}) => {
        this.loading = false;
        console.log(res);
        const errors = res.data;
        if(response.status === 401){
          this.$noty.error(`Oops! Your session has expired.`);
          localStorage.removeItem('auth');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.$router.push('/login');
        }else{
          this.$noty.error(`Oops! ${errors.detail}`);
        }
      })
    },
    change_password(){
      this.loading = true;
      this.$noty.info('Saving');
      axios.post(`${config.apiUrl}/user/cp/`, {
        new: this.neww,
        old: this.old,
        again: this.again
      }, {
        headers: {
          Authorization:`JWT ${config.get_token()}`
        }
      }).then((res) => {
        this.loading = false;
        console.log(res);
        this.neww = '';
        this.old = '';
        this.again = '';
        this.errors = {};
        this.$noty.success('Password changed');
      }).catch(({response}) => {
        this.loading = false;
        console.log(response);
        this.errors = response.data;
        this.neww = '';
        this.old = '';
        this.again = '';
        if(response.status === 401){
          this.$noty.error(`Oops! Your session has expired.`);
          localStorage.removeItem('auth');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.$router.push('/login');
        }else{
          this.$noty.error(`Oops! ${this.errors.detail}`);
        }
      });
    }
  },
  watch: {
    again(value){
      this.again = value;
      this.valid();
    }
  }
};
</script>

