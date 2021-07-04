<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/"
        >
          <img
            src="~assets/buefy.png"
            alt="Buefy"
            height="28"
          >
        </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div class="navbar-end">
      <div class="navbar-item">
          <div class="buttons">
          <nuxt-link to="/panier" class="button is-primary">
            <b-icon type="is-white" icon="basket" />
            <span class="cartcount">{{cart.length}}</span>
          </nuxt-link>
              <nuxt-link to="/product/add" class="button is-primary">
            ajout produit
          </nuxt-link>
        </div>
      </div>
    </div>
    </nav>

    <section class="main-content columns">
      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">
          General
        </p>
        <ul class="menu-list">
          <li
            v-for="(item, key) of items"
            :key="key"
          >
            <nuxt-link
              :to="item.to"
              exact-active-class="is-active"
            >
              <b-icon :icon="item.icon" /> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
computed: {
    ...mapGetters(['cart'])},
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Panier',
          icon: 'lightbulb',
          to: { name: 'panier' }
        },
        {
          title: 'historique',
          icon: 'lightbulb',
          to: { name: 'historique' }
        }
      ]
    }
  }
}
</script>
<style scoped>
.cartcount {
  font-family: 'Barlow', sans-serif;
  position: absolute;
  background: rgb(253, 103, 92);
  color: #fff;
  text-align: center;
  padding-top: 2px;
  height: 18px;
  width: 18px;
  font-size: 10px;
  margin: -8px 0 0 8px;
  border-radius: 50%;
  font-weight: 700;
}
</style>
