<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
    />
    <b-table
      :data="products"
      striped
      bordered
      default-sort="name"
      :checked-rows.sync="checkedRows"
      checkable>
      <b-table-column cell-class="has-no-head-mobile is-image-cell" label="Referance" field="ref" v-slot="props">        
         {{props.row.ref}}
      </b-table-column>
      <b-table-column label="Nom" field="nom" sortable searchable v-slot="props">
        {{ props.row.nom }}
      </b-table-column>
      <b-table-column label="Prix" field="price" sortable v-slot="props">
        {{ props.row.price }}
      </b-table-column>
      <b-table-column label="Prix" field="sellprice" sortable v-slot="props">
        {{ props.row.sellprice }}
      </b-table-column>
       <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <button class="button is-small is-success" type="button" @click.prevent="trashModal(props.row)">
            <b-icon icon="basket" size="is-small"/>
          </button>
        </div>
      </b-table-column>
    </b-table>
Commande:
{{checkedRows}}
<div v-if="checkedRows.length!=0">
<div class="columns" v-for="row in checkedRows" :key="row.id">
  <div class="column">
    <b-field label="Name">
      <b-input v-model="row.nom"/>
    </b-field>
  </div>
    <div class="column">
    <b-field label="prix de vente">
      <b-input v-model="row.sellprice"/>
    </b-field>
  </div>
    <div class="column">
    <b-field label="quantite">
      <b-input v-model="row.quantite"/>
    </b-field>
  </div>
    <div class="column">
    <b-field label="prix">
      {{row.quantite * row.sellprice }}
    </b-field>
  </div>

</div>
</div>
  </div>
</template>

<script>
import { firestore } from "~/services/firebase";
export default {
  name: "Index",
  data() {
    return {
      products: [],
      checkedRows: [],
      isModalActive: false,
      trashObject: null,
    };
  },
  created() {
    firestore
      .collection("product")
      .get()
      .then((test) => {
        test.forEach((doc) => {
          console.log(doc.data(), doc.id);
          let product = doc.data();
          product.id = doc.id;
          this.products.push(product);
        });
      });
  },
  mounted() {
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject
      }
      return null
    }
  },
  methods: {
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 40%;
}
</style>