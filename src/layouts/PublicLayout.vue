<template>
<QLayout view="lHh Lpr lFf">
  <QPageContainer>
    <RouterView />
  </QPageContainer>
</QLayout>
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PublicLayout',

  components: {
  },

  setup () {
    return {

    }
  }
})
</script>
