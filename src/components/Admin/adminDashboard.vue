<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Dashboard Overview</h3>
      </d-col>
    </d-row>
    <div class="container">
      <div class="card-deck text-white ">
        <router-link to="/divisions" class="card card-small card-link text-center" >
          <div class="card-block card-body bg-info text-white">
            <h4 class="card-title text-uppercase text-white">Divisions</h4>
            <p class="card-text display-3">
              {{divisions}}
            </p>
          </div>
          <div class="card-footer bg-primary text-white">
            <div class="row">
              <span class="col">Departments: {{departs}}</span>
              <span class="col">Units: {{units}}</span>

            </div>
          </div>
        </router-link>

        <router-link to="/budget-settings" class="card card-link card-small text-center">
          <div class="card-block card-body bg-warning">
            <h4 class="card-title text-uppercase text-white">Categories</h4>
            <p class="card-text display-3 text-white">
              {{cats}}
            </p>
          </div>
          <div class="card-footer bg-warning text-white">
            <div class="row">
              <div class="col">Items: {{items}}</div>
              <div class="col">Assets: {{assets}}</div>
            </div>

          </div>
        </router-link>

        <router-link to="/users" class="card card-link card-small text-center">
          <div class="card-block card-body bg-danger">
            <h4 class="card-title text-uppercase text-white">Users</h4>
            <p class="card-text display-3 text-white">
              {{users}}
            </p>
          </div>
          <div class="card-footer bg-danger text-white">
            <!--Units 200-->
          </div>
        </router-link>
      </div>
    </div>
    <br><br>

      <!--<d-row>-->
      <!--&lt;!&ndash; Users Overview &ndash;&gt;-->
      <!--<d-col lg="4" md="6" sm="12" class="mb-4">-->
        <!--<Summary />-->
      <!--</d-col>-->

      <!--&lt;!&ndash; Users by Device (lite) &ndash;&gt;-->
      <!--<d-col lg="8" md="6" sm="12" class="mb-4">-->
        <!--<barChart/>-->
      <!--</d-col>-->
    <!--</d-row>-->

  </d-container>
</template>
<script>
import barChart from '@/components/chartComponents/barChart.vue';
import Summary from '@/components/chartComponents/Summary.vue';
import axios from 'axios';
import config from '@/config';
import moment from 'moment';

export default {
  components: {

    barChart,
    Summary,

  },
  data() {
    return {
      departs: '',
      units: '',
      divisions: '',
      cats: '',
      items: '',
      assets: '',
      users: '',
      activities: {},
      loading: false,
    };
  },
  filters: {
    moment(date) {
      return moment(date).fromNow();
    },
  },
  methods: {
    dashboard() {
      this.loading = true;
      axios.get(`${config.apiUrl}/api/d/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        this.loading = false;
        const results = res.data;
        this.activities = results.activities;
        this.departs = results.departments;
        this.units = results.units;
        this.cats = results.categories;
        this.assets = results.assets;
        this.items = results.items;
        this.users = results.users;
        this.divisions = results.divisions;
      }).catch((res) => {
        console.log(res);
      });
    },
  },
  mounted() {
    this.dashboard();
  },
};
</script>

