<template>
  <div>
    <b-table
      :data="orders"
      striped
      paginated
      :bordered="isBordered"
      :per-page="perPage"
      default-sort="name"
    >
      <b-table-column
        label="name"
        field="name"
        sortable
        searchable
        v-slot="props"
      >
        {{ props.row.name }}
      </b-table-column>
      <b-table-column label="produit" field="produit" sortable v-slot="props">
        <b> produit</b>
        <ul>
          <li v-for="a in props.row.orderItems">
            {{ a.product.name }}<br /><br />
          </li>
        </ul>
      </b-table-column>
      <b-table-column label="qte" field="qte" sortable v-slot="props">
        <b> qte</b>
        <ul>
          <li v-for="a in props.row.orderItems">{{ a.qte }}<br /><br /></li>
        </ul>
      </b-table-column>
      <b-table-column
        label="prix unitaire"
        field="prix unitaire"
        sortable
        v-slot="props"
      >
        <b> prix unitaire</b>
        <ul>
          <li v-for="a in props.row.orderItems">
            {{ a.product.price }} DT<br /><br />
          </li>
        </ul>
      </b-table-column>
      <b-table-column
        label="prix"
        field="prix"
        sortable
        v-slot="props"
      >
        <b> prix unitaire</b>
        <ul>
          <li v-for="a in props.row.orderItems">
            {{ a.product.price * a.qte }} DT<br /><br />
          </li>
        </ul>
      </b-table-column>
      <b-table-column
        label="price totale"
        field="total_price"
        sortable
        v-slot="props"
      >
        {{ props.row.total_price }} DT
      </b-table-column>
      <b-table-column
        label="date"
        field="date"
        sortable
        v-slot="props"
      >
        {{ $dayjs(props.row.date).format('YYYY-MM-DD HH:mm:ss')}}
      </b-table-column>
    <!--
      <b-table-column
        custom-key="actions"
        cell-class="is-actions-cell"
        v-slot="props"
      >
        <div class="buttons is-right">
          <button
            class="button is-small is-success"
            type="button"
            @click.prevent="detail(props.row)"
          >
            <b-icon icon="basket" size="is-small" />
          </button>
        </div>
      </b-table-column>
      -->
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
    };
  },
  async asyncData({ $axios }) {
    const orders = await $axios.$get("http://localhost:3000/orders");
    return { orders };
  },
};
</script>

<style>
</style>