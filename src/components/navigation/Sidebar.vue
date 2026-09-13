<template>
  <aside class="fixed left-0 top-0 z-40 flex h-screen w-[240px] shrink-0 flex-col border-r border-[#E8EDE9] bg-white">
    <div class="flex h-[76px] items-center px-7">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22C55E]">
          <Leaf class="h-5 w-5 text-white" />
        </div>

        <div>
          <h1 class="text-lg font-bold text-[#17211B]">
            EcoQuest
          </h1>

          <p class="text-[11px] text-[#98A39C]">
            Make an impact
          </p>
        </div>
      </div>
    </div>

    <nav class="flex-1 px-4 py-5 overflow-y-auto">
      <p class="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#98A39C]">
        Menu
      </p>

      <div class="space-y-1">
        <RouterLink
          v-for="item in mainMenu"
          :key="item.name"
          :to="item.to"
          class="group flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition"
          :class="
            isActive(item.to)
              ? 'bg-[#EAF8EE] text-[#15803D]'
              : 'text-[#66736A] hover:bg-[#F5F8F5] hover:text-[#17211B]'
          "
        >
          <component
            :is="item.icon"
            class="h-[19px] w-[19px] shrink-0"
            :class="
              isActive(item.to)
                ? 'text-[#22C55E]'
                : 'text-[#98A39C] group-hover:text-[#66736A]'
            "
          />

          <span>{{ item.name }}</span>

          <span
            v-if="item.badge"
            class="ml-auto rounded-full bg-[#22C55E] px-2 py-0.5 text-[10px] font-semibold text-white"
          >
            {{ item.badge }}
          </span>
        </RouterLink>
      </div>

      <p class="mb-3 mt-8 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#98A39C]">
        Personal
      </p>

      <div class="space-y-1">
        <RouterLink
          v-for="item in personalMenu"
          :key="item.name"
          :to="item.to"
          class="group flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition"
          :class="
            isActive(item.to)
              ? 'bg-[#EAF8EE] text-[#15803D]'
              : 'text-[#66736A] hover:bg-[#F5F8F5] hover:text-[#17211B]'
          "
        >
          <component
            :is="item.icon"
            class="h-[19px] w-[19px] shrink-0"
            :class="
              isActive(item.to)
                ? 'text-[#22C55E]'
                : 'text-[#98A39C] group-hover:text-[#66736A]'
            "
          />

          <span>{{ item.name }}</span>
        </RouterLink>
      </div>
    </nav>

    <div class="border-t border-[#E8EDE9] p-3">
      <div class="flex items-center gap-3 rounded-xl bg-[#F8FAF8] p-3">
        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-sm font-semibold text-[#15803D]">
          {{ activeUser.avatar || 'U' }}
        </div>

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-[#17211B]">
            {{ activeUser.name || 'User' }}
          </p>

          <p class="truncate text-xs text-[#98A39C]">
            {{ activeUser.levelName || 'Eco Member' }}
          </p>
        </div>

        <button
          type="button"
          @click="handleLogout"
          title="Logout"
          class="flex h-8 w-8 items-center justify-center rounded-lg text-[#98A39C] transition hover:bg-[#FEF2F2] hover:text-[#DC2626]"
        >
          <LogOut class="h-4 w-4" />
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Leaf,
  LayoutDashboard,
  ListChecks,
  PlusCircle,
  Trophy,
  Medal,
  Sprout,
  Gift,
  Award,
  Users,
  UserCircle,
  LogOut
} from 'lucide-vue-next'
import { useAuth } from '../../composables/useAuth'
import { user as fallbackUser } from '../../data/mockData'

const route = useRoute()
const router = useRouter()
const { currentUser, logout } = useAuth()

const activeUser = computed(() => {
  return currentUser.value || fallbackUser
})

const mainMenu = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Quest',
    to: '/missions',
    icon: ListChecks
  },
  {
    name: 'Eco Action',
    to: '/eco-action',
    icon: PlusCircle
  },
  {
    name: 'Challenges',
    to: '/challenges',
    icon: Trophy
  },
  {
    name: 'Leaderboard',
    to: '/leaderboard',
    icon: Medal
  },
  {
    name: 'Impact',
    to: '/impact',
    icon: Sprout
  },
  {
    name: 'Rewards',
    to: '/rewards',
    icon: Gift
  },
  {
    name: 'Achievements',
    to: '/achievements',
    icon: Award
  },
  {
    name: 'Community',
    to: '/community',
    icon: Users
  }
]

const personalMenu = [
  {
    name: 'Profile',
    to: '/profile',
    icon: UserCircle
  }
]

function isActive(path) {
  return route.path === path
}

function handleLogout() {
  logout()
  router.push('/login')
}
</script>
