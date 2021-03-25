<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Unit Budget</h3>
      </div>
    </div>

    <!-- Default Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <!-- <button class="btn btn-success" float-right>New Period</button> -->
          </div>
          <div class="card-body p-0 pb-3 text-center">
            <center v-if="loading"><Spinner/></center>
            <span v-else-if="!object_list.length">Nothing to show here!</span>
            <div class="table-responsive" v-else>
              <table class="table mb-0">
              <thead class="bg-light">
                <tr>
                  <th scope="col" class="border-0">Unit</th>
                  <th scope="col" class="border-0">Budget Period</th>
                  <th scope="col" class="border-0">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody :key="object.id" v-for="object in object_list">
                <tr>
                  <td>{{object.unit_name}}</td>
                  <td>{{object.budget_period}}</td>
                  <td>{{object.status}}</td>
                  <td>
                    <router-link :to="{name: 'unitBudget-details', params: {unit_id: object.slug}}" class="btn btn-sm btn-primary">
                      Details
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
    };
  },
  methods: {
    budgets() {
      this.loading = true;
      axios.get(`${config.apiUrl}/budget/aub/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.loading = false;
        this.object_list = response.data;
        this.$noty.success('Everything looks great');
      }).catch(({response}) => {
        this.loading = false;
        console.log(response.data);
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
  },
  mounted() {
    this.budgets();
  },
};
</script>

