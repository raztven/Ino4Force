<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <!-- Mobile -->
      <main class="mx-auto max-w-[430px] px-4 pb-24 md:hidden">

        <!-- Mobile Header -->
        <MobileHeader />

        <!-- Page Intro -->
        <section class="mb-4">
          <h2 class="text-[17px] font-bold text-[#17211B]">
            Quest & Misi
          </h2>

          <p class="mt-0.5 text-[9px] text-[#718078]">
            Selesaikan quest dan dapatkan XP.
          </p>
        </section>

        <!-- Tabs -->
        <div
          class="mb-4 flex rounded-xl border border-[#DCEBE0] bg-white p-1"
        >
          <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            class="flex-1 rounded-lg py-2 text-[9px] font-semibold transition"
            :class="
              activeTab === tab.value
                ? 'bg-[#22C55E] text-white'
                : 'text-[#718078]'
            "
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Quest List -->
        <section>

          <div class="mb-2 flex items-center justify-between">
            <h2 class="text-[11px] font-bold text-[#17211B]">
              {{ sectionTitle }}
            </h2>

            <span class="text-[8px] text-[#98A39C]">
              {{ filteredMissions.length }} quest
            </span>
          </div>

          <div
            v-if="filteredMissions.length"
            class="space-y-2.5"
          >

            <article
              v-for="mission in filteredMissions"
              :key="mission.id"
              class="rounded-[12px] border border-[#DCEBE0] bg-white p-3"
            >

              <div class="flex gap-3">

                <!-- Icon -->
                <div
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  :class="getCategoryStyle(mission.category)"
                >
                  <component
                    :is="getCategoryIcon(mission.category)"
                    class="h-5 w-5"
                  />
                </div>

                <!-- Content -->
                <div class="min-w-0 flex-1">

                  <div class="flex items-start justify-between gap-2">

                    <div class="min-w-0">
                      <h3
                        class="truncate text-[10px] font-bold text-[#17211B]"
                      >
                        {{ mission.title || 'Reduce Plastic' }}
                      </h3>

                      <p class="mt-0.5 text-[8px] text-[#718078]">
                        {{ mission.step || 'Step 2 of 3' }}
                      </p>
                    </div>

                    <span
                      class="shrink-0 text-[9px] font-semibold text-[#22C55E]"
                    >
                      +{{ mission.xp || 75 }} XP
                    </span>

                  </div>

                  <p class="mt-1 text-[8px] leading-3 text-[#718078]">
                    {{
                      mission.description ||
                      'Selesaikan quest untuk mendapatkan XP.'
                    }}
                  </p>

                  <!-- Progress -->
                  <div
                    v-if="
                      mission.progress !== undefined &&
                      !mission.completed
                    "
                    class="mt-2"
                  >
                    <div class="flex items-center justify-between">
                      <span class="text-[7px] text-[#98A39C]">
                        Progress
                      </span>

                      <span class="text-[7px] font-semibold text-[#22C55E]">
                        {{ mission.progress }}%
                      </span>
                    </div>

                    <div
                      class="mt-1 h-[4px] overflow-hidden rounded-full bg-[#E5EFE8]"
                    >
                      <div
                        class="h-full rounded-full bg-[#22C55E]"
                        :style="{
                          width: `${mission.progress}%`
                        }"
                      ></div>
                    </div>
                  </div>

                  <!-- Completed -->
                  <div
                    v-if="mission.completed"
                    class="mt-2 flex items-center gap-1 text-[7px] font-medium text-[#22C55E]"
                  >
                    <CheckCircle2 class="h-3 w-3" />
                    Quest selesai
                  </div>

                </div>
              </div>

              <!-- Action -->
              <RouterLink
                :to="getMissionLink(mission)"
                class="mt-3 flex h-7 items-center justify-center rounded-lg text-[8px] font-semibold transition"
                :class="
                  mission.completed
                    ? 'bg-[#F1F5F2] text-[#718078]'
                    : 'bg-[#22C55E] text-white'
                "
              >
                {{
                  mission.completed
                    ? 'Lihat Detail'
                    : mission.progress
                      ? 'Lanjutkan'
                      : 'Mulai Quest'
                }}

                <ArrowRight class="ml-1 h-3 w-3" />
              </RouterLink>

            </article>

          </div>

          <!-- Empty -->
          <div
            v-else
            class="rounded-[12px] border border-dashed border-[#DCEBE0] bg-white px-5 py-10 text-center"
          >
            <Search class="mx-auto h-6 w-6 text-[#22C55E]" />

            <p class="mt-3 text-[10px] font-semibold text-[#17211B]">
              Tidak ada quest
            </p>

            <p class="mt-1 text-[8px] text-[#718078]">
              Belum ada quest pada kategori ini.
            </p>
          </div>

        </section>

        <!-- Community Challenges -->
        <section class="mt-6">

          <div class="mb-2 flex items-end justify-between">

            <div>
              <h2 class="text-[11px] font-bold text-[#17211B]">
                Community Challenges
              </h2>

              <p class="mt-0.5 text-[8px] text-[#718078]">
                Tantangan bersama EcoQuest Explorer lainnya.
              </p>
            </div>

            <RouterLink
              to="/challenges"
              class="flex items-center gap-1 text-[8px] font-semibold text-[#15803D]"
            >
              Lihat Semua
              <ArrowRight class="h-3 w-3" />
            </RouterLink>

          </div>

          <!-- Challenge Card -->
          <article
            class="overflow-hidden rounded-[12px] border border-[#DCEBE0] bg-white"
          >

            <!-- Challenge Header -->
            <div class="bg-[#15803D] p-3.5">

              <div class="flex items-start justify-between gap-3">

                <div class="flex min-w-0 items-center gap-3">

                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15"
                  >
                    <Trophy class="h-5 w-5 text-white" />
                  </div>

                  <div class="min-w-0">

                    <p class="text-[7px] font-semibold text-white/70">
                      COMMUNITY CHALLENGE
                    </p>

                    <h3 class="mt-0.5 truncate text-[11px] font-bold text-white">
                      Plastic Reduction Week
                    </h3>

                  </div>

                </div>

                <span
                  class="shrink-0 rounded-full bg-white/15 px-2 py-1 text-[7px] font-semibold text-white"
                >
                  7 hari
                </span>

              </div>

            </div>

            <!-- Challenge Content -->
            <div class="p-3.5">

              <p class="text-[8px] leading-4 text-[#718078]">
                Kurangi penggunaan plastik sekali pakai dan ajak
                komunitasmu melakukan aksi nyata.
              </p>

              <div class="mt-3 flex items-center justify-between">

                <div>
                  <p class="text-[7px] text-[#98A39C]">
                    Peserta
                  </p>

                  <p class="mt-0.5 text-[10px] font-bold text-[#17211B]">
                    320 Explorer
                  </p>
                </div>

                <div class="text-right">
                  <p class="text-[7px] text-[#98A39C]">
                    Progress
                  </p>

                  <p class="mt-0.5 text-[10px] font-bold text-[#22C55E]">
                    68%
                  </p>
                </div>

              </div>

              <div
                class="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E5EFE8]"
              >
                <div
                  class="h-full w-[68%] rounded-full bg-[#22C55E]"
                ></div>
              </div>

              <RouterLink
                to="/challenges"
                class="mt-3 flex h-7 items-center justify-center gap-1 rounded-lg bg-[#22C55E] text-[8px] font-semibold text-white transition active:scale-[0.98]"
              >
                Lihat Challenge
                <ArrowRight class="h-3 w-3" />
              </RouterLink>

            </div>

          </article>

        </section>

      </main>

      <!-- Desktop -->
      <main class="hidden md:block">
        <div class="mx-auto max-w-[1400px] px-6 pb-10">
          <!-- Header -->
          <section class="mb-7 flex items-end justify-between">
            <div>
              <p class="mb-1 text-sm font-medium text-[#22C55E]">
                Daily & Weekly Goals
              </p>
              <h1 class="text-[28px] font-bold text-[#17211B]">
                Quest
              </h1>
              <p class="mt-1 text-sm text-[#66736A]">
                Tantangan kecil, perubahan besar. Selesaikan quest untuk mengumpulkan XP.
              </p>
            </div>

            <div class="flex gap-3">
              <div class="rounded-xl border border-[#E8EDE9] bg-white px-4 py-3 shadow-xs">
                <p class="text-[10px] text-[#98A39C]">
                  Total XP
                </p>
                <p class="mt-0.5 text-sm font-bold text-[#17211B]">
                  {{ (currentUser.xp ?? 1240).toLocaleString('id-ID') }} XP
                </p>
              </div>

              <div class="rounded-xl border border-[#E8EDE9] bg-white px-4 py-3 shadow-xs">
                <p class="text-[10px] text-[#98A39C]">
                  Streak
                </p>
                <p class="mt-0.5 text-sm font-bold text-[#EA580C]">
                  🔥 {{ currentUser.streak ?? 7 }} hari
                </p>
              </div>
            </div>
          </section>

          <!-- Desktop Filters & Search -->
          <section class="mb-6 flex items-center justify-between">
            <div class="flex rounded-xl border border-[#E8EDE9] bg-white p-1 shadow-xs">
              <button
                v-for="tab in tabs"
                :key="tab.value"
                type="button"
                class="rounded-lg px-5 py-2 text-xs font-semibold transition"
                :class="
                  activeTab === tab.value
                    ? 'bg-[#22C55E] text-white shadow-xs'
                    : 'text-[#66736A] hover:text-[#17211B]'
                "
                @click="activeTab = tab.value"
              >
                {{ tab.label }}
                <span
                  v-if="tab.count !== undefined"
                  class="ml-1 rounded-full px-1.5 py-0.2 text-[10px]"
                  :class="activeTab === tab.value ? 'bg-white/25 text-white' : 'bg-[#EAF0EB] text-[#66736A]'"
                >
                  {{ tab.count }}
                </span>
              </button>
            </div>

            <div class="relative w-[280px]">
              <Search
                class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A39C]"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari quest..."
                class="h-10 w-full rounded-xl border border-[#E8EDE9] bg-white pl-10 pr-3 text-xs outline-none focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/10"
              />
            </div>
          </section>

          <!-- Desktop Quest Grid -->
          <section class="space-y-4">
            <article
              v-for="mission in filteredMissions"
              :key="mission.id"
              class="group flex flex-col justify-between rounded-2xl border border-[#E8EDE9] bg-white p-5 shadow-xs transition hover:border-[#22C55E]/40 hover:shadow-sm md:flex-row md:items-center"
            >
              <div class="flex items-start gap-4 md:items-center">
                <div
                  class="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl transition"
                  :class="getCategoryStyle(mission.category)"
                >
                  <component
                    :is="getCategoryIcon(mission.category)"
                    class="h-6 w-6"
                  />
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="text-base font-bold text-[#17211B]">
                      {{ mission.title || 'Eco Quest' }}
                    </h3>
                    <span
                      v-if="mission.completed"
                      class="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[10px] font-bold text-[#15803D]"
                    >
                      Completed
                    </span>
                    <span
                      v-else-if="mission.progress"
                      class="rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[10px] font-bold text-[#A16207]"
                    >
                      Active
                    </span>
                    <span
                      v-else
                      class="rounded-full bg-[#EAF8EE] px-2.5 py-0.5 text-[10px] font-bold text-[#15803D]"
                    >
                      Recommended
                    </span>
                  </div>

                  <p class="mt-1 text-xs leading-5 text-[#66736A]">
                    {{ mission.description || 'Selesaikan quest untuk mendapatkan XP.' }}
                  </p>

                  <div class="mt-3 flex items-center gap-4 text-xs">
                    <span class="text-[#98A39C]">
                      {{ mission.step || (mission.completed ? 'Selesai' : 'Hari ke-1 dari 3') }}
                    </span>
                    <span class="text-[#DCE5DE]">•</span>
                    <span class="font-bold text-[#22C55E]">
                      +{{ mission.xp || 50 }} XP
                    </span>
                  </div>

                  <!-- Progress Bar -->
                  <div
                    v-if="mission.progress && !mission.completed"
                    class="mt-3 max-w-md"
                  >
                    <div class="mb-1 flex items-center justify-between text-[10px]">
                      <span class="text-[#98A39C]">Progress</span>
                      <span class="font-bold text-[#22C55E]">{{ mission.progress }}%</span>
                    </div>
                    <div class="h-1.5 overflow-hidden rounded-full bg-[#E5EFE8]">
                      <div
                        class="h-full rounded-full bg-[#22C55E]"
                        :style="{ width: `${mission.progress}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4 flex shrink-0 items-center justify-end gap-3 border-t border-[#F0F4F1] pt-3 md:mt-0 md:border-0 md:pt-0">
                <RouterLink
                  :to="getMissionLink(mission)"
                  class="flex h-10 items-center gap-2 rounded-xl px-5 text-xs font-semibold transition"
                  :class="
                    mission.completed
                      ? 'bg-[#F1F5F2] text-[#66736A] hover:bg-[#E5EAE6]'
                      : 'bg-[#22C55E] text-white shadow-xs hover:bg-[#15803D]'
                  "
                >
                  <span>
                    {{
                      mission.completed
                        ? 'Lihat Detail'
                        : mission.progress
                          ? 'Continue'
                          : 'Start Quest'
                    }}
                  </span>
                  <ArrowRight class="h-3.5 w-3.5" />
                </RouterLink>
              </div>
            </article>
          </section>
        </div>
      </main>

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'

import {
  Leaf,
  Search,
  ArrowRight,
  CheckCircle2,
  Zap,
  Recycle,
  Bike,
  Droplets,
  TreePine,
  Lightbulb,
  Trophy
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import MobileHeader from '@/components/navigation/MobileHeader.vue'

import {
  user as fallbackUser,
  missions
} from '@/data/mockData.js'
import { useAuth } from '@/composables/useAuth'

const { currentUser: authUser } = useAuth()

const currentUser = computed(() => {
  return authUser.value || fallbackUser
})

const missionList = ref(
  missions.map((mission) => ({
    ...mission
  }))
)

const activeTab = ref('all')
const searchQuery = ref('')

const tabs = computed(() => [
  {
    label: 'All',
    value: 'all',
    count: missionList.value.length
  },
  {
    label: 'Active',
    value: 'active',
    count: missionList.value.filter(
      mission => !mission.completed
    ).length
  },
  {
    label: 'Completed',
    value: 'completed',
    count: missionList.value.filter(
      mission => mission.completed
    ).length
  }
])

const filteredMissions = computed(() => {
  let result = [...missionList.value]

  if (activeTab.value === 'active') {
    result = result.filter(
      mission => !mission.completed
    )
  }

  if (activeTab.value === 'completed') {
    result = result.filter(
      mission => mission.completed
    )
  }

  if (searchQuery.value.trim()) {
    const keyword = searchQuery.value
      .toLowerCase()
      .trim()

    result = result.filter(mission => {
      const title =
        mission.title?.toLowerCase() || ''

      const description =
        mission.description?.toLowerCase() || ''

      const category =
        mission.category?.toLowerCase() || ''

      return (
        title.includes(keyword) ||
        description.includes(keyword) ||
        category.includes(keyword)
      )
    })
  }

  return result
})

const sectionTitle = computed(() => {
  if (activeTab.value === 'active') {
    return 'Quest Aktif'
  }

  if (activeTab.value === 'completed') {
    return 'Quest Selesai'
  }

  return 'Semua Quest'
})

const getMissionLink = (mission) => {
  if (mission.link) {
    return mission.link
  }

  if (mission.id) {
    return `/missions/${mission.id}`
  }

  return '/missions'
}

const getCategoryIcon = (category) => {
  const value = category?.toLowerCase() || ''

  if (
    value.includes('plastic') ||
    value.includes('plastik') ||
    value.includes('recycle')
  ) {
    return Recycle
  }

  if (
    value.includes('bike') ||
    value.includes('transport')
  ) {
    return Bike
  }

  if (
    value.includes('water') ||
    value.includes('air')
  ) {
    return Droplets
  }

  if (
    value.includes('tree') ||
    value.includes('tanam') ||
    value.includes('pohon')
  ) {
    return TreePine
  }

  if (
    value.includes('energy') ||
    value.includes('energi')
  ) {
    return Lightbulb
  }

  return Leaf
}

const getCategoryStyle = (category) => {
  const value = category?.toLowerCase() || ''

  if (
    value.includes('plastic') ||
    value.includes('plastik') ||
    value.includes('recycle')
  ) {
    return 'bg-[#E8F8ED] text-[#22C55E]'
  }

  if (
    value.includes('bike') ||
    value.includes('transport')
  ) {
    return 'bg-[#EAF4FF] text-[#3B82F6]'
  }

  if (
    value.includes('water') ||
    value.includes('air')
  ) {
    return 'bg-[#E8F6FF] text-[#0284C7]'
  }

  if (
    value.includes('tree') ||
    value.includes('tanam') ||
    value.includes('pohon')
  ) {
    return 'bg-[#ECFDF5] text-[#059669]'
  }

  if (
    value.includes('energy') ||
    value.includes('energi')
  ) {
    return 'bg-[#FFF8D8] text-[#CA8A04]'
  }

  return 'bg-[#E8F8ED] text-[#22C55E]'
}
</script>