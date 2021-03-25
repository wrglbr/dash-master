<template>
  <div>
    <d-container fluid class="main-content-container px-4">

      <!-- Page Header -->
      <d-row no-gutters class="page-header py-2 pb-4 mb-3 border-bottom">
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <span class="text-uppercase page-subtitle">Overview</span>
          <h3 class="page-title">New User</h3>
        </d-col>
      </d-row>

      <d-row >
        <d-col lg="8">

          <d-card class="card-small">

            <!-- Form Example -->
            <d-card-header class="border-bottom">
              <h6 class="m-0">Add User</h6>
            </d-card-header>

            <d-list-group flush>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col>
                    <!-- <d-form> -->
                      <d-form-row>
                        <d-col md="12" class="form-group">
                          <label for="id_staff_id">Staff ID</label>
                          <input v-model="staff_id" id="id_staff_id" class="form-control" type="text" placeholder="Staff ID" />
                        </d-col>
                      </d-form-row>

                      <d-form-row>
                        <d-col md="6" class="form-group">
                          <label for="id_first_name">First Name</label>
                          <input v-model="first_name" id="id_first_name" class="form-control" type="text" placeholder="First Name" />
                        </d-col>
                        <d-col md="6">
                          <label for="id_last_name">Last Name</label>
                          <input v-model="last_name" id="id_last_name" class="form-control" type="text" placeholder="Last Name" />

                        </d-col>
                      </d-form-row>

                      <d-form-row>
                        <d-col md="6" class="form-group">
                          <label for="feEmailAddress">Email Address</label>
                          <input v-model="email" id="feEmailAddress" class="form-control" type="email" placeholder="Email" />
                          <span class="small text-danger" v-if="errors">{{errors.detail}}</span>
                        </d-col>
                        <d-col md="6">
                          <label for="id_role">User Role</label>
                          <select name="role" v-model="role" id="id_role" class="custom-select">
                            <option value="">Choose...</option>
                            <option value="AD">Administrator</option>
                            <option value="BH">Budget Admin</option>
                            <option value="BO">Budget Officer</option>
                            <option value="UU">Unit User</option>
                            <option value="DU">Department User</option>
                            <option value="PO">Procurement Officer</option>
                            <option value="PH">Procurement Head</option>
                            <!--<option value="CG">Commissioner General</option>-->
                            <!--<option value="S">Procurement Secretariat</option>-->
                          </select>
                        </d-col>
                      </d-form-row>

                      <div class="form-group">
                        <label for="id_division">Division</label>
                        <select class="custom-select" v-model="division" id="id_division">
                          <option value="">Choose...</option>
                          <option :key="div.id" v-for="div in divisions" :value="`${div.id}`">{{div.name}}</option>
                        </select>
                      </div>

                      <d-form-row>
                        <d-col md="6" class="form-group">
                          <label for="id_depart">Department</label>
                          <select name="depart" v-model="depart" id="id_depart" class="custom-select">
                            <option value="">Choose...</option>
                            <option :key="dep.id" v-for="dep in departs.departments" :value="`${dep.id}`">{{dep.name}}</option>
                          </select>
                        </d-col>
                        <d-col md="6">
                          <label for="id_unit">Unit</label>
                          <select name="unit" v-model="unit" id="id_unit" class="custom-select">
                            <option value="">Choose...</option>
                            <option :key="un.id" v-for="un in units.units" :value="`${un.id}`">{{un.unit_name}}</option>
                          </select>
                        </d-col>
                      </d-form-row>

                      <div class="form-group">
                        <label for="id_password1">Password</label>
                        <input v-model="pass1" class="form-control" id="id_password1" type="password" placeholder="" />
                      </div>

                      <div class="form-group">
                        <label for="password2">Confirm Password</label>
                        <input v-model="pass2" class="form-control" id="password2" type="password" placeholder="" />
                        <span class="small text-danger" v-if="msg">{{msg}}</span>
                      </div>

                      <button @click="newUser()" :disabled="formloading" class="btn btn-sm btn-primary" type="submit"><span v-if="formloading">Loading..</span> <span v-else>Submit</span> </button>

                  </d-col>
                </d-row>
              </d-list-group-item>
            </d-list-group>

          </d-card>
        </d-col>

      </d-row>
    </d-container>
  </div>
</template>
<script>

import axios from 'axios';
import config from '@/config';

export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      role: '',
      depart: '',
      division: '',
      unit: '',
      pass1: '',
      pass2: '',
      staff_id: '',
      msg: '',
      departs: {},
      divisions: {},
      units: {},
      errors: {},
      formloading: false,
    };
  },
  methods: {
    validPassword() {
      if (this.pass1 !== this.pass2) {
        this.msg = 'Passwords do not match';
        return false;
      }
      this.msg = '';
      return true;
    },
    newUser() {
      if (this.validPassword() && this.first_name && this.last_name && this.email && this.staff_id && this.role) {
        this.formloading = true;
        axios.post(
          `${config.apiUrl}/user/new/`, {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            user_type: this.role,
            staff_id: this.staff_id,
            depart_id: this.depart,
            unit_id: this.unit,
            password: this.pass2,
            div_id: this.division,
          },
          {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          },
        ).then((response) => {
          this.formloading = false;
          console.log(response);
          this.$noty.success('New user has been created successfully');
          this.$router.push('/users');
        }).catch(({ response }) => {
          this.formloading = false;
          console.log(response);
          this.errors = response.data;
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
      }
    },
    division_list() {
      axios.get(`${config.apiUrl}/api/divisions/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((response) => {
        this.divisions = response.data;
      }).catch((response) => {
        console.log(response);
      });
    },
    departments(value) {
      axios.get(`${config.apiUrl}/api/dvdl/${value}/`, {
        headers: {
          Authorization: `JWT ${config.get_token()}`,
        },
      }).then((res) => {
        this.departs = res.data;
      }).catch((res) => {
        console.log(res);
      });
    },
    unit_list(value) {
      // console.log(sel.value);
      if (value) {
        axios.get(`${config.apiUrl}/api/dul/${value}`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((response) => {
          this.units = response.data;
          console.log(response.data);
        }).catch((response) => {
          console.log(response);
        });
      }
    },
  },
  watch: {
    pass2(value) {
      this.pass2 = value;
      this.validPassword();
    },
    division(value) {
      this.division = value;
      if (this.division) { this.departments(this.division); }
    },
    depart(value) {
      this.depart = value;
      if (this.depart) { this.unit_list(this.depart); }
    },
  },
  mounted() {
    this.division_list();
    // this.unit_list();
  },
};
</script>
