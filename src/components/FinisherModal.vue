<script setup lang="ts">
import { ref, computed } from 'vue';
import { Sparkles, CheckCircle2, Play, Pause, RotateCcw, X, ArrowRight } from 'lucide-vue-next';
import { playSetCompleteSound, playRestTimerFinishedSound, triggerTimerVibration, triggerHaptic } from '../utils/soundAndHaptics';
import confetti from 'canvas-confetti';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'finished'): void;
}>();

interface FinisherStep {
  title: string;
  subtitle: string;
  target: string;
  durationSec: number;
  sets: number;
  instruction: string;
  tip: string;
  media: string;
}

const steps: FinisherStep[] = [
  {
    title: 'Makenzi Chin-Tuck',
    subtitle: '1-bosqich: Baqbaqani yo‘qotish va bo‘yinni to‘g‘rilash',
    target: 'Bo‘yin fleksorlari va jag‘ osti',
    durationSec: 45,
    sets: 3,
    instruction: 'Tik turing. Jag‘ni gorizontal ravishda orqaga suring (boshni pastga egmang!). 3 soniya ushlab, so‘ng bo‘shating. 15 marta takrorlang.',
    tip: '💡 Bukchayish va "text-neck" baqbaqani 2 barobar osiltiradi. Bu mashq bo‘yinni tabiiy o‘rniga qaytaradi.',
    media: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Wall Angels (Qomat tiklash)',
    subtitle: '2-bosqich: Bukchayishni sindirish va ko‘krak qafasini ochish',
    target: 'Kurak orasi, orqa del‘talar, ko‘krak',
    durationSec: 40,
    sets: 3,
    instruction: 'Devorga yelkalar, bosh, dumba va bilaklarni yopishtiring. "W" holatidan sekin "Y" holatiga qo‘llarni devor bo‘ylab suring.',
    tip: '💡 Kuraklar yopishganda ko‘krak ochiladi, bo‘yin tiklanadi va qorin osilishi darhol kamayadi.',
    media: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Qorin Vakuumi (Transversus Abdominis)',
    subtitle: '3-bosqich: Ichki qorin korsetini tortish',
    target: 'Ko‘ndalang qorin mushagi (ichki devor)',
    durationSec: 30,
    sets: 3,
    instruction: 'Barcha havoni og‘iz orqali bo‘shating. Nafas olmay, kindikni umurtqaga yopishtirgandek ichkariga qattiq torting va 25-30s ushlang.',
    tip: '💡 Oddiy press faqat tashqi qavatni chiqaradi, vakuum esa ichki devorni tortib, osilgan qorinni yo‘qotadi!',
    media: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80'
  }
];

const currentStepIndex = ref(0);
const currentSet = ref(1);
const remainingSeconds = ref(steps[0].durationSec);
const isRunning = ref(false);
const intervalId = ref<any>(null);
const isAllDone = ref(false);

const activeStep = computed(() => steps[currentStepIndex.value]);

function toggleTimer() {
  if (isRunning.value) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  isRunning.value = true;
  triggerHaptic(40);
  intervalId.value = setInterval(() => {
    if (remainingSeconds.value > 1) {
      remainingSeconds.value--;
    } else {
      // Set tugadi
      completeCurrentSet();
    }
  }, 1000);
}

function pauseTimer() {
  isRunning.value = false;
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
  triggerHaptic(30);
}

function resetTimer() {
  pauseTimer();
  remainingSeconds.value = activeStep.value.durationSec;
}

function completeCurrentSet() {
  pauseTimer();
  playRestTimerFinishedSound();
  triggerTimerVibration();

  if (currentSet.value < activeStep.value.sets) {
    currentSet.value++;
    remainingSeconds.value = activeStep.value.durationSec;
  } else {
    // Ushbu mashq to'liq tugadi
    playSetCompleteSound();
    if (currentStepIndex.value < steps.length - 1) {
      currentStepIndex.value++;
      currentSet.value = 1;
      remainingSeconds.value = steps[currentStepIndex.value].durationSec;
    } else {
      // Butun finisher tugadi!
      isAllDone.value = true;
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch {}
      emit('finished');
    }
  }
}

function nextStepManual() {
  completeCurrentSet();
}

function close() {
  pauseTimer();
  emit('close');
}
</script>

<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    @click.self="close"
  >
    <div class="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 my-auto">
      <!-- Header -->
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Sparkles class="w-4 h-4" />
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-900">Baqbaqa & Qorin Finisher</h3>
            <p class="text-[11px] text-slate-500">Mashg‘ulotdan keyingi 5-7 daqiqalik qomat bloki</p>
          </div>
        </div>
        <button @click="close" class="p-1.5 rounded-full hover:bg-slate-100 text-slate-400">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Content (If not all done) -->
      <div v-if="!isAllDone" class="mt-4 space-y-4">
        <!-- Step progress indicators -->
        <div class="grid grid-cols-3 gap-1.5">
          <div 
            v-for="(_, idx) in steps" 
            :key="idx"
            class="h-1.5 rounded-full transition-all"
            :class="idx === currentStepIndex ? 'bg-amber-500' : idx < currentStepIndex ? 'bg-emerald-500' : 'bg-slate-200'"
          ></div>
        </div>

        <!-- Exercise Card -->
        <div class="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
          <div class="relative h-44 bg-slate-200">
            <img 
              :src="activeStep.media" 
              :alt="activeStep.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3.5 text-white">
              <span class="text-[10px] font-bold tracking-wider uppercase text-amber-300">
                {{ activeStep.subtitle }}
              </span>
              <h4 class="text-base font-extrabold leading-tight">
                {{ activeStep.title }}
              </h4>
            </div>
          </div>

          <div class="p-4 space-y-2.5">
            <p class="text-xs text-slate-700 leading-relaxed font-medium">
              {{ activeStep.instruction }}
            </p>
            <div class="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900 leading-snug">
              {{ activeStep.tip }}
            </div>
          </div>
        </div>

        <!-- Timer & Set Counter -->
        <div class="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-inner">
          <div>
            <div class="text-[10px] uppercase font-bold text-slate-400">Podxod</div>
            <div class="text-lg font-black text-amber-400">
              {{ currentSet }} / {{ activeStep.sets }}
            </div>
          </div>

          <div class="flex items-baseline gap-1">
            <span class="text-4xl font-black font-mono tracking-tight text-white">
              {{ remainingSeconds }}
            </span>
            <span class="text-xs text-slate-400 font-bold">sek</span>
          </div>

          <div class="flex items-center gap-1.5">
            <button 
              @click="toggleTimer"
              class="w-11 h-11 rounded-2xl flex items-center justify-center font-bold active:scale-95 transition"
              :class="isRunning ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'"
            >
              <Pause v-if="isRunning" class="w-5 h-5" />
              <Play v-else class="w-5 h-5 ml-0.5" />
            </button>

            <button 
              @click="resetTimer"
              class="w-10 h-10 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center active:scale-95 transition"
              title="Qayta boshlash"
            >
              <RotateCcw class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Next / Complete button -->
        <button 
          @click="nextStepManual"
          class="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-98 transition"
        >
          <span>Keyingi podxodga o‘tish</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- Success Screen -->
      <div v-else class="mt-6 text-center space-y-4 py-4">
        <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 class="w-9 h-9" />
        </div>
        <div>
          <h4 class="text-lg font-black text-slate-900">Finisher Muvaffaqiyatli Bajarildi!</h4>
          <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Bo‘yin mushaklari va qorin korseti mustahkamlandi. Har mashg‘ulotdagi bu 5 daqiqa 2-3 haftada yaqqol ko‘rinadi!
          </p>
        </div>
        <button 
          @click="close"
          class="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md active:scale-98 transition"
        >
          Yakunlash
        </button>
      </div>
    </div>
  </div>
</template>
