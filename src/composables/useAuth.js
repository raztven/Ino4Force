import { ref, computed } from 'vue'
import defaultUsers from '../data/users.json'

const STORAGE_USERS_KEY = 'ecoquest_users'
const STORAGE_AUTH_USER_KEY = 'ecoquest_current_user'

function getInitialUsers() {
  const savedUsers = localStorage.getItem(STORAGE_USERS_KEY)
  if (savedUsers) {
    try {
      return JSON.parse(savedUsers)
    } catch {
      return [...defaultUsers]
    }
  }
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(defaultUsers))
  return [...defaultUsers]
}

function getInitialCurrentUser() {
  const saved = localStorage.getItem(STORAGE_AUTH_USER_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return null
    }
  }
  return null
}

const users = ref(getInitialUsers())
const currentUser = ref(getInitialCurrentUser())

export function useAuth() {
  const isAuthenticated = computed(() => currentUser.value !== null)

  function login(emailOrUsername, password, remember = false) {
    const query = emailOrUsername.trim().toLowerCase()
    const foundUser = users.value.find(
      (u) =>
        (u.email.toLowerCase() === query || u.name.toLowerCase() === query) &&
        u.password === password
    )

    if (!foundUser) {
      return {
        success: false,
        message: 'Email/Username atau password salah. Silakan coba lagi.'
      }
    }

    const { password: _, ...safeUser } = foundUser
    currentUser.value = safeUser

    if (remember) {
      localStorage.setItem(STORAGE_AUTH_USER_KEY, JSON.stringify(safeUser))
    } else {
      sessionStorage.setItem(STORAGE_AUTH_USER_KEY, JSON.stringify(safeUser))
      localStorage.setItem(STORAGE_AUTH_USER_KEY, JSON.stringify(safeUser))
    }

    return {
      success: true,
      user: safeUser
    }
  }

  function register(userData) {
    const trimmedEmail = userData.email.trim().toLowerCase()
    const emailExists = users.value.some(
      (u) => u.email.toLowerCase() === trimmedEmail
    )

    if (emailExists) {
      return {
        success: false,
        message: 'Email sudah terdaftar. Silakan gunakan email lain atau langsung login.'
      }
    }

    const newUser = {
      id: Date.now(),
      name: userData.name.trim(),
      email: trimmedEmail,
      password: userData.password,
      level: 1,
      levelName: 'Eco Novice',
      xp: 0,
      nextLevelXp: 300,
      streak: 1,
      avatar: (userData.name.trim()[0] || 'E').toUpperCase(),
      joinedDate: 'Just now',
      role: 'Eco Novice'
    }

    users.value.push(newUser)
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users.value))

    const { password: _, ...safeUser } = newUser
    currentUser.value = safeUser
    localStorage.setItem(STORAGE_AUTH_USER_KEY, JSON.stringify(safeUser))

    return {
      success: true,
      user: safeUser
    }
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem(STORAGE_AUTH_USER_KEY)
    sessionStorage.removeItem(STORAGE_AUTH_USER_KEY)
  }

  return {
    users,
    currentUser,
    isAuthenticated,
    login,
    register,
    logout
  }
}
