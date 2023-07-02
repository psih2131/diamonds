<template>
      <header class="header" :class="{header__mobopen: arctiveHeaderMob}">
        <div class="container">
            <div class="header__left">
                <ul class="header__flag-row">
                    <li class="header__flag-row-element">
                        <a @click="langChange('en')" data-lang="en">
                            <img src="../assets/image/flag1.svg" alt="">
                        </a>
                    </li>
                    <li class="header__flag-row-element">
                        <a @click="langChange('fr')" data-lang="fr">
                            <img src="../assets/image/flag2.svg" alt="">
                        </a>
                    </li>
                    <li @click="langChange('de')" class="header__flag-row-element">
                        <a data-lang="de">
                            <img src="../assets/image/flag3.svg" alt="">
                        </a>
                    </li>
                </ul>
                
                <nav class="header__nav">
                    <ul class="header__nav-list">
                        <li>
                            <router-link to="/">
                                {{ pageAbout }}
                            </router-link> 
                        </li>
                        <li>
                            <router-link to="/contacts">
                                {{ pageContacts }}
                            </router-link> 
                        </li>
                        <li>
                            <router-link to="/faq">
                                {{ pageFaq }}
                            </router-link> 
                        </li>
                    </ul>
                </nav>
            </div>
            
            <router-link to="/"  class="header__logo" @click="arctiveHeaderMob = false">
                <img src="../assets/image/header-logo.png" alt="" class="header__logo-image">
            </router-link> 

            <div class="header__right">
                <nav class="header__nav">
                    <ul class="header__nav-list">
                        <li>
                            <router-link to="/warranty">
                                {{ pageGaranty }}
                            </router-link> 
                        </li>
                        <li>
                            <router-link to="/search">
                                {{ pageSearch }}
                            </router-link>
                        </li>
                        <li class="parent-nav">
                            <a>{{ pagePost }}</a>
                            <ul class="sub-nav" :click="reloadPage">
                                <li v-for="post in allPosts" :key="post.id" >
                                    <router-link :to="'/post/' + post.id" >
                                        {{ getPostTitle(post) }}
                                    </router-link>
                                  </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div class="header__burger" @click="openCloseNav">
                    <span class="burger-line xs1"></span>
                    <span class="burger-line xs2"></span>
                </div>
            </div>

            <div class="header__mobile-nav" >
                <nav class="header__mon-nav-wrapper">
                    <ul class="header__flag-row-mob">
                        <li class="header__flag-row-element">
                            <a @click="langChange('en')" data-lang="en">
                                <img src="../assets/image/flag1.svg" alt="">
                            </a>
                        </li>
                        <li class="header__flag-row-element">
                            <a @click="langChange('fr')" data-lang="fr">
                                <img src="../assets/image/flag2.svg" alt="">
                            </a>
                        </li>
                        <li @click="langChange('de')" class="header__flag-row-element">
                            <a data-lang="de">
                                <img src="../assets/image/flag3.svg" alt="">
                            </a>
                        </li>
                    </ul>
                    <ul class="header__mob-list">
                        <li @click="arctiveHeaderMob = false">
                            <router-link to="/">
                                {{ pageAbout }}
                            </router-link> 
                        </li>
                        <li @click="arctiveHeaderMob = false">
                            <router-link to="/contacts">
                                {{ pageContacts }}
                            </router-link> 
                        </li>
                        <li @click="arctiveHeaderMob = false">
                            <router-link to="/faq">
                                {{ pageFaq }}
                            </router-link> 
                        </li>
                        <li @click="arctiveHeaderMob = false">
                            <router-link to="/warranty">
                                {{ pageGaranty }}
                            </router-link> 
                        </li>
                        <li @click="arctiveHeaderMob = false">
                            <router-link to="/search">
                                {{ pageSearch }}
                            </router-link>
                        </li>
                        <li class="parent-nav" :class="{openSUbNav: subNav}">
                            <a @click="openSub">{{ pagePost }}</a>
                            <ul class="sub-nav"  :click="reloadPage">
                                <li v-for="post in allPosts" :key="post.id" @click="arctiveHeaderMob = false">
                                    <router-link :to="'/post/' + post.id" >
                                        {{ getPostTitle(post) }}
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
      </header>
</template>


<script>
export default {
  name: 'headerComponents',
  data() {
    return {
     pageAbout: '',
     pageContacts: '',
     pageFaq: '',
     pageGaranty: '',
     pageSearch: '',
     pagePost: '',
     langValue: this.$store.state.lang,

     arctiveHeaderMob: false,
     subNav: false,

     allPosts: []
    }
  },
  components: {
    
  },


  methods: {
 //загрузка данных с сервера
    loadFetch() {
      fetch(`${this.$store.state.urlApi}wp-json/wp/v2/blog_posts`) // Замените URL на адрес вашего сайта WordPress и путь к API
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
        this.allPosts = dataPages
        console.log(dataPages)
        
    },
    reloadPage() {
      // Вызываем метод window.location.reload() для перезагрузки страницы
     
    },

    currentLang(){
        let currentLang = this.$store.state.lang
        console.log(this.$store.state.lang)

        this.selectActiveLang(currentLang)
    },

    langChange(langName){
        this.$store.commit('changeLang', langName)
        this.currentLang()
        this.$forceUpdate();
    },


    selectActiveLang(currentLang){
        let allLang = document.querySelectorAll('.header__flag-row-element a')
        for(let i = 0; i < allLang.length; i++){
            let langAtribute = allLang[i].getAttribute('data-lang')

            if(langAtribute == currentLang){
                allLang[i].classList.add('active-lang')
            }
            else{
                allLang[i].classList.remove('active-lang')
            }
        }
    },
    translateHeader(){
        

      let langCurrent = this.$store.state.lang
   
      if(langCurrent == 'de'){
        this.pageAbout = 'Über uns'
        this.pageContacts = 'Kontakt'
        this.pageFaq = 'FAQs'
        this.pageGaranty = 'Lebenslange Garantie'
        this.pageSearch = 'Zertifikatsüberprüfung'
        this.pagePost = 'Edelsteine'
      }
      if(langCurrent == 'en'){
        this.pageAbout = 'About us'
        this.pageContacts = 'Contacts'
        this.pageFaq = 'FAQs'
        this.pageGaranty = 'Lifetime Warranty '
        this.pageSearch = 'Certificate verification'
        this.pagePost = 'Gemstones'
      }
      if(langCurrent == 'fr'){
        this.pageAbout = 'À propos de nous'
        this.pageContacts = 'Contacts'
        this.pageFaq = 'FAQ'
        this.pageGaranty = 'Garantie à vie'
        this.pageSearch = 'Vérification du certificat'
        this.pagePost = 'Pierres précieuses'
      }
      
    },

    openCloseNav(){
        if(this.arctiveHeaderMob == true){
            this.arctiveHeaderMob = false
        }
        else{
            this.arctiveHeaderMob = true
        }
        
    },
    openSub(){
        if(this.subNav == true){
            this.subNav = false
        }
        else{
            this.subNav = true
        }
    },
    getPostTitle(post) {
        let currentLang = this.$store.state.lang
        console.log(post.acf[currentLang]['post_title'])
      return post.acf[currentLang]['post_title'];
    }
  },




  mounted(){
    this.currentLang()
    this.translateHeader()
    this.loadFetch()
  },
  watch: {
    '$store.state.lang': function(newLang, oldLang) {
      this.translateHeader();
      this.currentLang()
      this.loadFetch()
     
    }
  },
}
</script>