export type Gender = 'male' | 'female';

export type FitnessGoal = 
  | 'recomposition'     // Qorin va baqbaqani yo'qotish (Rekompozitsiya)
  | 'fat_loss'          // Tezkor ozish va kardio
  | 'muscle_gain'       // Massaga va kuchga ishlash
  | 'posture_health';   // Qomat tiklash va salomatlik

export type EquipmentId = 
  | 'barbell'           // Shtanga (Olimpiya / EZ-grif)
  | 'dumbbell'          // Gantellar
  | 'bench_flat'        // Gorizontal skameyka
  | 'bench_incline'     // Qiya skameyka
  | 'pullup_bar'        // Turnik
  | 'dip_station'       // Brus
  | 'cable_crossover'   // Krossover (tros)
  | 'lat_pulldown'      // Yuqori blok (spina)
  | 'leg_press'         // Oyoq press trenajori
  | 'treadmill'         // Begavoy dorojka
  | 'exercise_bike'     // Velotrenajor
  | 'hyperextension';   // Rim stuli / Gipertekstenziya

export type MuscleCategory = 
  | 'chest'             // Ko'krak
  | 'back'              // Orqa / Qanot
  | 'legs'              // Oyoq
  | 'shoulders'         // Yelka
  | 'arms'              // Qo'l (Biceps/Triceps)
  | 'core'              // Qorin / Press
  | 'posture_chin'      // Baqbaqa & Qomat
  | 'cardio';           // Yurak & Chidamlilik

export interface Exercise {
  id: string;
  nameUz: string;
  nameEn: string;
  category: MuscleCategory;
  targetMuscleUz: string;
  equipment: EquipmentId;
  difficulty: 'easy' | 'medium' | 'hard';
  cuesUz: [string, string, string]; // 3 ta oltin qoida: Boshlanishi, Harakat, Nafas
  swaps: string[]; // Muqobil mashqlar ID lari
  mediaUrl: string;
  mediaFallbackUrl?: string;
  defaultSets: number;
  defaultReps: number;
  defaultRestSec: number;
  isFinisher?: boolean;
}

export interface WorkoutSet {
  setNumber: number;
  targetReps: number;
  reps: number;
  weight: number;
  completed: boolean;
  completedAt?: string;
}

export interface ActiveExerciseItem {
  instanceId: string;
  exerciseId: string;
  sets: WorkoutSet[];
  swappedFromId?: string;
  notes?: string;
}

export type EnergyLevel = 100 | 75 | 50 | 30;
export type PainPoint = 'knee' | 'lower_back' | 'shoulder' | 'none';

export interface DailyCheckInState {
  date: string;
  energy: EnergyLevel;
  painPoints: PainPoint[];
  autoScaleFactor: number; // 1.0 (100%), 0.85 (75%), 0.70 (50/30%)
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  gender: Gender;
  age: number;
  height: number; // sm
  weight: number; // kg
  targetWeight: number; // kg
  goal: FitnessGoal;
  equipment: EquipmentId[];
  scheduleDays: number[]; // 1=Dush, 2=Sesh, ..., 6=Shan, 7=Yak
  dayModes: Record<number, 'strength' | 'cardio_core' | 'hybrid' | 'rest'>;
  createdAt: string;
}

export interface WeightRecord {
  id: string;
  date: string;
  weight: number;
  note?: string;
}

export interface WorkoutHistoryRecord {
  id: string;
  userId: string;
  date: string;
  startTime: string;
  endTime?: string;
  durationMinutes: number;
  routineName: string;
  exercises: {
    exerciseId: string;
    exerciseNameUz: string;
    completedSets: number;
    totalSets: number;
    bestWeight: number;
    totalVolumeKg: number;
  }[];
  totalTonnageKg: number;
  finisherDone: boolean;
  feelingScore: number; // 1-5
}
