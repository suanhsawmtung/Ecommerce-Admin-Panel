<template>
    <div class="detail">
        <h2>{{ product.title }}</h2>
        <div class="fact-box box-one">
            <span>Category - {{ product.category_title }}</span>
            <span>Created_at - {{ product.createdAt }}</span>
            <span>Updated_at - {{ product.updatedAt }}</span>
        </div>
        <div class="fact-box box-two">
            <span>{{ product.price }} Ks</span>
            <span><i class="fa-regular fa-eye"></i> - {{ product.count }}</span>
            <span><i class="fa-solid fa-star"></i> - *</span>
            <span><i class="fa-solid fa-star"></i> - {{ product.count }}</span>
        </div>
        <div class="box-three">
            <div class="img-box">
                <img :src="product.image" alt="">
            </div>
            <div class="descripton-box">
                <h3>Description</h3>
                <p>{{ product.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductDetail.vue",
    props: ['product'],
}
</script>

<style scoped>
    .detail{
        width: 100%;
        padding: 5px 15px;
    }
    .detail h2{
        color: teal;
        margin-bottom: 12px;
    }
    .detail .fact-box{
        padding: 5px 0px;
        margin-bottom: 15px;
    }
    .detail .fact-box span{
        margin: 0 0 0 10px;
        padding: 8px 12px;
        border-radius: 5px;
        background: teal;
        color: #fff;
        pointer-events: none;
        transition: 0.5s;
    }
    .detail .box-three{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }
    .detail .box-three .img-box{
        height: 250px;
    }
    .detail .box-three .img-box img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: 200ms;
    }
    .detail .box-three .img-box .img:hover{
        transform: scale(1.2);
    }
    .detail .box-three .descripton-box{
        border: 2px solid teal;
        padding: 10px;
        height: 250px;
    }
    .detail .box-three .descripton-box h3{
        color: teal;
        margin-bottom: 10px;
    }
    /* make it response */
    @media (max-width: 1110px) {
        .box-one{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .detail .box-one span{
            width: 300px;
            margin: 5px 10px;
        }
    }
    @media (max-width: 991px) {
        .detail{
            width: 80%;
            margin: 0 auto;
            padding: 5px 15px;
        }
        .detail .box-one span{
            width: 95%;
            margin: 5px 10px;
        }
        .detail .box-two{
            width: 95%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, auto));
            gap: 12px;
        }
        .detail .box-two span{
            width: 100%;
            text-align: center;
        }
        .detail .box-three{
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            padding: 8px 12px ;
        }
    }
    @media (max-width: 680px) {
        .detail{
            width: 100%;
            padding: 5px 0;
        }
    }
    @media (max-width: 620px) {
        .detail h2{
           font-size: 1.2rem;
           margin-bottom: 6px;
        }
        .detail .fact-box{
            margin-bottom: 6px;
        }
        .detail .fact-box span{
            font-size: 1rem;
            padding: 6px 8px;
        }
        .detail .box-three{
            gap: 6px;
        }
        .detail .box-three .descripton-box{
            border: 1px solid teal;
            padding: 8px;
        }
        .detail .box-three .descripton-box h3{
            margin-bottom: 6px;
            font-size: 1.2rem;
        }
        .detail .box-three .descripton-box p{
            margin-bottom: 6px;
            font-size: 0.75rem;
        }
    }
</style>
