import {
  createRouter,
  createWebHistory,
  type RouteComponent,
  type RouteRecordRaw,
} from 'vue-router'
import ConsultaAsegNomPage from '../pages/ConsultaAsegNomPage.vue'
import ConsultaAsegCodPage from '../pages/ConsultaAsegCodPage.vue'
import ConsultaSCTRPage from '../pages/ConsultaSCTRPage.vue'
import ConsultaDerivaPage from '../pages/ConsultaDerivaPage.vue'
import ConsultaProcPage from '../pages/ConsultaProcPage.vue'
import ConsultaDatosAdiPage from '../pages/ConsultaDatosAdiPage.vue'
import CondicionMedicaPage from '../pages/CondicionMedicaPage.vue'
import ConsultaObservacionPage from '../pages/ConsultaObservacionPage.vue'
import NumAutorizacionPage from '../pages/NumAutorizacionPage.vue'
import FotoPage from '../pages/FotoPage.vue'
import ConsultaxCartaGarantiaPage from '../pages/ConsultaxCartaGarantiaPage.vue'
import ConsultaEntVinculadaPage from '../pages/ConsultaEntVinculadaPage.vue'
import RegistroDecAccidentePage from '../pages/RegistroDecAccidentePage.vue'
import LogAcreInsertPage from '../pages/LogAcreInsertPage.vue'
// import RegistroDecAccidentePage from '../pages/RegistroDecAccidentePage.vue'

export type ModuleLink = {
  name: string
  label: string
  path: string
}

type ModuleRouteConfig = ModuleLink & {
  component: RouteComponent
}

const moduleRouteConfigs: ModuleRouteConfig[] = [
  {
    name: 'ConsultaAsegNom',
    label: 'ConsultaAsegNom',
    path: '/consulta-aseg-nom',
    component: ConsultaAsegNomPage,
  },
  {
    name: 'ConsultaAsegCod',
    label: 'ConsultaAsegCod',
    path: '/consulta-aseg-cod',
    component: ConsultaAsegCodPage,
  },
  {
    name: 'ConsultaSCTR',
    label: 'ConsultaSCTR',
    path: '/consulta-sctr',
    component: ConsultaSCTRPage,
  },
  {
    name: 'ConsultaDeriva',
    label: 'ConsultaDeriva',
    path: '/consulta-deriva',
    component: ConsultaDerivaPage,
  },
  {
    name: 'ConsultaProc',
    label: 'ConsultaProc',
    path: '/consulta-proc',
    component: ConsultaProcPage,
  },
  {
    name: 'ConsultaDatosAdi',
    label: 'ConsultaDatosAdi',
    path: '/consulta-datos-adi',
    component: ConsultaDatosAdiPage,
  },
  {
    name: 'CondicionMedica',
    label: 'CondicionMedica',
    path: '/condicion-medica',
    component: CondicionMedicaPage,
  },
  {
    name: 'ConsultaObservacion',
    label: 'ConsultaObservacion',
    path: '/consulta-observacion',
    component: ConsultaObservacionPage,
  },
  {
    name: 'NumAutorizacion',
    label: 'NumAutorizacion',
    path: '/num-autorizacion',
    component: NumAutorizacionPage,
  },
  {
    name: 'LogAcreInsert',
    label: 'LogAcreInsert',
    path: '/log-acre-insert',
    component: LogAcreInsertPage,
  },
  {
    name: 'Foto',
    label: 'Foto',
    path: '/foto',
    component: FotoPage,
  },
  {
    name: 'ConsultaxCartaGarantia',
    label: 'ConsultaxCartaGarantia',
    path: '/consultax-carta-garantia',
    component: ConsultaxCartaGarantiaPage,
  },
  {
    name: 'ConsultaEntVinculada',
    label: 'ConsultaEntVinculada',
    path: '/consulta-ent-vinculada',
    component: ConsultaEntVinculadaPage,
  },
  {
    name: 'RegistroDecAccidente',
    label: 'RegistroDecAccidente',
    path: '/registro-dec-accidente',
    component: RegistroDecAccidentePage,
  },
]

export const moduleRoutes: ModuleLink[] = moduleRouteConfigs.map(
  ({ name, label, path }) => ({
    name,
    label,
    path,
  }),
)

const moduleRouteRecords: RouteRecordRaw[] = moduleRouteConfigs.map(
  ({ name, path, component }) => ({
    name,
    path,
    component,
  }),
)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: moduleRouteConfigs[0].path,
  },
  ...moduleRouteRecords,
  {
    path: '/:pathMatch(.*)*',
    redirect: moduleRouteConfigs[0].path,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
