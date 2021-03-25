<template>
    <div  class="main-content-container container-fluid px-4">
      <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Departments</h3>
      </div>
    </div>

        <div class="col">
          <div class="card card-small mb-4">
            <center class="card-body" v-if="departmentsloading"><Spinner/></center>
            <div class="card-body" v-else>
              <div class="table-responsive" >
              <table class="table">
                <thead>
                    <tr>
                        <th>Division</th>
                        <th>Code</th>
                        <th>Abbreviation</th>
                        <th>name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                          <select v-model="div" class="custom-select">
                            <option value="">Choose...</option>
                            <option :key="div.id" v-for="div in divisions" :value="`${div.id}`">{{div.name}}</option>
                          </select>
                        </td>
                        <td>
                            <input type="text" v-model="code" placeholder="Enter New Code" class="form-control">
                        </td>
                        <td>
                            <input type="text" v-model="abbr" placeholder="Enter Abbreviation" class="form-control">
                        </td>
                        <td>
                            <input type="text" v-model="name" placeholder="Enter Department Name" class="form-control">
                        </td>
                        <td>
                            <button :disabled="loading" @click="newDepart()" class="btn btn-sm btn-primary"><span v-if="loading">Saving...</span><span v-else>Submit</span></button>
                        </td>
                    </tr>
                    <tr :key="object.id" v-for="object in object_list">
                        <td>{{object.division}}</td>
                        <td>{{object.depart_id}}</td>
                        <td>{{object.abbreviation}}</td>
                        <td>{{object.name}}</td>
                        <td>
                            <router-link :to="`/department-detail/${object.slug}`" class="btn btn-sm btn-primary">
                              <i class="fa fa-tasks" aria-hidden="true"></i>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
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
      code: '',
      abbr: '',
      name: '',
      div: '',
      divisions: {},
      departmentsloading: false,
      loading: false,
    };
  },
  methods: {
    division_list() {
      axios.get(`${config.apiUrl}/api/divisions/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.divisions = response.data;
        this.$noty.success('Everything looks great!');
      }).catch((response) => {
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
    departments() {
      this.departmentsloading = true;
      axios.get(`${config.apiUrl}/api/departments`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.departmentsloading = false;
        this.object_list = response.data;
      }).catch((response) => {
        console.log(response);
      });
    },
    newDepart() {
      if (this.code || this.abbr || this.name) {
        this.loading = true;
        axios.post(
          `${config.apiUrl}/api/nd/${this.div}`, {
            code: this.code,
            abbr: this.abbr,
            name: this.name,
          },
          {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          },
        ).then((response) => {
          this.loading = false;
          console.log(response);
          this.code = '';
          this.abbr = '';
          this.name = '';
          this.departments();
          this.$noty.success('New department added successfully');
        }).catch(({ response }) => {
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
      }
    },
  },
  mounted() {
    this.departments();
    this.division_list();
  },
};
</script>
