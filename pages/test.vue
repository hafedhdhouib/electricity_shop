<template>
  <div id="facture">test
      <b-button @click="print">dsq</b-button>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import {html2canvas} from 'html2canvas'
export default {
  methods: {
      print() {
    var pdf = new jsPDF();
    var element = document.getElementById('facture');
    html2canvas(element).then(canvas => {
        var image = canvas.toDataURL('image/png');
        pdf.addImage(image, 'JPEG', 15, 40,40,40);
        pdf.save('facture.pdf');
    })
      }}
};
</script>

<style>
</style>