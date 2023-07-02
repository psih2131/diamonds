<template>
    <div class="contacts-sec__box">
        <p class="contacts-sec__bot-title">{{ locationTitle }}:</p>
        <a :href="locationdata.link_on_google_map" target="_blank" class="contacts-sec__box-value">{{ locationdata.title_location }}</a>
    </div>
</template>

<script>

export default {
  name: 'ContactsView',
  props: ['locationdata'],
  data() {
    return {
        locationTitle: '',
    }
  },

  methods: {
    translateContacts(){
        let langCurrent = this.$store.state.lang
     
        if(langCurrent == 'de'){
          this.locationTitle = 'Standort'
        }
        if(langCurrent == 'en'){
          this.locationTitle = 'Location'
        }
        if(langCurrent == 'fr'){
          this.locationTitle = 'Emplacement'
        }
        
      }
  },

  created() {

  },
  mounted() {
    this.translateContacts();
  },
  watch: {
    '$store.state.lang': function(newLang, oldLang) {
      this.translateContacts();
    }
  },

}
</script>