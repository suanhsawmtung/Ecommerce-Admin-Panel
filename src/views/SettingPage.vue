<template>
    <div class="branch-parent">

        <!-- Toast Alert -->
        <transition name="toast">
            <div class="toast" v-show="toastStatus">
                <h3 >{{ toastMessage }}</h3>
            </div>
        </transition>
        <!-- Toast Alert End -->

        <!-- Edit Name Modal -->
        <div v-show="nameStatus" class="name-modal">
             <Modal @close="modalToggle('name')">
                
                <label for="name">Change your name</label>
                <input type="text" id="name" placeholder="Enter new name..." v-model="name">
                
                <!-- Validation Messages -->
                <small style="color: red" v-show="nameError">User name is required.</small>
                <small style="color: red" v-show="nameCountError">User name require at least 5 chracters.</small>
                
                <!-- Button Box -->
                <div class="btn-box">
                    <button @click="changeName()" >Change</button>
                    <button @click="modalToggle('name')">Cancel</button>
                </div>

             </Modal>
        </div>
        <!-- Edit Name Modal End -->

        <!-- Edit Email Modal -->
        <div v-show="emailStatus" class="email-modal">
             <Modal @close="modalToggle('email')">
                
                <label for="email">Change your email</label>
                <input type="email" id="email" placeholder="Enter new email..." v-model="email">

                <!-- Validation Message -->
                <small style="color: red" v-show="emailError">User email is required.</small>
                
                <!-- Button Box -->
                <div class="btn-box">
                    <button @click="changeEmail()" >Change</button>
                    <button @click="modalToggle('email')">Cancel</button>
                </div>

             </Modal>
        </div>
        <!-- Edit Email Modal End -->

        <!-- Edit Phone Modal -->
        <div v-show="phoneStatus" class="phone-modal">
             <Modal @close="modalToggle('phone')">
                
                <label for="phone">Change your phone number</label>
                <input type="text" id="phone" placeholder="Enter new phone..." v-model="phone">
                
                <!-- Validation Message -->
                <small style="color: red" v-show="phoneError">User phone is required.</small>
                
                <!-- Button Box -->
                <div class="btn-box">
                    <button @click="changePhone()" >Change</button>
                    <button @click="modalToggle('phone')">Cancel</button>
                </div>

             </Modal>
        </div>
        <!-- Edit Phone Modal End -->

        <!-- Edit Password Modal -->
        <div v-show="passwordStatus" class="password-modal">
             <Modal @close="modalToggle('password')">
                
                <label for="oldPassword">Change your password</label>
                <input type="password" id="oldPassword" placeholder="Enter old password..." v-model="oldPassword">

                <!-- Old Password Validation Message -->
                <small style="color: red" v-show="oldPasswordError">Old password is required.</small>
                
                <input type="password" id="newPassword" placeholder="Enter new password..." v-model="newPassword">

                <!-- New Password Validation Message -->
                <small style="color: red" v-show="newPasswordError">New password is required.</small>
                <small style="color: red" v-show="newCountError">Password require at least 7 chracters.</small>
                
                <input type="password" id="confirmPassword" placeholder="Confirm your password..." v-model="password_confirmation">

                <!-- Confirm Password Validation Message -->
                <small style="color: red" v-show="confirmationError">Confirm password does not match.</small>
                
                <!-- Button Box -->
                <div class="btn-box">
                    <button @click="changePassword()" >Change</button>
                    <button @click="modalToggle('password')">Cancel</button>
                </div>

             </Modal>
        </div>
        <!-- Edit Password Modal End -->
        
        <!-- Main -->
        <div class="main" :class="{ 'toggleWidth':getToggleStatus}">

            <!-- Top Bar -->
            <TopBar></TopBar>

            <!-- My Profile Component -->
            <Profile @showModal="modalToggle" />

        </div>
        <!-- Main End -->

    </div>
</template>

<script src="../assets/js/setting.js"></script>

<style src="../assets/css/setting.css" scoped></style>

