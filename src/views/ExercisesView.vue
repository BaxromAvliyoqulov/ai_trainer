<script setup lang="ts">
import { ref, computed } from 'vue';
import { EXERCISE_DATABASE, getExerciseById } from '../data/exercises';
import { MuscleCategory, Exercise } from '../types';
import { Search, Dumbbell, Shuffle, X } from 'lucide-vue-next';

const searchQuery = ref('');
const selectedCategory = ref<MuscleCategory | 'all'>('all');
const activeDetailModal = ref<Exercise | null>(null);

const categories: { id: MuscleCategory | 'all'; name: string }[] = [
  { id: 'all', name: 'Barchasi' },
  { id: 'chest', name: 'Ko‘krak' },
  { id: 'back', name: 'Orqa' },
  { id: 'legs', name: 'Oyoq' },
  { id: 'shoulders', name: 'Yelka' },
  { id: 'arms', name: 'Qo‘l' },
  { id: 'core', name: 'Qorin' },
  { id: 'posture_chin', name: 'Baqbaqa & Qomat' },
  { id: 'cardio', name: 'Kardio' }
];

const filteredExercises = computed(() => {
  return EXERCISE_DATABASE.filter(ex => {
    const matchesCat = selectedCategory.value === 'all' || ex.category === selectedCategory.value;
    const query = searchQuery.value.toLowerCase().trim();
    const matchesQuery = !query || 
      ex.nameUz.toLowerCase().includes(query) || 
      ex.nameEn.toLowerCase().includes(query) || 
      ex.targetMuscleUz.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });
});
</script>

<template>
  <div class="pb-28 pt-2 px-4 max-w-md mx-auto space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-base font-black text-slate-900">Mashqlar & Muqobillar Bazasi</h2>
        <p class="text-xs text-slate-500">{{ EXERCISE_DATABASE.length }} ta aniq texnikali mashq</p>
      </div>
      <div class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
        <Dumbbell class="w-4 h-4" />
      </div>
    </div>

    <!-- Search Input -->
    <div class="relative">
      <Search class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="Mashq nomi yoki mushak bo‘yicha qidirish..."
        class="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-slate-900 shadow-2xs"
      />
    </div>

    <!-- Category Pill Filter -->
    <div class="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
      <button 
        v-for="cat in categories" 
        :key="cat.id"
        @click="selectedCategory = cat.id"
        class="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition active:scale-95 shrink-0"
        :class="selectedCategory === cat.id ? 'bg-slate-900 text-white shadow-2xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'"
      >
        {{ cat.name }}
      </button>
    </div>

    <!-- Exercises List -->
    <div class="space-y-3">
      <div 
        v-for="ex in filteredExercises" 
        :key="ex.id"
        @click="activeDetailModal = ex"
        class="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3 cursor-pointer hover:border-slate-300 active:scale-[0.99] transition"
      >
        <img 
          :src="ex.mediaUrl" 
          :alt="ex.nameUz"
          class="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
          @error="($event.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=150&q=80'"
        />
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5">
            <h4 class="text-xs font-bold text-slate-900 truncate">{{ ex.nameUz }}</h4>
          </div>
          <div class="text-[11px] text-emerald-700 font-semibold mt-0.5">
            {{ ex.targetMuscleUz }}
          </div>
          <div class="flex items-center gap-2 mt-1.5">
            <span class="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
              {{ ex.equipment.replace('_', ' ') }}
            </span>
            <span v-if="ex.swaps.length > 0" class="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md flex items-center gap-1">
              <Shuffle class="w-3 h-3 text-amber-600" />
              <span>{{ ex.swaps.length }} ta muqobil</span>
            </span>
          </div>
        </div>
      </div>

      <div v-if="filteredExercises.length === 0" class="p-8 text-center text-slate-400 text-xs">
        Bunday nomdagi mashq topilmadi.
      </div>
    </div>

    <!-- Detail Modal -->
    <div 
      v-if="activeDetailModal"
      class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      @click.self="activeDetailModal = null"
    >
      <div class="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 my-auto">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="text-xs font-bold text-slate-900">Mashq texnikasi</div>
          <button @click="activeDetailModal = null" class="p-1 rounded-full hover:bg-slate-100 text-slate-400">
            <X class="w-4 h-4" />
          </button>
        </div>

        <div class="mt-3 space-y-3">
          <img 
            :src="activeDetailModal.mediaUrl" 
            :alt="activeDetailModal.nameUz"
            class="w-full h-44 rounded-2xl object-cover bg-slate-100 border border-slate-200"
            @error="($event.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80'"
          />
          <div>
            <h3 class="text-sm font-black text-slate-900">{{ activeDetailModal.nameUz }}</h3>
            <div class="text-xs text-emerald-700 font-bold mt-0.5">{{ activeDetailModal.targetMuscleUz }}</div>
            <div class="text-[11px] text-slate-400 mt-0.5">{{ activeDetailModal.nameEn }}</div>
          </div>

          <!-- 3 Golden cues -->
          <div class="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div class="text-[11px] font-bold text-slate-800">3 ta oltin qoida:</div>
            <ul class="space-y-1 text-slate-600 text-[11px] leading-snug">
              <li v-for="(cue, idx) in activeDetailModal.cuesUz" :key="idx" class="flex items-start gap-1.5">
                <span class="w-4 h-4 rounded-full bg-slate-200 text-slate-700 font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                  {{ idx + 1 }}
                </span>
                <span>{{ cue }}</span>
              </li>
            </ul>
          </div>

          <!-- Swaps list -->
          <div v-if="activeDetailModal.swaps.length > 0">
            <div class="text-[11px] font-bold text-slate-800 mb-1.5">Muqobillar (Zalda trenajor bo‘lmasa):</div>
            <div class="space-y-1.5">
              <div 
                v-for="swId in activeDetailModal.swaps" 
                :key="swId"
                class="p-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 flex items-center justify-between"
              >
                <span>{{ getExerciseById(swId)?.nameUz }}</span>
                <span class="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {{ getExerciseById(swId)?.equipment.replace('_', ' ') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
