<script setup lang="ts">
import { ref } from 'vue';
import HeaderNav from './components/HeaderNav.vue';
import TabBar from './components/TabBar.vue';
import RestTimerOverlay from './components/RestTimerOverlay.vue';
import SwapBottomSheet from './components/SwapBottomSheet.vue';
import DailyCheckinModal from './components/DailyCheckinModal.vue';
import FinisherModal from './components/FinisherModal.vue';
import AccountSwitcherModal from './components/AccountSwitcherModal.vue';

import TodayWorkoutView from './views/TodayWorkoutView.vue';
import ScheduleView from './views/ScheduleView.vue';
import ExercisesView from './views/ExercisesView.vue';
import FinisherView from './views/FinisherView.vue';
import ProfileView from './views/ProfileView.vue';

import { useWorkoutStore } from './stores/workoutStore';

const currentTab = ref('workout');

const isCheckinOpen = ref(false);
const isFinisherOpen = ref(false);
const isAccountsOpen = ref(false);

const workoutStore = useWorkoutStore();

function handleFinisherFinished() {
  workoutStore.finisherDone = true;
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-none">
    <!-- Top Header Navigation -->
    <HeaderNav 
      @open-accounts="isAccountsOpen = true"
      @open-checkin="isCheckinOpen = true"
    />

    <!-- Main View Content Area -->
    <main class="flex-1 w-full max-w-md mx-auto pt-2">
      <Transition name="fade" mode="out-in">
        <KeepAlive>
          <component 
            :is="
              currentTab === 'workout' ? TodayWorkoutView :
              currentTab === 'schedule' ? ScheduleView :
              currentTab === 'exercises' ? ExercisesView :
              currentTab === 'finisher' ? FinisherView :
              ProfileView
            "
            @open-finisher="isFinisherOpen = true"
            @start-finisher="isFinisherOpen = true"
            @open-checkin="isCheckinOpen = true"
            @open-accounts="isAccountsOpen = true"
          />
        </KeepAlive>
      </Transition>
    </main>

    <!-- Floating Rest Timer Overlay (Active during workout rest intervals) -->
    <RestTimerOverlay />

    <!-- 1-Tap Swap Bottom Sheet (Trenajor yo'q/band bo'lganda) -->
    <SwapBottomSheet />

    <!-- Daily AI Check-in Modal -->
    <DailyCheckinModal 
      :is-open="isCheckinOpen"
      @close="isCheckinOpen = false"
      @applied="currentTab = 'workout'"
    />

    <!-- Baqbaqa & Qorin Finisher Modal -->
    <FinisherModal 
      :is-open="isFinisherOpen"
      @close="isFinisherOpen = false"
      @finished="handleFinisherFinished"
    />

    <!-- Multi-Account Switcher & Creation Modal -->
    <AccountSwitcherModal 
      :is-open="isAccountsOpen"
      @close="isAccountsOpen = false"
    />

    <!-- Bottom Navigation Tab Bar -->
    <TabBar v-model:current-tab="currentTab" />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
