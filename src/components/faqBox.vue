<template>
    <div class="faq-sec__element">
        <h3 class="faq-sec__title">{{datafaq.question}}</h3>
        <div class="faq-sec__text">{{datafaq.answer}}</div>
    </div>
</template>

<script>
export default {
  props: ['datafaq']
};
</script>