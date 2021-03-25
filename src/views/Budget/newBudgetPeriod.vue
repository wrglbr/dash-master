<template>
  <div>
    <d-container fluid class="main-content-container px-4">

      <!-- Page Header -->
      <d-row no-gutters class="page-header py-2 pb-4 mb-3 border-bottom">
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <span class="text-uppercase page-subtitle">Overview</span>
          <h3 class="page-title">Components</h3>
        </d-col>
      </d-row>

      <d-row >
     <d-col lg="8">

          <d-card class="card-small">

            <!-- Form Example -->
            <d-card-header class="border-bottom">
              <h6 class="m-0">New Budget Period</h6>
            </d-card-header>

            <d-list-group flush>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col>
                    <!-- <d-form> -->
                      <div class="form-group">
                        <label for="feInputState">Period</label>
                        <d-select id="feInputState" v-model="period">
                            <option>Choose...</option>
                            <option value="Monthly" :selected="period === 'Monthly'">Monthly</option>
                            <option value="Quarterly" :selected="period === 'Quarterly'">Quarterly</option>
                            <option value="Half Year" :selected="period === 'Half Year'">Half Year</option>
                            <option value="Yearly" :selected="period === 'Yearly'">Yearly</option>
                          </d-select>
                      </div>
                      <div class="form-group">
                        <label for="feInputAddress2">Quarter</label>
                         <d-select id="feInputAddress2" v-model="quarter" :disabled="period != 'Quarterly'">
                            <option>Choose...</option>
                            <option value="First Quarter">First Quarter</option>
                            <option value="Second Quarter">Second Quarter</option>
                            <option value="Third Quarter">Third Quarter</option>
                           <option value="Fourth Quarter">Fourth Quarter</option>
                          </d-select>
                      </div>
                      <div class="form-group">
                        <label for="feInputAddress3">Half</label>
                        <d-select id="feInputAddress3" v-model="half" :disabled="period != 'Half Year'">
                            <option>Choose...</option>
                            <option value="First Half">First Half</option>
                            <option value="Second Half">Second Half</option>
                          </d-select>
                      </div>
                      <div class="form-group">
                        <label for="feInputAddress4">Start Date</label>
                        <d-input type="date" v-model="start_date" data-date-format="mm/dd/yyyy"/>
                      </div>
                      <button type="submit" @click="new_period()" :disabled="loading" class="btn btn-primary btn-small btn-block" >Submit</button>
                    <!-- </d-form> -->
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
      period: '',
      quarter: '',
      half: '',
      start_date: '',
      loading: false,
    };
  },
  methods: {
    new_period() {
      this.loading = true;
      axios.post(
        `${config.apiUrl}/budget/nbp/`, {
          period: this.period,
          quarter: this.quarter,
          half: this.half,
          start_date: this.start_date,
        },
        {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        },
      ).then((response) => {
        this.loading = false;
        console.log(response);
        this.$router.push('/budget-periods');
      }).catch((response) => {
        this.laoding = false;
        console.log(response);
      });
    },
  },
};
</script>
