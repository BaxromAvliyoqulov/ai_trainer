<script setup lang="ts">
import { computed } from 'vue';
import { useWorkoutStore } from '../stores/workoutStore';
import { Exercise } from '../types';
import { Shuffle, X, Check } from 'lucide-vue-next';

const workoutStore = useWorkoutStore();

const isOpen = computed(() => workoutStore.swapSheet.isOpen);
const current = computed(() => workoutStore.swapSheet.currentExercise);
const swaps = computed(() => workoutStore.swapSheet.availableSwaps);

function selectSwap(swapEx: Exercise) {
  workoutStore.applySwap(swapEx.id);
}

function close() {
  workoutStore.closeSwapSheet();
}
</script>

<template>
  <!-- Backdrop -->
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end justify-center transition-opacity"
    @click.self="close"
  >
    <!-- Sheet container -->
    <div 
      class="w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl border-t border-slate-200 animate-in slide-in-from-bottom duration-200 max-h-[85vh] flex flex-col"
    >
      <!-- Header -->
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Shuffle class="w-4 h-4" />
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-900">1-Tap Almashtirish (Swap)</h3>
            <p class="text-[11px] text-slate-500">Zalda trenajor bandmi yoki yo‘qmi?</p>
          </div>
        </div>
        <button 
          @click="close"
          class="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Current exercise info -->
      <div v-if="current" class="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
        <img 
          :src="current.mediaUrl" 
          :alt="current.nameUz"
          class="w-12 h-12 rounded-xl object-cover bg-slate-200 shrink-0 border border-slate-200"
          @error="($event.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=150&q=80'"
        />
        <div class="flex-1 min-w-0">
          <div class="text-[10px] uppercase font-bold text-slate-600">Almashtirilayotgan mashq:</div>
          <div class="text-xs font-bold text-slate-900 truncate">{{ current.nameUz }}</div>
          <div class="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
            <span class="font-medium text-emerald-600">{{ current.targetMuscleUz }}</span>
          </div>
        </div>
      </div>

      <!-- Swaps title -->
      <div class="mt-4 mb-2 flex items-center justify-between">
        <span class="text-xs font-bold text-slate-700">Tavsiya etiladigan muqobillar:</span>
        <span class="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
          Bir xil mushak guruhiga
        </span>
      </div>

      <!-- Swaps list -->
      <div class="flex-1 overflow-y-auto space-y-2.5 pr-0.5 py-1">
        <div 
          v-for="swap in swaps" 
          :key="swap.id"
          @click="selectSwap(swap)"
          class="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/30 active:scale-[0.98] transition cursor-pointer flex items-center gap-3 shadow-2xs group"
        >
          <img 
            :src="swap.mediaUrl" 
            :alt="swap.nameUz"
            class="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200 group-hover:border-emerald-300"
            @error="($event.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=150&q=80'"
          />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-bold text-slate-900 truncate">{{ swap.nameUz }}</span>
            </div>
            <div class="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
              {{ swap.cuesUz[0] }}
            </div>
            <div class="flex items-center gap-2 mt-1.5">
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {{ swap.equipment.replace('_', ' ') }}
              </span>
              <span class="text-[10px] text-slate-600 font-medium">
                {{ swap.defaultSets }} podxod x {{ swap.defaultReps }} marta
              </span>
            </div>
          </div>
          <div class="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-500 group-hover:text-white text-slate-400 flex items-center justify-center shrink-0 transition">
            <Check class="w-4 h-4" />
          </div>
        </div>

        <div v-if="swaps.length === 0" class="p-6 text-center text-slate-400 text-xs">
          Bu mashq uchun boshqa muqobil topilmadi.
        </div>
      </div>

      <!-- Footer note -->
      <div class="mt-3 pt-2 text-center text-[11px] text-slate-500">
        Bitta bosish orqali mashq darhol bugungi rejangizga kiritiladi.
      </div>
    </div>
  </div>
</template>
