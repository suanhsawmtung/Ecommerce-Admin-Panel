<template>
    <div class="form">
        <div class="form-header">
            <h2 style="color: teal">Register Form</h2>
        </div>
        <div class="form-body">
            <div class="input-box">
                <label for="name">Name</label>
                <input type="text" name="name" placeholder="Enter username..." v-model="user.name">
            </div>

            <div class="input-box">
                <label for="email">Email</label>
                <input type="email" name="email" placeholder="Enter email..." v-model="user.email">
            </div>

            <div class="input-box">
                <label for="name">Password</label>
                <input type="password" name="password" placeholder="Enter password..." v-model="user.password">
            </div>

            <div class="input-box">
                <label for="name">Confirm Password</label>
                <input type="password" name="confirm-password" placeholder="Confirm your password..." v-model="user.password_confirmation">
            </div>

            <div>
                <input type="checkbox" name="name"> <span>Remember me?</span>
            </div>

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
    import setAuthHeader from "../../utils/setAuthHeader";
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
                }
            }
        },
        methods: {
            changeForm (status) {
                this.$emit("changeForm", status);
            },
            register(){
                this.$store.dispatch("register", this.user).then(()=>{
                    setAuthHeader(this.$store.getters.getToken);
                    this.$emit("success");
                    // console.log(this.$store.getters.getToken);
                })
                .catch(error=>{
                    console.log(error);
                });

                // console.log(this.user);
            }
        }
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
</style>