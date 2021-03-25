<template>
  <d-container fluid>
    <d-row>
      <!-- Main Sidebar -->
      <MainSidebar :items="sidebarItems" title="Budget System" />

      <d-col class="main-content offset-lg-2 offset-md-3 p-0" tag="main" lg="10" md="9" sm="12">

        <!-- Main Navbar -->
        <MainNavbar />

        <!-- Content -->
        <Implementations/>

        <!-- Main Footer -->

      </d-col>

    </d-row>
  </d-container>
</template>

<script>
    import getSidebarItems from "../../data/budget-sidebar-nav-items";
    import Implementations from "./Implementations";
    import MainSidebar from "../../components/layout/MainSidebar/MainSidebar";
    import MainNavbar from "../../components/layout/MainNavbar/MainNavbar";
    export default {
        name: "implements",
      components: {MainNavbar, MainSidebar, Implementations},
      data(){
          return {
            sidebarItems: getSidebarItems(),
          };
      }
    }
</script>

<style scoped>

</style>
