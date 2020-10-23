<template>
  <table class="table table-striped table-hover table-bordered">
    <thead>
      <th>SN</th>
      <th>Station Name</th>
      <th>Station ID</th>
      <th>Stops</th>
    </thead>
    <tbody>
      <tr v-for="(station, i) in stations" :key="station.STATION_NAME">
        <td>{{ i + 1 }}</td>
        <td>
          <nuxt-link
            :to="'details/' + station.STOPS[0].MAP_ID"
            :title="'View detailed information about ' + station.STATION_NAME"
          >
            {{ station.STATION_NAME }}
          </nuxt-link>
        </td>
        <td>{{ station.STOPS[0].MAP_ID }}</td>
        <td>
          <table class="w-100">
            <thead>
              <th>SN</th>
              <th>Station Name</th>
              <th>Location</th>
              <th>Direction</th>
            </thead>
            <tbody>
              <tr v-for="(stop, j) in station.STOPS" :key="stop.STOP_ID">
                <td>{{ j + 1 }}</td>
                <td>{{ stop.STOP_NAME }}</td>
                <td>{{ stop.LOCATION }}</td>
                <td>{{ stop.DIRECTION }}</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
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
}
</script>
