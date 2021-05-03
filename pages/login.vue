<template>
  <body>
    <section class="hero is-light is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-black">Login</h3>
                    <hr class="login-hr">
                    <p class="subtitle has-text-black">Please login to proceed.</p>
                    <div class="box">
                        <form @submit.prevent="test">
                            <b-field label="email" >
                                <b-input type="email" v-model="account.email"/>
                            </b-field>

                            <b-field label="password" >
                                <b-input type="password" v-model="account.password"/>
                            </b-field>
                            <b-message v-if="isError" title="Danger" type="is-danger" aria-close-label="Close message">
                                {{errMsg}}
                            </b-message>
                            <b-button native-type="submit" class="is-primary">login</b-button>
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
    data(){
        return{
            account:{email:'',password:''},
            errMsg:String,
            isError:false
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

<style>

</style>