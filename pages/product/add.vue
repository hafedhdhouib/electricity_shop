<template>
  <body>
    <section class="hero is-light">
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
                      <b-input type="float" v-model="product.price" required />
                    </b-field>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <b-field
                      class="file is-primary"
                      :class="{ 'has-name': !!file }"
                    >
                      <b-upload v-model="file" class="file-label">
                        <span class="file-cta">
                          <b-icon class="file-icon" icon="upload"></b-icon>
                          <span class="file-label">Click to upload</span>
                        </span>
                        <span class="file-name" v-if="file">
                          {{ file.name }}
                        </span>
                      </b-upload>
                    </b-field>
                  </div>
                </div>
                <b-button native-type="submit" class="is-primary"
                  >Ajouter</b-button
                >
                {{ progress }}
              </form>
            </div>
            <p class="has-text-grey"></p>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>

<script>
import { auth, firestore, storage } from "@/services/firebase";
export default {
  data() {
    return {
      product: {
        ref: "",
        nom: "",
        price: null,
        sellprice: null,
        qte: null,
      },
      file: null,
      progress: 0,
    };
  },
  methods: {
    async add() {
      const storageRef = storage.ref();
      const uploadTask = storageRef
        .child(`product/test_${Date.now()}.jpg`)
        .put(this.file);
      await uploadTask.on(
        "state_changed",
        (snapshot) => {
          this.progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((img) => {
      this.$axios.$post('http://localhost:3000/products', { 
        image: img,
        name: this.product.nom,
        price: this.product.price,
        countInStock: this.product.qte,
       })
          }).then(()=>{
              this.$router.push('/')

          })
        }
      );
    },
  },
};
</script>

<style>
</style>