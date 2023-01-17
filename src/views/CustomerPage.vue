<template>
    <div class="branch-parent">
      <div v-show="modalStatus" class="modal-parent-box">
        <CustomerModal :modal="modal" :user="user" @close="modalToggle('close', null)"></CustomerModal>
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
              </div>
              <h1>Customers</h1>
              <div v-show="customerStatus" class="table">
                <CustomerTable v-show="customerTableStatus" @showModal="modalToggle" @detail="showDetailPage"></CustomerTable>
              </div>
              <div v-show="adminStatus" class="table">
                <AdminTable v-show="adminListStatus" @showModal="modalToggle" @detail="showDetailPage"></AdminTable>
              </div>
              <div v-show="detailStatus">
                  <div class="btn-box">
                      <button @click="goPrevious()" v-show="detailStatus"><i class="fa-solid fa-arrow-left"></i></button>
                  </div>
                  <UserDetail v-show="myProfileStatus" :id="id"></UserDetail>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import CustomerTable from "../components/customer-branches/CustomerTable.vue";
  import AdminTable from "../components/customer-branches/AdminTable.vue";
  import UserDetail from "../components/customer-branches/UserDetail.vue";
  import TopBar from "../components/TopBar.vue";
  import CustomerModal from "../components/customer-branches/CustomerModals.vue";

  export default {
      name : 'ProductPage',
      data () {
          return {
              customerStatus : true,
              adminStatus: false,
              detailStatus : false,

              
              customerTableStatus: true,
              adminListStatus: true,

              myProfileStatus: true,
              updateProfileStatus: false,

              modalStatus: false,
              modal: null,
              id: null,
              user: {
                id: null,
                name: ""
              }
          }
      },
      components : { TopBar, CustomerTable, AdminTable, UserDetail, CustomerModal },
      computed: {
          ...mapGetters(["getToggleStatus", "getAllUsers"])
      },
      methods: {
        selectItem (item){
            this.customerStatus = false;
            this.adminStatus = false;

            if(item == 'customer'){
                this.customerStatus = true;
                this.customerTableStatus=true;
                return;
            }

            if(item == 'admin'){
                this.adminStatus = true;
                this.adminListStatus=true;
                return;
            }
        },
        modalToggle(status, id){
          this.modal = null;
          if(id!==null){
            let userData = this.getAllUsers.filter(user => user.id === id);
            this.user = userData[0];
          }else{
            this.user= {
              id: null,
              name: ""
            }
          }
          

          if(status=="addAdmin"){
            this.modal= "addAdmin";
            this.idForModal= id;
          }

          if(status=="removeAdmin"){
            this.modal= "removeAdmin";
            this.idForModal= id;
          }

          if(status=="deleteAcc"){
            this.modal= "deleteAcc";
            this.idForModal= id;
          }

          this.modalStatus = !this.modalStatus;
        },
        showDetailPage(status, id){
            this.id = id;
            if(status === 'customer'){
              this.customerTableStatus= false;
            }
            if(status === 'admin'){
              this.adminListStatus= false;
            }
            this.detailStatus=true;
        },
        goPrevious(){
            this.detailStatus=false;
            this.id = null;
            
            if(!this.customerTableStatus){
              this.customerTableStatus=true;
              return;
            }
            if(!this.adminListStatus){
              this.adminListStatus=true;
              return;
            }
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
.table-box{
  position: relative;
  width: 95%;
  height: 80%;
  margin: 30px auto 0 auto;
  box-shadow: 1px 1px 4px 2px #000;
  padding: 20px 15px;
}
.table-box h1{
  position: absolute;
  top: 25px;
  right: 15px;
  text-transform : uppercase;
  color: teal;
}
.table-box .table{
  width: 100%;
  height: 90%;
}
.branch-nav{
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
  .table-box h1{
      font-size: 1.5rem;
      top: 35px;
  }
  .branch-nav .nav-item h4{
      font-size: 0.8rem;
      padding: 5px 6px;
  }
  .btn-box button{
      padding: 5px 8px;
      font-size: 0.6rem;
  }
}
@media (max-width : 480px) {
  .table-box h1{
      font-size: 1.2rem;
      top: 40px;
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
