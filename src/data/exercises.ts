import { Exercise, EquipmentId } from '../types';

export const DEFAULT_EQUIPMENT_LIST: { id: EquipmentId; nameUz: string; icon: string }[] = [
  { id: 'barbell', nameUz: 'Shtanga va blinlar (Olimpiya / EZ-grif)', icon: 'Dumbbell' },
  { id: 'dumbbell', nameUz: 'Gantellar qatori (yoki yig‘ma gantellar)', icon: 'Dumbbell' },
  { id: 'bench_flat', nameUz: 'Gorizontal skameyka', icon: 'Minus' },
  { id: 'bench_incline', nameUz: 'Qiya skameyka (Incline Bench)', icon: 'Slash' },
  { id: 'pullup_bar', nameUz: 'Turnik', icon: 'Maximize2' },
  { id: 'dip_station', nameUz: 'Brus', icon: 'Pause' },
  { id: 'cable_crossover', nameUz: 'Krossover / Blokli trenajor', icon: 'Shuffle' },
  { id: 'lat_pulldown', nameUz: 'Yuqori blok (Lat Pulldown)', icon: 'ArrowDownCircle' },
  { id: 'leg_press', nameUz: 'Oyoq press trenajori (Leg Press)', icon: 'Layers' },
  { id: 'treadmill', nameUz: 'Begavoy dorojka (Yugurish yo‘lagi)', icon: 'Activity' },
  { id: 'exercise_bike', nameUz: 'Velotrenajor', icon: 'Compass' },
  { id: 'hyperextension', nameUz: 'Rim stuli / Gipertekstenziya', icon: 'Shield' }
];

export const EXERCISE_DATABASE: Exercise[] = [
  // ==================== KO'KRAK (CHEST) ====================
  {
    id: 'bench_press_barbell',
    nameUz: 'Shtanga yotib ko‘krakka siqish',
    nameEn: 'Barbell Bench Press',
    category: 'chest',
    targetMuscleUz: 'O‘rta va pastki ko‘krak',
    equipment: 'barbell',
    difficulty: 'medium',
    cuesUz: [
      'Kuraklarni skameykaga mahkam qising va qovurg‘ani oching.',
      'Shtangani ko‘krak o‘rtasiga tirsaklarni 45° burchakda ushlab tushiring.',
      'Shtangani yuqoriga siqayotganda kuchli nafas chiqaring.'
    ],
    swaps: ['bench_press_dumbbell', 'pushups_classic', 'incline_bench_press_dumbbell'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg',
    defaultSets: 4,
    defaultReps: 10,
    defaultRestSec: 90
  },
  {
    id: 'bench_press_dumbbell',
    nameUz: 'Gantellar yotib ko‘krakka siqish',
    nameEn: 'Dumbbell Bench Press',
    category: 'chest',
    targetMuscleUz: 'Ko‘krak to‘liq amplitudada',
    equipment: 'dumbbell',
    difficulty: 'easy',
    cuesUz: [
      'Gantellarni ko‘krak yoniga tushirib, mushakni chuqur cho‘zing.',
      'Tepaga ko‘targanda gantellarni bir-biriga urishtirmang, ko‘krakni qising.',
      'Harakat davomida oyoqlarni polga mahkam tirab turing.'
    ],
    swaps: ['bench_press_barbell', 'pushups_classic', 'dips_chest'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bench_Press/0.jpg',
    defaultSets: 4,
    defaultReps: 10,
    defaultRestSec: 75
  },
  {
    id: 'incline_bench_press_barbell',
    nameUz: 'Shtanga qiya skameykada siqish (30°)',
    nameEn: 'Incline Barbell Bench Press',
    category: 'chest',
    targetMuscleUz: 'Yuqori ko‘krak',
    equipment: 'barbell',
    difficulty: 'medium',
    cuesUz: [
      'Skameyka burchagi 30-45° dan oshmasin (aks holda yuk yelkaga o‘tadi).',
      'Grifni bo‘yin osti va o‘mrov suyagi ro‘parasiga ohista tushiring.',
      'Tepaga itarayotganda butun yuqori ko‘krakni fokusda tuting.'
    ],
    swaps: ['incline_bench_press_dumbbell', 'pushups_classic'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Barbell_Bench_Press/0.jpg',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 90
  },
  {
    id: 'incline_bench_press_dumbbell',
    nameUz: 'Gantellar qiya skameykada siqish',
    nameEn: 'Incline Dumbbell Press',
    category: 'chest',
    targetMuscleUz: 'Yuqori ko‘krak',
    equipment: 'dumbbell',
    difficulty: 'medium',
    cuesUz: [
      'Pastki nuqtada yuqori ko‘krak tolalari maksimal cho‘zilishini his qiling.',
      'Tirsaklar haddan tashqari yon tomonga ochilib ketmasin (45-60°).',
      'Cho‘qqi nuqtada 1 soniya qisib ushlang.'
    ],
    swaps: ['incline_bench_press_barbell', 'bench_press_dumbbell'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/0.jpg',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 75
  },
  {
    id: 'dips_chest',
    nameUz: 'Brusda ko‘krakka ishlash',
    nameEn: 'Chest Dips',
    category: 'chest',
    targetMuscleUz: 'Pastki ko‘krak va triceps',
    equipment: 'dip_station',
    difficulty: 'hard',
    cuesUz: [
      'Gavdani biroz oldinga engashtiring (to‘g‘ri tursangiz tricepsga ketadi).',
      'Tirsak 90 gradus bo‘lguncha sekin tushiring, yelkani qisib saqlang.',
      'Ko‘krak kuchi bilan o‘zingizni tepaga suring.'
    ],
    swaps: ['pushups_classic', 'bench_press_dumbbell'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dips_-_Chest_Version/0.jpg',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 90
  },
  {
    id: 'pushups_classic',
    nameUz: 'Otjimaniya (Klassik polga tiralish)',
    nameEn: 'Standard Push-Up',
    category: 'chest',
    targetMuscleUz: 'Ko‘krak, yelka, press',
    equipment: 'bench_flat',
    difficulty: 'easy',
    cuesUz: [
      'Boshdan tovonigacha tana to‘g‘ri bitta chiziqda tursin, dumba osilmasin.',
      'Ko‘krakni polga 2-3 sm qolguncha tushiring.',
      'Nafas olib tushing, tepaga itarayotganda qattiq nafas chiqaring.'
    ],
    swaps: ['bench_press_dumbbell', 'dips_chest'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/0.jpg',
    defaultSets: 3,
    defaultReps: 15,
    defaultRestSec: 60
  },
  {
    id: 'cable_fly',
    nameUz: 'Krossoverda qo‘llarni birlashtirish',
    nameEn: 'Cable Crossover Fly',
    category: 'chest',
    targetMuscleUz: 'Ko‘krak ichki va o‘rta qismi',
    equipment: 'cable_crossover',
    difficulty: 'easy',
    cuesUz: [
      'Tirsaklar yengil bukilgan bo‘lsin, faqat ko‘krak mushagi qisqarishi kerak.',
      'Qo‘llarni oldinda birlashtirganda ko‘krakni 1 soniya qisib turing.',
      'Og‘irlikni orqaga sekin, nazorat bilan qaytaring.'
    ],
    swaps: ['bench_press_dumbbell', 'pushups_classic'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crossover/0.jpg',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },

  // ==================== ORQA / QANOT (BACK) ====================
  {
    id: 'pullups_classic',
    nameUz: 'Turnikda keng ushlab tortilish',
    nameEn: 'Wide-Grip Pull-Up',
    category: 'back',
    targetMuscleUz: 'Keng orqa mushak (Qanot)',
    equipment: 'pullup_bar',
    difficulty: 'hard',
    cuesUz: [
      'Qo‘llar yelkadan kengroq, osilgan holatda kuraklar to‘liq ochilsin.',
      'Ko‘krakni turnikka qarab intiltiring, kuraklarni bir-biriga qising.',
      'Siltanmasdan, sekin va nazorat bilan tushing.'
    ],
    swaps: ['lat_pulldown', 'barbell_bent_row', 'dumbbell_row_single'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pullups/0.jpg',
    defaultSets: 4,
    defaultReps: 8,
    defaultRestSec: 90
  },
  {
    id: 'lat_pulldown',
    nameUz: 'Yuqori blokni ko‘krakka tortish',
    nameEn: 'Cable Lat Pulldown',
    category: 'back',
    targetMuscleUz: 'Keng orqa mushak (Qanot)',
    equipment: 'lat_pulldown',
    difficulty: 'easy',
    cuesUz: [
      'Gavdani orqaga juda ko‘p tashlamang (ko‘pi bilan 10-15°).',
      'Dastani ko‘krak yuqorisiga torting, tirsaklar polga qarasin.',
      'Orqaga qaytayotganda qanotlar yaxshilab cho‘zilishiga yo‘l bering.'
    ],
    swaps: ['pullups_classic', 'dumbbell_row_single', 'barbell_bent_row'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/0.jpg',
    defaultSets: 4,
    defaultReps: 12,
    defaultRestSec: 75
  },
  {
    id: 'barbell_bent_row',
    nameUz: 'Shtanga engashib qoringa tortish',
    nameEn: 'Bent-Over Barbell Row',
    category: 'back',
    targetMuscleUz: 'Orqa qalinligi, trapetsiya',
    equipment: 'barbell',
    difficulty: 'medium',
    cuesUz: [
      'Tizzalarni ozgina buking, bel mutlaqo to‘g‘ri tursin (bukchayish taqiqlanadi!).',
      'Shtangani kindik sohasiga qarab torting, kuraklarni qattiq qising.',
      'Harakat faqat orqa mushaklari hisobiga bo‘lsin, gavda silkinmasin.'
    ],
    swaps: ['dumbbell_row_single', 'lat_pulldown'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/0.jpg',
    defaultSets: 4,
    defaultReps: 10,
    defaultRestSec: 90
  },
  {
    id: 'dumbbell_row_single',
    nameUz: 'Bir qo‘lda gantel skameykaga tiralib tortish',
    nameEn: 'One-Arm Dumbbell Row',
    category: 'back',
    targetMuscleUz: 'Qanot, rombsimon mushak',
    equipment: 'dumbbell',
    difficulty: 'easy',
    cuesUz: [
      'Bir tizza va qo‘l skameykada, orqa gorizontal tekis holatda.',
      'Gantelni bel tomonga yoy bo‘ylab torting, tirsakni maksimal tepaga chiqaring.',
      'Pastda qanotni to‘liq cho‘zing, lekin elka bo‘g‘inini burib yubormang.'
    ],
    swaps: ['barbell_bent_row', 'lat_pulldown'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Dumbbell_Row/0.jpg',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },
  {
    id: 'hyperextension_back',
    nameUz: 'Rim stulida gavdani ko‘tarish (Gipertekstenziya)',
    nameEn: 'Hyperextensions',
    category: 'back',
    targetMuscleUz: 'Bel mushaklari (erector spinae), dumba',
    equipment: 'hyperextension',
    difficulty: 'easy',
    cuesUz: [
      'Yostiqcha sonning bukilish chizig‘idan pastroqda tursin.',
      'Pastga tushganda belni haddan ortiq dumaloqlamang.',
      'Tepaga chiqqanda belni orqaga sindirib qayirmang, to‘g‘ri chiziqqacha chiqing.'
    ],
    swaps: ['romanian_deadlift_dumbbell'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hyperextensions_Back_Extensions/0.jpg',
    defaultSets: 3,
    defaultReps: 15,
    defaultRestSec: 60
  },

  // ==================== OYOQ (LEGS) ====================
  {
    id: 'squat_barbell',
    nameUz: 'Shtanga bilan orqada prised',
    nameEn: 'Barbell Back Squat',
    category: 'legs',
    targetMuscleUz: 'Kvadriseps, dumba, butun tana',
    equipment: 'barbell',
    difficulty: 'hard',
    cuesUz: [
      'Oyoqlar yelka kengligida, oyoq uchi 15-30° tashqariga qarasin.',
      'Dumbani orqaga olib, go‘yo stulga o‘tirgandek sonlar polga parallelgacha tushing.',
      'Og‘irlik tovon va oyoq o‘rtasida bo‘lsin, tizzalar ichkariga kirib ketmasin.'
    ],
    swaps: ['goblet_squat_dumbbell', 'leg_press', 'dumbbell_lunges'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/0.jpg',
    defaultSets: 4,
    defaultReps: 10,
    defaultRestSec: 120
  },
  {
    id: 'goblet_squat_dumbbell',
    nameUz: 'Goblet prised (Bitta og‘ir gantel ko‘krakda)',
    nameEn: 'Goblet Squat',
    category: 'legs',
    targetMuscleUz: 'Kvadriseps, qorin pressi, dumba',
    equipment: 'dumbbell',
    difficulty: 'easy',
    cuesUz: [
      'Gantelni ko‘krak oldida vertikal ushlang, tirsaklar pastga qarasin.',
      'Chuqur o‘tiring, tirsaklar tizza ichki qismiga tegishi mumkin.',
      'Ko‘krakni tik ushlang, oldinga yiqilmang.'
    ],
    swaps: ['squat_barbell', 'leg_press'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Goblet_Squat/0.jpg',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 75
  },
  {
    id: 'leg_press',
    nameUz: 'Trenajorda oyoq bilan og‘irlik itarish',
    nameEn: 'Leg Press',
    category: 'legs',
    targetMuscleUz: 'Oyoq old qismi va dumba',
    equipment: 'leg_press',
    difficulty: 'easy',
    cuesUz: [
      'Bel va dumba suyanchiqqa 100% yopishgan bo‘lsin (dumba ko‘tarilmasin!).',
      'Platformani tizzalar 90° bukilguncha tushiring.',
      'Tepada tizzalarni qotirib (zamok qilib) to‘g‘rilamang, doim yengil bukilgan tursin.'
    ],
    swaps: ['squat_barbell', 'goblet_squat_dumbbell'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/0.jpg',
    defaultSets: 4,
    defaultReps: 12,
    defaultRestSec: 90
  },
  {
    id: 'dumbbell_lunges',
    nameUz: 'Gantellar bilan oldinga qadam tashlash (Vipadi)',
    nameEn: 'Dumbbell Walking Lunges',
    category: 'legs',
    targetMuscleUz: 'Dumba, sonning oldi va orqasi',
    equipment: 'dumbbell',
    difficulty: 'medium',
    cuesUz: [
      'Katta qadam tashlang, orqa tizza polga 2 sm qolguncha tushing.',
      'Oldingi tizza oyoq uchidan juda oldinga chiqib ketmasin.',
      'Gavdani tik ushlang, dumba kuchi bilan o‘zingizni tepaga ko‘taring.'
    ],
    swaps: ['goblet_squat_dumbbell', 'squat_barbell'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Lunges/0.jpg',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 75
  },
  {
    id: 'romanian_deadlift_dumbbell',
    nameUz: 'Gantellar bilan orqa songa engashish (RDL)',
    nameEn: 'Romanian Deadlift with Dumbbells',
    category: 'legs',
    targetMuscleUz: 'Son orqasi (Biceps bedra) va dumba',
    equipment: 'dumbbell',
    difficulty: 'medium',
    cuesUz: [
      'Tizzalar yengil bukilgan, lekin qotirilgan bo‘lsin.',
      'Dumbani orqaga cho‘zib, gantellarni oyoq bo‘ylab boldirgacha tushiring.',
      'Orqa soningiz qattiq cho‘zilganini his qilib, dumba kuchi bilan tiklaning.'
    ],
    swaps: ['hyperextension_back', 'squat_barbell'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift_with_Dumbbells/0.jpg',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 75
  },

  // ==================== YELKA (SHOULDERS) ====================
  {
    id: 'overhead_press_barbell',
    nameUz: 'Shtanga tik turib tepaga siqish (Armiya jimi)',
    nameEn: 'Standing Barbell Overhead Press',
    category: 'shoulders',
    targetMuscleUz: 'Oldingi va o‘rta del‘ta, qomat',
    equipment: 'barbell',
    difficulty: 'hard',
    cuesUz: [
      'Qorin pressini va dumbani qattiq qising, bel orqaga bukilmasin.',
      'Shtangani ko‘krak ustidan to‘g‘ri bosh ustiga itaring.',
      'Tepada boshni biroz oldinga chiqarib, grif ostiga kiring.'
    ],
    swaps: ['overhead_press_dumbbell', 'dumbbell_lateral_raises'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Military_Press/0.jpg',
    defaultSets: 4,
    defaultReps: 8,
    defaultRestSec: 90
  },
  {
    id: 'overhead_press_dumbbell',
    nameUz: 'Gantellar o‘tirib tepaga siqish',
    nameEn: 'Seated Dumbbell Shoulder Press',
    category: 'shoulders',
    targetMuscleUz: 'Yelka del‘talari',
    equipment: 'dumbbell',
    difficulty: 'easy',
    cuesUz: [
      'Skameyka suyanchig‘i deyarli tik (80-85°).',
      'Gantellarni quloq ro‘parasigacha tushiring, so‘ng tepaga yoying.',
      'Tepada gantellarni bir-biriga urishtirmang, yelka tarangligini saqlang.'
    ],
    swaps: ['overhead_press_barbell', 'dumbbell_lateral_raises'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Dumbbell_Press/0.jpg',
    defaultSets: 4,
    defaultReps: 10,
    defaultRestSec: 75
  },
  {
    id: 'dumbbell_lateral_raises',
    nameUz: 'Gantellarni yon tomonga ko‘tarish (O‘rta yelka)',
    nameEn: 'Dumbbell Lateral Raise',
    category: 'shoulders',
    targetMuscleUz: 'O‘rta del‘ta (Yelkani kengaytiruvchi)',
    equipment: 'dumbbell',
    difficulty: 'easy',
    cuesUz: [
      'Tirsaklarni biroz buking, gantelni emas, tirsakni tepaga olib chiqing.',
      'Harakat yelka balandligidan oshmasin (bo‘yinga zo‘riqish bermaslik uchun).',
      'Gavdani silkitmasdan, 2 soniya pastga tushiring.'
    ],
    swaps: ['overhead_press_dumbbell'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/0.jpg',
    defaultSets: 4,
    defaultReps: 12,
    defaultRestSec: 60
  },
  {
    id: 'dumbbell_rear_delt_fly',
    nameUz: 'Engashib gantellarni yonga ochish (Orqa del‘ta)',
    nameEn: 'Bent-Over Dumbbell Rear Delt Fly',
    category: 'shoulders',
    targetMuscleUz: 'Orqa del‘ta, kuraklar (Qomatni tiklaydi)',
    equipment: 'dumbbell',
    difficulty: 'medium',
    cuesUz: [
      'Bel tekis, tana deyarli polga parallel engashsin.',
      'Qo‘llarni yon tomonga ochayotganda orqa yelka va kurakni siqing.',
      'Bo‘yinni erkin tuting, oldinga qaramang, polga qarang.'
    ],
    swaps: ['dumbbell_lateral_raises', 'dumbbell_row_single'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Rear_Delt_Fly/0.jpg',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },

  // ==================== QO'L (ARMS - BICEPS & TRICEPS) ====================
  {
    id: 'biceps_curl_barbell',
    nameUz: 'Shtanga tik turib bicepsga bukish',
    nameEn: 'Standing Barbell Biceps Curl',
    category: 'arms',
    targetMuscleUz: 'Biceps ikki boshli mushagi',
    equipment: 'barbell',
    difficulty: 'easy',
    cuesUz: [
      'Tirsaklarni qovurg‘aga mahkam qising, orqaga-oldinga siljitmaslikka harakat qiling.',
      'Shtangani ko‘krakka yetkazganda bicepsni 1 soniya toshdek qotiring.',
      'Tushirayotganda qo‘lni to‘liq, lekin nazorat bilan oching.'
    ],
    swaps: ['biceps_curl_dumbbell', 'hammer_curl_dumbbell'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl/0.jpg',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 60
  },
  {
    id: 'biceps_curl_dumbbell',
    nameUz: 'Gantellarni burab bicepsga bukish (Supinatsiya)',
    nameEn: 'Dumbbell Alternate Biceps Curl',
    category: 'arms',
    targetMuscleUz: 'Biceps cho‘qqisi va bilak',
    equipment: 'dumbbell',
    difficulty: 'easy',
    cuesUz: [
      'Harakat boshida kaft songa qaraydi, ko‘tarilayotganda kaftni tepaga buring.',
      'Biceps maksimal qisqarganda jimjiloqni biroz yuqoriroqqa buring.',
      'Harakat faqat tirsak bo‘g‘inida bo‘lsin.'
    ],
    swaps: ['biceps_curl_barbell', 'hammer_curl_dumbbell'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Incline_Dumbbell_Curl/0.jpg',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },
  {
    id: 'hammer_curl_dumbbell',
    nameUz: 'Gantellarni bolg‘a usulida bukish (Hammer Curl)',
    nameEn: 'Dumbbell Hammer Curl',
    category: 'arms',
    targetMuscleUz: 'Braxialis, bilak va qo‘l qalinligi',
    equipment: 'dumbbell',
    difficulty: 'easy',
    cuesUz: [
      'Kaftlar bir-biriga qaragan neytral holatda saqlansin.',
      'Gantellarni yelka tomoniga qat’iy tebranishsiz ko‘taring.',
      'Qo‘lning yon qismi va bilakdagi yonishni his qiling.'
    ],
    swaps: ['biceps_curl_dumbbell', 'biceps_curl_barbell'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hammer_Curls/0.jpg',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },
  {
    id: 'triceps_dips_bench',
    nameUz: 'Skameykadan orqa tomonga otjimaniya (Triceps)',
    nameEn: 'Bench Dips',
    category: 'arms',
    targetMuscleUz: 'Triceps uch boshli mushagi',
    equipment: 'bench_flat',
    difficulty: 'easy',
    cuesUz: [
      'Qo‘llarni skameyka chetiga son yoniga qo‘ying, orqa skameykaga yaqin yursin.',
      'Tirsak 90 gradus bukilguncha pastga tushing.',
      'Tepaga itarayotganda tricepsni qattiq siqib oching.'
    ],
    swaps: ['skullcrusher_dumbbell', 'triceps_pushdown_cable'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/0.jpg',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },
  {
    id: 'triceps_pushdown_cable',
    nameUz: 'Blokda trosni pastga bosish',
    nameEn: 'Cable Triceps Pushdown',
    category: 'arms',
    targetMuscleUz: 'Triceps tashqi va yon qismi',
    equipment: 'cable_crossover',
    difficulty: 'easy',
    cuesUz: [
      'Tirsaklarni gavdaga yopishtiring va butun podxod davomida qimirlatmang.',
      'Dastani to‘liq pastga bosib, qo‘llarni yonga oching.',
      'Faqat bilak qismi harakat qilsin, yelka bilan og‘irlikni ezmang.'
    ],
    swaps: ['triceps_dips_bench', 'skullcrusher_dumbbell'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown/0.jpg',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },
  {
    id: 'skullcrusher_dumbbell',
    nameUz: 'Gantellarni yotib peshonaga tushirish (Fransuz jimi)',
    nameEn: 'Lying Dumbbell Triceps Extension',
    category: 'arms',
    targetMuscleUz: 'Triceps uzun boshi (Hajm beruvchi)',
    equipment: 'dumbbell',
    difficulty: 'medium',
    cuesUz: [
      'Yelkadan tirsakkacha qism polga nisbatan vertikal yoki yengil bosh tomonga egilgan bo‘lsin.',
      'Gantellarni quloqlar ro‘parasiga tushirib tricepsni maksimal cho‘zing.',
      'Tirsaklarni yon tomonga ochilib ketishiga yo‘l qo‘ymang.'
    ],
    swaps: ['triceps_dips_bench', 'triceps_pushdown_cable'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Dumbbell_Tricep_Extension/0.jpg',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },

  // ==================== QORIN VA PRESS (CORE & ABS) ====================
  {
    id: 'plank_standard',
    nameUz: 'Klassik planka tirsakda',
    nameEn: 'Forearm Plank',
    category: 'core',
    targetMuscleUz: 'Butun qorin korseti, ko‘ndalang mushak',
    equipment: 'bench_flat',
    difficulty: 'medium',
    cuesUz: [
      'Tirsaklar yelka ostida, damboni siqib qorinni ichga torting.',
      'Bel pastga osilib tushmasin va dumba osmonga ko‘tarilmasin.',
      'To‘xtovsiz, bir maromda tinch nafas oling (nafasni ushlab qolmang!).'
    ],
    swaps: ['lying_leg_raises'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg',
    defaultSets: 3,
    defaultReps: 45, // soniya
    defaultRestSec: 60
  },
  {
    id: 'hanging_leg_raises',
    nameUz: 'Turnikda osilib tizzalarni ko‘krakka tortish',
    nameEn: 'Hanging Knee/Leg Raise',
    category: 'core',
    targetMuscleUz: 'Pastki qorin pressi',
    equipment: 'pullup_bar',
    difficulty: 'hard',
    cuesUz: [
      'Gavda siltanmasligi uchun qorinni tarang tuting.',
      'Tizzalarni shunchaki ko‘tarmang, balki chanoqni (tos suyagini) yuqoriga buking.',
      'Pastga tushayotganda oyog‘ingizni tashlab yubormang.'
    ],
    swaps: ['lying_leg_raises', 'plank_standard'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hanging_Leg_Raise/0.jpg',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },
  {
    id: 'lying_leg_raises',
    nameUz: 'Yotib oyoqlarni ko‘tarish (Pastki press)',
    nameEn: 'Lying Leg Raise',
    category: 'core',
    targetMuscleUz: 'Pastki qorin qatlami',
    equipment: 'bench_flat',
    difficulty: 'easy',
    cuesUz: [
      'Bel polga qattiq yopishtirilgan bo‘lsin (qo‘lni bel ostiga qo‘yish mumkin).',
      'Oyoqlarni to‘g‘ri ushlab 90° gacha ko‘taring.',
      'Tushirayotganda tovon polga tegmasin, doimiy taranglik saqlansin.'
    ],
    swaps: ['plank_standard', 'hanging_leg_raises'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flat_Bench_Lying_Leg_Raise/0.jpg',
    defaultSets: 3,
    defaultReps: 15,
    defaultRestSec: 45
  },

  // ==================== BAQBAQA VA QOMAT FINISHER (MAXSUS BLOK) ====================
  {
    id: 'chin_tucks_mckenzie',
    nameUz: 'Makenzi Chin-Tuck (Baqbaqani yo‘qotish va bo‘yinni to‘g‘rilash)',
    nameEn: 'McKenzie Chin Tuck',
    category: 'posture_chin',
    targetMuscleUz: 'Bo‘yinning chuqur fleksorlari va baqbaqa osti mushagi',
    equipment: 'bench_flat',
    difficulty: 'easy',
    cuesUz: [
      'Gavdani tik tuting, quloqlarni yelka to‘g‘risiga keltiring.',
      'Barmog‘ingiz bilan jag‘ni to‘g‘ri orqaga suring (boshni egmang, xuddi 2 qavat jag‘ qilayotgandek).',
      'Orqa tomonda 3-5 soniya ushlab turing, so‘ng bo‘shating. 15 marta takrorlang.'
    ],
    swaps: ['wall_angels_posture'],
    mediaUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    defaultSets: 3,
    defaultReps: 15,
    defaultRestSec: 30,
    isFinisher: true
  },
  {
    id: 'wall_angels_posture',
    nameUz: 'Devorda qanot mashqi (Bukchayishni yo‘qotuvchi Wall Angels)',
    nameEn: 'Wall Angels Posture Drill',
    category: 'posture_chin',
    targetMuscleUz: 'Ko‘krak qafasi, orqa kuraklar va bo‘yin asosi',
    equipment: 'bench_flat',
    difficulty: 'easy',
    cuesUz: [
      'Devorga tovon, dumba, bel, yelkalar va boshni yopishtiring.',
      'Qo‘llarni "W" harfidek devorga tekkazib, asta-sekin tepaga "Y" holatiga suring.',
      'Tirsaklar va bilak devordan ajralmasligini ta’minlang. Qomatni bir zumda tiklaydi.'
    ],
    swaps: ['chin_tucks_mckenzie'],
    mediaUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 30,
    isFinisher: true
  },
  {
    id: 'vacuum_abs',
    nameUz: 'Qorin vakuumi (Ichki qorin devorini tortish)',
    nameEn: 'Stomach Vacuum',
    category: 'posture_chin',
    targetMuscleUz: 'Ko‘ndalang qorin mushagi (Transversus Abdominis)',
    equipment: 'bench_flat',
    difficulty: 'medium',
    cuesUz: [
      'O‘pkadagi barcha havoni to‘liq og‘iz orqali chiqarib tashlang.',
      'Nafas olmay turib, qorinni kindik orqa umurtqaga yopishgandek ichkariga qattiq torting.',
      'Shu holatda 20-30 soniya ushlab turing. Kunlik 3 ta podxod qorin osilishini yo‘qotadi.'
    ],
    swaps: ['plank_standard'],
    mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    defaultSets: 3,
    defaultReps: 25,
    defaultRestSec: 30,
    isFinisher: true
  },
  {
    id: 'farmers_walk_dumbbell',
    nameUz: 'Fermercha yurish (Og‘ir gantellar bilan tik qomatda yurish)',
    nameEn: 'Dumbbell Farmer Walk',
    category: 'posture_chin',
    targetMuscleUz: 'Trapetsiya, bo‘yin, qorin korseti va ushlash kuchi',
    equipment: 'dumbbell',
    difficulty: 'medium',
    cuesUz: [
      'Ikki qo‘lda og‘ir gantellarni ushlang, ko‘krakni oldinga, kuraklarni orqaga torting.',
      'Bo‘yinni tik tutib, mayda va qat’iy qadamlar bilan 40-50 metr yuring.',
      'Gavda yon tomonga egilmasin, bel temirdek qotgan bo‘lsin.'
    ],
    swaps: ['plank_standard'],
    mediaUrl: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Farmers_Walk/0.jpg',
    defaultSets: 3,
    defaultReps: 45, // soniya
    defaultRestSec: 45,
    isFinisher: true
  },

  // ==================== KARDIO (CARDIO) ====================
  {
    id: 'treadmill_incline_walk',
    nameUz: 'Begavoy dorojkada qiyalikka yurish (12% Incline)',
    nameEn: 'Treadmill Incline Walking (Fat Burning)',
    category: 'cardio',
    targetMuscleUz: 'Yurak-qon tomir, dumba, boldir va yog‘ eritish',
    equipment: 'treadmill',
    difficulty: 'easy',
    cuesUz: [
      'Qiyalikni 10-12% ga ko‘taring, tezlikni 4.0 - 4.8 km/soat qiling.',
      'Tutqichlarni ushlab osilib olmang, qo‘llarni tabiiy harakatlantiring.',
      'Yurak urishi daqiqasiga 125-140 atrofida (Zone 2) bo‘lishi maksimal yog‘ erishini ta’minlaydi.'
    ],
    swaps: ['exercise_bike_intervals'],
    mediaUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=80',
    defaultSets: 1,
    defaultReps: 20, // daqiqa
    defaultRestSec: 0
  },
  {
    id: 'exercise_bike_intervals',
    nameUz: 'Velotrenajorda interval yurish (Kardio)',
    nameEn: 'Stationary Bike Cardio',
    category: 'cardio',
    targetMuscleUz: 'Yurak, oyoq, yog‘ eritish',
    equipment: 'exercise_bike',
    difficulty: 'easy',
    cuesUz: [
      'O‘rindiq balandligini to‘g‘rilang (oyoq to‘liq yozilganda tizza yengil bukilgan bo‘lsin).',
      'Orqani bukchaytirmasdan, bir maromda pedal aylantiring.',
      '30 soniya o‘rtacha tezlik, 30 soniya jadallashuv rejimida harakatlaning.'
    ],
    swaps: ['treadmill_incline_walk'],
    mediaUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    defaultSets: 1,
    defaultReps: 15, // daqiqa
    defaultRestSec: 0
  }
];

// Mashq qidirish yordamchisi
export function getExerciseById(id: string): Exercise | undefined {
  return EXERCISE_DATABASE.find(e => e.id === id);
}

// Bitta mushakka ishlovchi muqobillarni (Swaps) olish
export function getSwapsForExercise(exerciseId: string, availableEquipment?: EquipmentId[]): Exercise[] {
  const current = getExerciseById(exerciseId);
  if (!current) return [];

  const rawSwaps = current.swaps
    .map(id => getExerciseById(id))
    .filter((e): e is Exercise => !!e);

  // Agar mavjud jihozlar berilgan bo'lsa, faqat bor jihozlilarini qoldirish
  if (availableEquipment && availableEquipment.length > 0) {
    const filtered = rawSwaps.filter(e => availableEquipment.includes(e.equipment));
    if (filtered.length > 0) return filtered;
  }

  return rawSwaps;
}

