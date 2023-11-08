<template>
  <q-card clickable v-ripple @click="updateKPI" class="q-pa-lg">
    <div class="column">
      <div class="row items-center q-mb-md justify-between">
        <div class="row items-center">
          <q-item-label class="q-mr-xs">{{ kpi.name }}</q-item-label>
          <q-icon name="fas fa-circle-info">
            <q-tooltip>{{ kpi.tooltip }}</q-tooltip>
          </q-icon>
        </div>
        <q-icon :name="kpi.icon" color="grey"></q-icon>
      </div>
      <div class="row items-center">
        <div class="text-h4 q-mr-sm">{{ kpi.value }}</div>
        <div>{{ kpi.trend }}</div>
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'src/store/index';
import { useQuasar } from 'quasar';
import { PropType } from 'vue';
import { KPI } from 'src/data-model/kpi-model';

export default defineComponent({
  name: 'KpiCard',
  props: {
    kpi: {
      type: Object as PropType<KPI>,
      required: true,
    },
  },
  data() {
    const store = useStore();
    const q = useQuasar();

    return { q, store };
  },
  computed: {},
  methods: {
    updateKPI() {
      this.$emit('update-kpi', this.kpi);
    },
  },
});
</script>

<style lang="scss">
.q-card {
  width: 200px;

  &:hover {
    cursor: pointer;
  }
}
</style>
