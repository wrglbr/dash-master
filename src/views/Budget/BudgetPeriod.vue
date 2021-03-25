<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Budget Periods</h3>
      </div>
    </div>

    <!-- Default Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4 h-100">
          <div class="card-header border-bottom">
            <div v-if="userRole === 'BH'">
              <button type="button" data-toggle="modal" data-target="#newPeriod" class="btn btn-primary">New Period</button>
              <div class="modal fade" id="newPeriod" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle1">New Period</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="form-group">
                        <label for="id_start">Start Date</label>
                        <input type="date" id="id_start" v-model="start_date" placeholder="Enter unit code" class="form-control" />
                      </div>

                      <div class="form-group">
                        <label for="id_dead">Submission Deadline</label>
                        <input type="date" id="id_dead" v-model="deadline" placeholder="Enter unit code" class="form-control" />
                      </div>

                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" :disabled="loading" @click="new_period()" class="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="card-body p-0 pb-3 text-center">
            <center v-if="loading"><Spinner/></center>
            <span v-else-if="!object_list.length">Nothing to show here!</span>
            <div class="table-responsive" v-else>
              <table class="table mb-0">
              <thead class="bg-light">
                <tr>
                  <th scope="col" class="border-0">Period</th>
                  <!--<th scope="col" class="border-0">Period</th>-->
                  <th scope="col" class="border-0">Start Date</th>
                  <th scope="col" class="border-0">End Date</th>
                  <th scope="col" class="border-0">Submission Deadline</th>
                  <th scope="col" class="border-0">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody :key="object.id" v-for="object in object_list">
                <tr>
                  <td>{{object.period}}</td>
                  <!--<td>{{object.period}}</td>-->
                  <td>{{object.start_date}}</td>
                  <td>{{object.end_date}}</td>
                  <td>{{object.deadline}}</td>
                  <td>{{object.status}}</td>
                  <td>
                    <router-link :to="{name: 'period-details', params: {period_id: object.slug}}" class="btn btn-sm btn-primary mr-1">
                      Details
                    </router-link>
                    <router-link :hidden="userRole === 'UU'" :to="{name: 'budget_summary', params: {period_id: object.slug}}" class="btn btn-sm btn-primary">
                      Budget Summary
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
          <!--<div class="card-body pb-3" v-else>-->
            <!--Nothing to show here!-->
          <!--</div>-->
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
      start_date: '',
      deadline: '',
    };
  },
  computed: {
    userRole() {
      return this.$root.auth.user.user_role;
    },
  },
  methods: {
    new_period(){
      if(this.start_date && this.deadline){
        this.loading = true;
        axios.post(`${config.apiUrl}/budget/nbp/`, {
          start_date: this.start_date,
          deadline: this.deadline,
        }, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((response) => {
          this.loading = false;
          console.log(response);
          $('#newPeriod').modal('hide');
          this.start_date = '';
          this.deadline = '';
          this.$noty.success("Great! New Budget Period added");
          this.periods();
          // this.$router.push('/budget-periods');
        }).catch((response) => {
          this.loading = false;
          console.log(response);
          this.start_date = '';
          this.deadline = '';
          this.$noty.error("Oops! Something went terribly wrong!");
        });
      }

    },
    periods() {
      this.loading = true;
      axios.get(`${config.apiUrl}/budget/abp`, {
        headers: { Authorization: `JWT ${config.get_token()}` },
      }).then((response) => {
        this.loading = false;
        this.$noty.success('Everything looks great!');
        // console.log(response);
        this.object_list = response.data;
      }).catch(({ response }) => {
        this.loading = false;
        console.log(response);
        const error = response.data;

        if(response.status === 401){
          this.$noty.error(`Oops! Your session has expired.`);
          localStorage.removeItem('auth');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.$router.push('/login');
        }
        // this.$noty.error(`Oops! ${error.detail}!`);
      });
    },
    deadlines(){
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
      // console.log(date);
      axios.get(`${config.apiUrl}/budget/deadline/${date}/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`
        }
      }).then((res) => {
        console.log(res.data);
        this.periods();
      })
    },
  },
  mounted() {
    // console.log(config.get_token());
    this.periods();
    this.deadlines();
  },
};
</script>
