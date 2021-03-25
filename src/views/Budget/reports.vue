<template>
  <d-container fluid>
    <d-row>
      <!-- Main Sidebar -->
      <main-sidebar :items="userRole === 'AD' ? asidebarItems : bsidebarItems" :title="userRole === 'AD' ? 'Administration' : 'Budget System'" />

      <d-col class="main-content offset-lg-2 offset-md-3 p-0" tag="main" lg="10" md="9" sm="12">

        <!-- Main Navbar -->
        <main-navbar />

        <!-- Content -->
        <Report/>

        <!-- Main Footer -->

      </d-col>

    </d-row>
  </d-container>
</template>

<script>
  import budgetSidebarItems from '@/data/budget-sidebar-nav-items';
  import adminSidebarItems from '@/data/admin-sidebar-nav-items';

  // Main layout components
  import MainNavbar from '@/components/layout/MainNavbar/MainNavbar.vue';
  import MainSidebar from '@/components/layout/MainSidebar/MainSidebar.vue';
  import MainFooter from '@/components/layout/MainFooter/MainFooter.vue';
  import Report from '@/views/Budget/Report.vue';

  export default {
    name: "reports",
    components: {
      MainNavbar,
      MainSidebar,
      MainFooter,
      Report,
    },
    computed: {
      userRole() {
        return this.$root.auth.user.user_role;
      },
    },
    data() {
      return {
        asidebarItems: adminSidebarItems(),
        bsidebarItems : budgetSidebarItems(),
        title : this.userRole === 'AD' ? 'Administration' : 'Budget System'
      };
    },
  }
</script>

<style scoped>

</style>
