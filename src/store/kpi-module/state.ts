import { KPI } from 'src/data-model/kpi-model';

export interface KPIState {
  byId: Map<number, KPI>;
  kpiList: KPI[];
}

function state(): KPIState {
  return {
    byId: new Map<number, KPI>(),
    kpiList: [],
  };
}

export default state;
