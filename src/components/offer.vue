<template>
<div class="home-posts-sec__element">
    <div class="home-posts-sec__top">
        <div class="home-posts-sec__img">
        <img :src="dataitem.image" alt="">
        </div>
        <h3 class="home-posts-sec__title-element">
            {{ dataitem.title }}
        </h3>
    </div>
    <p class="home-posts-sec__subtitle">{{ dataitem.subtitle }}</p>
</div>
</template>


<script>
export default {
  props: ['dataitem']
};
</script>