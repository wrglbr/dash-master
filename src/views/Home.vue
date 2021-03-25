<template>
  <div>
    <navbar/>
    <jumbo/>
    <div class="container">
   <cards/>
    </div>


  </div>
</template>

<script>
import navbar from '@/components/Main/navbar.vue';
import jumbo from '@/components/Main/jumbo.vue';
import cards from '@/components/Main/cards.vue';


export default {
  components: {
    navbar,
    jumbo,
    cards,

  },
};
</script>

