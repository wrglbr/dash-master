<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Activity Logs</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="card">
          <div class="card-header"></div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Activity ID</th>
                  <th>Model</th>
                  <th>Model ID</th>
                  <th>Action</th>
                  <th>At</th>
                </tr>
                </thead>
                <tbody>
                <tr :key="object.id" v-for="object in object_list">
                  <td><router-link :to="{name: 'update-user', 'params': {'userId': object.created_by.slug}}">{{object.created_by.staff_id}}</router-link></td>
                  <td>{{object.activity_id}}</td>
                  <td>{{object.model}}</td>
                  <td>{{object.model_id}}</td>
                  <td>{{object.action}}</td>
                  <td>{{object.created_at | moment}}</td>
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
import moment from 'moment';

export default {
  name: 'LogsComponent',
  data() {
    return {
      object_list: {},
    };
  },
  filters: {
    moment(date) {
      return moment(date).fromNow();
    },
  },
  methods: {
    logs() {
      axios.get(`${config.apiUrl}/api/logs/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        this.object_list = res.data;
        this.$noty.success('Everything works great');
      });
    },
  },
  mounted() {
    this.logs();
  },
};
</script>

<style scoped>

</style>
