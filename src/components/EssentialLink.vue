<template>
<QItem
  clickable
  :to="{name: to}"
>
  <QItemSection
    v-if="icon"
    avatar
  >
    <QIcon :name="icon" />
  </QItemSection>

  <QItemSection>
    <QItemLabel>{{ title }}</QItemLabel>
  </QItemSection>
</QItem>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    to: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>
