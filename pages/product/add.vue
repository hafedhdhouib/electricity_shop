<template>
  <body>
    <section class="hero is-light is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="">
            <h3 class="title has-text-black">ajout produit</h3>
            <hr class="login-hr" />
            <div class="box">
              <form @submit.prevent="add">
                <div class="columns">
                  <div class="column">
                    <b-field label="Ref">
                      <b-input maxlength="50" v-model="product.ref" required />
                    </b-field>
                  </div>
                  <div class="column">
                    <b-field label="nom">
                      <b-input v-model="product.nom" required />
                    </b-field>
                  </div>
                  <div class="column">
                    <b-field label="Qte">
                      <b-input v-model="product.qte" requiured type="number" />
                    </b-field>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <b-field label="prix d achat">
                      <b-input type="float" v-model="product.price" required  />
                    </b-field>
                  </div>
                  <div class="column">
                    <b-field label="prix de vente">
                      <b-input type="float" v-model="product.sellprice" required />
                    </b-field>
                  </div>
                </div>
                <b-button native-type="submit" class="is-primary"
                  >Ajouter</b-button
                >
              </form>
            </div>
            <p class="has-text-grey">
              <a href="../">Sign Up</a> &nbsp;·&nbsp;
              <a href="../">Forgot Password</a> &nbsp;·&nbsp;
              <a href="../">Need Help?</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>

<script>
export default {
data() {
  return {
    product:{
        ref:'',
        nom:'',
        price:null,
        sellprice:null,
        qte:null
    }
  }
},
  methods: {
    add() {
        this.$store.dispatch("add", this.product)
    }
  },
};
</script>

<style>
</style>