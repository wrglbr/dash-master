<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Dashboard overview</h3>
      </d-col>
    </d-row>

    <d-row>
      <!-- Users Overview -->
      <d-col lg="12" md="6" sm="12" class="mb-4">
        <bo-users-overview />
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import UsersOverview from '@/components/Budget/Dashboardgraph.vue';

export default {
  components: {
    boUsersOverview: UsersOverview,
  },
  data() {
    return {
      dateRange: {
        from: null,
        to: null,
      },
    };
  },
};
</script>
