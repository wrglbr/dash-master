/* eslint-disable comma-dangle */
<template>
  <div>
    <div class="main-content-container container-fluid px-4">
      <!-- Page Header -->
      <d-row no-gutters class="page-header py-2 pb-4 mb-3 border-bottom">
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <span class="text-uppercase page-subtitle">Overview</span>
          <h3 class="page-title">Set Budget</h3>
        </d-col>
      </d-row>
      <d-col lg="12">
        <d-card class="card-small  py-2 pb-4">
          <d-card-header class="border-bottom">
            <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
              <li class="nav-item"><a href="#home" id="home-tab" data-toggle="tab" class="nav-link active" aria-selected="true">Goods and Services</a></li>
              <!--<li class="nav-item"><a href="#imprest" id="imprest-tab" data-toggle="tab" class="nav-link" aria-selected="true">Imprest Items</a></li>-->
              <li class="nav-item"><a href="#contact" id="contact-tab" data-toggle="tab" class="nav-link" aria-selected="true">Assets</a></li>
              <li class="nav-item"><a href="#compen" id="compen-tab" data-toggle="tab" class="nav-link" aria-selected="true">Compensations</a></li>
            </ul>
          </d-card-header>
          <div class="card-body">
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <center v-if="listLoading"><Spinner/></center>
                <div class="row" v-else>
                  <div class="col-md-3">
                    <ul class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                      <li class=nav-item><a class="nav-link active" id="v-pills-profile-tab"
                                            data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="True">New Category</a></li>

                      <li class="nav-item" :key="object.id" v-for="object in object_list">
                        <a class="nav-link" :id="`v-pills-home${object.id}-tab`" data-toggle="pill"
                           :href="`#v-pills-home${object.id}`" role="tab"
                           :aria-controls="`v-pills-home${object.id}`" aria-selected="true">
                          <div class="row">
                            <div class="col">{{object.name}}</div>
                            <div class="col" align="right">

                              <button type="button" class="btn btn-info btn-sm" data-toggle="modal" :data-target="`#category${object.id}`">
                                <i class="fa fa-close" style="color: white"></i>
                              </button>
                            </div>
                            <div class="modal fade" :id="`category${object.id}`" tabindex="-1" role="dialog" :aria-labelledby="`catLabel${object.id}`" aria-hidden="true">
                              <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" :id="`catLabel${object.id}`">Delete {{object.name}}?</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body text-dark">

                                    <p>Are you sure you want to delete this category? All items under this category will not be asociated with any category after deletion.</p>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" @click="delCat(object.id)" class="btn btn-primary">Delete</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>


                        </a>
                      </li>

                    </ul>
                  </div>
                  <div class="col-md-9">
                    <div class="tab-content" id="v-pills-tabContent" >
                      <div class="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <div class="row mb-4">
                          <div class="col-md-4">
                            <input type="text" v-model="code" placeholder="Code" class="form-control">
                          </div>
                          <div class="col-md-4">
                            <input type="text" v-model="name" placeholder="Name" class="form-control">
                          </div>
                          <div class="col-md-4">
                            <button @click="newCat()" :disabled="loading" class="btn btn-sm btn-primary">
                              <span v-if="loading">Saving...</span><span v-else>Add New Category</span></button>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane fade" :key="object.id" v-for="object in object_list" :id="`v-pills-home${object.id}`" role="tabpanel" :aria-labelledby="`v-pills-home${object.id}-tab`">
                        <div class="list-group-flush">
                          <div class="list-group-item">
                            <div class="row">
                              <div class="col-md-11">
                                <div class="row">
                                  <div class="col-md-3">
                                    <input type="text" v-model="code" placeholder="Code" class="form-control">
                                  </div>
                                  <div class="col-md-3"><input type="text" v-model="item_name" placeholder="Item Name" class="form-control"></div>
                                  <div class="col">
                                    <select class="custom-select" v-model="item_type">
                                      <option value="">Choose...</option>
                                      <option value="Good">Good</option>
                                      <option value="Service">Service</option>
                                      <!--<option value="Imprest">Imprest</option>-->
                                    </select>
                                  </div>
                                  <div class="col">
                                    <select class="custom-select" v-model="procure" :hidden="item_type === 'Good' || item_type === ''">
                                      <option value="">Procure</option>
                                      <option value="1">Yes</option>
                                      <option value="0">No</option>
                                    </select>
                                  </div>
                                </div>

                              </div>
                              <div class="col-md-1">
                                <button @click="newItem(object.id)" :disabled="loading" class="btn btn-sm btn-primary">
                                  <span v-if="loading" class="material-icons small">cached</span><span v-else class="material-icons small">create</span></button>
                              </div>
                            </div>
                          </div>
                          <div class="list-group-item" :key="item.id" v-for="item in object.items">
                            <div class="row">
                              <div class="col-md-9">
                                <span v-if="item.is_procure" ><span style="border-left: 2px solid gold; margin-right: 5px"></span>{{item.item_id}} | {{item.item_type}} | {{item.item_name}}</span>
                                <span v-else>{{item.item_id}} | {{item.item_type}} | {{item.item_name}}</span>
                              </div>
                              <div class="col-md-1" align="right">
                                <!-- <DeleteItem /> -->
                                <button class='btn btn-sm btn-primary'  data-toggle="modal" :data-target="`#item${item.id}`">
                                  <span class="fa fa-close" style="color:white"></span>
                                </button>

                              </div>
                              <div class="modal fade" :id="`item${item.id}`" tabindex="-1" role="dialog" aria-labelledby="itemlabel${item.id}" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel">Delete {{item.item_name}}?</h5>
                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div class="modal-body">
                                      Are You sure you want to delete this item? This action is irreversible.
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                      <button type="button" id='id_delete_item' @click="delItem(item.id)" class="btn btn-primary" >Delete</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-2 mt-1" align="right">
                                <a :href="`#subCol${item.id}`" @click="expand(item.id)" data-toggle="collapse" role="button" aria-expanded="false" :aria-controls="`subCol${item.id}`">
                                  <i :id="`sub${item.id}`" class="fas fa-plus"></i>
                                </a>
                              </div>
                            </div>
                            <div class="collapse multi-collapse" :id="`subCol${item.id}`">
                              <div class="list-group-flush pt-2">
                                <div class="list-group-item">
                                  <div class="row">
                                    <div class="col-md-5">
                                      <input type="text" v-model="isub_code" class="form-control" placeholder="Code">
                                    </div>
                                    <div class="col-md-5">
                                      <input type="text" v-model="isub_name" class="form-control" placeholder="Name">
                                    </div>
                                    <div class="col-md-2" align="right">
                                      <button @click="new_sub_item(item.id)" :disabled="loading" class="btn-sm btn btn-outline-primary">
                                        <i class="fa fa-save"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div class="list-group-item" :key="sub.id" v-for="sub in item.subs">
                                  {{sub.sub_id}} | {{sub.name}}
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
              <!--<div class="tab-pane fade" id="imprest" role="tabpanel" aria-labelledby="imprest-tab">-->
              <!--sdsds-->
              <!--</div>-->
              <div class="tab-pane fade" id="compen" role="tabpanel" aria-labelledby="compen-tab">
                <!--<span class="text-uppercase page-subtitle">Filter</span>-->
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <!--<label for="id_div">Select Division</label>-->
                      <select v-model="div" name="" id="id_div" class="custom-select form-control-sm">
                        <option value="">Choose Division</option>
                        <option :key="div.id" v-for="div in divisions" :value="div.id">{{div.name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <!--<label for="id_dep">Select Department</label>-->
                      <select v-model="dep" name="" id="id_dep" class="custom-select form-control-sm">
                        <option value="">Choose Department</option>
                        <option :key="dep.id" v-for="dep in departs" :value="dep.depart_id">{{dep.name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <!--<label for="id_unit">Select Unit</label>-->
                      <select v-model="unit" name="" id="id_unit" class="custom-select form-control-sm">
                        <option value="">Choose Unit</option>
                        <option :key="un.id" v-for="un in units" :value="un.id">{{un.unit_name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <button :disabled="loading" @click="bp_list()" class="btn btn-sm btn-primary"><i class="material-icons">filter_list</i> Filter</button>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                    <tr>
                      <th>Unit</th>
                      <th>Staff ID</th>
                      <th>Full Name</th>
                      <th>Monthly Basic Salary</th>
                      <th>Yearly Basic Salary</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr :key="ec.id" v-for="ec in compensations">
                      <td>{{ec.unit_budget.unit_name}}</td>
                      <td>{{ec.staff_number}}</td>
                      <td>{{ec.first_name}} {{ec.last_name}}</td>
                      <td>GHS {{formatPrice(ec.monthly_basic)}}</td>
                      <td>GHS {{formatPrice(ec.period_basic)}}</td>

                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                <div class="list-group-flush">
                  <div class="list-group-item">
                    <div class="row">
                      <div class="col-md-5">
                        <input type="text" v-model="code" class="form-control" placeholder="Code">
                      </div>
                      <div class="col-md-5">
                        <input type="text" v-model="asset_name" class="form-control" placeholder="Asset Name">
                      </div>
                      <div class="col-md-2">
                        <button class="btn btn-sm btn-primary" :disabled="loading" @click="newAsset()">
                          <i class="material-icons">create</i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="list-group-item" :key="asset.id" v-for="asset in assets">
                    <div class="row">
                      <div class="col">{{asset.asset_id}} | {{asset.asset_name}}</div>
                      <div class="col" align="right">
                        <a :href="`#asubCol${asset.id}`" @click="expand(asset.id)" data-toggle="collapse" role="button" aria-expanded="false" :aria-controls="`asubCol${asset.id}`">
                          <i :id="`asub${asset.id}`" class="fas fa-plus"></i>
                        </a>
                      </div>
                    </div>
                    <div class="collapse multi-collapse" :id="`asubCol${asset.id}`">
                      <div class="list-group-flush pt-2">
                        <div class="list-group-item">
                          <div class="row">
                            <div class="col-md-5">
                              <input type="text" placeholder="Code" v-model="asub_code" class="form-control">
                            </div>
                            <div class="col-md-5">
                              <input type="text" placeholder="Name" v-model="asub_name" class="form-control">
                            </div>
                            <div class="col-md-2" align="right">
                              <button @click="new_sub_asset(asset.id)" :disabled="loading" class="btn btn-sm btn-outline-primary">
                                <i class="fa fa-save"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="list-group-item" :key="sub.id" v-for="sub in asset.subs">
                          {{sub.sub_id}} | {{sub.name}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>


        </d-card>
      </d-col>
    </div>
  </div>
</template>
<script>

  import axios from 'axios';
  import config from '@/config';
  import DeleteCategory from '@/components/common/deleteCategory.vue';
  import DeleteItem from '@/components/common/deleteItem.vue';
  import Spinner from '@/components/common/Spinner.vue';



  export default {
    name: 'budget',
    components: {
      DeleteCategory,
      DeleteItem,
      Spinner,
    },
    data() {
      return {
        object_list: {},
        item_name: '',
        assets: {},
        compensations: {},
        name: '',
        item_type: '',
        procure: '',
        asset_name: '',
        isub_name: '',
        isub_code: '',
        asub_name: '',
        asub_code: '',
        code: '',
        loading: false,
        listLoading: false,
        div: '',
        dep: '',
        unit: '',
        divisions: {},
        departs: {},
        units: {},
        // showModal: true,

      };
    },
    methods: {
      expand(itemid){
        if(document.getElementById(`sub${itemid}`).classList.contains('fa-plus')){
          document.getElementById(`sub${itemid}`).classList.remove('fa-plus');
          document.getElementById(`sub${itemid}`).classList.add('fa-minus');
          document.getElementById(`sub${itemid}`).innerText = ' Collapse';
        }else if (document.getElementById(`sub${itemid}`).classList.contains('fa-minus')){
          document.getElementById(`sub${itemid}`).classList.remove('fa-minus');
          document.getElementById(`sub${itemid}`).classList.add('fa-plus');
          document.getElementById(`sub${itemid}`).innerText = ' Expand';
        }

        if(document.getElementById(`asub${itemid}`).classList.contains('fa-plus')){
          document.getElementById(`asub${itemid}`).classList.remove('fa-plus');
          document.getElementById(`asub${itemid}`).classList.add('fa-minus');
          document.getElementById(`asub${itemid}`).innerText = ' Collapse';
        }else if (document.getElementById(`asub${itemid}`).classList.contains('fa-minus')){
          document.getElementById(`asub${itemid}`).classList.remove('fa-minus');
          document.getElementById(`asub${itemid}`).classList.add('fa-plus');
          document.getElementById(`asub${itemid}`).innerText = ' Expand';
        }

      },
      formatPrice(value) {
        const val = (value / 1).toFixed(2).replace(',', '.');
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
      new_sub_item(item_id){
        if(this.isub_code && this.isub_name){
          this.loading = true;
          axios.post(`${config.apiUrl}/api/nsi/${item_id}/`, {
            name: this.isub_name,
            code: this.isub_code
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((response) => {
            this.loading = false;
            this.$noty.success('New sub item added!');
            this.categories();
            console.log(response.data);
            this.isub_name = '';
            this.isub_code = '';
          }).catch(({res}) => {
            this.loading = false;
            console.log(res);
            this.isub_name = '';
            this.isub_code = '';
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
        }

      },
      new_sub_asset(asset_id){
        if(this.asub_code && this.asub_name){
          this.loading = true;
          axios.post(`${config.apiUrl}/api/nsa/${asset_id}/`, {
            name: this.asub_name,
            code: this.asub_code,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            }
          }).then((response) => {
            this.loading = false;
            console.log(response);
            this.assets_list();
            this.asub_code = '';
            this.asub_name = '';
            this.$noty.success('New sub asset added!');
          }).catch(({res}) => {
            this.loading = false;
            this.asub_code = '';
            this.asub_name = '';
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
        }
      },
      categories() {
        this.listLoading = true;
        axios.get(`${config.apiUrl}/api/categories/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((response) => {
          this.listLoading = false;
          this.object_list = response.data;
          this.$noty.success('Everything looks great!');
          console.log(response.data);
        }).catch(({ response }) => {
          this.listLoading = false;
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
      bp_list() {
        this.loading = true;
        axios.post(
          `${config.apiUrl}/api/ecs/`,
          {
            div: this.div,
            unit: this.unit,
            dep: this.dep,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          },
        ).then((response) => {
          this.loading = false;
          this.compensations = response.data;
          this.$noty.success('Everything looks great!');
          console.log(response.data);
        }).catch(({ response }) => {
          this.loading = false;
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
      assets_list() {
        this.listLoading = true;
        axios.get(`${config.apiUrl}/api/assets/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.listLoading = false;
          this.assets = res.data;
          this.$noty.success('Everything looks great!');
        }).catch((res) => {
          this.listLoading = false;
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
      newItem(catId) {
        this.loading = true;
        axios.post(`${config.apiUrl}/api/ni/${catId}/`, {
          item_name: this.item_name,
          type: this.item_type,
          code: this.code,
          procure: this.procure,
        }, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.loading = false;
          console.log(res);
          this.categories();
          this.item_name = '';
          this.code = '';
          this.item_type = '';
          this.procure = '';
        }).catch(({ res }) => {
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
      newCat() {
        if (this.name) {
          this.loading = true;

          axios.post(`${config.apiUrl}/api/nc/`, {
            name: this.name,
            code: this.code,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((res) => {
            this.loading = false;
            this.code = '';
            this.categories();
            console.log(res);
            this.name = '';
          }).catch(({ res }) => {
            this.loading = false;
            console.log(res);
          });
        }
      },
      newAsset() {
        if (this.asset_name) {
          this.loading = true;
          axios.post(`${config.apiUrl}/api/na/`, {
            name: this.asset_name,
            code: this.code,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((res) => {
            this.loading = false;
            this.asset_name = '';
            this.code = '';
            this.assets_list();
            console.log(res);
          }).catch((res) => {
            console.log(res);
          });
        }
      },
      delItem(itemId) {
        axios.post(`${config.apiUrl}/api/di/${itemId}/`, {}, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          // this.showModal = false;
          console.log(res);
          $(`#item${itemId}`).modal('hide');
          this.categories();
        }).catch((res) => {
          console.log(res);
        });
      },
      delCat(catId) {
        axios.post(`${config.apiUrl}/api/dc/${catId}/`, {}, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          console.log(res);
          $(`#category${catId}`).modal('hide');
          this.categories();
        }).catch((res) => {
          console.log(res);
        });
      },
      division_list() {
        this.loading = true;
        axios.get(`${config.apiUrl}/api/divisions`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.loading = false;
          this.divisions = res.data;
        });
      },
      department_list(div_id) {
        this.loading = true;
        axios.get(`${config.apiUrl}/api/dvdl/${div_id}/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.loading = false;
          const results = res.data;
          this.departs = results.departments;
        });
      },
      unit_list(dep_id) {
        this.loading = true;
        axios.get(`${config.apiUrl}/api/du/${dep_id}`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.loading = false;
          const results = res.data;
          this.units = results.units;
        });
      },
    },
    watch: {
      div(value) {
        if (value) {
          this.department_list(value);
        }
      },
      dep(value) {
        if (value) {
          this.unit_list(value);
        }
      },
    },
    mounted() {
      this.categories();
      this.assets_list();
      this.bp_list();
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
