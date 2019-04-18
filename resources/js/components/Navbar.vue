<template>
    <nav class="navbar">
        <router-link class="navbar__brand" to="/">
            Vuesplash
        </router-link>
        <div class="navbar__menu">
            <div v-if="isLogin" class="navbar__item">
                <button class="button" v-on:click="showForm = !showForm">
                    <i class="icon ion-md-add"></i>
                    Submit a photo
                    <PhotoForm v-model="showForm" />
                </button>
            </div>
            <span v-if="isLogin" class="navbar__item">
                {{ username }}
            </span>
            <div v-else class="navbar__item">
                <router-link class="button button--link" to="/login">
                    Login / Register
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import PhotoForm from './PhotoForm.vue'
export default {
    components: {
        PhotoForm
    },
    data () {
        return {
            showForm: false
        }
    },
    computed: {
        isLogin () {
            return this.$store.getters['auth/check']
        },
        username () {
            return this.$store.getters['auth/username']
        }
    }
}
</script>