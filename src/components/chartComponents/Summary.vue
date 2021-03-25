<template>
  <div class="card card-small">

    <!-- Card Header -->
    <div class="card-header border-bottom">
      <h6 class="m-0">{{title}}</h6>
    </div>

    <!-- Chart -->
    <div class="card-body d-flex ">
      <canvas height="220" ref="canvas" class="blog-users-by-device m-auto"></canvas>
    </div>

    <d-card-footer class="border-top">
      <d-row>

      </d-row>
    </d-card-footer>
  </div>
</template>

<script>
  import Chart from '../../utils/chart';
  import axios from 'axios';
  import config from '@/config';

  // const defaultChartData = {
  //   datasets: [{
  //     hoverBorderColor: '#ffffff',
  //     data: [this.pending, this.confirmed, this.completed],
  //     backgroundColor: [
  //       'rgb(0, 44, 89)',
  //       'rgb(255, 180, 0)',
  //       'rgb(196, 24, 60)',
  //     ],
  //   }],
  //   labels: ['Pending', 'Confirmed', 'Completed'],
  // };

  export default {
    name: 'Support Requests',
    data(){
      return{
        defaultChartData: {
          datasets: [{
            hoverBorderColor: '#ffffff',
            data: [this.pending, this.confirmed, this.completed],
            backgroundColor: [
              'rgb(0, 44, 89)',
              'rgb(255, 180, 0)',
              'rgb(196, 24, 60)',
            ],
          }],
          labels: ['Pending', 'Confirmed', 'Completed'],
        },
        periods: 0,
        budgets: 0,
        opened: 0,
        closed: 0,
        pending: 0,
        confirmed: 0,
        completed: 0,
      };
    },
    props: {
      /**
       * The chart config.
       */
      chartConfig: {
        type: Object,
        default() {
          return {};
        },
      },
      /**
       * The chart options.
       */
      chartOptions: {
        type: Object,
        default() {
          return {};
        },
      },
      /**
       * The chart data.
       */
      chartData: {
        type: Object,
        default() {
          return this.defaultChartData;
        },
      },
      /**
       * The chart title.
       */
      title: {
        type: String,
        default: 'Unit Budgets',
      },
    },
    methods: {
      dashboard() {
        this.loading = true;

        axios.get(`${config.apiUrl}/budget/d/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.loading = false;
          const results = res.data;
          this.periods = results.periods;
          this.budgets = results.budgets;
          this.opened = results.opened;
          this.closed = results.closed;
          this.pending = results.pending;
          this.confirmed = results.confirmed;
          this.completed = results.completed;
          // this.activities = results.activities;
        }).catch(({ response }) => {
          console.log(response);
          if (response.status === 401) {
            this.$noty.error('Oops! Your session has expired.');
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }
        });
      },
    },
    mounted() {
      this.dashboard();
      const chartConfig = {
        type: 'pie',
        data: this.chartData,
        options: {
          ...{
            legend: {
              position: 'bottom',
              labels: {
                padding: 25,
                boxWidth: 20,
              },
            },
            cutoutPercentage: 0,
            tooltips: {
              custom: false,
              mode: 'index',
              position: 'nearest',
            },
          },
          ...this.chartOptions,
        },
      };

      new Chart(this.$refs.canvas, chartConfig);
    },
  };
</script>

