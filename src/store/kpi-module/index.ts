import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { KPIState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const kpiModule = 'kpiModule';

const kpiModuleInstance: Module<KPIState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default kpiModuleInstance;
