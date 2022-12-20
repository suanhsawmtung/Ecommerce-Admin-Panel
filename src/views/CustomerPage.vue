<template>
    <div class="branch-parent">
      <div v-show="modalStatus" class="modal-parent-box">
        <CustomerModal :chosenModal=this.chosenModal @close="modalToggle(null)"></CustomerModal>
      </div>
      <div class="main" :class="{ 'toggleWidth':getToggleStatus}">
          <TopBar></TopBar>
          <div class="table-box">
              <div class="branch-nav">
                  <div class="nav-item" :class="{ 'active' : customerStatus }"  @click="selectItem('customer')">
                      <h4>Customers</h4>
                  </div>
                  <div class="nav-item" :class="{ 'active' : adminStatus }" @click="selectItem('admin')" >
                     <h4>Admins</h4>
                  </div>
                  <div class="nav-item" :class="{ 'active' : profileStatus }" @click="selectItem('profile')" >
                     <h4>My Profile</h4>
                  </div>
              </div>
              <div v-show="customerStatus">
                <div class="btn-box">
                    <button @click="showListBranches('list')" v-show="!customerTableStatus"><i class="fa-solid fa-arrow-left"></i></button>
                </div>
                <CustomerTable v-show="customerTableStatus" @showModal="modalToggle"></CustomerTable>
              </div>
              <div v-show="adminStatus">
                <div class="btn-box">
                    <button @click="showProfileBranches('adminList')" v-show="!adminListStatus"><i class="fa-solid fa-arrow-left"></i></button>
                </div>
                <AdminTable v-show="adminListStatus" @showModal="modalToggle"></AdminTable>
              </div>
              <div v-show="profileStatus">
                  <div class="btn-box">
                      <button @click="showProfileBranches('myProfile')" v-show="!myProfileStatus"><i class="fa-solid fa-arrow-left"></i></button>
                      <button @click="modalToggle('editProfile')" v-show="myProfileStatus">Edit Profile</button>
                  </div>
                  <MyProfile v-show="myProfileStatus"></MyProfile>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import CustomerTable from "../components/customer-branches/CustomerTable.vue";
  import AdminTable from "../components/customer-branches/AdminTable.vue";
  import MyProfile from "../components/customer-branches/MyProfile.vue";
  import TopBar from "../components/TopBar.vue";
  import CustomerModal from "../components/customer-branches/CustomerModals.vue";
  /* https://dummyjson.com/users  */
  export default {
      name : 'ProductPage',
      data () {
          return {
              customerStatus : true,
              adminStatus: false,
              profileStatus : false,

              
              customerTableStatus: true,
              customerDetailStatus: false,

              adminListStatus: true,
              adminDetailStatus: false,

              myProfileStatus: true,
              updateProfileStatus: false,

              modalStatus: false,
              chosenModal: null,
          }
      },
      components : { TopBar, CustomerTable, AdminTable, MyProfile, CustomerModal },
      computed: {
          ...mapGetters(["getToggleStatus"])
      },
      methods: {
        selectItem (item){
            this.customerStatus = false;
            this.adminStatus = false;
            this.profileStatus = false;

            if(item == 'customer'){
                this.customerStatus = true;
                return;
            }

            if(item == 'admin'){
                this.adminStatus = true;
                return;
            }

            if(item == 'profile'){
                this.profileStatus = true;
                return;
            }
        },
        showProfileBranches (status) {
            this.myProfileStatus = false;
            this.updateProfileStatus = false;

            switch (status) {
              case "myProfile":
                this.myProfileStatus = true;
                break;
              case "editMyProfile":
                this.updateProfileStatus = true;
                break;
            }
        },
        showCategoryBranches (status) {
            this.categoryProductStatus = false;
            this.categoryTableStatus = false;

            switch (status) {
              case "categoryTable":
                this.categoryTableStatus = true;
                break;
              case "categoryProduct":
                this.categoryProductStatus = true;
                break;
              case "createCategory":
                this.categoryTableStatus = true;
                this.createCategoryStatus = !this.createCategoryStatus;
                this.newCategory = " ";
                break;
            }
        },
        modalToggle(m){
          this.chosenModal = null;

          if(m=="addAdmin"){
            this.chosenModal= "addAdmin";
          }

          if(m=="deleteAcc"){
            this.chosenModal= "deleteAcc";
          }

          if(m=="editProfile"){
            this.chosenModal= "editProfile";
          }

          this.modalStatus = !this.modalStatus;
        },
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
.table-box{
  width: 95%;
  margin: 30px auto 0 auto;
  box-shadow: 1px 1px 4px 2px #000;
  padding: 20px 15px;
}
.branch-nav{
  position: relative;
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px 0 0 0;
  border-bottom: 2px solid #4fb9af;
}
.branch-nav .nav-item{
  margin: 0 10px;
  text-decoration: none;
  cursor: pointer;
  color: #000;
}
.active{
  position: relative;
  border: 2px solid #4fb9af;
  border-style: solid solid none solid;
}
.active::before{
  content: " ";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 6px;
  background: #fff;
}
.branch-nav .nav-item h4{
  padding: 5px 20px;
}

.btn-box{
  width: 100%;
  padding: 10px 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.btn-box button{
  padding: 8px 15px;
  color: #fff;
  background: teal;
  font-size: 0.8rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: 0.5s;
}
.btn-box button:active{
  transform: scale(0.93);
  background: #4fb9af;
}

/* make it responsive */
@media (max-width: 991px) {

}
@media (max-width : 768px) {
  .btn-box{
      padding: 7px 4px;
  }
  .btn-box button{
      padding: 6px 10px;
      font-size: 0.7rem;
  }
}
@media (max-width : 650px) {
  .branch-nav .nav-item h4{
      font-size: 0.8rem;
      padding: 5px 6px;
  }
  .btn-box button{
      padding: 5px 8px;
      font-size: 0.6rem;
  }
}
@media (max-width : 400px) {
  .main {
      position:fixed;
      top:0;
      left:0;
      width: 100%;
  } 
  .branch-nav .nav-item{
      margin: 0 5px;
  }
}

</style>
