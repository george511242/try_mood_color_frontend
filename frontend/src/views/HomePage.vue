<template>
  <v-app>
    <SideBar>
      <v-container class="py-8">
        <!-- Header 區塊 -->
        <v-row class="d-flex justify-space-between align-center mb-6">
          <DialogBox>
            <template #content>
              <p>{{ geminiComment }}</p>
            </template>
          </DialogBox>
          <v-avatar color="red" size="48">
            <span class="text-h6 font-weight-bold">CJ</span>
          </v-avatar>
        </v-row>

        <!-- 行事曆與顏色 -->
        <v-row class="mb-8" justify="space-between">
          <v-col cols="12" md="6">
              <CalenderView @update:date="fetchColorForDate" />
          </v-col>

          <v-col cols="12" md="6" class="d-flex justify-center align-center">
            <ColorCircle :date="parentPickedDate" :color="color" :text="text" />
          </v-col>
        </v-row>

        <!-- 日記輸入 -->
        <v-row>
          <v-col cols="12">
            <v-card class="pa-6" elevation="3" rounded="xl">
              <h2 class="mb-4 text-h5">📝 日記記錄 - {{ parentPickedDate }}</h2>
              <v-textarea
                v-model="journalText"
                label="分享一下今天的心情吧"
                variant="outlined"
                auto-grow
                counter
                maxlength="500"
                rows="8"
              />
              <v-btn
                :loading="isLoading"
                color="primary"
                class="mt-4"
                @click="submitJournal"
              >
                <template #loader>
                  <v-progress-circular indeterminate color="white" size="20" />
                </template>
                Submit
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </SideBar>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SideBar from "../components/SideBar.vue";
import CalenderView from "../components/Calender.vue";
import DialogBox from "../components/Dialogs.vue";
import ColorCircle from "../components/ColorCircle.vue";
import api from "@/api";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const userId = ref(null);
const isLoading = ref(false);

const parentPickedDate = ref("");
const journalText = ref("");
const color = ref("");
const text = ref("");
const geminiComment = ref("");

// 初始載入
onMounted(() => {
  userStore.loadUserId();
  userId.value = userStore.userId;

  if (!userId.value) {
    alert("用戶尚未登入");
  }

  const today = new Date();
  parentPickedDate.value = today.toISOString().split("T")[0];
  fetchColorForDate(parentPickedDate.value);
});

// 抓顏色
const fetchColorForDate = async (selectedDate) => {
  parentPickedDate.value = selectedDate;
  try {
    isLoading.value = true;
    const response = await api.get(`/api/mood_tree_color/${userId.value}/${selectedDate}`);
    const data = response.data;

    if (response.status !== 200 || !data?.hex || !data?.content_text) {
      alert("尚未填寫顏色資料！");
      return;
    }

    color.value = response.data.hex;
    text.value = response.data.content_text;

    localStorage.setItem("lastColor", color.value);
    localStorage.setItem("lastText", text.value);
  } catch (error) {
    console.error("獲取顏色失敗:", error);
    alert("今天還沒留下日記唷！");
  } finally {
    isLoading.value = false;
  }
};

// 提交日記
const submitJournal = async () => {
  try {
    if (!journalText.value) {
      alert("請記錄些東西再送出吧");
      return;
    }
    isLoading.value = true;

    const formData = new FormData();
    formData.append("user_id", userId.value);
    formData.append("entry_date", parentPickedDate.value);
    formData.append("content_text", journalText.value);
    formData.append("mood_icon_code", "string");

    const response = await api.post("/api/Post_diary_entry", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.status === "success") {
      color.value = response.data.diary_entry.hex_color_code;
      geminiComment.value = response.data.gemini_comment;
      text.value = journalText.value;
      localStorage.setItem("lastColor", color.value);
      alert("日記上傳成功");
    } else {
      alert("發生錯誤：" + response.data.message);
    }
  } catch (error) {
    console.error("發生錯誤:", error);
    alert("發生錯誤，請稍後再試");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.v-container {
  max-width: 1200px;
  margin: 0 auto;
}
.v-card {
  background-color: #ffffff;
  border-radius: 16px;
}
.v-avatar {
  border: 2px solid white;
  box-shadow: 0 0 0 2px #f44336;
}
</style>
