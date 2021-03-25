<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Budget Implementations</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="card">
          <div class="card-header"></div>
          <div class="card-body">
            <div class="col-md-4">
              <input autofocus type="text" name="search" class="form-control" placeholder="Search by Unit Name" v-model="search">
            </div>
            <center v-if="loading"><Spinner/></center>
            <span v-else-if="!object_list.length">Nothing to show here!</span>
            <div class="table-responsive" v-else>
              <table class="table table-borderless">
                <thead>
                <tr>
                  <th>Unit</th>
                  <!--<th>Unit</th>-->
                  <th>Budget Period</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr :key="object.id" v-for="object in search_list">
                  <td>{{object.unit_name}}</td>
                  <!--<td>{{object.unit_name}}</td>-->
                  <td>{{object.budget_period}}</td>
                  <td>{{object.status}}</td>
                  <td>
                    <router-link :to="`/implement-details/${object.slug}`" class="btn btn-sm btn-primary">Details</router-link>
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
import config from '../../config';
// eslint-disable-next-line import/first
import Spinner from '@/components/common/Spinner.vue';

export default {
  components: {
    Spinner,
  },
  name: 'Implementations',
  data() {
    return {
      object_list: {},
      loading: false,
      errors: {},
      search: '',
    };
  },
  mounted() {
    this.implements();
  },
  computed: {
    search_list(){
      return this.object_list.filter(post => post.unit_name.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  methods: {
    implements() {
      this.$noty.info('Loading...');
      this.loading = true;
      axios.get(`${config.apiUrl}/budget/cubs/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        this.loading = false;
        this.$noty.success('Everything looks great');
        this.object_list = res.data;
      }).catch(({response}) => {
        this.errors = response.data;
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
    },
  },
};
</script>

<style scoped>

</style>
