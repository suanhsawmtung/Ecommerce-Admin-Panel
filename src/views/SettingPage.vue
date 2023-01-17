<template>
    <div class="branch-parent">
        <div v-show="nameStatus" class="name-modal">
             <Modal @close="modalToggle('name')">
                <label for="name">Change your name</label>
                <input type="text" id="name" placeholder="Enter new name..." v-model="name">
                <small style="color: red" v-show="nameError">User name is required.</small>
                <small style="color: red" v-show="nameCountError">User name require at least 5 chracters.</small>
                
                <div class="btn-box">
                    <button @click="changeName()" >Change</button>
                    <button @click="modalToggle('name')">Cancel</button>
                </div>
             </Modal>
        </div>
        <div v-show="emailStatus" class="email-modal">
             <Modal @close="modalToggle('email')">
                <label for="email">Change your email</label>
                <input type="email" id="email" placeholder="Enter new email..." v-model="email">
                <small style="color: red" v-show="emailError">User email is required.</small>
                
                <div class="btn-box">
                    <button @click="changeEmail()" >Change</button>
                    <button @click="modalToggle('email')">Cancel</button>
                </div>
             </Modal>
        </div>
        <div v-show="phoneStatus" class="phone-modal">
             <Modal @close="modalToggle('phone')">
                <label for="phone">Change your phone number</label>
                <input type="text" id="phone" placeholder="Enter new phone..." v-model="phone">
                <small style="color: red" v-show="phoneError">User phone is required.</small>
                
                <div class="btn-box">
                    <button @click="changePhone()" >Change</button>
                    <button @click="modalToggle('phone')">Cancel</button>
                </div>
             </Modal>
        </div>
        <div v-show="passwordStatus" class="password-modal">
             <Modal @close="modalToggle('password')">
                <label for="oldPassword">Change your password</label>
                <input type="password" id="oldPassword" placeholder="Enter old password..." v-model="oldPassword">
                <small style="color: red" v-show="oldPasswordError">Old password is required.</small>
                
                <input type="password" id="newPassword" placeholder="Enter new password..." v-model="newPassword">
                <small style="color: red" v-show="newPasswordError">New password is required.</small>
                <small style="color: red" v-show="newCountError">Password require at least 7 chracters.</small>
                
                <input type="password" id="confirmPassword" placeholder="Confirm your password..." v-model="password_confirmation">
                <small style="color: red" v-show="confirmationError">Confirm password does not match.</small>
                
                <div class="btn-box">
                    <button @click="changePassword()" >Change</button>
                    <button @click="modalToggle('password')">Cancel</button>
                </div>
             </Modal>
        </div>
        <div class="main" :class="{ 'toggleWidth':getToggleStatus}">
            <TopBar></TopBar>
            <Profile @showModal="modalToggle" />
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapGetters, mapActions } from 'vuex';
    import TopBar from "../components/TopBar.vue";
    import Modal from "../components/AllModals.vue";
    import Profile from "../components/setting-branches/ProfileSetting.vue";

    export default {
       name : 'CategoryPage', 
       data () {
        return {
            nameStatus: false,
            emailStatus: false,
            phoneStatus: false,
            passwordStatus: false,

            nameError: false,
            nameCountError: false,
            emailError: false,
            phoneError: false,
            oldPasswordError: false,
            newPasswordError: false,
            newCountError: false,
            confirmationError: false,
            passwordChangeStatus: false,

            name: "",
            email: "",
            phone: "",
            oldPassword: "",
            newPassword: "",
            password_confirmation: ""
        }
       },
       components: { TopBar, Profile, Modal },
       computed: {
            ...mapGetters(["getToggleStatus", "getMyProfileData"]),
       },
       methods: {
            ...mapActions(["updateUser"]),
            changeName(){
                this.clearValidationMessage();
                if(this.name!==""){
                    this.getMyProfileData.name=this.name;
                    this.updateUser(this.getMyProfileData);
                }else if(this.name === ""){
                    this.nameError = true;
                    return;  
                }else if(this.name.length < 5){
                    this.nameCountError = true;
                    return;
                }
                this.modalToggle("name");
                this.name = "";
            },
            changeEmail(){
                this.clearValidationMessage();
                if(this.email!==""){
                    this.getMyProfileData.email=this.email;
                    this.updateUser(this.getMyProfileData);
                }else{
                    this.emailError = true;
                    return;
                }
                this.modalToggle("email");
                this.email = "";
            },
            changePhone(){
                this.clearValidationMessage();
                if(this.phone!==""){
                    this.getMyProfileData.phone=this.phone;
                    this.updateUser(this.getMyProfileData);
                }else{
                    this.phoneError = true;
                    return;
                }
                this.modalToggle("phone");
                this.phone = "";
            },
            changePassword(){
                this.clearValidationMessage();
                this.passwordValidation();
                if(this.passwordChangeStatus){
                    let data = {
                        id: this.getMyProfileData.id,
                        oldPassword: this.oldPassword,
                        newPassword: this.newPassword
                    }
                    axios.post("http://localhost:8000/api/user/changePassword", data);
                    this.modalToggle("password");
                }
            },
            modalToggle(status){
                if(status === "name"){
                    this.nameStatus = ! this.nameStatus;
                    this.name = "";
                    this.clearValidationMessage();
                    return;
                }
                if(status === "email"){
                    this.emailStatus = ! this.emailStatus;
                    this.email = "";
                    this.clearValidationMessage();
                    return;
                }
                if(status === "phone"){
                    this.phoneStatus = ! this.phoneStatus;
                    this.phone = "";
                    this.clearValidationMessage();
                    return;
                }
                if(status === "password"){
                    this.passwordStatus = ! this.passwordStatus;
                    this.oldPassword = "";
                    this.newPassword = "";
                    this.password_confirmation = "";
                    this.clearValidationMessage();
                    return;
                }
            },
            passwordValidation(){
                if(this.oldPassword === ""){
                    this.oldPasswordError  = true;
                    return;
                }
                if(this.newPassword === ""){
                    this.newPasswordError = true;
                    return;
                }
                if(this.newPassword.length < 7){
                    this.newCountError = true;
                    return;
                }
                if(this.password_confirmation !== this.newPassword){
                    this.confirmationError = true;
                    return;
                }
                this.passwordChangeStatus = true;
            },
            clearValidationMessage(){                                       
                this.nameError = false;
                this.nameCountError = false;
                this.emailError = false;
                this.phoneError = false;
                this.oldPasswordError = false;
                this.newPasswordError = false;
                this.newCountError = false;
                this.confirmationError = false;
                this.passwordChangeStatus = false;
            }
       },
    }
</script>

<style scoped>
    .branch-parent{
        position: relative;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
    .main {
        position: absolute;
        top: 0;
        left: 250px;
        width: calc(100% - 250px);
        height: 100%;
        transition: 0.5s;
    }
    .toggleWidth{
        left: 70px;
        width: calc(100% - 70px);
    }

    /* modals */
    .delete-modal{
       width: 100vw;
       height: 100vh;
    }
    .delete-modal h4{
        margin-bottom: 10px;
        font-size: 1rem;
     }
     .btn-box{
        margin-top: 15px;
     }
     .btn-box button{
        width: 100px;
        padding: 10px ;
        border-radius: 5px;
        margin-right: 10px;
        background: #4fb9af;
        color: #fff;
        border: none
    }
    .btn-box button:active{
        transform : scale(0.9);
        background: #b3e0dc;
    }
    .name-modal label,
    .email-modal label,
    .phone-modal label,
    .password-modal label{
        display: block;
        text-align: start;
        margin-bottom: 10px;
        font-size : 1rem;
        color : teal;
        font-weight: 800;
        align-self: flex-start;
    }
    .name-modal input,
    .email-modal input,
    .phone-modal input,
    .password-modal input{
        display: inline-block;
        width: 100%;
        margin-top: 15px;
        padding : 10px 8px;
        border-radius: 6px;
        border : 1px solid #b3e0dc;
    }

    /* make it response */
    @media (max-width: 650px) {
        .btn-box button{
            width: 80px;
            padding: 8px ;
        }
    }
    @media (max-width : 400px) {
        .main {
            position:fixed;
            top:0;
            left:0;
            width: 100%;
        } 
    }
</style>

