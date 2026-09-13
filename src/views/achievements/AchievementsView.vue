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
              Achievements
            </h1>
            <p class="mt-1 text-xs leading-5 text-[#66736A] md:text-sm">
              Koleksi pencapaianmu selama di EcoQuest dan raih lencana eksklusif.
            </p>
          </div>

          <!-- Unlocked Summary Pill -->
          <div class="flex items-center gap-3 rounded-2xl border border-[#E8EDE9] bg-white px-4 py-2.5 shadow-sm">
            <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF8E1]">
              <Trophy class="h-5 w-5 text-[#CA8A04]" />
            </div>
            <div>
              <p class="text-[11px] text-[#98A39C]">Lencana Terbuka</p>
              <p class="text-sm font-bold text-[#17211B]">
                {{ unlockedCount }} / {{ achievementsList.length }} Tercapai
              </p>
            </div>
          </div>
        </section>

        <!-- Tabs Filter -->
        <section class="mb-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            @click="activeTab = tab.value"
            class="rounded-full px-4 py-2 text-xs font-semibold transition md:px-5"
            :class="
              activeTab === tab.value
                ? 'bg-[#15803D] text-white'
                : 'border border-[#E8EDE9] bg-white text-[#66736A] hover:border-[#CDE8D4]'
            "
          >
            {{ tab.label }}
          </button>
        </section>

        <!-- Achievements Grid -->
        <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="badge in filteredBadges"
            :key="badge.id"
            class="relative flex flex-col rounded-2xl border bg-white p-5 transition hover:shadow-sm"
            :class="
              badge.unlocked
                ? 'border-[#DCEBDD] bg-[#FCFDFC]'
                : 'border-[#E8EDE9] opacity-85'
            "
          >
            <!-- Badge Icon -->
            <div class="flex items-center justify-between">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl transition"
                :class="
                  badge.unlocked
                    ? 'bg-[#EAF8EE] text-[#22C55E]'
                    : 'bg-[#F0F4F1] text-[#98A39C]'
                "
              >
                <component :is="getBadgeIcon(badge.icon)" class="h-6 w-6" />
              </div>

              <span
                v-if="badge.unlocked"
                class="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[10px] font-bold text-[#15803D]"
              >
                <Check class="h-3 w-3" />
                Completed
              </span>

              <span
                v-else
                class="inline-flex items-center gap-1 rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-[10px] font-semibold text-[#66736A]"
              >
                <Lock class="h-3 w-3" />
                In Progress
              </span>
            </div>

            <!-- Content -->
            <div class="mt-4 flex-1">
              <h3 class="text-sm font-bold text-[#17211B] md:text-base">
                {{ badge.title }}
              </h3>
              <p class="mt-1 text-xs leading-5 text-[#66736A]">
                {{ badge.description }}
              </p>
            </div>

            <!-- Progress Bar -->
            <div class="mt-4 pt-3 border-t border-[#F0F4F1]">
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-[#98A39C]">Progress</span>
                <span class="font-bold text-[#17211B]">
                  {{ badge.progress }} / {{ badge.target }}
                </span>
              </div>
              <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EAF0EB]">
                <div
                  class="h-full rounded-full transition-all duration-300"
                  :class="badge.unlocked ? 'bg-[#22C55E]' : 'bg-[#94A3B8]'"
                  :style="{
                    width: `${Math.min(100, Math.round((badge.progress / badge.target) * 100))}%`
                  }"
                ></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Trophy,
  Sparkles,
  Recycle,
  Zap,
  Bike,
  TreePine,
  Users,
  Flame,
  Check,
  Lock
} from 'lucide-vue-next'
import AppLayout from '@/layouts/AppLayout.vue'
import MobileHeader from '@/components/navigation/MobileHeader.vue'
import { allAchievements } from '@/data/mockData.js'

const activeTab = ref('all')

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'In Progress', value: 'progress' },
  { label: 'Completed', value: 'completed' }
]

const achievementsList = ref([...allAchievements])

const unlockedCount = computed(() => {
  return achievementsList.value.filter((b) => b.unlocked).length
})

const filteredBadges = computed(() => {
  if (activeTab.value === 'completed') {
    return achievementsList.value.filter((b) => b.unlocked)
  }
  if (activeTab.value === 'progress') {
    return achievementsList.value.filter((b) => !b.unlocked)
  }
  return achievementsList.value
})

function getBadgeIcon(iconName) {
  switch (iconName) {
    case 'sparkles':
      return Sparkles
    case 'recycle':
      return Recycle
    case 'zap':
      return Zap
    case 'bike':
      return Bike
    case 'tree':
      return TreePine
    case 'users':
      return Users
    case 'flame':
      return Flame
    default:
      return Trophy
  }
}
</script>
