<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../stores/userStore';
import { Users, Zap } from 'lucide-vue-next';

const emit = defineEmits<{
  (e: 'openAccounts'): void;
  (e: 'openCheckin'): void;
}>();

const userStore = useUserStore();

const user = computed(() => userStore.currentUser);

const goalName = computed(() => {
  switch (user.value.goal) {
    case 'recomposition': return 'Qorin & Baqbaqa';
    case 'fat_loss': return 'Ozish & Kardio';
    case 'muscle_gain': return 'Massa & Kuch';
    default: return 'Qomat tiklash';
  }
});
</script>

<template>
  <header class="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 transition-colors">
    <div class="max-w-md mx-auto flex items-center justify-between">
      <!-- Logo & App Name -->
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
          <span class="tracking-tighter">FM</span>
        </div>
        <div>
          <div class="flex items-center gap-1.5">
            <h1 class="text-base font-bold text-slate-900 tracking-tight leading-none">FitMos</h1>
            <span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
              ZalOS
            </span>
          </div>
          <p class="text-[11px] text-slate-500 font-medium leading-none mt-1">
            {{ goalName }} • {{ user.weight }} kg
          </p>
        </div>
      </div>

      <!-- User Switcher & Status -->
      <div class="flex items-center gap-2">
        <!-- Energy pill -->
        <button 
          @click="emit('openCheckin')" 
          class="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition active:scale-95"
          title="Kunlik holatni baholash"
        >
          <Zap class="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span v-if="userStore.todayCheckIn">{{ userStore.todayCheckIn.energy }}%</span>
          <span v-else>Holat</span>
        </button>

        <!-- Profile button -->
        <button 
          @click="emit('openAccounts')" 
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-2xs transition active:scale-95"
        >
          <span class="text-base leading-none">{{ user.avatar }}</span>
          <span class="font-bold max-w-[70px] truncate">{{ user.name }}</span>
          <Users class="w-3.5 h-3.5 text-slate-400 ml-0.5" />
        </button>
      </div>
    </div>
  </header>
</template>
