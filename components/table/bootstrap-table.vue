<template>
  <b-row class="bootstrap-table-design">
    <b-col lg="6">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="subject-table"
        size="sm"
        class="mt-2"
      ></b-pagination>
    </b-col>
    <b-col lg="6">
      <b-form-group
        label-align-sm="right"
        label-size="sm"
        label-for="filterInput"
        class="m-0"
      >
        <b-input-group class="mb-3">
          <b-form-input
            id="filterInput"
            v-model="filter"
            type="search"
            placeholder="Search station"
          ></b-form-input>
        </b-input-group>
      </b-form-group>
    </b-col>
    <b-col lg="12">
      <b-table
        :items="stations"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filter"
        hover
        striped
        bordered
        head-variant="dark"
        @filtered="onFiltered"
      >
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template v-slot:cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template v-slot:cell(STATION_NAME)="data">
          <nuxt-link
            :to="'details/' + data.item.STOPS[0].MAP_ID"
            :title="'View detailed information about ' + data.item.STATION_NAME"
          >
            {{ data.item.STATION_NAME }}
          </nuxt-link>
        </template>
        <template v-slot:cell(STATION_ID)="data">
          {{ data.item.STOPS[0].MAP_ID }}
        </template>
        <template v-slot:cell(STOPS)="data">
          <table class="w-100">
            <thead>
              <th>SN</th>
              <th>Station Name</th>
              <th>Location</th>
              <th>Direction</th>
            </thead>
            <tbody>
              <tr v-for="(stop, j) in data.item.STOPS" :key="stop.STOP_ID">
                <td>{{ j + 1 }}</td>
                <td>{{ stop.STOP_NAME }}</td>
                <td>{{ stop.LOCATION }}</td>
                <td>{{ stop.DIRECTION }}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>
<script>
export default {
  props: {
    stations: {
      type: Array,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      currentPage: 1,
      perPage: 15,
      rows: 1,
      filter: null,
      fields: [
        {
          key: 'index',
          label: 'SN',
          class: 'text-center',
        },
        {
          key: 'STATION_NAME',
          label: 'Station name',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center',
        },
        {
          key: 'STATION_ID',
          label: 'Station id',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center',
        },
        {
          key: 'STOPS',
          label: 'Stops',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center',
        },
      ],
    }
  },
  created() {
    this.rows = this.stations.length
  },
  methods: {
    onFiltered(items) {
      this.rows = items.length
      this.currentPage = 1
    },
  },
}
</script>
