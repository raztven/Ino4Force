import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior() {
    return { top: 0 }
  },

  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        title: 'Login - EcoQuest',
        guestOnly: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: {
        title: 'Register - EcoQuest',
        guestOnly: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: {
        title: 'Dashboard - EcoQuest',
        requiresAuth: true
      }
    },
    {
      path: '/missions',
      name: 'Missions',
      component: () => import('@/views/missions/MissionsView.vue'),
      meta: {
        title: 'Missions - EcoQuest',
        requiresAuth: true
      }
    },
    {
      path: '/eco-action',
      name: 'EcoAction',
      component: () => import('@/views/ecoaction/EcoActionView.vue'),
      meta: {
        title: 'Eco Action - EcoQuest',
        requiresAuth: true
      }
    },
    {
      path: '/missions/:id',
      name: 'MissionDetail',
      component: () => import('@/views/missions/MissionDetailView.vue'),
      meta: {
        title: 'Mission Detail',
        hideBottomNav: true,
        requiresAuth: true
      }
    },
    {
      path: '/challenges',
      name: 'Challenges',
      component: () => import('@/views/challenges/ChallengesView.vue'),
      meta: {
        title: 'Challenges - EcoQuest',
        hideBottomNav: true,
        requiresAuth: true
      }
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: () => import('@/views/leaderboard/LeaderboardView.vue'),
      meta: {
        title: 'Leaderboard - EcoQuest',
        requiresAuth: true
      }
    },
    {
      path: '/impact',
      name: 'Impact',
      component: () => import('@/views/impact/ImpactView.vue'),
      meta: {
        title: 'Impact - EcoQuest',
        requiresAuth: true
      }
    },
    {
      path: '/rewards',
      name: 'Rewards',
      component: () => import('@/views/reward/RewardsView.vue'),
      meta: {
        title: 'Rewards - EcoQuest',
        requiresAuth: true
      }
    },
    {
      path: '/achievements',
      name: 'Achievements',
      component: () => import('@/views/achievements/AchievementsView.vue'),
      meta: {
        title: 'Achievements - EcoQuest',
        requiresAuth: true
      }
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('@/views/community/CommunityView.vue'),
      meta: {
        title: 'Community - EcoQuest',
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/profile/ProfileView.vue'),
      meta: {
        title: 'Profile - EcoQuest',
        requiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard'
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'EcoQuest'

  const { isAuthenticated } = useAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else if (to.meta.guestOnly && isAuthenticated.value) {
    next({ path: '/dashboard' })
  } else {
    next()
  }
})

export default router
