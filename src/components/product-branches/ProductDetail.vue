<template>
    <div class="detail">
        <h1>Rolex expensive watch</h1>
        <div class="fact-box box-one">
            <span>Category - Watches</span>
            <span>Created_at - Aug 21, 1999 at 7:00 AM</span>
            <span>Updated_at - Oct 22, 1998 at 10:00 AM</span>
        </div>
        <div class="fact-box box-two">
            <span>30000 Ks</span>
            <span><i class="fa-regular fa-eye"></i> - 200</span>
            <span><i class="fa-regular fa-heart"></i> - 50</span>
            <span><i class="fa-regular fa-message"></i> - 20</span>
        </div>
        <div class="box-three">
            <div class="img-box"></div>
            <div class="descripton-box">
                <h3>Description</h3>
                <p> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProductDetail.vue",
    }
</script>

<style scoped>
    .detail{
        width: 100%;
        padding: 5px 15px;
    }
    .detail h1{
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
        border-radius: 10px;
        overflow: hidden;
    }
    .detail .box-three .img-box .img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 200ms;
    }
    .detail .box-three .img-box .img:hover{
        transform: scale(1.2);
    }
    .detail .box-three .descripton-box{
        border: 2px solid teal;
        padding: 10px;
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
            grid-template-columns: 1fr;
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
        .detail h1{
           font-size: 1.5rem;
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
