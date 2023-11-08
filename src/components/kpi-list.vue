<template>
  <div>
    <q-list class="row reverse q-ma-lg justify-evenly stretch">
      <q-btn @click="createKPI" class="q-card-like" icon="fas fa-plus"> </q-btn>
      <div v-if="hasKPIs" class="row reverse items-center">
        <kpi-card
          v-for="(kpi, index) in kpiList"
          :class="{ active: isActive(index) }"
          class="q-mr-sm"
          :key="index"
          :kpi="kpi"
          @update-kpi="(kpi) => updateKPI(kpi, index)"
        ></kpi-card>
      </div>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'src/store/index';
import KpiCard from 'src/components/kpi-card.vue';
import { useQuasar } from 'quasar';
import { KPI } from 'src/data-model/kpi-model';
import { kpiModule } from 'src/store/kpi-module';
import { getKPIList } from 'src/store/kpi-module/getters';

export default defineComponent({
  name: 'KpiList',
  props: {
    activeId: {
      type: Number,
      required: false,
      default: null,
    },
  },
  components: {
    KpiCard,
  },
  setup() {
    const store = useStore();
    const q = useQuasar();

    return { q, store };
  },
  computed: {
    kpiList(): KPI[] {
      return this.store.getters[`${kpiModule}/${getKPIList}`]();
    },
    hasKPIs(): boolean {
      return this.kpiList.length > 0;
    },
  },
  methods: {
    isActive(id: number) {
      return this.activeId === id;
    },
    createKPI() {
      this.$emit('create-kpi');
    },
    updateKPI(kpi: KPI, id: number) {
      this.$emit('update-kpi', kpi, id);
    },
  },
});
</script>

<style lang="scss" scoped>
.active {
  border: 4px solid blue;
}

.q-card-like {
  width: 200px;
  min-height: 100px;
}
</style>
