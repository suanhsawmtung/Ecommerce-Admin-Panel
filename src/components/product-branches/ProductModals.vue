<template>
    <div>
       <div v-show="deleteProductStatus" class="modal-box-one">
         <Modal @close="$emit('close')">
           <h4>Do you really want to delete {{ productName }} permanantly?</h4>
           <button  @click="deleteProduct(product.id)">Delete</button>
           <button @click="$emit('close')">Cancel</button>
         </Modal>
       </div>
 
       <div v-show="deleteCategoryStatus" class="modal-box-two">
         <Modal @close="$emit('close')">
           <h4>Do you really want to delete {{ categoryName }} category permanantly?</h4>
           <button @click="deleteCategory(category.id)">Delete</button>
           <button @click="$emit('close')">Cancel</button>
         </Modal>
       </div>
 
       <div v-show="createCategoryStatus" class="modal-box-three">
         <Modal @close="$emit('close')">
            <div class="modal-box-three-inner">
               <label for="categoryName">Create New Category</label>
               <input type="text" id="categoryName" placeholder="Enter category name..." v-model="categoryName">
               <button @click="createCategory(categoryName)" class="createBtn">Create</button>
            </div>
         </Modal>
       </div>

       <div v-show="editCategoryStatus" class="modal-box-three">
         <Modal @close="$emit('close')">
            <div class="modal-box-three-inner">
               <label for="categoryName">Edit Category</label>
               <input type="text" id="categoryName" placeholder="Enter category name..." v-model="categoryName">
               <button @click="updateCategory(category.id, categoryName)" class="createBtn">Update</button>
            </div>
         </Modal>
       </div>
    </div>
 </template>
 
 <script>
    import Modal from "../AllModals.vue";
    import { mapActions, mapGetters } from "vuex";
    export default {
       name: "ProductModals",
       data () {
          return {
             deleteProductStatus: false,
             createCategoryStatus: false,
             editCategoryStatus: false,
             deleteCategoryStatus: false,
 
             categoryName: "",
             category: {},
             productName: "",
             product: {},

          }
       },
       components: { Modal },
       props: [ "chosenModal", "id" ],
       computed: {
         ...mapGetters("Products", ["getProducts", "getCategories"]),
       },
       methods: {
         ...mapActions("Products", ["deleteProduct", "deleteCategory", "createCategory", "updateCategory"]),
          selectModal (x, y) {
             this.deleteProductStatus= false;
             this.createCategoryStatus= false;
             this.editCategoryStatus= false;
             this.deleteCategoryStatus= false;

             if(y !== null){
               let chosenProduct = this.getProducts.filter(product=>{
                  return product.id === y;
               });

               this.product = chosenProduct[0];
             }
             
             if(x==="createCategory"){
                this.categoryName = "";
                this.createCategoryStatus=true;
                return;
             }
 
             if(x==="deleteProduct"){
                this.deleteProductStatus=true;
                this.productName = this.product.title;
                return;
             }
 
             if(x==="editCategory"){
               this.editCategoryStatus= true;
               let chosenCategory = this.getCategories.filter(category => {
                  return category.id === this.id;
               });
               this.category = chosenCategory[0];              
               this.categoryName = chosenCategory[0].title;
                return;
             }

             if(x==="deleteCategory"){
                this.deleteCategoryStatus=true;
                let chosenCategory = this.getCategories.filter(category => {
                  return category.id === this.id;
                });
                this.category = chosenCategory[0];
                this.categoryName = chosenCategory[0].title;
                return;
             }
          },
          deleteProduct(id){
            this.deleteProduct(id);
            this.$emit('previousPage', "categoryTable");
          },
          deleteCategory(id){
            if(!this.getProducts.some(product => product.category_id === id)){
               this.deleteCategory(id);
               this.$emit("close");
               return;
            }
            this.$emit("close");
          },
          createCategory(categoryTitle){
            let newCategory = {
               "title": categoryTitle
            }
            this.createCategory(newCategory);
            this.$emit("close");
          },
          updateCategory(categoryId, categoryTitle){
            let newCategory = {
               "id": categoryId,
               "title": categoryTitle
            }
            this.updateCategory(newCategory);
            this.$emit("close");
          }
       },
       updated () {
          this.selectModal(this.chosenModal, this.id );
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
    .modal-box-three-inner{
      display: flex;
      flex-direction: column;
    }
    .modal-box-one h4,
    .modal-box-two h4{
        margin-bottom: 10px;
        font-size: 1rem;
     }
   .modal-box-one button,
   .modal-box-two button{
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
   .modal-box-three label{
       margin-bottom: 10px;
       font-size : 1rem;
       color : teal;
       font-weight: 800;
       align-self: flex-start;
   }
   .modal-box-three input{
       margin-bottom: 15px;
       padding : 10px 8px;
       border-radius: 6px;
       border : 1px solid #b3e0dc;
   }
   .modal-box-three .createBtn{
       align-self: flex-end;
       padding : 10px 13px;
       border : none;
       border-radius: 10px;
       background: #4fb9af;
       color: #fff;
       align-self: flex-end;
       transition : all 0.2s;
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
 