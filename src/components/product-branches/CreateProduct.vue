<template>
    <div class="createProduct">
        <div class="form">
            <h4 class="title">Create New Product</h4>
            <div class="form-body">
                <div class="item item3">
                    <label for="price">Product Price</label>
                    <input type="number" class="inputField" id="price" v-model="product.price" placeholder="Enter product price" >
                </div>

                <div class="item item1">
                    <label for="name">Product Name</label>
                    <input type="text" class="inputField" id="name" v-model="product.title" placeholder="Enter product name..."/>
                </div>
                
                <div class="item item2">
                    <label for="category">Product Category</label>
                    <select class="inputField" id="category" v-model="product.category">
                        <option  value="" class="opt" :selected="true">Choose category</option>
                        <option class="opt" v-for="(category, index) in $store.getters.getCategories" :key="index" :value="category.id">{{ category.title }}</option>
                    </select>
                </div>
                
                <div class="item item4">
                    <label for="image"><i class="fa-solid fa-plus"></i>Choose a photo</label>
                    <input type="file" class="inputField" id="image" placeholder="Choose product image" @change="selectImage">
                </div>

                <div class="item item5">
                    <label for="description">Product Description</label>
                    <textarea class="inputField" id="description" cols="30" rows="10" v-model="product.description" placeholder="Enter product description" ></textarea>
                </div>

                <div class="item6">
                     <button type="button" class="btn" @click="createNewProduct()">Create</button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name : "CreateProduct",
        data () {
            return {
                product: {
                    title : " ",
                    category : "",
                    price : " ",
                    image : null,
                    description : " "
                }
            }
        },
        methods: {
            // selectImage (event) {
            //     this.product.image = event.target.files[0];
            // },
            // createNewProduct(){
            //     let formData = new FormData();
            //     formData.append("title", this.product.title);
            //     formData.append("category", this.product.category);
            //     formData.append("price", this.product.price);
            //     formData.append("image", this.product.image);
            //     formData.append("description", this.product.description);
                
            //     this.$store.dispatch("createProduct", formData);
            //     this.clearProductData();    
            //     this.$emit("previousPage", "productTable");
            // },
            // clearProductData (){
            //     this.product.title = "";
            //     this.category= "";
            //     this.price = "";
            //     this.image= null;
            //     this.description= "";
            // }
        },
    }
</script>

<style scoped>
    .createProduct{
        width: 100%;
    }
    .form{
        width: 90%;
        display: flex;
        flex-direction: column;
        margin: 0 auto 12px auto;
    }
    .form .title{
        width: 100%;
        text-align: center;
        margin : 10px 0 10px 0;
        padding : 15px 0;
        font-size: 1.1rem;
        background: teal;
        color: #fff;
    }
    .item1{grid-area: one; }
    .item2{grid-area: two;}
    .item3{grid-area: three; }
    .item4{grid-area: four;}
    .item5{grid-area: five ; }
    .item6{grid-area: six; }
    .form-body{
        display: grid;
        grid-template-areas: 'three three five five' 'one one five five' 'two two five five' 'four four six six' ;
        grid-template-columns: auto auto auto auto;
        gap: 10px;
    }
    .form-body .item{
        position: relative;
        display: flex;
        flex-direction: column;
        padding : 0 10px;
    }
    .form-body .item label{
        margin: 6px 0 5px 0;
    }
    .form-body .item .inputField{
        padding : 10px 8px;
        border-radius: 6px;
        border : 1px solid #b3e0dc;
    }
    .form-body .item2 .inputField .opt{
        color: teal;
        font-size: 1rem;
    }
    .form-body .item4 label{
        margin-top : 15px;
        padding : 10px 8px;
        border-radius: 6px;
        border : 1px solid #b3e0dc;
    }
    .form-body .item4 label i{
        margin-right: 10px;
        opacity: 0.8;
    }
    .form-body .item4 .inputField[type="file"]{
        display: none;
    }
    .form-body .item6 .btn{
        width : 100%;
        margin : 15px 8px 0 8px;
        padding : 10px 0;
        border-radius: 5px;
        font-size: 1rem;
        color:#fff;
        background: teal;
        border-style: none;
        cursor : pointer;
        transition: 0.5s;
    }
    .form-body .item .inputField:focus{
        border : 2px solid #4fb9af;
    }
    .form-body .item6 .btn:active{
        transform : scale(0.95);
        background: #4fb9af;
    }


    /* make it responsive */
    @media (max-width: 991px) {
        .form{
            width: 96%;
        }
        .form .title{
            margin : 8px 0 8px 0;
            padding : 10px 0;
            font-size: 1rem;
        }
        .form-body .item .inputField,
        .form-body .item4 label{
            padding : 7px 5px;
        }
        .form-body .item label,
        .form-body .item4 label,
        .form-body .item6 .btn{
            font-size: 0.9rem;
        }
        .form-body .item6 .btn{
            width : 96%;
            margin : 12px 8px 0 8px;
            padding : 7px 0;
        }
    }
    @media (max-width : 768px) {
        .form .title{
            margin : 5px 0 5px 0;
            padding : 8px 0;
            font-size: 0.9rem;
        }
        .form-body .item .inputField,
        .form-body .item4 label{
            padding : 5px 4px;
        }
        .form-body .item label,
        .form-body .item4 label,
        .form-body .item6 .btn{
            font-size: 0.8rem;
        }
        .form-body .item6 .btn{
            width : 96%;
            padding : 7px 0;
        }
    }
    @media (max-width : 650px) {
        .form-body{
            grid-template-areas: 'three three' 'one one' 'two two' 'four four' 'five five' '. six' ;
            grid-template-columns: auto auto;
            gap: 7px;
        }
    }
</style>
