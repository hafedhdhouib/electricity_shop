<template>
  <b-modal v-model="isModalActive" :width="640" scroll="keep">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Ajouter au panier</p>
      </header>
      <section class="modal-card-body">
        <b-field label="QTE">
          <b-input ref="qte" v-model="qte" type="Number" />
        </b-field>
        <b> </b>
        {{ object }}
      </section>
      <footer class="modal-card-foot">
        <b-button class="button" type="button" @click="cancel">Cancel</b-button>
        <b-button class="is-danger" type="button" @click="confirme"
          >confirme</b-button
        >
      </footer>
    </div>
  </b-modal>
</template>

<script>
const apiUrl = process.env.API_URL;
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    object: {
      type: Object,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    owner: {
      type: String,
    },
    id: {
      type: Number,
    },
  },
  data() {
    return {
      isModalActive: false,
      qte:0
    };
  },
  watch: {
    isActive(newValue) {
      this.isModalActive = newValue;
    },
    isModalActive(newValue) {
      if (!newValue) {
        this.cancel();
      }
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    confirme() {
      let articleOutput = {
        img:this.object.image,
        item: this.object.name,
        QTE: Number(this.qte),
        prix: Number(this.object.price),
        prix_totla: this.qte * this.object.price,
        id: this.object.id    }
      this.cardSubmitted = true
      this.$store.commit("addToCart2", articleOutput)
      this.isModalActive = false
    },
  },
};
</script>

<style>
</style>
