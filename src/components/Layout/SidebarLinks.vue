<script setup lang="ts">
interface LinkProp {
  title: string
  to?: string
  icon: string
}

defineProps<{
  links: LinkProp[]
}>()

const emits = defineEmits<{
  actionClicked: [string]
}>()

const handleClick = (title: string) => {
  emits('actionClicked', title)
}
const { menuOpen } = useMenu()
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink v-if="link.to" exactActiveClass="text-primary bg-muted" :to="link.to" class="nav-link"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">{{ link.title }}</span>
    </RouterLink>

    <div v-else class="nav-link cursor-pointer" :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
      @click="handleClick(link.title)">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">{{ link.title }}</span>
    </div>
  </template>
</template>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground;
}
</style>