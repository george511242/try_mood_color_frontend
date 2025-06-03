<template>
  <v-dialog max-width="480" transition="dialog-transition">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="pink-lighten-4"
        class="font-weight-medium px-4"
        rounded="xl"
        elevation="1"
        variant="flat"
      >
        💡 A sentence for you today
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card elevation="6" class="rounded-xl pa-4">
        <v-card-title class="text-h6 font-weight-bold mb-2">
          🌟 Something for you
        </v-card-title>
        <v-card-text class="text-body-1 text-grey-darken-2">
          <slot name="content" />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn
            color="primary"
            variant="text"
            class="text-capitalize"
            @click="isActive.value = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogBox",
};
</script>

<style scoped>
.dialog-transition-enter-active,
.dialog-transition-leave-active {
  transition: all 0.3s ease;
}
.dialog-transition-enter-from,
.dialog-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
