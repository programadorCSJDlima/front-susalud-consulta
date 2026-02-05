import { defineStore } from 'pinia'

export const DEFAULT_CONSULTA_NOM_CO_IAFA = ''
const STORAGE_KEY = 'utilInputsState'

type UtilInputsState = {
  consultaNomCoIafa: string
}

const loadState = (): UtilInputsState => {
  if (typeof window === 'undefined') {
    return { consultaNomCoIafa: DEFAULT_CONSULTA_NOM_CO_IAFA }
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw) as UtilInputsState
    }
  } catch {
    // ignore parse errors
  }
  return { consultaNomCoIafa: DEFAULT_CONSULTA_NOM_CO_IAFA }
}

const persistState = (state: UtilInputsState) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore errors
  }
}

export const useUtilInputsStore = defineStore('utilInputs', {
  state: (): UtilInputsState => ({
    ...loadState(),
  }),
  actions: {
    setConsultaNomCoIafa(value: string) {
      this.consultaNomCoIafa = value
      persistState({ consultaNomCoIafa: this.consultaNomCoIafa })
    },
    resetConsultaNomCoIafa() {
      this.consultaNomCoIafa = DEFAULT_CONSULTA_NOM_CO_IAFA
      persistState({ consultaNomCoIafa: this.consultaNomCoIafa })
    },
  },
})
