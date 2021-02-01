<template>
  <b-modal
    id="order-modal"
    hide-header
    centered
    @ok="submit"
    @cancel="clear"
  >
    <div class="d-block text-center px-2">
      <img class="img-fluid" :alt="selectedItem.name" :src="selectedItem.img" />
      <p class="item-title">{{ selectedItem.name }}<br>{{ selectedItem.nameEn }}</p>
      <div class="row">
        <div class="offset-2 col-2">
          <button class="btn bg-red" @click="minus()">
            <b-icon-dash></b-icon-dash>
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
            <b-icon-plus></b-icon-plus>
          </button>
        </div>
      </div>
      <h3 class="mt-3">小計： $&nbsp;{{ price }}</h3>
    </div>
    <template #modal-footer="{ ok, cancel }">
      <b-button class="btn bg-blue" @click="ok()">
        確定
      </b-button>
      <b-button class="btn bg-black" @click="cancel()">
        取消
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  data: function() {
    return {
      amount: 1,
    }
  },
  props: {
    value: Object,
  },
  methods: {
    minus: function() {
      this.amount = --this.amount < 0 ? 0 : this.amount;
    },
    plus: function() {
      ++this.amount;
    },
    submit: function() {
      this.$emit('submit', this.selectedItem, this.amount);
      this.clear();
    },
    clear: function() {
      this.$emit('input', null);
    },
  },
  computed: {
    selectedItem: function() {
      const defaultItem = {
        name: '',
        img: null,
        price: 0,
      };
      return this.value ? this.value : defaultItem;
    },
    price: function() {
      return parseInt(this.selectedItem.price, 10) * this.amount;
    },
  },
}
</script>

<style lang="scss">
.d-block {
  position: relative;
  .item-title {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  img {
    filter: drop-shadow(2px 10px 10px rgba($color: black, $alpha: 0.2));
  }
  .form-control[disabled] {
    background: white;
  }
}
</style>
