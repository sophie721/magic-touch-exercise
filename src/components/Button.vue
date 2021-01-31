<template>
  <router-link :to="link" class="btn btn-block py-3" :class="btnColor">{{
    content
  }}</router-link>
</template>

<script>
export default {
  props: {
    link: String,
    btnColor: String,
    content: String,
  },
}
</script>

<style scoped>
.btn {
  font-size: 1.7rem;
  border-width: 2px;
}

.btn:hover {
  font-weight: 550;
}
</style>
>
