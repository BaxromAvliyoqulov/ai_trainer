<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useWorkoutStore } from '../stores/workoutStore';
import { DEFAULT_EQUIPMENT_LIST } from '../data/exercises';
import { Calendar, Check, Shield } from 'lucide-vue-next';
import { EquipmentId } from '../types';

const userStore = useUserStore();
const workoutStore = useWorkoutStore();

const user = computed(() => userStore.currentUser);

const weekDays = [
  { dayNum: 1, name: 'Dushanba', short: 'Dush' },
  { dayNum: 2, name: 'Seshanba', short: 'Sesh' },
  { dayNum: 3, name: 'Chorshanba', short: 'Chor' },
  { dayNum: 4, name: 'Payshanba', short: 'Pay' },
  { dayNum: 5, name: 'Juma', short: 'Juma' },
  { dayNum: 6, name: 'Shanba', short: 'Shan' },
  { dayNum: 7, name: 'Yakshanba', short: 'Yak' }
];

function getDayRoutine(dayNum: number) {
  return workoutStore.generateDailyRoutine(dayNum, 1.0, []);
}

function toggleEquipment(eqId: EquipmentId) {
  userStore.toggleEquipment(eqId);
}
</script>

<template>
  <div class="pb-28 pt-2 px-4 max-w-md mx-auto space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-base font-black text-slate-900">Haftalik Reja & Jihozlar</h2>
        <p class="text-xs text-slate-500">Zaldagi bor imkoniyatlarga to‘liq moslashtirilgan</p>
      </div>
      <div class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
        <Calendar class="w-4 h-4" />
      </div>
    </div>

    <!-- 1. Haftalik taqvim ro'yxati -->
    <div class="space-y-2.5">
      <div 
        v-for="d in weekDays" 
        :key="d.dayNum"
        class="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between transition hover:border-slate-300"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-xs flex flex-col items-center justify-center shrink-0">
            <span>{{ d.short }}</span>
            <span class="text-[9px] text-slate-400 font-semibold">#{{ d.dayNum }}</span>
          </div>
          <div>
            <div class="text-xs font-bold text-slate-900">
              {{ getDayRoutine(d.dayNum).routineName.split(':')[1] || getDayRoutine(d.dayNum).routineName }}
            </div>
            <div class="text-[11px] text-slate-500 mt-0.5">
              {{ getDayRoutine(d.dayNum).exerciseIds.length }} ta mashq • {{ getDayRoutine(d.dayNum).focusArea }}
            </div>
          </div>
        </div>

        <span 
          class="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0"
          :class="d.dayNum === 7 ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'"
        >
          {{ d.dayNum === 7 ? 'Tiklanish' : 'Faol' }}
        </span>
      </div>
    </div>

    <!-- 2. Zaldagi jihozlar filtri (Equipment Profile) -->
    <div class="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Shield class="w-4 h-4" />
          </div>
          <div>
            <h3 class="text-xs font-bold text-slate-900">Zal jihozlari filtri (Equipment)</h3>
            <p class="text-[11px] text-slate-500">Zalda bor jihozlarni belgilang — yo‘qlari AI tomonidan berilmaydi</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-2 pt-1">
        <div 
          v-for="item in DEFAULT_EQUIPMENT_LIST" 
          :key="item.id"
          @click="toggleEquipment(item.id)"
          class="p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition active:scale-[0.99]"
          :class="user.equipment.includes(item.id) ? 'border-emerald-400 bg-emerald-50/30' : 'border-slate-200 bg-slate-50/50 opacity-60'"
        >
          <div class="flex items-center gap-2.5">
            <div class="text-xs font-semibold text-slate-800">
              {{ item.nameUz }}
            </div>
          </div>

          <div 
            class="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold transition"
            :class="user.equipment.includes(item.id) ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white text-transparent'"
          >
            <Check class="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>
      </div>

      <p class="text-[11px] text-slate-400 text-center pt-2">
        Belgilanmagan trenajorlar dasturda avtomatik oddiy gantel yoki shtangaga almashtiriladi.
      </p>
    </div>
  </div>
</template>
