<template>
  <q-form class="q-py-xl q-px-lg" @submit="onSubmit">
    <q-item-label class="text-h6">{{ t('CARD_SETTINGS') }} </q-item-label>
    <q-input
      class="q-pt-md"
      outlined
      v-model="name"
      :label="t('KPI.NAME.LABEL')"
      :placeholder="t('KPI.NAME.PLACEHOLDER')"
    ></q-input>
    <q-input
      class="q-pt-sm"
      outlined
      type="textarea"
      v-model="tooltip"
      :label="t('KPI.TOOLTIP.LABEL')"
      :placeholder="t('KPI.TOOLTIP.PLACEHOLDER')"
    ></q-input>
    <div class="q-pt-sm">
      {{ t('KPI.ICON.LABEL') }}
      <div class="row q-gutter-xs no-wrap">
        <q-card
          clickable
          v-ripple
          @click="chooseIcon(icon)"
          bordered
          :class="{ active: isChosenIcon(icon) }"
          v-for="(icon, index) in iconList"
          :key="index"
        >
          <q-icon :name="icon"> </q-icon>
        </q-card>
      </div>
    </div>
    <q-input
      class="q-pt-sm"
      outlined
      v-model="value"
      :label="t('KPI.VALUE.LABEL')"
      :placeholder="t('KPI.VALUE.PLACEHOLDER')"
    ></q-input>
    <q-select
      class="q-pt-sm"
      outlined
      v-model="trend"
      :label="t('KPI.TREND.LABEL')"
      :options="trendOptions"
      :placeholder="t('KPI.TREND.PLACEHOLDER')"
    ></q-select>
    <q-btn
      no-caps
      class="bg-primary text-white q-mt-md"
      type="submit"
      :label="submitLabel"
    ></q-btn>
  </q-form>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { PropType, defineComponent, ref } from 'vue';
import { KPI, Trend, TrendValues } from 'src/data-model/kpi-model';
import { kpiModule } from 'src/store/kpi-module';
import { createKPI, updateKPI } from 'src/store/kpi-module/actions';

export default defineComponent({
  name: 'KpiForm',
  props: {
    kpi: {
      type: Object as PropType<KPI>,
      required: false,
      default: null,
    },
    id: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    const name = ref<string>('');
    const tooltip = ref<string>('');
    const value = ref<number | null>(null);
    const trend = ref<Trend | null>(null);
    const { t } = useI18n();
    const iconList = [
      'fas fa-house',
      'fas fa-phone',
      'fas fa-download',
      'fas fa-star',
      'fas fa-cloud',
    ];
    const icon = ref<string>('');

    return { icon, iconList, name, t, tooltip, trend, value };
  },
  computed: {
    isUpdating(): boolean {
      return this.kpi !== null;
    },
    submitLabel(): string {
      return this.isUpdating
        ? this.t('ACTION.UPDATE')
        : this.t('ACTION.CREATE');
    },
    trendOptions(): string[] {
      return Object.values(TrendValues);
    },
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        if (this.isUpdating) {
          this.name = this.kpi.name;
          this.tooltip = this.kpi.tooltip;
          this.icon = this.kpi.icon;
          this.value = this.kpi.value;
          this.trend = this.kpi.trend;
        } else {
          this.clearForm();
        }
      },
    },
  },
  methods: {
    isChosenIcon(icon: string) {
      return this.icon === icon;
    },
    chooseIcon(icon: string) {
      this.icon = icon;
    },
    onSubmit() {
      const newKPI: KPI = {
        name: this.name,
        tooltip: this.tooltip,
        icon: this.icon,
        value: this.value as number,
        trend: this.trend as Trend,
      };
      if (this.isUpdating) {
        this.$store.dispatch(`${kpiModule}/${updateKPI}`, {
          kpi: newKPI,
          id: this.id,
        });
      } else {
        this.$store.dispatch(`${kpiModule}/${createKPI}`, { newKPI });
      }
      this.$emit('close-form');
      this.clearForm();
    },
    clearForm() {
      this.name = '';
      this.tooltip = '';
      this.icon = '';
      this.value = null;
      this.trend = null;
    },
  },
});
</script>

<style lang="scss">
.q-card.active {
  border: 2px solid blue;

  .q-icon {
    color: blue;
  }
}
</style>
