<template>
    <div>
        <header>
            <h1>General Profile Setting</h1>
        </header>
        <ul>
            <li>
                <h3><i class="fa-solid fa-user"></i>{{ getMyProfileData.name }}</h3>
                <div class="btn-box">
                    <button @click="$emit('showModal', 'name')">Change</button>
                </div>
            </li>
            <li>
                <h3><i class="fa-solid fa-envelope"></i>{{ getMyProfileData.email }}</h3>
                <div class="btn-box">
                    <button @click="$emit('showModal', 'email')">Change</button>
                </div>
            </li>
            <li>
                <h3><i class="fa-solid fa-phone"></i>{{ getMyProfileData.phone }}</h3>
                <div class="btn-box">
                    <button @click="$emit('showModal', 'phone')">Change</button>
                </div>
            </li>
        </ul>
        <footer>
            <button type="button" class="btn" @click="$emit('showModal', 'password')">Change Password</button>
        </footer>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "ProfileSetting",
        computed: {
            ...mapGetters(["getMyProfileData"]),
        },
    }
</script>

<style scoped>
    ul, header{
        margin: 30px auto;
        padding: 0;
        max-width: 600px;
    }
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    ul li{
        list-style-type: none;
        background: #b3e0dc;
        padding: 16px;
        margin: 16px 0;
        border-radius: 4px;
    }
    ul li h3{
        margin: 0 0 10px; 
    }
    ul li h3 i{
        margin-right: 15px; 
    }
    header h1{
        text-transform : uppercase;
        color: teal;
    }
    ul li .btn-box button,
    header button,
    footer button{
        margin: 0 10px 0 0;
        padding: 8px;
        border: none;
        border-radius: 2px;
        background: #4fb9af;
        transition: 0.2s;
    }
    ul li .btn-box button:active,
    header button:active,
    footer button:active{
        transform: scale(0.9);
    }
    footer{
        margin: 30px auto;
        padding: 0;
        max-width: 600px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

     /* make it response */
     @media (max-width: 750px) {
        ul, header{
            max-width: 450px;
        }
    }

    @media (max-width: 600px) {
        ul, header{
            max-width: 400px;
        }
        header h1{
            font-size: 1.5rem;
        }
    }
    @media (max-width: 510px) {
        ul, header{
            max-width: 300px;
        }
    }
</style>
