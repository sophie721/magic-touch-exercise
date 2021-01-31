<template>
  <div class="menu">
    <div class="navbar navbar-expand-lg fixed-top bg-brown text-dark-brown">
      <div class="navbar-brand">{{appTitle}}</div>
      <router-link
        v-for="section in content"
        :key="section.id" :to="'/menu#' + section.id"
      >
        {{ section.name }}
      </router-link>
    </div>
    <div class="container product">
      <div
        class="row product_section"
        v-for="section in content"
        :key="section.id"
        :id="section.id"
      >
        <h2 class="col-12">{{ section.name }}</h2>
        <div
          class="col-md-3 col"
          v-for="item in section.data"
          :key="item.nameEn"
        >
          <img class="img-fluid" :alt="item.name" :src="item.img" />
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      content: (state) => state.menu.content,
    }),
    appTitle: function() {
      return process.env.APP_TITLE
    },
  },
  created() {
    this.$store.commit('menu/loadContent')
  },
}
</script>

<style lang="scss" scoped>
.nav {
  min-height: 30px;
}
</style>
