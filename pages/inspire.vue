<template>
  <section class="section">
<b-button class="is-primary" @click="test">test</b-button>
  </section>
</template>
<script>
export default {
  data () {
    return{
          account:{email:'test@test.com',password:'123456'}
    }
  },
  methods: {
    test() {
            this.$store
        .dispatch("login", this.account)
        .then(() => {
          this.$router.push("/admin");
        })
        .catch(error => {
          this.isError = true;
          this.errMsg = error.code;
        });
    }
}
}
</script>