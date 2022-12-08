<template>
    <transition name="modal-animation">
        <div class="backdrop" @click.self="$emit('close')">
            <transition name="modal-animation-inner">
                <div class="modal" name="modal">
                    <slot></slot>
                </div>
            </transition>
        </div>
    </transition>
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
.modal-animation-enter-from,
.modal-animation-leave-to{
    opacity: 0;
}
.modal-animation-enter-active,
.modal-animation-leave-active{
    transition: all 0.3s ease;
}

.modal-animation-inner-enter-from{
    opacity: 0;
    transform: scale(0.8);
}
.modal-animation-inner-leave-to{
    transform: scale(0.8);
}
.modal-animation-inner-enter-active{
    transition: all 0.3s ease 0.15s;
}
.modal-animation-inner-leave-active{
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
 
