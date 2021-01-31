<template>
  <div class="col-md-3 col">
    <img :alt="item.name" :src="getImgSrc(item)" />
    {{ item.name }}
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
}
</script>
