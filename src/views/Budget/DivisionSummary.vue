<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-12 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">{{division.name}} Budget Summary</h3>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-md-12 col-lg-12">
          <div class="card h-100">
            <div class="card-header">
              <div class="row">
                <div class="col"><button :disabled="!unit_budgets.length" @click="exporrt(object.id, division.id)" class="btn-sm btn btn-primary">EXTRACT</button></div>
                <!--<div class="col" align="right">-->
                <!--<div class="btn-group mr-2">-->
                <!--<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
                <!--Departments Summary-->
                <!--</button>-->
                <!--<div class="dropdown-menu" :key="depart.id" v-for="depart in departments">-->
                <!--<a class="dropdown-item" href="#">{{depart.name}}</a>-->
                <!--&lt;!&ndash;<a class="dropdown-item" href="#">Another action</a>&ndash;&gt;-->
                <!--&lt;!&ndash;<a class="dropdown-item" href="#">Something else here</a>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="dropdown-divider"></div>&ndash;&gt;-->
                <!--&lt;!&ndash;<a class="dropdown-item" href="#">Separated link</a>&ndash;&gt;-->
                <!--</div>-->
                <!--</div>-->
                <!--<div class="btn-group">-->
                <!--<button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
                <!--Divisions Summary-->
                <!--</button>-->
                <!--<div class="dropdown-menu" :key="div.id" v-for="div in divisions">-->
                <!--<a class="dropdown-item" href="#">{{div.name}}</a>-->
                <!--&lt;!&ndash;<a class="dropdown-item" href="#">Another action</a>&ndash;&gt;-->
                <!--&lt;!&ndash;<a class="dropdown-item" href="#">Something else here</a>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="dropdown-divider"></div>&ndash;&gt;-->
                <!--&lt;!&ndash;<a class="dropdown-item" href="#">Separated link</a>&ndash;&gt;-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
              </div>

              <!--<ul class="nav nav-tabs" id="myTab" role="tablist">-->
              <!--<li class="nav-item">-->
              <!--<a class="nav-link active" id="division-tab" data-toggle="tab" href="#division" role="tab" aria-controls="division" aria-selected="true">Division Budget Summary</a>-->
              <!--</li>-->
              <!--<li class="nav-item">-->
              <!--<a class="nav-link" id="department-tab" data-toggle="tab" href="#department" role="tab" aria-controls="department" aria-selected="false">Department budget Summary</a>-->
              <!--</li>-->
              <!--<li class="nav-item">-->
              <!--<a class="nav-link" id="unit-tab" data-toggle="tab" href="#unit" role="tab" aria-controls="unit" aria-selected="false">Unit Budget Summary</a>-->
              <!--</li>-->
              <!--</ul>-->
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-sm table-bordered">
                  <thead>
                  <tr align="center">
                    <th :colspan="ubc">{{object.start_date}} - {{object.end_date}} Budget Summary</th>
                  </tr>
                  <tr>
                    <th>Item</th>
                    <th :key="ub.id" v-for="ub in unit_budgets">{{ub.unit_name}}</th>
                    <th>Totals</th>
                    <!--<th>Unit C</th>-->
                    <!--<th>Unit D</th>-->
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th :colspan="ubc">Compensation of Employees</th>
                  </tr>
                  <tr>
                    <td>Established Posts</td>
                    <td :key="ub.id" v-for="ub in unit_budgets">GHS {{formatPrice(ub.established_posts)}}</td>
                    <td>GHS {{formatPrice(ep)}}</td>
                  </tr>
                  <tr>
                    <td>Non-Established Posts</td>
                    <td :key="ub.id" v-for="ub in unit_budgets">GHS {{formatPrice(ub.non_established_posts)}}</td>
                    <td>GHS {{formatPrice(nep)}}</td>
                  </tr>
                  <tr>
                    <td>Allowances</td>
                    <td :key="ub.id" v-for="ub in unit_budgets">GHS {{formatPrice(ub.allowances)}}</td>
                    <td>GHS {{formatPrice(allawa)}}</td>
                  </tr>
                  <tr>
                    <td>Social Security Fund</td>
                    <td :key="ub.id" v-for="ub in unit_budgets">GHS {{formatPrice(ub.social_security_fund)}}</td>
                    <td>GHS {{formatPrice(ssf)}}</td>
                  </tr>
                  <tr>
                    <td>Gratuity</td>
                    <td :key="ub.id" v-for="ub in unit_budgets">GHS {{formatPrice(ub.gratuity)}}</td>
                    <td>GHS {{formatPrice(gratuity)}}</td>
                  </tr>
                  <tr>
                    <td>Long Service Awards</td>
                    <td :key="ub.id" v-for="ub in unit_budgets">GHS {{formatPrice(ub.long_service_awards)}}</td>
                    <td>GHS {{formatPrice(lsa)}}</td>
                  </tr>
                  <tr>
                    <td>Staff Welfare Benefits (Pension Costs)</td>
                    <td :key="ub.id" v-for="ub in unit_budgets">GHS {{formatPrice(ub.pension_costs)}}</td>
                    <td>GHS {{formatPrice(pc)}}</td>
                  </tr>
                  <tr>
                    <th>Sub Total</th>
                    <th :key="ub.id" v-for="ub in unit_budgets">GHS {{formatPrice(ub.employees_compensation_total)}}</th>
                    <th>GHS {{formatPrice(ec)}}</th>
                  </tr>
                  <tr>
                    <th :colspan="ubc">Goods & Services</th>
                  </tr>
                  <tr :key="cat.id" v-for="cat in cats">
                    <td>{{cat.name}}</td>
                    <td :key="ub.id" v-for="ub in unit_budgets">
                        <span :key="ite.id" v-for="ite in ub.categories">
                          <span v-if="cat.name === ite.category.name">GHS {{formatPrice(ite.items_total)}}</span>
                        </span>
                    </td>
                    <td>
                      <!--<span :key="ub.id" v-for="ub in budgets">{{ub.categories}}</span>-->
                      <!--<span :key="ite.id" v-for="ite in ub.caterogies">-->
                      <!--<span>{{ite.unit_budget}}</span>-->
                      <!--</span>-->
                    </td>
                    <!--<td></td>-->
                  </tr>
                  <tr>
                    <th>Sub Total</th>
                    <th :key="ub.id" v-for="ub in unit_budgets">GHS {{formatPrice(ub.goods_services_total)}}</th>
                    <th>GHS {{formatPrice(gss)}}</th>
                  </tr>
                  <tr>
                    <th :colspan="ubc">Assets</th>
                  </tr>
                  <tr :key="cat.id" v-for="cat in asss">
                    <td>{{cat.asset_name}}</td>
                    <td :key="ub.id" v-for="ub in unit_budgets">
                        <span :key="ite.id" v-for="ite in ub.assets">
                          <span v-if="cat.asset_name === ite.asset.asset_name">GHS {{formatPrice(ite.amount)}}</span>
                        </span>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <th>Sub Total</th>
                    <th :key="ub.id" v-for="ub in unit_budgets">GHS {{formatPrice(ub.asset_total)}}</th>
                    <th>GHS {{formatPrice(as)}}</th>
                  </tr>
                  <tr>
                    <th>Budget Total</th>
                    <td :key="ub.id" v-for="ub in unit_budgets">GHS {{formatPrice(ub.total_budget)}}</td>
                    <th>GHS {{formatPrice(bt)}}</th>
                  </tr>
                  </tbody>
                </table>
              </div>
              <!--<div class="tab-content" id="myTabContent">-->
              <!--<div class="tab-pane fade show active" id="division" role="tabpanel" aria-labelledby="division-tab">-->
              <!--Division Budget Summary-->
              <!--</div>-->
              <!--<div class="tab-pane fade" id="department" role="tabpanel" aria-labelledby="department-tab">-->
              <!--Department budget Summary-->
              <!--</div>-->
              <!--<div class="tab-pane fade" id="unit" role="tabpanel" aria-labelledby="unit-tab">-->
              <!--Department budget Summary-->
              <!--</div>-->
              <!--</div>-->
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
  name: 'DivisionSummary',
  data() {
    return {
      object: {},
        unit_budgets: {},
        division: {},
        ec: '',
        allawa: '',
        ep: '',
        nep: '',
        lsa: '',
        gss: '',
        as: '',
        gst: 0,
        bt: '',
        gratuity: '',
        ssf: '',
        pc: '',
        ubc: '',
        cats: {},
        asss: {},
    };
  },
  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace(',', '.');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    details() {
      const period_id = this.$route.params.period_id;
      const div_id = this.$route.params.div_id;
      axios.get(`${config.apiUrl}/budget/dvbs/${period_id}/${div_id}/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        const results = res.data;
          this.object = results.object;
          this.division = results.division;
          this.unit_budgets = results.unit_budgets;
          this.ec = results.ec;
          this.allawa = results.allawa;
          this.ep = results.ep;
          this.nep = results.nep;
          this.lsa = results.lsa;
          this.gss = results.gss;
          this.as = results.as;
          this.bt = results.bt;
          this.pc = results.pc;
          this.ssf = results.ssf;
          this.gratuity = results.gratuity;
          this.ubc = results.ubc + 2;
          this.cats = results.cats;
          this.asss = results.asss;
          this.$noty.success('Everything looks great!');
      }).catch(({response}) => {
        console.log(response);
        const errors = {};
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
    exporrt(pid, did){
      this.$noty.info('Exporting...');
      axios.get(`${config.apiUrl}/budget/exdvbs/${pid}/${did}`, {
        responseType: 'blob',
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        }
      }).then((res) => {
        const url = URL.createObjectURL(new Blob([res.data], {type: 'application/vnd.ms-excel'}));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${this.division.name}.xls`);
        document.body.appendChild(link);
        link.click();
        this.$noty('Export Successful');
      }).catch((response) => {
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
      })
    }
  },
  mounted() {
    this.details();
  },
};
</script>

<style scoped>

</style>
