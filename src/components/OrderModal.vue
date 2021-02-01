<template>
  <div
    id="order-modal"
    class="modal"
    tabindex="-1"
    role="dialog"
  >
    <div
      class="modal-dialog text-center px-2"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-body">
          <img class="img-fluid" :alt="selectedItem.name" :src="selectedItem.img" />
          <p class="item-title">{{ selectedItem.name }}<br>{{ selectedItem.nameEn }}</p>
          <div class="row">
            <div class="offset-2 col-2">
              <button class="btn bg-red" @click="minus()">
                -
              </button>
            </div>
            <div class="col-4 px-2">
              <input
                class="form-control"
                type="text"
                disabled
                v-model="amount"
              >
            </div>
            <div class="col-2">
              <button class="btn bg-red" @click="plus()">
                +
              </button>
            </div>
          </div>
          <h3 class="mt-3">小計： $&nbsp;{{ price }}</h3>
        </div>
        <div class="modal-footer">
          <button class="btn bg-blue" @click="submit">確定</button>
          <button class="btn bg-black" @click="clear">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';
export default {
  components: { Button },
  data: function() {
    return {
      amount: 1,
    }
  },
  props: {
    modelValue: Object,
  },
  methods: {
    minus: function() {
      this.amount = --this.amount < 0 ? 0 : this.amount;
    },
    plus: function() {
      ++this.amount;
    },
    submit: function() {
      // TODO: Update order history by vuex
      this.clear();
    },
    clear: function() {
      this.$emit('close');
    },
  },
  computed: {
    selectedItem: function() {
      const defaultItem = {
        name: '',
        img: null,
        price: 0,
      };
      return this.modelValue ? this.modelValue : defaultItem;
    },
    price: function() {
      return parseInt(this.selectedItem.price, 10) * this.amount;
    },
  },
}
</script>

<style lang="scss">
.modal-body {
  position: relative;
  .item-title {
    position: absolute;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
    background-color: rgba($color: white, $alpha: 0.5);
  }
  img {
    filter: drop-shadow(2px 10px 10px rgba($color: black, $alpha: 0.2));
  }
  .form-control[disabled] {
    background: white;
  }
}
</style>
