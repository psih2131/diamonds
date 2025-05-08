<template>
    <section class="post-sec">
        <div class="container">
            <h1 class="page-title post-title">{{titlePost}}</h1>
            <div class="post-sec__redactor" v-html="contentPost"></div>
        </div>
    </section>
</template>



<script>
export default {
  data() {
    return {
     currentPost: '',
     titlePost:'',
     contentPost: '',
    }
  },
  components: {
    
  },

  methods: {
 //загрузка данных с сервера
    loadFetch() {
      console.log('start server data')
      fetch(`${this.$store.state.urlApi}wp-json/wp/v2/blog_posts`) // Замените URL на адрес вашего сайта WordPress и путь к API
          .then(response => response.json())
          .then(data => {

         
            this.loadPost(data)
           

          })
          .catch(error => {
              // Обработка ошибок
              console.error('Ошибка:', error);
          });
    },
    loadPost(dataPages){
        let postId = this.$route.params.postId;
        for(let i = 0; i<dataPages.length; i++){
            let idPost = dataPages[i].id
            if(idPost == postId){
                this.renderData(dataPages[i])
            }
        }
    },
    renderData(dataPage){

        let langCurrent = this.$store.state.lang
        let langObject = '';
        
        console.log(dataPage)

        langObject = langCurrent;
        
        for (let key in dataPage.acf[langObject]) {
          
          if(key == 'post_title'){
            this.titlePost = dataPage.acf[langObject][key]
          }

          if(key == 'content'){
            this.contentPost = dataPage.acf[langObject][key]
          }

        }
    }

  },


  mounted() {
    this.loadFetch()
  },
  watch: {
    $route(to, from) {
        this.loadFetch()
    },
    '$store.state.lang': function(newLang, oldLang) {
      this.loadFetch();
    }
  }


}
</script>