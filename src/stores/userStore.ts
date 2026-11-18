import { defineStore } from 'pinia';
import { UserProfile, WeightRecord, DailyCheckInState, EquipmentId, FitnessGoal } from '../types';

const STORAGE_KEY_PROFILES = 'fitmos_profiles_v1';
const STORAGE_KEY_ACTIVE_USER = 'fitmos_active_user_v1';
const STORAGE_KEY_WEIGHTS = 'fitmos_weights_v1';
const STORAGE_KEY_CHECKINS = 'fitmos_checkins_v1';

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr_baxrom_default',
  name: 'Baxrom',
  avatar: '🏋️‍♂️',
  gender: 'male',
  age: 26,
  height: 170,
  weight: 83,
  targetWeight: 74,
  goal: 'recomposition',
  equipment: [
    'barbell',
    'dumbbell',
    'bench_flat',
    'bench_incline',
    'pullup_bar',
    'dip_station',
    'cable_crossover',
    'lat_pulldown',
    'leg_press',
    'treadmill',
    'hyperextension'
  ],
  scheduleDays: [1, 2, 3, 4, 5, 6], // Dushanba - Shanba
  dayModes: {
    1: 'strength',      // Dush: Ko'krak + Triceps
    2: 'hybrid',        // Sesh: Kardio + Core + Baqbaqa
    3: 'strength',      // Chor: Orqa + Biceps
    4: 'hybrid',        // Pay: Kardio + Core + Posture
    5: 'strength',      // Juma: Oyoq + Yelka
    6: 'cardio_core',   // Shan: Erkin kardio + Cho'zilish
    7: 'rest'           // Yak: Dam olish
  },
  createdAt: new Date().toISOString()
};

export const useUserStore = defineStore('userStore', {
  state: () => {
    let loadedProfiles: UserProfile[] = [];
    let loadedActiveId = '';
    let loadedWeights: Record<string, WeightRecord[]> = {};
    let loadedCheckIns: Record<string, Record<string, DailyCheckInState>> = {};

    try {
      const pRaw = localStorage.getItem(STORAGE_KEY_PROFILES);
      if (pRaw) loadedProfiles = JSON.parse(pRaw);
    } catch (e) {
      console.error('Error loading profiles', e);
    }

    if (!loadedProfiles || loadedProfiles.length === 0) {
      loadedProfiles = [DEFAULT_PROFILE];
      loadedActiveId = DEFAULT_PROFILE.id;
    } else {
      loadedActiveId = localStorage.getItem(STORAGE_KEY_ACTIVE_USER) || loadedProfiles[0].id;
    }

    try {
      const wRaw = localStorage.getItem(STORAGE_KEY_WEIGHTS);
      if (wRaw) loadedWeights = JSON.parse(wRaw);
    } catch (e) {
      console.error('Error loading weights', e);
    }

    try {
      const cRaw = localStorage.getItem(STORAGE_KEY_CHECKINS);
      if (cRaw) loadedCheckIns = JSON.parse(cRaw);
    } catch (e) {
      console.error('Error loading checkins', e);
    }

    // Default weight yozib qo'yish agar bo'sh bo'lsa
    if (!loadedWeights[loadedActiveId] || loadedWeights[loadedActiveId].length === 0) {
      loadedWeights[loadedActiveId] = [
        {
          id: 'w_init',
          date: new Date().toISOString().split('T')[0],
          weight: 83,
          note: 'Boshlang‘ich vazn'
        }
      ];
    }

    return {
      profiles: loadedProfiles,
      activeUserId: loadedActiveId,
      weightHistoryMap: loadedWeights,
      checkInsMap: loadedCheckIns
    };
  },

  getters: {
    currentUser(state): UserProfile {
      const found = state.profiles.find(p => p.id === state.activeUserId);
      return found || state.profiles[0] || DEFAULT_PROFILE;
    },
    userWeights(state): WeightRecord[] {
      return state.weightHistoryMap[state.activeUserId] || [];
    },
    todayCheckIn(state): DailyCheckInState | null {
      const today = new Date().toISOString().split('T')[0];
      const userCheckIns = state.checkInsMap[state.activeUserId];
      return userCheckIns ? userCheckIns[today] || null : null;
    }
  },

  actions: {
    persist() {
      try {
        localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(this.profiles));
        localStorage.setItem(STORAGE_KEY_ACTIVE_USER, this.activeUserId);
        localStorage.setItem(STORAGE_KEY_WEIGHTS, JSON.stringify(this.weightHistoryMap));
        localStorage.setItem(STORAGE_KEY_CHECKINS, JSON.stringify(this.checkInsMap));
      } catch (e) {
        console.error('LocalStorage persist error', e);
      }
    },

    switchUser(userId: string) {
      const exists = this.profiles.some(p => p.id === userId);
      if (exists) {
        this.activeUserId = userId;
        this.persist();
      }
    },

    createProfile(data: {
      name: string;
      avatar?: string;
      gender: 'male' | 'female';
      age: number;
      height: number;
      weight: number;
      targetWeight: number;
      goal: FitnessGoal;
      equipment?: EquipmentId[];
    }): UserProfile {
      const newId = 'usr_' + Date.now();
      const newProfile: UserProfile = {
        id: newId,
        name: data.name.trim(),
        avatar: data.avatar || (data.gender === 'female' ? '🧘‍♀️' : '🏃‍♂️'),
        gender: data.gender,
        age: Number(data.age) || 25,
        height: Number(data.height) || 170,
        weight: Number(data.weight) || 75,
        targetWeight: Number(data.targetWeight) || 70,
        goal: data.goal,
        equipment: data.equipment || [...DEFAULT_PROFILE.equipment],
        scheduleDays: [1, 2, 3, 4, 5, 6],
        dayModes: {
          1: 'strength',
          2: 'hybrid',
          3: 'strength',
          4: 'hybrid',
          5: 'strength',
          6: 'cardio_core',
          7: 'rest'
        },
        createdAt: new Date().toISOString()
      };

      this.profiles.push(newProfile);
      this.activeUserId = newId;

      // Ilk vazn yozuvi
      if (!this.weightHistoryMap[newId]) {
        this.weightHistoryMap[newId] = [
          {
            id: 'w_' + Date.now(),
            date: new Date().toISOString().split('T')[0],
            weight: newProfile.weight,
            note: 'Boshlang‘ich qayd'
          }
        ];
      }

      this.persist();
      return newProfile;
    },

    updateProfile(updated: Partial<UserProfile>) {
      const idx = this.profiles.findIndex(p => p.id === this.activeUserId);
      if (idx !== -1) {
        this.profiles[idx] = { ...this.profiles[idx], ...updated };
        this.persist();
      }
    },

    deleteProfile(userId: string) {
      if (this.profiles.length <= 1) return false; // Oxirgi profilni o'chirib bo'lmaydi
      this.profiles = this.profiles.filter(p => p.id !== userId);
      if (this.activeUserId === userId) {
        this.activeUserId = this.profiles[0].id;
      }
      this.persist();
      return true;
    },

    toggleEquipment(eqId: EquipmentId) {
      const user = this.currentUser;
      const set = new Set(user.equipment);
      if (set.has(eqId)) {
        set.delete(eqId);
      } else {
        set.add(eqId);
      }
      this.updateProfile({ equipment: Array.from(set) });
    },

    recordWeight(weight: number, note?: string) {
      const today = new Date().toISOString().split('T')[0];
      if (!this.weightHistoryMap[this.activeUserId]) {
        this.weightHistoryMap[this.activeUserId] = [];
      }

      const existingToday = this.weightHistoryMap[this.activeUserId].find(w => w.date === today);
      if (existingToday) {
        existingToday.weight = weight;
        if (note) existingToday.note = note;
      } else {
        this.weightHistoryMap[this.activeUserId].unshift({
          id: 'w_' + Date.now(),
          date: today,
          weight,
          note
        });
      }

      // Joriy profil vaznini ham sinxron yangilash
      this.updateProfile({ weight });
      this.persist();
    },

    saveDailyCheckIn(checkIn: DailyCheckInState) {
      if (!this.checkInsMap[this.activeUserId]) {
        this.checkInsMap[this.activeUserId] = {};
      }
      this.checkInsMap[this.activeUserId][checkIn.date] = checkIn;
      this.persist();
    }
  }
});
