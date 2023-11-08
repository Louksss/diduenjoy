import { MutationTree } from 'vuex';
import { KPIState } from './state';
import { KPI } from 'src/data-model/kpi-model';

export const storeKpi = 'storeKpi';
export const updateStoredKpi = 'updateStoredKpi';

const mutation: MutationTree<KPIState> = {
  storeKpi(state: KPIState, { newKPI }: { newKPI: KPI }) {
    const id = state.kpiList.length;
    state.byId.set(id, newKPI);
    state.kpiList.push(newKPI);
  },
  updateStoredKpi(state: KPIState, { kpi, id }: { kpi: KPI; id: number }) {
    state.byId.set(id, Object.assign({}, state.byId.get(id) ?? {}, kpi));
    state.kpiList[id] = Object.assign({}, state.byId.get(id) ?? {}, kpi);
  },
};

export default mutation;
