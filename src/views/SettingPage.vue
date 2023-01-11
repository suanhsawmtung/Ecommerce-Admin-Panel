<template>
    
    <div class="setting">
        <h1>setting</h1>
        <teleport to="#modals" >
            <div v-if="modalOne" class="modal">
                <div>Hello world</div>
            </div>
        </teleport>
        <button @click="modalOne = !modalOne">modal 1</button>
    </div>
 </template>
 
 <script>
    export default {
        name : 'SettingPage',
        data () {
            return {
                modalOne: false,
            }
        },
    }
 </script>
 
 <style scoped>
    .setting{
        margin-left: 400px;
    }
    .modal{
        margin-left: 600px;
    }
 </style>
 