<script setup lang="ts">
import { Dumbbell, Calendar, PlayCircle, Sparkles, UserCheck } from 'lucide-vue-next';
import { useWorkoutStore } from '../stores/workoutStore';

defineProps<{
  currentTab: string;
}>();

const emit = defineEmits<{
  (e: 'update:currentTab', tab: string): void;
}>();

const workoutStore = useWorkoutStore();
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
    <div class="max-w-md mx-auto grid grid-cols-5 h-16">
      <!-- 1. Mashg'ulot (Active Workout) -->
      <button 
        @click="emit('update:currentTab', 'workout')"
        class="flex flex-col items-center justify-center gap-1 transition-all relative"
        :class="currentTab === 'workout' ? 'text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-800'"
      >
        <div class="relative">
          <PlayCircle class="w-5 h-5 transition-transform" :class="currentTab === 'workout' ? 'scale-110 text-emerald-600' : ''" />
          <span v-if="workoutStore.isActive" class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
          <span v-if="workoutStore.isActive" class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
        </div>
        <span class="text-[10px] tracking-tight">Zalda</span>
      </button>

      <!-- 2. Haftalik Reja -->
      <button 
        @click="emit('update:currentTab', 'schedule')"
        class="flex flex-col items-center justify-center gap-1 transition-all"
        :class="currentTab === 'schedule' ? 'text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-800'"
      >
        <Calendar class="w-5 h-5 transition-transform" :class="currentTab === 'schedule' ? 'scale-110 text-emerald-600' : ''" />
        <span class="text-[10px] tracking-tight">Reja</span>
      </button>

      <!-- 3. Mashqlar & Swaps -->
      <button 
        @click="emit('update:currentTab', 'exercises')"
        class="flex flex-col items-center justify-center gap-1 transition-all"
        :class="currentTab === 'exercises' ? 'text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-800'"
      >
        <Dumbbell class="w-5 h-5 transition-transform" :class="currentTab === 'exercises' ? 'scale-110 text-emerald-600' : ''" />
        <span class="text-[10px] tracking-tight">Mashqlar</span>
      </button>

      <!-- 4. Baqbaqa & Posture Finisher -->
      <button 
        @click="emit('update:currentTab', 'finisher')"
        class="flex flex-col items-center justify-center gap-1 transition-all"
        :class="currentTab === 'finisher' ? 'text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-800'"
      >
        <Sparkles class="w-5 h-5 transition-transform" :class="currentTab === 'finisher' ? 'scale-110 text-amber-500' : ''" />
        <span class="text-[10px] tracking-tight">Baqbaqa</span>
      </button>

      <!-- 5. Profil & Baza -->
      <button 
        @click="emit('update:currentTab', 'profile')"
        class="flex flex-col items-center justify-center gap-1 transition-all"
        :class="currentTab === 'profile' ? 'text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-800'"
      >
        <UserCheck class="w-5 h-5 transition-transform" :class="currentTab === 'profile' ? 'scale-110 text-emerald-600' : ''" />
        <span class="text-[10px] tracking-tight">Profil</span>
      </button>
    </div>
  </nav>
</template>
