<template>
  <div ref="calendarRef" class="calendar-wrapper">
    <div :id="calendarId"></div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { Calendar } from "vanilla-calendar-pro";
import "vanilla-calendar-pro/styles/index.css";

export default {
  name: "CalenderView",
  emits: ["update:date"],
  setup(props, { emit }) {
    const calendarRef = ref(null);
    const calendarId = `calendar-${Math.random().toString(36).substring(2, 8)}`;
    let calendarInstance = null;

    const initCalendar = () => {
      calendarInstance = new Calendar(`#${calendarId}`, {
        settings: {
          lang: "en",
          selection: {
            day: "single",
          },
          visibility: {
            weekend: true,
          },
        },
        onClickDate(self) {
          const selected = self.context.selectedDates?.[0];
          emit("update:date", selected);
        },
      });
      calendarInstance.init();
    };

    onMounted(async () => {
      await nextTick(); // 等待 DOM 建立完畢
      initCalendar();
    });

    onBeforeUnmount(() => {
      // 如果未來需要清理資源，可擴充這裡
      calendarInstance = null;
    });

    return {
      calendarRef,
      calendarId,
    };
  },
};
</script>

<style scoped>
.calendar-wrapper {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  padding: 20px;
  max-width: 420px;
  margin: 0 auto;
}

#calendar {
  --vc-font-family: 'Inter', sans-serif;
  --vc-accent-color: #1976d2;
  --vc-today-color: #fdd835;
  --vc-radius: 12px;
  --vc-day-border-radius: 10px;
}
</style>
