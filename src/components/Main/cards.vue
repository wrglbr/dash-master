<template>
  <div>
    <div class="row">
    <!-- <div class="col-sm-4 py-2">
                <div class="card text-white" style="background:#002C59!important">
                    <div class="card-body">
                        <h4 class="card-title text-white">PROCUREMENT APP</h4>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <router-link to="#" class="btn btn-info">Go!</router-link>
                    </div>
                </div>
            </div> -->
            <div class="col-sm-4 py-2">
                <div class="card text-white" style="background:#002C59!important">
                    <div class="card-body">
                        <h4 class="card-title text-white">BUDGET APP</h4>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <span  v-if="user !== 'AD'"><router-link to="/budget-dashboard" class="btn btn-info">Go!</router-link></span>
                    </div>
                </div>
            </div>

             <div class="col-sm-4 py-2">
                <div  class="card text-white" style="background:#002C59!important">
                    <div class="card-body">
                         <h4 class="card-title text-white">ADMINISTRATOR</h4>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <span v-if="user === 'AD'"><router-link to="/admin-dashboard" class="btn btn-info">Go!</router-link></span>
                    </div>
                </div>
            </div>
        <!-- <div class="col-sm-4 py-2">
            <div class="card text-white" style="background:#002C59!important">
                <div class="card-body">
                    <h4 class="card-title text-white">VEHICLE APP</h4>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                   <router-link to="#" class="btn btn-info">Go!</router-link>
                </div>
            </div>
        </div> -->
    </div>
     <div class="row">
    <!-- <div class="col-sm-4 py-2">
                <div class="card text-white" style="background:#002C59!important">
                    <div class="card-body">
                        <h3 class="card-title text-white">INVENTORY APP</h3>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                     <router-link to="#" class="btn btn-info">Go!</router-link>
                    </div>
                </div>
            </div> -->
            <!-- <div class="col-sm-4 py-2">
                <div  class="card text-white" style="background:#002C59!important">
                    <div class="card-body">
                         <h4 class="card-title text-white">ADMINISTRATOR</h4>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <span v-if="user === 'AD'"><router-link to="admin-dashboard" class="btn btn-info">Go!</router-link></span>
                    </div>
                </div>
            </div> -->
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
    //   console.log(this.$root.auth.user.user_role);
      return this.$root.auth.user.user_role;
    },
  },
};
</script>
