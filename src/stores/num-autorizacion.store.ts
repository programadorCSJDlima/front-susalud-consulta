import { defineStore } from 'pinia'

const STORAGE_KEY = 'numAutorizacionDocs'

export type NumAutorizacionDoc = {
  noTransaccion: string
  idRemitente: string
  idReceptor: string
  feTransaccion: string
  hoTransaccion: string
  idCorrelativo: string
  idTransaccion: string
  nuAutorizacion: string
  coSeguridad: string
  coError: string
  inCoErrorEncontrado: string
  nuControl: string | null
  nuControlST: string | null
}

export const useNumAutorizacionStore = defineStore('numAutorizacion', {
  state: () => ({
    resAutDocs: [] as NumAutorizacionDoc[],
  }),
  actions: {
    hydrateFromStorage() {
      this.resAutDocs = loadDocs()
    },
    setResAut(docs: NumAutorizacionDoc[] | null | undefined) {
      this.resAutDocs = docs ? [...docs] : []
      persistDocs(this.resAutDocs)
    },
    reset() {
      this.resAutDocs = []
      persistDocs(this.resAutDocs)
    },
  },
})

function loadDocs(): NumAutorizacionDoc[] {
  if (typeof window === 'undefined') {
    return []
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw) as NumAutorizacionDoc[]
    }
  } catch {
    // ignore parse errors
  }
  return []
}

function persistDocs(docs: NumAutorizacionDoc[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(docs))
  } catch {
    // ignore errors
  }
}
