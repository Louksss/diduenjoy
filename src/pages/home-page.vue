<template>
  <q-page class="row items-start justify-evenly">
    <kpi-list
      @create-kpi="openForm"
      @update-kpi="openFormForUpdate"
      :active-id="activeId"
    ></kpi-list>

    <q-drawer v-model="kpiDrawerOpen" bordered>
      <q-btn :label="t('ACTION.CLOSE')" flat @click="closeForm"></q-btn>
      <kpi-form
        :kpi="kpiToUpdate"
        :id="activeId"
        @close-form="closeForm"
      ></kpi-form>
    </q-drawer>
  </q-page>
</template>

<script lang="ts">
import KpiForm from 'src/components/kpi-form.vue';
import KpiList from 'components/kpi-list.vue';
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { KPI } from 'src/data-model/kpi-model';

export default defineComponent({
  name: 'HomePage',
  components: { KpiList, KpiForm },
  data() {
    const kpiDrawerOpen = ref<boolean>(false);
    const kpiToUpdate = ref<KPI | undefined>();
    const { t } = useI18n();
    const activeId = ref<number | undefined>();

    return { activeId, kpiDrawerOpen, kpiToUpdate, t };
  },
  methods: {
    openForm() {
      this.kpiDrawerOpen = true;
    },
    closeForm() {
      this.kpiDrawerOpen = false;
      if (this.kpiToUpdate) {
        this.kpiToUpdate = undefined;
        this.activeId = undefined;
      }
    },
    openFormForUpdate(kpi: KPI, id: number) {
      this.kpiToUpdate = kpi;
      this.kpiDrawerOpen = true;
      this.activeId = id;
    },
  },
});
</script>
