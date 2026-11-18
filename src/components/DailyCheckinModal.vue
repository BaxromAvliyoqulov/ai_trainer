<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { Zap, X, Check, ShieldCheck } from 'lucide-vue-next';
import { EnergyLevel, PainPoint } from '../types';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'applied'): void;
}>();

const userStore = useUserStore();

const selectedEnergy = ref<EnergyLevel>(userStore.todayCheckIn?.energy || 100);
const selectedPain = ref<PainPoint[]>(userStore.todayCheckIn?.painPoints || ['none']);

function togglePain(point: PainPoint) {
  if (point === 'none') {
    selectedPain.value = ['none'];
    return;
  }
  selectedPain.value = selectedPain.value.filter(p => p !== 'none');
  if (selectedPain.value.includes(point)) {
    selectedPain.value = selectedPain.value.filter(p => p !== point);
    if (selectedPain.value.length === 0) {
      selectedPain.value = ['none'];
    }
  } else {
    selectedPain.value.push(point);
  }
}

function saveCheckIn() {
  let factor = 1.0;
  if (selectedEnergy.value === 75) factor = 0.85;
  if (selectedEnergy.value === 50) factor = 0.75;
  if (selectedEnergy.value === 30) factor = 0.65;

  userStore.saveDailyCheckIn({
    date: new Date().toISOString().split('T')[0],
    energy: selectedEnergy.value,
    painPoints: selectedPain.value,
    autoScaleFactor: factor
  });

  emit('applied');
  emit('close');
}
</script>

<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
      <!-- Header -->
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Zap class="w-4 h-4 fill-emerald-600" />
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-900">AI Kunlik Moslashuv</h3>
            <p class="text-[11px] text-slate-500">Bugungi holatga qarab yuklamani boshqarish</p>
          </div>
        </div>
        <button @click="emit('close')" class="p-1.5 rounded-full hover:bg-slate-100 text-slate-400">
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- 1. Energiya darajasi -->
      <div class="mt-4">
        <label class="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2.5">
          <span>⚡ Bugun o‘zingizni qanday his qilyapsiz?</span>
        </label>
        <div class="grid grid-cols-2 gap-2">
          <!-- 100% -->
          <button 
            @click="selectedEnergy = 100"
            class="p-2.5 rounded-2xl border text-left transition flex flex-col gap-1 active:scale-95"
            :class="selectedEnergy === 100 ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-700'"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold">🔥 100% Energiya</span>
              <Check v-if="selectedEnergy === 100" class="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span class="text-[10px] text-slate-600 leading-tight">Maksimal kuch va rekordlar</span>
          </button>

          <!-- 75% -->
          <button 
            @click="selectedEnergy = 75"
            class="p-2.5 rounded-2xl border text-left transition flex flex-col gap-1 active:scale-95"
            :class="selectedEnergy === 75 ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-700'"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold">💪 75% Yaxshi</span>
              <Check v-if="selectedEnergy === 75" class="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span class="text-[10px] text-slate-600 leading-tight">Odatiy me’yordagi rejim</span>
          </button>

          <!-- 50% -->
          <button 
            @click="selectedEnergy = 50"
            class="p-2.5 rounded-2xl border text-left transition flex flex-col gap-1 active:scale-95"
            :class="selectedEnergy === 50 ? 'border-amber-500 bg-amber-50/50 text-amber-950 font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-700'"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold">🥱 50% Charchoq</span>
              <Check v-if="selectedEnergy === 50" class="w-3.5 h-3.5 text-amber-600" />
            </div>
            <span class="text-[10px] text-slate-600 leading-tight">AI podxodlarni 15% kamaytiradi</span>
          </button>

          <!-- 30% -->
          <button 
            @click="selectedEnergy = 30"
            class="p-2.5 rounded-2xl border text-left transition flex flex-col gap-1 active:scale-95"
            :class="selectedEnergy === 30 ? 'border-amber-500 bg-amber-50/50 text-amber-950 font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-700'"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold">💤 30% Kam uyqu</span>
              <Check v-if="selectedEnergy === 30" class="w-3.5 h-3.5 text-amber-600" />
            </div>
            <span class="text-[10px] text-slate-600 leading-tight">Yengil tonus (-30% hajm)</span>
          </button>
        </div>
      </div>

      <!-- 2. Og'riq yoki zo'riqish -->
      <div class="mt-4">
        <label class="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
          <span>🩺 Tizzada yoki belda og‘riq bormi?</span>
        </label>
        <div class="grid grid-cols-2 gap-2">
          <button 
            @click="togglePain('none')"
            class="p-2 rounded-xl border text-xs font-semibold text-center transition"
            :class="selectedPain.includes('none') ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 bg-white text-slate-700'"
          >
            ✅ Yo‘q, hammasi soz
          </button>
          <button 
            @click="togglePain('lower_back')"
            class="p-2 rounded-xl border text-xs font-semibold text-center transition"
            :class="selectedPain.includes('lower_back') ? 'bg-rose-50 text-rose-700 border-rose-300 font-bold' : 'border-slate-200 bg-white text-slate-700'"
          >
            ⚠️ Bel (Umurtqa)
          </button>
          <button 
            @click="togglePain('knee')"
            class="p-2 rounded-xl border text-xs font-semibold text-center transition"
            :class="selectedPain.includes('knee') ? 'bg-rose-50 text-rose-700 border-rose-300 font-bold' : 'border-slate-200 bg-white text-slate-700'"
          >
            ⚠️ Tizza bo‘g‘imi
          </button>
          <button 
            @click="togglePain('shoulder')"
            class="p-2 rounded-xl border text-xs font-semibold text-center transition"
            :class="selectedPain.includes('shoulder') ? 'bg-rose-50 text-rose-700 border-rose-300 font-bold' : 'border-slate-200 bg-white text-slate-700'"
          >
            ⚠️ Yelka bo‘g‘imi
          </button>
        </div>
      </div>

      <!-- Action Button -->
      <button 
        @click="saveCheckIn"
        class="w-full mt-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition active:scale-98 flex items-center justify-center gap-2"
      >
        <ShieldCheck class="w-4 h-4" />
        <span>Rejani moslash va saqlash</span>
      </button>
    </div>
  </div>
</template>
