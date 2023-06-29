<template>
    <div class="branch-parent">

      <!-- Toast Alert -->
      <transition name="toast">
          <div class="toast" v-show="toastStatus">
              <h3 >{{ toastMessage }}</h3>
          </div>
      </transition>
      <!-- Toast Alert End -->

      <!-- Role Changing Modal Component -->
      <UserRoleModal v-if="roleModalStatus" :user="user" @close="modalToggle('role', null)" @toastAlert="toastAlert"></UserRoleModal>

      <!-- Delete Modal Component -->
      <DeleteModal v-if="deleteModalStatus" :user="user" @close="modalToggle('delete', null)" @toastAlert="toastAlert"></DeleteModal>

      <!-- Detail Modal Component -->
      <DetailModal v-if="detailModalStatus" :user="user" @close="modalToggle('detail', null)" ></DetailModal>

      <!-- Main -->
      <div class="main" :class="{ 'toggleWidth':getToggleStatus}">

          <!-- Top Bar -->
          <TopBar></TopBar>

          <!-- Table Box -->
          <div class="table-box">

              <!-- Control For Change Showing Components -->
              <div class="branch-nav">
                  <div class="nav-item" :class="{ 'active' : customerTableStatus }"  @click="selectItem('customer')">
                      <h4>Customers</h4>
                  </div>
                  <div class="nav-item" :class="{ 'active' : adminListStatus }" @click="selectItem('admin')" >
                     <h4>Admins</h4>
                  </div>
              </div>
              <!-- Control For Change Showing Components End -->

              <!-- Page Title -->
              <h1>Users</h1>

              <!-- Customer Table -->
              <CustomerTable v-if="customerTableStatus" @showModal="modalToggle" ></CustomerTable>

              <!-- Admin Table -->
              <AdminTable v-if="adminListStatus" @showModal="modalToggle" ></AdminTable>

          </div>
          <!-- Table Box End -->

      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CustomerTable from "../components/customer-branches/CustomerTable.vue";
import AdminTable from "../components/customer-branches/AdminTable.vue";
import TopBar from "../components/TopBar.vue";
import UserRoleModal from "../components/customer-branches/UserRoleModal.vue";
import DeleteModal from "../components/customer-branches/DeleteModal.vue";
import DetailModal from "../components/customer-branches/DetailModal.vue";

export default {
  name : 'UserPage',
  data () {
      return {

        /* Status For Show Toast And Toast Message */ 
          toastStatus: false,
          toastMessage: "",
          
        /* Status For Which Components Show Or Not */ 
          customerTableStatus: true,
          adminListStatus: false,

        /* Status For Modal */ 
          detailModalStatus: false,
          roleModalStatus: false,
          deleteModalStatus: false,
          
          user: null
      }
  },
  components : { TopBar, CustomerTable, AdminTable, UserRoleModal, DeleteModal, DetailModal },
  computed: {
      ...mapGetters(["getToggleStatus", "getCustomers", "getAdmins", "getCustomerCurrentPage"])
  },
  methods: {

    ...mapActions(["allAdmins", "allCustomers"]),

    /* Admin Section Show Or User Section Show */
    selectItem (item){
        this.customerTableStatus = false;
        this.adminListStatus = false;

        if(item == 'customer'){
            this.customerTableStatus=true;
            return;
        }

        if(item == 'admin'){
            this.adminListStatus=true;
            return;
        }
    },

    /* Choose Which Modal Show Or Hide */
    modalToggle(status, id){
      if(id!==null){
        let userData = [...this.getCustomers, ...this.getAdmins].filter(user => user.id === id);
        this.user = userData[0];
      }else{
        this.user= null;
      }
      
      if(status=="role"){
        this.roleModalStatus = !this.roleModalStatus;
      }

      if(status=="detail"){
        this.detailModalStatus = !this.detailModalStatus;
      }

      if(status=="delete"){
        this.deleteModalStatus = !this.deleteModalStatus;
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
  async mounted () {
    if(!this.getCustomerCurrentPage) await this.allCustomers();
    else await this.allCustomers("http://localhost:8000/api/user/getAllCustomers?page="+this.getCustomerCurrentPage);
    await this.allAdmins();
  },
}

</script>

<style src="../assets/css/customer.css" scoped></style>
