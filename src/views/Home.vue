<template>
  <div class="container home pt-4">
    <img class="logo" alt="Vue logo" src="@/assets/logo-magictouch.svg" />
    <div class="row mx-auto mt-5">
      <div class="col-12 col-md-4 mb-2">
        <Button link="/menu" btn-color="bg-blue" content="開始點餐" />
      </div>
      <div class="col-12 col-md-4 mb-2">
        <Button link="/" btn-color="bg-black" content="餐點紀錄" />
      </div>
      <div class="col-12 col-md-4 mb-2">
        <Button link="/" btn-color="bg-red" content="結帳" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'

export default {
  name: 'Home',
  components: {
    Button,
  },
}
</script>

<style scoped>
.logo {
  max-height: 75vh;
}
</style>
