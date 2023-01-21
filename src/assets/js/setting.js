import axios from "axios";
import { mapGetters, mapActions } from 'vuex';
import TopBar from "../../components/TopBar.vue";
import Modal from "../../components/AllModals.vue";
import Profile from "../../components/setting-branches/ProfileSetting.vue";
export default {
    name: 'CategoryPage',
    data() {
        return {

            /* These Status Use To Choose Which Modal To Show */
            nameStatus: false,
            emailStatus: false,
            phoneStatus: false,
            passwordStatus: false,

            /* All Error Messages Show Or Hide Control With These Status */
            nameError: false,
            nameCountError: false,
            emailError: false,
            phoneError: false,
            oldPasswordError: false,
            newPasswordError: false,
            newCountError: false,
            confirmationError: false,
            passwordChangeStatus: false,

            /* Toast Alert Show And Toast Message */
            toastStatus: false,
            toastMessage: "",

            /* Use To Bind Data With Input */
            name: "",
            email: "",
            phone: "",
            oldPassword: "",
            newPassword: "",
            password_confirmation: ""
        }
    },
    components: { TopBar, Profile, Modal },
    computed: {
        ...mapGetters(["getToggleStatus", "getMyProfileData"]),
    },
    methods: {
        ...mapActions(["updateUser"]),

        /* Change My Profile Name */
        changeName() {
            this.clearValidationMessage();

            if (this.name !== "") {
                this.getMyProfileData.name = this.name;
                this.updateUser(this.getMyProfileData);
            } else if (this.name === "") {
                this.nameError = true;
                return;
            } else if (this.name.length < 5) {
                this.nameCountError = true;
                return;
            }

            this.modalToggle("name");
            this.name = "";

            this.toastMessage = "Changed name successfully.";
            setTimeout(() => this.toastStatus = true, 1000);
            setTimeout(() => this.toastStatus = false, 3000);
        },

        /* Change My Profile Email */
        changeEmail() {
            this.clearValidationMessage();
            if (this.email !== "") {
                this.getMyProfileData.email = this.email;
                this.updateUser(this.getMyProfileData);
            } else {
                this.emailError = true;
                return;
            }
            this.modalToggle("email");
            this.email = "";
            this.toastMessage = "Changed email successfully.";
            setTimeout(() => this.toastStatus = true, 1000);
            setTimeout(() => this.toastStatus = false, 3000);
        },

        /* Change My Profile Phone Number */
        changePhone() {
            this.clearValidationMessage();
            if (this.phone !== "") {
                this.getMyProfileData.phone = this.phone;
                this.updateUser(this.getMyProfileData);
            } else {
                this.phoneError = true;
                return;
            }
            this.modalToggle("phone");
            this.phone = "";
            this.toastMessage = "Changed phone number successfully.";
            setTimeout(() => this.toastStatus = true, 1000);
            setTimeout(() => this.toastStatus = false, 3000);
        },

        /* Change New Password */
        changePassword() {
            this.clearValidationMessage();
            this.passwordValidation();
            if (this.passwordChangeStatus) {
                let data = {
                    id: this.getMyProfileData.id,
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword
                }
                axios.post("http://localhost:8000/api/user/changePassword", data);
                this.modalToggle("password");
                this.toastMessage = "Changed password successfully.";
                setTimeout(() => this.toastStatus = true, 1000);
                setTimeout(() => this.toastStatus = false, 3000);
            }
        },

        /* Choose, Show Or Hide Modal */
        modalToggle(status) {
            if (status === "name") {
                this.nameStatus = !this.nameStatus;
                this.name = "";
                this.clearValidationMessage();
                return;
            }
            if (status === "email") {
                this.emailStatus = !this.emailStatus;
                this.email = "";
                this.clearValidationMessage();
                return;
            }
            if (status === "phone") {
                this.phoneStatus = !this.phoneStatus;
                this.phone = "";
                this.clearValidationMessage();
                return;
            }
            if (status === "password") {
                this.passwordStatus = !this.passwordStatus;
                this.oldPassword = "";
                this.newPassword = "";
                this.password_confirmation = "";
                this.clearValidationMessage();
                return;
            }
        },

        /* Validation For Password Changing */
        passwordValidation() {
            if (this.oldPassword === "") {
                this.oldPasswordError = true;
                return;
            }
            if (this.newPassword === "") {
                this.newPasswordError = true;
                return;
            }
            if (this.newPassword.length < 7) {
                this.newCountError = true;
                return;
            }
            if (this.password_confirmation !== this.newPassword) {
                this.confirmationError = true;
                return;
            }
            this.passwordChangeStatus = true;
        },

        /* Clear All Validation Data */
        clearValidationMessage() {
            this.nameError = false;
            this.nameCountError = false;
            this.emailError = false;
            this.phoneError = false;
            this.oldPasswordError = false;
            this.newPasswordError = false;
            this.newCountError = false;
            this.confirmationError = false;
            this.passwordChangeStatus = false;
        }
    },
}