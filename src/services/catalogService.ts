import { apiClient } from './apiClient'

export type CatalogSyncPayload = {
  nuVersion: string
  noArchivo: string
}

export type CatalogSyncResponse = unknown

const buildCatalogFilename = () => {
  const now = new Date()
  const pad = (value: number) => value.toString().padStart(2, '0')
  const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(
    now.getHours()
  )}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`
  return `catalogoSusalud${timestamp}.xml`
}

export const createDefaultCatalogSyncPayload = (): CatalogSyncPayload => ({
  nuVersion: '1000',
  noArchivo: buildCatalogFilename(),
})

export const syncCatalogos = (
  payload: CatalogSyncPayload = createDefaultCatalogSyncPayload(),
) => {
  return apiClient.post<CatalogSyncResponse>('/sincronizarCatalogos', payload)
}
