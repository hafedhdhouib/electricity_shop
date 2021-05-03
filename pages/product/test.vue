<template>
  <div>
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
    </b-table>
Commande:
    {{ checkedRows }}
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
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 40%;
}
</style>