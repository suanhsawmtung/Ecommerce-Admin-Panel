<template>
    <div class="detail">
        <h1>Rolex expensive watch</h1>
        <div class="fact-box">
            <span>Category - Watches</span>
            <span>Created_at - Aug 21, 1999 at 7:00 AM</span>
            <span>Updated_at - Oct 22, 1998 at 10:00 AM</span>
        </div>
        <div class="fact-box">
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
    /* .detail .fact-box span:hover{
        box-shadow: 0 0 0 2px #000;
    } */
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
</style>
