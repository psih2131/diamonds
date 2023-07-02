<template>
    <section class="faq-sec">
        <div class="container">
            <h1 class="page-title">{{ pageTitle }}</h1>
            <h2 class="faq-sec__subtitle" v-html="pageSubtitle">
             
            </h2>
            <div class="faq-sec__description" v-html="pageDescription">
               
            </div>
            <div class="faq-sec__wrapper">
                <template v-for="item in faqArray" :key="item">
                    <faqBox :datafaq="item" />
                </template>
                
            </div>
        </div>
    </section>
</template>


<script>
import faqBox from '@/components/faqBox.vue'


export default {
  name: 'ContactsView',
  data() {
    return {
        pageTitle: '',
        pageSubtitle:'',
        pageDescription:'',
        faqArray: [],
    }
  },
  components: {
    faqBox
  },

  methods: {
 //загрузка данных с сервера
    loadFetch() {
      fetch(`${this.$store.state.urlApi}wp-json/wp/v2/pages`) // Замените URL на адрес вашего сайта WordPress и путь к API
          .then(response => response.json())
          .then(data => {

            console.log(data)
            this.loadFaqData(data)
           

          })
          .catch(error => {
              // Обработка ошибок
              console.error('Ошибка:', error);
          });
    },
    loadFaqData(dataPages){
      for(let i = 0; i<dataPages.length; i++){
        let pageTemplate = dataPages[i].template
        if(pageTemplate == 'pages/faq-page.php')
        this.renderFaqPage(dataPages[i])
      }

    },
    renderFaqPage(dataPage){
      let langCurrent = this.$store.state.lang
      let langObject = '';
      
      console.log(dataPage)

      langObject = langCurrent;
      
      for (let key in dataPage.acf[langObject]) {
        
        if(key == 'main_title'){
          this.pageTitle = dataPage.acf[langObject][key]
        }

        if(key == 'page_title'){
          this.pageSubtitle = dataPage.acf[langObject][key]
        }
        
        if(key == 'page_subtitle'){
          this.pageDescription = dataPage.acf[langObject][key]
        }

        if(key == 'add_question'){
          this.faqArray = dataPage.acf[langObject][key]
        }
      }
      
    }
  },

  created() {

  },
  mounted() {
    this.loadFetch()
  },
  watch: {
    '$store.state.lang': function(newLang, oldLang) {
      this.loadFetch();
    }
  },

}
</script>