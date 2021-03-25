import { Bar } from 'vue-chartjs';
import config from '../../src/config';
import axios from 'axios';

export default {
  extends: Bar,
  data(){
    return {
      chartdata: {
        labels: ['Opened', 'Closed'],
        datasets: [
          {
            label: 'Budget Periods',
            data: [this.opened, this.closed],
            backgroundColor: '#4285F4',
            borderWidth: 0,
          },

        ],
      },
      options: {
        responsive: true,
        legend: {
          display: true,
        },
        tooltips: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            },

            ticks: {
              fontColor: 'rgba(0,0,0, 0.5)',
            },
          }],
          yAxes: [{
            stacked: true,
            gridLines: {
              borderDash: [2],
              drawBorder: false,
              zeroLineColor: 'rgba(0,0,0,0)',
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
            ticks: {
              fontColor: 'rgba(0,0,0, 0.5)',
            },
          }],
        },
      },
      periods: '',
      budgets: '',
      opened: null,
      closed: null,
      pending: '',
      confirmed: '',
      completed: '',
    };
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
        console.log(res);
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
    console.log(this.opened);
    this.renderChart({
        labels: ['Opened', 'Closed'],
        datasets: [
          {
            label: 'Budget Periods',
            data: [this.opened, this.closed],
            backgroundColor: '#4285F4',
            borderWidth: 0,
          },

        ],
      }, this.options);
  },
};
