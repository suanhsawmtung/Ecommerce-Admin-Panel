<template>
    <div class="branch-parent">
        <transition name="intro">
            <div class="intro" v-show="introStatus">
                <h1>Ecommerce Admin Panel</h1>
            </div>
        </transition>
        <transition name="error">
            <div class="error-box" v-show="credentialsErrorStatus">
                <h3>{{ errorMessage }}</h3>
            </div>
        </transition>
        <transition name="auth">
            <RegisterPage v-show="registerStatus" @changeForm="changeForm" @success="showOverviewPage" @error="showErrorMessage"></RegisterPage>
        </transition>
        <transition name="auth" appear >
            <LoginPage v-show="loginStatus" @changeForm="changeForm"  @success="showOverviewPage"></LoginPage>
        </transition>
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
            showOverviewPage(){
                if(localStorage.getItem("TOKEN") !== null){
                    setAuthHeader(localStorage.getItem("TOKEN")); 
                    this.getAllDatas();
                    setTimeout(()=>this.$router.push({ path: '/overview' }), 2500);
                }else{
                    this.errorMessage = this.$store.getters.getError;
                    this.credentialsErrorStatus = true;
                    setTimeout(() => this.credentialsErrorStatus = false, 3000);
                }
            },
            getAllDatas(){
                this.allProducts();
                this.allCategories();
                this.$store.dispatch("allCustomers");
            },
            showLoginForm(){
                this.registerStatus= false;
                this.loginStatus= true;
            },
            showRegisterForm(){
                this.registerStatus= true;
                this.loginStatus= false;
            },
            showErrorMessage(error){
                this.errorMessage = error.response.data.errors.email[0];
                this.credentialsErrorStatus = true;
                setTimeout(() => this.credentialsErrorStatus = false, 3000);
            },
            checkLogin(){
                if(localStorage.getItem("TOKEN") !== null){
                    setAuthHeader(localStorage.getItem("TOKEN"));
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

<style scoped>
    .branch-parent{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: teal;
    }
    .intro{
        margin-bottom: 15px;
    }
    .intro h1{
        font-size: 5rem;
    }

    .error-box{
        padding: 15px;
        background: #cc2212;
        border-radius: 10px;
        margin-bottom: 15px;
    }
    .error-box h3{
        color:  #fff;
        text-align: center;
    }


    /* intro animation */
    .intro-enter-from,
    .intro-leave-to{
        transform: scale(0.5);
        opacity: 0
    }

    .intro-enter-active,
    .intro-leave-active{
        transition: all 1s ease;
    }

    /* Auth transition */
    .auth-enter-from{
        opacity: 0.5;
        transform: translateX(300px);
    }
    .auth-enter-to{
        opacity: 1;
        transform: translateX(0);
    }
    .auth-enter-active{
        transition: all 0.3s ease-out;
    }
    .auth-leave-from{
        opacity: 1;
        transform: translate(0);
    }
    .auth-leave-to{
        opacity: 0;
        transform: scale(0.2);
    }
    .auth-leave-active{
        transition: all 0.3s ease-out;
    }

    /* auth error animation */
    .error-enter-from,
    .error-leave-to{
        opacity: 0;
        transform: translateY(-50px);
    }

    .error-enter-to,
    .error-leave-from{
        opacity: 1;
        transform: translateY(0px);
    }

    .error-enter-active{
        animation: wobble 0.5s ease;
    }
    .error-leave-active{
        transition: all 0.3s ease;
    }

    @keyframes wobble{
        0% { opacity: 0; transform: translateY(-50px) }
        50% { opacity: 1; transform: translateY(0px) }
        60% { transform: translateX(8px) }
        70% { transform: translateX(-8px) }
        80% { transform: translateX(6px) }
        90% { transform: translateX(-6px) }
        100% { transform: translateX(0px) }
    }
</style>
