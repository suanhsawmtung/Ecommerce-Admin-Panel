<template>
   <div>
      <div class="modal-box-two">
        <Modal @close="$emit('close')">
          <div class="info-box">
                <h3><span>Name</span><span class="icon"><i class="fa-regular fa-user"></i></span><small>-</small><span>{{ user.name }}</span></h3>
                <h3><span>Email</span><span class="icon"><i class="fa-regular fa-envelope"></i></span><small>-</small><span>{{ user.email }}</span></h3>
                <h3><span>Phone</span><span class="icon"><i class="fa-solid fa-mobile-screen"></i></span><small>-</small><span>{{ user.phone }}</span></h3>
                <h3><span>Joined at</span><span class="icon"><i class="fa-regular fa-calendar"></i></span><small>-</small><span>-</span></h3>
            </div>
        </Modal>
      </div>
   </div>
</template>

<script>
import Modal from "../AllModals.vue";
export default {
  name: "DetailModal",
  components: { Modal },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  
}
</script>

<style scoped>
   .modal-box-one,
   .modal-box-two,
   .modal-box-three{
      width: 100vw;
      height: 100vh;
   }
    .info-box h3{
        margin-bottom: 30px;
    }
    .info-box h3 span{
        display: inline-block;
        width: 200px;
        color: #000;
        padding: 5px;
        text-align: start;
        background: #fff;
        /* border: 1px solid #000; */
    }
    .info-box h3 .icon{
        display: none;
        text-align: center;
        width: 30px;
    }
    .info-box h3 span:nth-child(1){
        display: inline-block;
        width: 100px;
        color: #000;
        padding: 5px;
        text-align: start;
        background: #fff;
    }
    .info-box h3 small{
        display: inline-block;
        text-align: center;
        width: 30px;
    }

    /* make it response */
    @media (max-width: 1225px) {
        .info-box{
            width: 600px;
            margin: 10px auto;
        }
        .info-box{
            text-align: start;
        }
    }
    @media (max-width: 991px) {
        .info-box h3 span{
           font-size: 1rem; 
        }
        .info-box h3 span:nth-child(1){
            font-size: 1rem;
        }
        .info-box h3 small{
           font-size: 1rem;
        }
    }
    @media (max-width: 768px) {
        .info-box{
            width: 100%;
            margin: 10px ;
        }
        .info-box h3 span{
           font-size: 0.8rem; 
        }
        .info-box h3 span:nth-child(1){
            font-size: 0.8rem;
        }
        .info-box h3 small{
           font-size: 0.8rem;
        }
    }
    @media (max-width: 520px) {
        .info-box{
            width: 100%;
            margin: 5px;
        }
        .info-box h3 span{
           font-size: 0.8rem; 
        }
        .info-box h3 span:nth-child(1){
            display: none;
        }
        .info-box h3 small{
           display: none;
        }
        .info-box h3 .icon{
            display: inline-block;
            text-align: center;
            width: 50px;
        }
    }
    @media (max-width: 350px) {
        .info-box{
            width: 100%;
            margin: 3px;
        }
        .info-box h3 .icon{
            width: 20px;
        }
        .info-box h3 span{
            width: 90%;
            padding: 5px;
        }
    }
</style>
