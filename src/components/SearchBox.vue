<template>
    <transition name="search-box">
        <div class="searchDataFilter">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "SearchBox",
    }
</script>

<style scoped>
    .searchDataFilter{
        position: fixed;
        top: 50px;
        right: 10px;
        max-width: 400px;
        border-radius: 10px;
        margin: 40px 20px;
        background: #b3e0dc;
        z-index: 70;
    }

    /* backdrop animation */
    .backdrop-enter-from,
    .backdrop-leave-to{
        opacity: 0;
    }
    .backdrop-enter-active,
    .backdrop-leave-active{
        transition: all 0.3s ease;
    }


    /* search animation */
    .search-box-enter-from{
        opacity: 0;
        transform: scale(0.8);
    }
    .search-box-leave-to{
        opacity: 0;
    }
    .search-box-enter-active{
        transition: all 0.3s ease 0.15s;
    }
    .search-box-leave-active{
        transition: all 0s ease ;
    }

    /* make it response */
    @media (max-width : 550px) {
        .searchDataFilter{
            max-width: 300px;
            margin: 40px 10px;
        }
    }
</style>
