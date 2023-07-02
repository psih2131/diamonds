<template>
    <footer class="footer">
        <div class="footer__top">
            <div class="container">
                <div class="footer__left">
                    <router-link to="/"  class="footer__logo">
                        <img src="../assets/image/header-logo.png" alt="">
                    </router-link> 
                    <ul class="footer__flag-list">
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
                </div>
                
                <nav class="footer__nav">
                    <ul class="footer__nav-list">
                        <li>
                            <router-link to="/">
                               {{pageAbout}}
                            </router-link> 
                        </li>
                        <li>
                            <router-link to="/contacts">
                                {{pageContacts}}
                            </router-link> 
                        </li>
                        <li>
                            <router-link to="/faq">
                                {{pageFaq}}
                            </router-link> 
                        </li>
                    </ul>
                    <ul class="footer__nav-list">
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
                        <li>
                            <router-link to="/warranty">
                                {{pageGaranty}}
                            </router-link> 
                        </li>
                        <li>
                            <router-link to="/search">
                                {{pageSearch}}
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div class="footer__down">
            <div class="container">
                <p class="footer__copy">{{ pageCopy }}</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'footerComponents',
  data() {
    return {
     pageAbout: '',
     pageContacts: '',
     pageFaq: '',
     pageGaranty: '',
     pageSearch: '',
     pageCopy: '',
     langValue: this.$store.state.lang,
     subNav: false,
     allPosts: []
    }
  },
  methods: {
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
    },
    
    currentLang(){
        let currentLang = this.$store.state.lang
        console.log(this.$store.state.lang)

        this.selectActiveLang(currentLang)
    },

    langChange(langName){
        this.$store.commit('changeLang', langName)
        this.currentLang()
    },


    selectActiveLang(currentLang){
        let allLang = document.querySelectorAll('.footer .header__flag-row-element a')
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

    translateFooter(){
        let langCurrent = this.$store.state.lang
     
        if(langCurrent == 'de'){
          this.pageAbout = 'Über uns'
          this.pageContacts = 'Kontakt'
          this.pageFaq = 'FAQs'
          this.pageGaranty = 'Lebenslange Garantie'
          this.pageSearch = 'Zertifikatsüberprüfung'
          this.pageCopy = '©️ 2023. Moissan.eu - Alle Rechte vorbehalten.'
          this.pagePost = 'Edelsteine'
         
        }
        if(langCurrent == 'en'){
          this.pageAbout = 'About us'
          this.pageContacts = 'Contacts'
          this.pageFaq = 'FAQs'
          this.pageGaranty = 'Lifetime Warranty'
          this.pageSearch = 'Certificate Verification'
          this.pageCopy = '©️ 2023. Moissan.eu - All rights reserved.'
          this.pagePost = 'Gemstones'
         
        }
        if(langCurrent == 'fr'){
          this.pageAbout = 'À propos de nous'
          this.pageContacts = 'Contacts'
          this.pageFaq = 'FAQ'
          this.pageGaranty = 'Garantie à vie'
          this.pageSearch = 'Vérification du certificat'
          this.pageCopy = '©️ 2023. Moissan.eu - Tous droits réservés.'
          this.pagePost = 'Pierres précieuses '
        }
        
      },
      getPostTitle(post) {
        let currentLang = this.$store.state.lang
        console.log(post.acf[currentLang]['post_title'])
      return post.acf[currentLang]['post_title'];
    }
  },
  
  mounted(){
    this.translateFooter()
    this.currentLang()
    this.loadFetch()
  },
  watch: {
    '$store.state.lang': function(newLang, oldLang) {
      this.translateFooter();
      this.loadFetch()
    }
  },
}
</script>
































































