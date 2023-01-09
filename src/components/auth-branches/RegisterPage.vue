<template>
    <div class="form">
        <div class="form-header">
            <h2 style="color: teal">Register Form</h2>
        </div>
        <div class="form-body">
            <div class="input-box">
                <label for="name">Name</label>
                <input type="text" name="name" placeholder="Enter username..." v-model="user.name">
                <small style="color: red" v-show="validation.nameStatus">User name is required.</small>
                <small style="color: red" v-show="validation.nameCountStatus">User name require at least 5 chracters.</small>
            </div>

            <div class="input-box">
                <label for="email">Email</label>
                <input type="email" name="email" placeholder="Enter email..." v-model="user.email">
                <small style="color: red" v-show="validation.emailStatus">User email is required.</small>
                <small></small>
            </div>

            <div class="input-box">
                <label for="name">Password</label>
                <input type="password" name="password" placeholder="Enter password..." v-model="user.password">
                <small style="color: red" v-show="validation.passwordStatus">Password is required.</small>
                <small style="color: red" v-show="validation.passwordCountStatus">Password require at least 7 chracters.</small>
                <small></small>
            </div>

            <div class="input-box">
                <label for="name">Confirm Password</label>
                <input type="password" name="confirm-password" placeholder="Confirm your password..." v-model="user.password_confirmation">
                <small style="color: red" v-show="validation.password_confirmationStatus">Confirm password does not match.</small>
                <small style="color: red" v-show="validation.confirmationCheckStatus">Password Confirmation is required.</small>
            </div>

            <!-- <div>
                <input type="checkbox" name="name"> <span>Remember me?</span>
            </div> -->

            <div class="input-box">
                <button type="button" class="btn" @click="register()">Register</button>
            </div>

            <div class="span-box">
                <i style="color: #4fb9af">Already a member?</i><span @click="changeForm('login')">Log in here</span>
            </div>
        </div>
        <div class="form-footer"></div>
    </div>
</template>

<script>
    export default {
        name: 'RegisterPage',
        data () {
            return {
                user: {
                    name: "",
                    email: "",
                    role: "admin",
                    password: "",
                    password_confirmation: ""
                },
                validation: {
                    nameStatus: false,
                    nameCountStatus: false,
                    emailStatus: false,
                    passwordStatus: false,
                    passwordCountStatus: false,
                    confirmationCheckStatus: false,
                    password_confirmationStatus: false,
                    validationSuccessStatus: false
                }
            }
        },
        methods: {
            changeForm (status) {
                this.$emit("changeForm", status);
            },
            register(){
                this.clearValidationMessage();
                this.registerValidation();
                if(this.validation.validationSuccessStatus === true){
                    this.$store.dispatch("register", this.user).then(()=>{
                        this.$emit("success");
                    })
                    .catch(error=>{
                        this.$emit("error", error);
                    });
                }
            },
            registerValidation(){
                if(this.user.name === ""){
                    this.validation.nameStatus = true;
                    return;
                }
                if(this.user.name.length < 5){
                    this.validation.nameCountStatus = true;
                    return;
                }
                if(this.user.email === ""){
                    this.validation.emailStatus = true;
                    return;
                }
                if(this.user.password === ""){
                    this.validation.passwordStatus = true;
                    return;
                }
                if(this.user.password.length < 7){
                    this.validation.passwordCountStatus = true;
                    return;
                }
                if(this.user.password_confirmation === ""){
                    this.validation.confirmationCheckStatus = true;
                    return;
                }
                if(this.user.password !== this.user.password_confirmation){
                    this.validation.password_confirmationStatus = true;
                    return;
                }
                this.validation.validationSuccessStatus = true;
            },
            clearValidationMessage(){
                this.validation.nameStatus = false;
                this.validation.nameCountStatus = false;
                this.validation.emailStatus = false;
                this.validation.passwordStatus = false;
                this.validation.passwordCountStatus = false;
                this.validation.confirmationCheckStatus = false;
                this.validation.password_confirmationStatus = false;
                this.validation.validationSuccessStatus = false;
            }
        },
    }
</script>

<style scoped>
    .form{
        width: 400px;
        margin: 0 auto;
        padding: 15px;
        border-radius: 12px;
        background: #fff;
        box-shadow: 1px 1px 5px 0.2px #4fb9af;
    }
    .form-header{
        text-align: center;
        margin: 5px 0 10px 0;
    }
    .form-header h3{
        color: teal;
    }
    .form-body:last-child{
        text-align: center;
    }
    .form-body .input-box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 15px 0;
    }
    .form-body .input-box label{
        font-size: 1rem;
        margin-bottom: 5px;
        color: #4fb9af;
        font-weight: bolder;
    }
    .form-body .input-box input{
        padding: 8px ;
        text-decoration: none;
        border: 1.5px solid #4fb9af;
        border-radius: 8px;
    }
    .form-body .input-box input:focus{
        border:2px solid #4fb9af;
        outline: none;
    }
    .form-body span{
        color: #4fb9af;
        margin-left: 5px;
    }
    .btn{
        margin-bottom: 10px;
        padding: 8px ;
        border-radius: 8px;
        border: 0;
        background: #4fb9af;
        color: #fff;
        transition: 0.2s;
    }
    .btn:active{
        transform: scale(0.9);
    }
    .span-box{
        text-align: center;
    }
    .span-box span{
        color: #4fb9af;
        text-decoration: underline;
        cursor: pointer;
    }
    .span-box span:hover{
        text-decoration: none;
    }
    .span-box span:active{
        color: teal;
    }

    /* now, make it responsive */
    @media (max-width: 440px){
        .form{
            width: 350px;
            padding: 12px;
            border-radius: 10px;
        }
    }
    @media (max-width: 350px){
        .form{
            width: 300px;
            padding: 10px;
        }
    }
</style>