<template>
    <div class="container container-fluid">
      <d-row no-gutters class="page-header py-2 pb-4 mb-3 border-bottom">
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <span class="text-uppercase page-subtitle">Overview</span>
          <h3 class="page-title">Units</h3>
        </d-col>
      </d-row>
        <div class="col">
          <div class="card card-small mb-4">
            <center v-if="unitloading"><Spinner/></center>
            <div class="table-responsive" v-else>
              <table class="table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Abbreviation</th>
                        <th>name</th>
                        <th>Department</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="text" v-model="code" placeholder="Enter New Code" class="form-control">
                        </td>
                        <td>
                            <input type="text" v-model="abbr" placeholder="Enter Abbreviation" class="form-control">
                        </td>
                        <td>
                            <input type="text" v-model="unit_name" placeholder="Enter Unit Name" class="form-control">
                        </td>
                        <td>
                            <select name="depart" v-model="depart" class="custom-select">
                                <option value="">Choose...</option>
                                <option :key="dpt.id" v-for="dpt in departs" :value="`${dpt.id}`">{{dpt.name}}</option>
                            </select>
                        </td>
                        <td>
                            <button :disabled="loading" @click="newUnit()" class="btn btn-sm btn-primary"> <span v-if="loading">saving...</span><span v-else>Submit</span> </button>
                        </td>
                    </tr>
                    <tr :key="object.id" v-for="object in object_list">
                        <td>{{object.unit_id}}</td>
                        <td>{{object.abbreviation}}</td>
                        <td>{{object.unit_name}}</td>
                        <td>{{object.department_name}}</td>
                        <td>
                           <button class="btn btn-sm btn-primary" data-toggle="modal" :data-target="`#delUnit${object.id}`"><i class="fa fa-times"></i></button>
                           <div class="modal fade" :id="`delUnit${object.id}`" tabindex="-1" role="dialog" :aria-labelledby="`delUnitLabel${object.id}`" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" :id="`delUnitLabel${object.id}`">Delete {{object.unit_name}}?</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    Are you sure you want to delete this unit? This action is not reversible.
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button"  :diabled="loading" @click="delUnit(object.id)" class="btn btn-primary">Delete</button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
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
      unit_name: '',
      depart: '',
      departs: {},
      abbr: '',
      unitloading: false,
    };
  },
  methods: {
    units() {
      this.unitloading = true;
      axios.get(`${config.apiUrl}/api/units/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.unitloading = false;
        this.object_list = response.data;
        this.noty.success('Everything works great!');
      }).catch(({ response }) => {
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
    newUnit() {
      axios.post(`${config.apiUrl}/api/nu/${this.depart}/`, {
        code: this.code,
        unit_name: this.unit_name,
        abbr: this.abbr,
      }, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        console.log(response);
        this.units();
        this.$noty.success('New unit added');
      }).catch(({ response }) => {
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
      axios.get(`${config.apiUrl}/api/departments/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.departs = response.data;
        this.$noty.success('Everything works great!');
      }).catch(({ response }) => {
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
    delUnit(id) {
      this.loading = true;
      axios.post(`${config.apiUrl}/api/dlu/${id}/`, {}, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        this.loading = false;
        $(`#delUnit${id}`).modal('hide');
        this.units();
        this.$noty.success('unit has been removed');
        console.log(res);
      }).catch((res) => {
        this.loading = false;
        console.log(res);
      });
    },
  },
  mounted() {
    this.units();
    this.departments();
  },

};
</script>
