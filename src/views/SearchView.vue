<template>

 
   <section class="search-sec">
    <div class="popup-error__wrapper">
      <div class="popup-error">
        <div class="popup-error__close" @click="closeErrorPopup">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="27" height="27" rx="2.5" fill="white" stroke="#4EABE9"/>
            <path d="M14.9398 14L19.1398 9.80667C19.2653 9.68113 19.3359 9.51087 19.3359 9.33333C19.3359 9.1558 19.2653 8.98554 19.1398 8.86C19.0143 8.73447 18.844 8.66394 18.6665 8.66394C18.4889 8.66394 18.3187 8.73447 18.1931 8.86L13.9998 13.06L9.80646 8.86C9.68093 8.73447 9.51066 8.66394 9.33313 8.66394C9.1556 8.66394 8.98533 8.73447 8.8598 8.86C8.73426 8.98554 8.66374 9.1558 8.66374 9.33333C8.66374 9.51087 8.73426 9.68113 8.8598 9.80667L13.0598 14L8.8598 18.1933C8.79731 18.2553 8.74771 18.329 8.71387 18.4103C8.68002 18.4915 8.6626 18.5787 8.6626 18.6667C8.6626 18.7547 8.68002 18.8418 8.71387 18.9231C8.74771 19.0043 8.79731 19.078 8.8598 19.14C8.92177 19.2025 8.99551 19.2521 9.07675 19.2859C9.15798 19.3198 9.24512 19.3372 9.33313 19.3372C9.42114 19.3372 9.50827 19.3198 9.58951 19.2859C9.67075 19.2521 9.74449 19.2025 9.80646 19.14L13.9998 14.94L18.1931 19.14C18.2551 19.2025 18.3288 19.2521 18.4101 19.2859C18.4913 19.3198 18.5785 19.3372 18.6665 19.3372C18.7545 19.3372 18.8416 19.3198 18.9228 19.2859C19.0041 19.2521 19.0778 19.2025 19.1398 19.14C19.2023 19.078 19.2519 19.0043 19.2857 18.9231C19.3196 18.8418 19.337 18.7547 19.337 18.6667C19.337 18.5787 19.3196 18.4915 19.2857 18.4103C19.2519 18.329 19.2023 18.2553 19.1398 18.1933L14.9398 14Z" fill="#B7B7B7"/>
          </svg>
        </div>
        
          <p class="popup-error__title">{{ errorText }}</p>        
      </div>
     </div>
    <div class="container">
        <h1 class="search-sec__title">{{ titlePage }}</h1>
        <div class="search-form">
            <template v-for="(placeholder, index) in placeholders">
                <input inputmode="text"
                  :key="index"
                  v-if="index < 3"
                  type="text"
                  class="inpField"
                  :maxlength="1"
                  :value="fields[index]"
                  :placeholder="placeholder"
                  @input="handleInput(index, $event)"
                  @keydown="handleKeyDown(index, $event)"
                >
                
              </template>
              <div class="line"></div>
              <template v-for="(placeholder, index) in placeholders">
                <input inputmode="numeric"
                  :key="index"
                  v-if="index >= 3"
                  type="text"
                  class="inpField"
                  :maxlength="1"
                  :value="fields[index]"
                  :placeholder="placeholder"
                  @input="handleInput(index, $event)"
                  @keydown="handleKeyDown(index, $event)"
                >
              </template>

          </div>
        <div class="search-sec__btn-box">
            <button class="search-sec__btn btnV1" @click="startSearch">{{textBtn}}</button>
        </div>
    </div>
   </section>
 
   
</template>



<script>



export default {
  name: 'SearchView',
  data() {
    return {
        titlePage: '',
        textBtn: '',
        errorText: '',
        fields: ['', '', '', '', '', '', '', '', ''],
    placeholders: ['A', 'B', 'C', '1', '2', '3', '4', '5', '6']
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
            
            
            this.loadSearchData(data)
           

          })
          .catch(error => {
              // Обработка ошибок
              console.error('Ошибка:', error);
          });
    },
    loadSearchData(dataPages){
      for(let i = 0; i<dataPages.length; i++){
        let pageTemplate = dataPages[i].template
        if(pageTemplate == 'pages/search-page.php')
        this.renderSearchPage(dataPages[i])
      }
    },
    renderSearchPage(dataPage){
        let langCurrent = this.$store.state.lang
        let langObject = '';
        
        console.log(dataPage)

        langObject = langCurrent;
        
        for (let key in dataPage.acf[langObject]) {
          
          if(key == 'page_title'){
            this.titlePage = dataPage.acf[langObject][key]
          }

          if(key == 'button_text'){
            this.textBtn = dataPage.acf[langObject][key]
          }

          if(key == 'error_text'){
            this.errorText = dataPage.acf[langObject][key]
          }
          
        }

    },

    handleInput(index, event) {
      this.fields[index] = event.target.value;
      if (index < this.fields.length - 1 && event.target.value.length === 1) {
        const nextField = this.$el.querySelectorAll('.inpField')[index + 1];
        nextField.focus();
      }
    },
    handleKeyDown(index, event) {
      if (event.key === 'Backspace') {
        if (event.target.value === '') {
          if (index > 0) {
            const previousField = this.$el.querySelectorAll('.inpField')[index - 1];
            event.preventDefault(); // Prevent the default Backspace behavior
            previousField.focus();
            this.fields[index - 1] = ''; // Clear the value of the previous field
          }
        } else if (index > 0 && event.target.selectionStart === 0) {
          const previousField = this.$el.querySelectorAll('.inpField')[index - 1];
          event.preventDefault(); // Prevent the default Backspace behavior
          previousField.focus();
          previousField.setSelectionRange(1, 1); // Move the cursor to the end of the previous field
        }
      } else if (event.key === 'ArrowLeft') {
        if (index === 0) {
          event.preventDefault(); // Prevent the default ArrowLeft behavior
        }
      }
    },
    startSearch(){
      let arrayInput = this.fields
      let currentId = "";
      for(let i = 0; i < arrayInput.length; i++){
        currentId = currentId +arrayInput[i]
      }
      // Проверка длины строки
      if (currentId.length > 3) {
        // Вставка дефиса после третьего символа
        currentId = currentId.slice(0, 3) + "-" + currentId.slice(3);
      }

      // Вывод результата
   
      this.loadFetchCerteficats(currentId)
    },



    loadFetchCerteficats(currentId) {
      fetch(`${this.$store.state.urlApi}wp-json/wp/v2/certificate`) // Замените URL на адрес вашего сайта WordPress и путь к API
          .then(response => response.json())
          .then(data => {

            console.log(data)
            this.filtrCerteficats(data, currentId)
           

          })
          .catch(error => {
              // Обработка ошибок
              console.error('Ошибка:', error);
          });
    },

    filtrCerteficats(data, currentId){
       let currentValue = '';
       let currentID = ''
       for(let i = 0; i<data.length; i++){
         let titlePost = data[i].title.rendered
  
         if (titlePost.toLowerCase() === currentId.toLowerCase()) {
           currentValue = titlePost;
           currentID = data[i].title.rendered
         }
       }
       if(currentValue == ''){
         console.log('error')
         this.openErrorPopup()
       }
       else{
         console.log(currentID)
         this.$router.push({ name: 'certificate', params: { postTitle: currentID } })
       }
     },
     openErrorPopup(){
       let popupWrapper = document.querySelector('.popup-error__wrapper')
       popupWrapper.classList.add('popup-error__active')
     },
     closeErrorPopup(){
       let popupWrapper = document.querySelector('.popup-error__wrapper')
       popupWrapper.classList.remove('popup-error__active')
     }


  },
  computed: {
    combinedValue() {
      return this.fields.join('');
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