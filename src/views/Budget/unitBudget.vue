<template>
  <d-container fluid>
    <d-row>
      <!-- Main Sidebar -->
      <main-sidebar :items="sidebarItems" title="Budget System" />

      <d-col class="main-content offset-lg-2 offset-md-3 p-0" tag="main" lg="10" md="9" sm="12">

        <!-- Main Navbar -->
        <main-navbar />

        <!-- Content -->
        <unitBudgetDetails/>

        <!-- Main Footer -->
        <main-footer />
      </d-col>

    </d-row>
  </d-container>
</template>

<script>
import getSidebarItems from '@/data/budget-sidebar-nav-items';

// Main layout components
import MainNavbar from '@/components/layout/MainNavbar/MainNavbar.vue';
import MainSidebar from '@/components/layout/MainSidebar/MainSidebar.vue';
import MainFooter from '@/components/layout/MainFooter/MainFooter.vue';
import unitBudgetDetails from '@/views/Budget/unitBudgetDetails.vue';

export default {
  name: 'unit_budget_details',
  components: {
    MainNavbar,
    MainSidebar,
    MainFooter,
    unitBudgetDetails,
  },
  data() {
    return {
      sidebarItems: getSidebarItems(),
    };
  },
};
</script>

