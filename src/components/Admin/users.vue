<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Users</h3>
      </div>
    </div>

    <!-- Default Light Table -->
    <div class="row">
      <div class="col">
        <div class="card mb-4">
          <div class="card-header border-bottom">
            <router-link to="/create-user" class="btn btn-primary">Create New User</router-link>
          </div>

          <div class="card-body p-0 pb-3 text-center">
            <div class="ml-2 mr-2 mt-2 mb-2">
              <input type="text" v-model="search" placeholder="Search by Staff ID" class="form-control">
            </div>
            <div v-if="loading">
              <Spinner />
            </div>
            <div class="table-responsive" v-else>
              <table class="table mb-0">
                <thead class="bg-light">
                <tr>
                  <th scope="col" class="border-0">Staff ID</th>
                  <th scope="col" class="border-0">First Name</th>
                  <th scope="col" class="border-0">Last Name</th>
                  <th scope="col" class="border-0">Email</th>
                  <th scope="col" class="border-0">User Role</th>
                  <th scope="col" class="border-0">Status</th>
                  <th scope="col" class="border-0"></th>
                </tr>
                </thead>
                <tbody :key="object.id" v-for="object in user_list">
                <tr>
                  <td>{{object.staff_id}}</td>
                  <td>{{object.first_name}}</td>
                  <td>{{object.last_name}}</td>
                  <td>{{object.email}}</td>
                  <td>{{object.user_type_display}}</td>
                  <td>
                    <span v-if="object.is_active">Active</span>
                    <span v-else>Disabled</span>
                  </td>
                  <td>
                    <router-link :to="`/update-user/${object.slug}`" class="btn btn-primary"><i class="fa fa-tasks" aria-hidden="true"></i></router-link>
                  </td>
                </tr>
                </tbody>
              </table>
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
  import Spinner from '@/components/common/Spinner.vue';

  export default {
    components: {
      Spinner,
    },
    data() {
      return {
        object_list: {},
        loading: false,
        search: '',
      };
    },
    computed:{
      user_list(){
        return this.object_list.filter(post => post.staff_id.toLowerCase().includes(this.search.toLowerCase()));
      },
    },
    methods: {
      users() {
        this.loading = true;
        axios.get(`${config.apiUrl}/user/list/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((response) => {
          this.loading = false;
          this.object_list = response.data;
          this.$noty.success('Everything looks great!');
        }).catch((response) => {
          this.loading = false;
          console.log(response);
          if (response.status === 401) {
            this.$noty.error('Oops! Your session has expired.');
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          } else {
            this.$noty.error(`Oops! ${this.errors.detail}`);
          }
        });
      },
    },
    mounted() {
      this.users();
    },
  };
</script>
