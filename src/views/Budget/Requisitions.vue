<template>
  <div class="main-content-container container-fluid px-4 bg-white">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Requisitions</h3>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="card">
          <div class="card-header">
            <button :hidden="userRole !== 'UU'" data-target="#newReq" data-toggle="modal" class="btn btn-sm btn-primary">New Request</button>
            <div class="modal fade" id="newReq" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">New Requisition</h5>
                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Goods</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Assets</a>
                      </li>
                    </ul>
                    <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
                    <!--<span aria-hidden="true">&times;</span>-->
                    <!--</button>-->
                  </div>
                  <div class="modal-body tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                      <span v-if="errors" class="text-danger small mb-2">{{errors.detail}}</span>
                      <div class="form-group">
                        <label for="id_item">Select Item</label>
                        <select id="id_item" v-model="item" class="custom-select">
                          <option value="">Choose...</option>
                          <option :key="item.id" v-for="item in items" :value="item.id">{{item.item.item_name}} <span v-if="!item.subs.length">- ({{item.left}})</span></option>
                        </select>
                      </div>
                      <div class="form-group" v-if="sub_items && sub_items.length">
                        <label for="id_item_sub">Sub Item</label>
                        <select id="id_item_sub" v-model="sub_item" class="custom-select">
                          <option value="">Choose...</option>
                          <option :key="sub.id" v-for="sub in sub_items" :value="sub.id">{{sub.sub_item.name}} - ({{sub.left}})</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="id_quantity">Quantity</label>
                        <input type="number" id="id_quantity" v-model="quantity" class="form-control">
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button @click="new_request('Item')" :disabled="loading" type="button" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                      <span v-if="errors" class="text-danger small mb-2">{{errors.detail}}</span>
                      <div class="form-group">
                        <label for="id_asset">Select Asset</label>
                        <select id="id_asset" class="custom-select" v-model="asset">
                          <option value="">Choose...</option>
                          <option :key="asset.id" v-for="asset in assets" :value="asset.id">{{asset.asset.asset_name}}</option>
                        </select>
                      </div>
                      <div class="form-group" v-if="sub_assets && sub_assets.length">
                        <label for="id_sub_asset">Sub Assets</label>
                        <select id="id_sub_asset" v-model="sub_asset" class="custom-select">
                          <option value="">Choose...</option>
                          <option :key="sub.id" v-for="sub in sub_assets" :value="sub.id">{{sub.sub_asset.name}} - ({{sub.left}})</option>
                        </select>
                      </div>
                      <div class="form-group" v-if="sub_assets && sub_assets.length">
                        <label for="id_quantity1">Quantity</label>
                        <input type="number" id="id_quantity1" v-model="quantity" class="form-control">
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button @click="new_request('Asset')" :disabled="loading" type="button" class="btn btn-primary">Submit</button>
                      </div>
                    </div>

                  </div>
                  <!--<div class="modal-footer">-->
                    <!--<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>-->
                    <!--<button @click="new_request()" :disabled="loading" type="button" class="btn btn-primary">Submit</button>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive" v-if="object_list.length">
              <table class="table table-borderless">
                <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Unit</th>
                  <th>Item / Asset</th>
                  <th>Sub Item / Asset</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr :key="object.id" v-for="object in object_list">
                  <td>#{{object.request_id}}</td>
                  <td>{{object.unit.unit_name}}</td>
                  <td>
                    <span v-if="object.item">{{object.item.item.item_name}}</span>
                    <span v-else>{{object.asset.asset.asset_name}}</span>
                  </td>
                  <td>
                    <span v-if="object.sub_item">{{object.sub_item.sub_item.name}}</span>
                    <span v-else>{{object.sub_asset.asset_name}}</span>
                  </td>
                  <td>{{object.quantity}}</td>
                  <td>{{object.status}}</td>
                  <td>
                    <button :hidden="userRole === 'UU' || object.status !== 'Requested'" :disabled="loading" class="btn btn-sm btn-primary" @click="approve(object.id)">Approve</button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="card-text" v-else>No requisitions yet!</div>
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
    name: 'Requisitions',
    computed: {
      userRole() {
        return this.$root.auth.user.user_role;
      },
    },
    data() {
      return {
        object_list: {},
        item: '',
        sub_item: '',
        asset: '',
        sub_asset: '',
        quantity: 0,
        items: {},
        assets: {},
        sub_items: {},
        sub_assets: {},
        loading: false,
        errors: {},
      };
    },
    methods: {
      requests() {
        this.loading = true;
        axios.get(`${config.apiUrl}/budget/reqs/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.loading = false;
          this.$noty.success('Everything looks great');
          this.object_list = res.data;
          console.log(this.object_list);
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
      item_list() {
        axios.get(`${config.apiUrl}/budget/ibs/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.items = res.data;
        });
      },
      sub_item_list(item){
        if(item){
          axios.get(`${config.apiUrl}/budget/sibs/${item}/`, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((res) => {
            const results = res.data;
            this.sub_items = results.subs;
            console.log(results.subs);
          });
        }
      },
      asset_list(){
        axios.get(`${config.apiUrl}/budget/abs/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.assets = res.data;
        });
      },
      sub_asset_list(asset){
        if(asset){
          axios.get(`${config.apiUrl}/budget/sabs/${asset}/`, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((res) => {
            const results = res.data;
            this.sub_assets = results.subs;
            console.log(results.subs);
          });
        }
      },
      new_request(type) {
        if(type === 'Item' && this.item)
        {
          this.loading = true;
          axios.post(`${config.apiUrl}/budget/nr/${type}/`, {
            item: this.item,
            sub_item: this.sub_item,
            qty: this.quantity,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((res) => {
            this.loading = false;
            console.log(res);
            this.requests();
            this.item_list();
            this.item = '';
            this.quantity = 0;
            this.sub_item = '';
            this.$noty.success('New request has been made successfully');
            // eslint-disable-next-line no-undef
            $('#newReq').modal('hide');
          }).catch(({response}) => {
            // console.log(res);
            this.loading = false;
            this.errors = response.data;
            if(response.status === 401){
              this.$noty.error(`Oops! Your session has expired.`);
              localStorage.removeItem('auth');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              $('#newReq').modal('hide');
              this.$router.push('/login');
            }else{
              this.$noty.error(`Oops! ${this.errors.detail}`);
            }
          });
        }
        else if(type === 'Asset' && this.asset)
        {
          this.loading = true;
          axios.post(`${config.apiUrl}/budget/nr/${type}/`, {
            asset: this.asset,
            sub_asset: this.sub_asset,
            qty: this.quantity,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`
            }
          }).then((res) => {
            this.loading = false;
            console.log(res);
            this.requests();
            this.asset_list();
            this.asset = '';
            this.quantity = 0;
            this.sub_asset = '';
            this.$noty.success('New request has been made successfully');
            // eslint-disable-next-line no-undef
            $('#newReq').modal('hide');
          }).catch(({response}) => {
            // console.log(res);
            this.loading = false;
            this.errors = response.data;
            if(response.status === 401){
              this.$noty.error(`Oops! Your session has expired.`);
              localStorage.removeItem('auth');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              $('#newReq').modal('hide');
              this.$router.push('/login');
            }else{
              this.$noty.error(`Oops! ${this.errors.detail}`);
            }
          });
        }
      },
      approve(id) {
        this.loading = true;
        this.$noty.info('Loading...');
        axios.post(`${config.apiUrl}/budget/ar/${id}/`, {
          // item: this.item
        }, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.loading = false;
          this.$noty.success('Request Approved');
          console.log(res);
          this.requests();
          // $('#newReq').modal('hide');
        }).catch(({response}) => {
          console.log(response);
          const errors = response.data;
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }else{
            this.$noty.error(`Oops! ${errors.detail}`);
          }
        });
      },
    },
    mounted() {
      this.requests();
      this.item_list();
      this.asset_list();
    },watch: {
      item(value){
        if(value){
          this.sub_item_list(value);
        }
      },
      asset(value){
        if(value){
          this.sub_asset_list(value);
        }
      }
    }
  };
</script>

<style scoped>

</style>
