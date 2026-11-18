<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { Users, UserPlus, Trash2, X } from 'lucide-vue-next';
import { FitnessGoal, Gender } from '../types';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const userStore = useUserStore();

const isCreating = ref(false);

const newName = ref('');
const newGender = ref<Gender>('male');
const newAvatar = ref('🏋️‍♂️');
const newAge = ref(25);
const newHeight = ref(170);
const newWeight = ref(80);
const newTargetWeight = ref(72);
const newGoal = ref<FitnessGoal>('recomposition');

const avatars = ['🏋️‍♂️', '🏃‍♂️', '🥊', '⚡', '🦁', '🧘‍♀️', '🏃‍♀️', '🥇'];

function handleCreate() {
  if (!newName.value.trim()) return;

  userStore.createProfile({
    name: newName.value.trim(),
    gender: newGender.value,
    avatar: newAvatar.value,
    age: Number(newAge.value) || 25,
    height: Number(newHeight.value) || 170,
    weight: Number(newWeight.value) || 75,
    targetWeight: Number(newTargetWeight.value) || 70,
    goal: newGoal.value
  });

  // Tozalash
  newName.value = '';
  isCreating.value = false;
  emit('close');
}

function selectUser(userId: string) {
  userStore.switchUser(userId);
  emit('close');
}

function deleteUser(userId: string) {
  if (confirm('Rostdan ham ushbu profilni o‘chirmoqchimisiz?')) {
    userStore.deleteProfile(userId);
  }
}
</script>

<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 my-auto">
      <!-- Header -->
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
            <Users class="w-4 h-4" />
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-900">Sportchilar (Akkauntlar)</h3>
            <p class="text-[11px] text-slate-500">Ilovani butun oila yoki do‘stlar bilan ishlatish</p>
          </div>
        </div>
        <button @click="emit('close')" class="p-1.5 rounded-full hover:bg-slate-100 text-slate-400">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Mode Selector -->
      <div class="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-2xl mt-4 text-xs font-bold">
        <button 
          @click="isCreating = false"
          class="py-2 rounded-xl transition"
          :class="!isCreating ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'"
        >
          Akkauntlar ({{ userStore.profiles.length }})
        </button>
        <button 
          @click="isCreating = true"
          class="py-2 rounded-xl transition flex items-center justify-center gap-1"
          :class="isCreating ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'"
        >
          <UserPlus class="w-3.5 h-3.5" />
          <span>Yangi qo‘shish</span>
        </button>
      </div>

      <!-- 1. Akkauntlar ro'yxati -->
      <div v-if="!isCreating" class="mt-4 space-y-2.5 max-h-72 overflow-y-auto pr-0.5">
        <div 
          v-for="prof in userStore.profiles" 
          :key="prof.id"
          class="p-3 rounded-2xl border transition flex items-center justify-between"
          :class="prof.id === userStore.activeUserId ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-200 hover:bg-slate-50'"
        >
          <div 
            @click="selectUser(prof.id)"
            class="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
          >
            <div class="w-10 h-10 rounded-2xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-xl shrink-0">
              {{ prof.avatar }}
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="text-xs font-bold text-slate-900 truncate">{{ prof.name }}</span>
                <span v-if="prof.id === userStore.activeUserId" class="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                  Faol
                </span>
              </div>
              <div class="text-[11px] text-slate-500 mt-0.5">
                {{ prof.height }} sm • {{ prof.weight }} kg • {{ prof.age }} yosh
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1 shrink-0 ml-2">
            <button 
              v-if="userStore.profiles.length > 1"
              @click="deleteUser(prof.id)"
              class="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition"
              title="O‘chirish"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- 2. Yangi profil yaratish formasi -->
      <form v-else @submit.prevent="handleCreate" class="mt-4 space-y-3">
        <!-- Ismi -->
        <div>
          <label class="block text-[11px] font-bold text-slate-700 mb-1">Ismingiz yoki taxallusingiz</label>
          <input 
            v-model="newName" 
            type="text" 
            required 
            placeholder="Masalan: Sardor"
            class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-900"
          />
        </div>

        <!-- Avatar tanlash -->
        <div>
          <label class="block text-[11px] font-bold text-slate-700 mb-1">Avatar</label>
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button 
              v-for="av in avatars" 
              :key="av"
              type="button"
              @click="newAvatar = av"
              class="w-9 h-9 rounded-xl border flex items-center justify-center text-base shrink-0 transition"
              :class="newAvatar === av ? 'border-slate-900 bg-slate-100 scale-105' : 'border-slate-200'"
            >
              {{ av }}
            </button>
          </div>
        </div>

        <!-- Jins & Yosh -->
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">Jins</label>
            <select 
              v-model="newGender" 
              class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-900 bg-white"
            >
              <option value="male">Erkak</option>
              <option value="female">Ayol</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">Yoshingiz</label>
            <input 
              v-model="newAge" 
              type="number" 
              min="10" 
              max="90" 
              class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-900"
            />
          </div>
        </div>

        <!-- Bo'y va Vazn -->
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">Bo‘y (sm)</label>
            <input 
              v-model="newHeight" 
              type="number" 
              min="120" 
              max="230" 
              class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-900"
            />
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">Vazn (kg)</label>
            <input 
              v-model="newWeight" 
              type="number" 
              min="35" 
              max="200" 
              class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-900"
            />
          </div>
        </div>

        <!-- Maqsad -->
        <div>
          <label class="block text-[11px] font-bold text-slate-700 mb-1">Asosiy Maqsad</label>
          <select 
            v-model="newGoal" 
            class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-900 bg-white"
          >
            <option value="recomposition">Qorin & Baqbaqani yo‘qotish (Rekompozitsiya)</option>
            <option value="fat_loss">Tez vazn tashlash & Kardio</option>
            <option value="muscle_gain">Massa va kuch yig‘ish</option>
            <option value="posture_health">Qomat tiklash va salomatlik</option>
          </select>
        </div>

        <button 
          type="submit"
          class="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition active:scale-98 mt-2"
        >
          Profilni yaratish
        </button>
      </form>
    </div>
  </div>
</template>
