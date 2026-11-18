import { defineStore } from 'pinia';
import { ActiveExerciseItem, WorkoutSet, WorkoutHistoryRecord, Exercise } from '../types';
import { getExerciseById, getSwapsForExercise } from '../data/exercises';
import { playSetCompleteSound, playRestTimerFinishedSound, triggerTimerVibration, triggerHaptic, requestScreenWakeLock, releaseScreenWakeLock } from '../utils/soundAndHaptics';
import confetti from 'canvas-confetti';

const STORAGE_KEY_HISTORY = 'fitmos_workout_history_v1';
const STORAGE_KEY_ACTIVE_WORKOUT = 'fitmos_active_session_v1';

export const useWorkoutStore = defineStore('workoutStore', {
  state: () => {
    let savedHistory: WorkoutHistoryRecord[] = [];
    try {
      const hRaw = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (hRaw) savedHistory = JSON.parse(hRaw);
    } catch (e) {
      console.error('Error loading history', e);
    }

    return {
      isActive: false,
      routineName: 'Bugungi mashg‘ulot',
      focusArea: 'Umumiy kuch va qomat',
      activeExercises: [] as ActiveExerciseItem[],
      startTime: null as number | null,
      elapsedSeconds: 0,
      timerInterval: null as any,
      
      // Finisher bo'limi
      isFinisherActive: false,
      finisherDone: false,

      // Dam olish taymeri
      restTimer: {
        active: false,
        duration: 60,
        remaining: 60,
        exerciseName: '',
        interval: null as any
      },

      // Mashg'ulotlar arxivi
      history: savedHistory,

      // 1-Tap Swap Bottom Sheet holati
      swapSheet: {
        isOpen: false,
        activeInstanceId: null as string | null,
        currentExercise: null as Exercise | null,
        availableSwaps: [] as Exercise[]
      }
    };
  },

  getters: {
    totalCompletedSets(state): number {
      let count = 0;
      state.activeExercises.forEach(ex => {
        count += ex.sets.filter(s => s.completed).length;
      });
      return count;
    },

    totalPlannedSets(state): number {
      let count = 0;
      state.activeExercises.forEach(ex => {
        count += ex.sets.length;
      });
      return count;
    },

    completionPercentage(): number {
      if (this.totalPlannedSets === 0) return 0;
      return Math.round((this.totalCompletedSets / this.totalPlannedSets) * 100);
    },

    formattedElapsedTime(state): string {
      const mins = Math.floor(state.elapsedSeconds / 60);
      const secs = state.elapsedSeconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  },

  actions: {
    persistHistory() {
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(this.history));
      } catch (e) {
        console.error('History save error', e);
      }
    },

    // Kunlik reja shablonini generatsiya qilish
    generateDailyRoutine(dayNumber: number, _energyFactor: number = 1.0, painPoints: string[] = []): { routineName: string; focusArea: string; exerciseIds: string[] } {
      // 1=Dush, 2=Sesh, 3=Chor, 4=Pay, 5=Juma, 6=Shan, 7=Yak
      switch (dayNumber) {
        case 1: // Dushanba - Ko'krak + Triceps
          return {
            routineName: 'Dushanba: Ko‘krak & Triceps (Kuch rejimi)',
            focusArea: 'Ko‘krak mushaklari, triceps va yuqori gavda',
            exerciseIds: [
              'bench_press_barbell',
              'incline_bench_press_dumbbell',
              'dips_chest',
              'triceps_pushdown_cable',
              'skullcrusher_dumbbell'
            ]
          };
        case 2: // Seshanba - Gibrid (Kardio + Core + Baqbaqa)
          return {
            routineName: 'Seshanba: Qorin, Baqbaqa & Yog‘ eritish',
            focusArea: 'Ichki qorin devori, bo‘yin tiklash va Zone-2 kardio',
            exerciseIds: [
              'treadmill_incline_walk',
              'lying_leg_raises',
              'plank_standard',
              'chin_tucks_mckenzie',
              'vacuum_abs'
            ]
          };
        case 3: // Chorshanba - Orqa + Biceps
          {
            const backEx = painPoints.includes('lower_back')
              ? ['lat_pulldown', 'dumbbell_row_single', 'pullups_classic']
              : ['pullups_classic', 'barbell_bent_row', 'lat_pulldown', 'dumbbell_row_single'];

            return {
              routineName: 'Chorshanba: Keng orqa & Biceps',
              focusArea: 'Qanotlar, kurak va qo‘l quvvati',
              exerciseIds: [
                ...backEx,
                'biceps_curl_barbell',
                'hammer_curl_dumbbell'
              ]
            };
          }
        case 4: // Payshanba - Qomat tiklash & Kardio
          return {
            routineName: 'Payshanba: Qomat tiklash & Kardio',
            focusArea: 'Bukchayishni to‘g‘irlash, baqbaqa va orqa zanjir',
            exerciseIds: [
              'treadmill_incline_walk',
              'wall_angels_posture',
              'chin_tucks_mckenzie',
              'farmers_walk_dumbbell',
              'vacuum_abs'
            ]
          };
        case 5: // Juma - Oyoq + Yelka
          {
            const legEx = painPoints.includes('knee')
              ? ['leg_press', 'romanian_deadlift_dumbbell']
              : ['squat_barbell', 'dumbbell_lunges', 'romanian_deadlift_dumbbell'];

            return {
              routineName: 'Juma: Oyoq & Temir Yelka',
              focusArea: 'Kvadriseps, orqa son va yelka del‘talari',
              exerciseIds: [
                ...legEx,
                'overhead_press_dumbbell',
                'dumbbell_lateral_raises',
                'dumbbell_rear_delt_fly'
              ]
            };
          }
        case 6: // Shanba - Full Body Express
          return {
            routineName: 'Shanba: Butun tana & Rekompozitsiya',
            focusArea: 'Ko‘krak, orqa, press va metabolizm',
            exerciseIds: [
              'goblet_squat_dumbbell',
              'bench_press_dumbbell',
              'dumbbell_row_single',
              'dumbbell_lateral_raises',
              'vacuum_abs'
            ]
          };
        default: // Yakshanba - Tiklanish
          return {
            routineName: 'Yakshanba: Yengil tiklanish & Sayr',
            focusArea: 'Bo‘g‘imlar harakati, chuqur nafas va tinchlanish',
            exerciseIds: [
              'wall_angels_posture',
              'chin_tucks_mckenzie',
              'vacuum_abs'
            ]
          };
      }
    },

    // Mashg'ulotni boshlash
    startWorkoutSession(routineName: string, focusArea: string, exerciseIds: string[], energyFactor: number = 1.0) {
      this.isActive = true;
      this.routineName = routineName;
      this.focusArea = focusArea;
      this.startTime = Date.now();
      this.elapsedSeconds = 0;
      this.finisherDone = false;
      this.isFinisherActive = false;

      // Ekran o'chmasligini yoqish
      requestScreenWakeLock();

      // Taymerni yurgazish
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        this.elapsedSeconds++;
      }, 1000);

      // Mashqlarni reaktiv ro'yxatga aylantirish
      this.activeExercises = exerciseIds.map((exId, idx) => {
        const ex = getExerciseById(exId);
        let numSets = ex?.defaultSets || 3;
        
        // Agar charchagan bo'lsa (energyFactor < 1.0), podxodlar sonini 1 taga kamaytirish
        if (energyFactor <= 0.75 && numSets > 2) {
          numSets -= 1;
        }

        const sets: WorkoutSet[] = [];
        for (let s = 1; s <= numSets; s++) {
          sets.push({
            setNumber: s,
            targetReps: ex?.defaultReps || 10,
            reps: ex?.defaultReps || 10,
            weight: 0,
            completed: false
          });
        }

        return {
          instanceId: `inst_${idx}_${Date.now()}`,
          exerciseId: exId,
          sets
        };
      });

      this.saveActiveSession();
    },

    saveActiveSession() {
      // LocalStorage ga joriy sessiyani saqlab qo'yish (telefon refresh bo'lsa ham yo'qolmasligi uchun)
      try {
        if (this.isActive) {
          localStorage.setItem(STORAGE_KEY_ACTIVE_WORKOUT, JSON.stringify({
            isActive: this.isActive,
            routineName: this.routineName,
            focusArea: this.focusArea,
            activeExercises: this.activeExercises,
            startTime: this.startTime,
            elapsedSeconds: this.elapsedSeconds
          }));
        } else {
          localStorage.removeItem(STORAGE_KEY_ACTIVE_WORKOUT);
        }
      } catch (e) {
        console.error('Save active session error', e);
      }
    },

    // 1-Tap Swap Bottom-Sheetni ochish
    openSwapSheet(instanceId: string, availableEquipment?: string[]) {
      const target = this.activeExercises.find(i => i.instanceId === instanceId);
      if (!target) return;

      const exercise = getExerciseById(target.exerciseId);
      if (!exercise) return;

      const swaps = getSwapsForExercise(target.exerciseId, availableEquipment as any);

      this.swapSheet = {
        isOpen: true,
        activeInstanceId: instanceId,
        currentExercise: exercise,
        availableSwaps: swaps
      };
    },

    closeSwapSheet() {
      this.swapSheet.isOpen = false;
      this.swapSheet.activeInstanceId = null;
      this.swapSheet.currentExercise = null;
      this.swapSheet.availableSwaps = [];
    },

    // 1-Tap Swapni amalga oshirish!
    applySwap(newInstanceExerciseId: string) {
      if (!this.swapSheet.activeInstanceId) return;

      const idx = this.activeExercises.findIndex(i => i.instanceId === this.swapSheet.activeInstanceId);
      if (idx !== -1) {
        const oldExercise = this.activeExercises[idx];
        const newExData = getExerciseById(newInstanceExerciseId);
        
        // Yangi mashq uchun podxodlarni qayta moslash
        const updatedSets: WorkoutSet[] = oldExercise.sets.map(s => ({
          ...s,
          targetReps: newExData?.defaultReps || s.targetReps,
          reps: newExData?.defaultReps || s.reps
        }));

        this.activeExercises[idx] = {
          ...oldExercise,
          exerciseId: newInstanceExerciseId,
          swappedFromId: oldExercise.exerciseId,
          sets: updatedSets
        };

        triggerHaptic(60);
        this.closeSwapSheet();
        this.saveActiveSession();
      }
    },

    // Podxodni belgilash (Toggle Set Complete) — 1-Tap Core Loop
    toggleSetComplete(instanceId: string, setIndex: number) {
      const ex = this.activeExercises.find(i => i.instanceId === instanceId);
      if (!ex || !ex.sets[setIndex]) return;

      const set = ex.sets[setIndex];
      set.completed = !set.completed;

      if (set.completed) {
        set.completedAt = new Date().toISOString();
        playSetCompleteSound();
        triggerHaptic(50);

        // Dam olish taymerini avtomatik ishga tushirish!
        const exerciseData = getExerciseById(ex.exerciseId);
        const restDuration = exerciseData?.defaultRestSec || 60;
        
        if (restDuration > 0) {
          this.startRestTimer(restDuration, exerciseData?.nameUz || 'Dam olish');
        }
      } else {
        triggerHaptic(30);
      }

      this.saveActiveSession();
    },

    updateSetWeight(instanceId: string, setIndex: number, weight: number) {
      const ex = this.activeExercises.find(i => i.instanceId === instanceId);
      if (ex && ex.sets[setIndex]) {
        ex.sets[setIndex].weight = Math.max(0, weight);
        this.saveActiveSession();
      }
    },

    updateSetReps(instanceId: string, setIndex: number, reps: number) {
      const ex = this.activeExercises.find(i => i.instanceId === instanceId);
      if (ex && ex.sets[setIndex]) {
        ex.sets[setIndex].reps = Math.max(1, reps);
        this.saveActiveSession();
      }
    },

    addSet(instanceId: string) {
      const ex = this.activeExercises.find(i => i.instanceId === instanceId);
      if (!ex) return;
      const lastSet = ex.sets[ex.sets.length - 1];
      const newSetNumber = ex.sets.length + 1;
      ex.sets.push({
        setNumber: newSetNumber,
        targetReps: lastSet ? lastSet.targetReps : 10,
        reps: lastSet ? lastSet.reps : 10,
        weight: lastSet ? lastSet.weight : 0,
        completed: false
      });
      triggerHaptic(30);
      this.saveActiveSession();
    },

    removeSet(instanceId: string, setIndex: number) {
      const ex = this.activeExercises.find(i => i.instanceId === instanceId);
      if (!ex || ex.sets.length <= 1) return;
      ex.sets.splice(setIndex, 1);
      // Qayta raqamlash
      ex.sets.forEach((s, idx) => {
        s.setNumber = idx + 1;
      });
      triggerHaptic(30);
      this.saveActiveSession();
    },

    // Dam olish taymeri harakatlari
    startRestTimer(seconds: number, exerciseName: string) {
      this.stopRestTimer();
      this.restTimer = {
        active: true,
        duration: seconds,
        remaining: seconds,
        exerciseName,
        interval: setInterval(() => {
          if (this.restTimer.remaining > 1) {
            this.restTimer.remaining--;
          } else {
            // Taymer 0 ga tushdi!
            this.restTimer.remaining = 0;
            this.stopRestTimer();
            playRestTimerFinishedSound();
            triggerTimerVibration();
          }
        }, 1000)
      };
    },

    stopRestTimer() {
      if (this.restTimer.interval) {
        clearInterval(this.restTimer.interval);
        this.restTimer.interval = null;
      }
      this.restTimer.active = false;
    },

    addRestSeconds(addedSec: number) {
      if (this.restTimer.active) {
        this.restTimer.remaining += addedSec;
        this.restTimer.duration += addedSec;
        triggerHaptic(40);
      }
    },

    // Mashg'ulotni yakunlash
    finishWorkout(userId: string): WorkoutHistoryRecord {
      this.stopRestTimer();
      if (this.timerInterval) clearInterval(this.timerInterval);

      // Ekran o'chmasligini bekor qilish
      releaseScreenWakeLock();

      const exerciseSummary = this.activeExercises.map(ex => {
        const exData = getExerciseById(ex.exerciseId);
        const compSets = ex.sets.filter(s => s.completed);
        const bestWeight = Math.max(0, ...compSets.map(s => s.weight));
        const volume = compSets.reduce((sum, s) => sum + (s.weight * s.reps), 0);

        return {
          exerciseId: ex.exerciseId,
          exerciseNameUz: exData?.nameUz || 'Noma’lum mashq',
          completedSets: compSets.length,
          totalSets: ex.sets.length,
          bestWeight,
          totalVolumeKg: volume
        };
      });

      const totalTonnage = exerciseSummary.reduce((sum, e) => sum + e.totalVolumeKg, 0);

      const record: WorkoutHistoryRecord = {
        id: 'rec_' + Date.now(),
        userId,
        date: new Date().toISOString().split('T')[0],
        startTime: new Date(this.startTime || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        durationMinutes: Math.max(1, Math.round(this.elapsedSeconds / 60)),
        routineName: this.routineName,
        exercises: exerciseSummary,
        totalTonnageKg: totalTonnage,
        finisherDone: this.finisherDone,
        feelingScore: 5
      };

      this.history.unshift(record);
      this.persistHistory();

      // Confetti portlashi
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignored
      }

      this.isActive = false;
      this.activeExercises = [];
      this.saveActiveSession();

      return record;
    }
  }
});
