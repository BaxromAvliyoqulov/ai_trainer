<script setup lang="ts">
import { computed } from 'vue';
import { useWorkoutStore } from '../stores/workoutStore';
import { useUserStore } from '../stores/userStore';
import { getExerciseById } from '../data/exercises';
import type { Exercise } from '../types';
import { 
  Play, 
  Check, 
  Shuffle, 
  Plus, 
  Flag, 
  Sparkles, 
  Clock, 
  Info,
  Layers
} from 'lucide-vue-next';

const emit = defineEmits<{
  (e: 'openFinisher'): void;
  (e: 'openCheckin'): void;
}>();

const workoutStore = useWorkoutStore();
const userStore = useUserStore();

const user = computed(() => userStore.currentUser);
const checkIn = computed(() => userStore.todayCheckIn);

// Bugungi kun tartibi
const currentDayOfWeek = new Date().getDay() || 7; // 1-7

const dailyPlan = computed(() => {
  const energyFactor = checkIn.value?.autoScaleFactor || 1.0;
  const pain = checkIn.value?.painPoints || [];
  return workoutStore.generateDailyRoutine(currentDayOfWeek, energyFactor, pain);
});

function handleStartWorkout() {
  const energyFactor = checkIn.value?.autoScaleFactor || 1.0;
  workoutStore.startWorkoutSession(
    dailyPlan.value.routineName,
    dailyPlan.value.focusArea,
    dailyPlan.value.exerciseIds,
    energyFactor
  );
}

function handleFinishWorkout() {
  if (workoutStore.totalCompletedSets === 0) {
    if (!confirm('Hali birorta ham podxodni bajarmadingiz. Rostdan ham mashg‘ulotni yakunlamoqchimisiz?')) {
      return;
    }
  } else {
    if (!confirm('Bugungi mashg‘ulotni muvaffaqiyatli yakunlaysizmi?')) {
      return;
    }
  }

  workoutStore.finishWorkout(user.value.id);
}

function getExercise(id: string): Exercise | undefined {
  return getExerciseById(id);
}

// Podxod vaznini +2.5kg / -2.5kg ga tezkor o'zgartirish
function stepWeight(instanceId: string, setIndex: number, delta: number) {
  const ex = workoutStore.activeExercises.find(e => e.instanceId === instanceId);
  if (ex && ex.sets[setIndex]) {
    const current = ex.sets[setIndex].weight;
    workoutStore.updateSetWeight(instanceId, setIndex, Math.max(0, current + delta));
  }
}

// Podxod marta sonini +1 / -1 ga o'zgartirish
function stepReps(instanceId: string, setIndex: number, delta: number) {
  const ex = workoutStore.activeExercises.find(e => e.instanceId === instanceId);
  if (ex && ex.sets[setIndex]) {
    const current = ex.sets[setIndex].reps;
    workoutStore.updateSetReps(instanceId, setIndex, Math.max(1, current + delta));
  }
}
</script>

<template>
  <div class="pb-28 pt-2 px-4 max-w-md mx-auto">
    <!-- ==================== 1. NOT ACTIVE: Boshlang'ich Dashboard ==================== -->
    <div v-if="!workoutStore.isActive" class="space-y-4">
      <!-- AI Kunlik Status Card -->
      <div class="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs relative overflow-hidden">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-xs font-bold text-slate-800 uppercase tracking-wider">Bugungi Reja</span>
          </div>
          <button 
            @click="emit('openCheckin')" 
            class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full hover:bg-emerald-100 transition"
          >
            {{ checkIn ? `Holat: ${checkIn.energy}%` : 'Holatni belgilash' }}
          </button>
        </div>

        <h2 class="text-lg font-black text-slate-900 mt-2.5 leading-snug">
          {{ dailyPlan.routineName }}
        </h2>
        <p class="text-xs text-slate-500 mt-1">
          {{ dailyPlan.focusArea }}
        </p>

        <!-- Stats pills -->
        <div class="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-600">
          <div class="flex items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100">
            <Layers class="w-3.5 h-3.5 text-slate-500" />
            <span>{{ dailyPlan.exerciseIds.length }} ta mashq</span>
          </div>
          <div class="flex items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100">
            <Clock class="w-3.5 h-3.5 text-slate-500" />
            <span>~45 daqiqa</span>
          </div>
          <div class="flex items-center gap-1 bg-amber-50 text-amber-900 px-2.5 py-1.5 rounded-xl border border-amber-100/60">
            <Sparkles class="w-3.5 h-3.5 text-amber-500" />
            <span>Baqbaqa bloki</span>
          </div>
        </div>

        <!-- Big Start Button -->
        <button 
          @click="handleStartWorkout"
          class="w-full mt-4 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition"
        >
          <Play class="w-5 h-5 fill-white" />
          <span>Mashg‘ulotni Boshlash</span>
        </button>
      </div>

      <!-- Preview of exercises in today's routine -->
      <div class="space-y-2">
        <div class="flex items-center justify-between px-1">
          <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider">Bugungi mashqlar ro‘yxati</h3>
          <span class="text-[11px] text-slate-500">Zalda 1-tap swap bilan</span>
        </div>

        <div 
          v-for="(exId, idx) in dailyPlan.exerciseIds" 
          :key="exId"
          class="p-3 rounded-2xl bg-white border border-slate-200/80 flex items-center gap-3 shadow-2xs hover:border-slate-300 transition"
        >
          <span class="text-xs font-black text-slate-600 w-5 text-center">{{ idx + 1 }}</span>
          <img 
            :src="getExercise(exId)?.mediaUrl" 
            :alt="getExercise(exId)?.nameUz"
            class="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
            @error="($event.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=150&q=80'"
          />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-slate-900 truncate">{{ getExercise(exId)?.nameUz }}</h4>
            <div class="text-[11px] text-slate-500 mt-0.5">
              {{ getExercise(exId)?.targetMuscleUz }} • {{ getExercise(exId)?.defaultSets }} podxod
            </div>
          </div>
          <span class="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg shrink-0">
            {{ getExercise(exId)?.equipment.replace('_', ' ') }}
          </span>
        </div>
      </div>
    </div>

    <!-- ==================== 2. ACTIVE WORKOUT MODE (Zal Rejimi) ==================== -->
    <div v-else class="space-y-4">
      <!-- Active session header bar -->
      <div class="sticky top-14 z-20 -mx-4 px-4 py-2.5 bg-slate-900 text-white shadow-md flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
          <div class="text-xs font-bold font-mono text-emerald-400">
            {{ workoutStore.formattedElapsedTime }}
          </div>
          <span class="text-slate-600">|</span>
          <div class="text-xs font-bold text-slate-200">
            {{ workoutStore.totalCompletedSets }} / {{ workoutStore.totalPlannedSets }} podxod
          </div>
        </div>

        <button 
          @click="handleFinishWorkout"
          class="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs active:scale-95 transition"
        >
          Yakunlash
        </button>
      </div>

      <!-- Progress bar -->
      <div class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div 
          class="h-full bg-emerald-500 transition-all duration-300 rounded-full"
          :style="{ width: `${workoutStore.completionPercentage}%` }"
        ></div>
      </div>

      <!-- Exercise Cards in Active Workout -->
      <div 
        v-for="(item, exIdx) in workoutStore.activeExercises" 
        :key="item.instanceId"
        class="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs space-y-3 relative overflow-hidden"
      >
        <!-- Card Top: Exercise Name + 1-Tap Swap Button -->
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
              {{ exIdx + 1 }}
            </span>
            <div class="min-w-0">
              <h3 class="text-sm font-black text-slate-900 truncate">
                {{ getExercise(item.exerciseId)?.nameUz }}
              </h3>
              <p class="text-[11px] text-emerald-700 font-semibold">
                {{ getExercise(item.exerciseId)?.targetMuscleUz }}
              </p>
            </div>
          </div>

          <!-- 1-TAP SWAP BUTTON (KILLER FEATURE) -->
          <button 
            @click="workoutStore.openSwapSheet(item.instanceId, user.equipment)"
            class="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200/80 flex items-center gap-1 active:scale-95 transition shrink-0"
            title="Trenajor yo‘qmi yoki bandmi? Muqobilga almashtirish"
          >
            <Shuffle class="w-3.5 h-3.5 text-amber-600" />
            <span>Almashtirish</span>
          </button>
        </div>

        <!-- 3 Cues (Oltin qoidalar) collapsed info -->
        <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 space-y-0.5">
          <div class="font-bold text-slate-700 flex items-center gap-1">
            <Info class="w-3.5 h-3.5 text-slate-400" />
            <span>Texnika va nafas:</span>
          </div>
          <p class="text-slate-600 leading-tight">
            {{ getExercise(item.exerciseId)?.cuesUz[0] }}
          </p>
        </div>

        <!-- Podxodlar Jadvali (Sets Table) -->
        <div class="space-y-1.5">
          <div class="grid grid-cols-12 gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 px-2 pb-0.5">
            <div class="col-span-2 text-center">Set</div>
            <div class="col-span-4 text-center">Vazn (kg)</div>
            <div class="col-span-3 text-center">Marta</div>
            <div class="col-span-3 text-center">Bajarildi</div>
          </div>

          <!-- Set Rows -->
          <div 
            v-for="(set, sIdx) in item.sets" 
            :key="sIdx"
            class="grid grid-cols-12 gap-1.5 items-center p-2 rounded-2xl transition-colors border"
            :class="set.completed ? 'bg-emerald-50/50 border-emerald-300/80' : 'bg-slate-50/70 border-slate-200/60'"
          >
            <!-- Set number -->
            <div class="col-span-2 text-center font-black text-xs text-slate-700">
              #{{ set.setNumber }}
            </div>

            <!-- Weight Input with Steppers -->
            <div class="col-span-4 flex items-center justify-center gap-1 bg-white rounded-xl border border-slate-200 p-1">
              <button 
                @click="stepWeight(item.instanceId, sIdx, -2.5)" 
                class="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center font-bold text-xs"
              >
                -
              </button>
              <input 
                v-model.number="set.weight" 
                type="number" 
                step="2.5" 
                min="0"
                class="w-10 text-center font-bold text-xs focus:outline-none bg-transparent"
              />
              <button 
                @click="stepWeight(item.instanceId, sIdx, 2.5)" 
                class="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center font-bold text-xs"
              >
                +
              </button>
            </div>

            <!-- Reps Input with Steppers -->
            <div class="col-span-3 flex items-center justify-center gap-1 bg-white rounded-xl border border-slate-200 p-1">
              <button 
                @click="stepReps(item.instanceId, sIdx, -1)" 
                class="w-5 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center font-bold text-xs"
              >
                -
              </button>
              <span class="w-6 text-center font-bold text-xs">{{ set.reps }}</span>
              <button 
                @click="stepReps(item.instanceId, sIdx, 1)" 
                class="w-5 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center font-bold text-xs"
              >
                +
              </button>
            </div>

            <!-- 1-TAP CHECKMARK BUTTON -->
            <div class="col-span-3 flex justify-center">
              <button 
                @click="workoutStore.toggleSetComplete(item.instanceId, sIdx)"
                class="w-11 h-9 rounded-xl flex items-center justify-center font-extrabold transition active:scale-90 shadow-2xs"
                :class="set.completed ? 'bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-white border-2 border-slate-300 text-slate-300 hover:border-slate-400'"
              >
                <Check class="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>

        <!-- Add / Remove set row -->
        <div class="flex items-center justify-between pt-1">
          <button 
            @click="workoutStore.addSet(item.instanceId)"
            class="text-[11px] font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1 active:scale-95 transition"
          >
            <Plus class="w-3.5 h-3.5" />
            <span>Podxod qo‘shish</span>
          </button>

          <button 
            v-if="item.sets.length > 1"
            @click="workoutStore.removeSet(item.instanceId, item.sets.length - 1)"
            class="text-[11px] font-semibold text-rose-500 hover:text-rose-700 px-2 py-1 rounded-lg"
          >
            Oxirgisini o‘chirish
          </button>
        </div>
      </div>

      <!-- Baqbaqa & Qorin Finisher Banner -->
      <div class="p-4 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 shadow-xs flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Sparkles class="w-5 h-5" />
          </div>
          <div>
            <h4 class="text-xs font-black text-slate-900">Baqbaqa & Qorin Finisher</h4>
            <p class="text-[11px] text-slate-600">5-7 daqiqalik qomatni tiklash bloki</p>
          </div>
        </div>

        <button 
          @click="emit('openFinisher')"
          class="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold shadow-xs transition"
        >
          Boshlash
        </button>
      </div>

      <!-- Big Finish Workout Button -->
      <div class="pt-4 pb-2">
        <button 
          @click="handleFinishWorkout"
          class="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-xl active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <Flag class="w-4 h-4 text-emerald-400" />
          <span>Mashg‘ulotni Yakunlash (Tugatish)</span>
        </button>
      </div>
    </div>
  </div>
</template>
