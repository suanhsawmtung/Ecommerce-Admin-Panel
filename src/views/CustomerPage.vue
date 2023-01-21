<template>
    <div class="branch-parent">

      <!-- Toast Alert -->
      <transition name="toast">
          <div class="toast" v-show="toastStatus">
              <h3 >{{ toastMessage }}</h3>
          </div>
      </transition>
      <!-- Toast Alert End -->

      <!-- All Modals -->
      <div v-show="modalStatus" class="modal-parent-box">
        
          <!-- Modal Component -->
          <CustomerModal :modal="modal" :user="user" @close="modalToggle('close', null)" @toastAlert="toastAlert"></CustomerModal>
      
      </div>
      <!-- All Modals End -->

      <!-- Main -->
      <div class="main" :class="{ 'toggleWidth':getToggleStatus}">

          <!-- Top Bar -->
          <TopBar></TopBar>

          <!-- Table Box -->
          <div class="table-box">

              <!-- Control For Change Showing Components -->
              <div class="branch-nav">
                  <div class="nav-item" :class="{ 'active' : customerStatus }"  @click="selectItem('customer')">
                      <h4>Customers</h4>
                  </div>
                  <div class="nav-item" :class="{ 'active' : adminStatus }" @click="selectItem('admin')" >
                     <h4>Admins</h4>
                  </div>
              </div>
              <!-- Control For Change Showing Components End -->

              <!-- Page Title -->
              <h1>Customers</h1>

              <!-- Customer Table Component Box -->
              <div v-show="customerStatus" :class="{'table': !detailStatus}">
                  <!-- Customer Table -->
                  <CustomerTable v-show="customerTableStatus" @showModal="modalToggle" @detail="showDetailPage"></CustomerTable>
              </div>

              <!-- Admin Table Component Box -->
              <div v-show="adminStatus" :class="{'table': !detailStatus}">
                  <!-- Admin Table -->
                  <AdminTable v-show="adminListStatus" @showModal="modalToggle" @detail="showDetailPage"></AdminTable>
              </div>
              
              <!-- User Detail Component Box -->
              <div v-show="detailStatus">
                  
                  <!-- Button Box -->
                  <div class="btn-box">
                      <button @click="goPrevious()" v-show="detailStatus"><i class="fa-solid fa-arrow-left"></i></button>
                  </div>
                  <!-- Button Box End -->

                  <!-- User Detail -->
                  <UserDetail v-show="detailStatus" :id="id"></UserDetail>

              </div>

          </div>
          <!-- Table Box End -->

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

            /* Use To Choose Which Section Show, Admin Or Customer */
              customerStatus : true,
              adminStatus: false,
              detailStatus : false,

            /* Status For Show Toast And Toast Message */ 
              toastStatus: false,
              toastMessage: "",
              
            /* Status For Which Components Show Or Not */ 
              customerTableStatus: true,
              adminListStatus: true,

            /* Use For User CRUD And Modal */
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
        /* Admin Section Show Or User Section Show */
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

        /* Choose Which Modal Show Or Hide */
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

        /* Show User Detail Page */
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

        /* Go Back To Previous Page */
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
        },

        /* Show Toast Alert And Hide Itself */
        toastAlert(status){
            if(status==="customer"){
                this.toastMessage = "Removed form admin list. ";
                setTimeout(() => this.toastStatus = true, 1000);
                setTimeout(() => this.toastStatus = false, 3000);
                return;
            }
            if(status==="admin"){
                this.toastMessage = "Added to admin list ";
                setTimeout(() => this.toastStatus = true, 1000);
                setTimeout(() => this.toastStatus = false, 3000);
                return;
            }
            if(status==="delete"){
              this.toastMessage = "Deleted account successfully.";
              setTimeout(() => this.toastStatus = true, 1000);
              setTimeout(() => this.toastStatus = false, 3000);
              return;
          }
        }
      },
    }

</script>

<style src="../assets/css/customer.css" scoped></style>
