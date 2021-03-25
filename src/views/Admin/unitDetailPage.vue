<template>
  <d-container fluid>
    <d-row>
      <!-- Main Sidebar -->
      <main-sidebar :items="sidebarItems" title="Administration" />

      <d-col class="main-content offset-lg-2 offset-md-3 p-0" tag="main" lg="10" md="9" sm="12">

        <!-- Main Navbar -->
        <main-navbar />

        <!-- Content -->
        <UnitDetail />

      </d-col>

    </d-row>
  </d-container>
</template>

<script>
import getSidebarItems from '@/data/admin-sidebar-nav-items';

// Main layout components
import MainNavbar from '@/components/layout/MainNavbar/MainNavbar.vue';
import MainSidebar from '@/components/layout/MainSidebar/MainSidebar.vue';
import UnitDetail from '@/components/Admin/UnitsDetailComponent.vue';


export default {
  name: 'unit details page',
  components: {
    MainNavbar,
    MainSidebar,
    UnitDetail,

  },
  data() {
    return {
      sidebarItems: getSidebarItems(),
    };
  },
};
</script>

