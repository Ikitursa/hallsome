<template>
  <div class="list-tag">{{ label }}</div>
</template>

<script>
export default {
  name: "Tag",

  props: {
    label: {
      required: true,
      type: [String, Number]
    }
  }
}
</script>