<template>
    <section class="contacts-sec">
        <div class="container">
            <h1 class="page-title">{{ pageTitle }}</h1>
            <div class="contacts-sec__container">
                <div class="contacts-sec__element">
                    <div class="contacts-sec__box-icon">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.25 3H3.75C3.15326 3 2.58097 3.23705 2.15901 3.65901C1.73705 4.08097 1.5 4.65326 1.5 5.25V12.75C1.5 13.3467 1.73705 13.919 2.15901 14.341C2.58097 14.7629 3.15326 15 3.75 15H14.25C14.8467 15 15.419 14.7629 15.841 14.341C16.2629 13.919 16.5 13.3467 16.5 12.75V5.25C16.5 4.65326 16.2629 4.08097 15.841 3.65901C15.419 3.23705 14.8467 3 14.25 3ZM13.9425 4.5L9.5325 8.91C9.46278 8.9803 9.37983 9.03609 9.28843 9.07417C9.19704 9.11225 9.09901 9.13185 9 9.13185C8.90099 9.13185 8.80296 9.11225 8.71157 9.07417C8.62017 9.03609 8.53722 8.9803 8.4675 8.91L4.0575 4.5H13.9425ZM15 12.75C15 12.9489 14.921 13.1397 14.7803 13.2803C14.6397 13.421 14.4489 13.5 14.25 13.5H3.75C3.55109 13.5 3.36032 13.421 3.21967 13.2803C3.07902 13.1397 3 12.9489 3 12.75V5.5575L7.41 9.9675C7.83188 10.3889 8.40375 10.6255 9 10.6255C9.59625 10.6255 10.1681 10.3889 10.59 9.9675L15 5.5575V12.75Z" fill="white"/>
                            </svg>                            
                    </div>
                    <template v-for="item in mailArray" :key="item">
                    <contactsBox :contactsdata="item" />
                    </template>
                </div>

                <div class="contacts-sec__element contacts-sec__element-location">
                    <div class="contacts-sec__box-icon">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.4999 3.35999C12.3065 2.16652 10.6878 1.49603 8.99995 1.49603C7.31212 1.49603 5.69342 2.16652 4.49995 3.35999C3.30647 4.55347 2.63599 6.17217 2.63599 7.85999C2.63599 9.54782 3.30647 11.1665 4.49995 12.36L8.45245 16.32C8.52217 16.3903 8.60512 16.4461 8.69652 16.4842C8.78791 16.5222 8.88594 16.5418 8.98495 16.5418C9.08396 16.5418 9.18198 16.5222 9.27338 16.4842C9.36477 16.4461 9.44772 16.3903 9.51745 16.32L13.4999 12.3225C14.6884 11.134 15.3561 9.52203 15.3561 7.84124C15.3561 6.16045 14.6884 4.5485 13.4999 3.35999ZM12.4274 11.25L8.99995 14.6925L5.57245 11.25C4.89531 10.5722 4.4343 9.70893 4.24772 8.76921C4.06113 7.82949 4.15734 6.85555 4.52418 5.9705C4.89101 5.08545 5.51201 4.32903 6.30867 3.79685C7.10533 3.26467 8.04189 2.98063 8.99995 2.98063C9.95801 2.98063 10.8946 3.26467 11.6912 3.79685C12.4879 4.32903 13.1089 5.08545 13.4757 5.9705C13.8426 6.85555 13.9388 7.82949 13.7522 8.76921C13.5656 9.70893 13.1046 10.5722 12.4274 11.25ZM6.74995 5.55749C6.14448 6.16482 5.80449 6.98742 5.80449 7.84499C5.80449 8.70257 6.14448 9.52516 6.74995 10.1325C7.19977 10.5831 7.77264 10.8908 8.39668 11.017C9.02073 11.1433 9.66816 11.0824 10.2578 10.8421C10.8473 10.6018 11.3528 10.1927 11.7108 9.66618C12.0688 9.13966 12.2633 8.51915 12.2699 7.88249C12.2733 7.4574 12.1914 7.03594 12.0291 6.64303C11.8668 6.25013 11.6274 5.89376 11.3249 5.59499C11.0277 5.29093 10.6733 5.04865 10.282 4.88209C9.89077 4.71554 9.47045 4.628 9.04525 4.62452C8.62004 4.62103 8.19835 4.70167 7.80443 4.86178C7.41051 5.0219 7.05214 5.25834 6.74995 5.55749ZM10.2674 9.06749C9.98323 9.35605 9.60761 9.53692 9.20479 9.57918C8.80198 9.62145 8.397 9.52247 8.05908 9.29919C7.72116 9.07591 7.4713 8.74218 7.3522 8.35506C7.23311 7.96794 7.25218 7.55147 7.40617 7.17686C7.56015 6.80225 7.83947 6.49276 8.19639 6.3013C8.5533 6.10984 8.96564 6.0483 9.3629 6.12721C9.76016 6.20611 10.1177 6.42056 10.3743 6.73389C10.631 7.04722 10.7708 7.43997 10.7699 7.84499C10.759 8.30795 10.5648 8.74764 10.2299 9.06749H10.2674Z" fill="white"/>
                            </svg>                                                        
                    </div>
                    <template v-for="item in locationArray" :key="item">
                        <locationBox :locationdata="item" />
                        </template>

                </div>
            </div>
        </div>
    </section>
</template>


<script>
import contactsBox from '@/components/contactsBox.vue'
import locationBox from '@/components/locationBox.vue'

export default {
  name: 'ContactsView',
  data() {
    return {
        pageTitle: '',
        mailArray: [],
        locationArray: [],
      
    }
  },
  components: {
    contactsBox,
    locationBox
  },

  methods: {
 //загрузка данных с сервера
    loadFetch() {
      fetch(`${this.$store.state.urlApi}wp-json/wp/v2/pages`) // Замените URL на адрес вашего сайта WordPress и путь к API
          .then(response => response.json())
          .then(data => {

            console.log(data)
            this.loadContactData(data)
           

          })
          .catch(error => {
              // Обработка ошибок
              console.error('Ошибка:', error);
          });
    },
    loadContactData(dataPages){
      for(let i = 0; i<dataPages.length; i++){
        let pageTemplate = dataPages[i].template
        if(pageTemplate == 'pages/contacts-page.php')
        this.renderContactsPage(dataPages[i])
      }

    },
    renderContactsPage(dataPage){
      let langCurrent = this.$store.state.lang
      let langObject = '';
      
      console.log(dataPage)

      langObject = langCurrent;
      
      for (let key in dataPage.acf[langObject]) {
        
        if(key == 'page_title'){
          this.pageTitle = dataPage.acf[langObject][key]
        }

        if(key == 'emails'){
          this.mailArray = dataPage.acf[langObject][key]
        }
        
        if(key == 'locations'){
          this.locationArray = dataPage.acf[langObject][key]
        }

      }

      
    },

  },

  created() {

  },
  mounted() {
    this.loadFetch();

  },
  watch: {
    '$store.state.lang': function(newLang, oldLang) {
      this.loadFetch();

    }
  },

}
</script>