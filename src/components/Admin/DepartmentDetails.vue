<template>
  <div>
    <d-container fluid class="main-content-container px-4">

      <!-- Page Header -->
      <d-row no-gutters class="page-header py-2 pb-4 mb-3 border-bottom">
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <span class="text-uppercase page-subtitle">Overview</span>
          <h3 class="page-title">{{object.name}} Details</h3>
        </d-col>
      </d-row>

      <div class="row">
          <div class="col-md-12">
              <div class="card">
                  <div class="card-header">
                      <div class="row">
                          <div class="col">
                             <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#deletDepart">
                          Delete
                      </button>
                          </div>
                          <div class="col" align="right">
                              <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#newUnit">
                          New Unit
                      </button>
                          </div>
                          <div class="modal fade" id="deletDepart" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Delete {{object.name}}?</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Are you sure you want to delete this department? This action is not reversible. All units under this department will be without a department after deletion.
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" :disabled="loading" @click="delDepart(object.id)" class="btn btn-primary">Delete</button>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="newUnit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle1">New Unit</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <input type="text" v-model="code" placeholder="Enter unit code" class="form-control" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" v-model="abbr" placeholder="Enter unit abbreviation" class="form-control" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" v-model="name" placeholder="Enter unit name" class="form-control" />
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" @click="newUnit(object.id)" :disabled="loading" class="btn btn-primary">Submit</button>
                                </div>
                                </div>
                            </div>
                        </div>

                      </div>

                  </div>
              <div class="card-body">
                  <div class="row">
                      <div class="col-md-4" style="border-right: 2px solid gray">
                          <div class="list-group-flush">
                            <div class="list-group-item">
                              <label for="id_div">Division</label>
                              <!--<input type="text" :value="object.division"  class="form-control" id="">-->
                              <!-- {{object.depart_id}} -->
                              <select class="form-control" id="id_div" :disabled="object.division">
                                <option value="">Choose...</option>
                                <option :key="div.id" v-for="div in divisions" :value="`${div.id}`" :selected="object.division">{{div.name}}</option>
                              </select>
                            </div>
                            <div class="list-group-item">
                              <label for="id_code">Code</label>
                              <input type="text" :value="object.depart_id" disabled class="form-control" id="id_code">
                              <!-- {{object.depart_id}} -->
                            </div>
                              <div class="list-group-item">
                                  <label for="id_abbr">Abbreviation</label>
                                  <input type="text" :value="object.abbreviation" class="form-control" id="id_abbr">
                                  <!-- {{object.abbreviation}} -->
                                </div>
                              <div class="list-group-item">
                                  <label for="id_name">Name</label>
                                  <input type="text" :value="object.name" class="form-control" id="id_name">
                                  <!-- {{object.name}} -->
                                </div>
                                <div class="list-group-item">
                                    <button @click="editDepart(object.id)" :disabled='loading' class="btn btn-primary btn-sm">Save</button>
                                </div>
                          </div>
                      </div>
                      <div class="col-md-8">
                          <div class="list-group-flush" :key="unit.id" v-for="unit in units">
                              <div class="list-group-item">
                                  <div class="row">
                                      <div class="col-sm-8">
                                          <div>{{unit.unit_name}}</div>
                                          <small>{{unit.abbreviation}} | {{unit.unit_id}}</small>
                                      </div>
                                      <div class="col-sm-4" align="center">
                                          <!-- <button class="btn btn-primary btn-sm mr-2">
                                              <i class="fa fa-pencil"></i>
                                          </button> -->
                                          <button class="btn btn-primary btn-sm" data-toggle="modal" :data-target="`#delUnit${unit.id}`">
                                              <i class="fa fa-times"></i>
                                          </button>
                                      </div>
                                      <div class="modal fade" :id="`delUnit${unit.id}`" tabindex="-1" role="dialog" :aria-labelledby="`delUnitLabel${unit.id}`" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" :id="`delUnitLabel${unit.id}`">Delete {{unit.unit_name}}?</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    Are you sure you want to delete this unit? This action is not reversible.
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button"  :disabled="loading" @click="delUnit(unit.id)" class="btn btn-primary">Delete</button>
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


    </d-container>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config';

export default {
  data() {
    return {
      object: {},
      units: {},
      name: '',
      abbr: '',
      code: '',
      division: '',
      divisions: {},
      loading: false,
    };
  },
  methods: {
    details() {
      const id = this.$route.params.depart_id;
      axios.get(`${config.apiUrl}/api/du/${id}`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        const results = res.data;
        this.object = results.department;
        this.units = results.units;
        this.division = results.division;
        this.$noty.success('Everything looks great!');
      }).catch((res) => {
        console.log(res);
      });
    },
    editDepart(id) {
      const name = document.getElementById('id_name').value;
      const abbr = document.getElementById('id_abbr').value;
      const div = document.getElementById('id_div').value;

      this.loading = true;
      axios.post(`${config.apiUrl}/api/ed/${id}/`, {
        name,
        abbr,
        div,
      }, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        this.loading = false;
        console.log(res);
        this.details();
      }).catch((res) => {
        console.log(res);
        this.loading = false;
      });
    },
    newUnit(id) {
      if (this.code && this.name && this.abbr) {
        this.loading = true;
        axios.post(`${config.apiUrl}/api/nu/${id}/`, {
          code: this.code,
          unit_name: this.name,
          abbr: this.abbr,
        }, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.name = '';
          this.abbr = '';
          this.code = '';
          $('#newUnit').modal('hide');
          this.loading = false;
          console.log(res);
          this.details();
          this.$noty.success('Unit added successfully');
        }).catch((res) => {
          this.loading = false;
          if (res.status === 401) {
            this.$noty.error('Oops! Your session has expired.');
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          } else {
            this.$noty.error(`Oops! ${this.errors.detail}`);
          }
          console.log(res);
        });
      }
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
        this.details();
        console.log(res);
        this.$noty.warning('Unit deleted successfully');
      }).catch((res) => {
        this.loading = false;
        console.log(res);
        if (res.status === 401) {
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
    delDepart(id) {
      this.loading = true;
      axios.post(`${config.apiUrl}/api/dd/${id}/`, {}, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },

      }).then((res) => {
        this.loading = false;
        $('#deletDepart').modal('hide');
        console.log(res);
        this.$router.push('/departments');
        this.$noty.success('Departments deleted successfuly');
      }).catch((res) => {
        console.log(res);
        this.loading = false;
        if (res.status === 401) {
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

  },
  mounted() {
    this.details();
    this.division_list();
  },
};
</script>
<style scoped>
.modal{
   overflow: visible !important;
}
.list-group-item, .list-group-item:hover{ z-index: auto; }
</style>
