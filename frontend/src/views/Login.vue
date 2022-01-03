<template>
              <div class="login">
    <img alt="Vue logo" src="../assets/logo.png">
    <Formular message='VOILA TON MESSAGE'/>
  </div>
</template>


<script>
import Formular from '@/components/FormLoginOrSignup.vue'

export default {
name: 'Login',
components: {
    Formular
}
}
</script>