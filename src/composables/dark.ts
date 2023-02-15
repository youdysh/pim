import {useDark} from '@vueuse/core'

export const isDark = useDark()
isDark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
