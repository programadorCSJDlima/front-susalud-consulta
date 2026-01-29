import { defineStore } from 'pinia'

export const DEFAULT_CONSULTA_NOM_CO_IAFA = '20004'

type UtilInputsState = {
  consultaNomCoIafa: string
}

export const useUtilInputsStore = defineStore('utilInputs', {
  state: (): UtilInputsState => ({
    consultaNomCoIafa: DEFAULT_CONSULTA_NOM_CO_IAFA,
  }),
  actions: {
    setConsultaNomCoIafa(value: string) {
      this.consultaNomCoIafa = value
    },
    resetConsultaNomCoIafa() {
      this.consultaNomCoIafa = DEFAULT_CONSULTA_NOM_CO_IAFA
    },
  },
})
