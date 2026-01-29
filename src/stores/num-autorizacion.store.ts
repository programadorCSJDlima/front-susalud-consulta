import { defineStore } from 'pinia'

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
    setResAut(docs: NumAutorizacionDoc[] | null | undefined) {
      this.resAutDocs = docs ? [...docs] : []
    },
    reset() {
      this.resAutDocs = []
    },
  },
})
