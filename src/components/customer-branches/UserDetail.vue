<template>
    <div class="branch">
        <div class="branch-inner">
            <div class="info-box">
                <h3><span>Name</span><span class="icon"><i class="fa-regular fa-user"></i></span><small>-</small><span>{{ user.name }}</span></h3>
                <h3><span>Email</span><span class="icon"><i class="fa-regular fa-envelope"></i></span><small>-</small><span>{{ user.email }}</span></h3>
                <h3><span>Address</span><span class="icon"><i class="fa-regular fa-house"></i></span><small>-</small><span>{{ user.address }}</span></h3>
                <h3><span>Joined at</span><span class="icon"><i class="fa-regular fa-calendar"></i></span><small>-</small><span>{{ user.createdAt }}</span></h3>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
       name: "UserDetail",
       data () {
        return {
            user: {
                name: "",
                email: "",
                address: "",
                createdAt: ""
            }
        }
       },
       props: ["id"], 
       computed: {
            ...mapGetters(["getAllUsers"]),
       },
       methods: {
            setUser () {
                if(this.id!==null){
                    let userData = this.getAllUsers.filter(user=>user.id===this.id);
                    this.user = userData[0];
                }
            }
       },
       updated () {
            this.setUser();
       }
    }
</script>

<style scoped>
    .branch{
        width: 100%;
    }
    .branch-inner{
        margin-top: 10px;
    }
    .info-box{
        padding: 30px 10px 0 10px;
    }
    .info-box h3{
        margin-bottom: 30px;
    }
    .info-box h3 span{
        display: inline-block;
        width: 220px;
        color: #000;
        padding: 5px;
        text-align: start;
        background: #fff;
    }
    .info-box h3 .icon{
        display: none;
        text-align: center;
        width: 50px;
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
        width: 50px;
    }

    /* make it response */
    @media (max-width: 1225px) {
        .branch-inner{
            text-align: center;
        }
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
