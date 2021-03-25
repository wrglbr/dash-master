<template>
  <d-container fluid>
    <d-row>
      <!-- Main Sidebar -->
      <main-sidebar :items="sidebarItems" title="Budget" />

      <d-col class="main-content offset-lg-2 offset-md-3 p-0" tag="main" lg="10" md="9" sm="12">

        <!-- Main Navbar -->
        <main-navbar />

        <!-- Content -->
        <BudgetDivisions/>


      </d-col>

    </d-row>
  </d-container>
</template>

<script>
import getSidebarItems from '@/data/budget-sidebar-nav-items';

// Main layout components
import MainNavbar from '@/components/layout/MainNavbar/MainNavbar.vue';
import MainSidebar from '@/components/layout/MainSidebar/MainSidebar.vue';
import BudgetDivisions from '@/views/Budget/BudgetDivisions.vue';


export default {
  name: 'budget_divisions',
  components: {
    MainNavbar,
    MainSidebar,
    BudgetDivisions,


  },
  data() {
    return {
      sidebarItems: getSidebarItems(),
    };
  },
};
</script>

