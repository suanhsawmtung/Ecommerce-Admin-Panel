<template>
    <div class="branch-parent">

        <!-- Intro Message -->
        <transition name="intro">
            <div class="intro" v-show="introStatus">
                <h1>Ecommerce Admin Panel</h1>
            </div>
        </transition>
        <!-- Intro Message End -->

        <!-- Error Message -->
        <transition name="error">
            <div class="error-box" v-show="credentialsErrorStatus">
                <h3>{{ errorMessage }}</h3>
            </div>
        </transition>
        <!-- Error Message End -->

        <!-- Register Form -->
        <transition name="auth">
            <RegisterPage v-show="registerStatus" @changeForm="changeForm" @success="showOverviewPage" @error="showErrorMessage"></RegisterPage>
        </transition>
        <!-- Register Form End -->

        <!-- Login Form -->
        <transition name="auth" appear >
            <LoginPage v-show="loginStatus" @changeForm="changeForm"  @success="showOverviewPage"></LoginPage>
        </transition>
        <!-- Login Form End -->

    </div>
</template>

<script>
    import RegisterPage from "../components/auth-branches/RegisterPage.vue";
    import LoginPage from "../components/auth-branches/LoginPage.vue";
    import setAuthHeader from "../utils/setAuthHeader";
    import { mapActions, mapGetters } from "vuex";
    export default {
        name: 'AuthPage',
        components: {RegisterPage, LoginPage},
        data () {
            return {
                introStatus: true,
                registerStatus: false,
                loginStatus: false,
                credentialsErrorStatus: false,
                errorMessage: ""
            }
        },
        computed: {
            ...mapGetters("Categories", ["getCategories"]),
        },
        methods: {
            ...mapActions("Products", ["allProducts"]),
            ...mapActions("Categories", ["allCategories"]),

            /* Change Login and Register Form */
            changeForm (status) {
                this.registerStatus= false;
                this.loginStatus= false;

                if(status === "login"){
                    setTimeout(this.showLoginForm, 500)
                    return;
                }

                if(status === "register"){
                    setTimeout(this.showRegisterForm, 500)
                    return;
                }
            },

             /* Login And Show Overview Page After Login */
            showOverviewPage(){
                if(localStorage.getItem("TOKEN") !== null){
                    setAuthHeader(localStorage.getItem("TOKEN"));  /* <- Add Token To Axios Header */
                    this.getAllDatas();
                    setTimeout(()=>this.$router.push({ path: '/overview' }), 2500);
                }else{
                    this.errorMessage = this.$store.getters.getError;
                    this.credentialsErrorStatus = true;
                    setTimeout(() => this.credentialsErrorStatus = false, 3000);
                }
            },

             /* Get All Required Data */
            getAllDatas(){
                this.allProducts();
                this.allCategories();
                this.$store.dispatch("overviewData");
                this.$store.dispatch("allCustomers");
            },

             /* Show Login Form */
            showLoginForm(){
                this.registerStatus= false;
                this.loginStatus= true;
            },

             /* Show Register Form */
            showRegisterForm(){
                this.registerStatus= true;
                this.loginStatus= false;
            },

             /* Show Error Message From Backend */
            showErrorMessage(error){
                this.errorMessage = error.response.data.errors.email[0];
                this.credentialsErrorStatus = true;
                setTimeout(() => this.credentialsErrorStatus = false, 3000);
            },

             /* Checking Already Login Or Not */
            checkLogin(){
                if(localStorage.getItem("TOKEN") !== null){
                    setAuthHeader(localStorage.getItem("TOKEN"));  /* <- Add Token To Axios Header */
                    this.getAllDatas();
                    setTimeout(() => this.$router.push({ path: '/overview' }), 5000);
                }else{
                    setTimeout(()=>{
                        this.introStatus = false;
                        this.loginStatus = true;
                    }, 1500);
                }
            } 
        },
        mounted () {
            this.checkLogin();
        }
    }
</script>

<style src="../assets/css/auth.css" scoped></style>
