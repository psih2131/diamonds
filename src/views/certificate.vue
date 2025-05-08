<template>
    <section class="certificat-sec">
        <div class="container">
            <div class="certificat-sec__wrapper">
                <div class="certificat-sec__img">
                    <img v-if="imgId" :src="imgId" alt="">
                </div>
                <div class="certificat-sec__info">
                    <div class="certificat-sec__row id-sert">
                        <div class="certificat-sec__rov-name">{{certNumText}}</div>
                        <div class="certificat-sec__rov-value">{{titlePost}}</div>
                    </div>
                    <div class="certificat-sec__row" v-if="identification !== ''">
                        <div class="certificat-sec__rov-name">{{identificationTex}}</div>
                        <div class="certificat-sec__rov-value">{{ identification }}</div>
                    </div>
                    <div class="certificat-sec__row" v-if="shape !== ''">
                        <div class="certificat-sec__rov-name">{{shapeTex}}</div>
                        <div class="certificat-sec__rov-value">{{ shape }}</div>
                    </div>
                    <div class="certificat-sec__row" v-if="color !== ''">
                        <div class="certificat-sec__rov-name">{{colorTex}}</div>
                        <div class="certificat-sec__rov-value">{{ color }}</div>
                    </div>

                    <div class="certificat-sec__row" v-if="clarity !== ''">
                        <div class="certificat-sec__rov-name">{{clarityText}}</div>
                        <div class="certificat-sec__rov-value">{{ clarity }}</div>
                    </div>


                    <div class="certificat-sec__row" v-if="measurements !== ''">
                        <div class="certificat-sec__rov-name">{{measurementsText}}</div>
                        <div class="certificat-sec__rov-value">{{ measurements }}</div>
                    </div>

                    <div class="certificat-sec__row" v-if="caratWeight !== ''">
                        <div class="certificat-sec__rov-name">{{caratWeightText}}</div>
                        <div class="certificat-sec__rov-value">{{ caratWeight }}</div>
                    </div>

                    <div class="certificat-sec__row" v-if="piecesPerPack !== ''">
                        <div class="certificat-sec__rov-name">{{piecesPerPackText}}</div>
                        <div class="certificat-sec__rov-value">{{ piecesPerPack }}</div>
                    </div>

                    <div class="certificat-sec__row" v-if="cut !== ''">
                        <div class="certificat-sec__rov-name">{{cutText}}</div>
                        <div class="certificat-sec__rov-value">{{ cut }}</div>
                    </div>

                    <div class="certificat-sec__row" v-if="polish !== ''">
                        <div class="certificat-sec__rov-name">{{polishText}}</div>
                        <div class="certificat-sec__rov-value">{{ polish }}</div>
                    </div>

                    <div class="certificat-sec__row" v-if="symmetry !== ''">
                        <div class="certificat-sec__rov-name">{{symmetryText}}</div>
                        <div class="certificat-sec__rov-value">{{ symmetry }}</div>
                    </div>

                    <div class="certificat-sec__row" v-if="fluorescence !== ''">
                        <div class="certificat-sec__rov-name">{{fluorescenceText}}</div>
                        <div class="certificat-sec__rov-value">{{ fluorescence }}</div>
                    </div>



                    <div class="certificat-sec__description" v-if="description !== ''" v-html="description">
                       
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>



<script>
export default {
  data() {
    return {
    certNumText: '',
    identificationTex: '',
    shapeTex: '',
    colorTex: '',
    clarityText: '',
    measurementsText: '',
    caratWeightText: '',
    piecesPerPackText: '',
    cutText: '',
    polishText: '',
    symmetryText: '',
    fluorescenceText: '',


     currentPost: '',
     titlePost:'',
     identification: '',
     shape: '',
     color: '',
     clarity:'',
     measurements: '',
     caratWeight: '',
     piecesPerPack: '',
     cut: '',
     polish: '',
     symmetry: '',
     fluorescence: '',
     description: '',
     imgId: '',
    }
  },
  components: {
    
  },

  methods: {
 //загрузка данных с сервера
    loadFetch() {
        console.log('start server data', this.$route.params.postTitle)


        let covertedCurrentId = this.$route.params.postTitle
      


      // console.log('currentId',covertedCurrentId)

      fetch(`${this.$store.state.urlApi}wp-json/wp/v2/certificate?slug=${covertedCurrentId}`) // Замените URL на адрес вашего сайта WordPress и путь к API
          .then(response => response.json())
          .then(data => {
            
            console.log(data)

            if(data && data.length > 0){
              console.log('currentId',covertedCurrentId)
              this.renderData(data[0])
             
            }
            else{
   
              console.log('запрос отработал но массив пустой те ничего не найдено');
            }
            // this.filtrCerteficats(data, currentId)
           

          })
          .catch(error => {
              // Обработка ошибок
       
              console.error('Ошибка:', error);
          });

   
    //   fetch(`${this.$store.state.urlApi}wp-json/wp/v2/certificate`) // Замените URL на адрес вашего сайта WordPress и путь к API
    //       .then(response => response.json())
    //       .then(data => {

         
    //         this.loadPost(data)
           

    //       })
    //       .catch(error => {
    //           // Обработка ошибок
    //           console.error('Ошибка:', error);
    //       });
    },
    // loadPost(dataPages){
    //     let postId = this.$route.params.postTitle;
    //     for(let i = 0; i<dataPages.length; i++){
    //         let idPost = dataPages[i].title.rendered
    //         if(idPost == postId){
    //             this.renderData(dataPages[i])
    //         }
    //     }
    // },
    renderData(dataPost){
        console.log(dataPost)
        this.titlePost = dataPost.title.rendered
        this.identification = dataPost.x_metadata.identification
        this.shape = dataPost.x_metadata.shape
        this.color = dataPost.x_metadata.color
        this.clarity = dataPost.x_metadata.clarity
        this.measurements =  dataPost.x_metadata.measurements
        this.caratWeight = dataPost.x_metadata.carat_weight
        this.piecesPerPack = dataPost.x_metadata.pieces_per_pack
        this.cut = dataPost.x_metadata.cut
        this.polish = dataPost.x_metadata.polish
        this.symmetry = dataPost.x_metadata.symmetry
        this.fluorescence = dataPost.x_metadata.fluorescence
        this.description = dataPost.x_metadata.description


        let imgUrl = dataPost.x_metadata.image
        if(imgUrl && imgUrl != '' && imgUrl != ' '){
            this.imgId =  require(`@/assets/image/x${imgUrl}.jpg`);
        }
        
       
    },
    translateField(){
       let langCurrent = this.$store.state.lang
   
       if(langCurrent == 'de'){
           this.certNumText = 'Certificate number'
           this.identificationTex= 'Identification'
           this.shapeTex= 'Shape'
           this.colorTex= 'Color'
           this.clarityText= 'Clarity'
           this.measurementsText= 'Measurements*'
           this.caratWeightText= 'Carat weight**'
           this.piecesPerPackText= 'Pieces per pack'
           this.cutText= 'Cut'
           this.polishText= 'Polish'
           this.symmetryText= 'Symmetry'
           this.fluorescenceText= 'Fluorescence'
       }
       if(langCurrent == 'fr'){
           this.certNumText = 'Certificate number'
           this.identificationTex= 'Identification'
           this.shapeTex= 'Shape'
           this.colorTex= 'Color'
           this.clarityText= 'Clarity'
           this.measurementsText= 'Measurements*'
           this.caratWeightText= 'Carat weight**'
           this.piecesPerPackText= 'Pieces per pack'
           this.cutText= 'Cut'
           this.polishText= 'Polish'
           this.symmetryText= 'Symmetry'
           this.fluorescenceText= 'Fluorescence'
       }

       if(langCurrent == 'en'){
           this.certNumText = 'Certificate number'
           this.identificationTex= 'Identification'
           this.shapeTex= 'Shape'
           this.colorTex= 'Color'
           this.clarityText= 'Clarity'
           this.measurementsText= 'Measurements*'
           this.caratWeightText= 'Carat weight**'
           this.piecesPerPackText= 'Pieces per pack'
           this.cutText= 'Cut'
           this.polishText= 'Polish'
           this.symmetryText= 'Symmetry'
           this.fluorescenceText= 'Fluorescence'
       }

       else{
           
       }
    }

  },

  computed: {
    lang() {
      return this.$store.state.lang;
    }
  },
  mounted() {
    this.loadFetch()
    this.translateField()
  },
  watch: {
    $route(to, from) {
        this.translateField()
        this.loadFetch();
       
    },
    lang: function(newLang, oldLang) {
      this.translateField();
    }
    
    
  }
}
</script>