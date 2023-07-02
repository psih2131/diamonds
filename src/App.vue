<template>
  <headerComponents />

  <main class="main">
    <router-view/>
  </main>
  
  <footerComponents />
</template>




<script>
import headerComponents from '@/components/header.vue'
import footerComponents from '@/components/footer.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    headerComponents,
    footerComponents,
  },
  methods: {
    
  },
  mounted() {
 
  },

}
</script>
