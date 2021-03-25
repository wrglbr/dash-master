<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-6 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">{{object.unit_name}} Unit Budget Details</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-md-8">
                <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                  <li class="nav-item"><a href="#gs" id="gs-tab" data-toggle="tab" class="nav-link active" aria-selected="true">Goods & Services</a></li>
                  <li class="nav-item"><a href="#com" id="com-tab" data-toggle="tab" class="nav-link" aria-selected="false">Employees Compensations</a></li>
                  <li class="nav-item"><a href="#asset" id="asset-tab" data-toggle="tab" class="nav-link" aria-selected="false">Assets</a></li>
                  <li class="nav-item"><a href="#about" id="about-tab" data-toggle="tab" class="nav-link" aria-selected="true">Allowances</a></li>
                  <li class="nav-item"><a href="#sum" id="sum-tab" data-toggle="tab" class="nav-link" aria-selected="false">Summary</a></li>
                </ul>
              </div>
              <div class="col" align="right">
                <button @click="exporrt(object.id)" :disabled="!object" class="btn btn-primary btn-sm">EXTRACT</button>
              </div>
            </div>

          </div>
          <div class="card-body">
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="gs" role="tabpanel" aria-labelledby="gs-tab">
                <div class="row">
                  <div class="col-md-4">
                    <input type="text" name="search" class="form-control" placeholder="Search by item" v-model="search">
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-borderless">
                    <thead>
                    <tr>
                      <th>Category</th>
                      <th>Item</th>
                      <th>Item Type</th>
                      <th>Quantity</th>
                      <th>Subs</th>
                      <th>Item Price GHS</th>
                      <th>Total Amount GHS</th>
                      <th>To Be Procured</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr :key="gs.id" v-for="gs in gs_list">
                      <td>{{gs.item.category_name}}</td>
                      <td>{{gs.item.item_name}}</td>
                      <td>{{gs.item.item_type}}</td>
                      <td>{{gs.quantity}}</td>
                      <td>{{gs.item.subs.length}}</td>
                      <td>{{formatPrice(gs.unit_price)}}</td>
                      <td>{{formatPrice(gs.total_amount)}}</td>
                      <td>
                        <span v-if="gs.item.item_type === 'Service' && gs.item.is_procure === true">
                          <div class="row">
                            <div class="col-md-10">
                              <input type="date" :value="gs.expected_at" :id="`gs${gs.id}`" class="form-control">
                            </div>
                            <div class="col-md-2">
                              <button class="btn btn-sm btn-success" @click="expected_item(gs.id)"><i class="fa fa-save"></i></button>
                            </div>
                          </div>
                        </span>


                      </td>
                      <td v-if="gs.item.subs.length">
                        <button class="btn btn-sm btn-info" data-toggle="modal" :data-target="`#subs${gs.id}`">
                          <i class="fa fa-object-ungroup"></i>
                        </button>
                        <div class="modal fade" :id="`subs${gs.id}`" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                          <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">{{gs.item.item_name}} Sub Items</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <table class="table">
                                  <thead>
                                  <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Unit Price (GHS)</th>
                                    <th>Total (GHS)</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr :key="sub.id" v-for="sub in gs.subs">
                                    <td>{{sub.sub_item.name}}</td>
                                    <td>{{sub.quantity}}</td>
                                    <td>{{formatPrice(sub.unit_price)}}</td>
                                    <td>{{formatPrice(sub.total_amount)}}</td>
                                  </tr>
                                  </tbody>
                                </table>
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
              <div class="tab-pane fade" id="com" role="tabpanel" aria-labelledby="com-tab">
                <div class="row">
                  <div class="col-md-4">
                    <input type="text" name="search" class="form-control" placeholder="Search by Staff ID" v-model="search">
                  </div>
                </div>
                <div class="table-responsive">
                  <table v-if="com_list.length" class="table table-borderless">
                    <thead>
                    <tr>
                      <th>Staff ID</th>
                      <th>Full Name</th>
                      <th>Category</th>
                      <th>Grade</th>
                      <th>Notch</th>
                      <th>Monthly Basic (GHS)</th>
                      <th>Yearly Basic (GHS)</th>
                      <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr :key="staff.id" v-for="staff in com_list">
                      <td>{{staff.staff_number}}</td>
                      <td>{{staff.first_name}} {{staff.last_name}}</td>
                      <td>{{staff.employee_type_display}}</td>
                      <td>{{staff.rank}}</td>
                      <td>{{staff.notch}}</td>
                      <td>{{formatPrice(staff.monthly_basic)}}</td>
                      <td>{{formatPrice(staff.period_basic)}}</td>
                      <td>{{staff.status}}</td>
                    </tr>
                    </tbody>
                  </table>
                  <span v-else>No compensations recorded!</span>
                </div>
              </div>
              <div class="tab-pane fade" id="asset" role="tabpanel" aria-labelledby="asset-tab">
                <div class="row">
                  <div class="col-md-4">
                    <input type="text" name="search" class="form-control" placeholder="Search by asset name" v-model="search">
                  </div>
                </div>
                <div class="list-group-item">
                  <div class="row">
                    <div class="col-md-6">Asset Name</div>
                    <div class="col">Amount</div>
                    <div class="col">To be Procured</div>
                  </div>
                </div>
                <div class="list-group list-group-flush" :key="asset.id" v-for="asset in asset_list">
                  <div class="list-group-item"  v-if="asset.is_selected">
                    <div class="row">
                      <div class="col-md-6">{{asset.asset.asset_name}}</div>

                      <div class="col" align="right">
                        <div class="row">
                          <div class="col-md-6">GHS {{formatPrice(asset.amount)}}</div>
                          <div class="col" v-if="asset.subs.length">
                            <a :href="`#assCol${asset.id}`" :disabled="object.status === 'Completed'" aria-expanded="false" :aria-controls="`assCol${asset.id}`" data-toggle="collapse" role="button" class="mr-1 btn btn-sm btn-info"><i class="fa fa-sort"></i></a>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="row">
                          <div class="col-md-10"><input type="date" :id="`ea${asset.id}`" :value="asset.expected_at" class="form-control"></div>
                          <div class="col-md-2">
                            <button class="btn btn-sm btn-success" @click="expected_asset(asset.id)"><i class="fa fa-save"></i></button>
                          </div>
                        </div>
                      </div>
                      <!--<div class="col" v-else>-->
                        <!--{{asset.expected_at}}-->
                      <!--</div>-->
                    </div>
                  </div>
                  <div class="collapse multi-collapse" :id="`assCol${asset.id}`">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                        <tr>
                          <th>Asset</th>
                          <th>Quantity</th>
                          <th>Unit Price GHS</th>
                          <th>Total GHS</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="sub.id" v-for="sub in asset.subs">
                          <td>{{sub.sub_asset.name}}</td>
                          <td>{{sub.quantity}}</td>
                          <td>{{formatPrice(sub.unit_price)}}</td>
                          <td>{{formatPrice(sub.total_amount)}}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="about" role="tabpanel" aria-labelledby="about-tab">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                    <tr>
                      <th>Items</th>
                      <th>Amount GHS</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Motorbike Maintenance Allowance</td>
                      <td>{{formatPrice(object.motor_maintenance)}}</td>
                    </tr>
                    <tr>
                      <td>Bicycle Maintenance Allowance</td>
                      <td>{{formatPrice(object.bic_maintenance)}}</td>
                    </tr>
                    <tr>
                      <td>Car Maintenance Allowance</td>
                      <td>{{formatPrice(object.car_maintenance_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Training Allowance</td>
                      <td>{{formatPrice(object.training_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Duty Allowance</td>
                      <td>{{formatPrice(object.duty_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Professional Allowance</td>
                      <td>{{formatPrice(object.professional_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Acting Allowance</td>
                      <td>{{formatPrice(object.acting_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Entertainment Allowance</td>
                      <td>{{formatPrice(object.entertain_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Fuel Allowance</td>
                      <td>{{formatPrice(object.fuel_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Disability Guide Allowance</td>
                      <td>{{formatPrice(object.disability_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Housing Allowance</td>
                      <td>{{formatPrice(object.rent_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Risk Allowance</td>
                      <td>{{formatPrice(object.risk_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Overtime Allowance</td>
                      <td>{{formatPrice(object.overtime_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Tools Allowance</td>
                      <td>{{formatPrice(object.tools_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Housing Allowance</td>
                      <td>{{formatPrice(object.rent_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Travel & Transport Allowance</td>
                      <td>{{formatPrice(object.transport_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Domestic Servant Allowance</td>
                      <td>{{formatPrice(object.house_help_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Garden Boy Allowance</td>
                      <td>{{formatPrice(object.garden_boy_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Day Watchman Allowance</td>
                      <td>{{formatPrice(object.watchman_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Utility Allowance</td>
                      <td>{{formatPrice(object.utility_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Responsibility Allowance</td>
                      <td>{{formatPrice(object.responsibility_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Clothing Allowance</td>
                      <td>{{formatPrice(object.clothing_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Cashier Allowance</td>
                      <td>{{formatPrice(object.cashier_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Bonus</td>
                      <td>{{formatPrice(object.annual_bonus)}}</td>
                    </tr>
                    <tr>
                      <th>Total Allowance</th>
                      <th>{{formatPrice(object.allowances)}}</th>
                    </tr>
                    <tr>
                      <th>Social Contributions</th>
                      <td></td>
                    </tr>
                    <tr>
                      <td>13% SSF Contributions</td>
                      <td>{{formatPrice(object.social_security_fund)}}</td>
                    </tr>
                    <tr>
                      <td>Gratuity</td>
                      <td>{{formatPrice(object.gratuity)}}</td>
                    </tr>
                    <tr>
                      <td>Staff Welfare Benefit</td>
                      <td>{{formatPrice(object.pension_costs)}}</td>
                    </tr>
                    <tr>
                      <td>Long Service Awards</td>
                      <td>{{formatPrice(object.long_service_awards)}}</td>
                    </tr>
                    <tr>
                      <th>Sub Total</th>
                      <th>{{formatPrice(sct)}}</th>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="sum" role="tabpanel" aria-labelledby="sum-tab">
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th>Items</th>
                      <th>Amount Totals (GHS)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Consolidated Basic Salary</td>
                      <td>{{formatPrice(object.consolidated_basic_salary)}}</td>
                    </tr>
                    <tr>
                      <td>Allowances</td>
                      <td>{{formatPrice(object.allowances)}}</td>
                    </tr>
                    <tr>
                      <td>Conpensation Summary</td>
                      <td>{{formatPrice(object.employees_compensation_total)}}</td>
                    </tr>
                    <tr>
                      <td>Goods and Services</td>
                      <td>{{formatPrice(object.goods_services_total)}}</td>
                    </tr>
                    <tr>
                      <td>Assets</td>
                      <td>{{formatPrice(object.asset_total)}}</td>
                    </tr>
                    <tr>
                      <th>Budget Total</th>
                      <th>{{formatPrice(object.total_budget)}}</th>
                    </tr>
                    </tbody>
                  </table>
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
  import config from '../../config';

  export default {
    name: 'ImplementDetails',
    data() {
      return {
        object: {},
        search: '',
        errors: {},
        loading: false,
      };
    },
    computed: {
      sct(){
        const sum = Number(this.object.social_security_fund) + Number(this.object.gratuity) + Number(this.object.pension_costs) + Number(this.object.long_service_awards);
        return sum;
      },
      gs_list() {
        return this.object.items.filter(post => post.item.item_name.toLowerCase().includes(this.search.toLowerCase()));
      },
      com_list() {
        return this.object.employees_compensations.filter(post => post.staff_number.toLowerCase().includes(this.search.toLowerCase()));
      },
      asset_list() {
        return this.object.assets.filter(post => post.asset.asset_name.toLowerCase().includes(this.search.toLowerCase()));
      },
      userRole() {
        return this.$root.auth.user.user_role;
      },
    },
    methods: {
      formatPrice(value) {
        const val = (value / 1).toFixed(2).replace(',', '.');
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
      details() {
        const budget_id = this.$route.params.budget_id;
        axios.get(`${config.apiUrl}/budget/ubds/${budget_id}`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.object = res.data;
          this.$noty.success('Everything looks great!');
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
      exporrt(uid){
        this.$noty.info('Extracting...');
        axios.get(`${config.apiUrl}/budget/exub/${uid}/`, {
          responseType: 'blob',
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          }
        }).then((res) => {
          const url = URL.createObjectURL(new Blob([res.data], {type: 'application/vnd.ms-excel'}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${this.object.unit_name}.xls`);
          document.body.appendChild(link);
          link.click();
          this.$noty.success('Extracted Succesfully');
        }).catch(({response}) => {
          console.log(response);
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
        })
      },
      expected_asset(abid){
        const value = document.getElementById(`ea${abid}`).value;
        if(value){
          this.loading = true;
          axios.post(`${config.apiUrl}/budget/abe/${abid}/`, {
            expected: value
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((response) => {
            this.loading = false;
            this.$noty.success("Date Expected to be procured recorded!");
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
          })
        }
      },
      expected_item(ibid){
        const value = document.getElementById(`gs${ibid}`).value;
        if(value){
          this.loading = true;
          axios.post(`${config.apiUrl}/budget/ibe/${ibid}/`, {
            expected: value
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((response) => {
            this.loading = false;
            this.$noty.success("Date Expected to be procured recorded!");
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
          })
        }
      }
    },
    mounted() {
      this.details();
    },
  };
</script>

<style scoped>

</style>
