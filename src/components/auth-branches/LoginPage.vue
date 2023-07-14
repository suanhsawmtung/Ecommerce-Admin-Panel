<template>
    <div class="form">
        <div class="form-header">
            <h2 style="color: teal">Login Form</h2>
        </div>
        <div class="form-body">
            <div class="input-box">
                <label for="email">Email</label>
                <input type="email" name="email" placeholder="Enter email..." v-model="user.email">
                <small style="color: red" v-show="validation.emailStatus">User email is required.</small>
            </div>

            <div class="input-box">
                <label for="name">Password</label>
                <input type="password" name="password" placeholder="Enter password..." v-model="user.password">
                <small style="color: red" v-show="validation.passwordStatus">Password is required.</small>
            </div>

            <!-- <div>
                <input type="checkbox" name="name"> <span>Remember me?</span>
            </div> -->

            <div class="input-box">
                <button type="button" class="btn" @click="login()">Log In</button>
            </div>

            <div class="span-box">
                <i style="color: #4fb9af">New member?</i><span @click="changeForm('register')">Register here</span>
            </div>
        </div>
        <div class="form-footer"></div>
    </div>
</template>

<script>
    export default {
        name: 'LoginPage',
        data () {
            return {
                user: {
                    email: "",
                    password: "",
                    role: "admin",
                },
                validation: {
                    emailStatus: false,
                    passwordStatus: false
                }
            }
        },
        methods: {
            changeForm (status) {
                this.$emit("changeForm", status);
            },
            login(){
                if(this.user.email==="" || this.user.password ===""){
                    this.loginValidation();
                    return;
                }

                this.$store.dispatch("login", this.user).then(() => {
                    this.$emit('success');
                }).catch(error=>{
                    console.log(error);
                });
            },
            loginValidation(){
                this.validation.emailStatus = false;
                this.validation.passwordStatus= false;

                if(this.user.email === ""){
                    this.validation.emailStatus = true;
                }else{
                    this.validation.passwordStatus = true;
                }
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
        /* border: 1.5px solid #ff0000; */
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