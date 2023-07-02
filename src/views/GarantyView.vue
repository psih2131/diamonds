<template>
    <section class="post-sec">
        <div class="container">
            <h1 class="page-title post-title">{{pageTitle}}</h1>
            <div class="post-sec__redactor" v-html="pageContent"></div>
        </div>
    </section>
</template>

<script>


export default {
  name: 'ContactsView',
  data() {
    return {
        pageTitle: '',
        pageContent: '',
    }
  },
  components: {

  },

  methods: {
 //загрузка данных с сервера
    loadFetch() {
      fetch(`${this.$store.state.urlApi}wp-json/wp/v2/pages`) // Замените URL на адрес вашего сайта WordPress и путь к API
          .then(response => response.json())
          .then(data => {

            console.log(data)
            this.loadServiceData(data)
           

          })
          .catch(error => {
              // Обработка ошибок
              console.error('Ошибка:', error);
          });
    },
    loadServiceData(dataPages){
      for(let i = 0; i<dataPages.length; i++){
        let pageTemplate = dataPages[i].template
        if(pageTemplate == 'pages/service-page.php')
        this.renderServicePage(dataPages[i])
      }

    },
    renderServicePage(dataPage){
      let langCurrent = this.$store.state.lang
      let langObject = '';
      
      console.log(dataPage)

      langObject = langCurrent;
      
      for (let key in dataPage.acf[langObject]) {
        
        if(key == 'page_title'){
          this.pageTitle = dataPage.acf[langObject][key]
        }

        if(key == 'page_description'){
          this.pageContent = this.text1 = dataPage.acf[langObject][key]
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