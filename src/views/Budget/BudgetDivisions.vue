<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-12 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Budget Division Setup</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <span class="badge badge-success mr-2">Divisions {{div}}</span>
            <span class="badge badge-primary mr-2">Departments {{dep}}</span>
            <span class="badge badge-warning">Units {{unit}}</span>
            <!--<button class="btn btn-sm btn-primary" @click="period_exporrt(object.id, object.period)">Extract</button>-->
          </div>
          <div class="card-body">
            <div class="list-group-flush">
              <div class="list-group-item" :key="div.id" v-for="div in divisions">
                <div class="row">
                  <div class="col-md-10">
                    {{div.name}}
                  </div>
                  <div class="col-md-2">
                    <!--<button @click="div_exporrt(object.id, div.id, div.name)" class="btn btn-sm btn-outline-accent mr-2">Extract</button>-->
                    <a :href="`#div${div.id}`" class="btn btn-sm btn-primary" aria-expanded="false" :aria-controls="`div${div.id}`" data-toggle="collapse" role="button">
                      <i class="fa fa-sort"></i>
                    </a>
                  </div>
                </div>
                <div class="collapse multi-collapse" :id="`div${div.id}`">
                  <div class="list-group-flush">
                    <div class="list-group-item" :key="dep.id" v-for="dep in div.departments">
                      <div class="row">
                        <div class="col-md-10">
                          {{dep.name}}
                        </div>
                        <div class="col-md-2">
                          <!--<button @click="dep_exporrt(object.id, dep.id, dep.name)" class="btn btn-sm btn-outline-accent mr-2">Extract</button>-->
                          <a :href="`#dep${dep.id}`" class="btn btn-sm btn-primary" aria-expanded="false" :aria-controls="`dep${dep.id}`" data-toggle="collapse" role="button">
                            <i class="fa fa-sort"></i>
                          </a>
                        </div>
                      </div>
                      <div class="collapse multiple-collapse" :id="`dep${dep.id}`">
                        <div class="list-group-flush">
                          <div class="list-group-item" :key="unit.id" v-for="unit in dep.units">
                            <div class="row">
                              <div class="col-md-10">
                                {{unit.unit_name}}
                              </div>
                              <div class="col-md-2">
                                <!--<button @click="unit_exporrt(unit.id, unit.unit_name)" class="btn btn-sm btn-outline-accent mr-2">Extract</button>-->
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
        divisions: {},
        loading: false,
        dep: '',
        unit: '',
        div: '',
      };
    },
    methods: {
      object(){
        this.loading = true;
        axios.get(`${config.apiUrl}/budget/ds/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((response) => {
          this.loading = false;
          const results = response.data;
          this.divisions = results.divisions;
          this.dep = results.ndep;
          this.div = results.ndiv;
          this.unit = results.nunits;
          this.$noty.success('Everything looks great!');
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
          }else{
            this.$noty.error(`Oops! ${error.detail}!`);
          }
        });
      }
    },
    mounted(){
      this.object();
    }
  }
</script>
