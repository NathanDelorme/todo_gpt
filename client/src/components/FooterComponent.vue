<template>
  <div class="container" style="color:#201f20">
    <footer class="py-3 my-4">
      <p class="text-center">© {{ year }} MNJ</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
