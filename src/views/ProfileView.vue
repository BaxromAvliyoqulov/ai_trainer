<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useWorkoutStore } from '../stores/workoutStore';
import { 
  Scale, 
  Download, 
  Users 
} from 'lucide-vue-next';

const emit = defineEmits<{
  (e: 'openAccounts'): void;
}>();

const userStore = useUserStore();
const workoutStore = useWorkoutStore();

const user = computed(() => userStore.currentUser);
const weights = computed(() => userStore.userWeights);
const history = computed(() => workoutStore.history.filter(h => h.userId === user.value.id));

const newWeightInput = ref(user.value.weight);
const newWeightNote = ref('');

function handleSaveWeight() {
  if (newWeightInput.value > 0) {
    userStore.recordWeight(Number(newWeightInput.value), newWeightNote.value.trim() || undefined);
    newWeightNote.value = '';
    alert('Vazningiz muvaffaqiyatli saqlandi!');
  }
}

const totalTonnage = computed(() => {
  return history.value.reduce((sum, h) => sum + (h.totalTonnageKg || 0), 0);
});

function exportData() {
  const data = {
    user: user.value,
    weights: weights.value,
    history: history.value
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fitmos_backup_${user.value.name}_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
}
</script>

<template>
  <div class="pb-28 pt-2 px-4 max-w-md mx-auto space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-base font-black text-slate-900">Profil & Natijalar</h2>
        <p class="text-xs text-slate-500">Shaxsiy parametrlar va o‘sish dinamikasi</p>
      </div>
      <button 
        @click="emit('openAccounts')"
        class="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 flex items-center gap-1.5 active:scale-95 transition shadow-2xs"
      >
        <Users class="w-3.5 h-3.5 text-slate-500" />
        <span>Akkauntlar</span>
      </button>
    </div>

    <!-- User Profile Card -->
    <div class="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
      <div class="w-16 h-16 rounded-3xl bg-slate-900 text-white flex items-center justify-center text-3xl shadow-sm shrink-0">
        {{ user.avatar }}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-black text-slate-900 truncate">{{ user.name }}</h3>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 uppercase">
            {{ user.goal === 'recomposition' ? 'Rekompozitsiya' : user.goal }}
          </span>
        </div>
        <div class="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-center">
          <div>
            <div class="text-[10px] text-slate-400 font-semibold">Bo‘y</div>
            <div class="text-xs font-black text-slate-800">{{ user.height }} sm</div>
          </div>
          <div>
            <div class="text-[10px] text-slate-400 font-semibold">Vazn</div>
            <div class="text-xs font-black text-slate-800">{{ user.weight }} kg</div>
          </div>
          <div>
            <div class="text-[10px] text-slate-400 font-semibold">Maqsad</div>
            <div class="text-xs font-black text-emerald-600">{{ user.targetWeight }} kg</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Weight Quick Logger -->
    <div class="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Scale class="w-4 h-4" />
          </div>
          <h4 class="text-xs font-bold text-slate-900">Bugungi Vaznni Qayd Etish</h4>
        </div>
        <span class="text-[11px] text-slate-500 font-medium">
          Maqsadgacha: {{ (user.weight - user.targetWeight).toFixed(1) }} kg
        </span>
      </div>

      <div class="flex items-center gap-2">
        <div class="relative flex-1">
          <input 
            v-model.number="newWeightInput" 
            type="number" 
            step="0.1" 
            placeholder="Masalan: 82.5"
            class="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:border-slate-900"
          />
          <span class="text-xs font-bold text-slate-400 absolute right-3 top-1/2 -translate-y-1/2">kg</span>
        </div>
        <button 
          @click="handleSaveWeight"
          class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs active:scale-95 transition"
        >
          Saqlash
        </button>
      </div>
    </div>

    <!-- Overall Lifetime Stats -->
    <div class="grid grid-cols-3 gap-2 text-center">
      <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
        <div class="text-[10px] text-slate-400 font-bold uppercase">Mashg‘ulotlar</div>
        <div class="text-base font-black text-slate-900 mt-0.5">{{ history.length }} ta</div>
      </div>
      <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
        <div class="text-[10px] text-slate-400 font-bold uppercase">Ko‘tarilgan yuk</div>
        <div class="text-base font-black text-emerald-600 mt-0.5">{{ (totalTonnage / 1000).toFixed(1) }} t</div>
      </div>
      <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
        <div class="text-[10px] text-slate-400 font-bold uppercase">Finisher</div>
        <div class="text-base font-black text-amber-500 mt-0.5">
          {{ history.filter(h => h.finisherDone).length }} ta
        </div>
      </div>
    </div>

    <!-- Workout History List -->
    <div class="space-y-2">
      <div class="flex items-center justify-between px-1">
        <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider">Mashg‘ulotlar Tarixi</h4>
        <span class="text-[11px] text-slate-500">{{ history.length }} ta o‘tkazilgan</span>
      </div>

      <div v-if="history.length > 0" class="space-y-2 max-h-60 overflow-y-auto pr-0.5">
        <div 
          v-for="rec in history" 
          :key="rec.id"
          class="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-900">{{ rec.routineName }}</span>
            <span class="text-[10px] font-semibold text-slate-500">{{ rec.date }}</span>
          </div>
          <div class="flex items-center justify-between text-[11px] text-slate-500">
            <span>{{ rec.durationMinutes }} daqiqa • {{ rec.exercises.length }} ta mashq</span>
            <span class="font-bold text-emerald-600">{{ rec.totalTonnageKg }} kg ko‘tarildi</span>
          </div>
        </div>
      </div>

      <div v-else class="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 text-center text-xs text-slate-400">
        Hali mashg‘ulot o‘tkazilmadi. Bugunoq birinchi mashg‘ulotingizni boshlang!
      </div>
    </div>

    <!-- Export Button -->
    <button 
      @click="exportData"
      class="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-98"
    >
      <Download class="w-3.5 h-3.5" />
      <span>Barcha ma’lumotlarni yuklab olish (JSON Backup)</span>
    </button>
  </div>
</template>
