<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Salary Scale</h3>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="card mb-4 h-100">
          <div class="card-header">
            <button type="button" v-if="userRole === 'BH'" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
              New Salary Scale
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Add Salary Scale</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="text-danger small" v-if="msg">
                      {{msg.detail}}
                      <hr>
                    </div>
                    <div class="form-group">
                      <label for="id_rank">Grade</label>
                      <select id="id_rank" v-model="grade" class="custom-select">
                        <option value="">Choose...</option>
                        <option value="CG">CG</option>
                        <option value="COMM">COMM</option>
                        <option value="DC">DC</option>
                        <option value="AC">AC</option>
                        <option value="CRO">CRO</option>
                        <option value="PRO">PRO</option>
                        <option value="SRO">SRO</option>
                        <option value="RO">RO</option>
                        <option value="ARO I">ARO I</option>
                        <option value="ARO II">ARO II</option>
                        <option value="RA I">RA I</option>
                        <option value="RA II">RA II</option>
                        <option value="RA III">RA III</option>
                        <option value="JRA I">JRA I</option>
                        <option value="JRA II">JRA II</option>
                        <option value="JRA III">JRA III</option>
                        <option value="JRA IV">JRA IV</option>
                        <option value="JRA V">JRA V</option>
                        <option value="JRA VI">JRA VI</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for="id_notch">Notch</label>
                      <select id="id_notch" v-model="notch" class="custom-select">
                        <option value="">Choose...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="id_level">Scale Level</label>
                      <select id="id_level" v-model="level" class="custom-select">
                        <option value="">Choose...</option>
                        <option value="Mgt">Management Staff</option>
                        <option value="Snr">Senior Staff</option>
                        <option value="Jnr">Junior Staff</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="id_basic">Monthly Basic (GHS)</label>
                      <input type="number" id="id_basic" v-model="basic" class="form-control">
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" :disabled="loading" @click="new_scale()" class="btn btn-primary">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive" v-if="object_list.length">
              <table class="table">
                <thead>
                <tr>
                  <th>Grade</th>
                  <th>Level</th>
                  <th>Notch</th>
                  <th>Monthly Basic</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                  <tr :key="object.id" v-for="object in object_list">
                    <td>{{object.grade}}</td>
                    <td>{{object.level_display}}</td>
                    <td>{{object.notch}}</td>
                    <td>GHS {{formatPrice(object.monthly_basic)}}</td>
                    <td>
                      <button v-on:click="current_scale(object.id)" v-if="userRole === 'BH'" class="btn-sm btn btn-primary"><span class="fa fa-pencil"></span></button>
                      <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalTitle">Edit {{current.grade}} {{current.notch}}</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <!--{{current}}-->
                              <div class="form-group">
                                <label for="id_rank1">Grade</label>
                                <select id="id_rank1" v-model="current.grade" class="custom-select">
                                  <option value="">Choose...</option>
                                  <option value="CG">CG</option>
                                  <option value="COMM">COMM</option>
                                  <option value="DC">DC</option>
                                  <option value="AC">AC</option>
                                  <option value="CRO">CRO</option>
                                  <option value="PRO">PRO</option>
                                  <option value="SRO">SRO</option>
                                  <option value="RO">RO</option>
                                  <option value="ARO I">ARO I</option>
                                  <option value="ARO II">ARO II</option>
                                  <option value="RA I">RA I</option>
                                  <option value="RA II">RA II</option>
                                  <option value="RA III">RA III</option>
                                  <option value="JRA I">JRA I</option>
                                  <option value="JRA II">JRA II</option>
                                  <option value="JRA III">JRA III</option>
                                  <option value="JRA IV">JRA IV</option>
                                  <option value="JRA V">JRA V</option>
                                  <option value="JRA VI">JRA VI</option>
                                </select>
                              </div>
                              <div class="form-group">
                                <label for="id_notch1">Notch</label>
                                <select id="id_notch1" v-model="current.notch" class="custom-select">
                                  <option value="">Choose...</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                </select>
                              </div>
                              <div class="form-group">
                                <label for="id_level1">Scale Level</label>
                                <select id="id_level1" v-model="current.level" class="custom-select">
                                  <option value="">Choose...</option>
                                  <option value="Mgt">Management Staff</option>
                                  <option value="Snr">Senior Staff</option>
                                  <option value="Jnr">Junior Staff</option>
                                </select>
                              </div>
                              <div class="form-group">
                                <label for="id_basic1">Monthly Basic (GHS)</label>
                                <input type="number" id="id_basic1" v-model="current.monthly_basic" class="form-control">
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button :disabled="loading" @click="edit_scale(current.id)" type="button" class="btn btn-primary">Save</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span v-else>Nothing to show here</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import config from '@/config';


  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  export default {
    data(){
      return{
        object_list: {},
        loading: false,
        grade: '',
        current: {},
        notch: '',
        basic: '',
        level: '',
        grade1: '',
        notch1: '',
        basic1: '',
        level1: '',
        msg: {},
      };
    },
    computed: {
      userRole() {
        return this.$root.auth.user.user_role;
      },
    },
    mounted() {
      this.scales();
      // this.current_scale();
    },
    methods: {
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', '.');
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      scales(){
        this.loading = true;

        axios.get(`${config.apiUrl}/budget/sss/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((res) => {
          this.loading = false;
          this.object_list = res.data;
          this.$noty.success('Everything looks great');
        }).catch(({response}) => {
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
            this.$noty.error(`Oops! ${error.detail}`);
          }
        });
      },
      new_scale(){
        this.loading = true;
        axios.post(`${config.apiUrl}/budget/nss/`, {
          grade: this.grade,
          notch: this.notch,
          basic: this.basic,
          level: this.level,
        }, {
          headers: {Authorization: `JWT ${config.get_token()}`}
        }).then((res) => {
          this.loading = false;
          console.log(res);
          this.scales();
          this.grade = '';
          this.notch = '';
          this.basic = '';
          this.level = '';
          this.msg = null;
          this.$noty.success('New Salary Scale added');
          $('#exampleModalCenter').modal('hide');
        }).catch(({response}) => {
          this.loading = false;
          this.msg = response.data;
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            $('#exampleModalCenter').modal('hide');
            this.$router.push('/login');
          }else{
            this.$noty.error(`Oops! ${this.msg.detail}`);
          }
        })
      },
      current_scale(id){
        $('#editModal').modal('show');
        axios.get(`${config.apiUrl}/budget/ssd/${id}/`, {
          headers: { Authorization: `JWT ${config.get_token()}` }
        }).then((res) => {
          this.current = res.data;
          // console.log(res);
        }).catch((res) => {
          console.log(res);
        })
      },
      edit_scale(id){
        this.loading = true;
        axios.post(`${config.apiUrl}/budget/ess/${id}/`, {
          monthly: this.current.monthly_basic,
          grade: this.current.grade,
          level: this.current.level,
          notch: this.current.notch,
        }, {
          headers: { Authorization: `JWT ${config.get_token()}` }
        }).then((res) => {
          this.loading = false;
          $('#editModal').modal('hide');
          this.$noty.success('Salary scale updated!');
          this.scales();
        }).catch(({response}) => {
          console.log(response);
          this.loading = false;
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            $('#editModal').modal('hide');
            this.$router.push('/login');
          }else{
            this.$noty.error(`Oops! ${this.msg.detail}`);
          }
        })
      },
    },
    watch: {
      // current(){
      //   // this.basic1 = 1000;
      //   if(this.current){
      //     this.grade1 = current.grade;
      //     this.notch1 = current.notch;
      //     this.level1 = current.level;
      //     this.basic1 = current.monthly_basic;
      //   }

      // }
    }
  }
</script>
<style scoped>
.modal{
   overflow: visible !important;
}
.list-group-item, .list-group-item:hover{ z-index: auto; }
</style>
