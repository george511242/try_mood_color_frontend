<template>
  <v-app>
    <!-- 上方 ToolBar -->
    <v-app-bar app color="white" elevation="2" class="px-4">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-img
        src="@/assets/logo.png"
        max-width="36"
        max-height="36"
        class="ml-2"
        contain
      ></v-img>
      <v-toolbar-title class="text-h6 font-weight-bold ml-3">
        Your Mood Color Journey
      </v-toolbar-title>
    </v-app-bar>

    <!-- 側邊欄 Drawer -->
    <v-navigation-drawer app v-model="drawer" elevation="3">
      <v-list dense nav>
        <v-list-item
          @click="goTo('/home')"
          class="nav-item"
        >
          <v-icon class="mr-3">mdi-home</v-icon>
          <span>Home</span>
        </v-list-item>

        <v-list-item
          @click="goTo('/analysis')"
          class="nav-item"
        >
          <v-icon class="mr-3">mdi-chart-bar</v-icon>
          <span>Analysis</span>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- 主內容區域 -->
    <v-main class="bg-grey-lighten-4">
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AppSidebar", // ✅ 避免 ESLint 問題
  setup() {
    const drawer = ref(false);
    const router = useRouter();

    const goTo = (path) => {
      router.push(path);
    };

    return {
      drawer,
      goTo,
    };
  },
};
</script>

<style scoped>
.nav-item {
  padding: 12px 16px;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
}
.nav-item:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
