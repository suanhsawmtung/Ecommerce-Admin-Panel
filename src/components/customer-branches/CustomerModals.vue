<template>
   <div>
      <div v-show="addAdminStatus" class="modal-box-one">
        <Modal @close="$emit('close')">
          <h4>Do you want to add him to admin list?</h4>
          <button>Add</button>
          <button @click="$emit('close')">Cancel</button>
        </Modal>
      </div>

      <div v-show="deleteAccountStatus" class="modal-box-two">
        <Modal @close="$emit('close')">
          <h4>Do you really want to delete this account permanantly?</h4>
          <button>Delete</button>
          <button @click="$emit('close')">Cancel</button>
        </Modal>
      </div>

      <div v-show="editProfileStatus" class="modal-box-three">
        <Modal @close="$emit('close')">
          <div class="input-box">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="userData.name">
            <label for="address">Address</label>
            <input type="text" id="address" v-model="userData.address">
            <label for="image"><i class="fa-regular fa-plus"></i>Choose a photo</label>
            <input type="file" id="image" @change="selectUserImage">
          </div>
          <button>Update</button>
          <button @click="$emit('close')">Cancel</button>
        </Modal>
      </div>
   </div>
</template>

<script>
   import Modal from "../AllModals.vue";
   export default {
      name: "CustomerModals",
      data () {
         return {
            addAdminStatus: false,
            deleteAccountStatus: false,
            editProfileStatus: false,

            userData: {
               name: "kyaw kyaw",
               address: "Yangon",
               image: null
            }
         }
      },
      components: { Modal },
      props: [ "chosenModal" ],
      methods: {
         selectModal () {
            this.addAdminStatus= false;
            this.deleteAccountStatus= false;
            this.editProfileStatus= false;
            
            if(this.chosenModal==="addAdmin"){
               this.addAdminStatus=true;
               return;
            }

            if(this.chosenModal==="deleteAcc"){
               this.deleteAccountStatus=true;
               return;
            }

            if(this.chosenModal==="editProfile"){
               this.editProfileStatus=true;
               return;
            }
         },
         selectUserImage(event){
            this.userData.image = event.target.files;
         }
      },
      updated () {
         this.selectModal();
      }
      
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
