<template>
  <header class="hidden h-[76px] items-center justify-between border-b border-[#E8EDE9] bg-white px-8 md:flex">
    <div>
      <span class="inline-flex items-center gap-1.5 rounded-full bg-[#EAF8EE] px-3 py-1 text-xs font-semibold text-[#15803D]">
        <span class="h-1.5 w-1.5 rounded-full bg-[#22C55E]"></span>
        Live Session · {{ activeUser.role || activeUser.levelName || 'Eco Member' }}
      </span>
    </div>

    <div class="flex items-center gap-5">
      <div class="relative w-[240px]">
        <Search
          class="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#98A39C]"
        />

        <input
          type="text"
          placeholder="Search..."
          class="h-10 w-full rounded-xl border border-[#E2E8E4] bg-[#F8FAF8] pl-10 pr-4 text-sm text-[#17211B] outline-none transition placeholder:text-[#98A39C] focus:border-[#22C55E] focus:bg-white focus:ring-4 focus:ring-[#22C55E]/10"
        />
      </div>

      <button
        type="button"
        class="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#66736A] transition hover:bg-[#F5F8F5]"
      >
        <Bell class="h-[19px] w-[19px]" />

        <span class="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-[#22C55E]"></span>
      </button>

      <div class="h-7 w-px bg-[#E8EDE9]"></div>

      <div class="relative">
        <button
          type="button"
          @click="showDropdown = !showDropdown"
          class="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-[#F8FAF8] cursor-pointer"
        >
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#DCFCE7] text-sm font-semibold text-[#15803D]">
            {{ activeUser.avatar || 'U' }}
          </div>

          <div class="text-left">
            <p class="text-sm font-semibold text-[#17211B]">
              {{ activeUser.name || 'User' }}
            </p>

            <p class="text-xs text-[#98A39C]">
              Level {{ activeUser.level || 1 }}
            </p>
          </div>

          <ChevronDown class="h-4 w-4 text-[#98A39C] transition-transform" :class="{ 'rotate-180': showDropdown }" />
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="showDropdown"
          class="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[#E8EDE9] bg-white p-1.5 shadow-lg z-50"
        >
          <RouterLink
            to="/profile"
            @click="showDropdown = false"
            class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-[#17211B] hover:bg-[#F8FAF8] transition"
          >
            <UserCircle class="h-4 w-4 text-[#66736A]" />
            <span>My Profile</span>
          </RouterLink>

          <div class="my-1 border-t border-[#E8EDE9]"></div>

          <button
            type="button"
            @click="handleLogout"
            class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-[#DC2626] hover:bg-[#FEF2F2] transition"
          >
            <LogOut class="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Search,
  Bell,
  ChevronDown,
  UserCircle,
  LogOut
} from 'lucide-vue-next'
import { useAuth } from '../../composables/useAuth'
import { user as fallbackUser } from '../../data/mockData'

const router = useRouter()
const { currentUser, logout } = useAuth()
const showDropdown = ref(false)

const activeUser = computed(() => {
  return currentUser.value || fallbackUser
})

function handleLogout() {
  showDropdown.value = false
  logout()
  router.push('/login')
}
</script>
