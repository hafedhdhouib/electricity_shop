<template>
  <main class="cart container">
    <h2>Your Cart</h2>
<div id="content">
    <section v-if="cart.length">
      <table >
        <thead>
          <tr>
            <th>IMG</th>
            <th>article</th>
            <th>QTE</th>
            <th>Amount</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td class="image">
              <img :src="item.img" class="image is-64x64" />
            </td>
            <td>
              {{ item.item }}
            </td>
            <td>
              {{ item.QTE }}
            </td>
            <td>{{ item.prix }} DT</td>
            <td>{{ item.prix * item.QTE }} DT</td>
            <td>
              <b-button
                label="QTE"
                type="is-dark"
                @click="promptNumber(item)"
              />
              <b-button label="delate" @click="deleteItem(item)"></b-button>
            </td>
          </tr>
          <tr>
            <td>
              <b-field label-position="on-border" label="name" >
                <b-input v-model="name" />
              </b-field>
            </td>
            <td colspan="4"></td>
            <td class="total">Total: {{ total }} DT</td>
          </tr>
        </tbody>
      </table>
      <b-button label="enregister" @click="save" />
      <b-button label="pdf" @click="downloadWithCSS"></b-button>
    </section>
    <div v-else />
</div>
<div id="test" v-show="test">
    <section v-if="cart.length">
      <table >
        <thead>
          <tr>
            <th>article</th>
            <th>QTE</th>
            <th>Amount</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td>
              {{ item.item }}
            </td>
            <td>
              {{ item.QTE }}
            </td>
            <td>{{ item.prix }} DT</td>
            <td>{{ item.prix * item.QTE }} DT</td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td class="total">Total: {{ total }} DT</td>
          </tr>
        </tbody>
      </table>
      </section>
    <div v-else />
</div>

  </main>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas"
import { mapGetters, mapMutations } from "vuex";
import { firestore } from "@/services/firebase";
export default {
  data() {
    return {
      n: 0,
      test:false,
      name:''
    };
  },
  computed: {
    ...mapGetters(["cart"]),
    total() {
      let total = 0;
      this.cart.forEach((element) => {
        total = total + element.prix * element.QTE;
        console.log(total);
      });
      return total;
    },
  },
  methods: {
    save () {
      const orderItems = []
      this.cart.forEach(element => {
        let product= {
          qte:element.QTE,
          product:element.id
        }
        orderItems.push(product)
        })
      let doc= {
        name: this.name,
        prix_total : this.total,
        orderItems: orderItems,
        date : new Date()
      }
      console.log(doc)
      this.$axios.$post('http://localhost:3000/orders',{
        name: this.name,
        total_price : this.total,
        orderItems: orderItems,
        date:Date.now()
      }).then(()=>{
        this.cart=[]
              this.$router.push('/')
      })
    },
    downloadWithCSS() {
      /**const doc = new jsPDF();
      // WITH CSS 
      var canvasElement = document.createElement('canvas');
      html2canvas(this.$refs.content, { canvas: canvasElement }).then(function (canvas) {
        const img = canvas.toDataURL("image/jpeg");
        doc.addImage(img,'JPEG',20,20);
        doc.save("sample.pdf");
      });
      **/
     window.html2canvas = html2canvas
     var doc = new jsPDF("p","pt","a4")
     doc.html(document.querySelector('#test'),{
       callback: function (doc){
         doc.save()
       },
x:20,y:20
     }) 

    },
    zid(i, n) {
      let pay = { item: i, number: Number(n) };
      this.$store.commit("zid", pay);
    },
    promptNumber(i) {
      this.$buefy.dialog.prompt({
        inputAttrs: {
          type: "number",
          placeholder: "QTE",
          value: 1,
        },
        trapFocus: true,
        onConfirm: (value) => {
          let pay = { item: i, number: Number(value) };
          this.$store.commit("zid", pay);
        },
      });
    },
    deleteItem(item){
      this.$store.commit('deleteItem',item)
    }
  },
};
</script>

<style scoped>
#test {
}
body,
button,
input,
select,
textarea {
  font-family: "Mulish", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}
.content {
  min-height: calc(100vh - 50px);
}
footer {
  height: 50px;
}
nav {
  padding: 5px 60px;
  background: #082c40;
  color: white;
  position: relative;
  align-items: center;
  display: flex;
  justify-content: space-between;
}
nav a {
  color: white;
  text-decoration: none;
}
nav ul {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
}
nav ul li {
  padding-right: 40px;
}
.row {
  margin: 30px 0 60px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 0px;
}
button {
  background: #098191;
  transition: background ease 0.25s;
  border-radius: 5px;
  display: inline-block;
  border: none;
  padding: 0.75rem 1.5rem;
  margin: 0;
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
}
button:hover {
  background: #63b6b8;
}
button:focus {
  outline: 1px solid #fff;
  outline-offset: -4px;
}
.ghost {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #555;
  color: black;
}
.ghost:hover {
  background: #eee;
}
.primary {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
}
input[type="number"] {
  width: 50px;
  margin-right: 10px;
}
.quantity {
  display: flex;
  margin: 20px 0 40px;
}
fieldset {
  margin: 20px 0;
  border: 1px solid #ddd;
}
.label {
  margin: 15px 0;
  line-height: 1.6;
}
.label span {
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 1000px;
  background: #d50813;
  color: white;
  font-weight: bold;
}
select {
  padding: 3px;
}
footer {
  background: black;
  width: 100%;
  padding: 10px 30px;
  color: white;
  text-align: center;
}
footer a,
footer a:visited,
footer a:active {
  color: #c4c3ec;
  font-weight: bold;
}
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 40px 0;
  padding: 0;
  table-layout: fixed;
  border-radius: 5px;
}
table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}
table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}
table th,
table td {
  padding: 0.625em;
  text-align: center;
}
table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
@media screen and (max-width: 600px) {
  table {
    border: 0;
  }
  table caption {
    font-size: 1.3em;
  }
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }
  table td::before {
    /* * aria-label has no advantage, it won't be read inside a table content: attr(aria-label);
		 */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  table td:last-child {
    border-bottom: 0;
  }
}
.comma:not(:first-child) {
  margin-left: -0.15rem;
}
.comma:empty {
  display: none;
}
.comma:not(:first-child):before {
  content: ", ";
  margin: 0.15rem;
}
.smallnum {
  position: absolute;
  border-radius: 1000px;
  background: white;
  color: black;
  top: 9px;
  right: 33px;
  width: 25px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 25px;
  font-size: 10px;
  padding: 6px 10px;
  font-weight: bold;
}
.toast {
  background: #a8060e;
  color: white;
  border-radius: 3px;
  padding: 12px 24px;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
}
.toast a {
  color: white;
  font-weight: bold;
  text-decoration: none;
}
/* Page-specific styles */
.restaurant .restaurantheading {
  margin: 100px 0 20px 200px;
  display: flex;
  align-items: center;
}
.restaurant h1 {
  font-size: 30px;
  margin-right: 40px;
}
.restaurant .filter {
  padding-right: 200px;
}
section.restaurantinfo {
  padding: 20px 200px;
}
section.restaurantinfo .items {
  height: 250px;
  border-radius: 5px;
  background-size: cover;
  position: relative;
  box-shadow: 2px 6px 6px 0 #d7d7d7;
}
section.restaurantinfo .iteminfo {
  background: white;
  width: 100%;
  padding: 15px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
}
.cart.container {
  padding: 100px;
  max-width: 1000px;
  margin: 0 auto;
}
.cart.container h2 {
  text-align: center;
}
.cart.container .total {
  font-weight: bold;
}
.cart.container .emptycart {
  text-align: center;
  line-height: 2;
}
</style>