<template>
  <AppLayout>
    <div class="min-h-screen bg-[#F4FBF7]">

      <!-- Mobile -->
      <main class="mx-auto max-w-[430px] px-4 pb-24 md:hidden">

        <MobileHeader/>

        <h2 class="text-[17px] font-bold text-[#17211B]">
          Profile
        </h2>

        <!-- Profile -->
        <section
          class="mb-4 rounded-[14px] border border-[#DCEBE0] bg-white p-4"
        >

          <div class="flex items-center gap-3">

            <div
              class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-xl font-bold text-[#15803D]"
            >
              {{ activeUser.avatar || 'U' }}
            </div>

            <div class="min-w-0 flex-1">
              <h2 class="text-[14px] font-bold text-[#17211B]">
                {{ activeUser.name || 'User' }}
              </h2>

              <p class="mt-0.5 text-[8px] text-[#718078]">
                Level {{ activeUser.level || 1 }} · {{ activeUser.levelName || 'Eco Explorer' }}
              </p>

              <div class="mt-2">

                <div class="mb-1 flex items-center justify-between">
                  <span class="text-[7px] text-[#98A39C]">
                    Progress Level
                  </span>

                  <span class="text-[7px] font-semibold text-[#15803D]">
                    {{ activeUser.xp ?? 1240 }} / {{ activeUser.nextLevelXp ?? 1600 }} XP
                  </span>
                </div>

                <div class="h-[5px] rounded-full bg-[#E5EFE8]">
                  <div
                    class="h-full rounded-full bg-[#22C55E]"
                    :style="{ width: `${progressPercent}%` }"
                  ></div>
                </div>

              </div>
            </div>

          </div>

        </section>

        <!-- Stats -->
        <section class="mb-4 grid grid-cols-3 gap-2">

          <div
            class="rounded-[12px] border border-[#DCEBE0] bg-white p-3 text-center"
          >
            <div
              class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF7D6]"
            >
              <Flame class="h-3.5 w-3.5 text-[#F59E0B]" />
            </div>

            <p class="mt-2 text-[13px] font-bold text-[#17211B]">
              {{ activeUser.streak ?? 7 }}
            </p>

            <p class="text-[7px] text-[#718078]">
              Streak
            </p>
          </div>

          <div
            class="rounded-[12px] border border-[#DCEBE0] bg-white p-3 text-center"
          >
            <div
              class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F8ED]"
            >
              <Leaf class="h-3.5 w-3.5 text-[#22C55E]" />
            </div>

            <p class="mt-2 text-[13px] font-bold text-[#17211B]">
              {{ activeUser.ecoActions ?? 12 }}
            </p>

            <p class="text-[7px] text-[#718078]">
              Eco Actions
            </p>
          </div>

          <div
            class="rounded-[12px] border border-[#DCEBE0] bg-white p-3 text-center"
          >
            <div
              class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF4FF]"
            >
              <Bike class="h-3.5 w-3.5 text-[#3B82F6]" />
            </div>

            <p class="mt-2 text-[13px] font-bold text-[#17211B]">
              {{ activeUser.lowCarbonDistance ?? 24 }}
            </p>

            <p class="text-[7px] text-[#718078]">
              Low Carbon
            </p>
          </div>

        </section>

        <!-- Profile Menu -->
        <section
          class="overflow-hidden rounded-[14px] border border-[#DCEBE0] bg-white"
        >

          <RouterLink
            to="/profile/edit"
            class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8ED]"
            >
              <Pencil class="h-3.5 w-3.5 text-[#22C55E]" />
            </div>

            <div class="flex-1">
              <p class="text-[9px] font-semibold text-[#17211B]">
                Edit Profile
              </p>

              <p class="mt-0.5 text-[7px] text-[#98A39C]">
                Ubah informasi profil kamu
              </p>
            </div>

            <ChevronRight class="h-3.5 w-3.5 text-[#AAB4AE]" />
          </RouterLink>

          <RouterLink
            to="/achievements"
            class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF7D6]"
            >
              <Award class="h-3.5 w-3.5 text-[#D99A00]" />
            </div>

            <div class="flex-1">
              <p class="text-[9px] font-semibold text-[#17211B]">
                My Achievements
              </p>

              <p class="mt-0.5 text-[7px] text-[#98A39C]">
                Lihat pencapaian yang sudah kamu dapatkan
              </p>
            </div>

            <ChevronRight class="h-3.5 w-3.5 text-[#AAB4AE]" />
          </RouterLink>

          <RouterLink
            to="/settings"
            class="flex items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF4FF]"
            >
              <Settings class="h-3.5 w-3.5 text-[#3B82F6]" />
            </div>

            <div class="flex-1">
              <p class="text-[9px] font-semibold text-[#17211B]">
                Settings
              </p>

              <p class="mt-0.5 text-[7px] text-[#98A39C]">
                Kelola preferensi aplikasi
              </p>
            </div>

            <ChevronRight class="h-3.5 w-3.5 text-[#AAB4AE]" />
          </RouterLink>

          <button
            type="button"
            class="flex w-full items-center gap-3 border-b border-[#EEF2EF] px-4 py-3.5 text-left"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F2F5F3]"
            >
              <HelpCircle class="h-3.5 w-3.5 text-[#718078]" />
            </div>

            <div class="flex-1">
              <p class="text-[9px] font-semibold text-[#17211B]">
                Help & Support
              </p>

              <p class="mt-0.5 text-[7px] text-[#98A39C]">
                Bantuan dan informasi EcoQuest
              </p>
            </div>

            <ChevronRight class="h-3.5 w-3.5 text-[#AAB4AE]" />
          </button>

          <button
            type="button"
            class="flex w-full items-center gap-3 px-4 py-3.5 text-left"
            @click="handleLogout"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF1F1]"
            >
              <LogOut class="h-3.5 w-3.5 text-[#EF4444]" />
            </div>

            <div class="flex-1">
              <p class="text-[9px] font-semibold text-[#EF4444]">
                Logout
              </p>

              <p class="mt-0.5 text-[7px] text-[#98A39C]">
                Keluar dari akun EcoQuest
              </p>
            </div>

            <ChevronRight class="h-3.5 w-3.5 text-[#AAB4AE]" />
          </button>

        </section>

      </main>

      <!-- Desktop -->
      <main class="hidden md:block">
        <div class="mx-auto max-w-[1400px] px-6 pb-12">

          <!-- Header -->
          <section class="mb-7">
            <p class="mb-1 text-sm font-medium text-[#22C55E]">
              Profile
            </p>

            <h1 class="text-[28px] font-bold text-[#17211B]">
              Profile
            </h1>

            <p class="mt-1 text-sm text-[#66736A]">
              Kelola informasi akun dan preferensimu
            </p>
          </section>

          <!-- Profile Hero Card -->
          <section
            class="mb-6 rounded-2xl border border-[#E8EDE9] bg-white p-6 shadow-xs"
          >
            <div class="flex items-center gap-5">
              <div
                class="flex h-20 w-20 items-center justify-center rounded-full bg-[#DCFCE7] text-2xl font-bold text-[#15803D] ring-4 ring-[#F0FDF4]"
              >
                {{ activeUser.avatar || 'D' }}
              </div>

              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div>
                    <h2 class="text-xl font-bold text-[#17211B]">
                      {{ activeUser.name || 'Dafa Ardi' }}
                    </h2>

                    <p class="mt-0.5 text-xs font-medium text-[#718078]">
                      Level {{ activeUser.level || 5 }} · {{ activeUser.levelName || 'Eco Explorer' }}
                    </p>
                  </div>

                  <button
                    type="button"
                    @click="isEditModalOpen = true"
                    class="flex items-center gap-2 rounded-xl border border-[#DCEBE0] bg-white px-4 py-2 text-xs font-semibold text-[#15803D] shadow-xs transition hover:bg-[#F3FAF4] hover:border-[#22C55E]"
                  >
                    <Pencil class="h-3.5 w-3.5" />
                    Edit Profile
                  </button>
                </div>

                <div class="mt-4 max-w-xl">
                  <div class="mb-1.5 flex items-center justify-between">
                    <span class="text-xs font-medium text-[#718078]">
                      Progress Level
                    </span>

                    <span class="text-xs font-bold text-[#15803D]">
                      {{ (activeUser.xp ?? 1240).toLocaleString('id-ID') }} / {{ (activeUser.nextLevelXp ?? 1600).toLocaleString('id-ID') }} XP
                    </span>
                  </div>

                  <div class="h-2 rounded-full bg-[#E5EFE8]">
                    <div
                      class="h-full rounded-full bg-[#22C55E] transition-all duration-500"
                      :style="{ width: `${progressPercent}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Tabs Navigation -->
          <section class="mb-6 flex items-center gap-2 border-b border-[#E8EDE9] pb-3">
            <button
              v-for="tab in ['Overview', 'Stats', 'Settings']"
              :key="tab"
              type="button"
              @click="activeDesktopTab = tab"
              class="rounded-xl px-5 py-2 text-xs font-semibold transition"
              :class="
                activeDesktopTab === tab
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'bg-white text-[#66736A] border border-[#E8EDE9] hover:border-[#CDE8D4]'
              "
            >
              {{ tab }}
            </button>
          </section>

          <!-- Overview Tab (Figma Screen 12 Layout) -->
          <div v-if="activeDesktopTab === 'Overview'" class="grid grid-cols-2 gap-6">

            <!-- Left Box: Informasi Pribadi -->
            <section class="flex flex-col justify-between rounded-2xl border border-[#E8EDE9] bg-white p-6 shadow-xs">
              <div>
                <div class="flex items-center justify-between border-b border-[#F0F4F1] pb-4">
                  <div>
                    <h3 class="text-base font-bold text-[#17211B]">
                      Informasi Pribadi
                    </h3>
                    <p class="text-xs text-[#98A39C]">
                      Data akun kamu
                    </p>
                  </div>

                  <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF8EE]">
                    <UserRound class="h-4 w-4 text-[#22C55E]" />
                  </div>
                </div>

                <!-- Info Rows -->
                <div class="mt-5 space-y-4">
                  <div class="flex items-center justify-between py-2 border-b border-[#F8FAF8]">
                    <span class="text-xs text-[#718078]">Nama Lengkap</span>
                    <span class="text-xs font-bold text-[#17211B]">{{ activeUser.name || 'Dafa Ardi' }}</span>
                  </div>

                  <div class="flex items-center justify-between py-2 border-b border-[#F8FAF8]">
                    <span class="text-xs text-[#718078]">Email</span>
                    <span class="text-xs font-semibold text-[#17211B]">{{ activeUser.email || 'dafa@ecoquest.com' }}</span>
                  </div>

                  <div class="flex items-center justify-between py-2 border-b border-[#F8FAF8]">
                    <span class="text-xs text-[#718078]">Bergabung</span>
                    <span class="text-xs font-semibold text-[#17211B]">{{ activeUser.joinedDate || '12 Sep 2025' }}</span>
                  </div>

                  <div class="flex items-center justify-between py-2">
                    <span class="text-xs text-[#718078]">Role</span>
                    <span class="inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-bold text-[#15803D]">
                      <Sparkles class="h-3 w-3" />
                      {{ activeUser.levelName || 'Eco Explorer' }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-6 rounded-xl bg-[#F4FBF7] p-3.5 border border-[#DCEBE0] flex items-center gap-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#22C55E] text-white">
                  <Award class="h-4 w-4" />
                </div>
                <div>
                  <p class="text-xs font-bold text-[#17211B]">Verified Explorer</p>
                  <p class="text-[11px] text-[#718078]">Akun terverifikasi aktif berkontribusi.</p>
                </div>
              </div>
            </section>

            <!-- Right Box: Preferensi -->
            <section class="flex flex-col justify-between rounded-2xl border border-[#E8EDE9] bg-white p-6 shadow-xs">
              <div>
                <div class="flex items-center justify-between border-b border-[#F0F4F1] pb-4">
                  <div>
                    <h3 class="text-base font-bold text-[#17211B]">
                      Preferensi
                    </h3>
                    <p class="text-xs text-[#98A39C]">
                      Pengaturan akun dan aksi
                    </p>
                  </div>

                  <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4FF]">
                    <Settings class="h-4 w-4 text-[#3B82F6]" />
                  </div>
                </div>

                <!-- Favorite Actions -->
                <div class="mt-5">
                  <h4 class="text-xs font-bold text-[#17211B] mb-2.5">
                    Jenis Aksi Favorit
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span class="inline-flex items-center gap-1.5 rounded-xl border border-[#DCEBE0] bg-[#F4FBF7] px-3 py-1.5 text-xs font-semibold text-[#15803D]">
                      <Leaf class="h-3.5 w-3.5 text-[#22C55E]" />
                      Reduce Plastic
                    </span>
                    <span class="inline-flex items-center gap-1.5 rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] px-3 py-1.5 text-xs font-semibold text-[#B45309]">
                      <Zap class="h-3.5 w-3.5 text-[#F59E0B]" />
                      Save Energy
                    </span>
                    <span class="inline-flex items-center gap-1.5 rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold text-[#1D4ED8]">
                      <Bike class="h-3.5 w-3.5 text-[#3B82F6]" />
                      Low Carbon Travel
                    </span>
                  </div>
                </div>

                <!-- Notifications -->
                <div class="mt-6 border-t border-[#F0F4F1] pt-5">
                  <h4 class="text-xs font-bold text-[#17211B] mb-3">
                    Notifikasi
                  </h4>

                  <div class="space-y-3.5">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-xs font-semibold text-[#17211B]">Email Notifikasi</p>
                        <p class="text-[11px] text-[#98A39C]">Terima update mingguan</p>
                      </div>
                      <button
                        type="button"
                        @click="emailNotif = !emailNotif"
                        class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                        :class="emailNotif ? 'bg-[#22C55E]' : 'bg-gray-200'"
                      >
                        <span
                          class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                          :class="emailNotif ? 'translate-x-5' : 'translate-x-0'"
                        />
                      </button>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-xs font-semibold text-[#17211B]">Push Notifikasi</p>
                        <p class="text-[11px] text-[#98A39C]">Pengingat quest harian</p>
                      </div>
                      <button
                        type="button"
                        @click="pushNotif = !pushNotif"
                        class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                        :class="pushNotif ? 'bg-[#22C55E]' : 'bg-gray-200'"
                      >
                        <span
                          class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                          :class="pushNotif ? 'translate-x-5' : 'translate-x-0'"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Logout Button -->
              <div class="mt-6 pt-4 border-t border-[#F0F4F1]">
                <button
                  type="button"
                  @click="handleLogout"
                  class="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#FECACA] bg-[#FFF1F1] py-2.5 text-xs font-bold text-[#EF4444] transition hover:bg-[#FEE2E2] active:scale-[0.99]"
                >
                  <LogOut class="h-4 w-4" />
                  Logout dari Akun
                </button>
              </div>
            </section>

          </div>

          <!-- Stats Tab -->
          <div v-else-if="activeDesktopTab === 'Stats'" class="space-y-6">
            <section class="grid grid-cols-3 gap-5">
              <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5 shadow-xs">
                <div class="flex items-center justify-between">
                  <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF7D6]">
                    <Flame class="h-5 w-5 text-[#F59E0B]" />
                  </div>
                  <TrendingUp class="h-4 w-4 text-[#22C55E]" />
                </div>
                <p class="mt-4 text-xs text-[#718078]">Streak Saat Ini</p>
                <p class="mt-1 text-2xl font-bold text-[#17211B]">{{ activeUser.streak ?? 7 }} hari</p>
                <p class="mt-1 text-[11px] text-[#98A39C]">Pertahankan konsistensi aksimu</p>
              </div>

              <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5 shadow-xs">
                <div class="flex items-center justify-between">
                  <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F8ED]">
                    <Leaf class="h-5 w-5 text-[#22C55E]" />
                  </div>
                  <span class="text-xs font-bold text-[#22C55E]">+4 bulan ini</span>
                </div>
                <p class="mt-4 text-xs text-[#718078]">Total Eco Actions</p>
                <p class="mt-1 text-2xl font-bold text-[#17211B]">{{ activeUser.ecoActions ?? 12 }}</p>
                <p class="mt-1 text-[11px] text-[#98A39C]">Aksi ramah lingkungan selesai</p>
              </div>

              <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5 shadow-xs">
                <div class="flex items-center justify-between">
                  <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FF]">
                    <Bike class="h-5 w-5 text-[#3B82F6]" />
                  </div>
                  <span class="text-xs font-bold text-[#3B82F6]">Low Carbon</span>
                </div>
                <p class="mt-4 text-xs text-[#718078]">Perjalanan Rendah Karbon</p>
                <p class="mt-1 text-2xl font-bold text-[#17211B]">{{ activeUser.lowCarbonDistance ?? 24 }} km</p>
                <p class="mt-1 text-[11px] text-[#98A39C]">Jalan kaki & bersepeda</p>
              </div>
            </section>
          </div>

          <!-- Settings Tab -->
          <div v-else-if="activeDesktopTab === 'Settings'" class="space-y-4 max-w-2xl">
            <div class="rounded-2xl border border-[#E8EDE9] bg-white p-5 shadow-xs">
              <h3 class="text-sm font-bold text-[#17211B] mb-4">Pengaturan Aplikasi</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between border-b border-[#F0F4F1] pb-3">
                  <div>
                    <p class="text-xs font-semibold text-[#17211B]">Bahasa</p>
                    <p class="text-[11px] text-[#98A39C]">Bahasa Indonesia</p>
                  </div>
                  <span class="text-xs font-semibold text-[#15803D]">Indonesia (ID)</span>
                </div>

                <div class="flex items-center justify-between border-b border-[#F0F4F1] pb-3">
                  <div>
                    <p class="text-xs font-semibold text-[#17211B]">Mode Tampilan</p>
                    <p class="text-[11px] text-[#98A39C]">Tema visual aplikasi</p>
                  </div>
                  <span class="text-xs font-semibold text-[#66736A]">Light Mode (Default)</span>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs font-semibold text-[#17211B]">Bantuan & Panduan</p>
                    <p class="text-[11px] text-[#98A39C]">Dokumentasi EcoQuest</p>
                  </div>
                  <button type="button" class="text-xs font-bold text-[#15803D] hover:underline">Lihat Panduan</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <!-- Edit Profile Modal -->
      <div
        v-if="isEditModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
        @click.self="isEditModalOpen = false"
      >
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#E8EDE9]">
          <div class="flex items-center justify-between border-b border-[#F0F4F1] pb-4">
            <h3 class="text-base font-bold text-[#17211B]">Edit Profile</h3>
            <button
              type="button"
              @click="isEditModalOpen = false"
              class="rounded-lg p-1 text-[#98A39C] hover:bg-[#F4FBF7] hover:text-[#17211B]"
            >
              ✕
            </button>
          </div>

          <form @submit.prevent="saveProfile" class="mt-5 space-y-4">
            <div>
              <label class="block text-xs font-semibold text-[#17211B] mb-1">Nama Lengkap</label>
              <input
                v-model="editForm.name"
                type="text"
                class="w-full rounded-xl border border-[#DCEBE0] px-3.5 py-2.5 text-xs text-[#17211B] focus:border-[#22C55E] focus:outline-none"
                placeholder="Nama Lengkap"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#17211B] mb-1">Email</label>
              <input
                v-model="editForm.email"
                type="email"
                class="w-full rounded-xl border border-[#DCEBE0] px-3.5 py-2.5 text-xs text-[#17211B] focus:border-[#22C55E] focus:outline-none"
                placeholder="Email"
              />
            </div>

            <div class="mt-6 flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                @click="isEditModalOpen = false"
                class="rounded-xl border border-[#DCEBE0] px-4 py-2.5 text-xs font-semibold text-[#66736A] hover:bg-[#F8FAF8]"
              >
                Batal
              </button>
              <button
                type="submit"
                class="rounded-xl bg-[#22C55E] px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#15803D]"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  Leaf,
  Bell,
  UserRound,
  Flame,
  Bike,
  Pencil,
  Award,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Zap
} from 'lucide-vue-next'

import AppLayout from '@/layouts/AppLayout.vue'
import MobileHeader from '@/components/navigation/MobileHeader.vue'
import { useAuth } from '@/composables/useAuth'
import { user as fallbackUser } from '@/data/mockData'

const router = useRouter()
const { currentUser, logout, updateProfile } = useAuth()

const activeDesktopTab = ref('Overview')
const isEditModalOpen = ref(false)
const emailNotif = ref(true)
const pushNotif = ref(true)

const activeUser = computed(() => {
  return currentUser.value || fallbackUser
})

const editForm = reactive({
  name: activeUser.value.name || 'Dafa Ardi',
  email: activeUser.value.email || 'dafa@ecoquest.com'
})

const progressPercent = computed(() => {
  const xp = Number(activeUser.value.xp ?? 1240)
  const nextXp = Number(activeUser.value.nextLevelXp ?? 1600)
  if (nextXp <= 0) return 0
  return Math.min(Math.round((xp / nextXp) * 100), 100)
})

const saveProfile = () => {
  if (updateProfile) {
    updateProfile({
      name: editForm.name,
      email: editForm.email
    })
  } else if (currentUser.value) {
    currentUser.value.name = editForm.name
    currentUser.value.email = editForm.email
  }
  isEditModalOpen.value = false
}

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>