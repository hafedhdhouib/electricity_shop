<template>
  <div class="section">
    <modal-box
:is-active="isModalActive"
:object="objet"
  @cancel="trashCancel"
    />
    <h1>product</h1>
    <b-table
      :data="products"
      striped
      paginated
      :bordered="isBordered"
      :per-page="perPage"
      default-sort="name">
      <b-table-column cell-class="has-no-head-mobile is-image-cell" v-slot="props">
        <div class="image">
          <img :src="props.row.image" class="image is-64x64">
        </div>
      </b-table-column>
      <b-table-column cell-class="has-no-head-mobile is-image-cell" label="Referance" field="ref" v-slot="props">        
         {{props.row.ref}}
      </b-table-column>
      <b-table-column label="Nom" field="nom" sortable searchable v-slot="props">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column label="Prix" field="price" sortable v-slot="props">
        {{ props.row.price }}
      </b-table-column>
       <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <button class="button is-small is-success" type="button" @click.prevent="detail(props.row)">
            <b-icon icon="basket" size="is-small"/>
          </button>
        </div>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      products: [],
      factures: [],
      checkedRows: [],
      isModalActive: false,
      objet: null,
      perPage:3,
      isBordered: false,
      ip:null
    }
  },
async asyncData({$axios }) {

    const products = await $axios.$get('http://localhost:3000/products')
return { products } 
  },
  computed: {
    trashObject () {
      if (this.trashObject) {
        return this.trashObject
      }
      return null
    }
  },
  methods: {
    trashModal (trashObject) {
      this.objet = trashObject
      this.isModalActive = true
    },
    trashCancel () {
      this.isModalActive = false
    },
    detail (row) {
      this.objet = row
      this.isModalActive = true
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 40%;
}
</style>