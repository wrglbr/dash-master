<template>
  <d-container fluid>
    <d-row>
      <!-- Main Sidebar -->
      <span v-if="user === 'AD'">
        <main-sidebar  title="Administration" />
      </span>
      <span v-else>
        <main-sidebar title="GRA ERP" />
      </span>

      <d-col class="main-content offset-lg-2 offset-md-3 p-0" tag="main" lg="10" md="9" sm="12">

        <!-- Main Navbar -->
        <main-navbar />

        <!-- Content -->
        <Profile />

      </d-col>

    </d-row>
  </d-container>
</template>

<script>
import adminSidebarItems from '@/data/admin-sidebar-nav-items';
import othersSidbarItems from '@/data/budget-sidebar-nav-items';
// Main layout components
import MainNavbar from '@/components/layout/MainNavbar/MainNavbar.vue';
import MainSidebar from '@/components/layout/MainSidebar/MainSidebar.vue';
import Profile from '@/components/Budget/Profile.vue';


export default {
  name: 'Admin Dashboard',
  components: {
    MainNavbar,
    MainSidebar,
    Profile,

  },
  computed: {
    user() {
    //   console.log(this.$root.auth.user.user_role);
      return this.$root.auth.user.user_role;
    },
  },
  data() {
    return {
      sidebarItems: this.$root.auth.user.user_role === 'AD' ? adminSidebarItems() : othersSidbarItems(),
    };
  },
};
</script>

