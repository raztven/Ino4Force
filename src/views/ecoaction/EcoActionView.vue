<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">
      <main class="mx-auto max-w-[1400px] px-4 pb-28 pt-1 sm:px-5 md:px-8 md:pb-10 md:pt-8">
        <!-- Mobile Header -->
        <MobileHeader />

        <!-- Header -->
        <section class="mb-5 md:mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 class="text-[22px] font-bold tracking-tight text-[#17211B] md:text-[28px]">
              Eco Action
            </h1>
            <p class="mt-1 text-xs leading-5 text-[#66736A] md:text-sm">
              Catat aksi nyata kamu untuk mendapatkan XP dan memperbarui progress.
            </p>
          </div>

          <button
            type="button"
            @click="openModal = true"
            class="flex items-center justify-center gap-2 rounded-xl bg-[#22C55E] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#15803D] active:scale-[0.98] md:px-5 md:py-3 md:text-sm"
          >
            <Plus class="h-4 w-4" />
            + Record Eco Action
          </button>
        </section>

        <!-- Tabs Filter -->
        <section class="mb-6 flex items-center justify-between">
          <div class="flex items-center gap-2 rounded-xl border border-[#E8EDE9] bg-white p-1">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              type="button"
              @click="activeTab = tab.value"
              class="rounded-lg px-4 py-1.5 text-xs font-semibold transition md:px-5 md:py-2"
              :class="
                activeTab === tab.value
                  ? 'bg-[#22C55E] text-white'
                  : 'text-[#66736A] hover:text-[#17211B]'
              "
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="hidden items-center gap-2 text-xs text-[#98A39C] md:flex">
            <span>Total Catatan:</span>
            <span class="font-bold text-[#17211B]">{{ actionsList.length }} Aksi</span>
          </div>
        </section>

        <!-- Eco Action List -->
        <section class="space-y-3.5 md:space-y-4">
          <div
            v-for="action in filteredActions"
            :key="action.id"
            class="group flex flex-col gap-4 rounded-2xl border border-[#E8EDE9] bg-white p-4 transition hover:border-[#22C55E]/30 hover:shadow-sm md:flex-row md:items-center md:justify-between md:p-5"
          >
            <div class="flex items-start gap-3.5 md:items-center md:gap-4">
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl md:h-12 md:w-12"
                :class="getCategoryBg(action.category)"
              >
                <component
                  :is="getCategoryIcon(action.category)"
                  class="h-5 w-5 md:h-6 md:w-6"
                  :class="getCategoryColor(action.category)"
                />
              </div>

              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-sm font-bold text-[#17211B] md:text-base">
                    {{ action.title }}
                  </h3>
                  <span
                    class="rounded-full px-2.5 py-0.5 text-[10px] font-semibold md:text-xs"
                    :class="getCategoryTagStyle(action.category)"
                  >
                    {{ action.category }}
                  </span>
                </div>

                <p class="mt-1 text-xs text-[#66736A]">
                  {{ action.description }}
                </p>

                <div class="mt-2 flex items-center gap-3 text-[11px] text-[#98A39C]">
                  <span>{{ action.date }} • {{ action.time || '10:00' }}</span>
                  <span>•</span>
                  <span class="text-[#22C55E] font-medium">{{ action.impact }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between border-t border-[#F0F4F1] pt-3 md:border-0 md:pt-0">
              <span class="rounded-xl bg-[#EAF8EE] px-3.5 py-1.5 text-xs font-bold text-[#15803D] md:text-sm">
                +{{ action.xp }} XP
              </span>
            </div>
          </div>
        </section>

        <!-- Record Modal Form -->
        <div
          v-if="openModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
        >
          <div class="w-full max-w-lg rounded-2xl border border-[#E8EDE9] bg-white p-6 shadow-xl">
            <div class="flex items-center justify-between border-b border-[#E8EDE9] pb-4">
              <div>
                <h3 class="text-base font-bold text-[#17211B] md:text-lg">
                  Catat Aksi Eco Baru
                </h3>
                <p class="text-xs text-[#98A39C]">
                  Dapatkan XP untuk setiap aksi ramah lingkungan yang kamu lakukan
                </p>
              </div>
              <button
                type="button"
                @click="openModal = false"
                class="rounded-lg p-1 text-[#98A39C] hover:bg-[#F5F8F5] hover:text-[#17211B]"
              >
                <X class="h-5 w-5" />
              </button>
            </div>

            <form @submit.prevent="handleSubmit" class="mt-5 space-y-4">
              <div>
                <label class="mb-1 block text-xs font-semibold text-[#17211B]">
                  Kategori Aksi
                </label>
                <select
                  v-model="form.category"
                  class="h-10 w-full rounded-xl border border-[#E2E8E4] bg-[#F8FAF8] px-3 text-xs text-[#17211B] outline-none focus:border-[#22C55E] focus:bg-white focus:ring-4 focus:ring-[#22C55E]/10"
                >
                  <option value="Reduce Plastic">Reduce Plastic</option>
                  <option value="Save Energy">Save Energy</option>
                  <option value="Low Carbon Travel">Low Carbon Travel</option>
                  <option value="Recycle">Recycle</option>
                </select>
              </div>

              <div>
                <label class="mb-1 block text-xs font-semibold text-[#17211B]">
                  Judul Aksi
                </label>
                <input
                  type="text"
                  v-model="form.title"
                  placeholder="Contoh: Menggunakan tumbler sendiri"
                  required
                  class="h-10 w-full rounded-xl border border-[#E2E8E4] bg-[#F8FAF8] px-3 text-xs text-[#17211B] outline-none focus:border-[#22C55E] focus:bg-white focus:ring-4 focus:ring-[#22C55E]/10"
                />
              </div>

              <div>
                <label class="mb-1 block text-xs font-semibold text-[#17211B]">
                  Deskripsi Singkat
                </label>
                <textarea
                  v-model="form.description"
                  rows="3"
                  placeholder="Tuliskan catatan singkat aksimu hari ini..."
                  class="w-full rounded-xl border border-[#E2E8E4] bg-[#F8FAF8] p-3 text-xs text-[#17211B] outline-none focus:border-[#22C55E] focus:bg-white focus:ring-4 focus:ring-[#22C55E]/10"
                ></textarea>
              </div>

              <div class="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  @click="openModal = false"
                  class="rounded-xl border border-[#E8EDE9] px-4 py-2.5 text-xs font-semibold text-[#66736A] hover:bg-[#F8FAF8]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="rounded-xl bg-[#22C55E] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#15803D]"
                >
                  Simpan Aksi (+25 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Plus,
  Recycle,
  Zap,
  Bike,
  Sparkles,
  X
} from 'lucide-vue-next'
import AppLayout from '@/layouts/AppLayout.vue'
import MobileHeader from '@/components/navigation/MobileHeader.vue'
import { ecoActions } from '@/data/mockData.js'

const activeTab = ref('recent')
const openModal = ref(false)

const tabs = [
  { label: 'Recent', value: 'recent' },
  { label: 'History', value: 'history' }
]

const actionsList = ref([...ecoActions])

const form = ref({
  category: 'Reduce Plastic',
  title: '',
  description: ''
})

const filteredActions = computed(() => {
  if (activeTab.value === 'history') {
    return actionsList.value
  }
  return actionsList.value.slice(0, 4)
})

function getCategoryIcon(category) {
  switch (category) {
    case 'Reduce Plastic':
      return Recycle
    case 'Save Energy':
      return Zap
    case 'Low Carbon Travel':
      return Bike
    default:
      return Sparkles
  }
}

function getCategoryBg(category) {
  switch (category) {
    case 'Reduce Plastic':
      return 'bg-[#EAF8EE]'
    case 'Save Energy':
      return 'bg-[#FEF9C3]'
    case 'Low Carbon Travel':
      return 'bg-[#EEF5FF]'
    default:
      return 'bg-[#F3E8FF]'
  }
}

function getCategoryColor(category) {
  switch (category) {
    case 'Reduce Plastic':
      return 'text-[#22C55E]'
    case 'Save Energy':
      return 'text-[#CA8A04]'
    case 'Low Carbon Travel':
      return 'text-[#3B82F6]'
    default:
      return 'text-[#9333EA]'
  }
}

function getCategoryTagStyle(category) {
  switch (category) {
    case 'Reduce Plastic':
      return 'bg-[#EAF8EE] text-[#15803D]'
    case 'Save Energy':
      return 'bg-[#FEF9C3] text-[#A16207]'
    case 'Low Carbon Travel':
      return 'bg-[#EEF5FF] text-[#1D4ED8]'
    default:
      return 'bg-[#F3E8FF] text-[#7E22CE]'
  }
}

function handleSubmit() {
  if (!form.value.title) return

  actionsList.value.unshift({
    id: Date.now(),
    title: form.value.title,
    description: form.value.description || 'Aksi ramah lingkungan baru tercatat',
    category: form.value.category,
    value: '1 aksi',
    xp: 25,
    impact: '0,5 kg CO₂ tersimpan',
    date: 'Hari ini',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })

  form.value = {
    category: 'Reduce Plastic',
    title: '',
    description: ''
  }
  openModal.value = false
}
</script>
