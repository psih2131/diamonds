<template>
    <div class="contacts-sec__box">
        <p class="contacts-sec__bot-title">{{ contactsdata.email_title }}</p>
        <a :href="'mailto:' + contactsdata.email" class="contacts-sec__box-value">{{ contactsdata.email }}</a>
    </div>
</template>

<script>
export default {
  props: ['contactsdata']
};
</script>