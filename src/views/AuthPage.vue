<template>
    <div class="branch-parent">
        <transition name="auth">
            <RegisterPage v-show="registerStatus" @changeForm="changeForm" @success="showOverviewPage"></RegisterPage>
        </transition>
        <transition name="auth" appear >
            <LoginPage v-show="loginStatus" @changeForm="changeForm"  @success="showOverviewPage"></LoginPage>
        </transition>
    </div>
</template>

<script>
    import RegisterPage from "../components/auth-branches/RegisterPage.vue";
    import LoginPage from "../components/auth-branches/LoginPage.vue";
    export default {
        name: 'AuthPage',
        components: {RegisterPage, LoginPage},
        data () {
            return {
                registerStatus: false,
                loginStatus: true,
            }
        },
        methods: {
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
                this.getAllDatas();
                this.$router.push({ path: '/overview' });
            },
            getAllDatas(){
                this.$store.dispatch("allProducts");
                this.$store.dispatch("allCategories");
                this.$store.dispatch("allCustomers");
            },
            showLoginForm(){
                this.registerStatus= false;
                this.loginStatus= true;
            },
            showRegisterForm(){
                this.registerStatus= true;
                this.loginStatus= false;
            }
        }
    }
</script>

<style scoped>
    .branch-parent{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background: teal;
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
</style>
