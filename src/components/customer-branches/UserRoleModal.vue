<template>
    <div>
       <div class="modal-box-one">
         <Modal @close="$emit('close')">
           <h4 v-if="user.role === 'customer'">Do you want to add {{ user.name }} to admin list?</h4>
           <h4 v-if="user.role === 'admin'">Do you want to remove {{ user.name }} from admin list?</h4>
           <button v-if="user.role === 'customer'" @click="changeRole(user.id, 'admin')">Add</button>
           <button v-if="user.role === 'admin'" @click="changeRole(user.id, 'customer')">Remove</button>
           <button @click="$emit('close')">Cancel</button>
         </Modal>
       </div>
    </div>
 </template>
 
 <script>
 import { mapActions } from "vuex";
import setAuthHeader from "../../utils/setAuthHeader";
import Modal from "../AllModals.vue";
export default {
    name: "UserRoleModal",
    components: { Modal },
    props: {
        user: {
            required: true,
            type: Object
        }
    },
    methods: {
        ...mapActions(["changeUserRole"]),
        changeRole(id, newRole){
            let newRoleData = {
                "id": id,
                "newRole": newRole
            };
            this.changeUserRole(newRoleData);
            if(this.user.email===localStorage.getItem("EMAIL")){
                setAuthHeader(localStorage.getItem("TOKEN")); 
                this.$store.dispatch("logout").then(() => {
                    this.$router.push({ path: '/' });
                });
                return;
            }
            this.$emit("close");
            this.$emit("toastAlert", newRole);
        },
    },
    
}
 </script>
 
 <style scoped>
    .modal-box-one,
    .modal-box-two,
    .modal-box-three{
       width: 100vw;
       height: 100vh;
    }
    .modal-box-one h4,
    .modal-box-two h4{
        margin-bottom: 10px;
        font-size: 1rem;
     }
     .modal-box-one button,
     .modal-box-two button,
     .modal-box-three button{
        width: 100px;
        padding: 10px ;
        border-radius: 5px;
        margin-right: 10px;
        background: #4fb9af;
        color: #fff;
        border: none
     }
     .modal-box-one button:active,
     .modal-box-two button:active,
    .modal-box-three button:active{
        transform : scale(0.9);
        background: #b3e0dc;
     }
     .modal-box-three .input-box{
       width: 100%;
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: flex-start;
       padding: 10px;
     }
     .modal-box-three .input-box label:nth-child(5){
       margin-top: 15px;
       border: 1px solid #4fb9af;
       border-radius: 3px;
       padding: 5px;
     }
     .modal-box-three .input-box label:nth-child(5) i{
       margin-right: 5px;
     }
     .modal-box-three .input-box label{
       text-align: start;
       margin-bottom: 5px;
       width: 100%;
     }
     .modal-box-three .input-box input[type=file]{
       display: none;
     }
     .modal-box-three .input-box input{
       width: 100%;
       margin-bottom: 15px;
       padding: 5px;
       border: 1px solid #4fb9af;
       border-radius: 3px;
     }
 
    /* make it response */
    @media (max-width : 680px) {
       .modal-box-one h4,
       .modal-box-two h4{
           font-size: 0.8rem;
        }
       .modal-box-one button,
       .modal-box-two button,
       .modal-box-three button{
           width: 80px;
           padding: 8px ;
        }
    }
 </style>
 