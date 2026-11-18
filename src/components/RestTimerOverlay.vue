<script setup lang="ts">
import { computed } from 'vue';
import { useWorkoutStore } from '../stores/workoutStore';
import { Timer, Plus, SkipForward, X } from 'lucide-vue-next';

const workoutStore = useWorkoutStore();

const timer = computed(() => workoutStore.restTimer);

const progressPercent = computed(() => {
  if (timer.value.duration <= 0) return 0;
  return Math.min(100, Math.max(0, (timer.value.remaining / timer.value.duration) * 100));
});
</script>

<template>
  <div 
    v-if="timer.active" 
    class="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto"
  >
    <div class="bg-slate-900 text-white rounded-2xl p-3.5 shadow-2xl border border-slate-700/80 backdrop-blur-md flex flex-col gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Timer class="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div class="text-[11px] font-medium text-slate-400 leading-none">Dam olish vaqti</div>
            <div class="text-xs font-bold text-slate-200 truncate max-w-[170px] mt-0.5">
              {{ timer.exerciseName || 'Keyingi podxodga tayyorlaning' }}
            </div>
          </div>
        </div>

        <!-- Big countdown -->
        <div class="flex items-baseline gap-1">
          <span class="text-2xl font-black font-mono tracking-tight text-emerald-400">
            {{ timer.remaining }}
          </span>
          <span class="text-xs font-bold text-slate-400">soniya</span>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div 
          class="h-full bg-emerald-500 transition-all duration-1000 ease-linear rounded-full"
          :style="{ width: `${progressPercent}%` }"
        ></div>
      </div>

      <!-- Quick action buttons -->
      <div class="flex items-center gap-2 pt-0.5">
        <button 
          @click="workoutStore.addRestSeconds(30)"
          class="flex-1 py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 active:scale-95 transition"
        >
          <Plus class="w-3.5 h-3.5" />
          <span>+30s</span>
        </button>

        <button 
          @click="workoutStore.stopRestTimer()"
          class="flex-1 py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition"
        >
          <SkipForward class="w-3.5 h-3.5" />
          <span>Boshlash</span>
        </button>

        <button 
          @click="workoutStore.stopRestTimer()"
          class="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition active:scale-95"
          title="Yopish"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
