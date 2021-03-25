<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Divisions Setup</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="card">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">

              <li class="nav-item" :key="object.id" v-for="object in object_list">
                <a class="nav-link" :id="`division${object.id}`" data-toggle="tab" :href="`#division-${object.id}`" role="tab" :aria-controls="`division-${object.id}`" aria-selected="true">
                  {{object.name}}
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                  <i class="fa fa-plus"></i> New Division
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <div class="tab-content" id="myTabContent">

              <div class="tab-pane fade" :key="object.id" v-for="object in object_list" :id="`division-${object.id}`" role="tabpanel" :aria-labelledby="`division-${object.id}-tab`">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col mt-1"><label :for="`id_assign${object.id}`">Assign Division to a Budget Officer:</label></div>
                      <div class="col">
                        <select :id="`id_assign${object.id}`" :v-model="object.assign_to !== null ? object.assign_to.id : null" class="custom-select" @change="assignto(object.id)">
                          <option value="">Choose...</option>
                          <option :key="off.id" v-for="off in offs"  :value="`${off.id}`" :selected="object.assign_to !== null ? off.id === object.assign_to.id : ''">{{off.full_name}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-5">
                    <ul class="nav flex-column nav-tabs" id="nav-tab" role="tablist" aria-orientation="vertical">
                      <!--<a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>-->
                      <li class="nav-item"> <a class="nav-link active" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fa fa-plus"></i> New Department</a></li>
                      <li class="nav-item" :key="depart.id" v-for="depart in object.departments"> <a class="nav-link" :id="`nav-contact${depart.id}-tab`" data-toggle="tab" :href="`#nav-contact${depart.id}`" role="tab" :aria-controls="`nav-contact${depart.id}`" aria-selected="false">{{depart.name}}</a></li>
                    </ul>
                  </div>
                  <div class="col-md-7">
                    <div class="tab-content" id="nav-tabContent">
                      <!--<div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...</div>-->
                      <div class="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <span v-if="msg" class="small text-danger">{{msg}}</span>
                        <hr>
                        <div class="form-group">
                          <input type="text" v-model="code" placeholder="Code" class="form-control">
                        </div>
                        <div class="form-group">
                          <input type="text" v-model="abbr" placeholder="Abbreviation" class="form-control">
                        </div>
                        <div class="form-group">
                          <input type="text" v-model="name" placeholder="Name" class="form-control">
                        </div>

                        <div class="form-group">
                          <button @click="newDepart(object.id)" :disabled="loading" class="btn btn-sm btn-block btn-primary">Save</button>
                        </div>
                      </div>
                      <div class="tab-pane fade" :key="depart.id" v-for="depart in object.departments" :id="`nav-contact${depart.id}`" role="tabpanel" :aria-labelledby="`nav-contact${depart.id}-tab`">
                        <button class="btn btn-primary" @click="show_modal(depart.id)" data-toggle="modal" :data-target="`#newUnit${depart.id}`">New Unit</button>
                        <div class="modal fade" :id="`newUnit${depart.id}`" tabindex="-1" role="dialog" :aria-labelledby="`newUnitLabel${depart.id}`" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" :id="`newUnitLabel${depart.id}`">Add A Unit to {{depart.name}}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <span v-if="msg" class="small text-danger">{{msg}}</span>
                                <hr>
                                <div class="form-group">
                                  <input type="text" v-model="code" placeholder="Code" class="form-control">
                                </div>
                                <div class="form-group">
                                  <input type="text" v-model="abbr" placeholder="Abbreviation" class="form-control">
                                </div>
                                <div class="form-group">
                                  <input type="text" v-model="name" placeholder="Name" class="form-control">
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" @click="newUnit(depart.id)" :diabled="loading" class="btn btn-primary">Save</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="list-group-flush mt-3" :key="unit.id" v-for="unit in depart.units">
                          <div class="row">
                            <div class="col-sm-8">
                              <div>{{unit.unit_name}}</div>
                              <small>{{unit.abbreviation}} | {{unit.unit_id}}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <div class="row">
                  <div class="col-md-6">
                    <span v-if="msg" class="small text-danger">{{msg}}</span>
                    <hr>
                    <div class="form-group">
                      <input type="text" v-model="code" placeholder="Code" class="form-control">
                    </div>
                    <div class="form-group">
                      <input type="text" v-model="abbr" placeholder="Abbreviation" class="form-control">
                    </div>
                    <div class="form-group">
                      <input type="text" v-model="name" placeholder="Name" class="form-control">
                    </div>

                    <div class="form-group">
                      <button @click="newDiv()" :disabled="loading" class="btn btn-sm btn-block btn-primary">Save</button>
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
    // name: "Divisions"
    data() {
      return {
        object_list: {},
        loading: false,
        code: '',
        abbr: '',
        name: '',
        msg: '',
        offs: {},
      };
    },
    methods: {
      divisions() {
        this.loading = true;
        axios.get(`${config.apiUrl}/api/divisions/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.loading = false;
          this.object_list = res.data;
          this.$noty.success('Everything works great!');
        }).catch((res) => {
          this.loading = false;
          console.log(res);
        });
      },
      officers(){
        this.loading = true;
        axios.get(`${config.apiUrl}/api/offs/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.loading = false;
          this.offs = res.data;
        });
      },
      assignto(div_id){
        this.$noty.info('Assigning...');
        this.loading = true;
        const assign = document.getElementById(`id_assign${div_id}`).value;
        axios.post(`${config.apiUrl}/api/ad/${div_id}/`, {
          assign: assign
        }, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((response) => {
          this.loading = false;
          this.$noty.success('Division assigned!');
          console.log(response);
          this.divisions();
        }).catch(({response}) => {
          this.loading = false;
          console.log(response);
        });
      },
      newDiv() {
        if (this.name && this.code && this.abbr) {
          this.loading = true;
          axios.post(`${config.apiUrl}/api/ndv/`, {
            code: this.code,
            abbr: this.abbr,
            name: this.name,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((res) => {
            this.loading = false;
            console.log(res);
            this.code = '';
            this.name = '';
            this.abbr = '';
            this.divisions();
            this.$noty.success('New Division added');
          }).catch((res) => {
            this.loading = false;
            console.log(res);
          });
        } else {
          this.msg = 'All fields are required';
          this.$noty.danger(this.msg);
        }
      },
      newDepart(id) {
        if (this.code && this.name && this.abbr) {
          this.loading = true;
          axios.post(`${config.apiUrl}/api/nd/${id}/`, {
            code: this.code,
            abbr: this.abbr,
            name: this.name,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((res) => {
            this.loading = false;
            console.log(res);
            this.divisions();
            this.code = '';
            this.name = '';
            this.abbr = '';
            this.$noty.success('New Department added');
          }).catch((res) => {
            console.log(res);
          });
        } else {
          this.msg = 'All fields are required';
          this.$noty.danger(this.msg);
        }
      },
      show_modal(id) {
        $(`#newUnit${id}`).modal('show');
        this.msg = '';
      },
      newUnit(id) {
        if (this.code && this.name && this.abbr) {
          this.loading = true;
          axios.post(`${config.apiUrl}/api/nu/${id}/`, {
            code: this.code,
            abbr: this.abbr,
            unit_name: this.name,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((res) => {
            this.loading = false;
            console.log(res);
            this.divisions();
            this.code = '';
            this.name = '';
            this.abbr = '';
            $(`#newUnit${id}`).modal('hide');
          }).catch((res) => {
            console.log(res);
          });
        } else {
          this.msg = 'All fields are required';
          this.$noty.danger(this.msg);
        }
      },
    },
    mounted() {
      this.divisions();
      this.officers();
    },
    watch: {
      msg() {
        if (this.name && this.code && this.abbr) {
          this.msg = '';
        }
      },
    },
  };
</script>

<style scoped>

</style>
