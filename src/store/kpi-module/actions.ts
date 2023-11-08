import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { KPI } from 'src/data-model/kpi-model';
import { KPIState } from './state';
import { storeKpi, updateStoredKpi } from './mutations';

export const createKPI = 'createKPI';
export const updateKPI = 'updateKPI';

const actions: ActionTree<KPIState, StateInterface> = {
  createKPI(context, { newKPI }: { newKPI: KPI }) {
    context.commit(storeKpi, {
      newKPI,
    });
  },
  updateKPI(context, { kpi, id }: { kpi: KPI; id: number }) {
    context.commit(updateStoredKpi, { kpi, id });
  },
};

export default actions;
