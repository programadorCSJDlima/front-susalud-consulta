import { apiClient } from './apiClient'

export type CatalogSyncPayload = {
  nuVersion: string
  noArchivo: string
}

export type CatalogSyncResponse = unknown

export const createDefaultCatalogSyncPayload = (): CatalogSyncPayload => ({
  nuVersion: '1280',
  noArchivo: 'archivoPrueba20252912.xml',
})

export const syncCatalogos = (
  payload: CatalogSyncPayload = createDefaultCatalogSyncPayload(),
) => {
  return apiClient.post<CatalogSyncResponse>('/sincronizarCatalogos', payload)
}
