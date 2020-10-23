<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col lg="12" class="mb-5">
        <h2 class="text-center">CTA Station tracker application</h2>
        <hr />
        <h3>Select table mode</h3>
        <b-form-radio-group
          id="table-mode"
          v-model="table_mode"
          :options="table_options"
          switches
        ></b-form-radio-group>
      </b-col>
      <div>
        <normal-table
          :stations="stations"
          v-if="table_mode === 'normal'"
        ></normal-table>
        <bootstrap-table :stations="stations" v-if="table_mode === 'bootstrap'">
        </bootstrap-table>
      </div>
    </b-row>
  </div>
</template>

<script>
import normalTable from '~/components/table/normal-table'
import bootstrapTable from '~/components/table/bootstrap-table'
export default {
  components: {
    normalTable,
    bootstrapTable,
  },
  async asyncData({ $axios }) {
    const stations = await $axios.$get('cta_stations.json')
    return { stations }
  },
  data() {
    return {
      table_options: [
        'normal',
        { text: 'bootstrap data table', value: 'bootstrap' },
      ],
      table_mode: 'normal',
    }
  },
}
</script>
