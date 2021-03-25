<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-12 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Budget Period Reports</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header"></div>
          <div class="card-body">
            <div class="list-group-flush">
              <div class="list-group-item" :key="object.id" v-for="object in object_list">
                <div class="row">
                  <div class="col-md-10">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{{object.period}}</h5>
                    </div>
                    <p class="text-muted mb-1 small">{{object.start_date}} - {{object.end_date}}</p>
                  </div>
                  <div class="col-md-2">
                    <div class="row">
                      <div class="col-md-12 mb-1">
                        <router-link :to="`/report-details/${object.slug}`" class="btn btn-sm btn-primary">View</router-link>
                      </div>
                      <div class="col-md-12 mb-1">
                        <button class="btn btn-sm btn-primary" @click="exporrt(object.id, object.period)">Extract</button>
                      </div>
                      <div class="col-md-12">
                        <router-link :to="userRole !== 'AD' ? {name: 'budget_summary', params: {period_id: object.slug}} : {name: 'admin-budget_summary', params: {period_id: object.slug}}" class="btn btn-sm btn-primary">Summary</router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
    name: 'Report',
    data(){
      return{
        object_list: {}
      };
    },
    computed: {
      userRole(){
        return this.$root.auth.user.user_role;
      }
    },
    methods: {
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
        const errors = response.data;

        if(response.status === 401){
          this.$noty.error(`Oops! Your session has expired.`);
          localStorage.removeItem('auth');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.$router.push('/login');
        }
        this.$noty.error(`Oops! ${errors.detail}!`);
      });
    },
      exporrt(pid, period){
        this.$noty.info('Exporting...');
        axios.get(`${config.apiUrl}/budget/exbs/${pid}/`, {
          responseType: 'blob',
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          }
        }).then((res) => {
          const url = URL.createObjectURL(new Blob([res.data], {type: 'application/vnd.ms-excel'}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${period}.xls`);
          document.body.appendChild(link);
          link.click();
          this.$noty.success('Export successful');
        }).catch(({response}) => {
          this.errors = response.data;
          console.log(response);
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }else{
            this.$noty.error(`Oops! ${this.errors.detail}`);
          }
        })
      }
    },
    mounted() {
    // console.log(config.get_token());
    this.periods();
  },
  }
</script>
