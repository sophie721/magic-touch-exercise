<template>
  <div class="menu">
    <div class="navbar navbar-expand-lg px-3 fixed-top bg-brown text-dark-brown">
      <div class="navbar-brand">{{appTitle}}</div>
      <ul class="nav" @click.prevent="navigate">
        <li
          class="nav-item"
          v-for="section in content"
          :key="section.id"
        >
          <a
            class="nav-link text-dark-brown"
            href="#"
            :data-target="section.id"
          >
            <img class="section-img" :alt="section.name" :src="section.img" />
            {{ section.name }}
          </a>
        </li>
      </ul>
    </div>
    <div v-cloak class="container product text-dark-brown">
      <div
        v-for="section in content"
        :key="section.id"
        :id="section.id"
        class="product-section p-5"
      >
        <h2>{{ section.name }}</h2>
        <hr>
        <div class="row align-items-start" >
          <div
            class="product-item col-lg-3 col-md-6 col-12"
            v-for="item in section.data"
            :key="item.nameEn"
          >
            <div>
              <div class="item-background"></div>
              <img class="img-fluid item-content" :alt="item.name" :src="item.img" />
            </div>
            <div class="row mt-1 px-4 item-content">
              <p class="col-8 m-0 align-self-center">{{ item.name }}<br>{{ item.nameEn }}</p>
              <a
                class="col-4 align-self-center btn bg-red"
                @click="openOrderModal(item)"
              >
                <div>點餐</div>
                {{ item.price }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  <OrderModal v-model="selectedItem" @close="closeOrderModal"></OrderModal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Modal } from 'bootstrap'
import OrderModal from '@/components/OrderModal.vue'

export default {
  data: () => ({
    selectedItem: null,
    orderModal: null,
  }),
  components: {
    OrderModal,
  },
  computed: {
    ...mapState({
      content: (state) => state.menu.content,
    }),
    appTitle: function() {
      return process.env.VUE_APP_TITLE
    },
  },
  created() {
    this.$store.commit('menu/loadContent')
  },
  methods: {
    navigate(event) {
      let elementId = event.target.closest('a').getAttribute('data-target');
      let navbar = document.getElementsByClassName('navbar')[0];
      window.scrollTo({
        top: document.getElementById(elementId).offsetTop - navbar.offsetHeight,
        behavior: 'smooth'
      })
    },
    openOrderModal(item) {
      this.selectedItem = item;
      this.orderModal.show();
    },
    closeOrderModal() {
      this.selectedItem = null;
      this.orderModal.hide();
    },
    updateOrder(args) {
      console.log(args)
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.orderModal = new Modal(document.getElementById('order-modal'));
    })
  },
}
</script>

<style lang="scss" scoped>
.product {
  margin-top: 4rem;
}

.product-section {
  background-image: url('~@/assets/img/mt_product_bg.png');
  min-height: 100vh;
  hr {
    margin-top: 0;
    border-top: 1px solid;
  }
}

.section-img {
  max-height: 1.25rem;
}

.product-item > div {
  position: relative;
  .item-background {
    position: absolute;
    top: 25%;
    left: 10%;
    width: 80%;
    padding-bottom: 15%;
    background-color: rgba($color: black, $alpha: 0.2);
    border-radius: 50%;
    z-index: 0;
  }
  .item-background::after {
    content: '';
    display: block;
    position: relative;
    top: 13%;
    left: 15%;
    width: 70%;
    padding-bottom: 53%;
    // background-color: red;
    border-radius: 50%;
    box-shadow: inset -3px -4px rgba($color: black, $alpha: 0.1);
  }
  .item-content {
    position: relative;
    z-index: 5;
  }
  img {
    filter: drop-shadow(2px 5px 3px rgba($color: black, $alpha: 0.2));
  }
}
</style>
