import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { KPIState } from './state';
import { KPI } from 'src/data-model/kpi-model';

export const getKPIList = 'getKPIList';

const getters: GetterTree<KPIState, StateInterface> = {
  getKPIbyId: (state) => {
    return (id: number): KPI | undefined => {
      return state.byId.get(id);
    };
  },
  getKPIList: (state) => {
    return (): KPI[] => {
      return state.kpiList;
    };
  },
};

export default getters;
