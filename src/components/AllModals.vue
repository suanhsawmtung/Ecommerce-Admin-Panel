<template>
    <div class="backdrop" name="backdrop" @click.self="$emit('close')">
        <div class="modal" name="modal">
            <slot></slot>
        </div>
    </div>
 </template>
 
 <script>
    export default {
        name: "CustomerModals",
    }
 </script>
 
 <style scoped>
 .backdrop{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 60;
 }
 .modal{
    width: 400px;
    padding: 30px;
    text-align: center;
    background: #fff;
    color: #000;
    border-radius: 10px;
 }
.backdrop-enter-from,
.backdrop-leave-to{
    opacity: 0;
}
.backdrop-enter-active,
.backdrop-leave-active{
    transition: all 0.3s ease;
}

.modal-enter-from{
    opacity: 0;
    transform: scale(0.8);
}
.modal-leave-to{
    transform: scale(0.8);
}
.modal-enter-active{
    transition: all 0.3s ease 0.15s;
}
.modal-leave-active{
    transition: all 0.3s ease ;
}

/* make it response */
@media (max-width : 680px) {
    .modal{
        width: 280px;
        padding: 15px;
    }
}
@media (max-width : 475px) {
    .modal{
        width: 250px;
        padding: 12px;
        margin: auto;
    }
}

 </style>
 
