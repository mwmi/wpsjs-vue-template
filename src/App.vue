<template>
  <RouterView />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import ribbon from './ribbon.js'

const message = ref('你好，wps加载项')
onMounted(() => {
  window.ribbon = ribbon
})
</script>
