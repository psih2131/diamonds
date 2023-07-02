<template>
  <section class="home-front-sec">
    <div class="container">
      <img :src="backgroundImage" alt="" class="home-front-sec__baner">
      <div class="home-front-sec__text1" v-html="text1"></div>
      <div class="home-front-sec__text2" v-html="text2"></div>
    </div>
  </section>
  <section class="home-posts-sec">
    <div class="container">
      <div class="home-posts-sec__left">
        <div class="home-posts-sec__title" v-html="sec2text">          
        </div>
      </div>

      <div class="home-posts-sec__wrapper">
        <template  v-for="item in offerArray" :key="item">
          <offer :dataitem="item" />
        </template>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import offer from '@/components/offer.vue'



export default {
  name: 'HomeView',
  data() {
    return {
      backgroundImage: '',
      text1:'',
      text2:'',
      offerArray: [],
      sec2text:'',
    }
  },
  components: {
    offer
  },

  methods: {

 //загрузка данных с сервера
    loadFetch() {
      fetch(`${this.$store.state.urlApi}wp-json/wp/v2/pages/`) // Замените URL на адрес вашего сайта WordPress и путь к API
          .then(response => response.json())
          .then(data => {
            this.loadHomeData(data)
          })
          .catch(error => {
              // Обработка ошибок
              console.error('Ошибка:', error);
          });
    },
    loadHomeData(dataPages){
      for(let i = 0; i<dataPages.length; i++){
        let pageTemplate = dataPages[i].template
        if(pageTemplate == 'pages/home-page.php')
        this.renderHomePage(dataPages[i])
      }

    },
    renderHomePage(dataPage){
      let langCurrent = this.$store.state.lang
      let langObject = '';
      
      console.log(dataPage)

      langObject = langCurrent;
      
      for (let key in dataPage.acf[langObject]) {
        
        if(key == 'main_image'){
          this.backgroundImage = dataPage.acf[langObject][key]
        }

        if(key == 'page_text_box_1'){
          this.text1 = dataPage.acf[langObject][key]
        }
        
        if(key == 'page_text_box_2'){
          this.text2 = dataPage.acf[langObject][key]
        }

        if(key == 'what_do_we_offer'){
          this.offerArray = dataPage.acf[langObject][key]
        }
      }
       
    },
    translateContacts(){
        let langCurrent = this.$store.state.lang
     
        if(langCurrent == 'de'){
          this.sec2text = 'Wir sind bereit,<br> unseren Kunden anzubieten:'
        }
        if(langCurrent == 'en'){
          this.sec2text = 'WE ARE READY <br> TO OFFER OUR CLIENTS: '
        }
        if(langCurrent == 'fr'){
          this.sec2text = 'NOUS SOMMES PRÊTS <br> À OFFRIR À NOS CLIENTS :'
        }
        
      }
  },

  created() {

  },
  mounted() {
    this.loadFetch()
    this.translateContacts()
  },

  watch: {
    '$store.state.lang': function(newLang, oldLang) {
      this.loadFetch();
      this.translateContacts();
    }
  },

}
</script>
